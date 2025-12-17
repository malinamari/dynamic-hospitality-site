import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { getExamResults, loadContent } from '@/lib/arrurru-content';

const DifficultyHeatmap = () => {
  const allResults = getExamResults();
  const allContent = loadContent().filter(p => p.hasExam);

  if (allResults.length === 0) {
    return null;
  }

  const topicStats = allContent.map(content => {
    const topicResults = allResults.filter(r => r.contentId === content.id);
    const avgScore = topicResults.length > 0
      ? Math.round(topicResults.reduce((sum, r) => sum + r.score, 0) / topicResults.length)
      : 0;
    const attempts = topicResults.length;
    
    return {
      title: content.title,
      section: content.section,
      avgScore,
      attempts,
      difficulty: avgScore >= 85 ? 'easy' : avgScore >= 70 ? 'medium' : 'hard'
    };
  }).sort((a, b) => a.avgScore - b.avgScore);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 border-green-500/50 text-green-400';
      case 'medium': return 'bg-amber-500/20 border-amber-500/50 text-amber-400';
      case 'hard': return 'bg-red-500/20 border-red-500/50 text-red-400';
      default: return 'bg-slate-500/20 border-slate-500/50 text-slate-400';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'ThumbsUp';
      case 'medium': return 'AlertCircle';
      case 'hard': return 'AlertTriangle';
      default: return 'HelpCircle';
    }
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Icon name="TrendingUp" size={28} className="text-amber-400" />
          Анализ сложности тем
        </h3>
        <p className="text-slate-400 text-sm mb-6">
          Темы отсортированы от самых сложных к самым лёгким на основе средних баллов
        </p>
        <div className="space-y-3">
          {topicStats.map((stat, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-lg border-2 ${getDifficultyColor(stat.difficulty)} hover:scale-102 transition-transform`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <Icon name={getDifficultyIcon(stat.difficulty) as any} size={24} />
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{stat.title}</h4>
                    <p className="text-xs opacity-70">
                      {stat.section === 'codice' ? 'El Códice' :
                       stat.section === 'training-hall' ? 'Обучение зала' :
                       stat.section === 'trainings' ? 'Тренинги' :
                       'Стандарты'}
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-2xl font-black">{stat.avgScore}%</div>
                  <p className="text-xs opacity-70">{stat.attempts} попыток</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-3 w-full bg-slate-900/50 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    stat.difficulty === 'easy' ? 'bg-green-500' :
                    stat.difficulty === 'medium' ? 'bg-amber-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${stat.avgScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Рекомендации */}
        {topicStats.length > 0 && (
          <div className="mt-6 p-4 bg-blue-500/10 border-2 border-blue-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Lightbulb" size={24} className="text-blue-400 mt-1" />
              <div className="flex-1">
                <h4 className="font-bold text-white mb-2">Рекомендации</h4>
                <p className="text-sm text-slate-300">
                  {topicStats[0].difficulty === 'hard' ? (
                    <>
                      Тема <strong>"{topicStats[0].title}"</strong> вызывает наибольшие сложности (средний балл {topicStats[0].avgScore}%). 
                      Рекомендуется провести дополнительное обучение по этой теме.
                    </>
                  ) : (
                    <>
                      Отличная работа! Все темы усваиваются хорошо. Продолжайте в том же духе!
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DifficultyHeatmap;
