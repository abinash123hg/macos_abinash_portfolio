import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  FastForward, 
  Sparkles,
  Film
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';
import { getAssetCandidates } from '../../utils/mediaResolver';

interface NativeVideoPlayerProps {
  fileName: string;
  title: string;
  category?: string;
  accentColor?: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  className?: string;
}

export const NativeVideoPlayer: React.FC<NativeVideoPlayerProps> = ({
  fileName,
  title,
  category,
  accentColor = '#007AFF',
  autoPlay = false,
  onEnded,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [srcIndex, setSrcIndex] = useState(0);

  const candidates = getAssetCandidates(fileName);

  const togglePlay = () => {
    sound.tap();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    sound.tap();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    videoRef.current.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress((cur / dur) * 100);
  };

  const cycleSpeed = () => {
    sound.tap();
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const toggleFullscreen = () => {
    sound.tap();
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleVideoError = () => {
    if (srcIndex < candidates.length - 1) {
      setSrcIndex(prev => prev + 1);
    }
  };

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-2xl flex flex-col justify-between ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <div className="relative w-full h-full flex items-center justify-center bg-neutral-950">
        <video
          ref={videoRef}
          src={candidates[srcIndex] || `/${fileName}`}
          onError={handleVideoError}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            setIsPlaying(false);
            onEnded?.();
          }}
          onClick={togglePlay}
          playsInline
          className="w-full h-full object-contain cursor-pointer max-h-[70vh]"
        />

        {/* Center Play/Pause Splash Overlay */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs cursor-pointer transition-all"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform transform group-hover:scale-110 active:scale-95"
              style={{ backgroundColor: accentColor }}
            >
              <Play className="w-7 h-7 ml-1 fill-white" />
            </div>
          </div>
        )}
      </div>

      {/* Floating Header Banner */}
      <div className={`absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between text-white transition-opacity duration-300 pointer-events-none ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-2">
          {category && (
            <span
              className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md text-white backdrop-blur-md"
              style={{ backgroundColor: `${accentColor}DD` }}
            >
              {category}
            </span>
          )}
          <span className="text-xs font-bold text-white drop-shadow-md truncate max-w-[240px]">
            {title}
          </span>
        </div>
      </div>

      {/* Native Apple TV Style Control Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2 transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Scrubber */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-300">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress || 0}
            onChange={handleSeek}
            className="flex-1 h-1.5 bg-neutral-700/80 rounded-lg appearance-none cursor-pointer accent-[#007AFF] hover:h-2 transition-all"
          />
          <span>{formatTime(duration)}</span>
        </div>

        {/* Buttons Bar */}
        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-lg bg-white/15 hover:bg-white/30 text-white cursor-pointer transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg bg-white/15 hover:bg-white/30 text-white cursor-pointer transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={cycleSpeed}
              className="px-2 py-1 rounded-lg bg-white/15 hover:bg-white/30 text-[11px] font-bold font-mono cursor-pointer transition-colors"
            >
              {playbackSpeed}x
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (videoRef.current) videoRef.current.currentTime = 0;
              }}
              title="Replay"
              className="p-1.5 rounded-lg bg-white/15 hover:bg-white/30 text-white cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={toggleFullscreen}
              title="Fullscreen"
              className="p-1.5 rounded-lg bg-white/15 hover:bg-white/30 text-white cursor-pointer transition-colors"
            >
              <Maximize className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
