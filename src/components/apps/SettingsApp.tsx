import React from 'react';
import { useDevice } from '../../context/DeviceContext';
import { 
  Settings, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Vibrate, 
  Wifi, 
  Bluetooth, 
  ShieldCheck, 
  Camera, 
  Cloud, 
  Smartphone, 
  Laptop, 
  Sliders, 
  Info 
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export const SettingsApp: React.FC = () => {
  const { settings, updateSettings, deviceMode, toggleDeviceMode } = useDevice();

  const WALLPAPERS = [
    { name: 'Sequoia', preview: 'from-sky-700 via-indigo-900 to-slate-950' },
    { name: 'Sonoma', preview: 'from-emerald-700 via-teal-900 to-slate-950' },
    { name: 'Ventura', preview: 'from-orange-500 via-blue-800 to-indigo-950' },
    { name: 'Monterey', preview: 'from-cyan-500 via-blue-800 to-violet-950' },
    { name: 'Big Sur', preview: 'from-blue-500 via-indigo-800 to-slate-950' },
    { name: 'Catalina Island', preview: 'from-amber-500 via-sky-700 to-blue-950' },
    { name: 'Mojave', preview: 'from-amber-700 via-orange-900 to-slate-950' },
    { name: 'High Sierra', preview: 'from-cyan-400 via-blue-700 to-slate-950' },
    { name: 'Sierra', preview: 'from-slate-500 via-blue-900 to-slate-950' },
    { name: 'Yosemite', preview: 'from-sky-500 via-slate-700 to-slate-950' },
    { name: 'Dynamic Desktop', preview: 'from-indigo-500 via-fuchsia-700 to-orange-500' },
    { name: 'Stills / Landscape', preview: 'from-emerald-500 via-sky-700 to-slate-900' },
    { name: 'Solid Colors', preview: 'from-neutral-700 via-neutral-800 to-neutral-950' },
    { name: 'Color Gradients', preview: 'from-cyan-500 via-blue-600 to-violet-700' }
  ];

  return (
    <div className="h-full w-full overflow-y-auto bg-neutral-950/90 text-neutral-100 p-4 sm:p-6 select-text space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            System Settings & Preferences
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure desktop and mobile simulator hardware controls.
          </p>
        </div>

      </div>

      {/* Grid Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Appearance & Wallpaper */}
        <div className="p-4 rounded-2xl bg-neutral-900/50 dark:bg-neutral-900/50 light:bg-white border border-neutral-800 dark:border-neutral-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Sun className="w-4 h-4 text-amber-400" />
            Theme & Appearance
          </h3>

          {/* Theme Segmented Switcher */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-neutral-950/80 border border-neutral-800">
            {(['dark', 'light', 'system'] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  sound.tap();
                  updateSettings({ theme: t });
                }}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                  settings.theme === t
                    ? 'bg-[#007AFF] text-white shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t === 'system' ? 'Auto System' : `${t} Mode`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {WALLPAPERS.map((wp, idx) => (
              <button
                key={wp.name}
                onClick={() => updateSettings({ wallpaperIndex: idx })}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  settings.wallpaperIndex === idx
                    ? 'border-cyan-500 bg-neutral-800/80 text-white shadow-xs'
                    : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${wp.preview} mb-1.5 border border-neutral-800`} />
                <div className="text-[11px] font-medium truncate">{wp.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Camera Control Configuration */}
        <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-cyan-400" />
            Camera Control Settings
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
              <div>
                <div className="font-semibold text-white">Camera Control Launch Action</div>
                <div className="text-[10px] text-neutral-500">How pressing the side Camera Control button responds</div>
              </div>
              <select
                value={settings.cameraControlClickCount}
                onChange={(e: any) => updateSettings({ cameraControlClickCount: e.target.value })}
                className="bg-neutral-800 border border-neutral-700 text-xs text-cyan-300 rounded-lg p-1.5"
              >
                <option value="single">Single Press</option>
                <option value="double">Double Press</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
              <div>
                <div className="font-semibold text-white">Lock Focus & Exposure (AE/AF)</div>
                <div className="text-[10px] text-neutral-500">Hold lightly on Camera Control to lock exposure</div>
              </div>
              <input
                type="checkbox"
                checked={settings.lockFocusExposureSetting}
                onChange={(e) => updateSettings({ lockFocusExposureSetting: e.target.checked })}
                className="accent-cyan-400 cursor-pointer w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* Audio & Haptic Feedback */}
        <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-emerald-400" />
            Tactile Audio & Haptics
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
              <div className="font-semibold text-white">Web Audio Synthesizer Effects</div>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
                className="accent-cyan-400 cursor-pointer w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
              <div className="font-semibold text-white">Capacitive Haptic Simulation</div>
              <input
                type="checkbox"
                checked={settings.hapticEnabled}
                onChange={(e) => updateSettings({ hapticEnabled: e.target.checked })}
                className="accent-cyan-400 cursor-pointer w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* Security & iCloud */}
        <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Security & iCloud Sync
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Development Passcode</div>
                <div className="text-[10px] text-neutral-400 font-mono">Default passcode is <strong>0000</strong></div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                Active
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">iCloud Cross-Device Sync</div>
                <div className="text-[10px] text-neutral-400">4.8 GB of 5.0 GB used</div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                Synced
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
