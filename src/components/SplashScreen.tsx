import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from './i18n';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(100);
  const { t } = useTranslations();

  useEffect(() => {
    // Countdown animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 0;
        }
        return prev - 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Competition chronograph */}
        <div className="relative">
          {/* Single outer glow ring */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-80 h-80 rounded-full border-2 border-orange-500/40" />
          </motion.div>

          {/* Main chronograph circle */}
          <svg width="320" height="320" viewBox="0 0 320 320" className="relative">
            {/* Tick marks - like a racing chronograph */}
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i * 6 - 90) * (Math.PI / 180);
              const isMainTick = i % 5 === 0;
              const innerRadius = isMainTick ? 130 : 135;
              const outerRadius = 145;
              
              const x1 = 160 + innerRadius * Math.cos(angle);
              const y1 = 160 + innerRadius * Math.sin(angle);
              const x2 = 160 + outerRadius * Math.cos(angle);
              const y2 = 160 + outerRadius * Math.sin(angle);

              return (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isMainTick ? '#F97316' : '#EF4444'}
                  strokeWidth={isMainTick ? 3 : 1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1] }}
                  transition={{ delay: i * 0.01, duration: 0.3 }}
                />
              );
            })}

            {/* Background circle */}
            <circle
              cx="160"
              cy="160"
              r="140"
              fill="transparent"
              stroke="#1F1F1F"
              strokeWidth="8"
            />

            {/* Countdown progress ring - rotating backwards */}
            <motion.circle
              cx="160"
              cy="160"
              r="140"
              fill="transparent"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 160 160)"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))',
              }}
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>

            {/* Center text */}
            <text
              x="160"
              y="145"
              textAnchor="middle"
              className="fill-white"
              style={{ fontSize: '56px', fontWeight: 'bold' }}
            >
              TEMPO
            </text>

            <text
              x="160"
              y="180"
              textAnchor="middle"
              className="fill-orange-500"
              style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '8px' }}
            >
              +
            </text>
          </svg>

          {/* Rotating competition dial indicator */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-28 bg-gradient-to-b from-orange-500 to-red-500 rounded-full origin-bottom"
            style={{
              transformOrigin: 'center bottom',
              bottom: '50%',
              marginLeft: '-1px',
              filter: 'drop-shadow(0 0 6px rgba(249, 115, 22, 0.8))',
            }}
            animate={{
              rotate: [0, -360],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-orange-500 rounded-full -mt-2 -ml-2 shadow-lg shadow-orange-500/50" />
        </div>

        {/* Loading text */}
        <motion.p
          className="absolute bottom-20 text-gray-400 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, times: [0, 0.3, 0.7, 1] }}
        >
          {t.loading}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
