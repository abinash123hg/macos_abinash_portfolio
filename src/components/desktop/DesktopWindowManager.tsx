import React, { useEffect, useState } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { WindowState } from '../../types';
import { AboutApp } from '../apps/AboutApp';
import { ProjectsApp } from '../apps/ProjectsApp';
import { SkillsApp } from '../apps/SkillsApp';
import { CertificatesApp } from '../apps/CertificatesApp';
import { SafariApp } from '../apps/SafariApp';
import { PhotosApp } from '../apps/PhotosApp';
import { MailApp } from '../apps/MailApp';
import { TerminalApp } from '../apps/TerminalApp';
import { AiAssistantApp } from '../apps/AiAssistantApp';
import { CameraApp } from '../apps/CameraApp';
import { GamesApp } from '../apps/GamesApp';
import { SettingsApp } from '../apps/SettingsApp';
import { RecruiterBriefApp } from '../apps/RecruiterBriefApp';
import { HRPolitelyApp } from '../apps/HRPolitelyApp';
import { ExperienceApp } from '../apps/ExperienceApp';
import { EducationApp } from '../apps/EducationApp';
import { CalendarApp } from '../apps/CalendarApp';
import { NotesApp } from '../apps/NotesApp';
import { AnalyticsLabApp } from '../apps/AnalyticsLabApp';
import { QuizApp } from '../apps/QuizApp';
import { FavoritesApp } from '../apps/FavoritesApp';
import { VideoPlayerApp } from '../apps/VideoPlayerApp';
import { TrashApp } from '../apps/TrashApp';
import { MusicApp } from '../apps/MusicApp';
import { FinderWindow } from '../mac/system/FinderWindow';
import { sound } from '../../utils/audioHaptics';

export const DesktopWindowManager: React.FC = () => {
  const { 
    windows, 
    closeDesktopWindow, 
    minimizeDesktopWindow, 
    maximizeDesktopWindow, 
    focusDesktopWindow, 
    updateWindowPosition, 
    activeDesktopWindowId 
  } = useDevice();

  const [draggingAppId, setDraggingAppId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const stopDragging = () => setDraggingAppId(null);
    window.addEventListener('mouseup', stopDragging);
    return () => window.removeEventListener('mouseup', stopDragging);
  }, []);

  const handleMouseDown = (appId: string, e: React.MouseEvent) => {
    focusDesktopWindow(appId);
    setDraggingAppId(appId);
    const win = windows[appId];
    setDragOffset({
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingAppId) return;
    const newX = Math.max(0, e.clientX - dragOffset.x);
    const newY = Math.max(28, e.clientY - dragOffset.y);
    updateWindowPosition(draggingAppId, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDraggingAppId(null);
  };

  const renderAppContent = (id: string) => {
    switch (id) {
      case 'about': return <AboutApp />;
      case 'projects': return <ProjectsApp />;
      case 'skills': return <SkillsApp />;
      case 'certificates': return <CertificatesApp />;
      case 'safari': return <SafariApp />;
      case 'photos': return <PhotosApp />;
      case 'mail': return <MailApp />;
      case 'terminal': return <TerminalApp />;
      case 'ai': return <AiAssistantApp />;
      case 'camera': return <CameraApp />;
      case 'games': return <GamesApp />;
      case 'settings': return <SettingsApp />;
      case 'recruiter': return <RecruiterBriefApp />;
      case 'hrpolitely': return <HRPolitelyApp />;
      case 'experience': return <ExperienceApp />;
      case 'education': return <EducationApp />;
      case 'calendar': return <CalendarApp />;
      case 'notes': return <NotesApp />;
      case 'analytics': return <AnalyticsLabApp />;
      case 'quiz': return <QuizApp />;
      case 'favorites': return <FavoritesApp />;
      case 'videos':
      case 'videoplayer': return <VideoPlayerApp />;
      case 'trash': return <TrashApp />;
      case 'music': return <MusicApp />;
      case 'finder': return <FinderWindow />;
      default: return <AboutApp />;
    }
  };

  return (
    <div 
      className="absolute inset-0 top-7 bottom-16 pointer-events-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {(Object.values(windows) as WindowState[]).map((win) => {
        if (!win.isOpen || win.isMinimized) return null;

        const isActive = activeDesktopWindowId === win.id;

        return (
          <div
            key={win.id}
            onClick={() => focusDesktopWindow(win.id)}
            style={{
              left: win.isMaximized ? 0 : win.position.x,
              top: win.isMaximized ? 0 : win.position.y,
              width: win.isMaximized ? '100%' : win.size.width,
              height: win.isMaximized ? '100%' : win.size.height,
              zIndex: win.zIndex
            }}
            className={`absolute pointer-events-auto flex flex-col rounded-[14px] overflow-hidden border transition-all duration-75 ${
              isActive
                ? 'border-black/20 shadow-[0_24px_60px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.4)]'
                : 'border-black/15 shadow-[0_16px_40px_rgba(0,0,0,0.22)] opacity-98'
            }`}
          >
            {/* macOS Window Titlebar */}
            <div
              onMouseDown={(e) => {
                if (!win.isMaximized && !(e.target as HTMLElement).closest('button')) {
                  handleMouseDown(win.id, e);
                }
              }}
              className="h-8.5 w-full bg-[#f3f4f6]/90 dark:bg-neutral-900/90 backdrop-blur-2xl border-b border-black/10 flex items-center justify-between px-3.5 select-none cursor-move shrink-0 text-neutral-800 dark:text-neutral-200"
            >
              {/* Traffic Lights */}
              <div className="flex items-center gap-2 group/lights">
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.tap();
                    closeDesktopWindow(win.id);
                  }}
                  className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center text-[8px] text-black/60 font-bold opacity-90 group-hover/lights:opacity-100 transition-opacity cursor-pointer shadow-xs"
                  title="Close"
                >
                  <span className="hidden group-hover/lights:inline leading-none">×</span>
                </button>
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.tap();
                    minimizeDesktopWindow(win.id);
                  }}
                  className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center text-[8px] text-black/60 font-bold opacity-90 group-hover/lights:opacity-100 transition-opacity cursor-pointer shadow-xs"
                  title="Minimize"
                >
                  <span className="hidden group-hover/lights:inline leading-none">−</span>
                </button>
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.tap();
                    maximizeDesktopWindow(win.id);
                  }}
                  className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center text-[8px] text-black/60 font-bold opacity-90 group-hover/lights:opacity-100 transition-opacity cursor-pointer shadow-xs"
                  title="Zoom"
                >
                  <span className="hidden group-hover/lights:inline leading-none">+</span>
                </button>
              </div>

              {/* Window Title */}
              <div className="font-medium text-[12.5px] text-neutral-700 dark:text-neutral-200 truncate max-w-xs sm:max-w-md tracking-tight">
                {win.title}
              </div>

              {/* Spacer for symmetry */}
              <div className="w-12" />
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-hidden bg-white/95 dark:bg-neutral-950/95 text-neutral-900 dark:text-neutral-100">
              {renderAppContent(win.id)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
