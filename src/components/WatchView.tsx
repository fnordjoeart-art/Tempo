import { useState, useEffect } from 'react';
import { useTimer } from './TimerContext';
import { Button } from './ui/button';
import { Play, Pause, RotateCcw, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export function WatchView() {
  const { timers, addTimer, startTimer, pauseTimer, resetTimer, settings, presets } = useTimer();
  const [currentSeconds, setCurrentSeconds] = useState(60);
  const mainTimer = timers[0];

  const handleQuickStart = (seconds: number) => {
    if (mainTimer) {
      resetTimer(mainTimer.id);
    }
    
    addTimer({
      name: 'Quick',
      totalSeconds: seconds,
      remainingSeconds: seconds,
      isRunning: true,
      isPaused: false,
      color: settings.defaultColor,
      soundEnabled: settings.defaultSound,
      vibrationEnabled: settings.defaultVibration,
      keepScreenActive: false,
      warningAt: 10,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const percentage = mainTimer 
    ? (mainTimer.remainingSeconds / mainTimer.totalSeconds) 
    : 1;

  return (
    <div className="h-screen flex flex-col items-center justify-center p-3 bg-black text-white">
      {mainTimer ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3 w-full"
        >
          {/* Compact circular progress */}
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#333"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke={mainTimer.color}
                strokeWidth="12"
                fill="none"
                strokeDasharray={351.86}
                strokeDashoffset={351.86 * (1 - percentage)}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl">{formatTime(mainTimer.remainingSeconds)}</span>
            </div>
          </div>

          {/* Compact controls */}
          <div className="flex gap-2 w-full justify-center">
            <Button
              size="sm"
              variant="outline"
              className="w-12 h-12 rounded-full p-0 border-gray-700"
              onClick={() => {
                if (mainTimer.isRunning) {
                  pauseTimer(mainTimer.id);
                } else {
                  startTimer(mainTimer.id);
                }
              }}
            >
              {mainTimer.isRunning && !mainTimer.isPaused ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="w-12 h-12 rounded-full p-0 border-gray-700"
              onClick={() => resetTimer(mainTimer.id)}
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="text-center mb-2">
            <h1 className="text-lg">TEMPO+</h1>
          </div>

          {/* Quick presets for Watch */}
          <div className="grid grid-cols-2 gap-2 w-full px-2">
            {presets.slice(0, 4).map(preset => (
              <Button
                key={preset.id}
                variant="outline"
                size="sm"
                className="h-16 text-xs border-gray-700"
                onClick={() => handleQuickStart(preset.seconds)}
              >
                {preset.name}
              </Button>
            ))}
          </div>

          {/* Digital Crown simulation */}
          <div className="flex gap-2 w-full px-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-gray-700"
              onClick={() => handleQuickStart(60)}
            >
              1m
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-gray-700"
              onClick={() => handleQuickStart(300)}
            >
              5m
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
