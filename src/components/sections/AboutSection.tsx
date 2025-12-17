import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AboutSectionProps {
  scrollToSection: (id: string) => void;
}

const AboutSection = ({ scrollToSection }: AboutSectionProps) => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto space-y-12 animate-slide-up">
          <div className="grid md:grid-cols-[300px,1fr] gap-8 items-start">
            <div className="aspect-[3/4] bg-muted rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://cdn.poehali.dev/files/ec636e5f-8860-4ed3-a14e-094d8acd3c94.png" 
                alt="Марина" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-5xl font-black text-foreground">Почему владельцы премиальных заведений выбирают меня</h2>
              
              <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl">
                <p className="text-foreground text-lg font-semibold">
                  13 лет в общепите. Мой путь до эксперта — от линейных позиций до куратора закрытого клуба в Москве, аналогов которому нет. Работала только в премиальных ресторанах и международных отелях.
                </p>
              </div>

              <div className="space-y-4 text-foreground/90 text-lg">
                <p>
                  Прошла путь от линейных позиций до управляющей. Руководила сигарными и закрытыми клубами, создавала уникальные концепции и форматы. <strong>С 2020 года стала экспертом по развитию сервиса и продаж.</strong>
                </p>

                <p className="font-semibold text-xl text-foreground">
                  На моих плечах <span className="text-primary text-2xl">50+ заведений</span>, с которыми я проработала. Имею международные сертификаты и дипломы в гостеприимстве и сфере HoReCa.
                </p>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary p-6 rounded-xl">
                <p className="text-lg text-foreground leading-relaxed">
                  <strong>После моей работы остается не просто впечатление</strong> — остается работающая система, обученная команда, выстроенные процессы и, самое главное, <strong className="text-primary text-xl">измеримый результат в деньгах.</strong>
                </p>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1" onClick={() => scrollToSection('contact')}>
                  Бесплатная экспертная консультация
                </Button>
                <Button size="lg" variant="outline" className="flex-1 border-2" onClick={() => scrollToSection('services')}>
                  Посмотреть услуги
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-card border-2 border-border p-8 rounded-2xl">
            <h3 className="text-3xl font-black text-foreground mb-6 text-center">Что отличает меня от других экспертов</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center space-y-3 p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border-2 border-primary/20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Icon name="Search" className="text-white" size={32} />
                </div>
                <p className="text-foreground font-semibold leading-relaxed">
                  Анализирую намного глубже — изучаю каждого участника, выявляю сильные и слабые стороны
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border-2 border-primary/20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <Icon name="Target" className="text-white" size={32} />
                </div>
                <p className="text-foreground font-semibold leading-relaxed">
                  Довожу поставленный результат до конца — моя задача найти корни любой проблемы и либо вырастить их, либо удалить
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border-2 border-primary/20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <Icon name="GraduationCap" className="text-white" size={32} />
                </div>
                <p className="text-foreground font-semibold leading-relaxed">
                  Обучаю только тому, что действительно нужно — если нужно научить разбираться в психологии гостей, значит этому; если меню — значит меню
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;