import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress?: number;
  total?: number;
}

interface ProgressBadgeProps {
  userProgress: any[];
}

const ProgressBadge = ({ userProgress }: ProgressBadgeProps) => {
  const completedCount = userProgress.filter(p => p.completed).length;
  const avgScore = userProgress.length > 0 
    ? Math.round(userProgress.reduce((sum, p) => sum + (p.examScore || 0), 0) / userProgress.length)
    : 0;
  
  const achievements: Achievement[] = [
    {
      id: 'first-exam',
      title: 'Первый шаг',
      description: 'Сдан первый экзамен',
      icon: 'Award',
      color: 'text-blue-400',
      unlocked: completedCount >= 1
    },
    {
      id: 'codice-complete',
      title: 'Знаток философии',
      description: 'Пройден раздел El Códice',
      icon: 'BookOpen',
      color: 'text-purple-400',
      unlocked: userProgress.filter(p => p.completed && p.contentId <= '3').length >= 3
    },
    {
      id: 'training-hall',
      title: 'Профессионал зала',
      description: 'Завершено обучение зала',
      icon: 'GraduationCap',
      color: 'text-amber-400',
      unlocked: userProgress.filter(p => p.completed && ['4', '7', '8', '9'].includes(p.contentId)).length >= 4
    },
    {
      id: 'perfect-score',
      title: 'Отличник',
      description: 'Сдан экзамен на 100%',
      icon: 'Star',
      color: 'text-yellow-400',
      unlocked: userProgress.some(p => p.examScore === 100)
    },
    {
      id: 'high-avg',
      title: 'Эксперт',
      description: 'Средний балл выше 85%',
      icon: 'Trophy',
      color: 'text-green-400',
      unlocked: avgScore >= 85
    },
    {
      id: 'complete-all',
      title: 'Мастер ARRURRU',
      description: 'Пройдены все экзамены',
      icon: 'Crown',
      color: 'text-amber-400',
      unlocked: completedCount >= 7
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  
  return (
    <div className="space-y-6">
      {unlockedAchievements.length > 0 && (
        <Card className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 backdrop-blur-sm border-2 border-amber-500/30">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Icon name="Award" size={24} className="text-amber-400" />
              Ваши достижения
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    achievement.unlocked
                      ? 'bg-slate-800/70 border-amber-500/50 hover:border-amber-500'
                      : 'bg-slate-900/50 border-slate-700/30 opacity-40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-amber-500/20' : 'bg-slate-700/20'}`}>
                      <Icon 
                        name={achievement.icon as any} 
                        size={24} 
                        className={achievement.unlocked ? achievement.color : 'text-slate-600'}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold ${achievement.unlocked ? 'text-white' : 'text-slate-600'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs ${achievement.unlocked ? 'text-slate-300' : 'text-slate-700'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  {!achievement.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-lg">
                      <Icon name="Lock" size={32} className="text-slate-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProgressBadge;
