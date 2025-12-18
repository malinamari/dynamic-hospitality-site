import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, getUserProgress, getExamResults } from '@/lib/arrurru-content';
import ProgressChart from '@/components/ProgressChart';
import RecentActivity from '@/components/RecentActivity';
import DifficultyHeatmap from '@/components/DifficultyHeatmap';
import CertificateGenerator from '@/components/CertificateGenerator';

interface StatisticsTabProps {
  allUsers: (User & { passwordHash: string; createdAt?: string })[];
  selectedUser: (User & { passwordHash: string; createdAt?: string }) | null;
  setSelectedUser: (user: (User & { passwordHash: string; createdAt?: string }) | null) => void;
  filterRole: 'all' | 'hall' | 'manager' | 'super_admin';
  setFilterRole: (role: 'all' | 'hall' | 'manager' | 'super_admin') => void;
  exportToCSV: () => void;
}

const StatisticsTab = ({ 
  allUsers, 
  selectedUser, 
  setSelectedUser, 
  filterRole, 
  setFilterRole, 
  exportToCSV 
}: StatisticsTabProps) => {
  const filteredUsers = filterRole === 'all' 
    ? allUsers 
    : allUsers.filter(u => u.role === filterRole);

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-orange-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Статистика обучения</h2>
            <div className="flex gap-3">
              <Select value={filterRole} onValueChange={(v) => setFilterRole(v as any)}>
                <SelectTrigger className="w-48 bg-slate-700 text-white border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 text-white border-slate-600">
                  <SelectItem value="all">Все сотрудники</SelectItem>
                  <SelectItem value="hall">Только зал</SelectItem>
                  <SelectItem value="manager">Только управляющие</SelectItem>
                  <SelectItem value="super_admin">Только генеральные</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700">
                <Icon name="Download" size={20} className="mr-2" />
                Экспорт в CSV
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-500/50">
              <p className="text-sm text-blue-300 mb-1">Всего сотрудников</p>
              <p className="text-3xl font-bold text-white">{filteredUsers.length}</p>
            </div>
            <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/50">
              <p className="text-sm text-green-300 mb-1">Прошли обучение</p>
              <p className="text-3xl font-bold text-white">
                {filteredUsers.filter(u => {
                  const progress = getUserProgress(u.id);
                  return progress.filter(p => p.completed).length >= 5;
                }).length}
              </p>
            </div>
            <div className="bg-amber-500/20 p-4 rounded-lg border border-amber-500/50">
              <p className="text-sm text-amber-300 mb-1">Средний прогресс</p>
              <p className="text-3xl font-bold text-white">
                {Math.round(
                  filteredUsers.reduce((sum, u) => {
                    const progress = getUserProgress(u.id);
                    return sum + (progress.filter(p => p.completed).length / 7) * 100;
                  }, 0) / (filteredUsers.length || 1)
                )}%
              </p>
            </div>
            <div className="bg-purple-500/20 p-4 rounded-lg border border-purple-500/50">
              <p className="text-sm text-purple-300 mb-1">Средний балл</p>
              <p className="text-3xl font-bold text-white">
                {Math.round(
                  filteredUsers.reduce((sum, u) => {
                    const progress = getUserProgress(u.id);
                    const userAvg = progress.length > 0
                      ? progress.reduce((s, p) => s + (p.examScore || 0), 0) / progress.length
                      : 0;
                    return sum + userAvg;
                  }, 0) / (filteredUsers.length || 1)
                )}%
              </p>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">ФИО</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Должность</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-300">Экзамены</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-300">Средний балл</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-300">Прогресс</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-300">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const progress = getUserProgress(u.id);
                  const completed = progress.filter(p => p.completed).length;
                  const avgScore = progress.length > 0
                    ? Math.round(progress.reduce((sum, p) => sum + (p.examScore || 0), 0) / progress.length)
                    : 0;
                  const progressPercent = Math.round((completed / 7) * 100);
                  
                  return (
                    <tr key={u.id} className="border-b border-slate-700 hover:bg-slate-700/30">
                      <td className="py-3 px-4 text-white">{u.fullName}</td>
                      <td className="py-3 px-4 text-slate-300">{u.email}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          u.role === 'super_admin' ? 'bg-purple-500/30 text-purple-300' :
                          u.role === 'manager' ? 'bg-orange-500/30 text-orange-300' :
                          'bg-blue-500/30 text-blue-300'
                        }`}>
                          {u.role === 'super_admin' ? 'Генеральный' : 
                           u.role === 'manager' ? 'Управляющий' : 
                           u.role === 'hall' ? 'Зал' : 'Сотрудник'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-white">{completed} / 7</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-bold ${
                          avgScore >= 80 ? 'text-green-400' :
                          avgScore >= 60 ? 'text-amber-400' :
                          'text-red-400'
                        }`}>
                          {avgScore}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-300">{progressPercent}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedUser(u)}
                          className="text-amber-400 border-amber-500/50"
                        >
                          Подробнее
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedUser && (
        <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedUser.fullName}</h3>
                <p className="text-slate-400">{selectedUser.email}</p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedUser(null)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ProgressChart userId={selectedUser.id} userName={selectedUser.fullName} />
              </div>
              <div>
                <RecentActivity userId={selectedUser.id} />
              </div>
            </div>

            <div className="mt-6">
              <DifficultyHeatmap userId={selectedUser.id} />
            </div>

            <div className="mt-6">
              <CertificateGenerator
                userId={selectedUser.id}
                userName={selectedUser.fullName}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StatisticsTab;