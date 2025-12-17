import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const FooterSection = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: 'Как быстро я увижу результат?',
      answer: 'Первые изменения заметны через 2-4 недели после начала работы. Измеримый рост среднего чека — через 30-45 дней. Полная трансформация — за 90 дней с гарантией результата.'
    },
    {
      question: 'Работаете ли вы с небольшими заведениями?',
      answer: 'Да! Моя методика работает для любого формата — от камерных баров до крупных ресторанов. Главное — желание расти и готовность внедрять изменения.'
    },
    {
      question: 'Что входит в стоимость услуг?',
      answer: 'Зависит от формата: диагностика, тренинги, разработка скриптов продаж, индивидуальная работа с персоналом, поддержка после завершения. Точный состав обсуждаем на консультации.'
    },
    {
      question: 'Гарантируете ли вы результат?',
      answer: 'Да. Если через 90 дней не увидите рост выручки минимум на 15% — верну 100% стоимости услуг. Это единственная система в России с такой гарантией.'
    },
    {
      question: 'Работаете только в Москве?',
      answer: 'Нет, работаю по всей России. Могу прилететь к вам или провести работу онлайн с полным погружением в процессы заведения.'
    }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* FAQ Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-black text-center mb-8 text-amber-400">Частые вопросы</h3>
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <div 
                  key={index} 
                  className="border-2 border-slate-700 rounded-xl bg-slate-800/50 overflow-hidden hover:border-amber-500 transition-all"
                >
                  <button
                    className="w-full p-5 flex items-center justify-between text-left"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="font-bold text-lg text-white">{item.question}</span>
                    <Icon 
                      name="ChevronDown" 
                      className={`text-amber-400 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
                      size={24} 
                    />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-5 pt-0 text-slate-300 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-black text-amber-400 mb-3">MARICO PRO</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Эксперт №1 по продажам и сервису в HoReCa. 15 лет практики в премиум-сегменте.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-bold text-amber-400 mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/services" className="text-slate-400 hover:text-white transition-colors">Услуги</Link></li>
                <li><Link to="/cases" className="text-slate-400 hover:text-white transition-colors">Кейсы</Link></li>
                <li><Link to="/blog" className="text-slate-400 hover:text-white transition-colors">Блог</Link></li>
                <li><Link to="/quiz" className="text-slate-400 hover:text-white transition-colors">Консультация</Link></li>
                <li><Link to="/arrurru/login" className="text-amber-400 hover:text-white transition-colors font-bold">🔐 Закрытая зона</Link></li>
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="font-bold text-amber-400 mb-4">Как меня найти</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://t.me/malinochka_marina" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <Icon name="MessageCircle" size={18} className="text-blue-400" />
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/79182858216" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <Icon name="Phone" size={18} className="text-green-400" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/malinochka__marina?igsh=MXNzdzR3Z3MxM25kOQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <Icon name="Camera" size={18} className="text-pink-400" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="mailto:malinochkamarina@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <Icon name="Mail" size={18} className="text-amber-400" />
                    Email
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-amber-400 mb-4">Документы</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Политика конфиденциальности</Link></li>
                <li><Link to="/terms" className="text-slate-400 hover:text-white transition-colors">Пользовательское соглашение</Link></li>
                <li><Link to="/offer" className="text-slate-400 hover:text-white transition-colors">Публичная оферта</Link></li>
              </ul>
              <div className="mt-6 p-4 bg-slate-800 rounded-lg">
                <p className="text-xs text-slate-400">
                  📍 Москва и вся Россия<br/>
                  ⏰ Понедельник—Пятница 10:00-19:00 МСК
                </p>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-8">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800" asChild>
              <a href="https://t.me/malinochka_marina" target="_blank" rel="noopener noreferrer">
                <Icon name="MessageCircle" size={24} />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800" asChild>
              <a href="https://wa.me/79182858216" target="_blank" rel="noopener noreferrer">
                <Icon name="Phone" size={24} />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800" asChild>
              <a href="https://www.instagram.com/malinochka__marina?igsh=MXNzdzR3Z3MxM25kOQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                <Icon name="Camera" size={24} />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800" asChild>
              <a href="https://vk.com/marico_su?from=groups" target="_blank" rel="noopener noreferrer">
                <Icon name="Users" size={24} />
              </a>
            </Button>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">
              © 2025 MARICO PRO. Все права защищены.
            </p>
            <p className="text-slate-600 text-xs mt-2">
              ИП Малиночка Марина Дмитриевна • ИНН: 231234567890
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;