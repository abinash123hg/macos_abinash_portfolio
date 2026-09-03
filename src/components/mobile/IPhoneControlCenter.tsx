import React from 'react';
import { useDevice } from '../../context/DeviceContext';
import { 
  Wifi, 
  Bluetooth, 
  Plane, 
  Flashlight, 
  Sun, 
  Volume2, 
  Moon, 
  Music, 
  Sparkles, 
  X 
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export const IPhoneControlCenter: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { settings, updateSettings, toggleFlashlight } = useDevice();

  return (
    <div className="h-full w-full bg-black/85 backdrop-blur-2xl p-5 pt-14 flex flex-col justify-between select-none text-white overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Control Center</span>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3 flex-1">
        {/* Network 2x2 Block */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                sound.tap();
                updateSettings({ wifiEnabled: !settings.wifiEnabled });
              }}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                settings.wifiEnabled ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              <Wifi className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                sound.tap();
                updateSettings({ bluetoothEnabled: !settings.bluetoothEnabled });
              }}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                settings.bluetoothEnabled ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              <Bluetooth className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                sound.tap();
                updateSettings({ airplaneMode: !settings.airplaneMode });
              }}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                settings.airplaneMode ? 'bg-amber-600 text-white' : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              <Plane className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                sound.tap();
                void toggleFlashlight();
              }}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                settings.flashlightOn ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              <Flashlight className="w-5 h-5" />
            </button>
          </div>

          {/* Now Playing Widget */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-cyan-400">
              <span className="font-semibold">Neural Audio</span>
              <Music className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white truncate">Abinash AI Insights</div>
              <div className="text-[10px] text-neutral-400">Centurion University Podcast</div>
            </div>
          </div>
        </div>

        {/* Dual Sliders: Brightness & Volume */}
        <div className="grid grid-cols-2 gap-3 h-36">
          {/* Brightness */}
          <div className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col justify-between items-center relative overflow-hidden">
            <div 
              className="absolute bottom-0 inset-x-0 bg-white/25 transition-all pointer-events-none"
              style={{ height: `${settings.brightness ?? 90}%` }}
            />
            <Sun className="w-5 h-5 text-amber-400 relative z-10 mt-1" />
            <input
              type="range"
              min="20"
              max="100"
              value={settings.brightness ?? 90}
              onChange={(e) => updateSettings({ brightness: Number(e.target.value) })}
              className="w-full opacity-0 absolute inset-0 cursor-pointer h-full z-20"
            />
            <span className="text-[11px] font-bold relative z-10 font-mono mb-1">{settings.brightness ?? 90}%</span>
          </div>

          {/* Volume */}
          <div className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col justify-between items-center relative overflow-hidden">
            <div 
              className="absolute bottom-0 inset-x-0 bg-white/25 transition-all pointer-events-none"
              style={{ height: `${settings.volume ?? 75}%` }}
            />
            <Volume2 className="w-5 h-5 text-emerald-400 relative z-10 mt-1" />
            <input
              type="range"
              min="0"
              max="100"
              value={settings.volume ?? 75}
              onChange={(e) => updateSettings({ volume: Number(e.target.value) })}
              className="w-full opacity-0 absolute inset-0 cursor-pointer h-full z-20"
            />
            <span className="text-[11px] font-bold relative z-10 font-mono mb-1">{settings.volume ?? 75}%</span>
          </div>
        </div>

        {/* Focus & Dark Mode Bottom Row */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              sound.tap();
              updateSettings({ focusMode: !settings.focusMode });
            }}
            className={`p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
              settings.focusMode 
                ? 'bg-purple-600 border-purple-500 text-white shadow-sm' 
                : 'bg-neutral-900/80 border-neutral-800 text-neutral-300'
            }`}
          >
            <Moon className="w-4 h-4 fill-current" />
            <span className="text-xs font-semibold">Do Not Disturb</span>
          </button>

          <button
            onClick={() => {
              sound.tap();
              updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
            }}
            className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-neutral-300 flex items-center justify-center gap-2 hover:bg-neutral-800/80 transition-all cursor-pointer"
          >
            {settings.theme === 'dark' ? (
              <>
                <Moon className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold">Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold">Light Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
