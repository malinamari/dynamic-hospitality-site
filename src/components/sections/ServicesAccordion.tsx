import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Check, ChevronDown } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ServicesAccordion = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { ref, isRevealed } = useScrollReveal();

  const services = [
    {
      id: 'audit',
      icon: 'Search',
      title: 'Аудит "ДНК"',
      price: 'от 45 000₽',
      shortDesc: 'Глубокий анализ всех аспектов вашего бизнеса',
      duration: '5-7 дней работы',
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
      fullDesc: 'Это не просто проверка, а комплексное погружение во все процессы вашего ресторана. Я изучаю каждый аспект, выявляю скрытые проблемы и создаю индивидуальную стратегию роста. Тайные визиты невозможно вычислить — гарантирую объективную оценку.',
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 'training',
      icon: 'GraduationCap',
      title: 'Авторский тренинг',
      price: 'от 20 000₽',
      shortDesc: 'Один авторский тренинг по выбранной вами теме',
      duration: '1 день работы',
      isHit: true,
      features: [
        'Выбор темы: продажи, сервис, винный этикет, конфликты',
        'До 15 человек в группе',
        '6-8 часов интенсивной работы',
        'Практика на реальных кейсах',
        'Рабочие материалы и шаблоны',
        'Проверка знаний после тренинга',
        'Сертификаты участникам'
      ],
      fullDesc: 'Идеально для точечного усиления команды по конкретной теме. Можно заказать как отдельно, так и курсом из нескольких тренингов.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'intensive',
      icon: 'Zap',
      title: 'Интенсив "7 ДНЕЙ"',
      price: 'от 65 000₽',
      shortDesc: 'Комплексная трансформация команды',
      duration: '7 дней работы',
      features: [
        'Полная диагностика команды',
        'Тренинги, подобранные под формат, концепцию и опыт сотрудников',
        'Индивидуальная работа с каждым',
        'Разработка скриптов продаж',
        'Ролевые игры и практика',
        '30 дней поддержки после',
        'Гарантия роста чека от 20%'
      ],
      fullDesc: 'Авторская методика 2025 года. За 7 дней работы полностью перестраиваю подход команды к продажам. Интенсивная работа каждый день с каждым участником.',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'support',
      icon: 'LineChart',
      title: 'Полное сопровождение',
      price: 'от 120 000₽/мес',
      shortDesc: 'Становлюсь вашим внешним директором по продажам',
      duration: 'от 3 месяцев',
      features: [
        'Поддержка 24/7',
        'Найм и обучение персонала',
        'Контроль качества работы',
        'Внедрение системы KPI',
        'Создание стандартов обслуживания',
        'Рост на 35-60% за квартал'
      ],
      fullDesc: 'Для тех, кто хочет системный подход с полным контролем и максимальным результатом. Работаю как часть вашей команды, беру на себя все процессы по продажам и сервису.',
      color: 'from-teal-500 to-cyan-600'
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div 
            ref={ref}
            className={`text-center space-y-4 scroll-reveal ${isRevealed ? 'revealed' : ''}`}
          >
            <h2 className="text-4xl sm:text-5xl font-black text-foreground">
              Выберите формат работы
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              От точечного обучения до полного сопровождения
            </p>
          </div>

          <div className="space-y-4">
            {services.map((service, index) => (
              <Card 
                key={service.id}
                className={`border-2 transition-all duration-300 hover:shadow-xl relative overflow-hidden ${
                  expanded === service.id ? 'border-primary shadow-2xl' : 'hover:border-primary/50'
                } ${isRevealed ? 'scroll-reveal revealed' : 'scroll-reveal'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {service.isHit && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-lg z-10 animate-pulse">
                    ХИТ 🔥
                  </div>
                )}

                <CardContent className="p-6">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpanded(expanded === service.id ? null : service.id)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                        <Icon name={service.icon} className="text-white" size={28} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.shortDesc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <div className="text-2xl font-black text-primary">{service.price}</div>
                        <div className="text-xs text-muted-foreground font-semibold">{service.duration}</div>
                      </div>

                      <ChevronDown 
                        className={`text-primary transition-transform duration-300 ${
                          expanded === service.id ? 'rotate-180' : ''
                        }`}
                        size={28}
                      />
                    </div>
                  </div>

                  <div className="sm:hidden mt-3 flex justify-between items-center">
                    <div className="text-xl font-black text-primary">{service.price}</div>
                    <div className="text-xs text-muted-foreground font-semibold">{service.duration}</div>
                  </div>

                  {expanded === service.id && (
                    <div className="mt-6 space-y-6 animate-fade-in">
                      <div className="h-px bg-border"></div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-bold text-foreground text-sm uppercase tracking-wide">Что входит:</h4>
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Check className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                              <span className="text-sm text-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-4">
                          <div className={`p-5 rounded-xl bg-gradient-to-br ${service.color} text-white`}>
                            <p className="text-sm leading-relaxed">
                              {service.fullDesc}
                            </p>
                          </div>

                          <Button 
                            size="lg"
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollToContact();
                            }}
                          >
                            Подобрать решение
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-4 border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-white shadow-2xl mt-12">
            <CardContent className="p-10 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center shadow-2xl">
                <Icon name="Sparkles" className="text-white" size={48} />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
                Не нашли подходящий формат?
              </h3>
              <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
                Каждый бизнес уникален. Я подберу индивидуальное решение под ваши задачи и потребности — от разовых консультаций до комплексных программ.
              </p>
              <Button 
                size="lg"
                className="text-lg px-10 py-6 shadow-xl hover:scale-105 transition-transform"
                onClick={scrollToContact}
              >
                <Icon name="MessageCircle" className="mr-2" size={24} />
                Записаться на консультацию
              </Button>
              <p className="text-sm text-muted-foreground">
                Первая консультация бесплатно • Отвечаю в течение 24 часов
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesAccordion;