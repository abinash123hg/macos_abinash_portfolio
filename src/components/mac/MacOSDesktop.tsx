import React, { useState } from 'react';
import { DesktopBackground } from './system/DesktopBackground';
import { MenuBar } from './system/MenuBar';
import { FinderWindow } from './system/FinderWindow';
import { Dock } from './system/Dock';
import { ControlCenter } from './system/ControlCenter';
import { HardDrive, Folder, FileText, Image as ImageIcon } from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export const MacOSDesktop: React.FC = () => {
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(true);
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState<string | null>(null);

  // Desktop icons on the top right
  const desktopIcons = [
    { id: 'hd', name: 'Macintosh HD', icon: <HardDrive className="w-8 h-8 text-neutral-300 stroke-[1.5]" /> },
    { id: 'work', name: 'Work', icon: <Folder className="w-8 h-8 text-[#0091ff] fill-[#0091ff]/30 stroke-[1.5]" /> },
    { id: 'projects', name: 'Projects', icon: <Folder className="w-8 h-8 text-[#0091ff] fill-[#0091ff]/30 stroke-[1.5]" /> },
    { id: 'notes-txt', name: 'Notes.txt', icon: <FileText className="w-8 h-8 text-white/90 stroke-[1.5]" /> },
  ];

  return (
    <DesktopBackground>
      <div 
        className="w-full h-full relative overflow-hidden flex flex-col justify-between"
        onClick={() => {
          if (isControlCenterOpen) setIsControlCenterOpen(false);
          setSelectedDesktopIcon(null);
        }}
      >
        {/* Top Menu Bar */}
        <MenuBar
          activeApp="Finder"
          isControlCenterOpen={isControlCenterOpen}
          onToggleControlCenter={() => setIsControlCenterOpen(!isControlCenterOpen)}
        />

        {/* Right Desktop Icons Grid */}
        <div className="absolute top-10 right-4 flex flex-col gap-5 select-none z-10">
          {desktopIcons.map((item) => {
            const isSelected = selectedDesktopIcon === item.id;
            return (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  sound.tap();
                  setSelectedDesktopIcon(item.id);
                  setIsFinderOpen(true);
                }}
                className={`flex flex-col items-center gap-1 p-1.5 rounded-[6px] cursor-pointer group transition-colors ${
                  isSelected ? 'bg-black/25 backdrop-blur-xs' : 'hover:bg-black/10'
                }`}
              >
                <div className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  {item.icon}
                </div>
                <span
                  className={`text-[11.5px] font-medium text-white px-1.5 py-0.5 rounded-[4px] leading-tight text-center max-w-[85px] truncate filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
                    isSelected ? 'bg-[#007aff] text-white shadow-xs' : ''
                  }`}
                >
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center: Finder / iCloud Drive Window */}
        <div className="flex-1 flex items-center justify-center p-4 z-20 pointer-events-auto">
          {isFinderOpen && (
            <FinderWindow />
          )}
        </div>

        {/* Control Center Overlay */}
        <ControlCenter
          isOpen={isControlCenterOpen}
          onClose={() => setIsControlCenterOpen(false)}
        />

        {/* Bottom Dock */}
        <Dock
          onAppClick={(id) => {
            if (id === 'finder') setIsFinderOpen(true);
            if (id === 'settings') setIsControlCenterOpen(true);
          }}
        />
      </div>
    </DesktopBackground>
  );
};
