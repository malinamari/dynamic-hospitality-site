export interface ContentPage {
  id: string;
  section: 'codice' | 'training-hall' | 'trainings' | 'standards';
  title: string;
  slug: string;
  content: string;
  parentId?: string;
  orderIndex: number;
  files: ContentFile[];
  createdAt: string;
  updatedAt: string;
}

export interface ContentFile {
  name: string;
  url: string;
  type: 'document' | 'video' | 'image' | 'link';
}

const STORAGE_KEY = 'arrurru_content';

const getInitialContent = (): ContentPage[] => {
  return [
    {
      id: '1',
      section: 'codice',
      title: 'Философия ARRURRU',
      slug: 'philosophy',
      content: `# Философия ARRURRU

ARRURRU — это не просто ресторан, это пространство, где каждая деталь продумана для создания уникального опыта.

## Наши ценности

1. **Исключительность** — мы создаём то, чего нет больше нигде
2. **Внимание к деталям** — каждый элемент важен
3. **Профессионализм** — мы мастера своего дела
4. **Аутентичность** — мы остаёмся собой

## Наша миссия

Создавать незабываемые впечатления через безупречный сервис и атмосферу закрытого клуба.`,
      orderIndex: 1,
      files: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
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
