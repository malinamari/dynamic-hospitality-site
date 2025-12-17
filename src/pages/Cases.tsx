import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Cases = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    rating: '5',
    review: ''
  });

  const cases = [
    {
      id: 1,
      title: 'Ресторан "Гастроном" • Москва',
      problem: 'Низкий средний чек, персонал не умел продавать вино и допродажи',
      solution: 'Интенсив "7 дней работы" + 2 авторских тренинга по винному этикету',
      result: '+43% к среднему чеку за 2 месяца',
      details: [
        'Обучили 18 сотрудников зала техникам продаж',
        'Внедрили систему допродаж вина и десертов',
        'Создали скрипты для каждого этапа обслуживания',
        'Средний чек вырос с 3200₽ до 4580₽'
      ],
      revenue: '+2.8 млн ₽ дополнительной выручки за квартал',
      duration: '7 дней работы + 30 дней поддержки',
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 2,
      title: 'Винный бар "Sommelier" • Санкт-Петербург',
      problem: 'Гости приходили только выпить, без еды — низкая маржинальность',
      solution: 'Аудит + Авторский тренинг по фуд-пейрингу',
      result: '+67% продаж закусок и основных блюд',
      details: [
        'Провели полный аудит меню и сервиса',
        'Обучили барменов и официантов фуд-пейрингу',
        'Переработали подачу меню',
        'Увеличили продажи еды с 30% до 67% от общей выручки'
      ],
      revenue: '+1.9 млн ₽ за 3 месяца',
      duration: '5 дней аудит + 1 день тренинг',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 3,
      title: 'Ресторан при отеле • Сочи',
      problem: 'Высокая текучка персонала, отсутствие стандартов обслуживания',
      solution: 'Полное сопровождение 6 месяцев',
      result: 'Выручка +58% за полгода, текучка снизилась на 70%',
      details: [
        'Создали стандарты обслуживания и обучения',
        'Внедрили систему KPI и мотивации',
        'Провели найм и обучение новой команды',
        'Выручка выросла с 4.2 млн до 6.6 млн в месяц'
      ],
      revenue: '+14.4 млн ₽ дополнительной выручки за полгода',
      duration: '6 месяцев',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 4,
      title: 'Бар-ресторан "Лофт" • Екатеринбург',
      problem: 'Команда не понимала концепцию заведения, плохие отзывы',
      solution: 'Аудит "ДНК" + Интенсив "7 дней работы"',
      result: 'Рейтинг вырос с 3.8 до 4.7, средний чек +35%',
      details: [
        'Провели серию тайных гостей',
        'Выявили проблемы в сервисе и коммуникации',
        'Обучили команду работе с гостями',
        'Отзывы улучшились, средний чек вырос с 2400₽ до 3240₽'
      ],
      revenue: '+3.1 млн ₽ за квартал',
      duration: '7 дней + 5 дней аудит',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 5,
      title: 'Ресторан грузинской кухни • Казань',
      problem: 'Гости приходили только по акциям, нет лояльности',
      solution: 'Авторский тренинг по работе с возражениями + скрипты продаж',
      result: '+52% повторных визитов, рост среднего чека на 28%',
      details: [
        'Научили команду работать с возражениями',
        'Создали скрипты для каждого типа гостей',
        'Внедрили систему сбора обратной связи',
        'Увеличили долю постоянных гостей с 22% до 74%'
      ],
      revenue: '+2.2 млн ₽ за 3 месяца',
      duration: '1 день тренинг + 14 дней поддержки',
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 6,
      title: 'Суши-бар премиум • Новосибирск',
      problem: 'Низкие продажи сетов и премиум-позиций',
      solution: 'Интенсив "7 дней работы" + работа с меню',
      result: 'Продажи премиум-позиций +89%, средний чек +41%',
      details: [
        'Обучили команду презентации премиум-блюд',
        'Переработали подачу меню',
        'Создали скрипты допродаж',
        'Средний чек вырос с 2800₽ до 3950₽'
      ],
      revenue: '+4.7 млн ₽ за квартал',
      duration: '7 дней работы',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 7,
      title: 'Ресторан итальянской кухни • Краснодар',
      problem: 'Официанты боялись предлагать дорогие позиции',
      solution: 'Авторский тренинг по психологии продаж',
      result: 'Продажи вина +72%, средний чек +33%',
      details: [
        'Убрали страх перед дорогими позициями',
        'Научили правильно презентовать вино',
        'Внедрили систему мотивации',
        'Продажи вина выросли с 18% до 31% от чека'
      ],
      revenue: '+1.6 млн ₽ за 2 месяца',
      duration: '1 день',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 8,
      title: 'Стейк-хаус • Ростов-на-Дону',
      problem: 'Высокий процент возвратов блюд, конфликты с гостями',
      solution: 'Аудит + тренинг по работе с конфликтами',
      result: 'Возвраты снизились на 85%, рейтинг вырос до 4.9',
      details: [
        'Выявили проблемы в коммуникации',
        'Обучили работе с недовольными гостями',
        'Создали протоколы решения конфликтов',
        'Процент возвратов снизился с 8% до 1.2%'
      ],
      revenue: 'Экономия 950 тыс ₽ на возвратах',
      duration: '5 дней аудит + 1 день тренинг',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  const testimonials = [
    {
      name: 'Алексей Соколов',
      business: 'Ресторан "Гастроном", Москва',
      rating: 5,
      text: 'Марина — профессионал высочайшего уровня. За неделю она полностью изменила подход нашей команды к продажам. Средний чек вырос на 43%, и это только начало!',
      avatar: 'A'
    },
    {
      name: 'Елена Кравцова',
      business: 'Винный бар "Sommelier", СПб',
      rating: 5,
      text: 'Не верила, что можно так быстро увеличить продажи еды. Аудит выявил все проблемы, а тренинг дал команде инструменты. Результат превзошел ожидания — +67% продаж закусок!',
      avatar: 'E'
    },
    {
      name: 'Дмитрий Волков',
      business: 'Ресторан при отеле, Сочи',
      rating: 5,
      text: 'Сотрудничаем полгода. Марина не просто консультант — она часть нашей команды. Выручка выросла на 58%, текучка персонала снизилась на 70%. Рекомендую!',
      avatar: 'D'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = `⭐ НОВЫЙ ОТЗЫВ

Имя: ${formData.name}
Заведение: ${formData.business}
Оценка: ${formData.rating}/5
Отзыв: ${formData.review}`;

      const response = await fetch('https://functions.poehali.dev/5d1ba8c6-82ca-42ab-be50-54dc6866b7b5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          message
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: 'Спасибо за отзыв!',
          description: 'Ваш отзыв отправлен и появится после модерации.',
        });
        setFormData({
          name: '',
          business: '',
          rating: '5',
          review: ''
        });
      } else {
        throw new Error(data.error || 'Ошибка отправки');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить отзыв. Попробуйте снова.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Helmet>
        <title>Кейсы и отзывы | MARICO PRO</title>
        <meta name="description" content="Реальные результаты работы: +43% к среднему чеку, +58% выручки, рост продаж до 89%. 8 кейсов и отзывы клиентов." />
      </Helmet>

      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-amber-500/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-white hover:text-amber-400 transition-colors">
              MARICO PRO
            </Link>
            <Button asChild variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white">
              <Link to="/">← Назад на главную</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white">
              Кейсы и результаты
            </h1>
            <p className="text-xl text-amber-400 max-w-3xl mx-auto">
              Реальные истории успеха моих клиентов — от +28% до +89% роста выручки
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {cases.map((caseItem) => (
              <Card 
                key={caseItem.id}
                className="border-2 border-amber-500/30 bg-slate-800/50 backdrop-blur-sm hover:border-amber-500 transition-all duration-300"
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${caseItem.color} flex items-center justify-center`}>
                    <Icon name="TrendingUp" className="text-white" size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-white">{caseItem.title}</h3>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-amber-400 font-bold uppercase tracking-wide mb-1">Проблема:</p>
                      <p className="text-sm text-slate-300">{caseItem.problem}</p>
                    </div>

                    <div>
                      <p className="text-xs text-green-400 font-bold uppercase tracking-wide mb-1">Решение:</p>
                      <p className="text-sm text-slate-300">{caseItem.solution}</p>
                    </div>

                    <div className={`p-4 rounded-lg bg-gradient-to-br ${caseItem.color}`}>
                      <p className="text-xs text-white/80 font-bold uppercase tracking-wide mb-1">Результат:</p>
                      <p className="text-lg font-bold text-white">{caseItem.result}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-700 pt-4 space-y-2">
                    {caseItem.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Icon name="Check" className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-xs text-slate-300">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <p className="text-sm font-bold text-amber-400">{caseItem.revenue}</p>
                    <p className="text-xs text-slate-400">{caseItem.duration}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-12 pt-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Отзывы клиентов
              </h2>
              <p className="text-lg text-slate-300">
                Что говорят собственники и управляющие ресторанов
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <Card key={idx} className="border-2 border-amber-500/30 bg-slate-800/50 backdrop-blur-sm">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{testimonial.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white">{testimonial.name}</p>
                        <p className="text-xs text-slate-400">{testimonial.business}</p>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon key={i} name="Star" className="text-amber-400 fill-amber-400" size={16} />
                      ))}
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {testimonial.text}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="border-2 border-amber-500/30 bg-slate-800/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto">
                    <Icon name="MessageSquare" className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white">Оставить отзыв</h3>
                  <p className="text-slate-300">
                    Работали со мной? Поделитесь своим опытом — это очень важно!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="review-name" className="text-white">Ваше имя *</Label>
                      <Input
                        id="review-name"
                        placeholder="Иван Петров"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="review-business" className="text-white">Название заведения *</Label>
                      <Input
                        id="review-business"
                        placeholder='Ресторан "Пример"'
                        value={formData.business}
                        onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review-rating" className="text-white">Оценка *</Label>
                    <select
                      id="review-rating"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white"
                      required
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                      <option value="4">⭐⭐⭐⭐ (4)</option>
                      <option value="3">⭐⭐⭐ (3)</option>
                      <option value="2">⭐⭐ (2)</option>
                      <option value="1">⭐ (1)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review-text" className="text-white">Ваш отзыв *</Label>
                    <Textarea
                      id="review-text"
                      placeholder="Расскажите о результатах работы, что понравилось, что изменилось..."
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                      rows={5}
                      className="bg-slate-700/50 border-slate-600 text-white"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-6 pt-8">
            <div className="bg-slate-800/80 backdrop-blur-sm border-2 border-amber-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Хотите такие же результаты?
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                Запишитесь на консультацию — обсудим ваш ресторан и найдем точки роста
              </p>
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold">
                <Link to="/contact">Записаться на консультацию</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cases;