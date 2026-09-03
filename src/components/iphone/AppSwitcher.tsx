import React from 'react';
import { useDevice } from '../../context/DeviceContext';
import { 
  X, 
  Trash2, 
  FolderGit2, 
  Award, 
  Cpu, 
  User, 
  Compass, 
  Image, 
  Mail, 
  Terminal, 
  Sparkles, 
  Camera, 
  Gamepad2, 
  Settings,
  Radio,
  FileSpreadsheet
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export const AppSwitcher: React.FC = () => {
  const { 
    recentApps, 
    openApp, 
    closeRecentApp, 
    setPhoneScreen, 
    closeApp 
  } = useDevice();

  const getAppMeta = (appId: string) => {
    switch (appId) {
      case 'about':
        return { name: 'About Abinash', icon: <User className="w-4 h-4 text-cyan-400" />, bg: 'from-blue-600 to-cyan-700' };
      case 'projects':
        return { name: '5G SLA & Projects', icon: <FolderGit2 className="w-4 h-4 text-blue-400" />, bg: 'from-blue-700 to-indigo-800' };
      case 'skills':
        return { name: 'Skills Stack', icon: <Cpu className="w-4 h-4 text-emerald-400" />, bg: 'from-emerald-600 to-teal-800' };
      case 'certificates':
        return { name: 'Credentials', icon: <Award className="w-4 h-4 text-amber-400" />, bg: 'from-amber-600 to-orange-700' };
      case 'safari':
        return { name: 'Safari Demos', icon: <Compass className="w-4 h-4 text-blue-400" />, bg: 'from-blue-500 to-cyan-600' };
      case 'photos':
        return { name: 'Photos Gallery', icon: <Image className="w-4 h-4 text-pink-400" />, bg: 'from-pink-600 to-rose-700' };
      case 'mail':
        return { name: 'Mail', icon: <Mail className="w-4 h-4 text-blue-400" />, bg: 'from-blue-600 to-blue-800' };
      case 'terminal':
        return { name: 'Terminal zsh', icon: <Terminal className="w-4 h-4 text-green-400" />, bg: 'from-neutral-800 to-black' };
      case 'ai':
        return { name: 'Abinash AI', icon: <Sparkles className="w-4 h-4 text-cyan-400" />, bg: 'from-cyan-600 to-blue-700' };
      case 'camera':
        return { name: 'Camera', icon: <Camera className="w-4 h-4 text-yellow-400" />, bg: 'from-neutral-700 to-neutral-900' };
      case 'games':
        return { name: 'Game Center', icon: <Gamepad2 className="w-4 h-4 text-purple-400" />, bg: 'from-purple-600 to-indigo-700' };
      case 'settings':
        return { name: 'Settings', icon: <Settings className="w-4 h-4 text-neutral-400" />, bg: 'from-neutral-600 to-neutral-800' };
      default:
        return { name: appId, icon: <Sparkles className="w-4 h-4 text-cyan-400" />, bg: 'from-blue-600 to-neutral-800' };
    }
  };

  const appsList = recentApps.length > 0 ? recentApps : ['about', 'projects', 'certificates', 'skills'];

  return (
    <div 
      className="absolute inset-0 z-40 bg-black/60 backdrop-blur-2xl p-4 flex flex-col justify-between select-none font-sans text-white"
      onClick={() => setPhoneScreen('home')}
    >
      {/* Top Header */}
      <div className="w-full flex items-center justify-between pt-2 px-2" onClick={(e) => e.stopPropagation()}>
        <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
          App Switcher
        </span>
        <button
          onClick={() => {
            sound.tap();
            setPhoneScreen('home');
          }}
          className="text-xs font-medium text-[#007AFF] hover:text-[#3897FF] cursor-pointer"
        >
          Done
        </button>
      </div>

      {/* Horizontal Scaled Card Carousel */}
      <div 
        className="w-full flex items-center gap-4 overflow-x-auto py-6 px-4 no-scrollbar snap-x snap-mandatory"
        onClick={(e) => e.stopPropagation()}
      >
        {appsList.map((appId) => {
          const meta = getAppMeta(appId);
          return (
            <div
              key={appId}
              className="flex-shrink-0 w-[240px] h-[380px] flex flex-col snap-center group relative cursor-pointer active:scale-95 transition-transform"
              onClick={() => {
                sound.appOpen();
                openApp(appId);
              }}
            >
              {/* Card Header (App Icon + Name + Dismiss Button) */}
              <div className="flex items-center justify-between px-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center">
                    {meta.icon}
                  </div>
                  <span className="text-xs font-medium text-white/90 truncate max-w-[140px]">
                    {meta.name}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.tap();
                    closeRecentApp(appId);
                  }}
                  className="w-6 h-6 rounded-full bg-white/15 hover:bg-red-500/80 transition-colors flex items-center justify-center text-white/70 hover:text-white"
                  title="Close App"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scaled Preview Body (iOS 18 Squircle Card) */}
              <div
                className={`w-full flex-1 rounded-[26px] bg-gradient-to-br ${meta.bg} p-4 border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden relative group-hover:ring-2 ring-[#007AFF]/60 transition-all`}
                style={{
                  boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
                }}
              >
                {/* Simulated App Screen Preview Graphic */}
                <div className="w-full flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="w-12 h-2 rounded-full bg-white/20" />
                  <div className="w-4 h-4 rounded-full bg-white/15" />
                </div>

                <div className="flex flex-col items-center justify-center my-auto text-center p-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white mb-2 shadow-md">
                    {React.cloneElement(meta.icon as React.ReactElement<{ className?: string }>, { className: 'w-7 h-7' })}
                  </div>
                  <span className="text-sm font-semibold text-white tracking-tight">
                    {meta.name}
                  </span>
                  <span className="text-[11px] text-white/70 mt-0.5">
                    Tap to resume
                  </span>
                </div>

                <div className="w-full h-1 rounded-full bg-white/20 mx-auto" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Hint */}
      <div className="w-full text-center pb-2 text-[11px] text-white/50" onClick={(e) => e.stopPropagation()}>
        Swipe up on card to dismiss • Tap to resume
      </div>
    </div>
  );
};
