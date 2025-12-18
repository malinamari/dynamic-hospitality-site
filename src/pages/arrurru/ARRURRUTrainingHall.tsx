import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getCurrentUser, logout } from '@/lib/arrurru-auth';
import { getContentBySection, ContentPage, getUserProgress } from '@/lib/arrurru-content';
import { getTrainingHallTestQuestions } from '@/lib/arrurru-training-hall-content';
import ReactMarkdown from 'react-markdown';
import TestComponent from '@/components/TestComponent';
import ImageGallery from '@/components/ImageGallery';
import ProfessionSelector from '@/components/ProfessionSelector';
import Certificate from '@/components/Certificate';

const ARRURRUTrainingHall = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [content, setContent] = useState<ContentPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<ContentPage | null>(null);
  const [selectedProfession, setSelectedProfession] = useState<string>('');
  const [showTest, setShowTest] = useState(false);
  const [userProgress, setUserProgress] = useState<any[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const lastProfessionRef = useRef<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/arrurru/login');
      return;
    }
    if (user) {
      const progress = getUserProgress(user.id);
      setUserProgress(progress);
    }
  }, [user, navigate]);

  const handleProfessionSelect = (professionId: string) => {
    if (professionId !== lastProfessionRef.current) {
      lastProfessionRef.current = professionId;
      setSelectedProfession(professionId);
      setShowCertificate(false);
      
      const pages = getContentBySection('training-hall').filter(p => 
        p.parentId === professionId || p.id.startsWith(professionId)
      );
      setContent(pages);
      if (pages.length > 0) {
        setSelectedPage(pages[0]);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/arrurru/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
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
              <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/50">
                <Icon name="GraduationCap" size={24} className="text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Обучение зала</h1>
                <p className="text-sm text-slate-400">Материалы для сотрудников</p>
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
          {!selectedProfession ? (
            <ProfessionSelector 
              onSelect={handleProfessionSelect}
              selectedProfession={selectedProfession}
            />
          ) : showCertificate && selectedPage ? (
            <div className="space-y-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCertificate(false);
                  setSelectedProfession('');
                }}
                className="text-amber-400 border-amber-500/50"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад к выбору профессии
              </Button>
              <Certificate
                userName={user.fullName}
                profession={selectedProfession}
                completedAt={new Date().toISOString()}
                score={userProgress.find(p => p.contentId === selectedPage.id)?.examScore}
              />
            </div>
          ) : (
          <div className="grid lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-blue-500/30 sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden flex flex-col">
                <CardContent className="p-4 flex flex-col overflow-hidden">
                  <h3 className="text-lg font-bold text-white mb-4 flex-shrink-0">Модули обучения</h3>
                  <div className="space-y-2 overflow-y-auto flex-1 pr-2">
                    {content.map((page, index) => {
                      const pageProgress = userProgress.find(p => p.contentId === page.id);
                      const isCompleted = pageProgress?.completed || false;
                      const score = pageProgress?.examScore;
                      
                      return (
                        <button
                          key={page.id}
                          onClick={() => {
                            setSelectedPage(page);
                            setShowTest(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            selectedPage?.id === page.id
                              ? 'bg-blue-500/30 text-white'
                              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/30 text-xs font-bold">
                                {index + 1}
                              </span>
                              <span className="text-sm">{page.title}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {isCompleted && <Icon name="CheckCircle" size={16} className="text-green-400" />}
                              {score !== undefined && (
                                <span className="text-xs font-bold text-amber-400">{score}%</span>
                              )}
                            </div>
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
                <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-blue-500/30">
                  <CardContent className="p-8 lg:p-16">
                    <article className="prose prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          p: ({children}) => <p className="text-slate-200 leading-loose mb-6 text-base lg:text-lg font-light">{children}</p>,
                          h1: ({children}) => <h1 className="font-serif text-5xl lg:text-6xl font-bold text-blue-400 mb-8 tracking-tight">{children}</h1>,
                          h2: ({children}) => <h2 className="font-serif text-3xl lg:text-4xl font-bold text-amber-300 mb-6 mt-12 tracking-tight">{children}</h2>,
                          h3: ({children}) => <h3 className="text-2xl lg:text-3xl font-semibold text-blue-300 mb-4 mt-10">{children}</h3>,
                          h4: ({children}) => <h4 className="text-xl lg:text-2xl font-semibold text-amber-200 mb-3 mt-8 italic">{children}</h4>,
                          strong: ({children}) => <strong className="text-blue-300 font-bold">{children}</strong>,
                          em: ({children}) => <em className="text-amber-300 font-medium not-italic">{children}</em>,
                          blockquote: ({children}) => (
                            <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic text-blue-200 text-lg lg:text-xl font-light">
                              {children}
                            </blockquote>
                          ),
                          ul: ({children}) => <ul className="space-y-3 my-6 list-none">{children}</ul>,
                          li: ({children}) => (
                            <li className="flex items-start gap-3 text-slate-200 text-base lg:text-lg">
                              <span className="text-blue-500 mt-1">●</span>
                              <span>{children}</span>
                            </li>
                          ),
                          hr: () => <hr className="border-blue-500/30 my-12" />,
                          table: ({children}) => (
                            <div className="overflow-x-auto my-8">
                              <table className="w-full border-collapse">{children}</table>
                            </div>
                          ),
                          thead: ({children}) => <thead className="bg-blue-500/20">{children}</thead>,
                          th: ({children}) => <th className="border border-blue-500/30 px-4 py-3 text-left text-blue-300 font-bold">{children}</th>,
                          td: ({children}) => <td className="border border-blue-500/30 px-4 py-3 text-slate-200">{children}</td>,
                          code: ({children}) => (
                            <code className="bg-slate-900/50 px-2 py-1 rounded text-amber-300 text-sm">{children}</code>
                          ),
                          pre: ({children}) => (
                            <pre className="bg-slate-900/80 p-6 rounded-lg overflow-x-auto my-6 border border-blue-500/30">
                              {children}
                            </pre>
                          )
                        }}
                      >
                        {selectedPage.content}
                      </ReactMarkdown>
                    </article>

                    <ImageGallery files={selectedPage.files} />

                    {selectedPage.files.filter(f => f.type !== 'image').length > 0 && (
                      <div className="mt-8 pt-8 border-t border-slate-700">
                        <h3 className="text-lg font-bold text-white mb-4">Материалы модуля</h3>
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
                                className="text-blue-400"
                              />
                              <span className="text-white">{file.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedPage.hasExam && (
                      <div className="mt-8 pt-8 border-t border-slate-700">
                        <TestComponent
                          contentId={selectedPage.id}
                          contentTitle={selectedPage.title}
                          userId={user.id}
                          userName={user.fullName}
                          questions={getTrainingHallTestQuestions(selectedPage.id)}
                          onComplete={() => {
                            const progress = getUserProgress(user.id);
                            setUserProgress(progress);
                            setShowCertificate(true);
                          }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-blue-500/30">
                  <CardContent className="p-12 text-center">
                    <Icon name="GraduationCap" size={64} className="text-blue-400 mx-auto mb-4" />
                    <p className="text-slate-300">Выберите модуль из списка слева</p>
                  </CardContent>
                </Card>
              )}
            </main>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ARRURRUTrainingHall;