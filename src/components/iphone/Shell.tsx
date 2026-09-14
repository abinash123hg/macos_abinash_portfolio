import React, { useState, useEffect } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { StatusBar } from './StatusBar';
import { DynamicIsland } from './DynamicIsland';
import { HomeBar } from './HomeBar';
import { HomeScreen } from './HomeScreen';
import { ControlCenter } from './ControlCenter';
import { Spotlight } from './Spotlight';
import { AppSwitcher } from './AppSwitcher';
import { IPhoneNotificationCenter } from '../mobile/IPhoneNotificationCenter';
import { LandingDestination, LandingScreen } from '../common/LandingScreen';

// Apps
import { AboutApp } from './apps/AboutApp';
import { AnalyticsApp } from './apps/AnalyticsApp';
import { CalendarApp } from './apps/CalendarApp';
import { CameraApp } from './apps/CameraApp';
import { CertificationsApp } from './apps/CertificationsApp';
import { ChatbotApp } from './apps/ChatbotApp';
import { ContactApp } from './apps/ContactApp';
import { EducationApp } from './apps/EducationApp';
import { ExperienceApp } from './apps/ExperienceApp';
import { FavouritesApp } from './apps/FavouritesApp';
import { FinderApp } from './apps/FinderApp';
import { GalleryApp } from './apps/GalleryApp';
import { GamesApp } from './apps/GamesApp';
import { MailApp } from './apps/MailApp';
import { NotesApp } from './apps/NotesApp';
import { PhotosApp } from './apps/PhotosApp';
import { ProjectsApp } from './apps/ProjectsApp';
import { RecruiterApp } from './apps/RecruiterApp';
import { ResumeApp } from './apps/ResumeApp';
import { CVApp } from './apps/CVApp';
import { SafariApp } from './apps/SafariApp';
import { SettingsApp } from './apps/SettingsApp';
import { SkillsApp } from './apps/SkillsApp';
import { SystemInfoApp } from './apps/SystemInfoApp';
import { TrashApp } from './apps/TrashApp';
import { VideosApp } from './apps/VideosApp';
import { MusicApp } from './apps/MusicApp';
import { QuizApp } from '../apps/QuizApp';
import { UtilityApp } from './apps/UtilityApp';

import { sound } from '../../utils/audioHaptics';
import { resolveMediaUrl } from '../../utils/mediaResolver';

