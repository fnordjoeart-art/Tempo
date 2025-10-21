import { motion } from 'motion/react';
import { useTimer } from './TimerContext';
import { Button } from './ui/button';
import { Play, Pause, Trash2, Maximize2 } from 'lucide-react';
import { ChronographDisplay } from './ChronographDisplay';

interface TimerCardProps {
  timerId: string;
  onExpand?: () => void;
}

export function TimerCard({ timerId, onExpand }: TimerCardProps) {
  const { timers, startTimer, pauseTimer, removeTimer } = useTimer();
  const timer = timers.find(t => t.id === timerId);

  if (!timer) return null;

  const percentage = timer.totalSeconds > 0 ? (timer.remainingSeconds / timer.totalSeconds) : 0;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage * circumference);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (timer.isRunning) {
      pauseTimer(timer.id);
    } else {
      startTimer(timer.id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative bg-gradient-to-br from-gray-900 to-black border-2 rounded-2xl p-4 hover:border-opacity-100 transition-all"
      style={{ 
        borderColor: timer.isRunning && !timer.isPaused ? timer.color : '#333',
        boxShadow: timer.isRunning && !timer.isPaused ? `0 0 20px ${timer.color}40` : 'none',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-white truncate flex-1">{timer.name}</h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onExpand}
          >
            <Maximize2 className="w-3 h-3 text-gray-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => removeTimer(timer.id)}
          >
            <Trash2 className="w-3 h-3 text-gray-400" />
          </Button>
        </div>
      </div>

      {/* Mini Disk */}
      <div className="flex flex-col items-center gap-3 mb-3">
        <div className="relative">
          {/* Glow effect */}
          {timer.isRunning && !timer.isPaused && (
            <motion.div
              className="absolute inset-0 rounded-full blur-xl opacity-40"
              style={{ backgroundColor: timer.color }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.5, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          )}

          <svg width="120" height="120" viewBox="0 0 120 120" className="relative">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke="#1a1a1a"
              strokeWidth="8"
            />

            {/* Progress circle */}
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke={timer.color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 60 60)"
              animate={timer.isRunning && !timer.isPaused ? {
                strokeDashoffset,
              } : undefined}
              transition={{
                duration: 1,
                ease: 'linear',
              }}
              style={{
                filter: `drop-shadow(0 0 6px ${timer.color}80)`,
              }}
            />

            {/* Center text */}
            <text
              x="60"
              y="60"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white select-none"
              style={{ 
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {formatTime(timer.remainingSeconds)}
            </text>
          </svg>
        </div>

        {/* Centiseconds for running timers */}
        {timer.isRunning && !timer.isPaused && (
          <div className="h-8">
            <ChronographDisplay
              isRunning={true}
              color={timer.color}
              size="sm"
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handlePlayPause}
          style={{
            borderColor: timer.isRunning && !timer.isPaused ? timer.color : '#444',
            backgroundColor: timer.isRunning && !timer.isPaused ? `${timer.color}20` : 'transparent',
          }}
        >
          {timer.isRunning && !timer.isPaused ? (
            <>
              <Pause className="w-3 h-3 mr-1" style={{ color: timer.color }} />
              <span style={{ color: timer.color }}>Pausa</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 mr-1" style={{ color: timer.color }} />
              <span style={{ color: timer.color }}>Avvia</span>
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
