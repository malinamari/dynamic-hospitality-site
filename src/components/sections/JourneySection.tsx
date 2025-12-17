import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const JourneySection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const timeline = [
    {
      shortTitle: 'Инсайдер премиум-сегмента',
      shortDesc: '15 лет опыта в гостеприимстве',
      fullDesc: '15 лет в HoReCa на всех стадиях: запуски с нуля, ребрендинги, популярные рестораны. От официанта до куратора закрытого клуба в Москве, аналогов которому нет. Закрытые мероприятия с первыми лицами государства.',
      highlight: 'В 2025 году рынок HoReCa вырос на 24% в РФ. Но большинство заведений продолжают работать по старым схемам. Я помогаю взять свою долю этого роста.',
      icon: 'Building2',
      color: 'from-amber-500 to-orange-600'
    },
    {
      shortTitle: 'Не теоретик, а практик',
      shortDesc: 'Прошла путь от линейных позиций до управляющей',
      fullDesc: 'Начинала с базовых позиций: хостес, бармен, зал. Росла внутри компаний, понимая бизнес на всех уровнях. Дошла до куратора закрытого клуба в Москве, аналогов которому нет.',
      highlight: '85% моих клиентов отмечают рост выручки уже в первые 30 дней после внедрения системы.',
      icon: 'Trophy',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      shortTitle: 'Авторская методика',
      shortDesc: 'Интенсив трансформации — 7 дней работы',
      fullDesc: 'Разработала собственную систему обучения персонала на основе 15-летнего опыта. Метод проверен на десятках заведений — от камерных баров до крупных ресторанов.',
      highlight: 'Средний результат клиентов: +5 млн ₽ к годовой выручке без увеличения рекламного бюджета.',
      icon: 'Sparkles',
      color: 'from-purple-500 to-violet-600'
    },
    {
      shortTitle: 'Гарантия результата',
      shortDesc: 'Работаю на результат, не на процесс',
      fullDesc: 'Если через 90 дней вы не увидите рост выручки минимум на 15% — верну 100% стоимости услуг. Это единственная система в России с такой гарантией.',
      highlight: '🔥 За 2025 год ни один клиент не попросил возврат средств. Результат есть у всех.',
      icon: 'Shield',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-block px-6 py-3 bg-amber-500/20 backdrop-blur-sm rounded-full border-2 border-amber-500 mb-4">
              <p className="text-amber-400 font-black text-sm tracking-wide">📍 КАК Я ПРОШЛА ПУТЬ</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              Мой путь к эксперту №1
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              15 лет практики в премиум HoReCa — каждый этап стал основой для авторской методики
            </p>
          </div>

          <div className="space-y-6">
            {timeline.map((step, index) => (
              <div
                key={index}
                className="animate-slide-down"
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  marginLeft: `${index * 20}px`,
                  maxWidth: `calc(100% - ${index * 20}px)`
                }}
              >
                <Card 
                  className={`border-2 border-slate-700 bg-slate-800/80 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] ${
                    expandedIndex === index ? 'shadow-2xl shadow-amber-500/20' : 'hover:shadow-xl'
                  }`}
                >
                  <CardContent className="p-6">
                    <div 
                      className="flex items-start gap-4 cursor-pointer"
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    >
                      <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg transition-transform duration-300 ${
                        expandedIndex === index ? 'scale-110 rotate-6' : ''
                      }`}>
                        <Icon name={step.icon as any} className="text-white" size={32} />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-xl sm:text-2xl font-black text-white">
                            {step.shortTitle}
                          </h3>
                          <div className={`transition-transform duration-300 ${
                            expandedIndex === index ? 'rotate-180' : ''
                          }`}>
                            <Icon name="ChevronDown" className="text-amber-400" size={24} />
                          </div>
                        </div>
                        <p className="text-base text-slate-300">
                          {step.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div 
                      className={`overflow-hidden transition-all duration-500 ${
                        expandedIndex === index ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="space-y-4 pl-20 pr-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                        
                        <p className="text-base text-slate-200 leading-relaxed animate-fade-in">
                          {step.fullDesc}
                        </p>
                        
                        <div className={`p-6 rounded-xl bg-gradient-to-br ${step.color} shadow-2xl animate-bounce-in`}>
                          <p className="text-lg font-bold text-white leading-relaxed">
                            {step.highlight}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <Card className="border-2 border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow mt-16">
            <CardContent className="p-10 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Icon name="TrendingUp" className="text-white" size={32} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Готовы повторить мой успех в своём заведении?
              </h3>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Всё, что работает у меня — буду внедрять у вас. Только проверенные методы и измеримые результаты.
              </p>
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

        @keyframes pulse-slow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(245, 158, 11, 0.6);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default JourneySection;