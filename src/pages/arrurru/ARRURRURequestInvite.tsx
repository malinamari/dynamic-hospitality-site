import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ARRURRURequestInvite = () => {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

  const handleRequest = () => {
    const subject = 'Запрос доступа к образовательной платформе';
    const body = 'Здравствуйте! Прошу предоставить доступ к образовательной платформе для развития бизнеса.';
    window.location.href = `mailto:malinochkamarina@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
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

        <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <Icon name="Lock" size={64} className="text-amber-400 mx-auto" />
                <h2 className="text-2xl font-bold text-white">
                  Доступ только по приглашению
                </h2>
                <p className="text-slate-300">
                  Это закрытая платформа для обучения и развития бизнеса. Для получения доступа свяжитесь с администратором. Мы отправим вам персональную ссылку для регистрации.
                </p>
              </div>

              <Button
                onClick={handleRequest}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold"
              >
                <Icon name="Mail" size={20} className="mr-2" />
                Отправить запрос
              </Button>

              {sent && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <p className="text-sm text-green-300 text-center">
                    Письмо готово! Отправьте его, и мы свяжемся с вами.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-700">
                <p className="text-sm text-slate-400 text-center">
                  Контакты администратора:
                </p>
                <div className="mt-2 flex justify-center gap-4">
                  <a
                    href="https://wa.me/79182858216"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <Icon name="MessageCircle" size={24} />
                  </a>
                  <a
                    href="https://t.me/malinochka_marina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <Icon name="Send" size={24} />
                  </a>
                  <a
                    href="mailto:malinochkamarina@gmail.com"
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <Icon name="Mail" size={24} />
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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