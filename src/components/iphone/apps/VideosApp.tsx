import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { IOSSegmentedControl } from '../ui/IOSSegmentedControl';
import { Video, Play, Tv, Sparkles, Film, X, Clapperboard } from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { VideoAsset } from '../../../types';
import { NativeVideoPlayer } from '../../common/NativeVideoPlayer';
import { sound } from '../../../utils/audioHaptics';

export const VideosApp: React.FC = () => {
  const [playingVideo, setPlayingVideo] = useState<VideoAsset | null>(null);
  const [filter, setFilter] = useState<'all' | 'cinematic'>('all');

  const videos = portfolioData.videos;

  const filteredVideos = videos;

  return (
    <AppWindow
      id="videos"
      title="Videos & Media"
      subtitle={`${videos.length} Video Files`}
      icon={<Tv className="w-4 h-4 text-purple-500" />}
    >
      <div className="space-y-4 pb-8">
        <IOSSegmentedControl
          options={[
            { value: 'all', label: `All Videos (${videos.length})` },
            { value: 'cinematic', label: 'Cinematic HD' },
          ]}
          value={filter}
          onChange={(v) => setFilter(v as any)}
          className="mb-2"
        />

        <div className="space-y-3">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => {
                sound.tap();
                setPlayingVideo(video);
              }}
              className="group relative rounded-2xl bg-neutral-900 overflow-hidden border border-neutral-800 cursor-pointer shadow-md active:scale-98 transition-all"
            >
              <div className="aspect-16/9 bg-gradient-to-tr from-neutral-950 via-slate-900 to-indigo-950 p-4 flex flex-col justify-between text-white relative">
                <div className="flex justify-between items-center z-10">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-md"
                    style={{ backgroundColor: `${video.accentColor}40`, color: video.accentColor }}
                  >
                    {video.category}
                  </span>
                  <span className="text-[11px] font-mono bg-black/70 px-2 py-0.5 rounded-md">
                    {video.duration}
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div
                  className="self-center w-12 h-12 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all shadow-xl z-10"
                  style={{ backgroundColor: `${video.accentColor}CC` }}
                >
                  <Play className="w-5 h-5 ml-0.5 fill-white" />
                </div>

                <div className="z-10">
                  <h4 className="text-[14px] font-bold text-white tracking-tight">
                    {video.title}
                  </h4>
                  <p className="text-[11px] text-white/70 line-clamp-1 mt-0.5">
                    {video.description}
                  </p>
                </div>

                {/* Subtle preview backdrop */}
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Playback Modal with Real HTML5 Video Player */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col justify-between p-3 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pt-2 pb-2 text-white">
            <span className="text-xs font-bold text-neutral-300">
              {playingVideo.category}
            </span>
            <button
              onClick={() => setPlayingVideo(null)}
              className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto w-full max-w-lg mx-auto">
            <NativeVideoPlayer
              fileName={playingVideo.fileName}
              title={playingVideo.title}
              category={playingVideo.category}
              accentColor={playingVideo.accentColor}
              autoPlay={true}
            />

            <div className="mt-3 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-200 text-xs">
              <h3 className="font-bold text-white text-sm">{playingVideo.title}</h3>
              <p className="text-neutral-400 mt-1">{playingVideo.description}</p>
              <div className="text-[10px] font-mono text-cyan-400 mt-2">
                Source File: {playingVideo.fileName}
              </div>
            </div>
          </div>

          <div className="pb-2 text-center text-[11px] text-white/50">
            Tap top-right to exit video
          </div>
        </div>
      )}
    </AppWindow>
  );
};
