import { useState } from 'react';
import { useTimer, Routine, RoutineStep } from './TimerContext';
import { useDevice } from './hooks/useDevice';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Trash2, Play, ChevronRight, Edit } from 'lucide-react';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { RoutineRunner } from './RoutineRunner';

export function Routines() {
  const { isDesktop } = useDevice();
  const { routines, addRoutine, removeRoutine } = useTimer();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeRoutine, setActiveRoutine] = useState<Routine | null>(null);
  const [newRoutine, setNewRoutine] = useState({
    name: '',
    steps: [] as RoutineStep[],
    autoAdvance: true,
    pauseBetweenSteps: false,
    group: '',
  });
  const [currentStep, setCurrentStep] = useState({
    name: '',
    minutes: 5,
    color: '#F97316',
  });

  const handleAddStep = () => {
    if (currentStep.name.trim()) {
      setNewRoutine({
        ...newRoutine,
        steps: [
          ...newRoutine.steps,
          {
            id: Date.now().toString(),
            name: currentStep.name,
            seconds: currentStep.minutes * 60,
            color: currentStep.color,
          },
        ],
      });
      setCurrentStep({
        name: '',
        minutes: 5,
        color: '#F97316',
      });
    }
  };

  const handleRemoveStep = (stepId: string) => {
    setNewRoutine({
      ...newRoutine,
      steps: newRoutine.steps.filter(s => s.id !== stepId),
    });
  };

  const handleCreateRoutine = () => {
    if (newRoutine.name.trim() && newRoutine.steps.length > 0) {
      addRoutine({
        name: newRoutine.name,
        steps: newRoutine.steps,
        autoAdvance: newRoutine.autoAdvance,
        pauseBetweenSteps: newRoutine.pauseBetweenSteps,
        group: newRoutine.group || undefined,
      });
      setNewRoutine({
        name: '',
        steps: [],
        autoAdvance: true,
        pauseBetweenSteps: false,
        group: '',
      });
      setIsDialogOpen(false);
    }
  };

  const handleStartRoutine = (routine: Routine) => {
    setActiveRoutine(routine);
  };

  const colors = [
    { name: 'Arancione', value: '#F97316' },
    { name: 'Rosso', value: '#EF4444' },
    { name: 'Blu', value: '#3B82F6' },
    { name: 'Viola', value: '#A855F7' },
  ];

  if (activeRoutine) {
    return (
      <RoutineRunner
        routine={activeRoutine}
        onClose={() => setActiveRoutine(null)}
      />
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 pb-24 lg:pb-12">
      <div className="flex items-center justify-between mb-6 pt-4 md:pt-8">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl">Routine</h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
            Sequenze di timer automatici
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-5 h-5 mr-2" />
              Nuova
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crea Nuova Routine</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              <div>
                <Label htmlFor="routine-name">Nome Routine</Label>
                <Input
                  id="routine-name"
                  value={newRoutine.name}
                  onChange={(e) => setNewRoutine({ ...newRoutine, name: e.target.value })}
                  placeholder="Es. Morning Routine"
                />
              </div>

              <div>
                <Label htmlFor="routine-group">Gruppo (opzionale)</Label>
                <Input
                  id="routine-group"
                  value={newRoutine.group}
                  onChange={(e) => setNewRoutine({ ...newRoutine, group: e.target.value })}
                  placeholder="Es. Mattina, Studio"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="routine-auto">Auto-avanzamento</Label>
                <Switch
                  id="routine-auto"
                  checked={newRoutine.autoAdvance}
                  onCheckedChange={(checked) => setNewRoutine({ ...newRoutine, autoAdvance: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="routine-pause">Pausa tra step</Label>
                <Switch
                  id="routine-pause"
                  checked={newRoutine.pauseBetweenSteps}
                  onCheckedChange={(checked) => setNewRoutine({ ...newRoutine, pauseBetweenSteps: checked })}
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Aggiungi Step</h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="step-name">Nome Step</Label>
                    <Input
                      id="step-name"
                      value={currentStep.name}
                      onChange={(e) => setCurrentStep({ ...currentStep, name: e.target.value })}
                      placeholder="Es. Respirazione"
                    />
                  </div>

                  <div>
                    <Label htmlFor="step-minutes">Minuti</Label>
                    <Input
                      id="step-minutes"
                      type="number"
                      min="1"
                      max="60"
                      value={currentStep.minutes}
                      onChange={(e) => setCurrentStep({ ...currentStep, minutes: parseInt(e.target.value) || 1 })}
                    />
                  </div>

                  <div>
                    <Label>Colore</Label>
                    <div className="flex gap-2 mt-2">
                      {colors.map(color => (
                        <button
                          key={color.value}
                          className={`w-10 h-10 rounded-full border-4 transition-all ${
                            currentStep.color === color.value
                              ? 'border-black dark:border-white scale-110'
                              : 'border-gray-300 dark:border-gray-700'
                          }`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => setCurrentStep({ ...currentStep, color: color.value })}
                          aria-label={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleAddStep} variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Aggiungi Step
                  </Button>
                </div>
              </div>

              {newRoutine.steps.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Step della Routine ({newRoutine.steps.length})</h3>
                  <div className="space-y-2">
                    {newRoutine.steps.map((step, index) => (
                      <div key={step.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <span className="text-sm text-gray-500 dark:text-gray-400 w-6">{index + 1}.</span>
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: step.color }}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{step.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {Math.floor(step.seconds / 60)} min
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveStep(step.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                onClick={handleCreateRoutine} 
                className="w-full"
                disabled={!newRoutine.name.trim() || newRoutine.steps.length === 0}
              >
                Crea Routine
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {routines.map(routine => {
          const totalMinutes = routine.steps.reduce((sum, step) => sum + step.seconds, 0) / 60;
          
          return (
            <Card key={routine.id} className="p-4">
              <div className="mb-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{routine.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {routine.steps.length} step • {Math.floor(totalMinutes)} min totali
                    </p>
                  </div>
                  {routine.group && (
                    <Badge variant="outline">{routine.group}</Badge>
                  )}
                </div>

                <div className="flex gap-1 mt-3">
                  {routine.steps.slice(0, 6).map(step => (
                    <div
                      key={step.id}
                      className="h-2 flex-1 rounded-full"
                      style={{ backgroundColor: step.color }}
                      title={step.name}
                    />
                  ))}
                  {routine.steps.length > 6 && (
                    <div className="h-2 w-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => handleStartRoutine(routine)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Avvia
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeRoutine(routine.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {routines.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>Nessuna routine salvata.</p>
          <p className="text-sm mt-2">Crea la tua prima routine per iniziare!</p>
        </div>
      )}
    </div>
  );
}
