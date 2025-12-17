import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const CasesSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const cases = [
    {
      title: '+187% к выручке',
      subtitle: 'Премиальный ресторан',
      location: 'Москва • Премиум-сегмент • 120+ гостей/день',
      period: 'ФЕВРАЛЬ-МАЙ 2025',
      wasCheck: '4200₽',
      wasRevenue: '12.5M/мес',
      nowCheck: '6850₽',
      nowRevenue: '35.9M/мес',
      growth: '+187%',
      whatDid: 'Полная трансформация сервиса: переобучение персонала, внедрение премиум-стандартов, новые техники продаж. Научила команду продавать дорогие позиции естественно.',
      result: '+23.4M₽ к годовой выручке',
      quote: 'Марина полностью изменила подход команды к продажам. Теперь каждый гость хочет получить такой уровень сервиса.',
      author: 'Дмитрий, владелец',
      color: 'from-amber-500 to-orange-600'
    },
    {
      title: '+38% средний чек',
      subtitle: 'Семейный ресторан',
      location: 'Региональный город • Средний сегмент • 70-90 гостей/день',
      period: 'МАРТ-ИЮНЬ 2025',
      wasCheck: '1450₽',
      wasRevenue: '3.9M/мес',
      nowCheck: '2000₽',
      nowRevenue: '5.4M/мес',
      growth: '+38%',
      whatDid: 'Интенсив 7 дней работы: аудит → диагностика → тренинги → внедрение → анализ → доработка → результат. Научила персонал продавать через ценность, а не давление.',
      result: '+1.5M₽ в месяц',
      quote: 'Не верил, что система из Москвы сработает у нас. Марина доказала — при правильном подходе растут все.',
      author: 'Андрей, владелец',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: '+32% рост продаж',
      subtitle: 'Винный бар',
      location: 'Крупный город • Премиум-сегмент • 60-75 гостей/день',
      period: 'МАЙ-ИЮЛЬ 2025',
      wasCheck: '3200₽',
      wasRevenue: '5.8M/мес',
      nowCheck: '4220₽',
      nowRevenue: '7.6M/мес',
      growth: '+32%',
      whatDid: 'Мастер-класс для сомелье + скрипты продаж премиальных позиций. Научила продавать дорогое вино через правильную подачу и историю.',
      result: '+1.8M₽ в месяц',
      quote: 'Марина показала: знать продукт и уметь его продать — разные вещи. Теперь персонал не боится предлагать дорогие позиции.',
      author: 'Анна, управляющая',
      color: 'from-purple-500 to-violet-600'
    }
  ];

  return (
    <section id="results" className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-block px-6 py-3 bg-primary/10 rounded-full border-2 border-primary mb-4">
              <p className="text-primary font-black text-sm tracking-wide">📊 СВЕЖИЕ КЕЙСЫ 2025</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground">
              Как я достигаю результатов
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Реальные проекты этого года с измеримыми результатами
            </p>
          </div>

          <div className="space-y-6">
            {cases.map((caseItem, index) => (
              <Card 
                key={index}
                className={`border-2 border-border bg-white transition-all duration-500 hover:scale-[1.02] ${
                  expandedIndex === index ? 'shadow-2xl shadow-primary/20 border-primary' : 'hover:shadow-xl'
                }`}
              >
                <CardContent className="p-6">
                  <div 
                    className="cursor-pointer"
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${caseItem.color} text-white font-black text-2xl shadow-lg`}>
                            {caseItem.growth}
                          </div>
                          <div className={`transition-transform duration-300 ${
                            expandedIndex === index ? 'rotate-180' : ''
                          }`}>
                            <Icon name="ChevronDown" className="text-primary" size={32} />
                          </div>
                        </div>
                        <h3 className="text-2xl font-black text-foreground mb-1">
                          {caseItem.subtitle}
                        </h3>
                        <p className="text-sm text-muted-foreground">{caseItem.location}</p>
                      </div>
                      <div className="px-4 py-2 bg-green-100 rounded-full">
                        <p className="text-green-800 font-black text-xs">{caseItem.period}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl border border-border">
                        <div className="text-xs text-muted-foreground mb-1">Было:</div>
                        <div className="text-lg font-black text-destructive">{caseItem.wasCheck}</div>
                      </div>
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${caseItem.color} flex items-center justify-center`}>
                        <Icon name="TrendingUp" className="text-white" size={32} />
                      </div>
                      <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="text-xs text-muted-foreground mb-1">Стало:</div>
                        <div className="text-lg font-black text-green-600">{caseItem.nowCheck}</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`overflow-hidden transition-all duration-500 ${
                      expandedIndex === index ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl border border-border">
                          <div className="text-xs text-muted-foreground mb-2">Выручка до:</div>
                          <div className="text-xl font-black text-foreground">{caseItem.wasRevenue}</div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                          <div className="text-xs text-muted-foreground mb-2">Выручка после:</div>
                          <div className="text-xl font-black text-green-600">{caseItem.nowRevenue}</div>
                        </div>
                      </div>

                      <div className="bg-primary/5 p-5 rounded-xl border-2 border-primary/20">
                        <p className="text-xs font-bold text-primary mb-2">🎯 ЧТО СДЕЛАЛА:</p>
                        <p className="text-sm text-foreground leading-relaxed">{caseItem.whatDid}</p>
                      </div>

                      <div className={`p-5 rounded-xl bg-gradient-to-br ${caseItem.color} shadow-xl text-center`}>
                        <p className="text-2xl font-black text-white">{caseItem.result}</p>
                      </div>

                      <div className="border-l-4 border-primary pl-5 py-3 bg-slate-50 rounded-r-xl">
                        <p className="text-foreground italic mb-2">"{caseItem.quote}"</p>
                        <p className="text-sm text-foreground font-bold">— {caseItem.author}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link to="/cases">
              <Button size="lg" className="text-lg px-10 py-6 shadow-xl hover:scale-105 transition-transform">
                Смотреть все кейсы
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;