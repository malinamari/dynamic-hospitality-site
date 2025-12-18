import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Profession {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
}

const professions: Profession[] = [
  {
    id: 'hostess',
    title: 'Хостесс',
    icon: 'UserPlus',
    description: 'Встреча гостей, управление посадкой, first impression',
    color: 'from-pink-600 to-pink-700'
  },
  {
    id: 'waiter',
    title: 'Официант',
    icon: 'Utensils',
    description: 'Обслуживание гостей, презентация меню, техники продаж',
    color: 'from-blue-600 to-blue-700'
  },
  {
    id: 'bartender',
    title: 'Бармен',
    icon: 'Wine',
    description: 'Барная культура, миксология, work at bar',
    color: 'from-amber-600 to-amber-700'
  },
  {
    id: 'manager',
    title: 'Менеджер',
    icon: 'Briefcase',
    description: 'Управление сменой, решение конфликтов, лидерство',
    color: 'from-purple-600 to-purple-700'
  }
];

interface ProfessionSelectorProps {
  onSelect: (professionId: string) => void;
  selectedProfession?: string;
}

const ProfessionSelector = ({ onSelect, selectedProfession }: ProfessionSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Выберите профессию</h2>
        <p className="text-slate-300">Обучение построено по должностям с учетом философии ARRURRU</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {professions.map((profession) => {
          const isSelected = selectedProfession === profession.id;
          
          return (
            <Card 
              key={profession.id}
              className={`cursor-pointer transition-all hover:scale-105 ${
                isSelected 
                  ? 'border-4 border-amber-500 bg-gradient-to-br from-slate-800/80 to-slate-900/80' 
                  : 'border-2 border-slate-600 bg-slate-800/50 hover:border-amber-500/50'
              }`}
              onClick={() => onSelect(profession.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${profession.color} flex-shrink-0`}>
                    <Icon name={profession.icon as any} size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{profession.title}</h3>
                    <p className="text-sm text-slate-300">{profession.description}</p>
                    
                    {isSelected && (
                      <div className="mt-4 flex items-center gap-2 text-amber-400">
                        <Icon name="CheckCircle" size={20} />
                        <span className="text-sm font-semibold">Выбрано</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-amber-500/20 rounded-xl border-2 border-amber-500/30">
        <div className="flex items-start gap-4">
          <Icon name="Info" size={24} className="text-amber-400 flex-shrink-0 mt-1" />
          <div className="text-slate-200">
            <p className="font-semibold mb-2">Структура обучения:</p>
            <ul className="space-y-1 text-sm">
              <li>• Все принципы из El Códice de ARRURRU применяются в обучении</li>
              <li>• Каждая профессия имеет свои модули и итоговый тест</li>
              <li>• После успешного завершения выдается сертификат</li>
              <li>• Тесты проверяют понимание материала для управляющего</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionSelector;
