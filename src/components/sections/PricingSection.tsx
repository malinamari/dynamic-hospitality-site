import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface PricingSectionProps {
  scrollToSection: (id: string) => void;
}

const PricingSection = ({ scrollToSection }: PricingSectionProps) => {
  const plans = [
    {
      name: 'АУДИТ "ДНК"',
      price: 'от 35,000₽',
      duration: '5-7 дней работы',
      description: 'Найду корни проблем, а не симптомы',
      popular: false,
      features: [
        { text: 'Работаю как тайный гость', included: true },
        { text: 'Глубокая диагностика 5-7 дней', included: true },
        { text: 'Полный отчет + план на 6-12 мес', included: true },
        { text: 'Обучение персонала', included: false },
        { text: 'Личное сопровождение', included: false },
        { text: 'Гарантия результата', included: false },
      ],
      result: 'Точный диагноз и план действий',
      badge: null
    },
    {
      name: 'ТРЕНИНГ ПОД КЛЮЧ',
      price: 'от 45,000₽',
      duration: '2-3 дня работы + 30 дней поддержки',
      description: 'Научу продавать всё — даже немыслимое',
      popular: false,
      features: [
        { text: 'Экспресс-диагностика', included: true },
        { text: '2-3 дня интенсива', included: true },
        { text: 'Скрипты продаж + возражения', included: true },
        { text: 'Учу продавать немыслимые позиции', included: true },
        { text: 'Поддержка 30 дней', included: true },
        { text: 'Гарантия +15% к чеку', included: false },
      ],
      result: '+15-25% к среднему чеку за 2 месяца',
      badge: null
    },
    {
      name: 'ИНТЕНСИВ "7 ДНЕЙ"',
      price: 'от 65,000₽',
      duration: '7 дней работы',
      description: 'Авторская методика — система за неделю',
      popular: true,
      features: [
        { text: 'День 1: Аудит изнутри', included: true },
        { text: 'День 2: Диагностика корней', included: true },
        { text: 'День 3-4: Тренинги команды', included: true },
        { text: 'День 5: Внедрение стандартов', included: true },
        { text: 'День 6: Анализ результатов', included: true },
        { text: 'День 7: Доработка + результат', included: true },
      ],
      result: 'Готовая система за 7 дней',
      badge: '🚀 НОВИНКА 2025'
    },
    {
      name: 'FULL СОПРОВОЖДЕНИЕ',
      price: 'от 120,000₽/мес',
      duration: 'от 3 месяцев',
      description: 'Становлюсь частью вашей команды',
      popular: false,
      features: [
        { text: 'Полный контроль: найм, обучение, KPI', included: true },
        { text: 'Еженедельные встречи', included: true },
        { text: 'Безлимитные консультации', included: true },
        { text: 'Контроль внедрения', included: true },
        { text: 'Работа с конфликтами', included: true },
        { text: 'Гарантия +30-60% за квартал', included: true },
      ],
      result: '+30-60% к выручке за 3 месяца',
      badge: null
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground">
              Что вы получите (и сколько на этом заработаете)
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Выберите формат, который подходит вашей ситуации
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden transition-all duration-300 ${
                  plan.popular 
                    ? 'border-4 border-amber-500 shadow-2xl scale-105 z-10' 
                    : 'border-2 border-border hover:border-primary hover:shadow-xl'
                }`}
              >
                {plan.badge && (
                  <div className="absolute top-0 right-0 bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900 px-6 py-2 font-black text-sm shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <CardContent className="p-8 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black text-foreground">{plan.name}</h3>
                    <p className="text-muted-foreground font-medium">{plan.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-primary">{plan.price}</span>
                    </div>
                    <div className="text-sm text-muted-foreground font-bold">
                      {plan.duration}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Icon name="Check" className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                        ) : (
                          <Icon name="X" className="text-slate-300 flex-shrink-0 mt-0.5" size={20} />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl">
                    <p className="text-xs font-bold text-green-900 mb-1">РЕАЛИСТИЧНЫЙ РЕЗУЛЬТАТ:</p>
                    <p className="text-sm font-black text-green-700">{plan.result}</p>
                  </div>

                  <Button 
                    size="lg" 
                    className={`w-full font-black text-base py-6 ${
                      plan.popular 
                        ? 'bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-xl' 
                        : ''
                    }`}
                    onClick={() => scrollToSection('contact')}
                  >
                    {plan.popular ? 'ЗАПОЛНИТЬ БРИФ 🚀' : 'ЗАПОЛНИТЬ БРИФ'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-4 border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-background shadow-2xl">
            <CardContent className="p-10 text-center space-y-6">
              <Icon name="Lightbulb" className="mx-auto text-primary" size={56} />
              <h3 className="text-3xl sm:text-4xl font-black text-foreground">
                Не знаете, с чего начать?
              </h3>
              <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
                Начните с <span className="text-primary font-black text-xl">бесплатной консультации 30 минут</span> — расскажите о вашей ситуации, я дам рекомендации и предложу оптимальный формат работы. Никаких обязательств.
              </p>
              <Button 
                size="lg"
                className="font-black text-xl px-12 py-8 bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-xl"
                onClick={() => scrollToSection('contact')}
              >
                ЗАПОЛНИТЬ БРИФ НА ЭКСПЕРТНУЮ КОНСУЛЬТАЦИЮ →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;