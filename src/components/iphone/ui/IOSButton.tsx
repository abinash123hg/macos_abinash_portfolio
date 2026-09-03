import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { sound } from '../../../utils/audioHaptics';

export interface IOSButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'tinted' | 'gray' | 'plain' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export const IOSButton: React.FC<IOSButtonProps> = ({
  variant = 'primary',
  size = 'md',
  pill = false,
  fullWidth = false,
  icon,
  children,
  onClick,
  className = '',
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    sound.tap();
    if (onClick) onClick(e);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'tinted':
        return 'bg-[#007AFF]/15 text-[#007AFF] hover:bg-[#007AFF]/25 active:bg-[#007AFF]/30 dark:bg-[#007AFF]/25 dark:text-[#3897FF]';
      case 'gray':
        return 'bg-neutral-200/80 text-neutral-800 hover:bg-neutral-300 active:bg-neutral-400/80 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700';
      case 'plain':
        return 'bg-transparent text-[#007AFF] hover:bg-neutral-100/50 active:opacity-60 dark:text-[#3897FF] dark:hover:bg-neutral-800/40';
      case 'destructive':
        return 'bg-[#FF3B30] text-white hover:bg-[#E02D24] active:bg-[#C9251D] shadow-sm';
      case 'primary':
      default:
        return 'bg-[#007AFF] text-white hover:bg-[#0069D9] active:bg-[#0056B3] shadow-sm shadow-[#007AFF]/25';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-8 px-3 text-[13px] font-medium gap-1.5';
      case 'lg':
        return 'h-12 px-6 text-[16px] font-semibold gap-2.5';
      case 'md':
      default:
        return 'h-10 px-4 text-[14.5px] font-medium gap-2';
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center select-none active:scale-[0.98] transition-all cursor-pointer ${
        pill ? 'rounded-full' : 'rounded-[12px]'
      } ${fullWidth ? 'w-full' : ''} ${getVariantClasses()} ${getSizeClasses()} ${
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </button>
  );
};
