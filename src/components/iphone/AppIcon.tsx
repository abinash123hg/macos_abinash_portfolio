import React from 'react';
import { sound } from '../../utils/audioHaptics';

export interface AppIconProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  gradient?: string;
  badge?: number | string;
  onClick: () => void;
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
  size = 'md',
  showLabel = true,
}) => {
  const handleClick = () => {
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
      aria-label={`Open ${name}`}
      className="flex flex-col items-center justify-start gap-1.5 focus:outline-none group active:scale-[0.88] transition-transform duration-200 cursor-pointer select-none"
    >
      {/* iOS 18 Squircle Icon Container with subtle bevel and shadow */}
      <div
        className={`relative ${container} bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md shadow-black/25 ring-1 ring-white/20 group-hover:brightness-105 transition-all overflow-hidden`}
        style={{
          boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
        }}
      >
        {/* Subtle Top-left Specular Glass Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />

        {/* Icon Glyph */}
        <div className="relative z-10 drop-shadow-sm flex items-center justify-center">
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
          className="text-[11.5px] font-medium text-white tracking-tight text-center truncate max-w-[68px] leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
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
