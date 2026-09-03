import React, { ReactNode } from 'react';

export interface IOSCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: ReactNode;
  footer?: ReactNode;
  variant?: 'default' | 'glass' | 'solid' | 'tinted';
  className?: string;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const IOSCard: React.FC<IOSCardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  variant = 'glass',
  className = '',
  onClick,
  padding = 'md'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'solid':
        return 'bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm';
      case 'tinted':
        return 'bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/40 shadow-sm';
      case 'glass':
      default:
        return 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/70 dark:border-neutral-800/80 shadow-sm hover:shadow-md transition-shadow';
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'none': return 'p-0';
      case 'sm': return 'p-2.5';
      case 'lg': return 'p-5';
      case 'md':
      default: return 'p-4';
    }
  };

  const isClickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      className={`w-full rounded-[18px] overflow-hidden ${getVariantStyles()} ${
        isClickable ? 'cursor-pointer active:scale-[0.985] transition-all' : ''
      } ${className}`}
    >
      {(title || headerAction) && (
        <div className="px-4 pt-3.5 pb-2 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/60">
          <div>
            {title && (
              <h3 className="text-[15px] font-semibold text-neutral-900 dark:text-white tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-[12px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      <div className={getPaddingStyles()}>
        {children}
      </div>

      {footer && (
        <div className="px-4 py-2.5 bg-neutral-50/60 dark:bg-neutral-900/40 border-t border-neutral-100 dark:border-neutral-800/60 text-[12px] text-neutral-500 dark:text-neutral-400">
          {footer}
        </div>
      )}
    </div>
  );
};
