import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { register } from '@/lib/arrurru-auth';

const ARRURRURegister = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('Токен приглашения не найден');
    }
  }, [searchParams]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreedToTerms) {
      setError('Необходимо согласие на обработку данных');
      return;
    }

    setLoading(true);

    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      setLoading(false);
      return;
    }

    const result = await register(token, email, password, fullName, projectName || 'ARRURRU');

    if (result.success) {
      navigate('/arrurru/dashboard');
    } else {
      setError(result.error || 'Ошибка регистрации');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-amber-500/20 backdrop-blur-sm rounded-full border-2 border-amber-500">
            <Icon name="UserPlus" size={48} className="text-amber-400" />
          </div>
          <h1 className="text-4xl font-black text-white">Регистрация</h1>
          <p className="text-xl text-amber-400">Платформа для развития бизнеса</p>
          <p className="text-sm text-slate-300">Создайте аккаунт для доступа к вашему проекту</p>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
          <CardContent className="p-8">
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Полное имя</label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Иван Иванов"
                  required
                  className="bg-slate-900/50 border-slate-700 text-white"
                />
              </div>

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
                  placeholder="Минимум 6 символов"
                  required
                  minLength={6}
                  className="bg-slate-900/50 border-slate-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Название проекта (опционально)</label>
                <Input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="ARRURRU"
                  className="bg-slate-900/50 border-slate-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900/50 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-xs text-slate-300">
                    Я согласен на обработку персональных данных и принимаю условия использования платформы
                  </span>
                </label>
              </div>

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !token || !agreedToTerms}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Регистрация...' : 'Создать аккаунт'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/arrurru/login')}
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
              >
                Уже есть аккаунт? Войти
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

export default ARRURRURegister;