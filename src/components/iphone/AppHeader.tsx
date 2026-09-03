import React, { ReactNode } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  backText?: string;
  rightAction?: ReactNode;
  transparent?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  onBack,
  backText = 'Back',
  rightAction,
  transparent = false,
}) => {
  const handleBack = () => {
    sound.tap();
    onBack();
  };

  return (
    <div
      className={`w-full h-12 px-3 flex items-center justify-between z-30 select-none ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-2xl border-b border-neutral-200/60 dark:border-neutral-800/80'
      }`}
    >
      <button
        onClick={handleBack}
        className="flex items-center gap-0.5 text-[#007AFF] hover:text-[#0056B3] active:opacity-60 transition-opacity text-[15px] font-normal cursor-pointer py-1 px-1 rounded-md"
      >
        <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        <span className="truncate max-w-[80px]">{backText}</span>
      </button>

      <div className="flex flex-col items-center justify-center text-center px-1 overflow-hidden">
        <span className="font-semibold text-[16px] text-neutral-900 dark:text-white tracking-tight truncate max-w-[170px]">
          {title}
        </span>
        {subtitle && (
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal truncate max-w-[170px]">
            {subtitle}
          </span>
        )}
      </div>

      <div className="flex items-center justify-end min-w-[50px]">
        {rightAction ? (
          rightAction
        ) : (
          <button
            onClick={handleBack}
            className="w-7 h-7 rounded-full bg-neutral-200/70 dark:bg-neutral-800/80 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 active:scale-95 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
