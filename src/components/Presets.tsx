import { useState } from 'react';
import { useTimer } from './TimerContext';
import { useDevice } from './hooks/useDevice';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Trash2, Play, Filter } from 'lucide-react';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { motion, AnimatePresence } from 'motion/react';
import { GroupIcon } from './GroupIcon';

export function Presets() {
  const { isDesktop } = useDevice();
  const { presets, groups, addPreset, removePreset, addTimer, settings } = useTimer();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [newPreset, setNewPreset] = useState({
    name: '',
    minutes: 5,
    color: '#F97316',
    soundEnabled: true,
    vibrationEnabled: true,
    group: '',
  });

  const handleCreatePreset = () => {
    if (newPreset.name.trim()) {
      addPreset({
        name: newPreset.name,
        seconds: newPreset.minutes * 60,
        color: newPreset.color,
        soundEnabled: newPreset.soundEnabled,
        vibrationEnabled: newPreset.vibrationEnabled,
        group: newPreset.group || undefined,
      });
      setNewPreset({
        name: '',
        minutes: 5,
        color: '#F97316',
        soundEnabled: true,
        vibrationEnabled: true,
        group: '',
      });
      setIsDialogOpen(false);
    }
  };

  const handleStartPreset = (preset: typeof presets[0]) => {
    addTimer({
      name: preset.name,
      totalSeconds: preset.seconds,
      remainingSeconds: preset.seconds,
      isRunning: true,
      isPaused: false,
      color: preset.color,
      soundEnabled: preset.soundEnabled,
      vibrationEnabled: preset.vibrationEnabled,
      keepScreenActive: settings.keepScreenActive,
      warningAt: 10,
    });
  };

  const colors = [
    { name: 'Arancione', value: '#F97316' },
    { name: 'Rosso', value: '#EF4444' },
    { name: 'Blu', value: '#3B82F6' },
    { name: 'Viola', value: '#A855F7' },
  ];

  const freeLimit = 3;
  const canAddMore = presets.length < freeLimit;

  // Filter presets by group
  const filteredPresets = selectedGroup === 'all' 
    ? presets 
    : selectedGroup === 'none'
    ? presets.filter(p => !p.group)
    : presets.filter(p => p.group === selectedGroup);

  const ungroupedCount = presets.filter(p => !p.group).length;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 lg:p-12 pb-24 lg:pb-12">
      <div className="flex items-center justify-between mb-6 pt-12 md:pt-8 lg:pt-4">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl">Preset</h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
            {presets.length}/{freeLimit} preset disponibili (versione gratuita)
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={!canAddMore}>
              <Plus className="w-5 h-5 mr-2" />
              Nuovo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crea Nuovo Preset</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="preset-name">Nome</Label>
                <Input
                  id="preset-name"
                  value={newPreset.name}
                  onChange={(e) => setNewPreset({ ...newPreset, name: e.target.value })}
                  placeholder="Es. Pomodoro"
                />
              </div>

              <div>
                <Label htmlFor="preset-minutes">Minuti</Label>
                <Input
                  id="preset-minutes"
                  type="number"
                  min="1"
                  max="60"
                  value={newPreset.minutes}
                  onChange={(e) => setNewPreset({ ...newPreset, minutes: parseInt(e.target.value) || 1 })}
                />
              </div>

              <div>
                <Label>Colore</Label>
                <div className="flex gap-2 mt-2">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      className={`w-12 h-12 rounded-full border-4 transition-all ${
                        newPreset.color === color.value
                          ? 'border-black dark:border-white scale-110'
                          : 'border-gray-300 dark:border-gray-700'
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setNewPreset({ ...newPreset, color: color.value })}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="preset-sound">Suono</Label>
                <Switch
                  id="preset-sound"
                  checked={newPreset.soundEnabled}
                  onCheckedChange={(checked) => setNewPreset({ ...newPreset, soundEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="preset-vibration">Vibrazione</Label>
                <Switch
                  id="preset-vibration"
                  checked={newPreset.vibrationEnabled}
                  onCheckedChange={(checked) => setNewPreset({ ...newPreset, vibrationEnabled: checked })}
                />
              </div>

              <div>
                <Label htmlFor="preset-group">Gruppo (opzionale)</Label>
                <Select
                  value={newPreset.group}
                  onValueChange={(value) => setNewPreset({ ...newPreset, group: value === 'none' ? '' : value })}
                >
                  <SelectTrigger className="bg-gray-900 border-gray-700">
                    <SelectValue placeholder="Seleziona gruppo" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="none">Nessun gruppo</SelectItem>
                    {groups.map(group => (
                      <SelectItem key={group.id} value={group.id}>
                        <span className="flex items-center gap-2">
                          <GroupIcon icon={group.icon} className="w-4 h-4" color={group.color} />
                          <span>{group.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleCreatePreset} className="w-full">
                Crea Preset
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {!canAddMore && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            Hai raggiunto il limite di preset gratuiti. Passa a Premium per preset illimitati, gruppi e sincronizzazione multi-dispositivo.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        <AnimatePresence mode="popLayout">
          {filteredPresets.map(preset => {
            const group = preset.group ? groups.find(g => g.id === preset.group) : null;
            return (
              <motion.div
                key={preset.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="p-3 md:p-4 border-2" style={{ borderColor: group ? `${group.color}40` : undefined }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{preset.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {Math.floor(preset.seconds / 60)} minuti
                      </p>
                      {group && (
                        <Badge variant="outline" className="mt-2" style={{ borderColor: group.color, color: group.color }}>
                          <GroupIcon icon={group.icon} className="w-3 h-3 mr-1" />
                          {group.name}
                        </Badge>
                      )}
                    </div>
                    <div
                      className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-700"
                      style={{ backgroundColor: preset.color }}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleStartPreset(preset)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Avvia
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removePreset(preset.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredPresets.length === 0 && presets.length > 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>Nessun preset in questo gruppo.</p>
        </div>
      )}

      {presets.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>Nessun preset salvato.</p>
          <p className="text-sm mt-2">Crea il tuo primo preset per iniziare!</p>
        </div>
      )}
    </div>
  );
}
