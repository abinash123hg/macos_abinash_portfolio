import React from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { 
  Settings, 
  Moon, 
  Sun, 
  Volume2, 
  Smartphone, 
  Image as ImageIcon, 
  Sparkles, 
  Info, 
  ShieldCheck, 
  Zap, 
  Layers 
} from 'lucide-react';
import { useDevice } from '../../../context/DeviceContext';
import { portfolioData } from '../../../data/portfolioData';
import { sound } from '../../../utils/audioHaptics';

export const SettingsApp: React.FC = () => {
  const { settings, updateSettings, theme, setTheme } = useDevice();

  const wallpapers = [
    { id: 0, name: 'Deep Space Indigo', class: 'from-indigo-950 via-slate-900 to-neutral-950' },
    { id: 1, name: 'Cyan Aurora', class: 'from-cyan-900 via-blue-950 to-neutral-950' },
    { id: 2, name: 'Midnight Purple', class: 'from-purple-950 via-neutral-900 to-black' },
    { id: 3, name: 'Titanium Graphite', class: 'from-neutral-900 via-black to-neutral-950' },
  ];

  return (
    <AppWindow
      id="settings"
      title="Settings"
      subtitle="iOS System & Preferences"
      icon={<Settings className="w-4 h-4 text-neutral-400" />}
    >
      {/* 1. Apple ID / Portfolio Account Platter */}
      <div className="flex items-center gap-3 p-3.5 rounded-[22px] bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs mb-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
          AS
        </div>
        <div>
          <h3 className="text-[16px] font-bold text-neutral-900 dark:text-white leading-tight">
            {portfolioData.name}
          </h3>
          <p className="text-[12px] text-neutral-500">
            Portfolio ID, iCloud & Credentials
          </p>
        </div>
      </div>

      {/* Wallpaper Themes */}
      <IOSSectionHeader title="Wallpaper & Aesthetics" />
      <div className="grid grid-cols-4 gap-2 mb-4">
        {wallpapers.map((w) => (
          <button
            key={w.id}
            onClick={() => {
              sound.tap();
              updateSettings({ wallpaperIndex: w.id });
            }}
            className={`aspect-3/4 rounded-2xl bg-gradient-to-br ${w.class} p-1.5 flex flex-col justify-end text-white cursor-pointer transition-all ${
              settings.wallpaperIndex === w.id
                ? 'ring-2 ring-[#007AFF] scale-105 shadow-md'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <span className="text-[9px] font-semibold truncate block">
              {w.name}
            </span>
          </button>
        ))}
      </div>

      {/* System Toggles */}
      <IOSSectionHeader title="Display & Sound" />
      <IOSList>
        <IOSListItem
          icon={theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          iconBg="bg-indigo-500"
          title="Dark Mode"
          subtitle={theme === 'dark' ? 'OLED Dark' : 'Light Canvas'}
          control={
            <button
              onClick={() => {
                sound.tap();
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                theme === 'dark' ? 'bg-[#34C759]' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                  theme === 'dark' ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          }
        />
        <IOSListItem
          icon={<Volume2 className="w-4 h-4" />}
          iconBg="bg-rose-500"
          title="Haptics & Audio Effects"
          subtitle={settings.soundEnabled ? 'Synthesizer Active' : 'Muted'}
          control={
            <button
              onClick={() => {
                sound.tap();
                updateSettings({ soundEnabled: !settings.soundEnabled });
              }}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.soundEnabled ? 'bg-[#34C759]' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                  settings.soundEnabled ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          }
        />
      </IOSList>

      {/* Device Specifications */}
      <IOSSectionHeader title="About This Device" />
      <IOSList>
        <IOSListItem
          icon={<Smartphone className="w-4 h-4" />}
          iconBg="bg-neutral-800"
          title="Model Name"
          value="Portfolio Device"
        />
        <IOSListItem
          icon={<Sparkles className="w-4 h-4" />}
          iconBg="bg-blue-500"
          title="iOS Version"
          value="18.0 (22A3354)"
        />
        <IOSListItem
          icon={<ShieldCheck className="w-4 h-4" />}
          iconBg="bg-emerald-500"
          title="Security Patch"
          value="August 2026"
        />
      </IOSList>
    </AppWindow>
  );
};
