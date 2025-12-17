import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServicesSection = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'audit',
      icon: 'Search',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600',
      title: 'Аудит "ДНК"',
      price: 'от 45 000₽',
      duration: '5-7 дней работы',
      description: 'Глубокий анализ всех аспектов вашего бизнеса',
      features: [
        'Анализ концепции и брендинга',
        'Мониторинг отзывов на всех платформах',
        'Интервью с персоналом',
        'Серия тайных гостей',
        'Аудит маркетинга',
        'Полный отчет с пошаговым планом',
        'План на 6-12 месяцев',
        'Презентация для собственника',
        'Чек-листы для внедрения'
      ],
      note: 'Это не просто проверка, а комплексное погружение во все процессы вашего ресторана. Я изучаю каждый аспект, выявляю скрытые проблемы и создаю индивидуальную стратегию роста. Тайные визиты невозможно вычислить — гарантирую объективную оценку.'
    },
    {
      id: 'training',
      icon: 'GraduationCap',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      title: 'Авторский тренинг',
      price: 'от 20 000₽',
      duration: '1 день работы',
      description: 'Один авторский тренинг по выбранной вами теме',
      features: [
        'Выбор темы: продажи, сервис, винный этикет, конфликты',
        'До 15 человек в группе',
        '6-8 часов интенсивной работы',
        'Практика на реальных кейсах',
        'Рабочие материалы и шаблоны',
        'Проверка знаний после тренинга',
        'Сертификаты участникам'
      ],
      note: 'Идеально для точечного усиления команды по конкретной теме. Можно заказать как отдельно, так и курсом из нескольких тренингов.',
      isHit: true
    },
    {
      id: 'support',
      icon: 'LineChart',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      title: 'Полное сопровождение',
      price: 'от 150 000₽/мес',
      duration: 'от 3 месяцев',
      description: 'Становлюсь вашим внешним директором по продажам на три месяца',
      features: [
        'Поддержка 24/7',
        'Найм и обучение персонала',
        'Контроль качества работы',
        'Внедрение системы KPI',
        'Создание стандартов обслуживания',
        'Рост на 35-60% за квартал'
      ],
      note: 'Для тех, кто хочет системный подход с полным контролем и максимальным результатом. Работаю как часть вашей команды, беру на себя все процессы по продажам и сервису.'
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black text-foreground">Мои услуги</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Выбирайте формат работы в зависимости от ваших задач
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card 
                key={service.id}
                className={`border-2 transition-all duration-300 hover:shadow-xl relative ${
                  service.isHit ? 'border-primary' : 'hover:border-primary'
                }`}
              >
                {service.isHit && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg z-10">
                    ХИТ ПРОДАЖ
                  </div>
                )}
                
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-3">
                    <div className={`w-16 h-16 rounded-2xl ${service.iconBg} flex items-center justify-center`}>
                      <Icon name={service.icon} className={service.iconColor} size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                    <div className="text-3xl font-black text-primary">{service.price}</div>
                    {service.duration && (
                      <div className="text-sm font-semibold text-foreground">{service.duration}</div>
                    )}
                    <p className="text-foreground">{service.description}</p>
                  </div>

                  <div className="space-y-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                        <span className="text-foreground text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-foreground leading-relaxed">
                      {service.note}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        const element = document.getElementById('contact');
                        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      Подобрать решение
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-2"
                      onClick={() => navigate(`/service/${service.id}`)}
                    >
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 border-2 border-primary bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-10 space-y-6">
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-black text-foreground">Альтернативный формат — онлайн-курсы</h3>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Если вам нужны базовые тренинги или у вас ограниченный бюджет, предлагаю качественные онлайн-курсы по ключевым темам
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-xl border-2 border-border space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="GraduationCap" className="text-primary" size={36} />
                    <h4 className="font-bold text-foreground text-lg">Основы профессионального сервиса</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">—</span>
                      <span>Стандарты обслуживания и этикет в HoReCa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">—</span>
                      <span>Правильная коммуникация с гостями</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">—</span>
                      <span>Работа с жалобами и рекламациями</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-xl border-2 border-border space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="UserX" className="text-primary" size={36} />
                    <h4 className="font-bold text-foreground text-lg">Работа с конфликтными гостями</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">—</span>
                      <span>Техники деэскалации конфликтов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">—</span>
                      <span>Работа с возражениями и претензиями</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">—</span>
                      <span>Превращение недовольных гостей в постоянных</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-xl border-2 border-border space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="TrendingUp" className="text-primary" size={36} />
                    <h4 className="font-bold text-foreground text-lg">Техники продаж и допродаж</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">—</span>
                      <span>Скрипты продаж без навязывания</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">—</span>
                      <span>Upsell и cross-sell стратегии</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">—</span>
                      <span>Увеличение среднего чека на 25-40%</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-xl border-2 border-border space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="Award" className="text-primary" size={36} />
                    <h4 className="font-bold text-foreground text-lg">Стандарты обслуживания</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">—</span>
                      <span>Создание корпоративных стандартов сервиса</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">—</span>
                      <span>Система оценки качества обслуживания</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">—</span>
                      <span>Чек-листы и процедуры для персонала</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-primary to-primary/80 p-8 rounded-2xl text-white">
                  <div className="text-center space-y-4">
                    <p className="text-3xl font-black">2 990₽</p>
                    <p className="text-lg font-semibold">подписка / месяц</p>
                    <p className="opacity-90 text-sm">
                      Доступ к выбранному курсу + закрытое сообщество + дополнительные материалы
                    </p>
                  </div>
                </div>

                <div className="bg-card border-2 border-primary p-8 rounded-2xl flex flex-col justify-center">
                  <div className="space-y-3">
                    <p className="text-xl font-bold text-foreground text-center">
                      🎁 Бонус при подписке
                    </p>
                    <p className="text-foreground text-center">
                      Доступ на месяц в закрытое сообщество с разборами кейсов и прямой связью со мной
                    </p>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => window.open('https://t.me/maricopro?text=' + encodeURIComponent('Здравствуйте, хочу приобрести доступ на ваш онлайн-курс.'), '_blank')}
                    >
                      Подать заявку на курс
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;