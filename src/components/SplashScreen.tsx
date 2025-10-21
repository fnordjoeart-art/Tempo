import { useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    // Auto-close after 2 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      {/* Logo TEMPO+ semplice con fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.6,
          ease: "easeOut"
        }}
        className="flex flex-col items-center"
      >
        {/* Logo SVG */}
        <svg 
          viewBox="0 0 400 150" 
          className="w-full h-auto px-8"
          style={{ maxWidth: '400px' }}
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
          </defs>

          {/* TEMPO text */}
          <text
            x="200"
            y="90"
            textAnchor="middle"
            className="fill-white"
            style={{ 
              fontSize: '72px', 
              fontWeight: 'bold',
              letterSpacing: '4px',
            }}
          >
            TEMPO
          </text>

          {/* + symbol with gradient */}
          <text
            x="360"
            y="90"
            textAnchor="middle"
            fill="url(#logoGradient)"
            style={{ 
              fontSize: '56px', 
              fontWeight: 'bold',
            }}
          >
            +
          </text>
        </svg>
      </motion.div>
    </motion.div>
  );
}
