import { User } from './arrurru-auth';

const STORAGE_KEY = 'arrurru_users';

export interface UserWithPassword extends User {
  passwordHash: string;
}

export const getAllUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    const users = JSON.parse(stored) as UserWithPassword[];
    return users.map(u => ({
      id: u.id,
      email: u.email,
      fullName: u.fullName,
      role: u.role,
      projectName: u.projectName
    }));
  } catch {
    return [];
  }
};

export const initializeDemoData = () => {
  const existingUsers = getAllUsers();
  const existingProgress = localStorage.getItem('arrurru_progress');
  if (existingUsers.length > 0 && existingProgress) return;

  const demoUsers: UserWithPassword[] = [
    {
      id: 'user-1',
      email: 'anna@arrurru.com',
      fullName: 'Анна Смирнова',
      role: 'staff',
      projectName: 'ARRURRU',
      passwordHash: 'demo123'
    },
    {
      id: 'user-2',
      email: 'ivan@arrurru.com',
      fullName: 'Иван Петров',
      role: 'staff',
      projectName: 'ARRURRU',
      passwordHash: 'demo123'
    },
    {
      id: 'user-3',
      email: 'maria@arrurru.com',
      fullName: 'Мария Козлова',
      role: 'manager',
      projectName: 'ARRURRU',
      passwordHash: 'demo123'
    },
    {
      id: 'user-4',
      email: 'dmitry@arrurru.com',
      fullName: 'Дмитрий Новиков',
      role: 'staff',
      projectName: 'ARRURRU',
      passwordHash: 'demo123'
    },
    {
      id: 'user-5',
      email: 'olga@arrurru.com',
      fullName: 'Ольга Соколова',
      role: 'staff',
      projectName: 'ARRURRU',
      passwordHash: 'demo123'
    }
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUsers));

  const progressData = [
    { userId: 'user-1', contentId: '1', completed: true, examScore: 100, examAttempts: 1, completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
    { userId: 'user-1', contentId: '2', completed: true, examScore: 95, examAttempts: 1, completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() },
    { userId: 'user-1', contentId: '3', completed: true, examScore: 90, examAttempts: 1, completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { userId: 'user-1', contentId: '4', completed: true, examScore: 85, examAttempts: 1, completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
    
    { userId: 'user-2', contentId: '1', completed: true, examScore: 85, examAttempts: 2, completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
    { userId: 'user-2', contentId: '2', completed: true, examScore: 80, examAttempts: 1, completedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString() },
    
    { userId: 'user-3', contentId: '1', completed: true, examScore: 100, examAttempts: 1, completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { userId: 'user-3', contentId: '2', completed: true, examScore: 95, examAttempts: 1, completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { userId: 'user-3', contentId: '3', completed: true, examScore: 90, examAttempts: 1, completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    { userId: 'user-3', contentId: '4', completed: true, examScore: 90, examAttempts: 1, completedAt: new Date().toISOString() },
    { userId: 'user-3', contentId: '7', completed: true, examScore: 85, examAttempts: 1, completedAt: new Date().toISOString() },
    
    { userId: 'user-4', contentId: '1', completed: true, examScore: 80, examAttempts: 3, completedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
    { userId: 'user-4', contentId: '2', completed: true, examScore: 85, examAttempts: 2, completedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString() },
    { userId: 'user-4', contentId: '3', completed: true, examScore: 90, examAttempts: 1, completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
    
    { userId: 'user-5', contentId: '1', completed: true, examScore: 90, examAttempts: 1, completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { userId: 'user-5', contentId: '2', completed: true, examScore: 90, examAttempts: 1, completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() }
  ];

  localStorage.setItem('arrurru_progress', JSON.stringify(progressData));

  const examResults = progressData.map((p, idx) => ({
    userId: p.userId,
    userName: demoUsers.find(u => u.id === p.userId)?.fullName || 'Unknown',
    contentId: p.contentId,
    contentTitle: `Exam ${p.contentId}`,
    score: p.examScore || 0,
    totalQuestions: 4,
    answers: [
      { questionId: 'q1', userAnswer: 1, correct: true },
      { questionId: 'q2', userAnswer: 2, correct: p.examScore >= 75 },
      { questionId: 'q3', userAnswer: 1, correct: p.examScore >= 85 },
      { questionId: 'q4', userAnswer: 0, correct: p.examScore >= 90 }
    ],
    completedAt: p.completedAt || p.lastAttemptDate || new Date().toISOString()
  }));

  localStorage.setItem('arrurru_exam_results', JSON.stringify(examResults));
};