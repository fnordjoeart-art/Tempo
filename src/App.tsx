import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { Presets } from './components/Presets';
import { Routines } from './components/Routines';
import { Settings } from './components/Settings';
import { GroupManager } from './components/GroupManager';
import { TimerProvider } from './components/TimerContext';
import { WatchView } from './components/WatchView';
import { DesktopLayout } from './components/DesktopLayout';
import { SplashScreen } from './components/SplashScreen';
import { useDevice } from './components/hooks/useDevice';
import { useTranslations } from './components/i18n';
import { Home as HomeIcon, Clock, List, Settings as SettingsIcon, Folder } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSplash, setShowSplash] = useState(true);
  const { deviceType, isWatch, isDesktop } = useDevice();
  const { t } = useTranslations();

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <TimerProvider>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      
      <div className="min-h-screen bg-black text-white">
        {/* Apple Watch View */}
        {isWatch && <WatchView />}
        
        {/* Mac Desktop View */}
        {isDesktop && !isWatch && <DesktopLayout />}
        
        {/* iPhone & iPad View */}
        {!isWatch && !isDesktop && (
          <div className="max-w-7xl mx-auto h-screen flex flex-col">
            {/* Content Area */}
            <div className="flex-1 overflow-y-auto pb-24">
              {activeTab === 'home' && <Home />}
              {activeTab === 'presets' && <Presets />}
              {activeTab === 'routines' && <Routines />}
              {activeTab === 'groups' && <GroupManager />}
              {activeTab === 'settings' && <Settings />}
            </div>
            
            {/* Bottom Navigation - Always Visible */}
            <nav className="fixed bottom-0 left-0 right-0 h-20 border-t-2 border-orange-500/30 bg-gradient-to-t from-black via-black to-gray-900 backdrop-blur-xl grid grid-cols-5 z-50 shadow-2xl shadow-orange-500/10">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center justify-center gap-1 py-2 transition-all relative ${
                  activeTab === 'home' ? 'bg-orange-500/10' : ''
                }`}
              >
                <HomeIcon 
                  className="w-6 h-6 transition-all" 
                  style={{ 
                    color: activeTab === 'home' ? '#F97316' : '#999',
                    filter: activeTab === 'home' ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none'
                  }} 
                />
                <span 
                  className="text-[11px] font-medium transition-all" 
                  style={{ color: activeTab === 'home' ? '#F97316' : '#999' }}
                >
                  {t.home}
                </span>
                {activeTab === 'home' && (
                  <motion.div 
                    layoutId="mobileActiveTab"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-b-full"
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab('presets')}
                className={`flex flex-col items-center justify-center gap-1 py-2 transition-all relative ${
                  activeTab === 'presets' ? 'bg-red-500/10' : ''
                }`}
              >
                <Clock 
                  className="w-6 h-6 transition-all" 
                  style={{ 
                    color: activeTab === 'presets' ? '#EF4444' : '#999',
                    filter: activeTab === 'presets' ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))' : 'none'
                  }} 
                />
                <span 
                  className="text-[11px] font-medium transition-all" 
                  style={{ color: activeTab === 'presets' ? '#EF4444' : '#999' }}
                >
                  {t.presets}
                </span>
                {activeTab === 'presets' && (
                  <motion.div 
                    layoutId="mobileActiveTab"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-b-full"
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab('routines')}
                className={`flex flex-col items-center justify-center gap-1 py-2 transition-all relative ${
                  activeTab === 'routines' ? 'bg-blue-500/10' : ''
                }`}
              >
                <List 
                  className="w-6 h-6 transition-all" 
                  style={{ 
                    color: activeTab === 'routines' ? '#3B82F6' : '#999',
                    filter: activeTab === 'routines' ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))' : 'none'
                  }} 
                />
                <span 
                  className="text-[11px] font-medium transition-all" 
                  style={{ color: activeTab === 'routines' ? '#3B82F6' : '#999' }}
                >
                  {t.routines}
                </span>
                {activeTab === 'routines' && (
                  <motion.div 
                    layoutId="mobileActiveTab"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-full"
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab('groups')}
                className={`flex flex-col items-center justify-center gap-1 py-2 transition-all relative ${
                  activeTab === 'groups' ? 'bg-purple-500/10' : ''
                }`}
              >
                <Folder 
                  className="w-6 h-6 transition-all" 
                  style={{ 
                    color: activeTab === 'groups' ? '#A855F7' : '#999',
                    filter: activeTab === 'groups' ? 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))' : 'none'
                  }} 
                />
                <span 
                  className="text-[11px] font-medium transition-all" 
                  style={{ color: activeTab === 'groups' ? '#A855F7' : '#999' }}
                >
                  {t.groups}
                </span>
                {activeTab === 'groups' && (
                  <motion.div 
                    layoutId="mobileActiveTab"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-full"
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex flex-col items-center justify-center gap-1 py-2 transition-all relative ${
                  activeTab === 'settings' ? 'bg-gray-500/10' : ''
                }`}
              >
                <SettingsIcon 
                  className="w-6 h-6 transition-all" 
                  style={{ 
                    color: activeTab === 'settings' ? '#D1D5DB' : '#999',
                    filter: activeTab === 'settings' ? 'drop-shadow(0 0 8px rgba(209, 213, 219, 0.6))' : 'none'
                  }} 
                />
                <span 
                  className="text-[11px] font-medium transition-all" 
                  style={{ color: activeTab === 'settings' ? '#D1D5DB' : '#999' }}
                >
                  {t.settings}
                </span>
                {activeTab === 'settings' && (
                  <motion.div 
                    layoutId="mobileActiveTab"
                    className="absolute top-0 left-0 right-0 h-1 bg-gray-400 rounded-b-full"
                  />
                )}
              </button>
            </nav>
          </div>
        )}
      </div>
    </TimerProvider>
  );
}
