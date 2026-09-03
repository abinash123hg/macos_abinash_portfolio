import React, { useState, useEffect } from 'react';
import { DeviceProvider, useDevice } from './context/DeviceContext';
import { DesktopMenuBar } from './components/desktop/DesktopMenuBar';
import { DesktopDock } from './components/desktop/DesktopDock';
import { DesktopWindowManager } from './components/desktop/DesktopWindowManager';
import { DesktopSpotlight } from './components/desktop/DesktopSpotlight';
import { DesktopIconsHome } from './components/desktop/DesktopIconsHome';
import { LandingScreen } from './components/common/LandingScreen';
import { DesktopBackground } from './components/mac/system/DesktopBackground';
import { IPhoneFrame } from './components/mobile/IPhoneFrame';
import { sound } from './utils/audioHaptics';

const PortfolioRoot: React.FC = () => {
  const { deviceMode, settings, resolvedTheme } = useDevice();
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [isDesktopLocked, setIsDesktopLocked] = useState(true);

  // Global Keyboard Shortcut (Cmd+K for Spotlight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.tap();
        setSpotlightOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute brightness factor (0.4 to 1.1) based on settings.brightness (0 to 100)
  const brightnessFactor = Math.max(0.4, (settings.brightness || 90) / 100);

  return (
    <div 
      className={`fixed inset-0 w-screen h-screen overflow-hidden select-none font-sans relative transition-colors duration-300 ${
        resolvedTheme === 'dark' ? 'dark bg-neutral-950 text-white' : 'light bg-neutral-100 text-neutral-900'
      }`}
      style={{
        filter: `brightness(${brightnessFactor})`,
        transition: 'filter 0.15s ease-out'
      }}
    >
      {/* Render View Based on Active Mode */}
      {deviceMode === 'desktop' ? (
        <DesktopBackground>
          {isDesktopLocked ? <LandingScreen onExplore={() => setIsDesktopLocked(false)} /> : <div className="fixed inset-0 w-full h-full flex flex-col justify-between overflow-hidden">
            {/* Top Menu Bar with active Control Center and File, Edit, View, Go, Window, Help */}
            <DesktopMenuBar onOpenSpotlight={() => setSpotlightOpen(true)} />

            {/* Desktop Icons in Home Canvas */}
            <DesktopIconsHome />

            {/* Interactive Window Manager (Multi-Window Desktop) */}
            <DesktopWindowManager />

            {/* Bottom Frosted Glass Dock */}
            <DesktopDock />

          </div>}
        </DesktopBackground>
      ) : (
        /* iPhone 15 Pro Experience */
        <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-black md:bg-radial md:from-slate-900 md:via-neutral-950 md:to-black">
          <IPhoneFrame />
        </div>
      )}

      {/* Global Spotlight Search Modal */}
      <DesktopSpotlight isOpen={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <DeviceProvider>
      <PortfolioRoot />
    </DeviceProvider>
  );
}
