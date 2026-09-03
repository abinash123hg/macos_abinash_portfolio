import React from 'react';
import { useDevice } from '../../context/DeviceContext';
import { X, ArrowUp } from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export const IPhoneAppSwitcher: React.FC = () => {
  const { recentApps, openApp, closeRecentApp, setPhoneScreen } = useDevice();

  return (
    <div className="h-full w-full bg-black/80 backdrop-blur-2xl p-6 pt-16 flex flex-col justify-between select-none">
      <div className="text-center text-xs font-semibold text-neutral-400 uppercase tracking-wider">
        App Switcher • Swipe Up to Close
      </div>

      {/* App Cards Carousel */}
      <div className="flex-1 flex items-center justify-center gap-4 overflow-x-auto p-4 snap-x">
        {recentApps.map((appId) => (
          <div
            key={appId}
            className="w-56 h-88 rounded-2xl bg-neutral-900 border border-neutral-700 shadow-2xl flex flex-col overflow-hidden shrink-0 snap-center relative group"
          >
            {/* Top Bar of card */}
            <div className="p-3 bg-neutral-850 border-b border-neutral-750 flex items-center justify-between">
              <span className="font-bold text-xs capitalize text-white">{appId}</span>
              <button
                onClick={() => {
                  sound.tap();
                  closeRecentApp(appId);
                }}
                className="p-1 rounded-full bg-neutral-700 hover:bg-red-500 hover:text-white text-neutral-300 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Click to activate */}
            <div
              onClick={() => openApp(appId)}
              className="flex-1 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-neutral-800/50 transition-colors"
            >
              <div className="text-xs text-neutral-400 font-medium">Tap to Switch</div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pb-4">
        <button
          onClick={() => setPhoneScreen('home')}
          className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          Tap to return to Home
        </button>
      </div>
    </div>
  );
};
