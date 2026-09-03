import React from 'react';
import { useDevice } from '../../context/DeviceContext';
import { sound } from '../../utils/audioHaptics';

export interface HomeBarProps {
  onSwipeUp?: () => void;
  className?: string;
  light?: boolean;
}

export const HomeBar: React.FC<HomeBarProps> = ({ onSwipeUp, className = '', light = false }) => {
  const { phoneScreen, setPhoneScreen, activeAppId, closeApp } = useDevice();

  const handleHomeClick = () => {
    sound.tap();
    if (onSwipeUp) {
      onSwipeUp();
      return;
    }

    if (activeAppId) {
      closeApp();
    } else if (phoneScreen === 'switcher' || phoneScreen === 'control_center' || phoneScreen === 'notifications') {
      setPhoneScreen('home');
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.tap();
    setPhoneScreen(phoneScreen === 'switcher' ? 'home' : 'switcher');
  };

  return (
    <div
      className={`w-full h-7 flex items-center justify-center cursor-pointer select-none z-50 group ${className}`}
      onClick={handleHomeClick}
      onContextMenu={handleContextMenu}
      title="Tap to go Home, Right-click for App Switcher"
    >
      <div
        className={`w-36 h-1.2 rounded-full transition-all duration-200 group-hover:scale-105 group-active:scale-95 ${
          light ? 'bg-black/60 group-hover:bg-black/80' : 'bg-white/70 group-hover:bg-white/90'
        } shadow-sm`}
      />
    </div>
  );
};
