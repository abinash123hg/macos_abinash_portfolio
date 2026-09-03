import React, { useState, useEffect } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { 
  Lock, 
  Unlock, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { sound } from '../../utils/audioHaptics';
import { resolveMediaUrl } from '../../utils/mediaResolver';

export const DesktopLockScreen: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const { settings } = useDevice();
  const [passcode, setPasscode] = useState('');
  const [isError, setIsError] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  const lockWallpaper = settings.wallpapers?.macLock || settings.wallpapers?.macDesktop;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlockAttempt = (enteredCode: string) => {
    if (enteredCode === '0000') {
      sound.faceIdSuccess();
      onUnlock();
    } else {
      sound.lockSound();
      setIsError(true);
      setTimeout(() => {
        setPasscode('');
        setIsError(false);
      }, 600);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUnlockAttempt(passcode);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-4 select-none animate-in fade-in duration-300 overflow-hidden">
      {/* Background wallpaper layer */}
      {lockWallpaper ? (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${resolveMediaUrl(lockWallpaper)})` }}
        >
          <div className="absolute inset-0 bg-black/45 backdrop-blur-md" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-radial from-slate-900/90 via-neutral-950/95 to-black backdrop-blur-3xl" />
      )}
      
      {/* Top Date & Time */}
      <div className="relative z-10 text-center mt-6">
        <div className="text-sm font-medium text-neutral-300 tracking-wide">{dateStr}</div>
        <div className="text-6xl sm:text-7xl font-light tracking-tight text-white mt-1 drop-shadow-lg">
          {timeStr}
        </div>
      </div>

      {/* Center User Login Box */}
      <div className="flex flex-col items-center max-w-xs w-full">
        {/* Avatar (Click to unlock directly) */}
        <div 
          onClick={() => {
            sound.faceIdSuccess();
            onUnlock();
          }}
          className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/80 shadow-2xl bg-neutral-800 mb-4 p-0.5 ring-4 ring-cyan-500/20 cursor-pointer hover:scale-105 transition-transform"
          title="Click to Unlock"
        >
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQHu8iauv0OdlA/profile-displayphoto-scale_400_400/B4DZ_ILs1ZIoAk-/0/1785769943899?e=1789603200&v=beta&t=OOZYTjy226VAOPwWen2qM1sN7U2FZai2zeoktl60x-g"
            alt="Abinash Swain"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="text-lg font-bold text-white tracking-tight">{portfolioData.name}</div>
        <div className="text-xs text-neutral-400 font-mono mb-4">Data Analyst • ML Engineer</div>

        {/* Passcode input field */}
        <div className={`relative w-full flex items-center transition-transform ${isError ? 'animate-shake' : ''}`}>
          <input
            type="password"
            autoFocus
            maxLength={4}
            placeholder="Enter PIN (0000)"
            value={passcode}
            onChange={(e) => {
              const val = e.target.value;
              setPasscode(val);
              if (val.length === 4) {
                handleUnlockAttempt(val);
              }
            }}
            onKeyDown={handleKeyDown}
            className={`w-full py-2 pl-3 pr-10 rounded-full bg-white/10 border text-center text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 backdrop-blur-md font-mono ${
              isError 
                ? 'border-red-500 ring-2 ring-red-500/50 bg-red-950/20' 
                : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/30'
            }`}
          />
          <button
            onClick={() => handleUnlockAttempt(passcode || '0000')}
            className="absolute right-1.5 w-7 h-7 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            title="Unlock"
          >
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Hint & Quick unlock button */}
        <div className="mt-3 text-[11px] text-neutral-400 flex items-center gap-2">
          <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
          <span>PIN: <strong className="text-cyan-300 font-mono">0000</strong></span>
          <span>•</span>
          <button
            onClick={() => {
              sound.faceIdSuccess();
              onUnlock();
            }}
            className="text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
          >
            Quick Unlock
          </button>
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="text-[11px] text-neutral-500 flex items-center gap-2 font-mono">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Portfolio macOS Session • Touch ID or PIN Protected</span>
      </div>
    </div>
  );
};
