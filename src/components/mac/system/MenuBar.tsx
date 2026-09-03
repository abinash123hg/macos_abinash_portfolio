import React, { useState } from 'react';
import { 
  Wifi, 
  Search, 
  SlidersHorizontal, 
  Battery, 
  Volume2, 
  Mic, 
  Apple,
  Check
} from 'lucide-react';
import { sound } from '../../../utils/audioHaptics';

interface MenuBarProps {
  activeApp?: string;
  isControlCenterOpen: boolean;
  onToggleControlCenter: () => void;
  onOpenSpotlight?: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  activeApp = 'Finder',
  isControlCenterOpen,
  onToggleControlCenter,
  onOpenSpotlight
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menus = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

  const handleMenuClick = (menu: string) => {
    sound.tap();
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <header className="h-[25px] w-full bg-white/40 backdrop-blur-2xl border-b border-black/10 text-neutral-900 px-3 flex items-center justify-between text-[13px] font-medium select-none z-50 fixed top-0 left-0 right-0 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      {/* Left System Menus */}
      <div className="flex items-center gap-0.5">
        {/* Apple Logo Button */}
        <button
          onClick={() => handleMenuClick('apple')}
          className={`px-2 py-0.5 rounded-[4px] flex items-center justify-center transition-colors cursor-pointer ${
            activeMenu === 'apple' ? 'bg-black/15' : 'hover:bg-black/10'
          }`}
          aria-label="Apple Menu"
        >
          <Apple className="w-[14px] h-[14px] text-neutral-900 fill-current" />
        </button>

        {/* Current Active App Name */}
        <button
          onClick={() => handleMenuClick('app')}
          className={`px-2.5 py-0.5 rounded-[4px] font-bold text-[13px] transition-colors cursor-pointer ${
            activeMenu === 'app' ? 'bg-black/15' : 'hover:bg-black/10'
          }`}
        >
          {activeApp}
        </button>

        {/* App Menus */}
        {menus.map((menu) => (
          <button
            key={menu}
            onClick={() => handleMenuClick(menu)}
            className={`px-2 py-0.5 rounded-[4px] font-normal text-[13px] text-neutral-800 transition-colors cursor-pointer hidden sm:inline-block ${
              activeMenu === menu ? 'bg-black/15 font-medium' : 'hover:bg-black/10'
            }`}
          >
            {menu}
          </button>
        ))}
      </div>

      {/* Right Status Controls */}
      <div className="flex items-center gap-1 text-[12.5px] text-neutral-800">
        {/* Microphone Indicator (System Settings active indicator) */}
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] text-orange-600 bg-orange-500/15 border border-orange-500/20 font-medium text-[11px]">
          <Mic className="w-3 h-3 text-orange-600" />
        </div>

        {/* Battery */}
        <div className="px-1.5 py-0.5 rounded-[4px] hover:bg-black/10 transition-colors cursor-pointer flex items-center gap-1">
          <Battery className="w-4 h-4 text-neutral-800 stroke-[1.75]" />
          <span className="text-[11.5px] font-medium">100%</span>
        </div>

        {/* Wi-Fi Icon */}
        <button 
          onClick={() => {
            sound.tap();
            onToggleControlCenter();
          }}
          className="p-1 rounded-[4px] hover:bg-black/10 transition-colors cursor-pointer"
          aria-label="Wi-Fi"
        >
          <Wifi className="w-3.5 h-3.5 text-neutral-800 stroke-[2]" />
        </button>

        {/* Spotlight Search Icon */}
        <button
          onClick={() => {
            sound.tap();
            onOpenSpotlight?.();
          }}
          className="p-1 rounded-[4px] hover:bg-black/10 transition-colors cursor-pointer"
          aria-label="Spotlight"
        >
          <Search className="w-3.5 h-3.5 text-neutral-800 stroke-[2.2]" />
        </button>

        {/* Control Center Toggle Button (Dual switch icon) */}
        <button
          onClick={() => {
            sound.tap();
            onToggleControlCenter();
          }}
          className={`px-1.5 py-0.5 rounded-[4px] transition-colors cursor-pointer flex items-center justify-center ${
            isControlCenterOpen ? 'bg-black/20' : 'hover:bg-black/10'
          }`}
          aria-label="Control Center"
        >
          {/* Authentic macOS Control Center dual-pill icon */}
          <div className="w-[15px] h-[13px] border-[1.5px] border-neutral-800 rounded-[3px] flex flex-col justify-between p-[1px]">
            <div className="w-full h-[3px] bg-neutral-800 rounded-[1px]" />
            <div className="w-2/3 h-[3px] bg-neutral-800 rounded-[1px] self-end" />
          </div>
        </button>

        {/* Date & Time (Exact: "Tue Apr 1 9:41 AM") */}
        <div className="px-2 py-0.5 rounded-[4px] hover:bg-black/10 transition-colors cursor-pointer font-medium text-[12.5px] text-neutral-900 tracking-tight">
          Tue Apr 1 9:41 AM
        </div>
      </div>
    </header>
  );
};
