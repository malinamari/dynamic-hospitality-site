interface ProgressChartProps {
  completed: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

const ProgressChart = ({ 
  completed, 
  total, 
  size = 120, 
  strokeWidth = 10,
  color = '#f59e0b' 
}: ProgressChartProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1e293b"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-black text-white">
          {Math.round(percentage)}%
        </div>
        <div className="text-xs text-slate-400">
          {completed}/{total}
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
