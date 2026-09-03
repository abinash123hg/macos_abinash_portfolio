import React, { useState, useRef } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { 
  Wifi, 
  WifiOff, 
  Bluetooth, 
  Plane, 
  Radio, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Flashlight, 
  BriefcaseBusiness,
  Sliders, 
  X, 
  Music, 
  BellRing,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  ChevronUp
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export interface ControlCenterProps {
  onClose: () => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({ onClose }) => {
  const { 
    settings, 
    updateSettings, 
    nowPlayingTrack, 
    isPlayingMusic, 
    togglePlayMusic, 
    nextMusicTrack,
    prevMusicTrack,
    openApp
  } = useDevice();
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [cellularEnabled, setCellularEnabled] = useState(true);
  const [flashlightEnabled, setFlashlightEnabled] = useState(false);

  const touchStartY = useRef<number | null>(null);

  const handleClose = () => {
    sound.tap();
    onClose();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    // Swipe UP to dismiss Control Center
    if (deltaY < -40) {
      handleClose();
    }
    touchStartY.current = null;
  };

  const track = nowPlayingTrack || {
    id: 'default-1',
    title: 'Solaris Groove',
    artist: 'Abinash Swain',
    album: 'Neural Beats',
    duration: '3:24'
  };

  return (
    <div 
      onClick={handleClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="absolute inset-0 z-50 bg-black/60 backdrop-blur-3xl p-5 flex flex-col justify-between select-none font-sans text-white overflow-y-auto animate-in fade-in zoom-in-95 duration-200 cursor-default"
    >
      {/* Top Header */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-full flex items-center justify-between pb-3 shrink-0"
      >
        <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span>Control Center</span>
        </div>
        <button
          onClick={handleClose}
          className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 transition-all flex items-center justify-center text-white cursor-pointer"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* iOS 18 Modular Bento Grid */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="grid grid-cols-2 gap-3.5 flex-1"
      >
        {/* 1. Connectivity Platter (4-in-1 Tile) */}
        <div className="p-3 rounded-[24px] bg-white/10 dark:bg-neutral-900/60 backdrop-blur-2xl border border-white/15 grid grid-cols-2 gap-2 shadow-lg">
          {/* Airplane Mode */}
          <button
            onClick={() => {
              sound.tap();
              setAirplaneMode(!airplaneMode);
            }}
            className={`w-full aspect-square rounded-full flex items-center justify-center transition-all cursor-pointer ${
              airplaneMode ? 'bg-[#FF9500] text-white shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Plane className="w-4 h-4" />
          </button>

          {/* Cellular */}
          <button
            onClick={() => {
              sound.tap();
              setCellularEnabled(!cellularEnabled);
            }}
            className={`w-full aspect-square rounded-full flex items-center justify-center transition-all cursor-pointer ${
              cellularEnabled ? 'bg-[#34C759] text-white shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Radio className="w-4 h-4" />
          </button>

          {/* Wi-Fi */}
          <button
            onClick={() => {
              sound.tap();
              setWifiEnabled(!wifiEnabled);
            }}
            className={`w-full aspect-square rounded-full flex items-center justify-center transition-all cursor-pointer ${
              wifiEnabled ? 'bg-[#007AFF] text-white shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {wifiEnabled ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          </button>

          {/* Bluetooth */}
          <button
            onClick={() => {
              sound.tap();
              setBluetoothEnabled(!bluetoothEnabled);
            }}
            className={`w-full aspect-square rounded-full flex items-center justify-center transition-all cursor-pointer ${
              bluetoothEnabled ? 'bg-[#007AFF] text-white shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Bluetooth className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Media / Now Playing Platter */}
        <div className="p-3 rounded-[24px] bg-white/10 dark:bg-neutral-900/60 backdrop-blur-2xl border border-white/15 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => {
                sound.tap();
                openApp('music');
                onClose();
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-white/90 truncate cursor-pointer hover:text-rose-400"
            >
              <Music className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
              <span className="truncate">{track.title}</span>
            </div>
            {isPlayingMusic && (
              <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            )}
          </div>
          <div className="text-[11px] text-white/60 truncate">
            {track.artist}
          </div>
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={() => {
                sound.tap();
                prevMusicTrack();
              }}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer active:scale-90"
              title="Previous"
            >
              <SkipBack className="w-3.5 h-3.5 fill-white" />
            </button>
            <button
              onClick={() => {
                sound.tap();
                togglePlayMusic();
              }}
              className="w-8 h-8 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center cursor-pointer active:scale-90 shadow-md"
              title={isPlayingMusic ? 'Pause' : 'Play'}
            >
              {isPlayingMusic ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
            </button>
            <button
              onClick={() => {
                sound.tap();
                nextMusicTrack();
              }}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer active:scale-90"
              title="Next"
            >
              <SkipForward className="w-3.5 h-3.5 fill-white" />
            </button>
          </div>
        </div>

        {/* 3. Brightness Slider */}
        <div className="p-3.5 rounded-[24px] bg-white/10 dark:bg-neutral-900/60 backdrop-blur-2xl border border-white/15 flex items-center gap-3 shadow-lg">
          <Sun className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <input
            type="range"
            min="10"
            max="100"
            value={settings.brightness ?? 80}
            onChange={(e) => updateSettings({ brightness: Number(e.target.value) })}
            className="w-full accent-[#007AFF] cursor-pointer"
          />
        </div>

        {/* 4. Volume Slider */}
        <div className="p-3.5 rounded-[24px] bg-white/10 dark:bg-neutral-900/60 backdrop-blur-2xl border border-white/15 flex items-center gap-3 shadow-lg">
          {settings.soundEnabled ? (
            <Volume2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          ) : (
            <VolumeX className="w-5 h-5 text-neutral-400 flex-shrink-0" />
          )}
          <input
            type="range"
            min="0"
            max="100"
            value={settings.volume ?? 75}
            onChange={(e) => updateSettings({ volume: Number(e.target.value) })}
            className="w-full accent-[#007AFF] cursor-pointer"
          />
        </div>

        {/* 5. Dark Mode Toggle */}
        <button
          onClick={() => {
            sound.tap();
            updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
          }}
          className={`p-3 rounded-[20px] backdrop-blur-2xl border border-white/15 flex items-center gap-2.5 transition-all cursor-pointer shadow-lg active:scale-95 ${
            settings.theme === 'dark'
              ? 'bg-indigo-600/80 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Moon className="w-4 h-4" />
          <span className="text-xs font-medium">Dark Mode</span>
        </button>

        {/* 6. Sound & Haptics Toggle */}
        <button
          onClick={() => {
            sound.tap();
            updateSettings({ soundEnabled: !settings.soundEnabled });
          }}
          className={`p-3 rounded-[20px] backdrop-blur-2xl border border-white/15 flex items-center gap-2.5 transition-all cursor-pointer shadow-lg active:scale-95 ${
            settings.soundEnabled
              ? 'bg-blue-600/80 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <BellRing className="w-4 h-4" />
          <span className="text-xs font-medium">Sound FX</span>
        </button>

        {/* 7. Flashlight */}
        <button
          onClick={() => {
            sound.tap();
            setFlashlightEnabled(!flashlightEnabled);
          }}
          className={`p-3 rounded-[20px] backdrop-blur-2xl border border-white/15 flex items-center gap-2.5 transition-all cursor-pointer shadow-lg active:scale-95 ${
            flashlightEnabled
              ? 'bg-white text-neutral-900'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Flashlight className="w-4 h-4" />
          <span className="text-xs font-medium">Flashlight</span>
        </button>

        {/* 8. HR View */}
        <button
          onClick={() => {
            sound.tap();
            openApp('recruiter');
            onClose();
          }}
          className="p-3 rounded-[20px] bg-gradient-to-r from-cyan-500/30 to-blue-600/30 backdrop-blur-2xl border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/40 flex items-center gap-2.5 transition-all cursor-pointer shadow-lg active:scale-95"
        >
          <BriefcaseBusiness className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-medium">HR View</span>
        </button>
      </div>

      {/* Swipe up hint indicator & Done Button */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="pt-3 flex flex-col items-center gap-1 shrink-0"
      >
        <button
          onClick={handleClose}
          className="w-full py-2.5 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 text-white text-xs font-semibold tracking-tight transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <ChevronUp className="w-3.5 h-3.5" />
          <span>Swipe Up or Tap to Close</span>
        </button>
      </div>
    </div>
  );
};
