import React, { useState } from 'react';
import { useDevice } from '../../../context/DeviceContext';
import { 
  Wifi, 
  Bluetooth, 
  Share2, 
  Moon, 
  Sun, 
  Volume2, 
  Play, 
  Pause,
  SkipForward, 
  SkipBack, 
  Layers, 
  Cast, 
  BriefcaseBusiness,
  Mic, 
  Battery, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { sound } from '../../../utils/audioHaptics';

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({ isOpen, onClose }) => {
  const {
    settings,
    updateSettings,
    openDesktopWindow,
    nowPlayingTrack,
    isPlayingMusic,
    togglePlayMusic,
    nextMusicTrack,
    prevMusicTrack,
  } = useDevice();
  const [airdropEnabled, setAirdropEnabled] = useState(true);
  const [stageManager, setStageManager] = useState(false);
  const [screenMirroring, setScreenMirroring] = useState(false);

  if (!isOpen) return null;

  const wifiEnabled = settings.wifiEnabled;
  const bluetoothEnabled = settings.bluetoothEnabled;
  const focusEnabled = settings.focusMode;
  const displayBrightness = settings.brightness ?? 90;
  const soundVolume = settings.volume ?? 75;

  return (
    <div 
      className="fixed top-[32px] right-3 z-50 w-[325px] rounded-[18px] bg-[#eef2f8]/80 backdrop-blur-3xl border border-white/80 p-3 shadow-[0_24px_50px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] text-neutral-800 select-none animate-in fade-in zoom-in-95 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1. Large System Settings Microphone Pill (Top indicator) */}
      <div className="mb-2.5 px-3 py-2 rounded-[13px] bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-xs">
            <Mic className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[12.5px] font-semibold text-neutral-900 leading-tight">
              System Settings
            </div>
            <div className="text-[10.5px] text-neutral-500">
              Microphone in use
            </div>
          </div>
        </div>
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
      </div>

      {/* 2. Top 2-Column Section */}
      <div className="grid grid-cols-2 gap-2.5 mb-2.5">
        {/* Left Column: Connectivity (Wi-Fi, Bluetooth, AirDrop) Card */}
        <div className="rounded-[14px] bg-white/70 backdrop-blur-xl border border-white/80 p-2 shadow-xs space-y-1.5">
          {/* Wi-Fi */}
          <div 
            onClick={() => {
              updateSettings({ wifiEnabled: !wifiEnabled });
            }}
            className="flex items-center justify-between p-1.5 rounded-[9px] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                wifiEnabled ? 'bg-[#007aff] text-white shadow-[0_1px_3px_rgba(0,122,255,0.4)]' : 'bg-black/10 text-neutral-600'
              }`}>
                <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
              </div>
              <div className="text-left">
                <div className="text-[11.5px] font-semibold text-neutral-900 leading-tight">Wi-Fi</div>
                <div className="text-[10px] text-neutral-500 leading-tight">{wifiEnabled ? 'Connected' : 'Off'}</div>
              </div>
            </div>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
          </div>

          {/* Bluetooth */}
          <div 
            onClick={() => {
              updateSettings({ bluetoothEnabled: !bluetoothEnabled });
            }}
            className="flex items-center justify-between p-1.5 rounded-[9px] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                bluetoothEnabled ? 'bg-[#007aff] text-white shadow-[0_1px_3px_rgba(0,122,255,0.4)]' : 'bg-black/10 text-neutral-600'
              }`}>
                <Bluetooth className="w-3.5 h-3.5 stroke-[2.2]" />
              </div>
              <div className="text-left">
                <div className="text-[11.5px] font-semibold text-neutral-900 leading-tight">Bluetooth</div>
                <div className="text-[10px] text-neutral-500 leading-tight">{bluetoothEnabled ? 'On' : 'Off'}</div>
              </div>
            </div>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
          </div>

          {/* AirDrop */}
          <div 
            onClick={() => {
              sound.tap();
              setAirdropEnabled(!airdropEnabled);
            }}
            className="flex items-center justify-between p-1.5 rounded-[9px] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                airdropEnabled ? 'bg-[#007aff] text-white shadow-[0_1px_3px_rgba(0,122,255,0.4)]' : 'bg-black/10 text-neutral-600'
              }`}>
                <Share2 className="w-3.5 h-3.5 stroke-[2.2]" />
              </div>
              <div className="text-left">
                <div className="text-[11.5px] font-semibold text-neutral-900 leading-tight">AirDrop</div>
                <div className="text-[10px] text-neutral-500 leading-tight">{airdropEnabled ? 'Everyone' : 'Contacts'}</div>
              </div>
            </div>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
          </div>
        </div>

        {/* Right Column: Focus (Do Not Disturb) + Theme Toggle */}
        <div className="flex flex-col gap-2">
          {/* Focus / Do Not Disturb Module */}
          <div 
            onClick={() => {
              updateSettings({ focusMode: !focusEnabled });
            }}
            className="rounded-[14px] bg-white/70 backdrop-blur-xl border border-white/80 p-2.5 shadow-xs flex items-center justify-between hover:bg-white/85 transition-all cursor-pointer flex-1"
          >
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                focusEnabled ? 'bg-[#5856d6] text-white shadow-[0_1px_3px_rgba(88,86,214,0.4)]' : 'bg-black/10 text-neutral-600'
              }`}>
                <Moon className="w-3.5 h-3.5 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-[11.5px] font-semibold text-neutral-900 leading-tight">Do Not Disturb</div>
                <div className="text-[10px] text-neutral-500 leading-tight">{focusEnabled ? 'On' : 'Off'}</div>
              </div>
            </div>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
          </div>

          {/* Dual Small Toggles: Theme Mode & iPhone Mode */}
          <div className="grid grid-cols-2 gap-2">
            {/* Theme Toggle */}
            <div 
              onClick={() => {
                updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
              }}
              className="rounded-[14px] p-2.5 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border bg-white/70 border-white/80 hover:bg-white/90 shadow-xs"
            >
              {settings.theme === 'dark' ? (
                <Moon className="w-4 h-4 text-[#5856d6]" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
              <span className="text-[9.5px] font-medium text-neutral-700 text-center leading-tight">
                {settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>

            <div
              onClick={() => {
                sound.tap();
                openDesktopWindow('recruiter');
                onClose();
              }}
              className="rounded-[14px] p-2.5 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border bg-white/70 border-white/80 hover:bg-white/90 shadow-xs"
            >
              <BriefcaseBusiness className="w-4 h-4 text-[#007aff]" />
              <span className="text-[9.5px] font-medium text-neutral-700 text-center leading-tight">
                HR View
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Display Brightness Slider Card */}
      <div className="rounded-[14px] bg-white/70 backdrop-blur-xl border border-white/80 p-3 mb-2.5 shadow-xs">
        <div className="flex items-center justify-between text-[11.5px] font-semibold text-neutral-900 mb-1.5">
          <span>Display</span>
          <span className="text-[10px] font-normal text-neutral-500">{displayBrightness}%</span>
        </div>
        <div className="relative h-7 bg-black/10 rounded-full flex items-center px-2 overflow-hidden shadow-inner">
          <div 
            className="absolute top-0 bottom-0 left-0 bg-white shadow-xs rounded-full transition-all"
            style={{ width: `${displayBrightness}%` }}
          />
          <Sun className="relative z-10 w-4 h-4 text-neutral-700 ml-1 stroke-[2]" />
          <input
            type="range"
            min="20"
            max="100"
            value={displayBrightness}
            onChange={(e) => updateSettings({ brightness: Number(e.target.value) })}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </div>
      </div>

      {/* 4. Sound Volume Slider Card */}
      <div className="rounded-[14px] bg-white/70 backdrop-blur-xl border border-white/80 p-3 mb-2.5 shadow-xs">
        <div className="flex items-center justify-between text-[11.5px] font-semibold text-neutral-900 mb-1.5">
          <span>Sound</span>
          <span className="text-[10px] font-normal text-neutral-500">{soundVolume}%</span>
        </div>
        <div className="relative h-7 bg-black/10 rounded-full flex items-center px-2 overflow-hidden shadow-inner">
          <div 
            className="absolute top-0 bottom-0 left-0 bg-white shadow-xs rounded-full transition-all"
            style={{ width: `${soundVolume}%` }}
          />
          <Volume2 className="relative z-10 w-4 h-4 text-neutral-700 ml-1 stroke-[2]" />
          <input
            type="range"
            min="0"
            max="100"
            value={soundVolume}
            onChange={(e) => updateSettings({ volume: Number(e.target.value) })}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </div>
      </div>

      {/* 5. Music / Media Player Module */}
      <div className="rounded-[14px] bg-white/70 backdrop-blur-xl border border-white/80 p-3 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[8px] bg-gradient-to-br from-purple-500 to-indigo-600 border border-black/5 flex items-center justify-center text-white shadow-inner">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[12px] font-semibold text-neutral-900 leading-tight">
              Portfolio Audio
            </div>
            <div className="text-[10.5px] text-neutral-500">
              {isPlayingMusic ? nowPlayingTrack?.title || 'Playing' : 'Tap play to listen'}
            </div>
          </div>
        </div>

        {/* Media Controls */}
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => {
              sound.tap();
              prevMusicTrack();
            }}
            className="w-7 h-7 rounded-full hover:bg-black/5 flex items-center justify-center text-neutral-700 cursor-pointer"
          >
            <SkipBack className="w-3.5 h-3.5 fill-current" />
          </button>
          <button 
            onClick={() => {
              sound.tap();
              togglePlayMusic();
            }}
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-900 shadow-xs border border-black/10 cursor-pointer active:scale-95"
          >
            {isPlayingMusic ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>
          <button 
            onClick={() => {
              sound.tap();
              nextMusicTrack();
            }}
            className="w-7 h-7 rounded-full hover:bg-black/5 flex items-center justify-center text-neutral-700 cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};
