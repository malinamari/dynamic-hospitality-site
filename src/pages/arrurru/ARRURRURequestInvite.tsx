import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ARRURRURequestInvite = () => {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    restaurant: '',
    position: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!agreedToTerms) {
      setError('Необходимо согласие на обработку данных');
      return;
    }
    
    if (!formData.fullName || !formData.phone || !formData.email || !formData.restaurant || !formData.position) {
      setError('Заполните все поля');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/30ef74dc-06ab-43cd-99d1-803d07393c0f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Ошибка отправки');
      }
      
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка отправки');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-amber-500/20 backdrop-blur-sm rounded-full border-2 border-amber-500">
            <Icon name="Mail" size={48} className="text-amber-400" />
          </div>
          <h1 className="text-4xl font-black text-white">Запрос доступа</h1>
          <p className="text-xl text-amber-400">Платформа для развития бизнеса</p>
        </div>

        {!sent ? (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center space-y-2 mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Запрос доступа
                  </h2>
                  <p className="text-slate-300 text-sm">
                    Заполните форму, и мы свяжемся с вами
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">ФИО *</label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Иванов Иван Иванович"
                    required
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Телефон *</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+7 (900) 123-45-67"
                    required
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                    required
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Ресторан / Проект *</label>
                  <Input
                    value={formData.restaurant}
                    onChange={(e) => setFormData({...formData, restaurant: e.target.value})}
                    placeholder="ARRURRU"
                    required
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Должность / Роль *</label>
                  <Input
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    placeholder="Официант, Бармен, Управляющий..."
                    required
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
                  disabled={loading || !agreedToTerms}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={20} className="mr-2" />
                      Отправить запрос
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-green-500/30">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="inline-block p-4 bg-green-500/20 rounded-full">
                  <Icon name="CheckCircle" size={64} className="text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Заявка отправлена!
                  </h2>
                  <p className="text-slate-300">
                    Мы получили вашу заявку и свяжемся с вами в ближайшее время для предоставления доступа.
                  </p>
                </div>
                <Button
                  onClick={() => navigate('/arrurru/login')}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold"
                >
                  Перейти ко входу
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center space-y-4">
          <button
            onClick={() => navigate('/arrurru/login')}
            className="text-amber-400 hover:text-amber-300 transition-colors text-sm"
          >
            Уже есть аккаунт? Войти
          </button>
          <div>
            <button
              onClick={() => navigate('/')}
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              ← Вернуться на главную
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARRURRURequestInvite;