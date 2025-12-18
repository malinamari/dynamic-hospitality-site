import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { TestResult } from '@/lib/arrurru-test-types';

interface TestResultsViewProps {
  results: TestResult[];
}

const TestResultsView = ({ results }: TestResultsViewProps) => {
  if (results.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-2 border-slate-600">
        <CardContent className="p-8 text-center">
          <Icon name="FileQuestion" size={48} className="text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400">Результаты тестов пока отсутствуют</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((result, idx) => (
        <Card key={idx} className="bg-slate-800/50 border-2 border-purple-500/30">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{result.userName}</h3>
                <p className="text-sm text-slate-400">
                  {new Date(result.completedAt).toLocaleString('ru-RU')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">{result.contentTitle}</p>
              </div>
            </div>

            <div className="space-y-4">
              {result.answers.map((answer, answerIdx) => (
                <div key={answerIdx} className="bg-slate-700/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <span className="text-amber-400 font-bold text-sm">{answerIdx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold mb-2">{answer.question}</p>
                      
                      {answer.type === 'single' && (
                        <div className="bg-slate-800/50 rounded p-3">
                          <p className="text-sm text-slate-400 mb-1">Выбран вариант:</p>
                          <p className="text-amber-300">
                            {answer.options?.[answer.answer as number]}
                          </p>
                        </div>
                      )}

                      {answer.type === 'multiple' && (
                        <div className="bg-slate-800/50 rounded p-3">
                          <p className="text-sm text-slate-400 mb-2">Выбраны варианты:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {(answer.answer as number[]).map((optIdx) => (
                              <li key={optIdx} className="text-amber-300">
                                {answer.options?.[optIdx]}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {(answer.type === 'text' || answer.type === 'essay') && (
                        <div className="bg-slate-800/50 rounded p-3">
                          <p className="text-slate-200 whitespace-pre-wrap">{answer.answer as string}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestResultsView;
