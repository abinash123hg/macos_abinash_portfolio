import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { useDevice } from '../../context/DeviceContext';
import { sound } from '../../utils/audioHaptics';
import cvPdf from '../../assets/CV/cv (4).pdf';
import {
  SquircleDefs,
  MacintoshHDIcon,
  ProjectsFolderIcon,
  CertificationsIcon,
  MailPostageStampIcon,
  PhotosLibraryIcon,
  ICloudDriveIcon,
  AnalyticsLabIcon,
  TimelineCalendarIcon,
  AskAbinashAIIcon,
  CinemaFavoritesIcon,
  WorkHistoryIcon,
  EngineeringNotesIcon,
  GameCenterIcon,
  AppleMusicIcon,
  RecruiterBriefIcon,
  AcademicsGradCapIcon,
  TerminalZshIcon,
  HrPolitelyContactsIcon,
  SystemSettingsIcon,
  AboutAbinashIcon,
  SkillsStackIcon,
} from './MacOSDesktopIcons';

interface DesktopIconItem {
  id: string;
  appId: string;
  name: string;
  category: 'system' | 'portfolio' | 'tools' | 'files';
  icon: React.ReactNode;
}

export const DesktopIconsHome: React.FC = () => {
  const { openDesktopWindow, focusDesktopWindow, windows } = useDevice();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Keep every existing portfolio shortcut available on the desktop.
  const desktopIcons: DesktopIconItem[] = [
    {
      id: 'machd',
      appId: 'finder',
      name: 'Macintosh HD',
      category: 'system',
      icon: <MacintoshHDIcon />,
    },
    {
      id: 'projects',
      appId: 'projects',
      name: 'Projects & Models',
      category: 'portfolio',
      icon: <ProjectsFolderIcon />,
    },
    { id: 'certificates', appId: 'certificates', name: 'Certifications', category: 'portfolio', icon: <CertificationsIcon /> },
    { id: 'mail', appId: 'mail', name: 'Mail Contact', category: 'tools', icon: <MailPostageStampIcon /> },
    { id: 'photos', appId: 'photos', name: 'Photos Library', category: 'portfolio', icon: <PhotosLibraryIcon /> },
    {
      id: 'icloud',
      appId: 'finder',
      name: 'iCloud Drive',
      category: 'system',
      icon: <ICloudDriveIcon />,
    },
    { id: 'analytics', appId: 'analytics', name: 'Analytics Lab', category: 'portfolio', icon: <AnalyticsLabIcon /> },
    { id: 'calendar', appId: 'calendar', name: 'Timeline & Events', category: 'portfolio', icon: <TimelineCalendarIcon /> },
    { id: 'ai', appId: 'ai', name: 'Ask Abinash AI', category: 'tools', icon: <AskAbinashAIIcon /> },
    { id: 'favorites', appId: 'favorites', name: 'Cinema Favorites', category: 'portfolio', icon: <CinemaFavoritesIcon /> },
    { id: 'uploaded-cv', appId: 'cv-pdf', name: 'CV.pdf', category: 'files', icon: <FileText className="h-12 w-12 text-blue-300 drop-shadow-[0_3px_5px_rgba(0,0,0,.45)]" /> },
    { id: 'experience', appId: 'experience', name: 'Work History', category: 'portfolio', icon: <WorkHistoryIcon /> },
    { id: 'notes', appId: 'notes', name: 'Engineering Notes', category: 'portfolio', icon: <EngineeringNotesIcon /> },
    { id: 'games', appId: 'games', name: 'Game Center', category: 'tools', icon: <GameCenterIcon /> },
    { id: 'music', appId: 'music', name: 'Apple Music', category: 'tools', icon: <AppleMusicIcon /> },
    { id: 'recruiter', appId: 'recruiter', name: 'Recruiter Brief', category: 'portfolio', icon: <RecruiterBriefIcon /> },
    { id: 'education', appId: 'education', name: 'Academics & CGPA', category: 'portfolio', icon: <AcademicsGradCapIcon /> },
    { id: 'terminal', appId: 'terminal', name: 'Terminal zsh', category: 'tools', icon: <TerminalZshIcon /> },
    { id: 'hrpolitely', appId: 'hrpolitely', name: 'HR Politely', category: 'portfolio', icon: <HrPolitelyContactsIcon /> },
    {
      id: 'settings',
      appId: 'settings',
      name: 'System Settings',
      category: 'system',
      icon: <SystemSettingsIcon />,
    },
    { id: 'about', appId: 'about', name: 'About Abinash', category: 'portfolio', icon: <AboutAbinashIcon /> },
    { id: 'skills', appId: 'skills', name: 'Skills & Stack', category: 'portfolio', icon: <SkillsStackIcon /> },
  ];

  const handleLaunch = (item: DesktopIconItem) => {
    sound.tap();
    if (item.id === 'uploaded-cv') {
      window.open(cvPdf, '_blank', 'noopener,noreferrer');
      return;
    }
    const appId = item.appId;
    const win = windows[appId];
    if (win && win.isOpen) {
      focusDesktopWindow(appId);
    } else {
      openDesktopWindow(appId);
    }
  };

  return (
    <>
      <SquircleDefs />
      <div 
        className="absolute top-10 right-8 z-10 select-none pointer-events-auto grid grid-cols-4 gap-y-5 gap-x-5 p-2 w-max"
        onClick={() => setSelectedId(null)}
      >
        {desktopIcons.map((item) => {
          const isSelected = selectedId === item.id;

          return (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(item.id);
                handleLaunch(item);
              }}
              className={`w-[88px] p-2 rounded-[8px] flex flex-col items-center gap-2 cursor-pointer transition-all ${
                isSelected ? 'bg-black/25 backdrop-blur-xs ring-1 ring-white/30' : 'hover:bg-white/10'
              }`}
            >
              {/* Authentic Apple macOS Icon */}
              <div className="transition-transform duration-200 hover:scale-105 active:scale-95 flex items-center justify-center">
                {item.icon}
              </div>

              {/* Textual Label under each icon */}
              <span
                className={`text-[11px] font-medium text-white px-1.5 py-0.5 rounded-[4px] leading-tight text-center truncate max-w-[80px] filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] ${
                  isSelected ? 'bg-[#007aff] text-white shadow-xs font-semibold' : ''
                }`}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};
