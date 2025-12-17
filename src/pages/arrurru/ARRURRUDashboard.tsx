import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getCurrentUser, logout } from '@/lib/arrurru-auth';

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

  useEffect(() => {
    if (!user) {
      navigate('/arrurru/login');
    }
  }, [user, navigate]);

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
              <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/50">
                <Icon name="Crown" size={24} className="text-amber-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ARRURRU</h1>
                <p className="text-sm text-slate-400">Личный кабинет</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
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
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Добро пожаловать, {user.fullName.split(' ')[0]}!
            </h2>
            <p className="text-xl text-amber-400">
              Выберите раздел для работы
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {sections.map((section) => (
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
            ))}
          </div>

          {user.role === 'manager' && (
            <div className="mt-12">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-500/20 rounded-lg border border-amber-500/50">
                        <Icon name="Settings" size={24} className="text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Панель управления</h3>
                        <p className="text-sm text-slate-400">Редактирование контента и создание приглашений</p>
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
