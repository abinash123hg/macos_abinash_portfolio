import React from 'react';
import { useDevice } from '../../context/DeviceContext';
import { 
  User, 
  FolderGit2, 
  Cpu, 
  Award, 
  Compass, 
  Image, 
  Mail, 
  Terminal, 
  Sparkles, 
  Camera, 
  Gamepad2, 
  Settings, 
  Radio, 
  ShieldAlert, 
  GraduationCap 
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

interface MobileAppIcon {
  id: string;
  name: string;
  icon: any;
  gradient: string;
}

const APPS: MobileAppIcon[] = [
  { id: 'about', name: 'About', icon: User, gradient: 'from-sky-400 to-blue-600' },
  { id: 'projects', name: 'Projects', icon: FolderGit2, gradient: 'from-cyan-500 to-blue-600' },
  { id: 'skills', name: 'Skills', icon: Cpu, gradient: 'from-indigo-500 to-purple-600' },
  { id: 'certificates', name: 'Credentials', icon: Award, gradient: 'from-amber-400 to-orange-600' },
  { id: 'terminal', name: 'Terminal', icon: Terminal, gradient: 'from-emerald-500 to-green-700' },
  { id: 'camera', name: 'Camera', icon: Camera, gradient: 'from-slate-700 to-neutral-900' },
  { id: 'games', name: 'Arcade', icon: Gamepad2, gradient: 'from-rose-500 to-red-700' },
  { id: 'settings', name: 'Settings', icon: Settings, gradient: 'from-slate-600 to-neutral-800' }
];

const DOCK_APPS: MobileAppIcon[] = [
  { id: 'safari', name: 'Safari', icon: Compass, gradient: 'from-blue-400 to-cyan-600' },
  { id: 'mail', name: 'Mail', icon: Mail, gradient: 'from-cyan-400 to-teal-600' },
  { id: 'ai', name: 'Ask AI', icon: Sparkles, gradient: 'from-purple-500 to-indigo-600' },
  { id: 'photos', name: 'Photos', icon: Image, gradient: 'from-pink-500 to-rose-600' }
];

export const IPhoneHomeScreen: React.FC = () => {
  const { openApp } = useDevice();

  const handleLaunch = (appId: string) => {
    sound.tap();
    openApp(appId);
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-4 pt-12 pb-7 select-none overflow-y-auto">
      {/* Top Widgets Section */}
      <div className="space-y-3">
        {/* Dual iOS Widgets */}
        <div className="grid grid-cols-2 gap-3">
          {/* 5G Telemetry Widget */}
          <div
            onClick={() => handleLaunch('projects')}
            className="p-3 rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 flex flex-col justify-between aspect-square hover:border-cyan-500/50 transition-all cursor-pointer shadow-lg"
          >
            <div className="flex items-center justify-between">
              <Radio className="w-4 h-4 text-blue-400" />
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-mono">
                96.2% Acc
              </span>
            </div>
            <div>
              <div className="text-[10px] text-neutral-400 font-medium">5G SLA Forecast</div>
              <div className="text-base font-bold text-white font-mono">3.2 ms</div>
              <div className="text-[9px] text-emerald-400">Random Forest Live</div>
            </div>
          </div>

          {/* Academic Profile Widget */}
          <div
            onClick={() => handleLaunch('about')}
            className="p-3 rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 flex flex-col justify-between aspect-square hover:border-amber-500/50 transition-all cursor-pointer shadow-lg"
          >
            <div className="flex items-center justify-between">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                CGPA 8.32
              </span>
            </div>
            <div>
              <div className="text-[10px] text-neutral-400 font-medium">Centurion Univ</div>
              <div className="text-xs font-bold text-white leading-tight mt-0.5">B.Tech AI/ML</div>
              <div className="text-[9px] text-cyan-400">AI & Machine Learning</div>
            </div>
          </div>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-4 gap-4 pt-3">
          {APPS.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => handleLaunch(app.id)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${app.gradient} p-0.5 shadow-lg group-hover:scale-105 active:scale-95 transition-transform`}>
                  <div className="w-full h-full rounded-[14px] bg-neutral-950/20 flex items-center justify-center text-white">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-md" />
                  </div>
                </div>
                <span className="text-[11px] font-medium text-neutral-200 tracking-tight truncate max-w-[64px]">
                  {app.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* iOS Bottom Dock */}
      <div className="p-3 rounded-3xl bg-neutral-900/60 backdrop-blur-2xl border border-neutral-700/50 shadow-2xl flex items-center justify-around mt-4">
        {DOCK_APPS.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => handleLaunch(app.id)}
              className="w-13 h-13 rounded-2xl bg-gradient-to-br p-0.5 shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
            >
              <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center text-white`}>
                <Icon className="w-6 h-6 drop-shadow-md" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
