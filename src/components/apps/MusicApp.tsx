import React, { useEffect, useState } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Music, 
  Heart, 
  Radio, 
  Disc3, 
  Sparkles, 
  ListMusic,
  Headphones
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

export const MusicApp: React.FC = () => {
  const { 
    musicTracks, 
    nowPlayingTrack, 
    isPlayingMusic, 
    playMusicTrack, 
    togglePlayMusic, 
    nextMusicTrack, 
    prevMusicTrack,
    settings,
    updateSettings
  } = useDevice();
  const macTracks = musicTracks.slice(0, 2);
  const [playback, setPlayback] = useState({ currentTime: 0, duration: 0 });

  useEffect(() => {
    const updatePlayback = () => setPlayback(sound.getTrackProgress());
    updatePlayback();
    const interval = window.setInterval(updatePlayback, 250);
    return () => window.clearInterval(interval);
  }, [nowPlayingTrack, isPlayingMusic]);

  const displayDuration = playback.duration || parseDuration(nowPlayingTrack.duration);
  const playAdjacentTrack = (direction: 1 | -1) => {
    const currentIndex = macTracks.findIndex(track => track.id === nowPlayingTrack.id);
    const nextIndex = (currentIndex + direction + macTracks.length) % macTracks.length;
    playMusicTrack(macTracks[nextIndex]);
  };

  return (
    <div className="h-full w-full flex flex-col md:flex-row bg-[#1e1e20] text-neutral-100 select-text overflow-hidden">
      {/* Music Sidebar */}
      <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-black/30 bg-[#252528] p-3 flex md:flex-col gap-1.5 shrink-0 overflow-x-auto">
        <div className="hidden md:flex items-center gap-2 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
          Apple Music
        </div>

        <button
          className="px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 bg-[#fa2d48] text-white shadow-xs"
        >
          <Radio className="w-4 h-4" />
          <span>Listen Now</span>
        </button>

        <button
          className="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 hover:bg-white/5 text-neutral-300 transition-colors"
        >
          <Disc3 className="w-4 h-4 text-purple-400" />
          <span>Focus & Lo-Fi</span>
        </button>

        <button
          className="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 hover:bg-white/5 text-neutral-300 transition-colors"
        >
          <ListMusic className="w-4 h-4 text-cyan-400" />
          <span>Soundtracks ({musicTracks.length})</span>
        </button>

        {/* Ambient Synthesizer Notice */}
        <div className="hidden md:block mt-auto p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-neutral-400">
          <div className="flex items-center gap-1 text-cyan-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Web Audio Synth</span>
          </div>
          Generative chord progression with mellow polyphonic filters and tape reverb.
        </div>
      </div>

      {/* Main Track List & Player */}
      <div className="flex-1 flex flex-col justify-between bg-[#18181a] overflow-hidden">
        {/* Track List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Soundtracks & Lo-Fi Chill</h2>
              <p className="text-xs text-neutral-400">Abinash's coding & late night research rotation</p>
            </div>
            <span className="text-xs font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
              Lossless Audio
            </span>
          </div>

          <div className="space-y-1.5">
            {macTracks.map((track, idx) => {
              const isCurrent = nowPlayingTrack.id === track.id;

              return (
                <div
                  key={track.id}
                  onClick={() => playMusicTrack(track)}
                  className={`group flex items-center justify-between px-3.5 py-3 rounded-xl border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-rose-500/15 border-rose-500/40 text-white'
                      : 'bg-white/5 hover:bg-white/10 border-transparent text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Index / Playing Equalizer Indicator */}
                    <div className="w-6 text-center text-xs font-mono text-neutral-500 group-hover:text-white">
                      {isCurrent && isPlayingMusic ? (
                        <div className="flex items-end justify-center gap-0.5 h-3.5">
                          <span className="w-0.5 h-3.5 bg-[#fa2d48] animate-pulse" />
                          <span className="w-0.5 h-2 bg-[#fa2d48] animate-bounce" />
                          <span className="w-0.5 h-3 bg-[#fa2d48] animate-pulse" />
                        </div>
                      ) : (
                        idx + 1
                      )}
                    </div>

                    {/* Album Art Preview */}
                    <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                      {track.coverUrl ? (
                        <img 
                          src={resolveMediaUrl(track.coverUrl)} 
                          alt={track.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <Music className="w-5 h-5 text-rose-400" />
                      )}
                    </div>

                    <div>
                      <div className={`text-xs font-bold ${isCurrent ? 'text-rose-400' : 'text-white group-hover:text-rose-300'}`}>
                        {track.title}
                      </div>
                      <div className="text-[11px] text-neutral-400">{track.artist} • {track.album}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-neutral-300">
                      {track.genre || 'Soundtrack'}
                    </span>
                    <span>{track.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* macOS Bottom Now Playing Bar */}
        <div className="h-20 border-t border-black/30 bg-[#222225] px-4 sm:px-6 flex items-center justify-between shrink-0">
          {/* Track Summary */}
          <div className="flex items-center gap-3 w-1/3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-black/60 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center shadow-md">
              {nowPlayingTrack.coverUrl ? (
                <img 
                  src={resolveMediaUrl(nowPlayingTrack.coverUrl)} 
                  alt={nowPlayingTrack.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <Headphones className="w-6 h-6 text-rose-400" />
              )}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{nowPlayingTrack.title}</div>
              <div className="text-[11px] text-neutral-400 truncate">{nowPlayingTrack.artist}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-1.5 w-1/3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => playAdjacentTrack(-1)}
                className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlayMusic}
                className="w-9 h-9 rounded-full bg-white hover:bg-white/90 text-black flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                title={isPlayingMusic ? 'Pause' : 'Play'}
              >
                {isPlayingMusic ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
              </button>

              <button
                onClick={() => playAdjacentTrack(1)}
                className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full max-w-xs flex items-center gap-2 text-[10px] font-mono text-neutral-400">
              <span>{formatTime(playback.currentTime)}</span>
              <input
                type="range"
                min="0"
                max={displayDuration || 1}
                step="0.1"
                value={Math.min(playback.currentTime, displayDuration || 0)}
                onChange={(e) => sound.seekTrack(Number(e.target.value))}
                aria-label="Song progress"
                className="flex-1 accent-[#fa2d48] cursor-pointer"
              />
              <span>{formatTime(displayDuration)}</span>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center justify-end gap-2 w-1/3">
            <Volume2 className="w-4 h-4 text-neutral-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={settings.volume}
              onChange={(e) => updateSettings({ volume: parseInt(e.target.value) })}
              className="w-20 sm:w-28 accent-[#fa2d48] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
