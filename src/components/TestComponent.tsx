import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { TestQuestion, TestResult } from '@/lib/arrurru-test-types';

interface TestComponentProps {
  contentId: string;
  contentTitle: string;
  userId: string;
  userName: string;
  questions: TestQuestion[];
  onComplete: () => void;
}

const TestComponent = ({ 
  contentId, 
  contentTitle, 
  userId, 
  userName, 
  questions,
  onComplete 
}: TestComponentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | number[] | string)[]>(
    new Array(questions.length).fill(null).map((_, idx) => 
      questions[idx].type === 'multiple' ? [] : ''
    )
  );
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const handleSingleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleMultipleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    const current = newAnswers[currentQuestion] as number[];
    
    if (current.includes(optionIndex)) {
      newAnswers[currentQuestion] = current.filter(i => i !== optionIndex);
    } else {
      newAnswers[currentQuestion] = [...current, optionIndex];
    }
    
    setAnswers(newAnswers);
  };

  const handleTextAnswer = (text: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = text;
    setAnswers(newAnswers);
  };

  const isAnswered = () => {
    const answer = answers[currentQuestion];
    const question = questions[currentQuestion];
    
    if (question.type === 'multiple') {
      return (answer as number[]).length > 0;
    }
    if (question.type === 'text' || question.type === 'essay') {
      return (answer as string).trim().length > 0;
    }
    return answer !== null && answer !== '';
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const finishTest = () => {
    const testResult: TestResult = {
      userId,
      userName,
      contentId,
      contentTitle,
      answers: questions.map((q, idx) => ({
        questionId: q.id,
        type: q.type,
        question: q.question,
        answer: answers[idx],
        options: q.options
      })),
      completedAt: new Date().toISOString()
    };

    // Сохраняем результат в localStorage
    const stored = localStorage.getItem('arrurru_test_results');
    let allResults: TestResult[] = [];
    
    if (stored) {
      try {
        allResults = JSON.parse(stored);
      } catch {}
    }
    
    allResults.push(testResult);
    localStorage.setItem('arrurru_test_results', JSON.stringify(allResults));

    // Отмечаем прогресс как завершённый
    const storedProgress = localStorage.getItem('arrurru_progress');
    let allProgress: any[] = [];
    
    if (storedProgress) {
      try {
        allProgress = JSON.parse(storedProgress);
      } catch {}
    }

    const progressIndex = allProgress.findIndex(
      p => p.userId === userId && p.contentId === contentId
    );

    if (progressIndex >= 0) {
      allProgress[progressIndex].completed = true;
      allProgress[progressIndex].completedAt = new Date().toISOString();
    } else {
      allProgress.push({
        userId,
        contentId,
        completed: true,
        examAttempts: 0,
        completedAt: new Date().toISOString()
      });
    }

    localStorage.setItem('arrurru_progress', JSON.stringify(allProgress));

    setTestCompleted(true);
    onComplete();
  };

  if (!testStarted) {
    return (
      <Card className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-2 border-amber-500/50">
        <CardContent className="p-8 text-center space-y-6">
          <div className="inline-block p-4 bg-amber-500/20 rounded-full">
            <Icon name="ClipboardCheck" size={48} className="text-amber-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Итоговый тест</h3>
            <p className="text-slate-300 text-lg">
              В этом тесте {questions.length} {questions.length === 1 ? 'вопрос' : questions.length < 5 ? 'вопроса' : 'вопросов'}
            </p>
            <p className="text-amber-300 mt-4">
              Тест помогает руководителю увидеть, как вы ознакомились с материалом
            </p>
          </div>
          <div className="space-y-3 text-left max-w-md mx-auto bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-start gap-3 text-slate-300">
              <Icon name="CheckCircle" size={20} className="text-amber-400 flex-shrink-0 mt-1" />
              <span>Отвечайте вдумчиво — результаты увидит управляющий</span>
            </div>
            <div className="flex items-start gap-3 text-slate-300">
              <Icon name="CheckCircle" size={20} className="text-amber-400 flex-shrink-0 mt-1" />
              <span>Разные типы вопросов: выбор, отметки, текстовые ответы</span>
            </div>
            <div className="flex items-start gap-3 text-slate-300">
              <Icon name="CheckCircle" size={20} className="text-amber-400 flex-shrink-0 mt-1" />
              <span>Можно вернуться к предыдущим вопросам</span>
            </div>
          </div>
          <Button 
            onClick={() => setTestStarted(true)} 
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-6 text-lg"
          >
            Начать тест
            <Icon name="ArrowRight" size={24} className="ml-2" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (testCompleted) {
    return (
      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-block p-4 bg-green-500/20 rounded-full">
              <Icon name="CheckCircle" size={64} className="text-green-400" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Тест завершён!
              </h3>
              <p className="text-slate-300 text-lg mt-4">
                Ваши ответы отправлены управляющему
              </p>
              <p className="text-amber-300 mt-2">
                Спасибо за прохождение El Códice de ARRURRU
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);
  const answer = answers[currentQuestion];

  return (
    <Card className="bg-slate-800/50 border-2 border-amber-500/50">
      <CardContent className="p-6 lg:p-8 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Вопрос {currentQuestion + 1} из {questions.length}</span>
            <span>{progress}% пройдено</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-start gap-3 mb-6">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                <span className="text-amber-400 font-bold">{currentQuestion + 1}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-white leading-relaxed">
                  {question.question}
                </h4>
                <p className="text-sm text-slate-400 mt-2">
                  {question.type === 'single' && 'Выберите один вариант'}
                  {question.type === 'multiple' && 'Можно выбрать несколько вариантов'}
                  {question.type === 'text' && 'Напишите короткий ответ (1-2 предложения)'}
                  {question.type === 'essay' && 'Напишите развёрнутый ответ'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {question.type === 'single' && question.options && (
              question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSingleAnswer(idx)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answer === idx
                      ? 'border-amber-500 bg-amber-500/20 text-white'
                      : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-amber-500/50 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      answer === idx ? 'border-amber-500' : 'border-slate-500'
                    }`}>
                      {answer === idx && (
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))
            )}

            {question.type === 'multiple' && question.options && (
              question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleMultipleAnswer(idx)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    (answer as number[]).includes(idx)
                      ? 'border-amber-500 bg-amber-500/20 text-white'
                      : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-amber-500/50 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      checked={(answer as number[]).includes(idx)}
                      className="border-2"
                    />
                    <span>{option}</span>
                  </div>
                </button>
              ))
            )}

            {(question.type === 'text' || question.type === 'essay') && (
              <Textarea
                value={answer as string}
                onChange={(e) => handleTextAnswer(e.target.value)}
                placeholder={question.type === 'text' ? 'Ваш ответ...' : 'Напишите развёрнутый ответ...'}
                className={`bg-slate-700/50 border-2 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-500 ${
                  question.type === 'essay' ? 'min-h-[200px]' : 'min-h-[100px]'
                }`}
                rows={question.type === 'essay' ? 8 : 4}
              />
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-700">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="text-amber-400 border-amber-500/50 hover:bg-amber-500/20"
          >
            <Icon name="ChevronLeft" size={20} className="mr-2" />
            Назад
          </Button>

          {currentQuestion === questions.length - 1 ? (
            <Button
              onClick={finishTest}
              disabled={!isAnswered()}
              className="bg-green-600 hover:bg-green-700 text-white font-bold disabled:opacity-50"
            >
              Завершить тест
              <Icon name="Check" size={20} className="ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isAnswered()}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold disabled:opacity-50"
            >
              Далее
              <Icon name="ChevronRight" size={20} className="ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestComponent;