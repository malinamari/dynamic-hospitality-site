import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FileUploaderProps {
  onFileUploaded: (url: string, fileName: string, fileType: 'document' | 'video' | 'image') => void;
  acceptedTypes?: string;
  maxSizeMB?: number;
}

const FileUploader = ({ 
  onFileUploaded, 
  acceptedTypes = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov',
  maxSizeMB = 50
}: FileUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const getFileType = (fileName: string): 'document' | 'video' | 'image' => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
    if (['mp4', 'mov', 'avi', 'mkv'].includes(ext || '')) return 'video';
    return 'document';
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Файл слишком большой. Максимум ${maxSizeMB}MB`);
      return;
    }

    setError('');
    setUploading(true);
    setProgress(0);

    try {
      const reader = new FileReader();
      
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      reader.onload = async () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1];

        const response = await fetch('https://functions.poehali.dev/56b86d02-88e9-4be9-890b-1334d2a974ee', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            fileData: base64Data,
            contentType: file.type
          })
        });

        if (!response.ok) {
          throw new Error('Ошибка загрузки файла');
        }

        const data = await response.json();
        onFileUploaded(data.url, file.name, getFileType(file.name));
        setUploading(false);
        setProgress(0);
      };

      reader.onerror = () => {
        throw new Error('Ошибка чтения файла');
      };

      reader.readAsDataURL(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="file"
          accept={acceptedTypes}
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id="file-upload-input"
        />
        <label htmlFor="file-upload-input">
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            className="w-full cursor-pointer"
            onClick={() => document.getElementById('file-upload-input')?.click()}
          >
            {uploading ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Загрузка {progress}%
              </>
            ) : (
              <>
                <Icon name="Upload" size={20} className="mr-2" />
                Выбрать файл
              </>
            )}
          </Button>
        </label>
      </div>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {uploading && progress > 0 && (
        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-amber-500 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <p className="text-xs text-slate-400">
        Поддерживаемые форматы: PDF, DOC, DOCX, JPG, PNG, MP4, MOV. Максимум {maxSizeMB}MB
      </p>
    </div>
  );
};

export default FileUploader;