import React, { useEffect, useState } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { 
  Airplay,
  Bell,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  Headphones,
  Phone,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Sparkles,
  Timer,
  Wifi,
  BatteryCharging,
  Music, 
  Disc
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';
import { resolveMediaUrl } from '../../utils/mediaResolver';

const parseDuration = (duration: string) => {
  const [minutes, seconds] = duration.split(':').map(Number);
  return (minutes || 0) * 60 + (seconds || 0);
};

const formatTime = (seconds: number) => {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, '0')}`;
};

export const DynamicIsland: React.FC = () => {
  const { 
    dynamicIsland, 
    setDynamicIslandExpanded, 
    nowPlayingTrack, 
    musicTracks,
    isPlayingMusic, 
    playMusicTrack,
    togglePlayMusic, 
    openApp 
  } = useDevice();
  const [playback, setPlayback] = useState({ currentTime: 0, duration: 0 });
  const iphoneTracks = musicTracks.slice(0, 2);
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = dynamicIsland.expanded || internalExpanded;

  useEffect(() => {
    if (!isExpanded) return;

    const dismissTimer = window.setTimeout(() => {
      setInternalExpanded(false);
      setDynamicIslandExpanded(false);
    }, 1000);

    return () => window.clearTimeout(dismissTimer);
  }, [isExpanded, setDynamicIslandExpanded]);

  const handleIslandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.tap();
    const nextExpanded = !isExpanded;
    setInternalExpanded(nextExpanded);
    setDynamicIslandExpanded(nextExpanded);
  };

  const track = nowPlayingTrack || {
    id: 'default-1',
    title: 'Solaris Groove',
    artist: 'Abinash Swain',
    album: 'Neural Beats',
    duration: '3:24',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80'
  };

  const mode = dynamicIsland.mode;
    const displayDuration = playback.duration || parseDuration(track.duration);
    const progress = displayDuration > 0 ? Math.min(100, (playback.currentTime / displayDuration) * 100) : 0;

    useEffect(() => {
      const updatePlayback = () => setPlayback(sound.getTrackProgress());
      updatePlayback();
      const interval = window.setInterval(updatePlayback, 250);
      return () => window.clearInterval(interval);
    }, [track.id, isPlayingMusic]);
  const isMusic = mode === 'music' || (mode === 'idle' && isPlayingMusic);
  const modeIcon = mode === 'camera'
    ? <Camera className="h-5 w-5" />
    : mode === 'ai'
      ? <Sparkles className="h-5 w-5" />
      : mode === 'charging'
        ? <BatteryCharging className="h-5 w-5" />
        : mode === 'call'
          ? <Phone className="h-5 w-5" />
          : mode === 'airdrop'
            ? <Airplay className="h-5 w-5" />
            : mode === 'timer'
              ? <Timer className="h-5 w-5" />
              : mode === 'notification'
                ? <Bell className="h-5 w-5" />
                : <CheckCircle2 className="h-5 w-5" />;

  const playAdjacentTrack = (direction: 1 | -1) => {
    if (!nowPlayingTrack || iphoneTracks.length === 0) return;
    const currentIndex = iphoneTracks.findIndex(item => item.id === nowPlayingTrack.id);
    const nextIndex = (currentIndex + direction + iphoneTracks.length) % iphoneTracks.length;
    playMusicTrack(iphoneTracks[nextIndex]);
  };

  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex items-start justify-center pointer-events-auto">
      <div
        onClick={handleIslandClick}
        className={`bg-black text-white transition-[width,min-height,border-radius,padding] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center shadow-2xl cursor-pointer select-none border border-white/10 will-change-transform overflow-hidden ${
          isExpanded
            ? 'w-[calc(100vw-32px)] max-w-[360px] min-h-[112px] p-4 rounded-[30px] flex-col justify-between'
            : 'w-[126px] h-[37px] px-3 rounded-full justify-between hover:scale-[1.03] active:scale-95'
        }`}
        style={{
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        }}
      >
        {!isExpanded ? (
          <div className="relative flex w-full items-center justify-between">
            <div className={`h-4 w-4 overflow-hidden rounded-full ${isMusic ? 'bg-rose-500/30' : 'bg-neutral-900'} flex items-center justify-center shrink-0`}>
              {isMusic && track.coverUrl ? <img src={resolveMediaUrl(track.coverUrl)} alt="" className="h-full w-full object-cover" /> : <Music className="h-2.5 w-2.5 text-rose-400" />}
            </div>
            <div className="absolute left-1/2 top-1/2 h-[23px] w-[62px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#050505] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]" />
            <div className="flex items-end gap-0.5 h-3 shrink-0">
              {isMusic && isPlayingMusic ? <><span className="h-2 w-0.5 rounded-full bg-rose-400 animate-pulse" /><span className="h-3 w-0.5 rounded-full bg-rose-500 animate-bounce" /><span className="h-1.5 w-0.5 rounded-full bg-rose-400 animate-pulse" /></> : <span className={`h-2 w-2 rounded-full ${mode === 'camera' ? 'bg-emerald-400 animate-pulse' : mode === 'ai' ? 'bg-cyan-400 animate-pulse' : 'bg-neutral-700'}`} />}
            </div>
          </div>
        ) : (
          <div
            className="w-full flex flex-col justify-between gap-4 text-white animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center gap-3">
              {isMusic ? <div
                onClick={() => {
                  sound.tap();
                  openApp('music');
                  setInternalExpanded(false);
                  setDynamicIslandExpanded(false);
                }}
                className="h-12 w-12 rounded-2xl overflow-hidden bg-neutral-900 border border-white/15 shrink-0 flex items-center justify-center shadow-md relative group cursor-pointer"
              >
                {track.coverUrl ? (
                  <img 
                    src={resolveMediaUrl(track.coverUrl)} 
                    alt={track.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <Disc className="w-8 h-8 text-rose-500" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
              </div> : <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/10 shrink-0 flex items-center justify-center text-cyan-400">{modeIcon}</div>}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 font-mono">
                    {isMusic ? 'Now Playing' : mode === 'idle' ? 'Portfolio' : 'Live Activity'}
                  </span>
                  {((isMusic && isPlayingMusic) || mode !== 'idle') && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  )}
                </div>
                <h4 className="text-[13px] font-bold text-white truncate tracking-tight mt-0.5">
                  {isMusic ? track.title : dynamicIsland.title || 'Abinash OS 15.4'}
                </h4>
                <p className="text-[11px] text-neutral-400 truncate">
                  {isMusic ? track.artist : dynamicIsland.subtitle || 'Portfolio activity is live'}
                </p>
              </div>

              {/* Dynamic Soundwave Waveform */}
              {isMusic && <div className="flex items-end gap-1 h-6 pr-1">
                {isPlayingMusic ? (
                  <>
                    <div className="w-1 h-3.5 bg-rose-400 rounded-full animate-bounce" />
                    <div className="w-1 h-5.5 bg-rose-500 rounded-full animate-pulse" />
                    <div className="w-1 h-4 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '120ms' }} />
                    <div className="w-1 h-2 bg-rose-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
                  </>
                ) : (
                  <span className="text-[10px] text-neutral-500 font-mono">Paused</span>
                )}
              </div>}
            </div>

            {isMusic && <div className="space-y-1 px-0.5">
              <input
                type="range"
                min="0"
                max={displayDuration || 1}
                step="0.1"
                value={Math.min(playback.currentTime, displayDuration || 0)}
                onPointerDown={(e) => e.stopPropagation()}
                onChange={(e) => sound.seekTrack(Number(e.target.value))}
                aria-label="Song progress"
                className="h-1.5 w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[9.5px] font-mono text-neutral-400">
                <span>{formatTime(playback.currentTime)}</span>
                <span>{formatTime(displayDuration)}</span>
              </div>
            </div>}

            {isMusic ? <div className="flex items-center justify-between pt-1 border-t border-white/10">
              <button
                onClick={() => {
                  sound.tap();
                  openApp('music');
                  setInternalExpanded(false);
                  setDynamicIslandExpanded(false);
                }}
                className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <Music className="w-3.5 h-3.5 text-rose-400" />
                <span>Open Music</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.tap();
                    playAdjacentTrack(-1);
                  }}
                  className="p-1.5 rounded-full hover:bg-white/15 text-white active:scale-90 transition-transform cursor-pointer"
                  title="Previous Track"
                >
                  <SkipBack className="w-4 h-4 fill-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.tap();
                    togglePlayMusic();
                  }}
                  className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 text-black flex items-center justify-center active:scale-90 transition-transform shadow-md cursor-pointer"
                  title={isPlayingMusic ? 'Pause' : 'Play'}
                >
                  {isPlayingMusic ? (
                    <Pause className="w-4 h-4 fill-black" />
                  ) : (
                    <Play className="w-4 h-4 fill-black ml-0.5" />
                  )}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.tap();
                    playAdjacentTrack(1);
                  }}
                  className="p-1.5 rounded-full hover:bg-white/15 text-white active:scale-90 transition-transform cursor-pointer"
                  title="Next Track"
                >
                  <SkipForward className="w-4 h-4 fill-white" />
                </button>
              </div>
            </div> : <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-neutral-400"><span>{mode === 'charging' ? 'Power connected' : mode === 'call' ? 'Active call' : mode === 'timer' ? 'Timer running' : 'Tap to dismiss'}</span><ChevronRight className="h-4 w-4 text-neutral-500" /></div>}
          </div>
        )}
      </div>
    </div>
  );
};
