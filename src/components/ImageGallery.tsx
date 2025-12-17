import { useState } from 'react';
import { ContentFile } from '@/lib/arrurru-content';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ImageGalleryProps {
  files: ContentFile[];
}

const ImageGallery = ({ files }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = files.filter(f => f.type === 'image');
  
  if (images.length === 0) return null;

  return (
    <>
      <div className="mt-8 pt-8 border-t border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Icon name="Image" size={20} className="text-purple-400" />
          Фотогалерея
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((file, index) => (
            <div
              key={index}
              className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-amber-500 transition-all"
              onClick={() => setSelectedImage(file.url)}
            >
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium text-sm">{file.name}</p>
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                  <Icon name="Maximize2" size={16} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Увеличенное изображение"
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <Icon name="X" size={24} className="text-white" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
