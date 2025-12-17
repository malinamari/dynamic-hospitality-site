import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CertificateGeneratorProps {
  userName: string;
  completedExams: number;
  avgScore: number;
  completedAt?: string;
}

const CertificateGenerator = ({ userName, completedExams, avgScore, completedAt }: CertificateGeneratorProps) => {
  const generateCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.5, '#7c3aed');
    gradient.addColorStop(1, '#f59e0b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 800);

    // Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 10;
    ctx.strokeRect(30, 30, 1140, 740);

    // Inner border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, 1100, 700);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('СЕРТИФИКАТ', 600, 150);

    // Subtitle
    ctx.font = '40px Arial';
    ctx.fillText('об окончании обучения', 600, 220);

    // Name section
    ctx.font = 'italic 30px Arial';
    ctx.fillText('настоящим подтверждается, что', 600, 300);
    
    ctx.font = 'bold 60px Arial';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(userName.toUpperCase(), 600, 380);

    // Achievement
    ctx.fillStyle = '#ffffff';
    ctx.font = '32px Arial';
    ctx.fillText(`успешно завершил(а) программу обучения ARRURRU`, 600, 450);

    // Stats
    ctx.font = '28px Arial';
    ctx.fillText(`Пройдено экзаменов: ${completedExams}/7`, 600, 520);
    ctx.fillText(`Средний балл: ${avgScore}%`, 600, 570);

    // Date
    ctx.font = 'italic 24px Arial';
    ctx.fillStyle = '#cbd5e1';
    const date = completedAt ? new Date(completedAt).toLocaleDateString('ru-RU') : new Date().toLocaleDateString('ru-RU');
    ctx.fillText(`Выдан: ${date}`, 600, 650);

    // Signature line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(750, 710);
    ctx.lineTo(1050, 710);
    ctx.stroke();

    ctx.font = '20px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'right';
    ctx.fillText('Управляющий ARRURRU', 1050, 735);

    // Convert to image and download
    const link = document.createElement('a');
    link.download = `certificate_${userName.replace(/\s/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (completedExams < 7 || avgScore < 70) {
    return null;
  }

  return (
    <Button
      onClick={generateCertificate}
      size="sm"
      className="bg-purple-500 hover:bg-purple-600"
    >
      <Icon name="Award" size={16} className="mr-2" />
      Сертификат
    </Button>
  );
};

export default CertificateGenerator;
