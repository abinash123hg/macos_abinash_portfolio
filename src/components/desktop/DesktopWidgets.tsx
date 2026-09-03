import React from 'react';
import { CloudSun } from 'lucide-react';

export const DesktopWidgets: React.FC = () => {
  return (
    <div className="absolute top-[182px] right-4 w-76 z-10 hidden lg:block select-none pointer-events-auto">
      {/* Weather in Bhubaneswar Widget - Kept exactly at original position */}
      <div className="p-3 rounded-[16px] bg-black/35 dark:bg-black/50 backdrop-blur-2xl border border-white/20 shadow-[0_16px_32px_rgba(0,0,0,0.3)] text-xs flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <CloudSun className="w-5 h-5 text-amber-400" />
          <div>
            <div className="font-semibold text-white text-[11.5px]">Bhubaneswar, Odisha</div>
            <div className="text-[10px] text-neutral-300">28°C • Clear Sky</div>
          </div>
        </div>
        <div className="text-[10.5px] font-mono text-cyan-300 font-bold">IST (UTC+5:30)</div>
      </div>
    </div>
  );
};

