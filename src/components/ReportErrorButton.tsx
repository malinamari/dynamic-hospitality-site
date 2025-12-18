import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { getCurrentUser } from '@/lib/arrurru-auth';

interface ReportErrorButtonProps {
  pageName: string;
}

const ReportErrorButton = ({ pageName }: ReportErrorButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const user = getCurrentUser();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      setMessage('Опишите проблему');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    setSending(true);

    try {
      const TELEGRAM_BOT_TOKEN = '7871935348:AAEy5oBgcqjLQOqX2oWqmXfOqsYxYxzaVCE';
      const TELEGRAM_CHAT_ID = '439931834';

      // Формируем сообщение
      const text = `🚨 ОШИБКА НА ПЛАТФОРМЕ ARRURRU\n\n` +
        `📄 Страница: ${pageName}\n` +
        `👤 Пользователь: ${user?.fullName || 'Неизвестно'} (${user?.email || 'Неизвестно'})\n` +
        `📝 Описание:\n${description}\n\n` +
        `🕐 Время: ${new Date().toLocaleString('ru-RU')}`;

      // Отправляем текст
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: 'HTML'
        })
      });

      // Если есть фото - отправляем его
      if (imageFile) {
        const formData = new FormData();
        formData.append('chat_id', TELEGRAM_CHAT_ID);
        formData.append('photo', imageFile);
        formData.append('caption', '📸 Скриншот проблемы');

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
          method: 'POST',
          body: formData
        });
      }

      setMessage('✅ Сообщение отправлено!');
      setTimeout(() => {
        setMessage('');
        setIsOpen(false);
        setDescription('');
        setImageFile(null);
        setImagePreview(null);
      }, 2000);
    } catch (error) {
      console.error('Error sending report:', error);
      setMessage('❌ Ошибка отправки');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300"
      >
        <Icon name="AlertCircle" size={18} className="mr-2" />
        Сообщить об ошибке
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="bg-slate-800 border-2 border-red-500/30 max-w-md w-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Icon name="AlertCircle" size={24} className="text-red-400" />
                  Сообщить об ошибке
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Страница:
                  </label>
                  <div className="px-3 py-2 bg-slate-700/50 rounded-lg text-white">
                    {pageName}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Описание проблемы *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Опишите, что пошло не так..."
                    className="w-full px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Прикрепить скриншот (необязательно)
                  </label>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="bg-slate-700 text-white border-slate-600"
                    />
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border border-slate-600"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white"
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {message && (
                  <div className={`p-3 rounded-lg ${
                    message.includes('✅') 
                      ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                      : 'bg-red-500/20 border border-red-500/50 text-red-300'
                  }`}>
                    {message}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmit}
                    disabled={sending}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    {sending ? (
                      <>
                        <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={18} className="mr-2" />
                        Отправить
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Отмена
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ReportErrorButton;
