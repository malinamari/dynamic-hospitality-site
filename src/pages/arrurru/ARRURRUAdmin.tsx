import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { getCurrentUser, logout, createInvitation, User } from '@/lib/arrurru-auth';
import { loadContent, saveContent, deleteContent, ContentPage, getUserProgress, getExamResults } from '@/lib/arrurru-content';
import { getAllUsers } from '@/lib/arrurru-users';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileUploader from '@/components/FileUploader';
import ProgressChart from '@/components/ProgressChart';
import RecentActivity from '@/components/RecentActivity';
import DifficultyHeatmap from '@/components/DifficultyHeatmap';
import CertificateGenerator from '@/components/CertificateGenerator';

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

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          {message && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p className="text-green-300 text-center">{message}</p>
            </div>
          )}

          <div className="mb-6 flex gap-4 flex-wrap">
            <Button
              onClick={() => setActiveTab('statistics')}
              variant={activeTab === 'statistics' ? 'default' : 'ghost'}
              className={activeTab === 'statistics' ? 'bg-amber-500' : ''}
            >
              <Icon name="BarChart3" size={20} className="mr-2" />
              Статистика
            </Button>
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
            <Button
              onClick={() => setActiveTab('users')}
              variant={activeTab === 'users' ? 'default' : 'ghost'}
              className={activeTab === 'users' ? 'bg-amber-500' : ''}
            >
              <Icon name="Users" size={20} className="mr-2" />
              Пользователи
            </Button>
          </div>

          {activeTab === 'statistics' && (
            <div className="space-y-6">
              {/* Общая статистика */}
              <div className="grid sm:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Icon name="Users" size={32} className="text-white" />
                      <div className="text-3xl font-black text-white">{allUsers.length}</div>
                    </div>
                    <p className="text-white/80 text-sm">Всего сотрудников</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-600 to-green-700 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Icon name="CheckCircle" size={32} className="text-white" />
                      <div className="text-3xl font-black text-white">
                        {(() => {
                          const allProgress = allUsers.flatMap(u => getUserProgress(u.id));
                          return allProgress.filter(p => p.completed).length;
                        })()}
                      </div>
                    </div>
                    <p className="text-white/80 text-sm">Пройдено экзаменов</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-600 to-amber-700 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Icon name="Target" size={32} className="text-white" />
                      <div className="text-3xl font-black text-white">
                        {(() => {
                          const allResults = getExamResults();
                          const avgScore = allResults.length > 0 
                            ? Math.round(allResults.reduce((sum, r) => sum + r.score, 0) / allResults.length)
                            : 0;
                          return avgScore;
                        })()}%
                      </div>
                    </div>
                    <p className="text-white/80 text-sm">Средний балл</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Icon name="Trophy" size={32} className="text-white" />
                      <div className="text-3xl font-black text-white">
                        {(() => {
                          const allResults = getExamResults();
                          return allResults.filter(r => r.score === 100).length;
                        })()}
                      </div>
                    </div>
                    <p className="text-white/80 text-sm">Отличников (100%)</p>
                  </CardContent>
                </Card>
              </div>

              {/* Последние активности и анализ сложности */}
              <div className="grid lg:grid-cols-2 gap-6">
                <RecentActivity />
                <DifficultyHeatmap />
              </div>

              {/* Прогресс по разделам */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Icon name="PieChart" size={28} className="text-amber-400" />
                    Прогресс по разделам обучения
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* El Códice */}
                    {(() => {
                      const codiceContent = loadContent().filter(p => p.section === 'codice' && p.hasExam);
                      const totalCodeice = codiceContent.length;
                      const completedCodeice = allUsers.flatMap(u => getUserProgress(u.id))
                        .filter(p => p.completed && codiceContent.some(c => c.id === p.contentId))
                        .length;
                      const maxPossibleCodeice = allUsers.length * totalCodeice;
                      
                      return (
                        <div className="text-center space-y-4">
                          <ProgressChart 
                            completed={completedCodeice} 
                            total={maxPossibleCodeice}
                            color="#a855f7"
                          />
                          <div>
                            <h4 className="text-lg font-bold text-white">El Códice</h4>
                            <p className="text-sm text-slate-400">
                              {completedCodeice} из {maxPossibleCodeice} сдано
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                    
                    {/* Обучение зала */}
                    {(() => {
                      const hallContent = loadContent().filter(p => p.section === 'training-hall' && p.hasExam);
                      const totalHall = hallContent.length;
                      const completedHall = allUsers.flatMap(u => getUserProgress(u.id))
                        .filter(p => p.completed && hallContent.some(c => c.id === p.contentId))
                        .length;
                      const maxPossibleHall = allUsers.length * totalHall;
                      
                      return (
                        <div className="text-center space-y-4">
                          <ProgressChart 
                            completed={completedHall} 
                            total={maxPossibleHall}
                            color="#3b82f6"
                          />
                          <div>
                            <h4 className="text-lg font-bold text-white">Обучение зала</h4>
                            <p className="text-sm text-slate-400">
                              {completedHall} из {maxPossibleHall} сдано
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                    
                    {/* Средний балл по компании */}
                    {(() => {
                      const allResults = getExamResults();
                      const avgCompanyScore = allResults.length > 0
                        ? Math.round(allResults.reduce((sum, r) => sum + r.score, 0) / allResults.length)
                        : 0;
                      
                      return (
                        <div className="text-center space-y-4">
                          <ProgressChart 
                            completed={avgCompanyScore} 
                            total={100}
                            color="#f59e0b"
                          />
                          <div>
                            <h4 className="text-lg font-bold text-white">Средний балл</h4>
                            <p className="text-sm text-slate-400">
                              По всем экзаменам
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                    
                    {/* Общий прогресс */}
                    {(() => {
                      const allContent = loadContent().filter(p => p.hasExam);
                      const totalExams = allContent.length * allUsers.length;
                      const completedExams = allUsers.flatMap(u => getUserProgress(u.id))
                        .filter(p => p.completed)
                        .length;
                      
                      return (
                        <div className="text-center space-y-4">
                          <ProgressChart 
                            completed={completedExams} 
                            total={totalExams}
                            color="#10b981"
                          />
                          <div>
                            <h4 className="text-lg font-bold text-white">Общий прогресс</h4>
                            <p className="text-sm text-slate-400">
                              Все сотрудники
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>

              {/* ТОП-3 лучших сотрудников */}
              {allUsers.length > 0 && (
                <Card className="bg-gradient-to-br from-amber-500/20 to-purple-500/20 backdrop-blur-sm border-2 border-amber-500/30">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <Icon name="Award" size={28} className="text-amber-400" />
                      ТОП-3 лучших сотрудников
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-6">
                      {(() => {
                        const usersWithStats = allUsers.map(u => {
                          const progress = getUserProgress(u.id);
                          const completed = progress.filter(p => p.completed).length;
                          const avgScore = progress.length > 0
                            ? Math.round(progress.reduce((sum, p) => sum + (p.examScore || 0), 0) / progress.length)
                            : 0;
                          return { ...u, completed, avgScore, totalScore: completed * 100 + avgScore };
                        }).sort((a, b) => b.totalScore - a.totalScore).slice(0, 3);

                        const medals = [
                          { icon: 'Trophy', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50' },
                          { icon: 'Medal', color: 'text-slate-300', bg: 'bg-slate-500/20', border: 'border-slate-500/50' },
                          { icon: 'Award', color: 'text-amber-600', bg: 'bg-amber-600/20', border: 'border-amber-600/50' }
                        ];

                        return usersWithStats.map((u, idx) => {
                          const medal = medals[idx];
                          return (
                            <div key={u.id} className={`relative p-6 bg-slate-800/50 rounded-xl border-2 ${medal.border} hover:scale-105 transition-transform`}>
                              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <div className={`${medal.bg} rounded-full p-3 border-2 ${medal.border}`}>
                                  <Icon name={medal.icon as any} size={32} className={medal.color} />
                                </div>
                              </div>
                              <div className="text-center mt-8 space-y-3">
                                <div className="text-4xl font-black text-white">#{idx + 1}</div>
                                <h4 className="text-xl font-bold text-white">{u.fullName}</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Пройдено:</span>
                                    <span className="text-white font-bold">{u.completed}/7</span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Средний балл:</span>
                                    <span className={`font-bold text-xl ${
                                      u.avgScore >= 85 ? 'text-green-400' :
                                      u.avgScore >= 70 ? 'text-amber-400' :
                                      'text-red-400'
                                    }`}>
                                      {u.avgScore}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Таблица результатов */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Icon name="Table" size={28} className="text-amber-400" />
                      Результаты экзаменов всех сотрудников
                    </h3>
                    <div className="flex items-center gap-3">
                      <Select value={filterRole} onValueChange={(value: any) => setFilterRole(value)}>
                        <SelectTrigger className="w-[180px] bg-slate-900/50 border-slate-700 text-white">
                          <SelectValue placeholder="Фильтр по роли" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все сотрудники</SelectItem>
                          <SelectItem value="hall">Зал</SelectItem>
                          <SelectItem value="manager">Управляющие</SelectItem>
                          <SelectItem value="super_admin">Генеральные</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={exportToCSV}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Icon name="Download" size={16} className="mr-2" />
                        Экспорт CSV
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left p-3 text-sm font-bold text-amber-400">Сотрудник</th>
                          <th className="text-left p-3 text-sm font-bold text-amber-400">Должность</th>
                          <th className="text-center p-3 text-sm font-bold text-amber-400">Пройдено</th>
                          <th className="text-center p-3 text-sm font-bold text-amber-400">Средний балл</th>
                          <th className="text-center p-3 text-sm font-bold text-amber-400">Прогресс</th>
                          <th className="text-right p-3 text-sm font-bold text-amber-400">Детали</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers.filter(u => filterRole === 'all' || u.role === filterRole).map((u) => {
                          const progress = getUserProgress(u.id);
                          const completed = progress.filter(p => p.completed).length;
                          const avgScore = progress.length > 0
                            ? Math.round(progress.reduce((sum, p) => sum + (p.examScore || 0), 0) / progress.length)
                            : 0;
                          const totalExams = 7; // 3 codice + 4 training-hall
                          const progressPercent = Math.round((completed / totalExams) * 100);
                          
                          return (
                            <tr key={u.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                              <td className="p-3">
                                <div>
                                  <p className="text-white font-medium">{u.fullName}</p>
                                  <p className="text-xs text-slate-400">{u.email}</p>
                                </div>
                              </td>
                              <td className="p-3">
                                <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-300">
                                  {u.role === 'super_admin' ? 'Генеральный' : 
                                   u.role === 'manager' ? 'Управляющий' : 
                                   u.role === 'hall' ? 'Зал' : 'Сотрудник'}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <span className="text-white font-bold">{completed}</span>
                                <span className="text-slate-400">/{totalExams}</span>
                              </td>
                              <td className="p-3 text-center">
                                <span className={`text-2xl font-bold ${
                                  avgScore >= 85 ? 'text-green-400' :
                                  avgScore >= 70 ? 'text-amber-400' :
                                  'text-red-400'
                                }`}>
                                  {avgScore}%
                                </span>
                              </td>
                              <td className="p-3">
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-400">{progressPercent}%</span>
                                  </div>
                                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                                    <div 
                                      className={`h-full transition-all ${
                                        progressPercent === 100 ? 'bg-green-500' :
                                        progressPercent >= 50 ? 'bg-amber-500' :
                                        'bg-blue-500'
                                      }`}
                                      style={{ width: `${progressPercent}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <CertificateGenerator 
                                    userName={u.fullName}
                                    completedExams={completed}
                                    avgScore={avgScore}
                                    completedAt={progress.find(p => p.completedAt)?.completedAt}
                                  />
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setSelectedUser(u)}
                                    className="text-amber-400 hover:text-white hover:bg-amber-500/20"
                                  >
                                    <Icon name="Eye" size={16} className="mr-1" />
                                    Подробнее
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {allUsers.length === 0 && (
                      <div className="text-center py-12">
                        <Icon name="Users" size={64} className="text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">Пока нет зарегистрированных сотрудников</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Детальная информация о сотруднике */}
              {selectedUser && (
                <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-purple-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{selectedUser.fullName}</h3>
                        <p className="text-slate-400">{selectedUser.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const progress = getUserProgress(selectedUser.id);
                          const completed = progress.filter(p => p.completed).length;
                          const avgScore = progress.length > 0
                            ? Math.round(progress.reduce((sum, p) => sum + (p.examScore || 0), 0) / progress.length)
                            : 0;
                          const lastCompleted = progress
                            .filter(p => p.completedAt)
                            .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())[0];
                          
                          return (
                            <CertificateGenerator 
                              userName={selectedUser.fullName}
                              completedExams={completed}
                              avgScore={avgScore}
                              completedAt={lastCompleted?.completedAt}
                            />
                          );
                        })()}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedUser(null)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Icon name="X" size={20} />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-white mb-4">История экзаменов</h4>
                      {(() => {
                        const userResults = getExamResults(selectedUser.id);
                        if (userResults.length === 0) {
                          return (
                            <div className="text-center py-8">
                              <Icon name="FileQuestion" size={48} className="text-slate-600 mx-auto mb-3" />
                              <p className="text-slate-400">Экзамены ещё не сдавались</p>
                            </div>
                          );
                        }
                        
                        return (
                          <div className="space-y-3">
                            {userResults.map((result, idx) => (
                              <div key={idx} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <h5 className="text-white font-bold">{result.contentTitle}</h5>
                                    <p className="text-xs text-slate-400">
                                      {new Date(result.completedAt).toLocaleString('ru-RU')}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <div className={`text-2xl font-black ${
                                      result.score === 100 ? 'text-green-400' :
                                      result.score >= 85 ? 'text-green-500' :
                                      result.score >= 70 ? 'text-amber-400' :
                                      'text-red-400'
                                    }`}>
                                      {result.score}%
                                    </div>
                                    <p className="text-xs text-slate-400">
                                      {result.answers.filter(a => a.correct).length}/{result.totalQuestions}
                                    </p>
                                  </div>
                                </div>
                                
                                {/* Детали ответов */}
                                <div className="space-y-2">
                                  {result.answers.map((answer, ansIdx) => (
                                    <div key={ansIdx} className="flex items-center gap-2">
                                      <Icon 
                                        name={answer.correct ? "CheckCircle" : "XCircle"} 
                                        size={16} 
                                        className={answer.correct ? "text-green-400" : "text-red-400"} 
                                      />
                                      <span className="text-sm text-slate-300">
                                        Вопрос {ansIdx + 1}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

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

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-white">Прикрепленные файлы</label>
                        <FileUploader
                          onFileUploaded={(url, name, type) => {
                            setUploadedFiles([...uploadedFiles, { url, name, type }]);
                            setMessage(`Файл "${name}" загружен!`);
                            setTimeout(() => setMessage(''), 2000);
                          }}
                        />
                        {uploadedFiles.length > 0 && (
                          <div className="space-y-2">
                            {uploadedFiles.map((file, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                                <div className="flex items-center gap-2">
                                  <Icon 
                                    name={file.type === 'image' ? 'Image' : file.type === 'video' ? 'Video' : 'FileText'} 
                                    size={20} 
                                    className="text-amber-400" 
                                  />
                                  <span className="text-sm text-white">{file.name}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))}
                                >
                                  <Icon name="Trash" size={16} className="text-red-400" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
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

          {activeTab === 'users' && (
            <div className="max-w-4xl mx-auto">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Все пользователи системы</h3>
                    <p className="text-slate-400">Супер-админ панель просмотра всех аккаунтов</p>
                  </div>

                  <div className="space-y-4">
                    {allUsers.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon name="Users" size={64} className="text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">Пользователи не найдены</p>
                      </div>
                    ) : (
                      allUsers.map((userData) => (
                        <Card
                          key={userData.id}
                          className="bg-slate-900/50 border border-slate-700 hover:border-amber-500/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedUser(userData)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-amber-500/20 rounded-lg">
                                    <Icon name="User" size={24} className="text-amber-400" />
                                  </div>
                                  <div>
                                    <h4 className="text-lg font-bold text-white">{userData.fullName}</h4>
                                    <p className="text-sm text-slate-400">{userData.email}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-slate-500">ID</p>
                                    <p className="text-white font-mono text-xs">{userData.id}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-500">Роль</p>
                                    <p className="text-amber-400 font-medium">
                                      {userData.role === 'manager' ? 'Управляющий' : 'Персонал зала'}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-slate-500">Password Hash</p>
                                    <p className="text-white font-mono text-xs truncate">{userData.passwordHash}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-500">Дата создания</p>
                                    <p className="text-white text-xs">
                                      {userData.createdAt ? new Date(userData.createdAt).toLocaleString('ru-RU') : 'Не указана'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteUser(userData.id);
                                }}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                              >
                                <Icon name="Trash2" size={18} />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>

                  {selectedUser && (
                    <div className="mt-6 p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <h4 className="text-lg font-bold text-white mb-4">Детали пользователя</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Полное имя:</span>
                          <span className="text-white font-medium">{selectedUser.fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Email:</span>
                          <span className="text-white font-medium">{selectedUser.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">ID:</span>
                          <span className="text-white font-mono text-xs">{selectedUser.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Роль:</span>
                          <span className="text-amber-400">{selectedUser.role}</span>
                        </div>
                        <div className="border-t border-purple-500/30 pt-2 mt-2">
                          <p className="text-slate-400 mb-1">Password Hash (SHA-256):</p>
                          <p className="text-white font-mono text-xs break-all bg-slate-900/50 p-2 rounded">
                            {selectedUser.passwordHash}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedUser(null)}
                        className="mt-4 w-full text-slate-400 hover:text-white"
                      >
                        Закрыть детали
                      </Button>
                    </div>
                  )}

                  <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Icon name="Shield" size={20} className="text-yellow-400 mt-1" />
                      <div>
                        <p className="text-yellow-400 font-bold mb-1">Супер-админ функции</p>
                        <p className="text-slate-300 text-sm">
                          Для удаления пользователя требуется супер-админ пароль: <code className="text-amber-400 bg-slate-900/50 px-2 py-1 rounded">marina_super_admin_2025</code>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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