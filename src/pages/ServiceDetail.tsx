import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Check, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/sections/Navigation';
import FooterSection from '@/components/sections/FooterSection';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const serviceData: Record<string, any> = {
    audit: {
      title: 'Аудит "ДНК"',
      subtitle: 'Глубокий анализ всех аспектов вашего бизнеса',
      price: 'от 45 000₽',
      duration: '5-7 дней работы',
      description: 'Комплексный аудит, который выявляет сильные и слабые стороны вашего заведения. Я изучаю концепцию, анализирую гостей, проверяю внутренний брендинг — всё индивидуально, только то, что действительно нужно вашему заведению.',
      includes: [
        'Анализ концепции и брендинга — проверка соответствия позиционирования реальности',
        'Изучение целевой аудитории вашего формата — кто ваши гости на самом деле',
        'Мониторинг отзывов на всех площадках + рекомендации по работе с ними',
        'Интервью с персоналом — выявление проблем изнутри (вы удивитесь, сколько они знают)',
        'Серия тайных гостей — проверка сервиса так, что вы не сможете их вычислить',
        'Аудит маркетинга — проверка эффективности каналов привлечения',
        'Детальный отчёт на 40-60 страниц с конкретными рекомендациями'
      ],
      process: [
        {
          step: 1,
          title: 'Знакомство и анализ документов',
          description: 'Изучаю концепцию, меню, отзывы, маркетинговые материалы'
        },
        {
          step: 2,
          title: 'Наблюдение и интервью',
          description: 'Общение с командой, наблюдение за работой зала'
        },
        {
          step: 3,
          title: 'Тайные гости',
          description: '2-3 проверки в разное время для объективной оценки'
        },
        {
          step: 4,
          title: 'Подготовка отчёта',
          description: 'Систематизация данных, формирование рекомендаций'
        },
        {
          step: 5,
          title: 'Презентация результатов',
          description: 'Встреча с владельцем, разбор всех пунктов, план действий'
        }
      ],
      cases: [
        {
          name: 'Сеть кафе, 5 локаций',
          result: 'Рейтинг вырос с 3.8 до 4.9',
          details: 'За 2 месяца количество негативных отзывов сократилось на 94%. Поток гостей увеличился на 65%.',
          change: 'Полная перестройка системы обслуживания и внедрение стандартов работы с отзывами'
        }
      ]
    },
    training: {
      title: 'Индивидуальный тренинг',
      subtitle: 'Обучение под вашу команду после анализа каждого сотрудника',
      price: 'от 55 000₽',
      duration: '2-3 дня работы + 30 дней поддержки',
      description: 'Не шаблонное обучение, а персональная программа под вашу команду. Перед тренингами я изучаю и анализирую каждого сотрудника, выявляю сильные и слабые стороны. Невозможно учить всех одинаково — я выстраиваю методы и техники именно для вашей команды.',
      includes: [
        'Предварительный анализ каждого сотрудника (1-2 дня наблюдения)',
        'Выявление сильных сторон — их усиливаем',
        'Выявление слабых сторон — их прокачиваем',
        'Персональная программа тренинга под вашу специфику',
        '2-3 дня интенсивных тренингов с практикой',
        'Готовые скрипты продаж под ваше меню',
        '45 дней поддержки после тренинга',
        'Гарантия роста показателей на 20%'
      ],
      process: [
        {
          step: 1,
          title: 'Анализ команды',
          description: 'Наблюдаю за работой каждого сотрудника, выявляю особенности'
        },
        {
          step: 2,
          title: 'Разработка программы',
          description: 'Создаю индивидуальную программу под вашу команду'
        },
        {
          step: 3,
          title: 'Интенсивное обучение',
          description: '2-3 дня тренингов с практикой и ролевыми играми'
        },
        {
          step: 4,
          title: 'Внедрение скриптов',
          description: 'Отработка готовых фраз и техник продаж'
        },
        {
          step: 5,
          title: 'Поддержка 45 дней',
          description: 'Контроль внедрения, корректировка, ответы на вопросы'
        }
      ],
      cases: [
        {
          name: 'Семейный ресторан грузинской кухни',
          result: '+50% к среднему чеку',
          details: 'Чек вырос с 1450₽ до 2180₽. Прирост выручки +1 980 000₽ в месяц.',
          change: 'Обучение техникам ненавязчивых допродаж, ежедневный контроль внедрения'
        }
      ]
    },
    support: {
      title: 'Полное сопровождение',
      subtitle: 'Становлюсь вашим внешним директором по продажам',
      price: 'от 150 000₽/месяц',
      duration: 'От 3 месяцев',
      description: 'Максимальный формат работы для тех, кто хочет системный подход с полным контролем и гарантией результата. Я беру на себя все вопросы, связанные с продажами, сервисом и обучением персонала.',
      includes: [
        'Поддержка 24/7 в мессенджерах',
        'Найм и обучение персонала',
        'Контроль качества обслуживания',
        'Разработка и внедрение системы KPI',
        'Еженедельные встречи/созвоны',
        'Mystery shopping каждый месяц',
        'Работа с отзывами и репутацией',
        'Гарантия роста на 35-60% за квартал'
      ],
      process: [
        {
          step: 1,
          title: 'Диагностика и стратегия',
          description: 'Полный аудит, определение целей и KPI'
        },
        {
          step: 2,
          title: 'Внедрение системы',
          description: 'Разработка стандартов, обучение команды'
        },
        {
          step: 3,
          title: 'Постоянный контроль',
          description: 'Еженедельный мониторинг показателей, корректировка'
        },
        {
          step: 4,
          title: 'Развитие команды',
          description: 'Найм, обучение, мотивация персонала'
        },
        {
          step: 5,
          title: 'Масштабирование',
          description: 'Рост показателей, оптимизация процессов'
        }
      ],
      cases: [
        {
          name: 'Винный бар в центре Москвы',
          result: '+45% к среднему чеку',
          details: 'Чек вырос с 3200₽ до 4650₽. Прирост выручки +2 610 000₽ в месяц.',
          change: 'Обучение барменов продаже опыта, а не просто вина. Создание атмосферы экспертности'
        }
      ]
    }
  };

  const service = id ? serviceData[id] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-foreground mb-4">Услуга не найдена</h1>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{service.title} | MARICO PRO</title>
        <meta name="description" content={service.subtitle} />
      </Helmet>

      <Navigation scrollToSection={scrollToSection} />

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-8"
            >
              <ArrowLeft className="mr-2" size={20} />
              Назад к услугам
            </Button>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-black text-foreground">{service.title}</h1>
              <p className="text-2xl text-muted-foreground">{service.subtitle}</p>
              
              <div className="flex flex-wrap gap-6 items-center">
                <div className="bg-card p-6 rounded-xl border-2 border-border shadow-lg">
                  <div className="text-sm font-semibold text-foreground mb-2">Стоимость</div>
                  <div className="text-4xl font-black text-primary">{service.price}</div>
                </div>
                <div className="bg-card p-6 rounded-xl border-2 border-border shadow-lg">
                  <div className="text-sm font-semibold text-foreground mb-2">Длительность</div>
                  <div className="text-2xl font-bold text-foreground">{service.duration}</div>
                </div>
              </div>
            </div>

            <Card className="border-2 bg-primary/5">
              <CardContent className="p-8">
                <p className="text-lg text-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Что входит</h2>
              <div className="space-y-3">
                {service.includes.map((item: string, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-card rounded-xl border-2 border-border hover:border-primary transition-all">
                    <Check className="text-primary flex-shrink-0 mt-1" size={24} />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Как это работает</h2>
              <div className="space-y-4">
                {service.process.map((step: any, index: number) => (
                  <Card key={index} className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xl font-black">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Примеры результатов</h2>
              {service.cases.map((caseItem: any, index: number) => (
                <Card key={index} className="border-2 border-primary">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-bold text-foreground">{caseItem.name}</h3>
                      <div className="text-3xl font-black text-primary whitespace-nowrap">{caseItem.result}</div>
                    </div>
                    <p className="text-lg text-foreground">{caseItem.details}</p>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm font-semibold text-primary">
                        <Icon name="Lightbulb" className="inline mr-2" size={18} />
                        Ключевое изменение: {caseItem.change}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-primary bg-primary/5">
              <CardContent className="p-8 text-center space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Готовы начать?</h3>
                <p className="text-muted-foreground">Оставьте заявку на бесплатную консультацию, и мы обсудим ваш проект</p>
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-6"
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const element = document.getElementById('contact');
                      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                >
                  Оставить заявку
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ServiceDetail;