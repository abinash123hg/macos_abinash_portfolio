import React, { lazy, Suspense, useState, useEffect } from 'react';
import { DeviceProvider, useDevice } from './context/DeviceContext';
import { LandingDestination, LandingScreen } from './components/common/LandingScreen';
import { sound } from './utils/audioHaptics';

const DesktopMenuBar = lazy(() => import('./components/desktop/DesktopMenuBar').then(module => ({ default: module.DesktopMenuBar })));
const DesktopDock = lazy(() => import('./components/desktop/DesktopDock').then(module => ({ default: module.DesktopDock })));
const DesktopWindowManager = lazy(() => import('./components/desktop/DesktopWindowManager').then(module => ({ default: module.DesktopWindowManager })));
const DesktopSpotlight = lazy(() => import('./components/desktop/DesktopSpotlight').then(module => ({ default: module.DesktopSpotlight })));
const DesktopIconsHome = lazy(() => import('./components/desktop/DesktopIconsHome').then(module => ({ default: module.DesktopIconsHome })));
const DesktopBackground = lazy(() => import('./components/mac/system/DesktopBackground').then(module => ({ default: module.DesktopBackground })));
const IPhoneFrame = lazy(() => import('./components/mobile/IPhoneFrame').then(module => ({ default: module.IPhoneFrame })));

const PortfolioRoot: React.FC = () => {
  const { deviceMode, settings, resolvedTheme, openDesktopWindow } = useDevice();
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [isDesktopLocked, setIsDesktopLocked] = useState(true);
  const [isPortfolioEntering, setIsPortfolioEntering] = useState(false);

  const handleLandingExplore = (destination: LandingDestination = 'home') => {
    setIsPortfolioEntering(true);
    setIsDesktopLocked(false);
    if (destination !== 'home') {
      openDesktopWindow(destination === 'contact' ? 'mail' : destination);
    }
  };

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
      <Suspense fallback={<LandingScreen onExplore={handleLandingExplore} />}>
        {deviceMode === 'desktop' ? (
          <DesktopBackground>
            {isDesktopLocked ? <LandingScreen onExplore={handleLandingExplore} /> : <div className={`fixed inset-0 w-full h-full flex flex-col justify-between overflow-hidden ${isPortfolioEntering ? 'portfolio-rising' : ''}`}>
              <DesktopMenuBar onOpenSpotlight={() => setSpotlightOpen(true)} />
              <DesktopIconsHome />
              <DesktopWindowManager />
              <DesktopDock />
            </div>}
          </DesktopBackground>
        ) : (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-black md:bg-radial md:from-slate-900 md:via-neutral-950 md:to-black">
            <IPhoneFrame />
          </div>
        )}

        <DesktopSpotlight isOpen={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
      </Suspense>
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
