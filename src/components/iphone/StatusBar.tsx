import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Signal } from 'lucide-react';
import { useDevice } from '../../context/DeviceContext';
import { sound } from '../../utils/audioHaptics';

export interface StatusBarProps {
  onSwipeDownLeft?: () => void;
  onSwipeDownRight?: () => void;
  variant?: 'light' | 'dark' | 'auto';
}

export const StatusBar: React.FC<StatusBarProps> = ({
  onSwipeDownLeft,
  onSwipeDownRight,
  variant = 'auto',
}) => {
  const { settings } = useDevice();
  const [timeStr, setTimeStr] = useState('9:41');
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      if (!settings.use24HourClock) {
        hours = hours % 12 || 12;
      }
      const mStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setTimeStr(`${hours}:${mStr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [settings.use24HourClock]);

  const textColor = 'text-white';

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const startX = touchStartX.current;
    const screenWidth = window.innerWidth;

    if (deltaY > 25) {
      sound.tap();
      // Swipe down on right side or center -> Control Center
      if (startX > screenWidth * 0.45) {
        if (onSwipeDownRight) onSwipeDownRight();
      } else {
        if (onSwipeDownLeft) onSwipeDownLeft();
      }
    }
    touchStartY.current = null;
    touchStartX.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`w-full h-11 px-6 flex items-center justify-between text-xs z-40 select-none relative ${textColor} cursor-pointer bg-transparent`}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        color: '#ffffff',
        textShadow: '0 1px 2px rgba(0,0,0,0.65)',
      }}
    >
      {/* Left: Time (Interactive to trigger notification center) */}
      <button
        onClick={() => {
          sound.tap();
          if (onSwipeDownLeft) onSwipeDownLeft();
        }}
        title="Pull down for Notifications"
        className="font-semibold text-[14px] tracking-tight pl-1.5 hover:opacity-80 active:opacity-60 transition-opacity cursor-pointer flex items-center"
      >
        <span>{timeStr}</span>
      </button>

      {/* Right: Cellular, Wi-Fi, and Battery Status (Interactive to trigger Control Center) */}
      <button
        onClick={() => {
          sound.tap();
          if (onSwipeDownRight) onSwipeDownRight();
        }}
        title="Swipe down or tap for Control Center"
        className="flex items-center gap-1.5 text-[12px] pr-1.5 hover:opacity-80 active:opacity-60 transition-opacity cursor-pointer"
      >
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        
        {/* Battery Container */}
        <div className="flex items-center gap-1 ml-0.5">
          <span className="text-[11px] font-medium tracking-tighter tabular-nums">
            {settings.batteryLevel}%
          </span>
          <div className="relative w-5 h-2.5 rounded-[3.5px] border border-current p-0.5 flex items-center">
            <div
              className={`h-full rounded-[1.5px] transition-all ${
                settings.batteryLevel <= 20
                  ? 'bg-[#FF3B30]'
                  : settings.lowPowerMode
                  ? 'bg-[#FFCC00]'
                  : 'bg-[linear-gradient(90deg,#00d4ff_0%,#007aff_45%,#a855f7_100%)]'
              }`}
              style={{ width: `${Math.min(100, Math.max(10, settings.batteryLevel))}%` }}
            />
            <div className="absolute -right-1 top-0.5 w-0.5 h-1 bg-current rounded-r-xs" />
          </div>
        </div>
      </button>
    </div>
  );
};
