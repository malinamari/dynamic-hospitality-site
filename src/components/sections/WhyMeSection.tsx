import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const WhyMeSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const reasons = [
    {
      shortTitle: 'Инсайдер премиум-сегмента',
      shortDesc: '15 лет на всех уровнях HoReCa',
      fullDesc: '15 лет в HoReCa на всех стадиях: запуски с нуля, ребрендинги, популярные рестораны. Мой путь к эксперту — от линейных позиций до куратора закрытого клуба в Москве, аналогов которому нет. Закрытые мероприятия с первыми лицами государства.',
      highlight: 'В 2025 году рынок HoReCa вырос на 24% в РФ. Но большинство заведений продолжают работать по старым схемам. Я помогаю взять свою долю этого роста.',
      icon: 'Award',
      color: 'from-amber-500 to-orange-600'
    },
    {
      shortTitle: 'Работаю по всей России',
      shortDesc: 'Любой город — не помеха росту',
      fullDesc: 'Москва — не единственный город, где можно зарабатывать. Любое заведение может расти — будь то Иркутск, Сочи или ваш город. Прилетаю лично или работаю онлайн с полным погружением.',
      highlight: 'Москва для всех эталон, но это не отмазка. Я готова помочь заработать каждому ресторатору в любом регионе — от столиц до небольших городов.',
      icon: 'MapPin',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      shortTitle: 'Нахожу корни проблем',
      shortDesc: 'Не симптомы — причины',
      fullDesc: 'Не просто даю готовые решения — учу видеть реальные причины низких продаж. Умею разбирать возражения и конфликты. Учу продавать всё — даже немыслимые позиции.',
      highlight: 'Нахожу подход к каждому: к персоналу, управляющим, гостям. 15 лет опыта работы с людьми в премиум-сегменте дают мне уникальное понимание психологии гостеприимства.',
      icon: 'Target',
      color: 'from-purple-500 to-violet-600'
    },
    {
      shortTitle: 'Прозрачный результат',
      shortDesc: 'Измеримые KPI каждые 2 недели',
      fullDesc: 'Работаю на результат: вы видите метрики до и после, контрольные точки каждые 2 недели. Без воды — только конкретные цифры и действия. План на 90 дней с четкими этапами.',
      highlight: 'Даю чёткий план на 90 дней с измеримыми KPI. Вы всегда знаете, где мы сейчас и куда идём. Никаких размытых обещаний — только конкретные цифры роста.',
      icon: 'BadgeCheck',
      color: 'from-green-500 to-emerald-600'
    },
    {
      shortTitle: 'Гарантия результата',
      shortDesc: 'Возврат 100%, если нет роста',
      fullDesc: 'Если через 90 дней вы не увидите рост выручки минимум на 15% — верну 100% стоимости услуг. Это единственная система в России с такой гарантией. Работаю на результат, а не на процесс.',
      highlight: '🔥 За 2025 год ни один клиент не попросил возврат средств. Результат есть у всех, потому что система работает при любых условиях.',
      icon: 'Shield',
      color: 'from-rose-500 to-pink-600'
    },
    {
      shortTitle: 'Авторская методика',
      shortDesc: 'Проверенная на десятках заведений',
      fullDesc: 'Разработала собственную систему обучения персонала на основе 15-летнего опыта. Интенсив «7 дней» — это не теория из книг, а реальная практика, которую я отточила в премиум-сегменте.',
      highlight: 'Средний результат клиентов: +5 млн ₽ к годовой выручке без увеличения рекламного бюджета. Метод работает для всех типов заведений.',
      icon: 'Sparkles',
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-block px-6 py-3 bg-primary/10 rounded-full border-2 border-primary mb-4">
              <p className="text-primary font-black text-sm tracking-wide">💎 ПОЧЕМУ Я</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground">
              Не просто эксперт — партнёр по росту
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Работающая система и измеримый результат в деньгах, не просто впечатление
            </p>
          </div>

          <div className="space-y-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="animate-slide-down"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  marginLeft: `${index * 15}px`,
                  maxWidth: `calc(100% - ${index * 15}px)`
                }}
              >
                <Card 
                  className={`border-2 border-border bg-white transition-all duration-500 hover:scale-[1.02] ${
                    expandedIndex === index ? 'shadow-2xl shadow-primary/20 border-primary' : 'hover:shadow-xl'
                  }`}
                >
                  <CardContent className="p-6">
                    <div 
                      className="flex items-start gap-4 cursor-pointer"
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    >
                      <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center shadow-lg transition-transform duration-300 ${
                        expandedIndex === index ? 'scale-110 rotate-6' : ''
                      }`}>
                        <Icon name={reason.icon as any} className="text-white" size={32} />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-xl sm:text-2xl font-black text-foreground">
                            {reason.shortTitle}
                          </h3>
                          <div className={`transition-transform duration-300 ${
                            expandedIndex === index ? 'rotate-180' : ''
                          }`}>
                            <Icon name="ChevronDown" className="text-primary" size={24} />
                          </div>
                        </div>
                        <p className="text-base text-muted-foreground">
                          {reason.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div 
                      className={`overflow-hidden transition-all duration-500 ${
                        expandedIndex === index ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="space-y-4 pl-20 pr-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                        
                        <p className="text-base text-foreground leading-relaxed animate-fade-in">
                          {reason.fullDesc}
                        </p>
                        
                        <div className={`p-6 rounded-xl bg-gradient-to-br ${reason.color} shadow-2xl animate-bounce-in`}>
                          <p className="text-lg font-bold text-white leading-relaxed">
                            {reason.highlight}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 via-white to-primary/10 shadow-xl hover:shadow-2xl transition-shadow mt-16">
            <CardContent className="p-10 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center shadow-lg">
                <Icon name="TrendingUp" className="text-white" size={32} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                Любое заведение может развиваться и расти
              </h3>
              <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
                Не важно, где вы находитесь — в Москве, Иркутске или любом другом городе. При правильном подходе растут все.
              </p>
              <div className="pt-4">
                <p className="text-xl font-black text-primary">Работаю на результат — измеримый рост за 90 дней</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          60% {
            transform: scale(1.05) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default WhyMeSection;