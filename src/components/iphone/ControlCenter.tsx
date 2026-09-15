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
  , Plus,
  Power
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
    openApp,
    toggleFlashlight,
    lockPhone
  } = useDevice();
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [cellularEnabled, setCellularEnabled] = useState(true);
  const flashlightEnabled = settings.flashlightOn;

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
      className="ios-control-center absolute inset-0 z-30 bg-transparent p-4 pt-3 pb-5 flex flex-col justify-between select-none font-sans text-white overflow-y-auto animate-in fade-in zoom-in-95 duration-200 cursor-default"
    >
      {/* Compact iOS Control Center top bar */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-full flex items-center justify-between pb-3 shrink-0"
      >
        <button
          onClick={() => sound.tap()}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-white/15 active:scale-90"
          aria-label="Add Control"
        >
          <Plus className="h-5 w-5" />
        </button>
        <button
          onClick={() => {
            sound.tap();
            lockPhone();
            onClose();
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-white/15 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          title="Lock iPhone"
          aria-label="Lock iPhone"
        >
          <Power className="h-5 w-5" />
        </button>
      </div>

      {/* iOS glass bento controls */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="grid flex-1 grid-cols-4 content-start gap-3"
      >
        {/* 1. Connectivity Platter (4-in-1 Tile) */}
        <div className="col-span-2 grid grid-cols-2 gap-2 rounded-[24px] border border-white/20 bg-white/12 p-3 shadow-xl backdrop-blur-2xl">
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
        <div className="col-span-2 flex flex-col justify-between rounded-[24px] border border-white/20 bg-white/12 p-3 shadow-xl backdrop-blur-2xl">
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
        <div className="col-span-1 flex h-40 flex-col items-center justify-between rounded-[24px] border border-white/20 bg-white/12 p-3 shadow-xl backdrop-blur-2xl">
          <Sun className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <input
            type="range"
            min="10"
            max="100"
            value={settings.brightness ?? 80}
            onChange={(e) => updateSettings({ brightness: Number(e.target.value) })}
            className="control-center-slider h-24 w-6 accent-[#007AFF] cursor-pointer"
          />
        </div>

        {/* 4. Volume Slider */}
        <div className="col-span-1 flex h-40 flex-col items-center justify-between rounded-[24px] border border-white/20 bg-white/12 p-3 shadow-xl backdrop-blur-2xl">
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
            className="control-center-slider h-24 w-6 accent-[#007AFF] cursor-pointer"
          />
        </div>

        {/* 5. Dark Mode Toggle */}
        <button
          onClick={() => {
            sound.tap();
            updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
          }}
          className={`col-span-2 p-3 rounded-[20px] backdrop-blur-2xl border border-white/20 flex items-center gap-2.5 transition-all cursor-pointer shadow-xl active:scale-95 ${
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
          className={`col-span-2 p-3 rounded-[20px] backdrop-blur-2xl border border-white/20 flex items-center gap-2.5 transition-all cursor-pointer shadow-xl active:scale-95 ${
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
            void toggleFlashlight();
          }}
          className={`col-span-2 p-3 rounded-[20px] backdrop-blur-2xl border border-white/20 flex items-center gap-2.5 transition-all cursor-pointer shadow-xl active:scale-95 ${
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
          className="col-span-2 p-3 rounded-[20px] bg-white/12 backdrop-blur-2xl border border-white/20 text-white/85 hover:bg-white/20 flex items-center gap-2.5 transition-all cursor-pointer shadow-xl active:scale-95"
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
          className="w-full py-2.5 rounded-2xl bg-white/12 hover:bg-white/20 active:bg-white/25 text-white/85 text-xs font-semibold tracking-tight transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-white/15"
        >
          <ChevronUp className="w-3.5 h-3.5" />
          <span>Swipe Up or Tap to Close</span>
        </button>
      </div>
    </div>
  );
};
