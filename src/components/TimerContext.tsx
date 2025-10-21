import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Timer {
  id: string;
  name: string;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  isPaused: boolean;
  color: string;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  keepScreenActive: boolean;
  warningAt: number;
}

export interface Preset {
  id: string;
  name: string;
  seconds: number;
  color: string;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  group?: string;
}

export interface RoutineStep {
  id: string;
  name: string;
  seconds: number;
  color: string;
}

export interface Routine {
  id: string;
  name: string;
  steps: RoutineStep[];
  autoAdvance: boolean;
  pauseBetweenSteps: boolean;
  group?: string;
}

export interface AppSettings {
  defaultColor: string;
  defaultSound: boolean;
  defaultVibration: boolean;
  reduceMotion: boolean;
  keepScreenActive: boolean;
  theme: 'light' | 'dark' | 'auto';
}

interface TimerContextType {
  timers: Timer[];
  presets: Preset[];
  routines: Routine[];
  settings: AppSettings;
  addTimer: (timer: Omit<Timer, 'id'>) => void;
  removeTimer: (id: string) => void;
  updateTimer: (id: string, updates: Partial<Timer>) => void;
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  addPreset: (preset: Omit<Preset, 'id'>) => void;
  removePreset: (id: string) => void;
  updatePreset: (id: string, updates: Partial<Preset>) => void;
  addRoutine: (routine: Omit<Routine, 'id'>) => void;
  removeRoutine: (id: string) => void;
  updateRoutine: (id: string, updates: Partial<Routine>) => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    defaultColor: '#F97316', // Orange-500
    defaultSound: true,
    defaultVibration: true,
    reduceMotion: false,
    keepScreenActive: false,
    theme: 'auto',
  });

  // Load from localStorage
  useEffect(() => {
    const savedPresets = localStorage.getItem('tempo-presets');
    const savedRoutines = localStorage.getItem('tempo-routines');
    const savedSettings = localStorage.getItem('tempo-settings');

    if (savedPresets) {
      try {
        setPresets(JSON.parse(savedPresets));
      } catch (e) {
        console.error('Failed to load presets', e);
      }
    } else {
      // Default presets with vibrant colors
      setPresets([
        { id: '1', name: '1 minuto', seconds: 60, color: '#F97316', soundEnabled: true, vibrationEnabled: true },
        { id: '2', name: '5 minuti', seconds: 300, color: '#EF4444', soundEnabled: true, vibrationEnabled: true },
        { id: '3', name: '10 minuti', seconds: 600, color: '#3B82F6', soundEnabled: true, vibrationEnabled: true },
      ]);
    }

    if (savedRoutines) {
      try {
        setRoutines(JSON.parse(savedRoutines));
      } catch (e) {
        console.error('Failed to load routines', e);
      }
    }

    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to load settings', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tempo-presets', JSON.stringify(presets));
  }, [presets]);

  useEffect(() => {
    localStorage.setItem('tempo-routines', JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem('tempo-settings', JSON.stringify(settings));
  }, [settings]);

  // Timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => prev.map(timer => {
        if (timer.isRunning && !timer.isPaused && timer.remainingSeconds > 0) {
          const newRemaining = timer.remainingSeconds - 1;
          
          // Warning sound at 10 seconds
          if (newRemaining === 10 && timer.soundEnabled) {
            playWarningSound();
          }

          // Completion sound and vibration
          if (newRemaining === 0) {
            if (timer.soundEnabled) {
              playCompletionSound();
            }
            if (timer.vibrationEnabled && 'vibrate' in navigator) {
              navigator.vibrate([200, 100, 200]);
            }
            return { ...timer, remainingSeconds: 0, isRunning: false };
          }

          return { ...timer, remainingSeconds: newRemaining };
        }
        return timer;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const playWarningSound = () => {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 440;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const playCompletionSound = () => {
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
  };

  const addTimer = (timer: Omit<Timer, 'id'>) => {
    const newTimer = { ...timer, id: Date.now().toString() };
    setTimers(prev => [...prev, newTimer]);
  };

  const removeTimer = (id: string) => {
    setTimers(prev => prev.filter(t => t.id !== id));
  };

  const updateTimer = (id: string, updates: Partial<Timer>) => {
    setTimers(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const startTimer = (id: string) => {
    setTimers(prev => prev.map(t => 
      t.id === id ? { ...t, isRunning: true, isPaused: false } : t
    ));
  };

  const pauseTimer = (id: string) => {
    setTimers(prev => prev.map(t => 
      t.id === id ? { ...t, isPaused: !t.isPaused } : t
    ));
  };

  const resetTimer = (id: string) => {
    setTimers(prev => prev.map(t => 
      t.id === id ? { ...t, remainingSeconds: t.totalSeconds, isRunning: false, isPaused: false } : t
    ));
  };

  const addPreset = (preset: Omit<Preset, 'id'>) => {
    const newPreset = { ...preset, id: Date.now().toString() };
    setPresets(prev => [...prev, newPreset]);
  };

  const removePreset = (id: string) => {
    setPresets(prev => prev.filter(p => p.id !== id));
  };

  const updatePreset = (id: string, updates: Partial<Preset>) => {
    setPresets(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addRoutine = (routine: Omit<Routine, 'id'>) => {
    const newRoutine = { ...routine, id: Date.now().toString() };
    setRoutines(prev => [...prev, newRoutine]);
  };

  const removeRoutine = (id: string) => {
    setRoutines(prev => prev.filter(r => r.id !== id));
  };

  const updateRoutine = (id: string, updates: Partial<Routine>) => {
    setRoutines(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <TimerContext.Provider
      value={{
        timers,
        presets,
        routines,
        settings,
        addTimer,
        removeTimer,
        updateTimer,
        startTimer,
        pauseTimer,
        resetTimer,
        addPreset,
        removePreset,
        updatePreset,
        addRoutine,
        removeRoutine,
        updateRoutine,
        updateSettings,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within TimerProvider');
  }
  return context;
}
