import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';

interface MacTrafficLightsProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  className?: string;
}

export const MacTrafficLights: React.FC<MacTrafficLightsProps> = ({
  onClose,
  onMinimize,
  onMaximize,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`flex items-center gap-[7.5px] group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="w-[12px] h-[12px] rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center transition-transform active:scale-90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] cursor-pointer"
        aria-label="Close"
      >
        {isHovered && <X className="w-[7px] h-[7px] text-[#4d0000] stroke-[2.5]" />}
      </button>

      {/* Minimize Button */}
      <button
        onClick={onMinimize}
        className="w-[12px] h-[12px] rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center transition-transform active:scale-90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] cursor-pointer"
        aria-label="Minimize"
      >
        {isHovered && <Minus className="w-[7px] h-[7px] text-[#593900] stroke-[3]" />}
      </button>

      {/* Maximize / Zoom Button */}
      <button
        onClick={onMaximize}
        className="w-[12px] h-[12px] rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center transition-transform active:scale-90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] cursor-pointer"
        aria-label="Zoom"
      >
        {isHovered && <Plus className="w-[7px] h-[7px] text-[#004d0d] stroke-[3]" />}
      </button>
    </div>
  );
};
