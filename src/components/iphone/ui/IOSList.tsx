import React, { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { sound } from '../../../utils/audioHaptics';

export interface IOSListItemProps {
  icon?: ReactNode;
  iconBg?: string;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  value?: string | ReactNode;
  control?: ReactNode;
  badge?: string | number;
  badgeColor?: string;
  chevron?: boolean;
  onClick?: () => void;
  destructive?: boolean;
  disabled?: boolean;
  className?: string;
}

export const IOSListItem: React.FC<IOSListItemProps> = ({
  icon,
  iconBg = 'bg-[#007AFF]',
  title,
  subtitle,
  value,
  control,
  badge,
  badgeColor = 'bg-[#FF3B30] text-white',
  chevron = false,
  onClick,
  destructive = false,
  disabled = false,
  className = ''
}) => {
  const handleClick = () => {
    if (disabled || !onClick) return;
    sound.tap();
    onClick();
  };

  const isInteractive = Boolean(onClick && !disabled);

  return (
    <div
      onClick={handleClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      className={`w-full min-h-[44px] px-3.5 py-2.5 flex items-center justify-between gap-3 transition-colors ${
        isInteractive ? 'cursor-pointer active:bg-neutral-200/60 dark:active:bg-neutral-800/60 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30' : ''
      } ${disabled ? 'opacity-40 pointer-events-none' : ''} ${className}`}
    >
      {/* Left: Icon and Label Group */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {icon && (
          <div className={`w-7 h-7 rounded-[7px] flex-shrink-0 flex items-center justify-center text-white shadow-xs ${iconBg}`}>
            {icon}
          </div>
        )}
        <div className="flex flex-col min-w-0 flex-1">
          <span className={`text-[15px] leading-tight font-normal truncate ${
            destructive ? 'text-[#FF3B30] font-medium' : 'text-neutral-900 dark:text-white'
          }`}>
            {title}
          </span>
          {subtitle && (
            <span className="text-[12px] text-neutral-500 dark:text-neutral-400 font-normal leading-tight mt-0.5 truncate">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Right: Value, Badge & Chevron */}
      <div className="flex items-center gap-1.5 flex-shrink-0 text-neutral-500 dark:text-neutral-400 text-[14px]">
        {value && <span className="text-right truncate max-w-[120px]">{value}</span>}
        {control}
        {badge !== undefined && (
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${badgeColor}`}>
            {badge}
          </span>
        )}
        {chevron && <ChevronRight className="w-4 h-4 text-neutral-400 dark:text-neutral-600 stroke-[2.5]" />}
      </div>
    </div>
  );
};

export interface IOSListProps {
  children: ReactNode;
  header?: string | ReactNode;
  footer?: string | ReactNode;
  className?: string;
  inset?: boolean;
}

export const IOSList: React.FC<IOSListProps> = ({
  children,
  header,
  footer,
  className = '',
  inset = true
}) => {
  return (
    <div className={`w-full flex flex-col mb-4 ${className}`}>
      {header && (
        <div className="px-3.5 pb-1.5 text-[12px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {header}
        </div>
      )}

      {/* Inset Grouped Container with Hairline Dividers */}
      <div className={`w-full bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800/90 shadow-xs divide-y divide-neutral-200/60 dark:divide-neutral-800/80 overflow-hidden ${
        inset ? 'rounded-[16px]' : 'rounded-none border-x-0'
      }`}>
        {children}
      </div>

      {footer && (
        <div className="px-3.5 pt-1.5 text-[11.5px] text-neutral-500 dark:text-neutral-400 font-normal leading-normal">
          {footer}
        </div>
      )}
    </div>
  );
};
