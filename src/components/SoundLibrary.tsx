import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Volume2, VolumeX, Play } from 'lucide-react';
import { motion } from 'motion/react';

export interface Sound {
  id: string;
  name: string;
  category: 'delicate' | 'standard' | 'forte';
  frequency: number;
  duration: number;
  type: OscillatorType;
}

const SOUND_LIBRARY: Sound[] = [
  // Delicate sounds
  { id: 'bell-soft', name: 'Campanella Dolce', category: 'delicate', frequency: 523, duration: 0.3, type: 'sine' },
  { id: 'chime-soft', name: 'Chime Delicato', category: 'delicate', frequency: 880, duration: 0.4, type: 'sine' },
  { id: 'harp', name: 'Arpa', category: 'delicate', frequency: 659, duration: 0.5, type: 'triangle' },
  
  // Standard sounds
  { id: 'bell-standard', name: 'Campana', category: 'standard', frequency: 523, duration: 0.5, type: 'sine' },
  { id: 'beep', name: 'Beep', category: 'standard', frequency: 440, duration: 0.3, type: 'square' },
  { id: 'chime', name: 'Chime', category: 'standard', frequency: 880, duration: 0.6, type: 'sine' },
  
  // Forte sounds
  { id: 'alarm', name: 'Allarme', category: 'forte', frequency: 800, duration: 0.8, type: 'sawtooth' },
  { id: 'bell-loud', name: 'Campana Forte', category: 'forte', frequency: 1000, duration: 0.7, type: 'sine' },
  { id: 'buzzer', name: 'Buzzer', category: 'forte', frequency: 300, duration: 0.5, type: 'square' },
];

interface SoundLibraryProps {
  selectedSound?: string;
  onSelectSound: (soundId: string) => void;
}

export function SoundLibrary({ selectedSound, onSelectSound }: SoundLibraryProps) {
  const [previewingSound, setPreviewingSound] = useState<string | null>(null);

  const playSound = (sound: Sound) => {
    setPreviewingSound(sound.id);
    
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = sound.frequency;
    oscillator.type = sound.type;
    
    // Volume based on category
    const volume = sound.category === 'delicate' ? 0.1 : sound.category === 'standard' ? 0.15 : 0.2;
    gainNode.gain.value = volume;
    
    // Envelope for smoother sound
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + sound.duration);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + sound.duration);
    
    setTimeout(() => {
      setPreviewingSound(null);
      audioContext.close();
    }, sound.duration * 1000 + 100);
  };

  const categories = [
    { id: 'delicate', label: 'Delicato', icon: '🔔', color: '#10B981' },
    { id: 'standard', label: 'Standard', icon: '🔊', color: '#3B82F6' },
    { id: 'forte', label: 'Forte', icon: '📢', color: '#EF4444' },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Libreria Suoni</h3>
          <p className="text-sm text-gray-400 mt-1">
            Scegli il suono di completamento timer
          </p>
        </div>
      </div>

      {categories.map(category => {
        const sounds = SOUND_LIBRARY.filter(s => s.category === category.id);
        
        return (
          <div key={category.id}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{category.icon}</span>
              <h4 className="font-medium" style={{ color: category.color }}>
                {category.label}
              </h4>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {sounds.map(sound => {
                const isSelected = selectedSound === sound.id;
                const isPreviewing = previewingSound === sound.id;

                return (
                  <motion.div
                    key={sound.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all border-2 ${
                        isSelected
                          ? 'border-opacity-100'
                          : 'border-opacity-0 hover:border-opacity-50'
                      }`}
                      style={{
                        borderColor: isSelected ? category.color : '#333',
                        backgroundColor: isSelected ? `${category.color}10` : 'transparent',
                      }}
                      onClick={() => onSelectSound(sound.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <h5 className="font-medium">{sound.name}</h5>
                          <div className="flex items-center gap-2 mt-1">
                            {isSelected ? (
                              <VolumeX className="w-3 h-3 text-gray-400" />
                            ) : (
                              <Volume2 className="w-3 h-3 text-gray-400" />
                            )}
                            <span className="text-xs text-gray-400">
                              {sound.frequency}Hz • {(sound.duration * 1000).toFixed(0)}ms
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className={`${isPreviewing ? 'animate-pulse' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            playSound(sound);
                          }}
                          disabled={isPreviewing}
                        >
                          <Play 
                            className="w-4 h-4" 
                            style={{ color: category.color }}
                          />
                        </Button>
                      </div>

                      {isSelected && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          className="h-1 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function playSelectedSound(soundId: string) {
  const sound = SOUND_LIBRARY.find(s => s.id === soundId);
  if (!sound) return;

  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = sound.frequency;
  oscillator.type = sound.type;
  
  const volume = sound.category === 'delicate' ? 0.1 : sound.category === 'standard' ? 0.15 : 0.2;
  gainNode.gain.value = volume;
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + sound.duration);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + sound.duration);
  
  setTimeout(() => {
    audioContext.close();
  }, sound.duration * 1000 + 100);
}
