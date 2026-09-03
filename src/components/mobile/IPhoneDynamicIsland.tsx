import React from 'react';
import { useDevice } from '../../context/DeviceContext';
import { 
  Sparkles, 
  Camera, 
  CheckCircle2, 
  ShieldAlert, 
  Radio, 
  BatteryCharging, 
  Wifi, 
  Volume2 
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export const IPhoneDynamicIsland: React.FC = () => {
  const { dynamicIsland, setDynamicIslandExpanded, activeAppId } = useDevice();

  const handleClick = () => {
    sound.cameraControlClick();
    setDynamicIslandExpanded(!dynamicIsland.expanded);
  };

  const isExpanded = dynamicIsland.expanded;

  return (
    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
      <div
        onClick={handleClick}
        className={`bg-black text-white transition-all duration-300 ease-out shadow-2xl flex items-center justify-between cursor-pointer border border-neutral-900 ${
          isExpanded
            ? 'w-76 min-h-14 rounded-3xl p-3 px-4'
            : 'w-28 h-7.5 rounded-full px-3'
        }`}
      >
        {!isExpanded ? (
          /* Collapsed Pill */
          <div className="w-full flex items-center justify-between text-[10px]">
            {/* Left Dot Sensor */}
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-500/40" />
            </div>

            {/* Right Status Icon */}
            {dynamicIsland.mode === 'camera' || activeAppId === 'camera' ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ) : dynamicIsland.mode === 'ai' ? (
              <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-neutral-900" />
            )}
          </div>
        ) : (
          /* Expanded Island View */
          <div className="w-full flex items-center justify-between text-xs animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                {dynamicIsland.mode === 'camera' ? (
                  <Camera className="w-4 h-4" />
                ) : dynamicIsland.mode === 'ai' ? (
                  <Sparkles className="w-4 h-4" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <div>
                <div className="font-bold text-white text-xs">{dynamicIsland.title || 'Abinash OS 15.4'}</div>
                <div className="text-[10px] text-neutral-400">{dynamicIsland.subtitle || 'Neural Processing Active'}</div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800">
              Live
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
