import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getCurrentUser, logout } from '@/lib/arrurru-auth';
import { getContentBySection, ContentPage } from '@/lib/arrurru-content';
import ReactMarkdown from 'react-markdown';
import ImageGallery from '@/components/ImageGallery';
import ReportErrorButton from '@/components/ReportErrorButton';

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
    if (pages.length > 0 && !selectedPage) {
      setSelectedPage(pages[0]);
    }
  }, []);

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
              <ReportErrorButton pageName="Тренинги" />
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
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-4">Этапы внедрения системы ARRURRU</h2>
                    <div className="space-y-3">
                      <div className="p-4 bg-slate-800/50 rounded-lg border border-amber-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold text-sm">1</div>
                          <h3 className="font-bold text-white">День первый</h3>
                        </div>
                        <p className="text-sm text-slate-300 ml-11">Весь персонал — создание команды через игры, формирование ценностей, запуск ритуалов и геймификации.</p>
                      </div>

                      <div className="p-4 bg-slate-800/50 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm">2</div>
                          <h3 className="font-bold text-white">Интервью и анкетирование (2 дня, 2 смены)</h3>
                        </div>
                        <p className="text-sm text-slate-300 ml-11">Индивидуальная работа с персоналом — опросы, выявление сильных и слабых сторон, оценка потенциала. Результаты в таблице для управляющего.</p>
                      </div>

                      <div className="p-4 bg-slate-800/50 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold text-sm">3</div>
                          <h3 className="font-bold text-white">Профессиональный тренинг зала</h3>
                        </div>
                        <p className="text-sm text-slate-300 ml-11">Только персонал зала — базовые техники сервиса, знание меню, стандарты работы, коммуникация с гостями.</p>
                      </div>

                      <div className="p-4 bg-slate-800/50 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-bold text-sm">4</div>
                          <h3 className="font-bold text-white">Прикладной тренинг зала</h3>
                        </div>
                        <p className="text-sm text-slate-300 ml-11">Только персонал зала — углубленная практика, работа с конфликтами, сложные ситуации, допродажи и upsell.</p>
                      </div>

                      <div className="p-4 bg-slate-800/50 rounded-lg border border-orange-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 font-bold text-sm">5</div>
                          <h3 className="font-bold text-white">Встреча с управляющим — подведение итогов</h3>
                        </div>
                        <p className="text-sm text-slate-300 ml-11">Финальная встреча — обсуждение результатов, разбор таблицы оценок персонала, рекомендации по дальнейшему развитию команды.</p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/30">
                      <p className="text-xs text-amber-200 flex items-start gap-2">
                        <Icon name="Info" size={16} className="flex-shrink-0 mt-0.5" />
                        <span>Программа каждого тренинга доступна для скачивания ниже. Все материалы адаптированы под философию ARRURRU.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30 sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden flex flex-col">
                <CardContent className="p-4 flex flex-col overflow-hidden">
                  <h3 className="text-lg font-bold text-white mb-4 flex-shrink-0">Этапы программы</h3>
                  <div className="space-y-2 overflow-y-auto flex-1 pr-2">
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
                          <span className="text-sm">{page.title.replace('Этап ' + (index + 1) + ': ', '')}</span>
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