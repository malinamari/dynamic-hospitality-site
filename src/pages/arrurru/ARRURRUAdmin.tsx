import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { getCurrentUser, logout, createInvitation } from '@/lib/arrurru-auth';
import { loadContent, saveContent, deleteContent, ContentPage } from '@/lib/arrurru-content';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ARRURRUAdmin = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState<'content' | 'invites'>('content');
  
  const [content, setContent] = useState<ContentPage[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentPage | null>(null);
  const [editMode, setEditMode] = useState(false);
  
  const [formData, setFormData] = useState({
    section: 'codice' as ContentPage['section'],
    title: '',
    slug: '',
    content: '',
    orderIndex: 1
  });
  
  const [inviteEmail, setInviteEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [inviteUrl, setInviteUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'manager') {
      navigate('/arrurru/dashboard');
      return;
    }
    loadContentData();
  }, [user, navigate]);

  const loadContentData = () => {
    const allContent = loadContent();
    setContent(allContent);
  };

  const handleLogout = () => {
    logout();
    navigate('/arrurru/login');
  };

  const handleSelectContent = (page: ContentPage) => {
    setSelectedContent(page);
    setFormData({
      section: page.section,
      title: page.title,
      slug: page.slug,
      content: page.content,
      orderIndex: page.orderIndex
    });
    setEditMode(true);
  };

  const handleNewContent = () => {
    setSelectedContent(null);
    setFormData({
      section: 'codice',
      title: '',
      slug: '',
      content: '',
      orderIndex: 1
    });
    setEditMode(true);
  };

  const handleSaveContent = () => {
    if (!formData.title || !formData.slug) {
      setMessage('Заполните название и URL');
      return;
    }

    const savedPage = saveContent({
      id: selectedContent?.id,
      ...formData
    });

    setMessage('Сохранено!');
    loadContentData();
    setSelectedContent(savedPage);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleDeleteContent = (id: string) => {
    if (confirm('Удалить эту страницу?')) {
      deleteContent(id);
      loadContentData();
      setSelectedContent(null);
      setEditMode(false);
      setMessage('Удалено');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleCreateInvite = async () => {
    if (!inviteEmail || !adminPassword) {
      setMessage('Заполните все поля');
      return;
    }

    const result = await createInvitation(inviteEmail, adminPassword);
    
    if (result.success) {
      setInviteUrl(result.inviteUrl || '');
      setMessage('Приглашение создано!');
      setInviteEmail('');
      setAdminPassword('');
    } else {
      setMessage(result.error || 'Ошибка');
    }

    setTimeout(() => setMessage(''), 5000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setMessage('Скопировано!');
    setTimeout(() => setMessage(''), 2000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
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
              <div className="p-2 bg-orange-500/20 rounded-lg border border-orange-500/50">
                <Icon name="Settings" size={24} className="text-orange-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Панель управления</h1>
                <p className="text-sm text-slate-400">Редактирование контента</p>
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
          {message && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p className="text-green-300 text-center">{message}</p>
            </div>
          )}

          <div className="mb-6 flex gap-4">
            <Button
              onClick={() => setActiveTab('content')}
              variant={activeTab === 'content' ? 'default' : 'ghost'}
              className={activeTab === 'content' ? 'bg-amber-500' : ''}
            >
              <Icon name="FileText" size={20} className="mr-2" />
              Контент
            </Button>
            <Button
              onClick={() => setActiveTab('invites')}
              variant={activeTab === 'invites' ? 'default' : 'ghost'}
              className={activeTab === 'invites' ? 'bg-amber-500' : ''}
            >
              <Icon name="Mail" size={20} className="mr-2" />
              Приглашения
            </Button>
          </div>

          {activeTab === 'content' && (
            <div className="grid lg:grid-cols-3 gap-6">
              <aside className="lg:col-span-1">
                <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">Страницы</h3>
                      <Button
                        size="sm"
                        onClick={handleNewContent}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                      {content.map((page) => (
                        <div
                          key={page.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedContent?.id === page.id
                              ? 'bg-amber-500/30'
                              : 'bg-slate-700/50 hover:bg-slate-700'
                          }`}
                          onClick={() => handleSelectContent(page)}
                        >
                          <p className="text-sm font-medium text-white">{page.title}</p>
                          <p className="text-xs text-slate-400">
                            {page.section === 'codice' ? 'Кодекс' :
                             page.section === 'training-hall' ? 'Обучение' :
                             page.section === 'trainings' ? 'Тренинги' :
                             'Стандарты'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </aside>

              <main className="lg:col-span-2">
                {editMode ? (
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-white">
                        {selectedContent ? 'Редактировать' : 'Новая страница'}
                      </h3>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Раздел</label>
                        <Select value={formData.section} onValueChange={(value: any) => setFormData({...formData, section: value})}>
                          <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="codice">El Códice de ARRURRU</SelectItem>
                            <SelectItem value="training-hall">Обучение зала</SelectItem>
                            <SelectItem value="trainings">Тренинги</SelectItem>
                            <SelectItem value="standards">Стандарты</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Название</label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="bg-slate-900/50 border-slate-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">URL (латиницей, без пробелов)</label>
                        <Input
                          value={formData.slug}
                          onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                          className="bg-slate-900/50 border-slate-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Контент (Markdown)</label>
                        <Textarea
                          value={formData.content}
                          onChange={(e) => setFormData({...formData, content: e.target.value})}
                          rows={15}
                          className="bg-slate-900/50 border-slate-700 text-white font-mono text-sm"
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={handleSaveContent}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Icon name="Save" size={20} className="mr-2" />
                          Сохранить
                        </Button>
                        {selectedContent && (
                          <Button
                            onClick={() => handleDeleteContent(selectedContent.id)}
                            variant="destructive"
                          >
                            <Icon name="Trash2" size={20} className="mr-2" />
                            Удалить
                          </Button>
                        )}
                        <Button
                          onClick={() => setEditMode(false)}
                          variant="ghost"
                          className="text-slate-400"
                        >
                          Отмена
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
                    <CardContent className="p-12 text-center">
                      <Icon name="FileText" size={64} className="text-amber-400 mx-auto mb-4" />
                      <p className="text-slate-300">Выберите страницу или создайте новую</p>
                    </CardContent>
                  </Card>
                )}
              </main>
            </div>
          )}

          {activeTab === 'invites' && (
            <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30 max-w-2xl mx-auto">
              <CardContent className="p-8 space-y-6">
                <div className="text-center">
                  <Icon name="Mail" size={48} className="text-amber-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white">Создать приглашение</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Email пользователя</label>
                    <Input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="bg-slate-900/50 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Пароль администратора</label>
                    <Input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-slate-900/50 border-slate-700 text-white"
                    />
                  </div>

                  <Button
                    onClick={handleCreateInvite}
                    className="w-full bg-amber-500 hover:bg-amber-600"
                  >
                    <Icon name="Mail" size={20} className="mr-2" />
                    Создать приглашение
                  </Button>
                </div>

                {inviteUrl && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg space-y-2">
                    <p className="text-sm font-medium text-white">Ссылка-приглашение:</p>
                    <div className="flex gap-2">
                      <Input
                        value={inviteUrl}
                        readOnly
                        className="bg-slate-900/50 border-slate-700 text-white text-sm"
                      />
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(inviteUrl)}
                        className="bg-amber-500 hover:bg-amber-600"
                      >
                        <Icon name="Copy" size={16} />
                      </Button>
                    </div>
                    <p className="text-xs text-slate-400">Действительна 7 дней</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ARRURRUAdmin;
