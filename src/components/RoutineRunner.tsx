import { useState, useEffect } from 'react';
import { Routine } from './TimerContext';
import { VisualTimerDisk } from './VisualTimerDisk';
import { ChronographDisplay } from './ChronographDisplay';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Play, Pause, RotateCcw, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTimer } from './TimerContext';
import { useDevice } from './hooks/useDevice';

interface RoutineRunnerProps {
  routine: Routine;
  onClose: () => void;
}

export function RoutineRunner({ routine, onClose }: RoutineRunnerProps) {
  const { settings } = useTimer();
  const { isDesktop, isTablet } = useDevice();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(routine.steps[0]?.seconds || 0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);

  const currentStep = routine.steps[currentStepIndex];
  const totalSteps = routine.steps.length;
  const routineProgress = ((currentStepIndex + (1 - remainingSeconds / currentStep.seconds)) / totalSteps) * 100;

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const interval = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          handleStepComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, currentStepIndex]);

  const handleStepComplete = () => {
    setIsRunning(false);

    // Play completion sound
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 523;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.15;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);

    // Vibration
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }

    if (currentStepIndex < totalSteps - 1) {
      if (routine.autoAdvance) {
        // Show countdown before next step
        setShowCountdown(true);
        setCountdownValue(3);
        
        const countdownInterval = setInterval(() => {
          setCountdownValue(prev => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              setShowCountdown(false);
              advanceToNextStep();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } else {
      // Routine complete
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const advanceToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < totalSteps) {
      setCurrentStepIndex(nextIndex);
      setRemainingSeconds(routine.steps[nextIndex].seconds);
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const handlePlayPause = () => {
    if (isRunning) {
      setIsPaused(!isPaused);
    } else {
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const handleReset = () => {
    setRemainingSeconds(currentStep.seconds);
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleResetRoutine = () => {
    setCurrentStepIndex(0);
    setRemainingSeconds(routine.steps[0].seconds);
    setIsRunning(false);
    setIsPaused(false);
  };

  const getDiskSize = () => {
    if (isDesktop) return 380;
    if (isTablet) return 320;
    return 260;
  };

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 flex flex-col">
      <div className="flex items-center justify-between mb-6 pt-4 md:pt-8">
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl lg:text-3xl">{routine.name}</h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
            Step {currentStepIndex + 1} di {totalSteps}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className="mb-6">
        <Progress value={routineProgress} className="h-2" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {showCountdown ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4">Prossimo step</p>
              <h2 className="text-2xl mb-8">{routine.steps[currentStepIndex + 1]?.name}</h2>
              <motion.div
                key={countdownValue}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-9xl"
              >
                {countdownValue}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key={`step-${currentStepIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center gap-6 md:gap-10 w-full"
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl text-center">{currentStep.name}</h2>

              <div className="flex flex-col items-center gap-4">
                <VisualTimerDisk
                  totalSeconds={currentStep.seconds}
                  remainingSeconds={remainingSeconds}
                  color={currentStep.color}
                  size={getDiskSize()}
                  isRunning={isRunning && !isPaused}
                  reduceMotion={settings.reduceMotion}
                />
                
                {/* Chronograph centiseconds display */}
                <ChronographDisplay
                  isRunning={isRunning && !isPaused}
                  color={currentStep.color}
                  size={isDesktop ? 'lg' : isTablet ? 'md' : 'sm'}
                />
              </div>

              <div className="flex gap-3 md:gap-5">
                <Button
                  size={isDesktop ? 'lg' : 'default'}
                  variant="outline"
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full"
                  onClick={handlePlayPause}
                >
                  {isRunning && !isPaused ? (
                    <Pause className="w-5 h-5 md:w-7 md:h-7" />
                  ) : (
                    <Play className="w-5 h-5 md:w-7 md:h-7" />
                  )}
                </Button>

                <Button
                  size={isDesktop ? 'lg' : 'default'}
                  variant="outline"
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-5 h-5 md:w-7 md:h-7" />
                </Button>

                {currentStepIndex < totalSteps - 1 && (
                  <Button
                    size={isDesktop ? 'lg' : 'default'}
                    variant="outline"
                    className="w-14 h-14 md:w-20 md:h-20 rounded-full"
                    onClick={advanceToNextStep}
                  >
                    <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {routine.steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => {
                setCurrentStepIndex(index);
                setRemainingSeconds(step.seconds);
                setIsRunning(false);
                setIsPaused(false);
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-lg border-2 transition-all ${
                index === currentStepIndex
                  ? 'border-black dark:border-white'
                  : 'border-gray-300 dark:border-gray-700'
              } ${index < currentStepIndex ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: step.color }}
                />
                <span className="text-sm">{step.name}</span>
              </div>
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={handleResetRoutine}
        >
          Ricomincia Routine
        </Button>
      </div>
    </div>
  );
}
