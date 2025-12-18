import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContentPage } from '@/lib/arrurru-content';
import FileUploader from '@/components/FileUploader';

interface ContentTabProps {
  content: ContentPage[];
  selectedContent: ContentPage | null;
  editMode: boolean;
  formData: {
    section: ContentPage['section'];
    title: string;
    slug: string;
    content: string;
    orderIndex: number;
  };
  uploadedFiles: { url: string; name: string; type: 'document' | 'video' | 'image' }[];
  setFormData: (data: any) => void;
  setUploadedFiles: (files: { url: string; name: string; type: 'document' | 'video' | 'image' }[]) => void;
  handleSelectContent: (page: ContentPage) => void;
  handleNewContent: () => void;
  handleSaveContent: () => void;
  handleDeleteContent: (id: string) => void;
}

const ContentTab = ({
  content,
  selectedContent,
  editMode,
  formData,
  uploadedFiles,
  setFormData,
  setUploadedFiles,
  handleSelectContent,
  handleNewContent,
  handleSaveContent,
  handleDeleteContent
}: ContentTabProps) => {
  return (
    <div className="grid lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-orange-500/30 sticky top-24">
          <CardContent className="p-4">
            <Button
              onClick={handleNewContent}
              className="w-full bg-orange-500 hover:bg-orange-600 mb-4"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Новая страница
            </Button>

            <h3 className="text-lg font-bold text-white mb-4">Страницы</h3>
            <div className="space-y-2">
              {content.map((page) => (
                <button
                  key={page.id}
                  onClick={() => handleSelectContent(page)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedContent?.id === page.id
                      ? 'bg-orange-500/30 text-white'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">
                      {page.section === 'codice' ? '📜 Codice' :
                       page.section === 'training-hall' ? '🎓 Обучение зала' :
                       page.section === 'trainings' ? '💼 Тренинги' :
                       '📊 Стандарты'}
                    </span>
                    <span className="text-xs text-slate-500">#{page.orderIndex}</span>
                  </div>
                  <span className="text-sm">{page.title}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </aside>

      <main className="lg:col-span-3">
        {editMode ? (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-orange-500/30">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                {selectedContent ? 'Редактирование' : 'Новая страница'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Раздел
                  </label>
                  <Select
                    value={formData.section}
                    onValueChange={(value) =>
                      setFormData({ ...formData, section: value as ContentPage['section'] })
                    }
                  >
                    <SelectTrigger className="bg-slate-700 text-white border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 text-white border-slate-600">
                      <SelectItem value="codice">📜 El Códice de ARRURRU</SelectItem>
                      <SelectItem value="training-hall">🎓 Обучение зала</SelectItem>
                      <SelectItem value="trainings">💼 Программы тренингов</SelectItem>
                      <SelectItem value="standards">📊 Стандарты работы</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Название
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Модуль 1: Введение"
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    URL (slug)
                  </label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="module-1-intro"
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Порядковый номер
                  </label>
                  <Input
                    type="number"
                    value={formData.orderIndex}
                    onChange={(e) =>
                      setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 1 })
                    }
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Содержимое (Markdown)
                  </label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="# Заголовок&#10;&#10;Текст модуля..."
                    rows={15}
                    className="bg-slate-700 text-white border-slate-600 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Файлы и материалы
                  </label>
                  <FileUploader
                    onUploadComplete={(url, name, type) => {
                      setUploadedFiles([...uploadedFiles, { url, name, type }]);
                    }}
                  />
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              name={
                                file.type === 'video' ? 'Video' :
                                file.type === 'image' ? 'Image' :
                                'FileText'
                              }
                              size={20}
                              className="text-orange-400"
                            />
                            <span className="text-sm text-white">{file.name}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
                            }}
                          >
                            <Icon name="Trash2" size={16} className="text-red-400" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSaveContent} className="bg-green-600 hover:bg-green-700">
                    <Icon name="Save" size={20} className="mr-2" />
                    Сохранить
                  </Button>
                  {selectedContent && (
                    <Button
                      onClick={() => handleDeleteContent(selectedContent.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Icon name="Trash2" size={20} className="mr-2" />
                      Удалить
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-orange-500/30">
            <CardContent className="p-12 text-center">
              <Icon name="FileText" size={64} className="text-orange-400 mx-auto mb-4" />
              <p className="text-slate-300">Выберите страницу для редактирования</p>
              <p className="text-sm text-slate-500 mt-2">или создайте новую</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ContentTab;
