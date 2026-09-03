import React, { ReactNode } from 'react';
import { ChevronLeft, X, Share2, MoreHorizontal } from 'lucide-react';
import { useDevice } from '../../../context/DeviceContext';
import { sound } from '../../../utils/audioHaptics';

export interface AppWindowProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  headerRight?: ReactNode;
  onBack?: () => void;
  backLabel?: string;
  showBackButton?: boolean;
  backgroundClass?: string;
  headerClass?: string;
  noPadding?: boolean;
  searchBar?: ReactNode;
  bottomBar?: ReactNode;
}

export const AppWindow: React.FC<AppWindowProps> = ({
  title,
  subtitle,
  icon,
  children,
  headerRight,
  onBack,
  backLabel = 'Back',
  showBackButton = true,
  backgroundClass = 'bg-[#F2F2F7] dark:bg-[#000000]',
  headerClass = 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-2xl border-b border-neutral-200/60 dark:border-neutral-800/80',
  noPadding = false,
  searchBar,
  bottomBar
}) => {
  const { closeApp } = useDevice();

  const handleBack = () => {
    sound.tap();
    if (onBack) {
      onBack();
    } else {
      closeApp();
    }
  };

  return (
    <div className={`w-full h-full flex flex-col ${backgroundClass} text-neutral-900 dark:text-white select-none overflow-hidden font-sans relative`}>
      {/* iOS 18 Translucent Navigation Bar (48px standard iOS height) */}
      <header className={`w-full h-12 flex-shrink-0 px-3 flex items-center justify-between z-30 select-none ${headerClass}`}>
        {/* Left: Back / Close Action */}
        <div className="flex items-center min-w-[70px]">
          {showBackButton && (
            <button
              onClick={handleBack}
              aria-label="Go Back"
              className="flex items-center gap-0.5 text-[#007AFF] hover:text-[#0056B3] active:opacity-60 transition-opacity font-normal text-[15px] -ml-1 cursor-pointer py-1 px-1.5 rounded-lg active:bg-neutral-200/40 dark:active:bg-neutral-800/40"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              <span className="truncate max-w-[80px]">{backLabel}</span>
            </button>
          )}
        </div>

        {/* Center: Title & Optional Subtitle */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-1 overflow-hidden">
          <div className="flex items-center gap-1.5 justify-center max-w-full">
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <h1 className="font-semibold text-[16px] text-neutral-900 dark:text-white tracking-tight truncate">
              {title}
            </h1>
          </div>
          {subtitle && (
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal leading-tight truncate max-w-full">
              {subtitle}
            </span>
          )}
        </div>

        {/* Right: Custom Action or Spacer */}
        <div className="flex items-center justify-end min-w-[70px] gap-1">
          {headerRight ? (
            headerRight
          ) : (
            <button
              onClick={handleBack}
              aria-label="Close"
              className="w-7 h-7 rounded-full bg-neutral-200/70 dark:bg-neutral-800/80 hover:bg-neutral-300 dark:hover:bg-neutral-700 active:scale-95 transition-all flex items-center justify-center text-neutral-600 dark:text-neutral-300 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* Optional Integrated Search Bar (iOS Style) */}
      {searchBar && (
        <div className="w-full px-4 py-2 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50 z-20">
          {searchBar}
        </div>
      )}

      {/* Scrollable Content Container */}
      <main className={`flex-1 w-full overflow-y-auto overflow-x-hidden ${noPadding ? '' : 'p-4 pb-12'} transition-colors`}>
        {children}
      </main>

      {/* Optional iOS Bottom Tab Bar / Action Bar */}
      {bottomBar && (
        <footer className="w-full flex-shrink-0 z-30 bg-white/85 dark:bg-neutral-900/85 backdrop-blur-2xl border-t border-neutral-200/60 dark:border-neutral-800/80">
          {bottomBar}
        </footer>
      )}
    </div>
  );
};
