import React, { useEffect, useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { useDevice } from '../../../context/DeviceContext';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Music, 
  Volume2, 
  Heart, 
  Sparkles, 
  Disc 
} from 'lucide-react';
import { sound } from '../../../utils/audioHaptics';
import { resolveMediaUrl } from '../../../utils/mediaResolver';
const parseDuration = (duration: string) => {
  const [minutes, seconds] = duration.split(':').map(Number);
  return (minutes || 0) * 60 + (seconds || 0);
};

export const MusicApp: React.FC = () => {
  const { 
    musicTracks, 
    nowPlayingTrack, 
    isPlayingMusic, 
    playMusicTrack, 
    togglePlayMusic, 
    nextMusicTrack, 
    prevMusicTrack 
  } = useDevice();
  const iphoneTracks = musicTracks.slice(0, 2);
  const [playback, setPlayback] = useState({ currentTime: 0, duration: 0 });

  useEffect(() => {
    const updatePlayback = () => setPlayback(sound.getTrackProgress());
    updatePlayback();
    const interval = window.setInterval(updatePlayback, 250);
    return () => window.clearInterval(interval);
  }, [nowPlayingTrack, isPlayingMusic]);

  const displayDuration = playback.duration || parseDuration(nowPlayingTrack.duration);
  const progress = displayDuration > 0 ? Math.min(100, (playback.currentTime / displayDuration) * 100) : 0;

  const formatTime = (seconds: number) => {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, '0')}`;
  };

  return (
    <AppWindow
      id="music"
      title="Music"
      subtitle="Now Playing"
      icon={<Music className="w-4 h-4 text-[#FA2D48]" />}
    >
      <div className="flex flex-col justify-between h-full space-y-4 text-white">
        {/* Album Art Showcase */}
        <div className="flex flex-col items-center text-center pt-2">
          <div className="w-48 h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-800 to-black border border-white/10 shadow-2xl flex items-center justify-center relative mb-4">
            {nowPlayingTrack.coverUrl ? (
              <img 
                src={resolveMediaUrl(nowPlayingTrack.coverUrl)} 
                alt={nowPlayingTrack.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <Disc className={`w-24 h-24 text-rose-500 ${isPlayingMusic ? 'animate-spin' : ''}`} />
            )}

            {isPlayingMusic && (
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono text-rose-400 border border-rose-500/30">
                PLAYING
              </div>
            )}
          </div>

          <h3 className="text-base font-bold text-white tracking-tight">{nowPlayingTrack.title}</h3>
          <p className="text-xs text-rose-400 font-medium mt-0.5">{nowPlayingTrack.artist}</p>
          <p className="text-[11px] text-neutral-400">{nowPlayingTrack.album} • {nowPlayingTrack.genre || 'Ambient'}</p>
        </div>

        {/* Playback Controls */}
        <div className="bg-neutral-900/90 border border-white/10 rounded-2xl p-4 space-y-3">
          {/* Scrubber bar */}
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <input
                  type="range"
                  min="0"
                  max={displayDuration || 1}
                  step="0.1"
                  value={Math.min(playback.currentTime, displayDuration || 0)}
                  onChange={(event) => sound.seekTrack(Number(event.target.value))}
                  aria-label="Song progress"
                  className="h-1.5 w-full accent-[#FA2D48] cursor-pointer"
                />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-neutral-400">
              <span>{formatTime(playback.currentTime)}</span>
              <span>{formatTime(displayDuration)}</span>
            </div>
          </div>

          {/* Transport buttons */}
          <div className="flex items-center justify-center gap-6 pt-1">
            <button
              onClick={prevMusicTrack}
              className="p-2 rounded-full hover:bg-white/10 text-white active:scale-90 transition-transform cursor-pointer"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlayMusic}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer"
            >
              {isPlayingMusic ? (
                <Pause className="w-5 h-5 fill-black" />
              ) : (
                <Play className="w-5 h-5 fill-black ml-0.5" />
              )}
            </button>

            <button
              onClick={nextMusicTrack}
              className="p-2 rounded-full hover:bg-white/10 text-white active:scale-90 transition-transform cursor-pointer"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Playlist Queue */}
        <div className="space-y-1.5 pb-2">
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-1">
            Up Next in Queue ({musicTracks.length})
          </div>

          <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
            {iphoneTracks.map((track) => {
              const isCurr = track.id === nowPlayingTrack.id;
              return (
                <div
                  key={track.id}
                  onClick={() => playMusicTrack(track)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                    isCurr 
                      ? 'bg-rose-500/20 border-rose-500/40 text-white' 
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-black/50 overflow-hidden shrink-0 flex items-center justify-center border border-white/10">
                      {track.coverUrl ? (
                        <img 
                          src={resolveMediaUrl(track.coverUrl)} 
                          alt={track.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <Music className="w-3.5 h-3.5 text-rose-400" />
                      )}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate">{track.title}</div>
                      <div className="text-[10px] text-neutral-400 truncate">{track.artist}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 shrink-0">{track.duration}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppWindow>
  );
};
