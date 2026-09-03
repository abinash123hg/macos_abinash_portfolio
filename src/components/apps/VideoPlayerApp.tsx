import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { VideoAsset } from '../../types';
import { NativeVideoPlayer } from '../common/NativeVideoPlayer';
import { 
  Tv, 
  Play, 
  Film, 
  Sparkles, 
  ListVideo, 
  Maximize2, 
  Clock, 
  Info,
  Layers
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export const VideoPlayerApp: React.FC = () => {
  const videos = portfolioData.videos;
  const [selectedVideo, setSelectedVideo] = useState<VideoAsset>(videos[0]);

  return (
    <div className="h-full w-full flex flex-col md:flex-row bg-neutral-950 text-neutral-100 overflow-hidden select-text">
      {/* Main Theater View */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto space-y-4">
        {/* Video Player */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-neutral-800">
          <NativeVideoPlayer
            fileName={selectedVideo.fileName}
            title={selectedVideo.title}
            category={selectedVideo.category}
            accentColor={selectedVideo.accentColor}
            autoPlay={false}
            className="w-full aspect-16/9"
          />
        </div>

        {/* Video Metadata Panel */}
        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md text-white"
                style={{ backgroundColor: selectedVideo.accentColor }}
              >
                {selectedVideo.category}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                Duration: {selectedVideo.duration}
              </span>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
              {selectedVideo.fileName}
            </span>
          </div>

          <h2 className="text-lg font-bold text-white tracking-tight">
            {selectedVideo.title}
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
            {selectedVideo.description}
          </p>
        </div>
      </div>

      {/* Playlist Sidebar */}
      <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-neutral-800 bg-neutral-900/30 p-4 flex flex-col gap-3 shrink-0 overflow-y-auto">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400 px-1">
          <div className="flex items-center gap-1.5">
            <ListVideo className="w-4 h-4 text-cyan-400" />
            <span>Video Library ({videos.length})</span>
          </div>
          <span className="text-[10px] text-neutral-500 font-mono">1080p MP4</span>
        </div>

        <div className="space-y-2.5">
          {videos.map((vid) => {
            const isSelected = selectedVideo.id === vid.id;
            return (
              <div
                key={vid.id}
                onClick={() => {
                  sound.tap();
                  setSelectedVideo(vid);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-neutral-800/90 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/30'
                    : 'bg-neutral-900/40 border-neutral-800/80 hover:bg-neutral-800/60 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span
                    className="font-bold uppercase tracking-wider px-1.5 py-0.5 rounded text-white"
                    style={{ backgroundColor: `${vid.accentColor}CC` }}
                  >
                    {vid.category}
                  </span>
                  <span className="font-mono text-neutral-400">{vid.duration}</span>
                </div>

                <h4 className={`text-xs font-bold line-clamp-1 ${isSelected ? 'text-cyan-300' : 'text-neutral-200'}`}>
                  {vid.title}
                </h4>

                <p className="text-[10.5px] text-neutral-400 line-clamp-2 leading-relaxed">
                  {vid.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
