import React, { useState } from 'react';
import { Search, X, FolderGit2, Award, Cpu, User, Mail, Compass, Terminal, Sparkles, Radio, FileSpreadsheet } from 'lucide-react';
import { useDevice } from '../../context/DeviceContext';
import { sound } from '../../utils/audioHaptics';

export interface SpotlightProps {
  onClose: () => void;
}

type AppIcon = React.ComponentType<{ className?: string }>;
type AppItem = readonly [id: string, name: string, icon: AppIcon];

const APP_ITEMS: readonly AppItem[] = [
  ['about', 'About', User], ['projects', 'Projects', FolderGit2], ['skills', 'Skills', Cpu],
  ['certificates', 'Certificates', Award], ['experience', 'Experience', User], ['education', 'Education', User],
  ['analytics', 'Analytics', FileSpreadsheet], ['recruiter', 'Recruiter', Radio], ['camera', 'Camera', Radio],
  ['games', 'Games', Sparkles], ['calendar', 'Calendar', Radio], ['favourites', 'Favorites', Award],
  ['music', 'Music', Radio], ['videos', 'Videos', FileSpreadsheet], ['quiz', 'Quiz', Sparkles],
  ['resume', 'Resume', FileSpreadsheet], ['cv', 'CV', FileSpreadsheet], ['notes', 'Notes', FileSpreadsheet],
  ['finder', 'Files', FolderGit2], ['settings', 'Settings', Cpu], ['gallery', 'Gallery', User],
  ['chatbot', 'Chatbot', Sparkles], ['contact', 'Contact', User], ['safari', 'Safari', Compass],
  ['mail', 'Mail', Mail], ['ai', 'Abinash AI', Sparkles], ['system', 'System Info', Cpu],
  ['trash', 'Trash', FolderGit2], ['phone', 'Phone', Radio], ['messages', 'Messages', Mail],
  ['weather', 'Weather', Radio], ['clock', 'Clock', Radio], ['calculator', 'Calculator', FileSpreadsheet],
  ['maps', 'Maps', Compass], ['wallet', 'Wallet', FileSpreadsheet], ['reminders', 'Reminders', FileSpreadsheet],
  ['files', 'Files Utility', FolderGit2], ['voice', 'Voice Memos', Radio], ['journal', 'Journal', FileSpreadsheet],
  ['shortcuts', 'Shortcuts', Sparkles], ['terminal', 'Terminal', Terminal],
];

export const Spotlight: React.FC<SpotlightProps> = ({ onClose }) => {
  const { openApp } = useDevice();
  const [query, setQuery] = useState('');
  const normalizedQuery = query.toLowerCase().trim();
  const matchedApps = APP_ITEMS.filter(([, name]) => name.toLowerCase().includes(normalizedQuery));

  const handleLaunch = (appId: string) => {
    sound.appOpen();
    openApp(appId);
    onClose();
  };

  const visibleApps = normalizedQuery ? matchedApps : APP_ITEMS;

  return (
    <div className="ios-spotlight absolute inset-0 z-50 bg-black/60 backdrop-blur-3xl p-4 flex flex-col justify-start select-none font-sans text-white animate-in fade-in zoom-in-95 duration-200">
      <div className="w-full flex items-center gap-2 mb-4 pt-[calc(.5rem+env(safe-area-inset-top,0px))]">
        <div className="flex-1 min-h-11 px-3.5 rounded-2xl bg-white/15 backdrop-blur-2xl border border-white/20 flex items-center gap-2 text-white shadow-lg">
          <Search className="w-4 h-4 text-white/60 flex-shrink-0" />
          <input type="text" placeholder="Search apps" value={query} onChange={(event) => setQuery(event.target.value)} autoFocus className="w-full bg-transparent border-none outline-none text-[15px] placeholder-white/50 text-white" />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Clear search" className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white cursor-pointer">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        <button onClick={() => { sound.tap(); onClose(); }} className="min-h-11 px-2 text-[#007AFF] hover:text-[#3897FF] font-medium text-[15px] cursor-pointer">Cancel</button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-10">
        <span className="text-[12px] font-semibold uppercase tracking-wider text-white/50 px-1 mb-2 block">{normalizedQuery ? 'Apps' : 'Installed Apps'}</span>
        {normalizedQuery && visibleApps.length === 0 ? (
          <div className="py-12 text-center text-sm text-white/50">No apps found</div>
        ) : (
          <div className="grid grid-cols-4 gap-2.5">
            {visibleApps.map(([id, name, Icon]) => (
              <button key={id} onClick={() => handleLaunch(id)} className="min-h-24 p-2 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a84ff]">
                <span className="w-10 h-10 rounded-[22%] bg-white/10 flex items-center justify-center shadow-xs"><Icon className="w-5 h-5 text-white/90" /></span>
                <span className="text-[11px] font-medium text-white/90 truncate max-w-full">{name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