export const Shell: React.FC = () => {
  const { 
    isLocked,
    phoneScreen, 
    setPhoneScreen, 
    activeAppId, 
    closeApp, 
    settings, 
    clickCameraControl, 
    lightPressCameraControl,
    lockPhone,
    unlockPhone
    ,openApp
  } = useDevice();

  const [viewportSize, setViewportSize] = useState(() => ({
    width: typeof window === 'undefined' ? 390 : window.innerWidth,
    height: typeof window === 'undefined' ? 844 : window.innerHeight,
  }));

  useEffect(() => {
    const syncViewport = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    syncViewport();
    window.addEventListener('resize', syncViewport);
    window.addEventListener('orientationchange', syncViewport);

    return () => {
      window.removeEventListener('resize', syncViewport);
      window.removeEventListener('orientationchange', syncViewport);
    };
  }, []);

  const isLandscape = viewportSize.width > viewportSize.height;

  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [isPortfolioEntering, setIsPortfolioEntering] = useState(false);
  const topSwipeStartY = React.useRef<number | null>(null);
  const topSwipeStartX = React.useRef<number | null>(null);

  const activeCustomWallpaper = isLocked ? undefined : settings.wallpapers?.iosHome;

  const renderActiveApp = () => {
    switch (activeAppId) {
      case 'about': return <AboutApp />;
      case 'analytics': return <AnalyticsApp />;
      case 'calendar': return <CalendarApp />;
      case 'camera': return <CameraApp />;
      case 'certificates': return <CertificationsApp />;
      case 'certifications': return <CertificationsApp />;
      case 'ai': 
      case 'chatbot': return <ChatbotApp />;
      case 'contact': return <ContactApp />;
      case 'education': return <EducationApp />;
      case 'experience': return <ExperienceApp />;
      case 'favourites': 
      case 'favorites': return <FavouritesApp />;
      case 'finder': 
      case 'files': return <FinderApp />;
      case 'gallery': return <GalleryApp />;
      case 'games': return <GamesApp />;
      case 'quiz': return <QuizApp />;
      case 'mail': return <MailApp />;
      case 'music': return <MusicApp />;
      case 'notes': return <NotesApp />;
      case 'photos': return <PhotosApp />;
      case 'projects': return <ProjectsApp />;
      case 'recruiter': return <RecruiterApp />;
      case 'resume': return <ResumeApp />;
      case 'cv': return <CVApp />;
      case 'safari': return <SafariApp />;
      case 'settings': return <SettingsApp />;
      case 'skills': return <SkillsApp />;
      case 'systeminfo': 
      case 'system': return <SystemInfoApp />;
      case 'terminal': return <SystemInfoApp />;
      case 'trash': return <TrashApp />;
      case 'videos': return <VideosApp />;
      case 'clock':
      case 'calculator':
      case 'maps':
      case 'wallet':
      case 'reminders':
      case 'voice':
      case 'journal':
      case 'shortcuts':
      case 'weather':
      case 'phone':
      case 'messages': return <UtilityApp appId={activeAppId} />;
      default: return <AboutApp />;
    }
  };

  const getWallpaperGradient = () => {
    switch (settings.wallpaperIndex) {
      case 1:
        return 'bg-gradient-to-br from-sky-200 via-sky-400 to-indigo-700';
      case 2:
        return 'bg-gradient-to-br from-violet-300 via-indigo-500 to-slate-900';
      case 3:
        return 'bg-gradient-to-br from-slate-300 via-slate-500 to-slate-900';
      case 4:
        return 'bg-gradient-to-br from-orange-500 via-rose-600 to-fuchsia-950';
      case 5:
        return 'bg-gradient-to-br from-emerald-400 via-teal-700 to-slate-950';
      case 6:
        return 'bg-gradient-to-br from-cyan-300 via-blue-600 to-indigo-950';
      default:
        return 'bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.96)_0%,rgba(166,214,255,0.86)_9%,rgba(99,146,255,0.62)_16%,transparent_30%),radial-gradient(circle_at_80%_18%,rgba(223,195,255,0.92)_0%,rgba(131,108,255,0.72)_18%,transparent_36%),radial-gradient(circle_at_50%_86%,rgba(23,42,88,0.9)_0%,rgba(12,18,35,0.98)_48%,transparent_70%),linear-gradient(160deg,#b9dbff_0%,#7aa7ef_28%,#5967d1_56%,#101b35_100%)]';
    }
  };

  const handleTopSwipeStart = (event: React.TouchEvent) => {
    const startY = event.touches[0]?.clientY ?? 0;
    topSwipeStartY.current = startY <= 72 ? startY : null;
    topSwipeStartX.current = topSwipeStartY.current === null ? null : (event.touches[0]?.clientX ?? null);
  };

  const handleTopSwipeEnd = (event: React.TouchEvent) => {
    if (topSwipeStartY.current === null) return;
    const endY = event.changedTouches[0]?.clientY;
    const endX = event.changedTouches[0]?.clientX ?? 0;
    const deltaY = endY === undefined ? 0 : endY - topSwipeStartY.current;
    const deltaX = topSwipeStartX.current === null ? 0 : endX - topSwipeStartX.current;
    topSwipeStartY.current = null;
    topSwipeStartX.current = null;
    if (deltaY > 28 && Math.abs(deltaX) < 36) {
      sound.tap();
      setShowQuickSettings(true);
      setShowControlCenter(false);
      setShowNotifications(false);
      setShowSpotlight(false);
    }
  };

  const handleLandingExplore = (destination: LandingDestination = 'home') => {
    setShowQuickSettings(false);
    setShowControlCenter(false);
    setShowNotifications(false);
    setShowSpotlight(false);
    setIsPortfolioEntering(true);
    unlockPhone();
    if (destination !== 'home' && destination !== 'work') {
      window.setTimeout(() => openApp(destination === 'contact' ? 'contact' : destination), 0);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[100dvh] min-h-[100svh] p-0 select-none overflow-hidden">
      {/* iPhone Screen Shell: fluid scale for portrait and landscape without locked box geometry */}
      <div 
        className="iphone-shell relative w-full h-[100dvh] min-h-0 aspect-auto md:rounded-[54px] md:p-2.5 md:shadow-[0_25px_70px_rgba(0,0,0,0.9)] md:ring-1 md:ring-neutral-700/80 flex flex-col justify-between overflow-hidden bg-black shrink-0"
        style={{
          width: isLandscape ? 'min(960px, calc(100vw - 24px))' : 'min(420px, calc(100vw - 16px))',
          height: isLandscape ? 'min(420px, calc(100dvh - 24px))' : '100dvh',
          maxWidth: '100vw',
          maxHeight: '100dvh',
          aspectRatio: isLandscape ? '16 / 9' : '9 / 16',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        }}
        onTouchStart={handleTopSwipeStart}
        onTouchEnd={handleTopSwipeEnd}
      >
        {/* Inner OLED Display Glass */}
        <div 
          className={`relative w-full h-full ${isLocked ? 'bg-black' : activeCustomWallpaper ? 'bg-black' : getWallpaperGradient()} md:rounded-[44px] overflow-hidden flex flex-col justify-between`}
          style={activeCustomWallpaper ? {
            backgroundImage: `url(${resolveMediaUrl(activeCustomWallpaper)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : undefined}
        >
          {/* Subtle contrast overlay for custom wallpapers */}
          {activeCustomWallpaper && (
            <div className="absolute inset-0 bg-black/25 pointer-events-none" />
          )}
          
          {/* Dynamic Island Overlay (Dedicated for Music & Real-time playback) */}
          <DynamicIsland />

          {/* iOS 18 Dynamic Status Bar with top gesture triggers */}
          <div className="iphone-status-bar pt-[env(safe-area-inset-top,0px)] shrink-0 z-40">
            <StatusBar
              onSwipeDownLeft={() => setShowNotifications(prev => !prev)}
              onSwipeDownRight={() => setShowControlCenter(prev => !prev)}
            />
          </div>

          {/* Screen Content Layers */}
          <div className={`absolute inset-0 z-10 min-h-0 w-full overflow-hidden flex flex-col will-change-transform ${isPortfolioEntering && !isLocked ? 'portfolio-rising' : ''}`}>
            {showQuickSettings ? (
              <div className="relative h-full w-full overflow-hidden">
                <ControlCenter onClose={() => setShowQuickSettings(false)} />
                <div
                  className="absolute inset-x-3 top-3 bottom-3 z-10 overflow-hidden rounded-[28px] border border-white/15 shadow-2xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <IPhoneNotificationCenter onClose={() => setShowQuickSettings(false)} />
                </div>
              </div>
            ) : showControlCenter ? (
              <ControlCenter onClose={() => setShowControlCenter(false)} />
            ) : showNotifications ? (
              <IPhoneNotificationCenter onClose={() => setShowNotifications(false)} />
            ) : showSpotlight ? (
              <Spotlight onClose={() => setShowSpotlight(false)} />
            ) : isLocked ? (
              <div className="iphone-lock-screen w-full h-full">
                <LandingScreen onExplore={handleLandingExplore} />
              </div>
            ) : phoneScreen === 'switcher' ? (
              <AppSwitcher />
            ) : activeAppId ? (
              <div className="absolute inset-0 z-10 w-full h-full min-h-0 flex flex-col animate-in fade-in zoom-in-95 duration-150 will-change-transform">
                {renderActiveApp()}
              </div>
            ) : (
              <HomeScreen onOpenSpotlight={() => setShowSpotlight(true)} />
            )}
          </div>

          {/* iOS 18 Bottom Home Indicator Bar with Safe Area */}
          <div className="pb-[env(safe-area-inset-bottom,0px)] shrink-0 z-40">
            <HomeBar
              onSwipeUp={() => {
                if (showQuickSettings) setShowQuickSettings(false);
                else if (showControlCenter) setShowControlCenter(false);
                else if (showNotifications) setShowNotifications(false);
                else if (showSpotlight) setShowSpotlight(false);
                else if (phoneScreen === 'switcher') setPhoneScreen('home');
                else if (activeAppId) closeApp();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
