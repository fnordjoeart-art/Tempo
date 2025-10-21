import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface ChronographDisplayProps {
  isRunning: boolean;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ChronographDisplay({
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
    }, 10); // Updates every 10ms = 100 times per second

    return () => clearInterval(interval);
  }, [isRunning]);

  const sizes = {
    sm: { sub: 'text-2xl', label: 'text-[9px]', line: 'w-8' },
    md: { sub: 'text-5xl', label: 'text-xs', line: 'w-12' },
    lg: { sub: 'text-7xl', label: 'text-sm', line: 'w-16' },
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Centiseconds display - Racing chronograph style */}
      <div className="flex items-center gap-2">
        <div className={`h-px ${sizes[size].line} bg-gradient-to-r from-transparent via-gray-700 to-transparent`} />
        <AnimatePresence mode="popLayout">
          <motion.div
            key={centiseconds}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.08 }}
            className={`${sizes[size].sub} font-mono tracking-[0.15em] tabular-nums`}
            style={{ 
              color: color,
              filter: `drop-shadow(0 0 10px ${color}90)`,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            .{centiseconds.toString().padStart(2, '0')}
          </motion.div>
        </AnimatePresence>
        <div className={`h-px ${sizes[size].line} bg-gradient-to-r from-transparent via-gray-700 to-transparent`} />
      </div>

      {/* Label */}
      <p className={`${sizes[size].label} text-gray-600 tracking-[0.3em] uppercase`}>
        CENTISECONDS
      </p>
    </div>
  );
}
