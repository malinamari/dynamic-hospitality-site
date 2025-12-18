import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getCertificateRequests } from '@/lib/arrurru-content';

const CertificatesTab = () => {
  const requests = getCertificateRequests();
  const pendingRequests = requests.filter(r => !r.approved);
  const approvedRequests = requests.filter(r => r.approved);

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-orange-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Запросы на сертификаты</h2>
            <div className="flex items-center gap-2 text-sm">
              <div className="px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/50">
                <span className="text-amber-400 font-bold">{pendingRequests.length}</span>
                <span className="text-slate-300 ml-1">ожидают</span>
              </div>
              <div className="px-3 py-1 bg-green-500/20 rounded-full border border-green-500/50">
                <span className="text-green-400 font-bold">{approvedRequests.length}</span>
                <span className="text-slate-300 ml-1">выданы</span>
              </div>
            </div>
          </div>

          {pendingRequests.length === 0 && approvedRequests.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Award" size={64} className="text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">Нет запросов на сертификаты</p>
            </div>
          ) : (
            <>
              {/* Ожидающие запросы */}
              {pendingRequests.length > 0 && (
                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                    <Icon name="Clock" size={20} />
                    Ожидают рассмотрения
                  </h3>
                  {pendingRequests.map((request) => (
                    <Card key={request.userId} className="bg-slate-700/50 border border-amber-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-500/20 rounded-lg">
                              <Icon name="User" size={24} className="text-amber-400" />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-white">{request.userName}</h4>
                              <p className="text-sm text-slate-400">{request.userEmail}</p>
                              <p className="text-xs text-slate-500 mt-1">
                                Запрос от: {new Date(request.requestedAt).toLocaleDateString('ru-RU', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => {
                                const stored = localStorage.getItem('arrurru_certificate_requests');
                                const allRequests = stored ? JSON.parse(stored) : [];
                                const updated = allRequests.map((r: any) => 
                                  r.userId === request.userId ? { ...r, approved: true } : r
                                );
                                localStorage.setItem('arrurru_certificate_requests', JSON.stringify(updated));
                                window.location.reload();
                              }}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Icon name="Check" size={20} className="mr-2" />
                              Одобрить
                            </Button>
                            <Button
                              onClick={() => {
                                if (confirm('Отклонить запрос на сертификат?')) {
                                  const stored = localStorage.getItem('arrurru_certificate_requests');
                                  const allRequests = stored ? JSON.parse(stored) : [];
                                  const filtered = allRequests.filter((r: any) => r.userId !== request.userId);
                                  localStorage.setItem('arrurru_certificate_requests', JSON.stringify(filtered));
                                  window.location.reload();
                                }
                              }}
                              variant="outline"
                              className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                            >
                              <Icon name="X" size={20} className="mr-2" />
                              Отклонить
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Одобренные запросы */}
              {approvedRequests.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-green-400 flex items-center gap-2">
                    <Icon name="CheckCircle" size={20} />
                    Сертификаты выданы
                  </h3>
                  {approvedRequests.map((request) => (
                    <Card key={request.userId} className="bg-slate-700/50 border border-green-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-green-500/20 rounded-lg">
                            <Icon name="Award" size={24} className="text-green-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">{request.userName}</h4>
                            <p className="text-sm text-slate-400">{request.userEmail}</p>
                            <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                              <Icon name="CheckCircle" size={14} />
                              Сертификат одобрен
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card className="bg-blue-500/10 backdrop-blur-sm border-2 border-blue-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-blue-400 flex-shrink-0 mt-1" />
            <div className="text-sm text-slate-300">
              <p className="font-semibold mb-2">О сертификатах:</p>
              <ul className="space-y-1">
                <li>• Сертификаты выдаются только после прохождения всех экзаменов с результатом 80% и выше</li>
                <li>• Сотрудник должен самостоятельно запросить сертификат через свой профиль</li>
                <li>• После одобрения сотрудник получит уведомление</li>
                <li>• Вы можете отклонить запрос, если требуется дополнительная проверка</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificatesTab;
