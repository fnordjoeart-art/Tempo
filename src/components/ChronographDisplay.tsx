import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface ChronographDisplayProps {
  remainingSeconds: number;
  isRunning: boolean;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ChronographDisplay({
  remainingSeconds,
  isRunning,
  color,
  size = 'md',
}: ChronographDisplayProps) {
  const [centiseconds, setCentiseconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      setCentiseconds(0);
      return;
    }

    const interval = setInterval(() => {
      setCentiseconds(prev => (prev + 1) % 100);
    }, 10);

    return () => clearInterval(interval);
  }, [isRunning]);

  const hours = Math.floor(remainingSeconds / 3600);
  const mins = Math.floor((remainingSeconds % 3600) / 60);
  const secs = remainingSeconds % 60;

  const sizes = {
    sm: { main: 'text-2xl', sub: 'text-base', label: 'text-[10px]' },
    md: { main: 'text-4xl', sub: 'text-xl', label: 'text-xs' },
    lg: { main: 'text-6xl', sub: 'text-3xl', label: 'text-sm' },
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Main time display */}
      <div className="flex items-baseline gap-1 tabular-nums">
        {hours > 0 && (
          <>
            <motion.span
              key={hours}
              className={`${sizes[size].main} font-bold tracking-wider text-white`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))' }}
            >
              {hours.toString().padStart(2, '0')}
            </motion.span>
            <span className={`${sizes[size].main} text-gray-500`}>:</span>
          </>
        )}
        
        <motion.span
          key={mins}
          className={`${sizes[size].main} font-bold tracking-wider text-white`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))' }}
        >
          {mins.toString().padStart(2, '0')}
        </motion.span>
        
        <span className={`${sizes[size].main} text-gray-500`}>:</span>
        
        <motion.span
          key={secs}
          className={`${sizes[size].main} font-bold tracking-wider text-white`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))' }}
        >
          {secs.toString().padStart(2, '0')}
        </motion.span>
      </div>

      {/* Centiseconds display - Racing style */}
      <div className="flex items-center gap-2">
        <div className="h-px w-8 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        <AnimatePresence mode="wait">
          <motion.div
            key={centiseconds}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.05 }}
            className={`${sizes[size].sub} font-mono tracking-widest`}
            style={{ 
              color: color,
              filter: `drop-shadow(0 0 6px ${color}80)`,
            }}
          >
            .{centiseconds.toString().padStart(2, '0')}
          </motion.div>
        </AnimatePresence>
        <div className="h-px w-8 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
      </div>

      {/* Label */}
      <p className={`${sizes[size].label} text-gray-500 tracking-widest uppercase mt-1`}>
        Chronograph
      </p>
    </div>
  );
}
