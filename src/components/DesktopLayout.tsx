import { useState } from 'react';
import { Home } from './Home';
import { Presets } from './Presets';
import { Routines } from './Routines';
import { Settings } from './Settings';
import { GroupManager } from './GroupManager';
import { Button } from './ui/button';
import { Home as HomeIcon, Clock, List, Settings as SettingsIcon, Menu, Folder } from 'lucide-react';
import { cn } from './ui/utils';

type View = 'home' | 'presets' | 'routines' | 'groups' | 'settings';

export function DesktopLayout() {
  const [activeView, setActiveView] = useState<View>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { id: 'home' as View, label: 'Home', icon: HomeIcon },
    { id: 'presets' as View, label: 'Preset', icon: Clock },
    { id: 'routines' as View, label: 'Routine', icon: List },
    { id: 'groups' as View, label: 'Gruppi', icon: Folder },
    { id: 'settings' as View, label: 'Impostazioni', icon: SettingsIcon },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-black">
      {/* Sidebar Navigation - Mac */}
      <aside
        className={cn(
          "bg-black border-r border-gray-800 flex flex-col transition-all duration-300",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h1 className="text-xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                TEMPO+
              </h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="ml-auto hover:bg-gray-900"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeView === item.id ? 'default' : 'ghost'}
                  className={cn(
                    "w-full justify-start",
                    sidebarCollapsed && "justify-center"
                  )}
                  onClick={() => setActiveView(item.id)}
                >
                  <Icon className={cn("w-5 h-5", !sidebarCollapsed && "mr-3")} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Button>
              );
            })}
          </div>
        </nav>

        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center">
              macOS • v1.0.0
            </p>
          </div>
        )}
      </aside>

      {/* Main Content Area - Mac */}
      <main className="flex-1 overflow-auto">
        <div className="h-full">
          {activeView === 'home' && <Home />}
          {activeView === 'presets' && <Presets />}
          {activeView === 'routines' && <Routines />}
          {activeView === 'groups' && <GroupManager />}
          {activeView === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  );
}
