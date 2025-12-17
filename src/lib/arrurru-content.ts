export interface ContentPage {
  id: string;
  section: 'codice' | 'training-hall' | 'trainings' | 'standards';
  title: string;
  slug: string;
  content: string;
  parentId?: string;
  orderIndex: number;
  files: ContentFile[];
  hasExam?: boolean;
  exam?: ExamQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface ContentFile {
  name: string;
  url: string;
  type: 'document' | 'video' | 'image' | 'link';
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface UserProgress {
  userId: string;
  contentId: string;
  completed: boolean;
  examScore?: number;
  examAttempts: number;
  lastAttemptDate?: string;
  completedAt?: string;
}

export interface ExamResult {
  userId: string;
  userName: string;
  contentId: string;
  contentTitle: string;
  score: number;
  totalQuestions: number;
  answers: { questionId: string; userAnswer: number; correct: boolean }[];
  completedAt: string;
}

const STORAGE_KEY = 'arrurru_content';
const PROGRESS_KEY = 'arrurru_progress';
const EXAM_RESULTS_KEY = 'arrurru_exam_results';

const getInitialContent = (): ContentPage[] => {
  return [
    {
      id: '1',
      section: 'codice',
      title: 'Глава 1: Философия ARRURRU',
      slug: 'philosophy',
      content: `# Глава 1: Философия ARRURRU

ARRURRU — это не просто ресторан. Это пространство, где каждая деталь продумана для создания уникального опыта гостя.

## Наши ценности

1. **Исключительность** — мы создаём то, чего нет больше нигде. Каждое блюдо, каждый коктейль, каждая деталь интерьера уникальны.

2. **Внимание к деталям** — от сервировки стола до температуры напитка. Мелочей не бывает.

3. **Профессионализм** — мы мастера своего дела. Постоянное обучение и совершенствование навыков.

4. **Аутентичность** — мы остаёмся собой и создаём искреннюю атмосферу.

## Наша миссия

Создавать незабываемые впечатления через безупречный сервис и атмосферу закрытого клуба, где каждый гость чувствует себя особенным.

## Код ARRURRU

- Гость всегда прав (но мы знаем, как направить его к лучшему выбору)
- Команда — это семья
- Качество превыше скорости
- Предвосхищай желания гостя`,
      orderIndex: 1,
      files: [],
      hasExam: true,
      exam: [
        {
          id: 'q1-1',
          question: 'Что является главной миссией ARRURRU?',
          options: [
            'Максимальная прибыль',
            'Создание незабываемых впечатлений через безупречный сервис',
            'Быстрое обслуживание большого количества гостей',
            'Продажа дорогих блюд'
          ],
          correctAnswer: 1
        },
        {
          id: 'q1-2',
          question: 'Какая из ценностей НЕ является ключевой для ARRURRU?',
          options: [
            'Исключительность',
            'Внимание к деталям',
            'Скорость обслуживания любой ценой',
            'Профессионализм'
          ],
          correctAnswer: 2
        },
        {
          id: 'q1-3',
          question: 'Что важнее в философии ARRURRU?',
          options: [
            'Скорость обслуживания',
            'Качество обслуживания',
            'Количество гостей',
            'Экономия времени'
          ],
          correctAnswer: 1
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      section: 'codice',
      title: 'Глава 2: Стандарты поведения',
      slug: 'behavior-standards',
      content: `# Глава 2: Стандарты поведения персонала

## Внешний вид

### Униформа
- Всегда чистая и выглаженная
- Чёрная рубашка/блузка (предоставляется рестораном)
- Чёрные классические брюки/юбка
- Закрытая кожаная обувь на удобном каблуке (до 5 см)

### Личная гигиена
- Чистые, ухоженные руки
- Короткие ногти с нейтральным маникюром
- Лёгкий или нейтральный парфюм
- Свежее дыхание (мятные леденцы всегда под рукой)

### Причёска
- Длинные волосы собраны в пучок или хвост
- Чёрные заколки, резинки
- Никаких ярких цветов волос

## Манеры и поведение

### Встреча гостя
- Улыбка и зрительный контакт (первые 3 секунды)
- Приветствие: "Добрый вечер, добро пожаловать в ARRURRU"
- Помощь с верхней одеждой
- Проводим к столу, идя чуть впереди

### За столом
- Подходим слева от гостя
- Держим меню обеими руками, подаём развёрнутым
- Даём время изучить меню (2-3 минуты)
- Рекомендуем блюда, исходя из предпочтений гостя

### Запрещено
- Жевать жвачку
- Пользоваться телефоном в зале
- Облокачиваться на стены, столы, стулья
- Скрещивать руки на груди
- Разговаривать громко или смеяться
- Обсуждать гостей

## Речь и коммуникация

### Правила речи
- Спокойный, уверенный тон
- Средняя громкость голоса
- Чёткая дикция
- Избегаем слов-паразитов

### Фразы-табу
- "Не знаю"
- "Это не моя зона"
- "Я не могу"
- "Извините, но..."

### Правильные фразы
- "Сейчас уточню для Вас"
- "С удовольствием помогу"
- "Разрешите предложить"
- "Для Вас я могу..."

## Работа в команде

- Помогаем коллегам без просьб
- Подхватываем зоны друг друга
- Передаём информацию о гостях (предпочтения, аллергии)
- Поддерживаем позитивную атмосферу`,
      orderIndex: 2,
      files: [],
      hasExam: true,
      exam: [
        {
          id: 'q2-1',
          question: 'Как правильно приветствовать гостя?',
          options: [
            'Просто кивнуть головой',
            'Улыбка, зрительный контакт и приветствие "Добрый вечер, добро пожаловать в ARRURRU"',
            'Сказать "Привет" и показать на стол',
            'Молча проводить к столу'
          ],
          correctAnswer: 1
        },
        {
          id: 'q2-2',
          question: 'Что из перечисленного запрещено персоналу?',
          options: [
            'Помогать коллегам',
            'Улыбаться гостям',
            'Пользоваться телефоном в зале',
            'Рекомендовать блюда'
          ],
          correctAnswer: 2
        },
        {
          id: 'q2-3',
          question: 'Какую фразу нельзя говорить гостю?',
          options: [
            '"Сейчас уточню для Вас"',
            '"Не знаю"',
            '"С удовольствием помогу"',
            '"Разрешите предложить"'
          ],
          correctAnswer: 1
        },
        {
          id: 'q2-4',
          question: 'С какой стороны подходить к гостю за столом?',
          options: [
            'Справа',
            'Слева',
            'Сзади',
            'Спереди'
          ],
          correctAnswer: 1
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      section: 'codice',
      title: 'Глава 3: Сервис и обслуживание',
      slug: 'service-standards',
      content: `# Глава 3: Стандарты сервиса

## Этапы обслуживания

### 1. Встреча (0-2 минуты)
- Зрительный контакт и улыбка
- Приветствие
- Помощь с верхней одеждой
- Сопровождение к столу
- Помощь с креслом (особенно для женщин)

### 2. Предложение меню (2-3 минуты)
- Подаём меню развёрнутым
- Рассказываем о сезонных блюдах и специальных предложениях
- Уточняем, есть ли пищевые ограничения
- Предлагаем аперитив

### 3. Приём заказа (5-7 минут после посадки)
- Рекомендуем блюда, учитывая предпочтения
- Задаём уточняющие вопросы (степень прожарки, уровень остроты)
- Предлагаем дополнения (соусы, гарниры)
- Повторяем заказ для подтверждения

### 4. Обслуживание (каждые 5-7 минут)
- Проверяем, всё ли в порядке
- Убираем пустые бокалы и тарелки
- Подливаем воду
- Предлагаем дополнительные напитки

### 5. Завершение (после основного блюда)
- Спрашиваем про десерт и кофе
- Рассказываем про десертное меню
- Приносим счёт в папке
- Благодарим за визит

### 6. Прощание
- Помогаем с верхней одеждой
- Провожаем до выхода
- Приглашаем вернуться

## Правила сервировки

### Базовая сервировка
- Приборы строго на одной линии
- Бокалы справа, на 45 градусов от края тарелки
- Салфетка слева или на тарелке
- Расстояние от края стола — 1-2 см

### Смена приборов
- Убираем использованные приборы вместе с тарелкой
- Приносим новые перед подачей следующего блюда
- Всегда справа и слева одновременно

### Подача блюд
- Горячие блюда на горячих тарелках
- Холодные блюда на охлаждённых тарелках
- Ставим блюдо двумя руками
- Комментируем блюдо: название, основные ингредиенты
- Желаем приятного аппетита

## Работа с напитками

### Подача воды
- Наполняем бокал на 3/4
- Доливаем, когда выпито больше половины
- Убираем пустой бокал и приносим чистый

### Подача вина
- Показываем бутылку гостю для подтверждения
- Открываем у стола
- Даём попробовать (дегустация 30 мл)
- После одобрения разливаем дамам, затем мужчинам
- Наполняем на 1/3 бокала

### Подача коктейлей
- Ставим на подставку или салфетку
- Трубочку и украшение поворачиваем к гостю
- Объясняем состав, если гость спрашивает

## Решение проблем

### Гость недоволен блюдом
1. Извиняемся искренне
2. Уточняем, что именно не понравилось
3. Предлагаем замену или альтернативу
4. Сообщаем управляющему
5. Убираем блюдо из счёта

### Гость ждёт долго
1. Подходим и объясняем причину задержки
2. Предлагаем комплимент от заведения (лёгкая закуска)
3. Держим в курсе времени готовки
4. Благодарим за терпение

### Разлито на гостя
1. Немедленно извиняемся
2. Даём чистую салфетку
3. Предлагаем помощь в уборке
4. Сообщаем управляющему
5. Оплачиваем химчистку при необходимости`,
      orderIndex: 3,
      files: [],
      hasExam: true,
      exam: [
        {
          id: 'q3-1',
          question: 'Через сколько минут после посадки принимаем заказ?',
          options: [
            'Сразу же',
            '5-7 минут',
            '10-15 минут',
            'Когда гость позовёт'
          ],
          correctAnswer: 1
        },
        {
          id: 'q3-2',
          question: 'На сколько наполняем бокал вином?',
          options: [
            'До краёв',
            'На 1/2',
            'На 1/3',
            'На 3/4'
          ],
          correctAnswer: 2
        },
        {
          id: 'q3-3',
          question: 'Что делать, если гость недоволен блюдом?',
          options: [
            'Сказать, что это проблема кухни',
            'Извиниться, уточнить проблему и предложить замену',
            'Убрать блюдо и принести счёт',
            'Игнорировать жалобу'
          ],
          correctAnswer: 1
        },
        {
          id: 'q3-4',
          question: 'Как часто проверяем, всё ли в порядке у гостя?',
          options: [
            'Каждую минуту',
            'Каждые 5-7 минут',
            'Каждые 15 минут',
            'Один раз за весь визит'
          ],
          correctAnswer: 1
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      section: 'training-hall',
      title: 'Модуль 1: Введение в сервис ARRURRU',
      slug: 'module-1-intro',
      content: `# Модуль 1: Введение в сервис ARRURRU

## Цель модуля
Понять основы философии обслуживания и стандарты ARRURRU.

## Темы для изучения
- История и концепция проекта
- Стандарты внешнего вида
- Базовые правила общения с гостями
- Территория и зонирование

## Практика
Прохождение по всем зонам ресторана с управляющим.`,
      orderIndex: 1,
      files: [],
      hasExam: true,
      exam: [
        {
          id: 'qth1-1',
          question: 'Какая главная цель модуля "Введение в сервис ARRURRU"?',
          options: [
            'Научиться готовить блюда',
            'Понять основы философии обслуживания ARRURRU',
            'Узнать расписание работы',
            'Познакомиться с коллегами'
          ],
          correctAnswer: 1
        },
        {
          id: 'qth1-2',
          question: 'Что НЕ относится к базовым стандартам внешнего вида?',
          options: [
            'Чистая униформа',
            'Яркий макияж и украшения',
            'Собранные волосы',
            'Ухоженные руки'
          ],
          correctAnswer: 1
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '5',
      section: 'trainings',
      title: 'Тренинг 1: Командообразование',
      slug: 'training-1-team',
      content: `# Тренинг 1: Командообразование

## Формат
- Длительность: 1 неполный день (4-5 часов)
- Участники: Весь персонал ARRURRU
- Формат: Интерактивные упражнения и практики

## Цели тренинга
1. Сплотить команду
2. Создать доверие между сотрудниками
3. Понять роль каждого в команде
4. Сформировать единое видение проекта

## Программа
- 10:00-11:00 — Знакомство и ледоколы
- 11:00-12:30 — Командные упражнения
- 12:30-13:00 — Перерыв
- 13:00-14:30 — Практика коммуникации
- 14:30-15:00 — Подведение итогов

## Домашнее задание
Написать 3 идеи по улучшению работы команды.`,
      orderIndex: 1,
      files: [],
      hasExam: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '6',
      section: 'standards',
      title: 'Стандарты внешнего вида',
      slug: 'appearance-standards',
      content: `# Стандарты внешнего вида

## Униформа
- Чёрная рубашка/блузка (предоставляется рестораном)
- Чёрные брюки/юбка (классический крой)
- Чёрная закрытая обувь (кожаная, без каблука выше 5 см)

## Причёска
- Волосы чистые, уложенные
- Длинные волосы собраны
- Никаких ярких цветов

## Аксессуары
- Минимальные украшения
- Только классические часы
- Запрещены: большие серьги, браслеты, кольца (кроме обручальных)

## Гигиена
- Чистые руки, ухоженные ногти
- Нейтральный макияж
- Лёгкий или нейтральный парфюм`,
      orderIndex: 1,
      files: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
};

export const loadContent = (): ContentPage[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return getInitialContent();
    }
  }
  const initial = getInitialContent();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
};

export const getContentBySection = (section: string): ContentPage[] => {
  const allContent = loadContent();
  return allContent.filter(page => page.section === section).sort((a, b) => a.orderIndex - b.orderIndex);
};

export const getContentBySlug = (slug: string): ContentPage | undefined => {
  const allContent = loadContent();
  return allContent.find(page => page.slug === slug);
};

export const saveContent = (page: Partial<ContentPage> & { section: ContentPage['section']; title: string; slug: string }): ContentPage => {
  const allContent = loadContent();
  
  const newPage: ContentPage = {
    id: page.id || crypto.randomUUID(),
    section: page.section,
    title: page.title,
    slug: page.slug,
    content: page.content || '',
    parentId: page.parentId,
    orderIndex: page.orderIndex || allContent.filter(p => p.section === page.section).length + 1,
    files: page.files || [],
    createdAt: page.id ? (allContent.find(p => p.id === page.id)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  if (page.id) {
    const index = allContent.findIndex(p => p.id === page.id);
    if (index >= 0) {
      allContent[index] = newPage;
    } else {
      allContent.push(newPage);
    }
  } else {
    allContent.push(newPage);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allContent));
  return newPage;
};

export const deleteContent = (id: string): boolean => {
  const allContent = loadContent();
  const filtered = allContent.filter(page => page.id !== id);
  
  if (filtered.length < allContent.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
  return false;
};

export const getUserProgress = (userId: string): UserProgress[] => {
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (!stored) return [];
  try {
    const allProgress = JSON.parse(stored) as UserProgress[];
    return allProgress.filter(p => p.userId === userId);
  } catch {
    return [];
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  const stored = localStorage.getItem(PROGRESS_KEY);
  let allProgress: UserProgress[] = [];
  
  if (stored) {
    try {
      allProgress = JSON.parse(stored);
    } catch {
      allProgress = [];
    }
  }
  
  const existingIndex = allProgress.findIndex(
    p => p.userId === progress.userId && p.contentId === progress.contentId
  );
  
  if (existingIndex >= 0) {
    allProgress[existingIndex] = progress;
  } else {
    allProgress.push(progress);
  }
  
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
};

export const saveExamResult = (result: ExamResult): void => {
  const stored = localStorage.getItem(EXAM_RESULTS_KEY);
  let allResults: ExamResult[] = [];
  
  if (stored) {
    try {
      allResults = JSON.parse(stored);
    } catch {
      allResults = [];
    }
  }
  
  allResults.push(result);
  localStorage.setItem(EXAM_RESULTS_KEY, JSON.stringify(allResults));
};

export const getExamResults = (userId?: string): ExamResult[] => {
  const stored = localStorage.getItem(EXAM_RESULTS_KEY);
  if (!stored) return [];
  
  try {
    const allResults = JSON.parse(stored) as ExamResult[];
    return userId ? allResults.filter(r => r.userId === userId) : allResults;
  } catch {
    return [];
  }
};

export const getAllProgress = (): UserProgress[] => {
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};