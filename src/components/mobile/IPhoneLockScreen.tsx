import React, { useState, useEffect } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { 
  Lock, 
  Unlock, 
  Flashlight, 
  Camera, 
  Sparkles, 
  ScanFace, 
  ChevronUp, 
  Delete 
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export const IPhoneLockScreen: React.FC = () => {
  const { unlockPhone, triggerFaceId, openApp, settings, updateSettings } = useDevice();
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDateStr(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = (digit: string) => {
    sound.tap();
    if (passcode.length < 4) {
      const next = passcode + digit;
      setPasscode(next);

      if (next.length === 4) {
        // Dev passcode 0000
        if (next === '0000') {
          sound.faceIdSuccess();
          unlockPhone();
        } else {
          sound.lockSound();
          setIsError(true);
          setTimeout(() => {
            setPasscode('');
            setIsError(false);
          }, 600);
        }
      }
    }
  };

  const handleBackspace = () => {
    sound.tap();
    setPasscode(prev => prev.slice(0, -1));
  };

  const toggleFlashlight = () => {
    sound.tap();
    updateSettings({ flashlightOn: !settings.flashlightOn });
  };

  const handleQuickCamera = () => {
    sound.cameraShutter();
    unlockPhone();
    openApp('camera');
  };

  return (
    <div className="h-full w-full relative flex flex-col justify-between p-6 select-none text-white overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950/60 to-black">
      {/* Top Lock Status */}
      <div className="flex flex-col items-center pt-8 space-y-1">
        <button
          onClick={triggerFaceId}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-neutral-800 text-xs text-neutral-300 hover:text-white cursor-pointer transition-all"
        >
          <ScanFace className="w-4 h-4 text-cyan-400" />
          <span>Face ID / Tap to Unlock</span>
        </button>

        {/* Date & Time */}
        <div className="text-center pt-4">
          <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">{dateStr}</div>
          <div className="text-6xl sm:text-7xl font-extralight tracking-tighter text-white font-sans mt-1">
            {timeStr}
          </div>
        </div>
      </div>

      {/* Middle Passcode Pad (if toggled) or Notification Widgets */}
      {showPasscode ? (
        <div className="w-full max-w-xs mx-auto space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="text-center">
            <div className="text-xs font-semibold text-neutral-300">Enter Passcode</div>
            <div className="text-[10px] text-cyan-400 mt-0.5 font-mono">Development Passcode: 0000</div>
          </div>

          {/* 4 Dots */}
          <div className={`flex justify-center gap-4 my-2 ${isError ? 'animate-shake' : ''}`}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  passcode.length > i ? 'bg-white border-white' : 'border-neutral-500 bg-transparent'
                }`}
              />
            ))}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((k, idx) => {
              if (k === '') return <div key={idx} />;
              if (k === 'del') {
                return (
                  <button
                    key={idx}
                    onClick={handleBackspace}
                    className="aspect-square rounded-full flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Delete className="w-5 h-5" />
                  </button>
                );
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleKeyPress(k)}
                  className="aspect-square rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md text-xl font-light flex items-center justify-center transition-all cursor-pointer"
                >
                  {k}
                </button>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowPasscode(false)}
              className="text-xs text-neutral-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* Lock screen notification widgets */
        <div className="w-full max-w-xs mx-auto space-y-2">
          <div 
            onClick={triggerFaceId}
            className="p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-neutral-800 text-xs space-y-1 cursor-pointer hover:border-cyan-500/40 transition-colors"
          >
            <div className="flex items-center justify-between text-[11px] font-semibold text-cyan-400">
              <span>SafeDrive AI Hotspot System</span>
              <span className="text-neutral-500 font-mono">Now</span>
            </div>
            <p className="text-neutral-300 text-[11px]">Accident severity model running with 96.2% confidence.</p>
          </div>
        </div>
      )}

      {/* Bottom Quick Action Controls */}
      <div className="flex items-center justify-between px-4 pb-4">
        <button
          onClick={toggleFlashlight}
          className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg ${
            settings.flashlightOn ? 'bg-white text-black' : 'bg-black/40 text-white border border-neutral-700'
          }`}
        >
          <Flashlight className="w-5 h-5" />
        </button>

        {!showPasscode && (
          <button
            onClick={() => setShowPasscode(true)}
            className="flex flex-col items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronUp className="w-4 h-4 animate-bounce text-cyan-400" />
            <span>Swipe or click to unlock</span>
          </button>
        )}

        <button
          onClick={handleQuickCamera}
          className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-neutral-700 flex items-center justify-center transition-all cursor-pointer shadow-lg"
        >
          <Camera className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
