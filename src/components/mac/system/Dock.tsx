import React, { useState } from 'react';
import { 
  Folder, 
  Compass, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Image, 
  Video, 
  Calendar, 
  Users, 
  CheckSquare, 
  FileText, 
  Music, 
  Radio, 
  Tv, 
  ShoppingBag, 
  Settings, 
  Trash2, 
  FolderDown,
  Sparkles
} from 'lucide-react';
import { sound } from '../../../utils/audioHaptics';

interface DockItem {
  id: string;
  name: string;
  gradient: string;
  icon: React.ReactNode;
  isOpen?: boolean;
}

interface DockProps {
  onAppClick?: (id: string) => void;
}

export const Dock: React.FC<DockProps> = ({ onAppClick }) => {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  // Classic macOS Sonoma / Sequoia Dock apps
  const dockApps: DockItem[] = [
    {
      id: 'finder',
      name: 'Finder',
      gradient: 'from-[#38bdf8] via-[#0ea5e9] to-[#0284c7]',
      icon: (
        <div className="w-full h-full flex items-center justify-center font-black text-white text-[16px] tracking-tighter">
          <Folder className="w-6 h-6 fill-white/30 text-white" />
        </div>
      ),
      isOpen: true,
    },
    {
      id: 'launchpad',
      name: 'Launchpad',
      gradient: 'from-neutral-700 to-neutral-900',
      icon: <Sparkles className="w-5 h-5 text-neutral-300" />,
      isOpen: false,
    },
    {
      id: 'safari',
      name: 'Safari',
      gradient: 'from-[#60a5fa] via-[#3b82f6] to-[#1d4ed8]',
      icon: <Compass className="w-6 h-6 text-white" />,
      isOpen: true,
    },
    {
      id: 'messages',
      name: 'Messages',
      gradient: 'from-[#4ade80] to-[#16a34a]',
      icon: <MessageSquare className="w-5 h-5 text-white fill-white/20" />,
      isOpen: false,
    },
    {
      id: 'mail',
      name: 'Mail',
      gradient: 'from-[#38bdf8] to-[#0284c7]',
      icon: <Mail className="w-5 h-5 text-white" />,
      isOpen: false,
    },
    {
      id: 'maps',
      name: 'Maps',
      gradient: 'from-[#fbbf24] via-[#f97316] to-[#dc2626]',
      icon: <MapPin className="w-5 h-5 text-white" />,
      isOpen: false,
    },
    {
      id: 'photos',
      name: 'Photos',
      gradient: 'from-[#f472b6] via-[#ec4899] to-[#db2777]',
      icon: <Image className="w-5 h-5 text-white" />,
      isOpen: false,
    },
    {
      id: 'facetime',
      name: 'FaceTime',
      gradient: 'from-[#4ade80] to-[#15803d]',
      icon: <Video className="w-5 h-5 text-white" />,
      isOpen: false,
    },
    {
      id: 'calendar',
      name: 'Calendar',
      gradient: 'from-[#f87171] to-[#dc2626]',
      icon: <Calendar className="w-5 h-5 text-white" />,
      isOpen: true,
    },
    {
      id: 'contacts',
      name: 'Contacts',
      gradient: 'from-[#a78bfa] to-[#7c3aed]',
      icon: <Users className="w-5 h-5 text-white" />,
      isOpen: false,
    },
    {
      id: 'reminders',
      name: 'Reminders',
      gradient: 'from-[#fb923c] to-[#ea580c]',
      icon: <CheckSquare className="w-5 h-5 text-white" />,
      isOpen: false,
    },
    {
      id: 'notes',
      name: 'Notes',
      gradient: 'from-[#facc15] to-[#ca8a04]',
      icon: <FileText className="w-5 h-5 text-neutral-900" />,
      isOpen: true,
    },
    {
      id: 'music',
      name: 'Music',
      gradient: 'from-[#f43f5e] via-[#e11d48] to-[#be123c]',
      icon: <Music className="w-5 h-5 text-white" />,
      isOpen: false,
    },
    {
      id: 'podcasts',
      name: 'Podcasts',
      gradient: 'from-[#c084fc] to-[#9333ea]',
      icon: <Radio className="w-5 h-5 text-white" />,
      isOpen: false,
    },
    {
      id: 'tv',
      name: 'TV',
      gradient: 'from-neutral-800 to-black',
      icon: <Tv className="w-5 h-5 text-white" />,
      isOpen: false,
    },
    {
      id: 'appstore',
      name: 'App Store',
      gradient: 'from-[#38bdf8] via-[#0284c7] to-[#0369a1]',
      icon: <ShoppingBag className="w-5 h-5 text-white" />,
      isOpen: false,
    },
    {
      id: 'settings',
      name: 'System Settings',
      gradient: 'from-[#94a3b8] to-[#64748b]',
      icon: <Settings className="w-5 h-5 text-white" />,
      isOpen: true,
    },
  ];

  return (
    <footer className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40 select-none">
      {/* Floating Translucent Glass Dock */}
      <div className="relative px-3 py-2 rounded-[22px] bg-white/30 backdrop-blur-3xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.25),0_0_0_0.5px_rgba(255,255,255,0.6)] flex items-end gap-2 transition-all">
        {/* Soft reflection line on Dock surface */}
        <div className="absolute inset-x-4 top-[1px] h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

        {/* Primary App Icons */}
        <div className="flex items-end gap-2.5">
          {dockApps.map((app) => (
            <div
              key={app.id}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              {/* Tooltip */}
              {hoveredApp === app.id && (
                <div className="absolute -top-9 px-2.5 py-1 rounded-[6px] bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-medium shadow-md whitespace-nowrap animate-in fade-in zoom-in-90 duration-100 z-50 pointer-events-none">
                  {app.name}
                </div>
              )}

              {/* Icon Squircle Button */}
              <button
                onClick={() => {
                  sound.tap();
                  onAppClick?.(app.id);
                }}
                className={`w-[46px] h-[46px] rounded-[11px] bg-gradient-to-br ${app.gradient} p-2 flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-transform duration-150 hover:scale-115 active:scale-95 cursor-pointer`}
              >
                {app.icon}
              </button>

              {/* Running Indicator Dot */}
              <div className="h-1.5 flex items-center justify-center mt-1">
                {app.isOpen && (
                  <span className="w-1 h-1 rounded-full bg-neutral-800 shadow-[0_0_2px_rgba(0,0,0,0.4)]" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] h-9 bg-black/15 mx-1 self-center" />

        {/* Right Section: Downloads Folder + Trash */}
        <div className="flex items-end gap-2.5">
          {/* Downloads Stack */}
          <div
            className="relative flex flex-col items-center group"
            onMouseEnter={() => setHoveredApp('downloads')}
            onMouseLeave={() => setHoveredApp(null)}
          >
            {hoveredApp === 'downloads' && (
              <div className="absolute -top-9 px-2.5 py-1 rounded-[6px] bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-medium shadow-md whitespace-nowrap z-50 pointer-events-none">
                Downloads
              </div>
            )}
            <button
              onClick={() => {
                sound.tap();
                onAppClick?.('downloads');
              }}
              className="w-[46px] h-[46px] rounded-[11px] bg-gradient-to-br from-[#38bdf8] to-[#0284c7] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:scale-115 active:scale-95 transition-transform cursor-pointer"
            >
              <FolderDown className="w-6 h-6 text-white" />
            </button>
            <div className="h-1.5 mt-1" />
          </div>

          {/* Trash */}
          <div
            className="relative flex flex-col items-center group"
            onMouseEnter={() => setHoveredApp('trash')}
            onMouseLeave={() => setHoveredApp(null)}
          >
            {hoveredApp === 'trash' && (
              <div className="absolute -top-9 px-2.5 py-1 rounded-[6px] bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-medium shadow-md whitespace-nowrap z-50 pointer-events-none">
                Trash
              </div>
            )}
            <button
              onClick={() => {
                sound.tap();
                onAppClick?.('trash');
              }}
              className="w-[46px] h-[46px] rounded-[11px] bg-white/50 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.12)] hover:scale-115 active:scale-95 transition-transform cursor-pointer"
            >
              <Trash2 className="w-5 h-5 text-neutral-700" />
            </button>
            <div className="h-1.5 mt-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
