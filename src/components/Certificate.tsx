import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CertificateProps {
  userName: string;
  profession: string;
  completedAt: string;
  score?: number;
}

const Certificate = ({ userName, profession, completedAt, score }: CertificateProps) => {
  const date = new Date(completedAt);
  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const professionTitles: Record<string, string> = {
    'hostess': 'Хостесс',
    'waiter': 'Официант',
    'bartender': 'Бармен',
    'manager': 'Менеджер',
    'codice': 'El Códice de ARRURRU'
  };

  return (
    <Card className="bg-gradient-to-br from-amber-50 via-white to-purple-50 border-4 border-amber-500 shadow-2xl">
      <CardContent className="p-12">
        <div className="text-center space-y-8">
          {/* Заголовок */}
          <div className="border-b-4 border-amber-500 pb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Icon name="Award" size={48} className="text-amber-600" />
              <h1 className="text-5xl font-black text-slate-900">ARRURRU</h1>
            </div>
            <p className="text-xl text-slate-600 font-serif italic">Restaurant & Mezcalería</p>
          </div>

          {/* Тип документа */}
          <div>
            <h2 className="text-4xl font-black text-purple-900 mb-2">СЕРТИФИКАТ</h2>
            <p className="text-lg text-slate-600">о прохождении обучения</p>
          </div>

          {/* Имя сотрудника */}
          <div className="py-8">
            <p className="text-sm text-slate-500 mb-2">Настоящим подтверждается, что</p>
            <h3 className="text-4xl font-bold text-slate-900 mb-4 font-serif">
              {userName}
            </h3>
            <p className="text-lg text-slate-600">
              успешно завершил(а) программу обучения по направлению
            </p>
            <p className="text-3xl font-bold text-amber-600 mt-4">
              «{professionTitles[profession] || profession}»
            </p>
          </div>

          {/* Детали */}
          <div className="grid grid-cols-2 gap-8 py-6 border-t-2 border-b-2 border-amber-300">
            <div>
              <p className="text-sm text-slate-500 mb-1">Дата завершения</p>
              <p className="text-lg font-semibold text-slate-900">{formattedDate}</p>
            </div>
            {score !== undefined && (
              <div>
                <p className="text-sm text-slate-500 mb-1">Результат теста</p>
                <p className="text-lg font-semibold text-slate-900">{score}%</p>
              </div>
            )}
          </div>

          {/* Философия */}
          <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
            <p className="text-sm italic text-slate-700 leading-relaxed">
              "В ARRURRU невозможно просто отработать смену. Любое присутствие — активное или пассивное — влияет на общее поле. Этот сертификат подтверждает понимание ответственности и готовность осознанно войти в свою роль."
            </p>
          </div>

          {/* Подпись */}
          <div className="pt-8 flex items-center justify-center gap-12">
            <div className="text-center">
              <div className="w-48 h-0.5 bg-slate-400 mb-2"></div>
              <p className="text-sm text-slate-600">Управляющий ARRURRU</p>
            </div>
          </div>

          {/* Орнамент */}
          <div className="flex items-center justify-center gap-4 text-amber-500 opacity-50">
            <Icon name="Star" size={16} />
            <Icon name="Star" size={16} />
            <Icon name="Star" size={16} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Certificate;
