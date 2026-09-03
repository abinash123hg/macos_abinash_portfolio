import React, { useState } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { StatusBar } from './StatusBar';
import { DynamicIsland } from './DynamicIsland';
import { HomeBar } from './HomeBar';
import { HomeScreen } from './HomeScreen';
import { ControlCenter } from './ControlCenter';
import { Spotlight } from './Spotlight';
import { AppSwitcher } from './AppSwitcher';
import { IPhoneNotificationCenter } from '../mobile/IPhoneNotificationCenter';
import { LandingScreen } from '../common/LandingScreen';

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
  } = useDevice();

  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
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
      default: return <AboutApp />;
    }
  };

  const getWallpaperGradient = () => {
    switch (settings.wallpaperIndex) {
      case 1:
        return 'bg-gradient-to-br from-cyan-900 via-blue-950 to-neutral-950';
      case 2:
        return 'bg-gradient-to-br from-purple-950 via-neutral-900 to-black';
      case 3:
        return 'bg-gradient-to-br from-neutral-900 via-black to-neutral-950';
      default:
        return 'bg-[radial-gradient(circle_at_14%_12%,#ff8a5b_0%,transparent_38%),radial-gradient(circle_at_86%_18%,#e85bb5_0%,transparent_42%),radial-gradient(circle_at_46%_74%,#9b6be8_0%,transparent_48%),linear-gradient(145deg,#e86b67_0%,#a95dbb_45%,#397db8_100%)]';
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

  const handleLandingExplore = () => {
    setShowQuickSettings(false);
    setShowControlCenter(false);
    setShowNotifications(false);
    setShowSpotlight(false);
    unlockPhone();
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[100dvh] min-h-0 md:h-full md:min-h-0 p-0 md:p-3 select-none overflow-hidden">
      {/* iPhone Screen Shell - Edge-to-edge on mobile, perfectly scaled aspect ratio on desktop/laptop */}
      <div 
        className="relative w-full h-[100dvh] min-h-0 aspect-auto md:w-auto md:h-[min(852px,calc(100vh-32px))] md:aspect-[393/852] md:max-w-[95vw] md:rounded-[54px] md:p-2.5 md:shadow-[0_25px_70px_rgba(0,0,0,0.9)] md:ring-1 md:ring-neutral-700/80 flex flex-col justify-between overflow-hidden bg-black shrink-0"
        style={{
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
          <div className="pt-[env(safe-area-inset-top,0px)] shrink-0 z-40">
            <StatusBar
              onSwipeDownLeft={() => setShowNotifications(prev => !prev)}
              onSwipeDownRight={() => setShowControlCenter(prev => !prev)}
            />
          </div>

          {/* Screen Content Layers */}
          <div className="absolute inset-0 z-10 min-h-0 w-full overflow-hidden flex flex-col will-change-transform">
            {isLocked ? (
              <div className="iphone-lock-screen w-full h-full">
                <LandingScreen onExplore={handleLandingExplore} />
              </div>
            ) : showQuickSettings ? (
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
