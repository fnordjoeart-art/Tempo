import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTimer } from './TimerContext';
import { TimerCard } from './TimerCard';
import { Button } from './ui/button';
import { Plus, Grid3x3, List } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface MultiTimerViewProps {
  onExpandTimer?: (timerId: string) => void;
}

export function MultiTimerView({ onExpandTimer }: MultiTimerViewProps) {
  const { timers, addTimer, settings } = useTimer();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTimer, setNewTimer] = useState({
    name: '',
    minutes: 5,
    color: '#F97316',
  });

  const colors = [
    { name: 'Arancione', value: '#F97316' },
    { name: 'Rosso', value: '#EF4444' },
    { name: 'Blu', value: '#3B82F6' },
    { name: 'Verde', value: '#10B981' },
    { name: 'Viola', value: '#A855F7' },
    { name: 'Giallo', value: '#EAB308' },
  ];

  const handleAddTimer = () => {
    if (newTimer.name.trim()) {
      addTimer({
        name: newTimer.name,
        totalSeconds: newTimer.minutes * 60,
        remainingSeconds: newTimer.minutes * 60,
        isRunning: false,
        isPaused: false,
        color: newTimer.color,
        soundEnabled: settings.defaultSound,
        vibrationEnabled: settings.defaultVibration,
        keepScreenActive: settings.keepScreenActive,
        warningAt: 10,
      });

      setNewTimer({
        name: '',
        minutes: 5,
        color: '#F97316',
      });
      setShowAddDialog(false);
    }
  };

  const runningTimers = timers.filter(t => t.isRunning && !t.isPaused);
  const pausedTimers = timers.filter(t => t.isPaused || !t.isRunning);

  return (
    <div className="min-h-screen p-4 pb-28 relative">
      {/* Animated background */}
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
      </div>

      {/* Header */}
      <div className="relative z-10 mb-6 pt-12 md:pt-8 lg:pt-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl bg-gradient-to-r from-orange-500 via-red-500 to-blue-500 bg-clip-text text-transparent font-bold">
              Timer Multipli
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {timers.length} {timers.length === 1 ? 'timer attivo' : 'timer attivi'}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="border-gray-700"
            >
              {viewMode === 'grid' ? (
                <List className="w-4 h-4" />
              ) : (
                <Grid3x3 className="w-4 h-4" />
              )}
            </Button>

            <Button
              onClick={() => setShowAddDialog(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuovo Timer
            </Button>
          </div>
        </div>
      </div>

      {/* Running Timers Section */}
      {runningTimers.length > 0 && (
        <div className="relative z-10 mb-8">
          <h2 className="text-sm text-gray-400 uppercase tracking-wider mb-3">
            In esecuzione ({runningTimers.length})
          </h2>
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}>
            <AnimatePresence>
              {runningTimers.map(timer => (
                <TimerCard
                  key={timer.id}
                  timerId={timer.id}
                  onExpand={() => onExpandTimer?.(timer.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Paused/Stopped Timers Section */}
      {pausedTimers.length > 0 && (
        <div className="relative z-10">
          <h2 className="text-sm text-gray-400 uppercase tracking-wider mb-3">
            In pausa ({pausedTimers.length})
          </h2>
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}>
            <AnimatePresence>
              {pausedTimers.map(timer => (
                <TimerCard
                  key={timer.id}
                  timerId={timer.id}
                  onExpand={() => onExpandTimer?.(timer.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Empty State */}
      {timers.length === 0 && (
        <div className="relative z-10 flex flex-col items-center justify-center py-20">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-xl mb-2">Nessun Timer</h3>
            <p className="text-gray-400 mb-6">Crea il tuo primo timer multiplo</p>
            <Button
              onClick={() => setShowAddDialog(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Crea Timer
            </Button>
          </div>
        </div>
      )}

      {/* Add Timer Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-black border-gray-800">
          <DialogHeader>
            <DialogTitle>Nuovo Timer</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="timer-name">Nome Timer</Label>
              <Input
                id="timer-name"
                value={newTimer.name}
                onChange={(e) => setNewTimer({ ...newTimer, name: e.target.value })}
                placeholder="Es. Studio, Pausa, Allenamento"
                className="bg-gray-900 border-gray-700"
              />
            </div>

            <div>
              <Label htmlFor="timer-minutes">Durata (minuti)</Label>
              <Input
                id="timer-minutes"
                type="number"
                min="1"
                max="180"
                value={newTimer.minutes}
                onChange={(e) => setNewTimer({ ...newTimer, minutes: parseInt(e.target.value) || 1 })}
                className="bg-gray-900 border-gray-700"
              />
            </div>

            <div>
              <Label>Colore</Label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {colors.map(color => (
                  <motion.button
                    key={color.value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full border-4 transition-all ${
                      newTimer.color === color.value
                        ? 'border-white scale-110'
                        : 'border-gray-700'
                    }`}
                    style={{ 
                      backgroundColor: color.value,
                      boxShadow: newTimer.color === color.value ? `0 0 20px ${color.value}80` : 'none'
                    }}
                    onClick={() => setNewTimer({ ...newTimer, color: color.value })}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={handleAddTimer}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              disabled={!newTimer.name.trim()}
            >
              Crea Timer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
