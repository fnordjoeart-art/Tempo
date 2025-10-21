import { useTimer } from './TimerContext';
import { useDevice } from './hooks/useDevice';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Volume2, Vibrate, Moon, Zap, Cloud, Lock, Crown, Smartphone, Tablet, Monitor, Watch } from 'lucide-react';

export function Settings() {
  const { settings, updateSettings } = useTimer();
  const { deviceType, windowWidth, isDesktop } = useDevice();

  const getDeviceIcon = () => {
    switch (deviceType) {
      case 'watch': return Watch;
      case 'phone': return Smartphone;
      case 'tablet': return Tablet;
      case 'desktop': return Monitor;
      default: return Smartphone;
    }
  };

  const DeviceIcon = getDeviceIcon();

  return (
    <div className="p-4 md:p-8 lg:p-12 pb-24 lg:pb-12">
      <div className="pt-4 md:pt-8 mb-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl mb-2">Impostazioni</h1>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          Personalizza la tua esperienza
        </p>
      </div>

      <div className="space-y-4 md:space-y-6 max-w-4xl">
        <Card className="p-4 md:p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3">
            <DeviceIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="font-medium">Dispositivo rilevato</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {deviceType === 'watch' && 'Apple Watch'}
                {deviceType === 'phone' && 'iPhone'}
                {deviceType === 'tablet' && 'iPad'}
                {deviceType === 'desktop' && 'Mac'}
                {' • '}
                {windowWidth}px
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h2 className="text-lg mb-4 flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Audio & Vibrazione
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="default-sound">Suono predefinito</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Abilita suono al termine del timer
                </p>
              </div>
              <Switch
                id="default-sound"
                checked={settings.defaultSound}
                onCheckedChange={(checked) => updateSettings({ defaultSound: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="default-vibration">Vibrazione predefinita</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Abilita vibrazione al termine del timer
                </p>
              </div>
              <Switch
                id="default-vibration"
                checked={settings.defaultVibration}
                onCheckedChange={(checked) => updateSettings({ defaultVibration: checked })}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Comportamento
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="keep-screen">Mantieni schermo attivo</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Impedisce lo spegnimento automatico
                </p>
              </div>
              <Switch
                id="keep-screen"
                checked={settings.keepScreenActive}
                onCheckedChange={(checked) => updateSettings({ keepScreenActive: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reduce-motion">Riduci movimento</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Animazioni discrete per accessibilità
                </p>
              </div>
              <Switch
                id="reduce-motion"
                checked={settings.reduceMotion}
                onCheckedChange={(checked) => updateSettings({ reduceMotion: checked })}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5" />
            Aspetto
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label>Tema</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Attualmente: Auto (sistema)
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="cursor-pointer">Chiaro</Badge>
                <Badge variant="outline" className="cursor-pointer">Scuro</Badge>
                <Badge className="cursor-pointer">Auto</Badge>
              </div>
            </div>

            <Separator />

            <div>
              <Label>Colore predefinito</Label>
              <div className="flex gap-2 mt-3">
                {[
                  { name: 'Arancione', value: '#F97316' },
                  { name: 'Rosso', value: '#EF4444' },
                  { name: 'Blu', value: '#3B82F6' },
                  { name: 'Viola', value: '#A855F7' },
                ].map(color => (
                  <button
                    key={color.value}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      settings.defaultColor === color.value
                        ? 'border-black dark:border-white scale-110'
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => updateSettings({ defaultColor: color.value })}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
          <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4">
            <Crown className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-base md:text-lg mb-2 flex items-center gap-2">
                Premium
                <Badge className="bg-blue-600 text-xs">Gratuito</Badge>
              </h2>
              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-4">
                Sblocca funzionalità avanzate con Premium:
              </p>
              <ul className="text-xs md:text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <Cloud className="w-4 h-4" />
                  Sincronizzazione multi-dispositivo (iPhone, iPad, Mac, Watch)
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Preset e routine illimitati
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Gruppi personalizzati e widget avanzati
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h2 className="text-lg mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Privacy & Dati
          </h2>
          
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>Local-first:</strong> Tutti i tuoi dati sono salvati localmente sul dispositivo.
            </p>
            <p>
              <strong>Nessun tracciamento:</strong> Non raccogliamo dati personali o analitiche invasive.
            </p>
            <p>
              <strong>Sincronizzazione opzionale:</strong> La sincronizzazione multi-dispositivo richiede Premium ed è completamente opt-in.
            </p>
            <Separator />
            <p className="text-xs">
              Versione 1.0.0 • TEMPO+ Visual Timer
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
