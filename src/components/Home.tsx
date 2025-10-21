import { useState, useEffect } from 'react';
import { useTimer } from './TimerContext';
import { VisualTimerDisk } from './VisualTimerDisk';
import { ChronographDisplay } from './ChronographDisplay';
import { Button } from './ui/button';
import { Play, Pause, RotateCcw, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useDevice } from './hooks/useDevice';

export function Home() {
  const { timers, addTimer, startTimer, pauseTimer, resetTimer, settings, presets } = useTimer();
  const { isPhone, isTablet, isDesktop } = useDevice();
  const [currentTimerSeconds, setCurrentTimerSeconds] = useState(300); // 5 minutes default
  const [currentColor, setCurrentColor] = useState('#F97316'); // Orange-500
  
  const mainTimer = timers[0];

  // Responsive disk size
  const getDiskSize = () => {
    if (isDesktop) return 350;
    if (isTablet) return 300;
    return 240;
  };

  const handleQuickStart = (seconds: number) => {
    if (mainTimer) {
      resetTimer(mainTimer.id);
    }
    
    addTimer({
      name: 'Quick Timer',
      totalSeconds: seconds,
      remainingSeconds: seconds,
      isRunning: false,
      isPaused: false,
      color: settings.defaultColor,
      soundEnabled: settings.defaultSound,
      vibrationEnabled: settings.defaultVibration,
      keepScreenActive: settings.keepScreenActive,
      warningAt: 10,
    });
  };

  const handleCustomStart = () => {
    if (mainTimer) {
      resetTimer(mainTimer.id);
    }
    
    addTimer({
      name: 'Custom Timer',
      totalSeconds: currentTimerSeconds,
      remainingSeconds: currentTimerSeconds,
      isRunning: false,
      isPaused: false,
      color: currentColor,
      soundEnabled: settings.defaultSound,
      vibrationEnabled: settings.defaultVibration,
      keepScreenActive: settings.keepScreenActive,
      warningAt: 10,
    });
  };

  const handlePlayPause = () => {
    if (mainTimer) {
      if (mainTimer.isRunning) {
        pauseTimer(mainTimer.id);
      } else {
        startTimer(mainTimer.id);
      }
    }
  };

  const handleReset = () => {
    if (mainTimer) {
      resetTimer(mainTimer.id);
    }
  };

  const handleAddMinute = (minutes: number) => {
    setCurrentTimerSeconds(prev => Math.min(3600, prev + (minutes * 60)));
  };

  const colors = [
    { name: 'Arancione', value: '#F97316' },
    { name: 'Rosso', value: '#EF4444' },
    { name: 'Blu', value: '#3B82F6' },
    { name: 'Viola', value: '#A855F7' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 flex flex-col relative overflow-hidden pb-28">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          animate={{
            background: [
              'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
          animate={{
            background: [
              'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="text-center mb-4 md:mb-6 pt-2 md:pt-4 relative z-10">
        <motion.h1 
          className="text-xl md:text-3xl lg:text-4xl mb-1 bg-gradient-to-r from-orange-500 via-red-500 to-blue-500 bg-clip-text text-transparent font-bold"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 200%' }}
        >
          TEMPO+
        </motion.h1>
        <p className="text-xs md:text-sm text-gray-400">Visual Timer</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start relative z-10 max-w-4xl mx-auto w-full">
        {mainTimer ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="flex flex-col items-center gap-4 md:gap-6 w-full"
          >
            <div className="flex flex-col items-center gap-4">
              <VisualTimerDisk
                totalSeconds={mainTimer.totalSeconds}
                remainingSeconds={mainTimer.remainingSeconds}
                color={mainTimer.color}
                size={getDiskSize()}
                isRunning={mainTimer.isRunning && !mainTimer.isPaused}
                reduceMotion={settings.reduceMotion}
              />
              
              {/* Additional chronograph display below disk */}
              <ChronographDisplay
                remainingSeconds={mainTimer.remainingSeconds}
                isRunning={mainTimer.isRunning && !mainTimer.isPaused}
                color={mainTimer.color}
                size={isDesktop ? 'lg' : isTablet ? 'md' : 'sm'}
              />
            </div>

            <div className="flex gap-3 md:gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size={isDesktop ? 'lg' : 'default'}
                  variant="outline"
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full border-orange-500/50 hover:border-orange-500 hover:bg-orange-500/10 transition-all"
                  onClick={handlePlayPause}
                >
                  {mainTimer.isRunning && !mainTimer.isPaused ? (
                    <Pause className="w-5 h-5 md:w-7 md:h-7 text-orange-500" />
                  ) : (
                    <Play className="w-5 h-5 md:w-7 md:h-7 text-orange-500" />
                  )}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size={isDesktop ? 'lg' : 'default'}
                  variant="outline"
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full border-red-500/50 hover:border-red-500 hover:bg-red-500/10 transition-all"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-5 h-5 md:w-7 md:h-7 text-red-500" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4 md:gap-6 w-full"
          >
            <VisualTimerDisk
              totalSeconds={currentTimerSeconds}
              remainingSeconds={currentTimerSeconds}
              color={currentColor}
              size={getDiskSize()}
              interactive={true}
              onDragChange={setCurrentTimerSeconds}
              reduceMotion={settings.reduceMotion}
            />

            <div className="flex gap-2 md:gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size={isPhone ? 'sm' : 'default'}
                  className="border-gray-700 hover:border-orange-500 hover:bg-orange-500/10"
                  onClick={() => handleAddMinute(1)}
                >
                  +1 min
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size={isPhone ? 'sm' : 'default'}
                  className="border-gray-700 hover:border-orange-500 hover:bg-orange-500/10"
                  onClick={() => handleAddMinute(5)}
                >
                  +5 min
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size={isPhone ? 'sm' : 'default'}
                  className="border-gray-700 hover:border-orange-500 hover:bg-orange-500/10"
                  onClick={() => handleAddMinute(10)}
                >
                  +10 min
                </Button>
              </motion.div>
            </div>

            <div className="flex gap-2 md:gap-3 justify-center">
              {colors.map((color, idx) => (
                <motion.button
                  key={color.value}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-4 transition-all ${
                    currentColor === color.value
                      ? 'border-white scale-110 shadow-lg'
                      : 'border-gray-700'
                  }`}
                  style={{ 
                    backgroundColor: color.value,
                    boxShadow: currentColor === color.value ? `0 0 20px ${color.value}80` : 'none'
                  }}
                  onClick={() => setCurrentColor(color.value)}
                  aria-label={color.name}
                />
              ))}
            </div>

            <motion.div 
              className="w-full"
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size={isDesktop ? 'lg' : 'default'}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-0 shadow-lg shadow-orange-500/30"
                onClick={handleCustomStart}
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Avvia Timer
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {!mainTimer && (
        <div className="mt-4 md:mt-6 relative z-10 w-full max-w-4xl mx-auto">
          <h2 className="text-center mb-3 text-xs md:text-sm text-gray-500 uppercase tracking-wider">
            Avvio rapido
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {presets.slice(0, 4).map((preset, index) => (
              <motion.div
                key={preset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="h-12 md:h-14 w-full border-gray-800 hover:border-orange-500 hover:bg-orange-500/10 transition-all text-sm md:text-base"
                  onClick={() => handleQuickStart(preset.seconds)}
                >
                  {preset.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
