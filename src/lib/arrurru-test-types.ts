// Типы вопросов для теста
export type TestQuestionType = 'single' | 'multiple' | 'text' | 'essay';

export interface TestQuestion {
  id: string;
  type: TestQuestionType;
  question: string;
  options?: string[]; // Для single и multiple
  correctAnswer?: number | number[]; // Для проверки (не показываем пользователю)
  userAnswer?: number | number[] | string; // Ответ пользователя
  required?: boolean;
}

export interface TestResult {
  userId: string;
  userName: string;
  contentId: string;
  contentTitle: string;
  answers: {
    questionId: string;
    type: TestQuestionType;
    question: string;
    answer: number | number[] | string;
    options?: string[];
  }[];
  completedAt: string;
}
