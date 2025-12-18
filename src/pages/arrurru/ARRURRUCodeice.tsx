import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getCurrentUser, logout } from '@/lib/arrurru-auth';
import { getContentBySection, ContentPage, getUserProgress } from '@/lib/arrurru-content';
import { getCodeiceTestQuestions } from '@/lib/arrurru-codice-content';
import ReactMarkdown from 'react-markdown';
import TestComponent from '@/components/TestComponent';

const ARRURRUCodeice = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [content, setContent] = useState<ContentPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<ContentPage | null>(null);
  const [showTest, setShowTest] = useState(false);
  const [userProgress, setUserProgress] = useState<any[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/arrurru/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const pages = getContentBySection('codice');
    setContent(pages);
    if (pages.length > 0) {
      setSelectedPage(pages[0]);
      setIsLastPage(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const progress = getUserProgress(user.id);
      setUserProgress(progress);
    }
  }, [user]);

  useEffect(() => {
    if (selectedPage && content.length > 0) {
      const currentIndex = content.findIndex(p => p.id === selectedPage.id);
      setIsLastPage(currentIndex === content.length - 1);
    }
  }, [selectedPage, content]);

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
                            setShowTest(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full text-left p-3 rounded-lg transition-colors relative ${
                            selectedPage?.id === page.id
                              ? 'bg-purple-500/30 text-white'
                              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{page.title}</span>
                            {isCompleted && (
                              <Icon name="CheckCircle" size={18} className="text-green-400 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                    
                    {/* Итоговый тест в оглавлении */}
                    {isLastPage && (
                      <div className="pt-4 mt-4 border-t border-amber-500/30">
                        <div className="p-3 bg-amber-500/20 rounded-lg border-2 border-amber-500/50">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name="ClipboardCheck" size={18} className="text-amber-400" />
                            <span className="text-sm font-bold text-amber-400">Итоговый тест</span>
                          </div>
                          <p className="text-xs text-slate-300">
                            Проверьте свои знания по всему Кодексу
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </aside>

            <main className="lg:col-span-3">
              {selectedPage ? (
                <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-purple-500/30">
                  <CardContent className="p-8 lg:p-16">
                    <article className="prose prose-invert max-w-none">
                      <ReactMarkdown 
                        components={{
                          p: ({children}) => <p className="text-slate-200 leading-loose mb-6 text-base lg:text-lg font-light">{children}</p>,
                          h1: ({children}) => <h1 className="font-serif text-5xl lg:text-6xl font-bold text-amber-400 mb-8 tracking-tight">{children}</h1>,
                          h2: ({children}) => <h2 className="font-serif text-3xl lg:text-4xl font-bold text-purple-300 mb-6 mt-12 tracking-tight">{children}</h2>,
                          h3: ({children}) => <h3 className="text-2xl lg:text-3xl font-semibold text-amber-300 mb-4 mt-10">{children}</h3>,
                          h4: ({children}) => <h4 className="text-xl lg:text-2xl font-semibold text-purple-200 mb-3 mt-8 italic">{children}</h4>,
                          strong: ({children}) => <strong className="text-amber-300 font-bold">{children}</strong>,
                          em: ({children}) => <em className="text-purple-300 font-medium not-italic">{children}</em>,
                          blockquote: ({children}) => (
                            <blockquote className="border-l-4 border-amber-500 pl-6 my-8 italic text-amber-200 text-lg lg:text-xl font-light">
                              {children}
                            </blockquote>
                          ),
                          ul: ({children}) => <ul className="space-y-3 my-6 list-none">{children}</ul>,
                          li: ({children}) => (
                            <li className="flex items-start gap-3 text-slate-200 text-base lg:text-lg">
                              <span className="text-amber-500 mt-1">●</span>
                              <span>{children}</span>
                            </li>
                          ),
                          hr: () => <hr className="border-amber-500/30 my-12" />
                        }}
                      >
                        {selectedPage.content}
                      </ReactMarkdown>
                    </article>

                    {selectedPage.files.filter(f => f.type === 'image').length > 0 && (
                      <div className="mt-12 space-y-6">
                        {selectedPage.files.filter(f => f.type === 'image').map((file, index) => (
                          <div key={index} className="rounded-xl overflow-hidden border-2 border-amber-500/20">
                            <img
                              src={file.url}
                              alt={file.name}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedPage.files.filter(f => f.type !== 'image').length > 0 && (
                      <div className="mt-12 pt-8 border-t border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-6">Дополнительные материалы</h3>
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

                    <div className="mt-12 pt-8 border-t border-slate-700">
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          onClick={() => {
                            const currentIndex = content.findIndex(p => p.id === selectedPage.id);
                            if (currentIndex > 0) {
                              setSelectedPage(content[currentIndex - 1]);
                              setShowTest(false);
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
                              setShowTest(false);
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

                    {isLastPage && (
                      <div className="mt-16 pt-12 border-t-2 border-amber-500/30">
                        <TestComponent
                          contentId={selectedPage.id}
                          contentTitle="Итоговый тест: El Códice de ARRURRU"
                          userId={user.id}
                          userName={user.fullName}
                          questions={getCodeiceTestQuestions()}
                          onComplete={() => {
                            const progress = getUserProgress(user.id);
                            setUserProgress(progress);
                          }}
                        />
                      </div>
                    )}
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