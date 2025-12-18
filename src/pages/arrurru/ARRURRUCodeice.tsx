import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getCurrentUser, logout } from '@/lib/arrurru-auth';
import { getContentBySection, ContentPage, getUserProgress } from '@/lib/arrurru-content';
import ReactMarkdown from 'react-markdown';
import ExamComponent from '@/components/ExamComponent';
import ImageGallery from '@/components/ImageGallery';

const ARRURRUCodeice = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [content, setContent] = useState<ContentPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<ContentPage | null>(null);
  const [showExam, setShowExam] = useState(false);
  const [userProgress, setUserProgress] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/arrurru/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const pages = getContentBySection('codice');
    console.log('Loaded codice pages:', pages.length, pages);
    setContent(pages);
    if (pages.length > 0) {
      setSelectedPage(pages[0]);
      console.log('Selected first page:', pages[0].title, pages[0].content.substring(0, 100));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const progress = getUserProgress(user.id);
      setUserProgress(progress);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/arrurru/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-amber-500/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/arrurru/dashboard')}
                className="text-amber-400 hover:text-white"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/50">
                <Icon name="BookOpen" size={24} className="text-purple-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">El Códice de ARRURRU</h1>
                <p className="text-sm text-slate-400">Философия и ценности проекта</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{user.fullName}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-amber-400 hover:text-white hover:bg-amber-500/20"
              >
                <Icon name="LogOut" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-purple-500/30 sticky top-24">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-white mb-4">Оглавление</h3>
                  <div className="space-y-2">
                    {content.map((page) => {
                      const pageProgress = userProgress.find(p => p.contentId === page.id);
                      const isCompleted = pageProgress?.completed || false;
                      
                      return (
                        <button
                          key={page.id}
                          onClick={() => {
                            setSelectedPage(page);
                            setShowExam(false);
                          }}
                          className={`w-full text-left p-3 rounded-lg transition-colors relative ${
                            selectedPage?.id === page.id
                              ? 'bg-purple-500/30 text-white'
                              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{page.title}</span>
                            {isCompleted && (
                              <Icon name="CheckCircle" size={18} className="text-green-400" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </aside>

            <main className="lg:col-span-3">
              {selectedPage ? (
                <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-purple-500/30">
                  <CardContent className="p-8 lg:p-12">
                    <article className="prose prose-invert prose-lg prose-amber max-w-none">
                      <ReactMarkdown 
                        components={{
                          p: ({children}) => <p className="text-slate-200 leading-relaxed mb-6">{children}</p>,
                          h1: ({children}) => <h1 className="text-3xl lg:text-4xl font-bold text-amber-400 mb-6">{children}</h1>,
                          h2: ({children}) => <h2 className="text-2xl lg:text-3xl font-bold text-purple-300 mb-4 mt-8">{children}</h2>,
                          h3: ({children}) => <h3 className="text-xl lg:text-2xl font-semibold text-purple-200 mb-3 mt-6">{children}</h3>,
                          strong: ({children}) => <strong className="text-amber-300 font-semibold">{children}</strong>,
                        }}
                      >
                        {selectedPage.content}
                      </ReactMarkdown>
                    </article>

                    <ImageGallery files={selectedPage.files} />

                    {selectedPage.files.filter(f => f.type !== 'image').length > 0 && (
                      <div className="mt-8 pt-8 border-t border-slate-700">
                        <h3 className="text-lg font-bold text-white mb-4">Дополнительные материалы</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {selectedPage.files.filter(f => f.type !== 'image').map((file, index) => (
                            <a
                              key={index}
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                            >
                              <Icon
                                name={
                                  file.type === 'video' ? 'Video' :
                                  file.type === 'image' ? 'Image' :
                                  file.type === 'link' ? 'Link' :
                                  'FileText'
                                }
                                size={24}
                                className="text-purple-400"
                              />
                              <span className="text-white">{file.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedPage.hasExam && selectedPage.exam && (
                      <div className="mt-8 pt-8 border-t border-slate-700">
                        {!showExam ? (
                          <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-4">Экзамен по материалу</h3>
                            <p className="text-slate-300 mb-6">
                              Проверьте свои знания по этой главе
                            </p>
                            <Button
                              onClick={() => setShowExam(true)}
                              className="bg-amber-500 hover:bg-amber-600 text-white font-bold"
                            >
                              <Icon name="FileCheck" size={20} className="mr-2" />
                              Пройти экзамен
                            </Button>
                          </div>
                        ) : (
                          <ExamComponent
                            contentId={selectedPage.id}
                            contentTitle={selectedPage.title}
                            userId={user.id}
                            userName={user.fullName}
                            questions={selectedPage.exam}
                            onComplete={(passed, score) => {
                              const progress = getUserProgress(user.id);
                              setUserProgress(progress);
                              if (!passed) {
                                setTimeout(() => setShowExam(false), 3000);
                              }
                            }}
                          />
                        )}
                      </div>
                    )}

                    <div className="mt-8 pt-8 border-t border-slate-700">
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          onClick={() => {
                            const currentIndex = content.findIndex(p => p.id === selectedPage.id);
                            if (currentIndex > 0) {
                              setSelectedPage(content[currentIndex - 1]);
                              setShowExam(false);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          disabled={content.findIndex(p => p.id === selectedPage.id) === 0}
                          className="text-amber-400 border-amber-500/50 hover:bg-amber-500/20"
                        >
                          <Icon name="ChevronLeft" size={20} className="mr-2" />
                          Предыдущая глава
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => {
                            const currentIndex = content.findIndex(p => p.id === selectedPage.id);
                            if (currentIndex < content.length - 1) {
                              setSelectedPage(content[currentIndex + 1]);
                              setShowExam(false);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          disabled={content.findIndex(p => p.id === selectedPage.id) === content.length - 1}
                          className="text-amber-400 border-amber-500/50 hover:bg-amber-500/20"
                        >
                          Следующая глава
                          <Icon name="ChevronRight" size={20} className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-purple-500/30">
                  <CardContent className="p-12 text-center">
                    <Icon name="BookOpen" size={64} className="text-purple-400 mx-auto mb-4" />
                    <p className="text-slate-300">Выберите раздел из меню слева</p>
                  </CardContent>
                </Card>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARRURRUCodeice;