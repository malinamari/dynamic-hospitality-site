import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Training {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  forWhom: string[];
  includes: string[];
  result: string;
  duration: string;
}

const trainings: Training[] = [
  {
    id: 'service-sells',
    number: '01',
    title: 'Сервис, который продаёт',
    subtitle: 'Не про действия. Про отношение.',
    description: 'О том, как внимание и уверенность создают выручку без давления. Сервис — это не действия, а энергия.',
    icon: 'Sparkles',
    forWhom: ['Персонал зала', 'Бармены', 'Хостес'],
    includes: [
      'Психология продаж через сервис',
      'Как внимание превращается в выручку',
      'Уверенность в общении с гостем',
      'Техники естественного предложения'
    ],
    result: 'Персонал продаёт через заботу, а не навязывание. +20-25% к среднему чеку',
    duration: '2-3 часа'
  },
  {
    id: 'emotional-service',
    number: '02',
    title: 'Эмоциональный сервис',
    subtitle: 'Понимать гостя с первого взгляда',
    description: 'Про искусство считывать настроение, ритм и ожидания. Когда персонал начинает чувствовать, кому нужен покой, а кому — разговор.',
    icon: 'Heart',
    forWhom: ['Персонал зала', 'Хостес', 'Бармены'],
    includes: [
      'Как читать язык тела гостя',
      'Определение типа гостя за 30 секунд',
      'Подстройка под настроение и темп',
      'Когда говорить, когда молчать'
    ],
    result: 'Персонал чувствует гостя и создаёт идеальный опыт. Возврат гостей ×2',
    duration: '2-3 часа'
  },
  {
    id: 'complaints',
    number: '03',
    title: 'Работа с жалобами',
    subtitle: 'Конфликты, которые укрепляют',
    description: 'Про внутреннюю силу, выдержку и культуру реакции. Учимся решать острые ситуации так, чтобы гость уходил с уважением.',
    icon: 'Shield',
    forWhom: ['Весь персонал зала', 'Управляющие'],
    includes: [
      'Психология конфликта',
      'Техники деэскалации',
      'Как сохранять спокойствие',
      'Превращение жалобы в лояльность'
    ],
    result: 'Команда уверенно работает со сложными ситуациями. -70% негативных отзывов',
    duration: '2-3 часа'
  },
  {
    id: 'hostess',
    number: '04',
    title: 'Хостес — лицо заведения',
    subtitle: 'Первая секунда: момент, который решает всё',
    description: 'О том, как создать эффект присутствия и уверенности с первой фразы. Хостес — не «девушка на входе», а лицо бренда.',
    icon: 'Users',
    forWhom: ['Хостес', 'Администраторы'],
    includes: [
      'Первое впечатление за 3 секунды',
      'Язык тела и голос хостес',
      'Управление очередью и ожиданием',
      'Как стать лицом заведения'
    ],
    result: 'Хостес создаёт WOW-эффект с порога. +40% положительных упоминаний',
    duration: '2 часа'
  },
  {
    id: 'manager',
    number: '05',
    title: 'Менеджер — авторитет без крика',
    subtitle: 'Управление через уважение, а не страх',
    description: 'Про управление людьми, которое строится на уважении. После этого тренинга команда начинает слушать не из страха, а из доверия.',
    icon: 'UserCheck',
    forWhom: ['Управляющие', 'Менеджеры зала'],
    includes: [
      'Как получить авторитет без давления',
      'Мотивация через смысл, не через страх',
      'Система обратной связи',
      'Разруливание конфликтов в команде'
    ],
    result: 'Команда слушается и работает с душой. -50% конфликтов',
    duration: '3-4 часа'
  },
  {
    id: 'sales-in-service',
    number: '06',
    title: 'Продажи в сервисе',
    subtitle: 'Когда гости покупают настроение',
    description: 'Как продавать без слова «купите», как предложить не навязчиво, а красиво. О внутренней уверенности и искреннем интересе.',
    icon: 'TrendingUp',
    forWhom: ['Персонал зала', 'Бармены'],
    includes: [
      'Допродажи через заботу о госте',
      'Живые фразы под ваше меню',
      'Психология согласия',
      'Работа с возражениями'
    ],
    result: 'Естественные допродажи без навязывания. +25-30% к среднему чеку',
    duration: '3 часа'
  },
  {
    id: 'standards',
    number: '07',
    title: 'Стандарты — система, которая дышит',
    subtitle: 'Порядок, который не душит',
    description: 'О том, как сделать порядок живым, а не формальным. Не «правила ради отчёта», а стиль, который задаёт уровень.',
    icon: 'BookOpen',
    forWhom: ['Владельцы', 'Управляющие'],
    includes: [
      'Как создать стандарты, которые работают',
      'Внедрение без сопротивления команды',
      'Контроль без тотальной проверки',
      'Живые стандарты vs мёртвые инструкции'
    ],
    result: 'Система работает сама, персонал следует стандартам естественно',
    duration: '2-3 часа'
  },
  {
    id: 'implementation',
    number: '08',
    title: 'Внедрение — смотрю, как есть',
    subtitle: 'Погружение внутрь бизнеса',
    description: 'Погружение внутрь бизнеса — не снаружи, а рядом с людьми. Настоящая диагностика, где всё становится видно.',
    icon: 'Search',
    forWhom: ['Владельцы', 'Управляющие'],
    includes: [
      'Наблюдение в реальных сменах',
      'Выявление скрытых проблем',
      'Работа с каждым сотрудником',
      'Корректировка системы на ходу'
    ],
    result: 'Понимание реальной картины + точечные решения проблем',
    duration: '3-5 дней'
  },
  {
    id: 'vip-service',
    number: '09',
    title: 'Сервис для VIP-гостей',
    subtitle: 'Тишина, которая продаёт',
    description: 'Про уверенность, такт и язык статуса. Для тех, кто работает с гостями, чувствительными к интонациям и мелочам.',
    icon: 'Crown',
    forWhom: ['Fine dining', 'Премиум-сегмент', 'Отели'],
    includes: [
      'Психология VIP-гостя',
      'Незаметный, но безупречный сервис',
      'Язык тела и детали',
      'Как продавать дорогие позиции'
    ],
    result: 'Персонал уверенно работает с VIP. Средний чек премиум-позиций ×3',
    duration: '3-4 часа'
  },
  {
    id: 'team-unity',
    number: '10',
    title: 'Команда — одна энергия',
    subtitle: 'Единый организм',
    description: 'Тренинг о том, как соединить зал, кухню и менеджмент в единый организм. Чтобы не просто работали рядом, а действовали вместе.',
    icon: 'Zap',
    forWhom: ['Вся команда заведения'],
    includes: [
      'Разруливание конфликтов зал-кухня',
      'Командообразование через понимание',
      'Единая культура и ценности',
      'Синхронизация всех процессов'
    ],
    result: 'Команда работает как единый механизм. -60% внутренних конфликтов',
    duration: '4-5 часов'
  }
];

const TrainingsSection = () => {
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Все тренинги', icon: 'Layers' },
    { id: 'service', label: 'Сервис', icon: 'Heart' },
    { id: 'sales', label: 'Продажи', icon: 'TrendingUp' },
    { id: 'management', label: 'Управление', icon: 'Users' }
  ];

  const getFilteredTrainings = () => {
    if (filterCategory === 'all') return trainings;
    if (filterCategory === 'service') return trainings.filter(t => 
      ['emotional-service', 'complaints', 'hostess', 'vip-service'].includes(t.id)
    );
    if (filterCategory === 'sales') return trainings.filter(t => 
      ['service-sells', 'sales-in-service'].includes(t.id)
    );
    if (filterCategory === 'management') return trainings.filter(t => 
      ['manager', 'standards', 'implementation', 'team-unity'].includes(t.id)
    );
    return trainings;
  };

  return (
    <section id="trainings" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black text-foreground">Тренинги</h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              10 программ обучения для команды: от основ сервиса до работы с VIP-гостями. 
              Адаптирую под специфику вашего заведения.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filterCategory === category.id ? 'default' : 'outline'}
                onClick={() => setFilterCategory(category.id)}
                size="lg"
              >
                <Icon name={category.icon} className="mr-2" size={18} />
                {category.label}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredTrainings().map((training) => (
              <Card
                key={training.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  selectedTraining === training.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedTraining(selectedTraining === training.id ? null : training.id)}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      selectedTraining === training.id ? 'bg-primary' : 'bg-primary/10'
                    }`}>
                      <Icon 
                        name={training.icon}
                        className={selectedTraining === training.id ? 'text-white' : 'text-primary'}
                        size={28}
                      />
                    </div>
                    <span className="text-4xl font-black text-primary/20">{training.number}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                      {training.title}
                    </h3>
                    <p className="text-sm font-semibold text-primary">
                      {training.subtitle}
                    </p>
                    <p className="text-foreground/70">
                      {training.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Icon name="Clock" size={16} className="text-primary" />
                    <span>{training.duration}</span>
                  </div>

                  {selectedTraining === training.id && (
                    <div className="space-y-4 pt-4 border-t border-border animate-fade-in">
                      <div className="space-y-2">
                        <h4 className="font-bold text-foreground text-sm uppercase tracking-wide flex items-center gap-2">
                          <Icon name="Users" size={16} className="text-primary" />
                          Для кого:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {training.forWhom.map((person, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                            >
                              {person}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-bold text-foreground text-sm uppercase tracking-wide flex items-center gap-2">
                          <Icon name="CheckCircle" size={16} className="text-primary" />
                          Что включает:
                        </h4>
                        <ul className="space-y-1">
                          {training.includes.map((item, index) => (
                            <li key={index} className="text-foreground/70 text-sm flex items-start gap-2">
                              <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={14} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <div className="bg-primary/5 border-l-4 border-l-primary p-3 rounded">
                          <p className="text-sm font-semibold text-foreground flex items-start gap-2">
                            <Icon name="Target" className="text-primary flex-shrink-0 mt-0.5" size={16} />
                            <span>{training.result}</span>
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = '#contact';
                        }}
                        className="w-full"
                      >
                        <Icon name="MessageCircle" className="mr-2" size={18} />
                        Записаться на тренинг
                      </Button>
                    </div>
                  )}

                  {selectedTraining !== training.id && (
                    <div className="pt-2">
                      <p className="text-xs text-foreground/50 text-center">
                        Нажмите для подробностей
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-primary/40 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" className="text-primary" size={32} />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-black text-foreground">
                    Тренинги адаптируются под ваши задачи
                  </h3>
                  <p className="text-foreground/80">
                    Могу провести тренинг прямо в вашем заведении с учётом специфики меню, 
                    концепции и команды. Также возможно комбинировать несколько программ 
                    или создать индивидуальный курс.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <Icon name="MapPin" size={16} className="text-primary" />
                      <span>На вашей территории</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <Icon name="Target" size={16} className="text-primary" />
                      <span>Под ваше меню</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <Icon name="Users" size={16} className="text-primary" />
                      <span>Практика с командой</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => window.location.href = '#contact'}
                    size="lg"
                    variant="outline"
                  >
                    <Icon name="MessageCircle" className="mr-2" size={20} />
                    Обсудить программу тренинга
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TrainingsSection;