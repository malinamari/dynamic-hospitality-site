import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getCurrentUser, logout, createInvitation, User } from '@/lib/arrurru-auth';
import { loadContent, saveContent, deleteContent, ContentPage, getUserProgress } from '@/lib/arrurru-content';
import { getAllUsers } from '@/lib/arrurru-users';
import StatisticsTab from '@/components/admin/StatisticsTab';
import ContentTab from '@/components/admin/ContentTab';
import InvitesTab from '@/components/admin/InvitesTab';
import UsersTab from '@/components/admin/UsersTab';

const ARRURRUAdmin = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState<'statistics' | 'content' | 'invites' | 'users'>('statistics');
  
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
  const [allUsers, setAllUsers] = useState<(User & { passwordHash: string; createdAt?: string })[]>([]);
  const [selectedUser, setSelectedUser] = useState<(User & { passwordHash: string; createdAt?: string }) | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{ url: string; name: string; type: 'document' | 'video' | 'image' }[]>([]);

  const SUPER_ADMIN_PASSWORD = 'marina_super_admin_2025';
  const [filterRole, setFilterRole] = useState<'all' | 'hall' | 'manager' | 'super_admin'>('all');

  const exportToCSV = () => {
    const headers = ['ФИО', 'Email', 'Должность', 'Пройдено экзаменов', 'Средний балл', 'Прогресс %'];
    const rows = allUsers.map(u => {
      const progress = getUserProgress(u.id);
      const completed = progress.filter(p => p.completed).length;
      const avgScore = progress.length > 0
        ? Math.round(progress.reduce((sum, p) => sum + (p.examScore || 0), 0) / progress.length)
        : 0;
      const progressPercent = Math.round((completed / 7) * 100);
      const roleText = u.role === 'super_admin' ? 'Генеральный' : 
                       u.role === 'manager' ? 'Управляющий' : 
                       u.role === 'hall' ? 'Зал' : 'Сотрудник';
      
      return [u.fullName, u.email, roleText, completed, avgScore, progressPercent];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `arrurru_statistics_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (!user || user.role !== 'manager') {
      navigate('/arrurru/dashboard');
      return;
    }
    loadContentData();
    loadAllUsers();
  }, [user, navigate]);

  const loadAllUsers = () => {
    const users = getAllUsers();
    setAllUsers(users as any);
  };

  const handleDeleteUser = (userId: string) => {
    const password = prompt('Введите супер-админ пароль для удаления пользователя:');
    if (password !== SUPER_ADMIN_PASSWORD) {
      setMessage('Неверный пароль!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (confirm('Удалить этого пользователя?')) {
      const users = JSON.parse(localStorage.getItem('arrurru_users') || '[]');
      const filtered = users.filter((u: any) => u.id !== userId);
      localStorage.setItem('arrurru_users', JSON.stringify(filtered));
      loadAllUsers();
      setMessage('Пользователь удален');
      setTimeout(() => setMessage(''), 2000);
    }
  };

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
    setUploadedFiles(page.files.map(f => ({ url: f.url, name: f.name, type: f.type })));
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
    setUploadedFiles([]);
    setEditMode(true);
  };

  const handleSaveContent = () => {
    if (!formData.title || !formData.slug) {
      setMessage('Заполните название и URL');
      return;
    }

    const savedPage = saveContent({
      id: selectedContent?.id,
      ...formData,
      files: uploadedFiles.map(f => ({ name: f.name, url: f.url, type: f.type }))
    });

    setMessage('Сохранено!');
    loadContentData();
    setSelectedContent(savedPage);
    setUploadedFiles([]);
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

      {message && (
        <div className="fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex gap-2 mb-6 bg-slate-800/50 p-2 rounded-lg border border-orange-500/30 w-fit">
            <Button
              onClick={() => setActiveTab('statistics')}
              variant={activeTab === 'statistics' ? 'default' : 'ghost'}
              className={activeTab === 'statistics' ? 'bg-orange-500' : 'text-slate-300'}
            >
              <Icon name="BarChart3" size={20} className="mr-2" />
              Статистика
            </Button>
            <Button
              onClick={() => setActiveTab('content')}
              variant={activeTab === 'content' ? 'default' : 'ghost'}
              className={activeTab === 'content' ? 'bg-orange-500' : 'text-slate-300'}
            >
              <Icon name="FileText" size={20} className="mr-2" />
              Контент
            </Button>
            <Button
              onClick={() => setActiveTab('invites')}
              variant={activeTab === 'invites' ? 'default' : 'ghost'}
              className={activeTab === 'invites' ? 'bg-orange-500' : 'text-slate-300'}
            >
              <Icon name="UserPlus" size={20} className="mr-2" />
              Приглашения
            </Button>
            <Button
              onClick={() => setActiveTab('users')}
              variant={activeTab === 'users' ? 'default' : 'ghost'}
              className={activeTab === 'users' ? 'bg-orange-500' : 'text-slate-300'}
            >
              <Icon name="Users" size={20} className="mr-2" />
              Пользователи
            </Button>
          </div>

          {activeTab === 'statistics' && (
            <StatisticsTab
              allUsers={allUsers}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              filterRole={filterRole}
              setFilterRole={setFilterRole}
              exportToCSV={exportToCSV}
            />
          )}

          {activeTab === 'content' && (
            <ContentTab
              content={content}
              selectedContent={selectedContent}
              editMode={editMode}
              formData={formData}
              uploadedFiles={uploadedFiles}
              setFormData={setFormData}
              setUploadedFiles={setUploadedFiles}
              handleSelectContent={handleSelectContent}
              handleNewContent={handleNewContent}
              handleSaveContent={handleSaveContent}
              handleDeleteContent={handleDeleteContent}
            />
          )}

          {activeTab === 'invites' && (
            <InvitesTab
              inviteEmail={inviteEmail}
              setInviteEmail={setInviteEmail}
              adminPassword={adminPassword}
              setAdminPassword={setAdminPassword}
              inviteUrl={inviteUrl}
              handleCreateInvite={handleCreateInvite}
              copyToClipboard={copyToClipboard}
            />
          )}

          {activeTab === 'users' && (
            <UsersTab
              allUsers={allUsers}
              handleDeleteUser={handleDeleteUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ARRURRUAdmin;
