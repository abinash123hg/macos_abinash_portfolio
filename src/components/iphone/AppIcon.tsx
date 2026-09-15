import React, { useEffect } from 'react';
import { sound } from '../../utils/audioHaptics';

export interface AppIconProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  gradient?: string;
  badge?: number | string;
  onClick: () => void;
  onLongPress?: () => void;
  isEditing?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const AppIconComponent: React.FC<AppIconProps> = ({
  id,
  name,
  icon,
  gradient = 'from-blue-500 to-indigo-600',
  badge,
  onClick,
  onLongPress,
  isEditing = false,
  size = 'md',
  showLabel = true,
}) => {
  const longPressTimerRef = React.useRef<number | null>(null);
  const longPressTriggeredRef = React.useRef(false);

  const clearLongPress = () => {
    if (longPressTimerRef.current !== null) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handlePressStart = () => {
    longPressTriggeredRef.current = false;
    clearLongPress();
    longPressTimerRef.current = window.setTimeout(() => {
      longPressTriggeredRef.current = true;
      sound.tap();
      onLongPress?.();
    }, 1000);
  };

  useEffect(() => clearLongPress, []);

  const handleClick = () => {
    if (longPressTriggeredRef.current) {
      longPressTriggeredRef.current = false;
      return;
    }
    sound.appOpen();
    onClick();
  };

  // Dimensions for standard iOS 18 icons (~60px on homescreen, ~52px in dock)
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'w-12 h-12 rounded-[13px]',
          iconSize: 'w-6 h-6',
        };
      case 'lg':
        return {
          container: 'w-16 h-16 rounded-[17px]',
          iconSize: 'w-8 h-8',
        };
      case 'md':
      default:
        return {
          container: 'w-[58px] h-[58px] rounded-[15px]',
          iconSize: 'w-7 h-7',
        };
    }
  };

  const { container } = getSizeStyles();

  return (
    <button
      id={`app-icon-${id}`}
      onClick={handleClick}
      onPointerDown={handlePressStart}
      onPointerUp={clearLongPress}
      onPointerCancel={clearLongPress}
      onPointerLeave={clearLongPress}
      aria-label={`Open ${name}`}
      className={`ios-app-icon flex flex-col items-center justify-start gap-1.5 focus:outline-none group active:scale-[0.92] transition-transform duration-200 ease-out cursor-pointer select-none ${isEditing ? 'ios-app-icon--editing' : ''}`}
    >
      {/* iOS 18 Squircle Icon Container with subtle bevel and shadow */}
      <div
        className={`ios-app-icon__surface relative ${container} bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-[0_8px_18px_rgba(0,0,0,0.22)] ring-1 ring-white/15 group-hover:brightness-105 transition-all overflow-hidden`}
        style={{
          boxShadow: '0 8px 18px -4px rgba(0, 0, 0, 0.28), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
        }}
      >
        {/* Subtle Top-left Specular Glass Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />

        {/* Icon Glyph */}
        <div className="ios-app-icon__glyph relative z-10 drop-shadow-sm flex items-center justify-center">
          {icon}
        </div>

        {/* Notification Badge */}
        {badge !== undefined && (
          <div className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-[#FF3B30] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md border-2 border-neutral-900 z-20">
            {badge}
          </div>
        )}
      </div>

      {/* App Label */}
      {showLabel && (
        <span
          className="ios-app-icon__label text-[11.5px] font-medium text-white tracking-tight text-center truncate max-w-[68px] leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}
        >
          {name}
        </span>
      )}
    </button>
  );
};

export const AppIcon = React.memo(AppIconComponent);
