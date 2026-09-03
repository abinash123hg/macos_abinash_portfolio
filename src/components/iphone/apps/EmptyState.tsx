import React, { ReactNode } from 'react';
import { IOSButton } from '../ui/IOSButton';

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 text-center my-auto min-h-[260px]">
      <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800/80 flex items-center justify-center text-neutral-400 dark:text-neutral-500 mb-4 shadow-xs">
        {icon}
      </div>
      <h3 className="text-[17px] font-semibold text-neutral-900 dark:text-white tracking-tight mb-1">
        {title}
      </h3>
      <p className="text-[13px] text-neutral-500 dark:text-neutral-400 max-w-[240px] leading-relaxed mb-5">
        {description}
      </p>
      {actionLabel && onAction && (
        <IOSButton variant="tinted" size="sm" onClick={onAction}>
          {actionLabel}
        </IOSButton>
      )}
    </div>
  );
};
