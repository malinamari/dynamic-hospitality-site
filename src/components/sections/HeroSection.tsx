import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GiftForm from '@/components/GiftForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-primary/20 to-slate-800">
      <div className="absolute inset-0">
        <img 
          src="https://cdn.poehali.dev/files/5ae80724-43ec-4258-b040-d890a18250cc.png" 
          alt="Марина MARICO PRO" 
          className="w-full h-full object-cover object-top opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-primary/30 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl space-y-8 animate-fade-in pt-8">
          <div className="inline-block px-4 py-2 bg-amber-500 backdrop-blur-sm rounded-full shadow-lg border-2 border-white">
            <p className="text-white font-bold text-sm tracking-wider">💎 ЭКСПЕРТ ПРЕМИУМ HoReCa</p>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-xl">
              Прокачаю твой персонал
            </h1>
            
            <p className="text-2xl sm:text-3xl text-amber-400 font-bold drop-shadow-lg">
              +5 млн к выручке. Без рекламы
            </p>
            
            <p className="text-lg sm:text-xl text-white/90 drop-shadow-lg">
              <span className="text-amber-400 font-bold">Для кого:</span> Собственники и управленцы ресторанов, баров, клубов
            </p>
            
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-6 py-3">
              <p className="text-base sm:text-lg text-white font-semibold">
                💎 Формат: Интенсив «7 дней работы» — полная трансформация команды
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-base px-8 py-6 font-semibold shadow-xl hover:scale-105 transition-transform bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white" 
              onClick={() => setIsGiftModalOpen(true)}
            >
              🎁 Забрать подарок
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto text-base px-8 py-6 font-semibold shadow-xl hover:scale-105 transition-transform bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white border-2 border-white/50" 
              onClick={() => navigate('/arrurru/login')}
            >
              📚 Обучение и проекты
            </Button>
          </div>
        </div>
      </div>
      
      {/* Модальное окно с формой подарка */}
      <Dialog open={isGiftModalOpen} onOpenChange={setIsGiftModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="sr-only">Забрать подарок</DialogTitle>
          </DialogHeader>
          <GiftForm />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;