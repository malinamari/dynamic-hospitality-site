import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { ExamQuestion, ExamResult, saveExamResult, saveUserProgress } from '@/lib/arrurru-content';

interface ExamComponentProps {
  contentId: string;
  contentTitle: string;
  userId: string;
  userName: string;
  questions: ExamQuestion[];
  onComplete: (passed: boolean, score: number) => void;
}

const ExamComponent = ({ contentId, contentTitle, userId, userName, questions, onComplete }: ExamComponentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishExam();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishExam = () => {
    const results = questions.map((q, idx) => ({
      questionId: q.id,
      userAnswer: answers[idx],
      correct: answers[idx] === q.correctAnswer
    }));

    const correctCount = results.filter(r => r.correct).length;
    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 70;

    const examResult: ExamResult = {
      userId,
      userName,
      contentId,
      contentTitle,
      score,
      totalQuestions: questions.length,
      answers: results,
      completedAt: new Date().toISOString()
    };

    saveExamResult(examResult);

    const existingProgress = localStorage.getItem('arrurru_progress');
    let allProgress: any[] = [];
    if (existingProgress) {
      try {
        allProgress = JSON.parse(existingProgress);
      } catch {}
    }

    const progressIndex = allProgress.findIndex(p => p.userId === userId && p.contentId === contentId);
    const attempts = progressIndex >= 0 ? (allProgress[progressIndex].examAttempts || 0) + 1 : 1;

    saveUserProgress({
      userId,
      contentId,
      completed: passed,
      examScore: score,
      examAttempts: attempts,
      lastAttemptDate: new Date().toISOString(),
      completedAt: passed ? new Date().toISOString() : undefined
    });

    setShowResults(true);
    onComplete(passed, score);
  };

  const calculateScore = () => {
    const correctCount = answers.filter((answer, idx) => answer === questions[idx].correctAnswer).length;
    return Math.round((correctCount / questions.length) * 100);
  };

  if (!examStarted) {
    return (
      <Card className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-2 border-amber-500/50">
        <CardContent className="p-8 text-center space-y-6">
          <div className="inline-block p-4 bg-amber-500/20 rounded-full">
            <Icon name="FileCheck" size={48} className="text-amber-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Экзамен по материалу</h3>
            <p className="text-slate-300">
              В этом экзамене {questions.length} {questions.length === 1 ? 'вопрос' : questions.length < 5 ? 'вопроса' : 'вопросов'}
            </p>
            <p className="text-amber-400 font-semibold mt-2">
              Для успешной сдачи необходимо набрать минимум 70%
            </p>
          </div>
          <div className="space-y-2 text-left max-w-md mx-auto">
            <div className="flex items-center gap-2 text-slate-300">
              <Icon name="CheckCircle" size={20} className="text-green-400" />
              <span>Внимательно читайте вопросы</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Icon name="CheckCircle" size={20} className="text-green-400" />
              <span>Можно вернуться к предыдущим вопросам</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Icon name="CheckCircle" size={20} className="text-green-400" />
              <span>Результаты сохраняются автоматически</span>
            </div>
          </div>
          <Button 
            onClick={() => setExamStarted(true)} 
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-6 text-lg"
          >
            Начать экзамен
            <Icon name="ArrowRight" size={24} className="ml-2" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const passed = score >= 70;
    const correctCount = answers.filter((answer, idx) => answer === questions[idx].correctAnswer).length;

    return (
      <Card className={`border-2 ${passed ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50' : 'bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/50'}`}>
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className={`inline-block p-4 rounded-full ${passed ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              <Icon name={passed ? 'CheckCircle' : 'XCircle'} size={64} className={passed ? 'text-green-400' : 'text-red-400'} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {passed ? 'Экзамен сдан!' : 'Попробуйте еще раз'}
              </h3>
              <p className="text-2xl font-bold text-amber-400">
                Ваш результат: {score}%
              </p>
              <p className="text-slate-300 mt-2">
                Правильных ответов: {correctCount} из {questions.length}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {questions.map((question, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === question.correctAnswer;
              return (
                <div key={question.id} className={`p-4 rounded-lg border-2 ${isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                  <div className="flex items-start gap-3">
                    <Icon name={isCorrect ? 'Check' : 'X'} size={20} className={isCorrect ? 'text-green-400' : 'text-red-400'} />
                    <div className="flex-1">
                      <p className="text-white font-semibold mb-2">{question.question}</p>
                      <p className="text-sm text-slate-300">
                        Ваш ответ: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>{question.options[userAnswer]}</span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-400 mt-1">
                          Правильно: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!passed && (
            <div className="text-center pt-4">
              <Button 
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers(new Array(questions.length).fill(-1));
                  setShowResults(false);
                  setExamStarted(false);
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold"
              >
                Пройти экзамен заново
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  return (
    <Card className="bg-slate-800/50 border-2 border-amber-500/50">
      <CardContent className="p-8 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Вопрос {currentQuestion + 1} из {questions.length}</span>
            <span>{progress}% пройдено</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-6">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentQuestion] === idx
                    ? 'bg-amber-500/20 border-amber-500 text-white'
                    : 'bg-slate-700/30 border-slate-600 text-slate-300 hover:border-amber-500/50 hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion] === idx 
                      ? 'border-amber-500 bg-amber-500' 
                      : 'border-slate-500'
                  }`}>
                    {answers[currentQuestion] === idx && (
                      <Icon name="Check" size={16} className="text-white" />
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="disabled:opacity-50"
          >
            <Icon name="ChevronLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <Button
            onClick={handleNext}
            disabled={answers[currentQuestion] === -1}
            className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'Завершить экзамен' : 'Следующий вопрос'}
            <Icon name={currentQuestion === questions.length - 1 ? 'Check' : 'ChevronRight'} size={20} className="ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamComponent;
