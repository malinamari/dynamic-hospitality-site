import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface InvitesTabProps {
  inviteEmail: string;
  setInviteEmail: (email: string) => void;
  adminPassword: string;
  setAdminPassword: (password: string) => void;
  inviteUrl: string;
  generatedPassword?: string;
  handleCreateInvite: () => void;
  copyToClipboard: (text: string) => void;
}

const InvitesTab = ({
  inviteEmail,
  setInviteEmail,
  adminPassword,
  setAdminPassword,
  inviteUrl,
  generatedPassword,
  handleCreateInvite,
  copyToClipboard
}: InvitesTabProps) => {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-orange-500/30">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Создание приглашения</h2>

        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email нового сотрудника
            </label>
            <Input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="ivan@example.com"
              className="bg-slate-700 text-white border-slate-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Пароль управляющего
            </label>
            <Input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-slate-700 text-white border-slate-600"
            />
          </div>

          <Button
            onClick={handleCreateInvite}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            <Icon name="UserPlus" size={20} className="mr-2" />
            Создать приглашение
          </Button>

          {inviteUrl && (
            <div className="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-500/50 space-y-4">
              <div>
                <p className="text-sm text-green-300 mb-2">Ссылка-приглашение:</p>
                <div className="flex gap-2">
                  <Input
                    value={inviteUrl}
                    readOnly
                    className="bg-slate-700 text-white border-slate-600 flex-1 text-sm"
                  />
                  <Button
                    onClick={() => copyToClipboard(inviteUrl)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Icon name="Copy" size={20} />
                  </Button>
                </div>
              </div>
              
              {generatedPassword && (
                <div>
                  <p className="text-sm text-green-300 mb-2">Сгенерированный пароль:</p>
                  <div className="flex gap-2">
                    <Input
                      value={generatedPassword}
                      readOnly
                      className="bg-slate-700 text-white border-slate-600 flex-1 font-mono text-lg"
                    />
                    <Button
                      onClick={() => copyToClipboard(generatedPassword)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Icon name="Copy" size={20} />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Отправьте этот пароль сотруднику вместе со ссылкой</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-500/20 rounded-lg border border-blue-500/50">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-blue-400 flex-shrink-0 mt-1" />
            <div className="text-sm text-slate-300">
              <p className="font-semibold mb-2">Как это работает:</p>
              <ul className="space-y-1">
                <li>• Введите email нового сотрудника</li>
                <li>• Подтвердите действие паролем управляющего</li>
                <li>• Скопируйте ссылку-приглашение</li>
                <li>• Отправьте её сотруднику (Telegram, Email, WhatsApp)</li>
                <li>• Сотрудник зарегистрируется по уникальной ссылке</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvitesTab;