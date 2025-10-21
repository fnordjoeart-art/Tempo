import { useState } from 'react';
import { useTimer } from './TimerContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card } from './ui/card';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ICON_MAP, IconKey, GroupIcon } from './GroupIcon';

export function GroupManager() {
  const { groups, addGroup, removeGroup, updateGroup, presets, routines } = useTimer();
  const [showDialog, setShowDialog] = useState(false);
  const [editingGroup, setEditingGroup] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    color: string;
    icon: IconKey;
  }>({
    name: '',
    color: '#F97316',
    icon: 'folder',
  });

  const iconOptions: { key: IconKey; label: string }[] = [
    { key: 'folder', label: 'Cartella' },
    { key: 'graduation', label: 'Scuola' },
    { key: 'briefcase', label: 'Lavoro' },
    { key: 'dumbbell', label: 'Sport' },
    { key: 'flower', label: 'Relax' },
    { key: 'palette', label: 'Arte' },
    { key: 'utensils', label: 'Cucina' },
    { key: 'book', label: 'Studio' },
    { key: 'music', label: 'Musica' },
    { key: 'activity', label: 'Fitness' },
    { key: 'laptop', label: 'Tech' },
    { key: 'star', label: 'Speciale' },
    { key: 'heart', label: 'Salute' },
    { key: 'coffee', label: 'Pausa' },
    { key: 'home', label: 'Casa' },
    { key: 'zap', label: 'Energia' },
    { key: 'target', label: 'Obiettivi' },
  ];
  const colors = [
    { name: 'Arancione', value: '#F97316' },
    { name: 'Rosso', value: '#EF4444' },
    { name: 'Blu', value: '#3B82F6' },
    { name: 'Verde', value: '#10B981' },
    { name: 'Viola', value: '#A855F7' },
    { name: 'Giallo', value: '#EAB308' },
    { name: 'Rosa', value: '#EC4899' },
    { name: 'Teal', value: '#14B8A6' },
  ];

  const handleOpenDialog = (groupId?: string) => {
    if (groupId) {
      const group = groups.find(g => g.id === groupId);
      if (group) {
        setFormData({
          name: group.name,
          color: group.color,
          icon: (group.icon as IconKey) || 'folder',
        });
        setEditingGroup(groupId);
      }
    } else {
      setFormData({
        name: '',
        color: '#F97316',
        icon: 'folder',
      });
      setEditingGroup(null);
    }
    setShowDialog(true);
  };

  const handleSave = () => {
    if (formData.name.trim()) {
      if (editingGroup) {
        updateGroup(editingGroup, formData);
      } else {
        addGroup(formData);
      }
      setShowDialog(false);
      setFormData({ name: '', color: '#F97316', icon: 'folder' });
      setEditingGroup(null);
    }
  };

  const getGroupStats = (groupId: string) => {
    const presetCount = presets.filter(p => p.group === groupId).length;
    const routineCount = routines.filter(r => r.group === groupId).length;
    return { presetCount, routineCount };
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 pb-24 lg:pb-12">
      <div className="flex items-center justify-between mb-6 pt-4 md:pt-8">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl">Gruppi</h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
            Organizza preset e routine in categorie
          </p>
        </div>

        <Button onClick={() => handleOpenDialog()} className="bg-gradient-to-r from-orange-500 to-red-500">
          <Plus className="w-5 h-5 mr-2" />
          Nuovo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {groups.map(group => {
          const stats = getGroupStats(group.id);
          return (
            <motion.div
              key={group.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card 
                className="p-4 border-2 hover:shadow-lg transition-all"
                style={{ borderColor: `${group.color}40` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${group.color}20` }}
                    >
                      <GroupIcon icon={group.icon} className="w-6 h-6" color={group.color} />
                    </div>
                    <div>
                      <h3 className="font-medium">{group.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {stats.presetCount} preset
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">•</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {stats.routineCount} routine
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleOpenDialog(group.id)}
                    style={{ borderColor: group.color }}
                  >
                    <Edit2 className="w-3 h-3 mr-2" />
                    Modifica
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (confirm(`Eliminare il gruppo "${group.name}"? I preset e le routine non verranno eliminati.`)) {
                        removeGroup(group.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {groups.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mx-auto mb-4">
            <Plus className="w-10 h-10 text-orange-500" />
          </div>
          <p>Nessun gruppo creato.</p>
          <p className="text-sm mt-2">Crea il tuo primo gruppo per organizzare i timer!</p>
        </div>
      )}

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-black border-gray-800">
          <DialogHeader>
            <DialogTitle>{editingGroup ? 'Modifica Gruppo' : 'Nuovo Gruppo'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="group-name">Nome Gruppo</Label>
              <Input
                id="group-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Es. Scuola, Lavoro, Sport"
                className="bg-gray-900 border-gray-700"
              />
            </div>

            <div>
              <Label>Icona</Label>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {iconOptions.map(({ key, label }) => {
                  const IconComponent = ICON_MAP[key];
                  return (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center border-2 transition-all ${
                        formData.icon === key
                          ? 'border-white bg-gray-800'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setFormData({ ...formData, icon: key })}
                      title={label}
                    >
                      <IconComponent 
                        className="w-5 h-5" 
                        style={{ color: formData.icon === key ? formData.color : '#9CA3AF' }}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label>Colore</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {colors.map(color => (
                  <motion.button
                    key={color.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`h-12 rounded-lg border-4 transition-all ${
                      formData.color === color.value
                        ? 'border-white scale-105'
                        : 'border-gray-700'
                    }`}
                    style={{ 
                      backgroundColor: color.value,
                      boxShadow: formData.color === color.value ? `0 0 20px ${color.value}80` : 'none'
                    }}
                    onClick={() => setFormData({ ...formData, color: color.value })}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500"
              disabled={!formData.name.trim()}
            >
              {editingGroup ? 'Salva Modifiche' : 'Crea Gruppo'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
