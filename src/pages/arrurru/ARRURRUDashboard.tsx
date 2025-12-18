import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getCurrentUser, logout } from '@/lib/arrurru-auth';
import { getUserProgress, getContentBySection, loadContent, isAllExamsCompleted, requestCertificate, hasCertificateRequest } from '@/lib/arrurru-content';
import { useState } from 'react';
import ProgressBadge from '@/components/ProgressBadge';
import ReportErrorButton from '@/components/ReportErrorButton';

const sections = [
  {
    id: 'codice',
    title: 'El Códice de ARRURRU',
    description: 'Философия, ценности и кодекс проекта',
    icon: 'BookOpen',
    color: 'from-purple-600 to-purple-700',
    path: '/arrurru/codice'
  },
  {
    id: 'training-hall',
    title: 'Обучение зала',
    description: 'Структура обучения и учебные материалы для сотрудников зала',
    icon: 'GraduationCap',
    color: 'from-blue-600 to-blue-700',
    path: '/arrurru/training-hall'
  },
  {
    id: 'trainings',
    title: 'Тренинги',
    description: 'Расписание, материалы и записи тренингов',
    icon: 'Users',
    color: 'from-amber-600 to-amber-700',
    path: '/arrurru/trainings'
  },
  {
    id: 'standards',
    title: 'Стандарты и правила',
    description: 'Сервисные стандарты, регламенты и чек-листы',
    icon: 'FileCheck',
    color: 'from-green-600 to-green-700',
    path: '/arrurru/standards'
  }
];

const ARRURRUDashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [userProgress] = useState(() => user ? getUserProgress(user.id) : []);
  const [certificateMessage, setCertificateMessage] = useState('');
  const allExamsCompleted = user ? isAllExamsCompleted(user.id) : false;
  const hasCertRequest = user ? hasCertificateRequest(user.id) : false;

  useEffect(() => {
    if (!user) {
      navigate('/arrurru/login');
      return;
    }
    loadContent();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/arrurru/login');
  };

  const handleRequestCertificate = () => {
    if (!user) return;
    
    const result = requestCertificate(user.id, user.fullName, user.email);
    
    if (result.success) {
      setCertificateMessage('Запрос на сертификат отправлен! Управляющий рассмотрит его в ближайшее время.');
      setTimeout(() => setCertificateMessage(''), 5000);
      window.location.reload();
    } else {
      setCertificateMessage(result.error || 'Ошибка при отправке запроса');
      setTimeout(() => setCertificateMessage(''), 3000);
    }
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
                onClick={() => navigate('/')}
                className="text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                На главную
              </Button>
              <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/50">
                <Icon name="Building2" size={24} className="text-amber-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{user.projectName || 'ARRURRU'}</h1>
                <p className="text-sm text-slate-400">{user.role === 'super_admin' ? 'Генеральный доступ' : 'Профиль проекта'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ReportErrorButton pageName="Главная панель" />
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{user.fullName}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
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
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-4xl md:text-5xl font-black text-white">
                Добро пожаловать, {user.fullName.split(' ')[0]}!
              </h2>
              <p className="text-xl text-amber-400">
                {user.role === 'super_admin' 
                  ? 'Генеральный доступ ко всем проектам'
                  : `Профиль проекта: ${user.projectName || 'ARRURRU'}`}
              </p>
            </div>
            
            {/* Прогресс-бар */}
            <Card className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 backdrop-blur-sm border-2 border-amber-500/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Ваш прогресс обучения</h3>
                      <p className="text-sm text-slate-300">Пройдено {userProgress.filter(p => p.completed).length} из {(() => {
                        const codice = getContentBySection('codice');
                        const trainingHall = getContentBySection('training-hall');
                        return codice.filter(p => p.hasExam).length + trainingHall.filter(p => p.hasExam).length;
                      })()} экзаменов</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-amber-400">
                        {Math.round((userProgress.filter(p => p.completed).length / (() => {
                          const codice = getContentBySection('codice');
                          const trainingHall = getContentBySection('training-hall');
                          return codice.filter(p => p.hasExam).length + trainingHall.filter(p => p.hasExam).length;
                        })()) * 100) || 0}%
                      </div>
                      <p className="text-xs text-slate-400">Завершено</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-purple-500 transition-all duration-500"
                      style={{
                        width: `${Math.round((userProgress.filter(p => p.completed).length / (() => {
                          const codice = getContentBySection('codice');
                          const trainingHall = getContentBySection('training-hall');
                          return codice.filter(p => p.hasExam).length + trainingHall.filter(p => p.hasExam).length;
                        })()) * 100) || 0}%`
                      }}
                    />
                  </div>
                  {userProgress.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                      <div className="text-center">
                        <Icon name="Target" size={24} className="text-amber-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">
                          {Math.round(userProgress.reduce((sum, p) => sum + (p.examScore || 0), 0) / userProgress.length) || 0}%
                        </div>
                        <p className="text-xs text-slate-400">Средний балл</p>
                      </div>
                      <div className="text-center">
                        <Icon name="Trophy" size={24} className="text-amber-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">
                          {userProgress.filter(p => p.completed).length}
                        </div>
                        <p className="text-xs text-slate-400">Пройдено тестов</p>
                      </div>
                      <div className="text-center">
                        <Icon name="Zap" size={24} className="text-amber-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">
                          {userProgress.reduce((sum, p) => sum + p.examAttempts, 0)}
                        </div>
                        <p className="text-xs text-slate-400">Всего попыток</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Достижения */}
            {userProgress.length > 0 && (
              <ProgressBadge userProgress={userProgress} />
            )}
            
            {/* Запрос сертификата */}
            {allExamsCompleted && !hasCertRequest && (
              <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-2 border-green-500/50 mt-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-green-500/20 rounded-full">
                      <Icon name="Award" size={40} className="text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Поздравляем! 🎉</h3>
                      <p className="text-slate-300 mb-4">
                        Вы успешно прошли все экзамены! Теперь вы можете запросить сертификат об окончании обучения ARRURRU.
                      </p>
                      <Button
                        onClick={handleRequestCertificate}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Icon name="Award" size={20} className="mr-2" />
                        Запросить сертификат
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {hasCertRequest && (
              <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border-2 border-amber-500/50 mt-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-amber-500/20 rounded-full">
                      <Icon name="Clock" size={40} className="text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Запрос отправлен</h3>
                      <p className="text-slate-300">
                        Ваш запрос на получение сертификата находится на рассмотрении. Управляющий свяжется с вами в ближайшее время.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {certificateMessage && (
              <div className="fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                {certificateMessage}
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {sections.map((section) => {
              const sectionContent = getContentBySection(section.id as any);
              const sectionExams = sectionContent.filter(p => p.hasExam);
              const completedInSection = userProgress.filter(p => 
                sectionExams.some(c => c.id === p.contentId) && p.completed
              ).length;
              const progressPercentage = sectionExams.length > 0 
                ? Math.round((completedInSection / sectionExams.length) * 100)
                : 0;
              
              return (
              <Card
                key={section.id}
                className="group bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30 hover:border-amber-500 transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => navigate(section.path)}
              >
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mx-auto`}>
                      <Icon name={section.icon as any} size={40} className="text-white" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-slate-300">
                        {section.description}
                      </p>
                      {sectionExams.length > 0 && (
                        <div className="pt-2">
                          <div className="flex items-center justify-center gap-2 text-sm mb-2">
                            <Icon name="CheckCircle" size={16} className="text-green-400" />
                            <span className="text-white font-medium">
                              {completedInSection}/{sectionExams.length} экзаменов
                            </span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${section.color} transition-all duration-500`}
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-400 hover:text-white hover:bg-amber-500/20"
                      >
                        Открыть
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>

          {(user.role === 'manager' || user.role === 'super_admin') && (
            <div className="mt-12">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-500/20 rounded-lg border border-amber-500/50">
                        <Icon name={user.role === 'super_admin' ? 'Crown' : 'Settings'} size={24} className="text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {user.role === 'super_admin' ? 'Генеральная панель' : 'Панель управления'}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {user.role === 'super_admin' 
                            ? 'Полный доступ: просмотр всех профилей, редактирование контента, управление пользователями'
                            : 'Редактирование контента и создание приглашений'}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => navigate('/arrurru/admin')}
                      className="bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      Открыть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ARRURRUDashboard;