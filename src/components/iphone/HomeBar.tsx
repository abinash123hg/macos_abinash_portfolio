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
  const touchStartY = React.useRef<number | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = (e.changedTouches[0]?.clientY ?? touchStartY.current) - touchStartY.current;
    touchStartY.current = null;
    if (deltaY < -24 && onSwipeUp) {
      sound.tap();
      onSwipeUp();
    }
  };

  return (
    <div
      className={`ios-home-indicator w-full min-h-11 flex items-center justify-center cursor-pointer select-none z-50 group ${className}`}
      onClick={handleHomeClick}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      title="Tap to go Home, Right-click for App Switcher"
    />
  );
};
