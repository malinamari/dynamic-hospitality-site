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

import { getCodeiceContent } from './arrurru-codice-content';
import { getAllTrainingHallContent } from './arrurru-training-hall-content';
import { getTrainingsContent } from './arrurru-trainings-content';

const STORAGE_KEY = 'arrurru_content';
const PROGRESS_KEY = 'arrurru_progress';
const EXAM_RESULTS_KEY = 'arrurru_exam_results';
const CONTENT_VERSION_KEY = 'arrurru_content_version';
const CURRENT_CONTENT_VERSION = '10.6';

const getInitialContent = (): ContentPage[] => {
  const codicePages = getCodeiceContent();
  const trainingHallPages = getAllTrainingHallContent();
  const trainingsPages = getTrainingsContent();
  return [
    ...codicePages,
    ...trainingHallPages,
    ...trainingsPages,
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
      hasExam: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
};

export const loadContent = (): ContentPage[] => {
  try {
    const storedVersion = localStorage.getItem(CONTENT_VERSION_KEY);
    
    if (storedVersion !== CURRENT_CONTENT_VERSION) {
      console.log('🔄 Content version mismatch, reloading...', { storedVersion, currentVersion: CURRENT_CONTENT_VERSION });
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(CONTENT_VERSION_KEY, CURRENT_CONTENT_VERSION);
      
      const initialContent = getInitialContent();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialContent));
      console.log('✅ Content reloaded, pages count:', initialContent.length);
      return initialContent;
    }
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const content = JSON.parse(stored);
      console.log('📚 Loaded content from storage, pages count:', content.length);
      return content;
    }
    
    const initialContent = getInitialContent();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialContent));
    localStorage.setItem(CONTENT_VERSION_KEY, CURRENT_CONTENT_VERSION);
    console.log('✨ First time init, pages count:', initialContent.length);
    return initialContent;
  } catch (error) {
    console.error('Error loading content:', error);
    return getInitialContent();
  }
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

export const isAllExamsCompleted = (userId: string): boolean => {
  const userProgress = getUserProgress(userId);
  const allContent = loadContent();
  const examsContent = allContent.filter(page => page.hasExam);
  
  if (examsContent.length === 0) return false;
  
  const completedExams = userProgress.filter(p => p.completed && (p.examScore || 0) >= 80);
  
  return completedExams.length >= examsContent.length;
};

interface CertificateRequest {
  userId: string;
  userName: string;
  userEmail: string;
  requestedAt: string;
  approved: boolean;
}

const CERTIFICATE_REQUESTS_KEY = 'arrurru_certificate_requests';

export const requestCertificate = (userId: string, userName: string, userEmail: string): { success: boolean; error?: string } => {
  if (!isAllExamsCompleted(userId)) {
    return { success: false, error: 'Необходимо пройти все экзамены с результатом 80% и выше' };
  }
  
  const stored = localStorage.getItem(CERTIFICATE_REQUESTS_KEY);
  const requests: CertificateRequest[] = stored ? JSON.parse(stored) : [];
  
  const existingRequest = requests.find(r => r.userId === userId);
  if (existingRequest) {
    return { success: false, error: 'Вы уже отправили запрос на сертификат' };
  }
  
  const newRequest: CertificateRequest = {
    userId,
    userName,
    userEmail,
    requestedAt: new Date().toISOString(),
    approved: false
  };
  
  requests.push(newRequest);
  localStorage.setItem(CERTIFICATE_REQUESTS_KEY, JSON.stringify(requests));
  
  return { success: true };
};

export const getCertificateRequests = (): CertificateRequest[] => {
  const stored = localStorage.getItem(CERTIFICATE_REQUESTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const hasCertificateRequest = (userId: string): boolean => {
  const requests = getCertificateRequests();
  return requests.some(r => r.userId === userId);
};