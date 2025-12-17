import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { login } from '@/lib/arrurru-auth';

const ARRURRULogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/arrurru/dashboard');
    } else {
      setError(result.error || 'Ошибка входа');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-amber-500/20 backdrop-blur-sm rounded-full border-2 border-amber-500">
            <Icon name="GraduationCap" size={48} className="text-amber-400" />
          </div>
          <h1 className="text-4xl font-black text-white">Обучение и проекты</h1>
          <p className="text-xl text-amber-400">Платформа для развития бизнеса</p>
          <p className="text-slate-300 max-w-md mx-auto">
            Добро пожаловать в образовательную платформу. После авторизации вы получите доступ к материалам вашего проекта.
          </p>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-slate-900/50 border-slate-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Пароль</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-slate-900/50 border-slate-700 text-white"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Вход...' : 'Войти в систему'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/arrurru/request-invite')}
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
              >
                Запросить приглашение
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            ← Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  );
};

export default ARRURRULogin;