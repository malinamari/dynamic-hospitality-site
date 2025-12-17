import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getCurrentUser, logout } from '@/lib/arrurru-auth';
import { getContentBySection, ContentPage } from '@/lib/arrurru-content';
import ReactMarkdown from 'react-markdown';
import ImageGallery from '@/components/ImageGallery';

const ARRURRUTrainings = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [content, setContent] = useState<ContentPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<ContentPage | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/arrurru/login');
      return;
    }
    const pages = getContentBySection('trainings');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900">
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
              <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/50">
                <Icon name="Users" size={24} className="text-amber-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Тренинги</h1>
                <p className="text-sm text-slate-400">Программа и материалы</p>
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
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border-2 border-amber-500/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Calendar" size={32} className="text-amber-400" />
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">Этапы работы</h2>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p>🎯 <strong>Тренинг 1</strong> — Командообразующий (весь персонал, 1 неполный день)</p>
                      <p>📋 <strong>2 дня</strong> — Анкетирование и интервью (доступно управляющему)</p>
                      <p>🎓 <strong>Тренинг 2</strong> — Обучение зала</p>
                      <p>🎓 <strong>Тренинг 3</strong> — Углублённая работа с залом</p>
                      <p>✅ <strong>Итог</strong> — Встреча с управляющим и подведение итогов</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30 sticky top-24">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-white mb-4">Список тренингов</h3>
                  <div className="space-y-2">
                    {content.map((page, index) => (
                      <button
                        key={page.id}
                        onClick={() => setSelectedPage(page)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedPage?.id === page.id
                            ? 'bg-amber-500/30 text-white'
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/30 text-xs font-bold">
                            {index + 1}
                          </span>
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
                <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
                  <CardContent className="p-8">
                    <article className="prose prose-invert prose-amber max-w-none">
                      <ReactMarkdown>{selectedPage.content}</ReactMarkdown>
                    </article>

                    <ImageGallery files={selectedPage.files} />

                    {selectedPage.files.filter(f => f.type !== 'image').length > 0 && (
                      <div className="mt-8 pt-8 border-t border-slate-700">
                        <h3 className="text-lg font-bold text-white mb-4">Материалы тренинга</h3>
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
                                className="text-amber-400"
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
                <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
                  <CardContent className="p-12 text-center">
                    <Icon name="Users" size={64} className="text-amber-400 mx-auto mb-4" />
                    <p className="text-slate-300">Выберите тренинг из списка слева</p>
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

export default ARRURRUTrainings;