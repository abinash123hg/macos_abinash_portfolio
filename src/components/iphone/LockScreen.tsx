import React, { useState, useEffect } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { 
  Lock, 
  Unlock, 
  Flashlight, 
  Camera, 
  Sparkles, 
  ChevronUp, 
  Radio, 
  Briefcase, 
  Award,
  CheckCircle2,
  Calendar as CalendarIcon,
  MessageSquare,
  Sparkle,
  X,
  Smartphone
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

interface LockNotification {
  id: string;
  app: string;
  title: string;
  body: string;
  time: string;
  color: 'cyan' | 'red' | 'green' | 'violet';
  icon: 'os' | 'calendar' | 'messages' | 'ai';
}

const INITIAL_LOCK_NOTIFICATIONS: LockNotification[] = [
  {
    id: 'lock-notif-1',
    app: 'Abinash OS',
    title: 'Welcome back 👋',
    body: 'Swipe up to unlock your portfolio. Passcode is 0000.',
    time: 'now',
    color: 'cyan',
    icon: 'os'
  },
  {
    id: 'lock-notif-2',
    app: 'Calendar',
    title: 'Project Review',
    body: 'Today · 6:30 PM with the design team.',
    time: '2m',
    color: 'red',
    icon: 'calendar'
  },
  {
    id: 'lock-notif-3',
    app: 'Messages',
    title: 'Recruiter',
    body: "Loved your portfolio — let's schedule a call.",
    time: '5m',
    color: 'green',
    icon: 'messages'
  },
  {
    id: 'lock-notif-4',
    app: 'Ask Abinash',
    title: 'New AI insight ready',
    body: "Tap to view today's skills breakdown.",
    time: '12m',
    color: 'violet',
    icon: 'ai'
  }
];

export const LockScreen: React.FC = () => {
  const { unlockPhone, triggerFaceId, openApp, settings } = useDevice();
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscodeUI, setShowPasscodeUI] = useState(false);
  const [isFaceIdScanning, setIsFaceIdScanning] = useState(false);
  const [timeStr, setTimeStr] = useState('09:41');
  const [dateStr, setDateStr] = useState('Monday, August 31');
  const [notificationsList, setNotificationsList] = useState<LockNotification[]>(INITIAL_LOCK_NOTIFICATIONS);
  const [swipingId, setSwipingId] = useState<string | null>(null);
  const [touchStartX, setTouchStartX] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      if (!settings.use24HourClock) {
        hours = hours % 12 || 12;
      }
      const mStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setTimeStr(`${hours < 10 && settings.use24HourClock ? '0' : ''}${hours}:${mStr}`);

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      setDateStr(`${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [settings.use24HourClock]);

  const handleUnlockSwipe = () => {
    sound.unlock();
    setIsFaceIdScanning(true);
    triggerFaceId();
    setTimeout(() => {
      setIsFaceIdScanning(false);
      unlockPhone();
    }, 450);
  };

  const handleDismissNotification = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.tap();
    setNotificationsList(prev => prev.filter(n => n.id !== id));
  };

  const handleTouchStart = (id: string, e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setSwipingId(id);
  };

  const handleTouchEnd = (id: string, e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 70) {
      handleDismissNotification(id);
    }
    setSwipingId(null);
  };

  const renderIcon = (icon: 'os' | 'calendar' | 'messages' | 'ai', color: string) => {
    switch (icon) {
      case 'os':
        return <Smartphone className="w-3.5 h-3.5 text-cyan-300" />;
      case 'calendar':
        return <CalendarIcon className="w-3.5 h-3.5 text-red-300" />;
      case 'messages':
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />;
      case 'ai':
        return <Sparkles className="w-3.5 h-3.5 text-purple-300" />;
    }
  };

  const getColorClasses = (color: 'cyan' | 'red' | 'green' | 'violet') => {
    switch (color) {
      case 'cyan':
        return {
          iconBg: 'bg-cyan-500/30 text-cyan-300 border-cyan-500/40',
          accent: 'text-cyan-400'
        };
      case 'red':
        return {
          iconBg: 'bg-red-500/30 text-red-300 border-red-500/40',
          accent: 'text-red-400'
        };
      case 'green':
        return {
          iconBg: 'bg-emerald-500/30 text-emerald-300 border-emerald-500/40',
          accent: 'text-emerald-400'
        };
      case 'violet':
        return {
          iconBg: 'bg-purple-500/30 text-purple-300 border-purple-500/40',
          accent: 'text-purple-400'
        };
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-5 text-white select-none overflow-hidden font-sans">
      {/* Dynamic Background Sheen */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] pointer-events-none" />

      {/* Top Header & Lock Status */}
      <div className="relative z-10 w-full flex flex-col items-center pt-7">
        <button
          onClick={handleUnlockSwipe}
          className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white mb-1.5 cursor-pointer active:scale-95 transition-transform"
        >
          {isFaceIdScanning ? (
            <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          ) : (
            <Lock className="w-4 h-4 text-white/90" />
          )}
          <span className="font-medium tracking-tight text-[13px]">
            {isFaceIdScanning ? 'Face ID Verified' : 'Locked'}
          </span>
        </button>

        {/* Date Widget */}
        <div className="text-[15px] font-medium text-white/90 tracking-tight drop-shadow-md">
          {dateStr}
        </div>

        {/* iOS 18 Chunky Clock Display */}
        <div
          className="text-[72px] font-bold tracking-tighter leading-none text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] my-0.5"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            letterSpacing: '-0.05em',
          }}
        >
          {timeStr}
        </div>
      </div>

      {/* Center: Notifications Stack (The 4 exact Lock Screen Notifications) */}
      <div className="relative z-10 w-full flex flex-col gap-2 max-w-xs mx-auto overflow-y-auto max-h-64 py-1 no-scrollbar">
        {notificationsList.length > 0 ? (
          notificationsList.map((notif, idx) => {
            const styling = getColorClasses(notif.color);
            return (
              <div 
                key={notif.id}
                onClick={handleUnlockSwipe}
                onTouchStart={(e) => handleTouchStart(notif.id, e)}
                onTouchEnd={(e) => handleTouchEnd(notif.id, e)}
                style={{ animationDelay: `${idx * 80}ms` }}
                className="group relative p-3 rounded-2xl bg-neutral-900/75 backdrop-blur-2xl border border-white/20 text-white flex items-start gap-2.5 shadow-lg cursor-pointer hover:bg-neutral-900/90 active:scale-[0.98] transition-all animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                {/* App Icon Pill */}
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 border ${styling.iconBg}`}>
                  {renderIcon(notif.icon, notif.color)}
                </div>

                {/* Notification Content */}
                <div className="flex-1 min-w-0 text-left pr-4">
                  <div className="flex items-center justify-between text-[11px] text-white/70">
                    <span className="font-semibold text-white tracking-tight">{notif.app}</span>
                    <span className="text-[10px] text-white/60 font-mono">{notif.time}</span>
                  </div>
                  <div className="text-[12px] font-semibold text-white/95 mt-0.5 truncate">
                    {notif.title}
                  </div>
                  <p className="text-[11.5px] text-neutral-300 mt-0.5 leading-snug break-words">
                    {notif.body}
                  </p>
                </div>

                {/* Dismiss Cross Button */}
                <button
                  onClick={(e) => handleDismissNotification(notif.id, e)}
                  className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                  title="Dismiss notification"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })
        ) : (
          <div className="p-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 text-center text-xs text-white/60">
            No new notifications
          </div>
        )}
      </div>

      {/* Bottom Controls: Flashlight, Unlock Prompt, Camera */}
      <div className="relative z-10 w-full flex flex-col items-center pb-2">
        {/* Swipe to Unlock Prompt */}
        <button
          onClick={handleUnlockSwipe}
          className="flex flex-col items-center text-white/80 hover:text-white group mb-4 cursor-pointer"
        >
          <ChevronUp className="w-5 h-5 animate-bounce text-white/90" />
          <span className="text-[13px] font-medium tracking-tight">
            Swipe up to unlock • Passcode 0000
          </span>
        </button>

        {/* Bottom Quick Action Glass Buttons */}
        <div className="w-full flex items-center justify-between px-3">
          {/* Flashlight Button */}
          <button
            onClick={() => {
              sound.tap();
              setFlashlightOn(!flashlightOn);
            }}
            aria-label="Toggle Flashlight"
            className={`w-12 h-12 rounded-full backdrop-blur-2xl flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90 ${
              flashlightOn
                ? 'bg-white text-neutral-900 ring-4 ring-white/40'
                : 'bg-black/40 text-white border border-white/20 hover:bg-black/60'
            }`}
          >
            <Flashlight className="w-5 h-5" />
          </button>

          {/* Quick Camera Action */}
          <button
            onClick={() => {
              sound.appOpen();
              unlockPhone();
              openApp('camera');
            }}
            aria-label="Open Camera"
            className="w-12 h-12 rounded-full bg-black/40 text-white backdrop-blur-2xl border border-white/20 hover:bg-black/60 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

