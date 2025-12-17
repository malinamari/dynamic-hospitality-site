import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { getExamResults } from '@/lib/arrurru-content';

const RecentActivity = () => {
  const recentResults = getExamResults()
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, 5);

  if (recentResults.length === 0) {
    return null;
  }

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Icon name="Activity" size={24} className="text-amber-400" />
          Последние активности
        </h3>
        <div className="space-y-3">
          {recentResults.map((result, idx) => {
            const timeAgo = (() => {
              const now = new Date();
              const completed = new Date(result.completedAt);
              const diffMs = now.getTime() - completed.getTime();
              const diffMins = Math.floor(diffMs / 60000);
              const diffHours = Math.floor(diffMs / 3600000);
              const diffDays = Math.floor(diffMs / 86400000);

              if (diffMins < 60) return `${diffMins} мин назад`;
              if (diffHours < 24) return `${diffHours} ч назад`;
              return `${diffDays} дн назад`;
            })();

            return (
              <div 
                key={idx} 
                className="flex items-center gap-4 p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-colors animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`p-2 rounded-lg ${
                  result.score === 100 ? 'bg-green-500/20' :
                  result.score >= 85 ? 'bg-green-500/20' :
                  result.score >= 70 ? 'bg-amber-500/20' :
                  'bg-red-500/20'
                }`}>
                  <Icon 
                    name={result.score >= 70 ? "CheckCircle" : "XCircle"} 
                    size={20} 
                    className={
                      result.score === 100 ? 'text-green-400' :
                      result.score >= 85 ? 'text-green-500' :
                      result.score >= 70 ? 'text-amber-400' :
                      'text-red-400'
                    } 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm">{result.userName}</p>
                      <p className="text-slate-400 text-xs">{result.contentTitle}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        result.score === 100 ? 'text-green-400' :
                        result.score >= 85 ? 'text-green-500' :
                        result.score >= 70 ? 'text-amber-400' :
                        'text-red-400'
                      }`}>
                        {result.score}%
                      </div>
                      <p className="text-xs text-slate-500">{timeAgo}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
