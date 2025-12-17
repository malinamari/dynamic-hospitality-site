import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getCurrentUser, logout } from '@/lib/arrurru-auth';
import { getAllUsers } from '@/lib/arrurru-users';

interface ProjectStats {
  totalUsers: number;
  completedExams: number;
  avgScore: number;
}

const ARRURRUProjectSelect = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [projects, setProjects] = useState<{ name: string; stats: ProjectStats }[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'super_admin') {
      navigate('/arrurru/login');
      return;
    }

    const allUsers = getAllUsers();
    const projectMap = new Map<string, any[]>();
    
    allUsers.forEach(u => {
      const projectName = u.projectName || 'ARRURRU';
      if (!projectMap.has(projectName)) {
        projectMap.set(projectName, []);
      }
      projectMap.get(projectName)?.push(u);
    });

    const projectList = Array.from(projectMap.entries()).map(([name, users]) => {
      const progressKey = 'arrurru_progress';
      const progressData = localStorage.getItem(progressKey);
      let totalCompleted = 0;
      let totalScore = 0;
      let scoreCount = 0;

      if (progressData) {
        try {
          const allProgress = JSON.parse(progressData);
          users.forEach(u => {
            const userProgress = allProgress.filter((p: any) => p.userId === u.id);
            totalCompleted += userProgress.filter((p: any) => p.completed).length;
            userProgress.forEach((p: any) => {
              if (p.examScore) {
                totalScore += p.examScore;
                scoreCount++;
              }
            });
          });
        } catch {}
      }

      return {
        name,
        stats: {
          totalUsers: users.length,
          completedExams: totalCompleted,
          avgScore: scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0
        }
      };
    });

    setProjects(projectList);
  }, [user, navigate]);

  const handleSelectProject = (projectName: string) => {
    localStorage.setItem('arrurru_selected_project', projectName);
    navigate('/arrurru/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/arrurru/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white">Выбор проекта</h1>
            <p className="text-xl text-amber-400">Добро пожаловать, {user.fullName}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/20"
          >
            <Icon name="LogOut" size={20} className="mr-2" />
            Выйти
          </Button>
        </div>

        {projects.length === 0 ? (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
            <CardContent className="p-12 text-center space-y-4">
              <Icon name="FolderOpen" size={64} className="text-slate-600 mx-auto" />
              <h3 className="text-2xl font-bold text-white">Нет доступных проектов</h3>
              <p className="text-slate-400">Создайте первый проект или добавьте пользователей</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.name}
                className="bg-gradient-to-br from-slate-800/70 to-purple-900/30 backdrop-blur-sm border-2 border-amber-500/30 hover:border-amber-500 transition-all cursor-pointer group"
                onClick={() => handleSelectProject(project.name)}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-colors">
                      <Icon name="Building2" size={32} className="text-amber-400" />
                    </div>
                    <Icon name="ArrowRight" size={24} className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Сотрудников:</span>
                        <span className="font-bold text-white">{project.stats.totalUsers}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Пройдено экзаменов:</span>
                        <span className="font-bold text-white">{project.stats.completedExams}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Средний балл:</span>
                        <span className="font-bold text-amber-400">{project.stats.avgScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <Button
                      className="w-full bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-white border border-amber-500/50 transition-all"
                    >
                      Открыть проект
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ARRURRUProjectSelect;
