import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getCurrentUser, logout } from '@/lib/arrurru-auth';
import { getContentBySection, ContentPage } from '@/lib/arrurru-content';
import ReactMarkdown from 'react-markdown';

const ARRURRUStandards = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [content, setContent] = useState<ContentPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<ContentPage | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/arrurru/login');
      return;
    }
    const pages = getContentBySection('standards');
    setContent(pages);
    if (pages.length > 0) {
      setSelectedPage(pages[0]);
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/arrurru/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
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
              <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/50">
                <Icon name="FileCheck" size={24} className="text-green-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Стандарты и правила</h1>
                <p className="text-sm text-slate-400">Регламенты и чек-листы</p>
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
              <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-green-500/30 sticky top-24">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-white mb-4">Документы</h3>
                  <div className="space-y-2">
                    {content.map((page) => (
                      <button
                        key={page.id}
                        onClick={() => {
                          setSelectedPage(page);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedPage?.id === page.id
                            ? 'bg-green-500/30 text-white'
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon name="FileText" size={16} className="text-green-400" />
                          <span className="text-sm">{page.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>

            <main className="lg:col-span-3">
              {selectedPage ? (
                <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-green-500/30">
                  <CardContent className="p-8">
                    <article className="prose prose-invert prose-amber max-w-none">
                      <ReactMarkdown>{selectedPage.content}</ReactMarkdown>
                    </article>

                    {selectedPage.files.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-slate-700">
                        <h3 className="text-lg font-bold text-white mb-4">Дополнительные материалы</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {selectedPage.files.map((file, index) => (
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
                                className="text-green-400"
                              />
                              <div>
                                <p className="text-white font-medium">{file.name}</p>
                                <p className="text-xs text-slate-400">
                                  {file.type === 'video' ? 'Видео' : 
                                   file.type === 'image' ? 'Изображение' :
                                   file.type === 'link' ? 'Ссылка' : 'Документ'}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-green-500/30">
                  <CardContent className="p-12 text-center">
                    <Icon name="FileCheck" size={64} className="text-green-400 mx-auto mb-4" />
                    <p className="text-slate-300">Выберите документ из списка слева</p>
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

export default ARRURRUStandards;