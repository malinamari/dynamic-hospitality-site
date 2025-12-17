import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface AnimatedProgressCardProps {
  title: string;
  value: number;
  maxValue: number;
  icon: string;
  color: string;
  delay?: number;
}

const AnimatedProgressCard = ({ 
  title, 
  value, 
  maxValue, 
  icon, 
  color,
  delay = 0 
}: AnimatedProgressCardProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.round((value / maxValue) * 100) || 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedValue(prev => {
          if (prev >= value) {
            clearInterval(interval);
            return value;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return (
    <Card className={`bg-gradient-to-br ${color} backdrop-blur-sm border-2 border-white/10 hover:border-white/30 transition-all hover:scale-105 animate-fade-in`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Icon name={icon as any} size={32} className="text-white" />
          <div className="text-right">
            <div className="text-3xl font-black text-white">
              {animatedValue}
              <span className="text-lg text-white/70">/{maxValue}</span>
            </div>
            <div className="text-sm text-white/70">{percentage}%</div>
          </div>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimatedProgressCard;
