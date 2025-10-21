import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VisualTimerDiskProps {
  totalSeconds: number;
  remainingSeconds: number;
  color: string;
  size?: number;
  isRunning?: boolean;
  reduceMotion?: boolean;
  onDragChange?: (seconds: number) => void;
  interactive?: boolean;
}

export function VisualTimerDisk({
  totalSeconds,
  remainingSeconds,
  color,
  size = 280,
  isRunning = false,
  reduceMotion = false,
  onDragChange,
  interactive = false,
}: VisualTimerDiskProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [centiseconds, setCentiseconds] = useState(0);
  const diskRef = useRef<SVGSVGElement>(null);

  const percentage = totalSeconds > 0 ? (remainingSeconds / totalSeconds) : 0;
  const radius = (size / 2) - 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage * circumference);

  // Animate centiseconds for running timer
  useEffect(() => {
    if (!isRunning || reduceMotion) {
      setCentiseconds(0);
      return;
    }

    const interval = setInterval(() => {
      setCentiseconds(prev => (prev + 1) % 100);
    }, 10); // Update every 10ms for smooth animation

    return () => clearInterval(interval);
  }, [isRunning, reduceMotion]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return {
        main: `${hours}:${mins.toString().padStart(2, '0')}`,
        sub: secs.toString().padStart(2, '0'),
      };
    }
    
    return {
      main: `${mins}:${secs.toString().padStart(2, '0')}`,
      sub: centiseconds.toString().padStart(2, '0'),
    };
  };

  const timeDisplay = formatTime(remainingSeconds);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    updateTimeFromPosition(e);
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !interactive) return;
    updateTimeFromPosition(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateTimeFromPosition = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!diskRef.current || !onDragChange) return;

    const rect = diskRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let clientX: number;
    let clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0]?.clientX || 0;
      clientY = e.touches[0]?.clientY || 0;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const angle = Math.atan2(clientY - centerY, clientX - centerX);
    let degrees = (angle * 180 / Math.PI + 90 + 360) % 360;
    
    const newSeconds = Math.round((degrees / 360) * 3600);
    onDragChange(Math.max(1, Math.min(3600, newSeconds)));
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Outer glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl opacity-30"
          style={{ backgroundColor: color }}
          animate={isRunning ? {
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <svg
          ref={diskRef}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={interactive ? 'cursor-pointer relative' : 'relative'}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* Tick marks for racing feel */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const innerRadius = radius - 15;
            const outerRadius = radius - 5;
            
            const x1 = size / 2 + innerRadius * Math.cos(angle);
            const y1 = size / 2 + innerRadius * Math.sin(angle);
            const x2 = size / 2 + outerRadius * Math.cos(angle);
            const y2 = size / 2 + outerRadius * Math.sin(angle);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth="2"
                opacity="0.3"
              />
            );
          })}

          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#1a1a1a"
            strokeWidth="18"
          />

          {/* Animated progress circle with gradient */}
          <defs>
            <linearGradient id={`diskGradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={color} stopOpacity="0.6" />
            </linearGradient>
          </defs>

          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={`url(#diskGradient-${color})`}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            animate={!reduceMotion && isRunning ? {
              strokeDashoffset,
            } : undefined}
            transition={!reduceMotion ? {
              duration: 1,
              ease: 'linear',
            } : undefined}
            style={{
              strokeDashoffset: reduceMotion ? strokeDashoffset : undefined,
              filter: `drop-shadow(0 0 8px ${color}80)`,
            }}
          />

          {/* Center time display - Chronograph style */}
          <g>
            {/* Main time (hours:minutes or minutes:seconds) */}
            <text
              x={size / 2}
              y={size / 2 - size * 0.04}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white select-none"
              style={{ 
                fontSize: size * 0.15,
                fontWeight: 'bold',
                letterSpacing: '0.05em',
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))',
              }}
            >
              {timeDisplay.main}
            </text>

            {/* Sub time (seconds or centiseconds) - Racing chronograph style */}
            <AnimatePresence mode="wait">
              <motion.text
                key={timeDisplay.sub}
                x={size / 2}
                y={size / 2 + size * 0.08}
                textAnchor="middle"
                dominantBaseline="middle"
                className="select-none"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.1 }}
                style={{ 
                  fontSize: size * 0.08,
                  fontWeight: 'normal',
                  letterSpacing: '0.1em',
                  fill: color,
                  filter: `drop-shadow(0 0 4px ${color}80)`,
                }}
              >
                {timeDisplay.sub}
              </motion.text>
            </AnimatePresence>

            {/* Label for sub time */}
            <text
              x={size / 2}
              y={size / 2 + size * 0.15}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-400 select-none"
              style={{ 
                fontSize: size * 0.04,
                fontWeight: 'normal',
                letterSpacing: '0.2em',
                opacity: 0.6,
              }}
            >
              {remainingSeconds >= 3600 ? 'SEC' : 'MSEC'}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
