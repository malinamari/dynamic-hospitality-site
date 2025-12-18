import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { User } from '@/lib/arrurru-auth';

interface UsersTabProps {
  allUsers: (User & { passwordHash: string; createdAt?: string })[];
  handleDeleteUser: (userId: string) => void;
}

const UsersTab = ({ allUsers, handleDeleteUser }: UsersTabProps) => {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-orange-500/30">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Управление пользователями</h2>

        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">ФИО</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Email</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Должность</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Дата создания</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-300">Действия</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((u) => (
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
                  <td className="py-3 px-4 text-slate-300">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString('ru-RU') : '-'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteUser(u.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-red-500/20 rounded-lg border border-red-500/50">
          <div className="flex items-start gap-3">
            <Icon name="AlertTriangle" size={20} className="text-red-400 flex-shrink-0 mt-1" />
            <div className="text-sm text-slate-300">
              <p className="font-semibold mb-2">Удаление пользователя:</p>
              <ul className="space-y-1">
                <li>• Требуется супер-админ пароль</li>
                <li>• Будут удалены все данные пользователя</li>
                <li>• Действие необратимо</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersTab;