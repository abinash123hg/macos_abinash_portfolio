import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSSegmentedControl } from '../ui/IOSSegmentedControl';
import { portfolioData } from '../../../data/portfolioData';
import { Image as ImageIcon, X, Sparkles, Award, Film, Maximize2 } from 'lucide-react';
import { sound } from '../../../utils/audioHaptics';
import { resolveMediaUrl } from '../../../utils/mediaResolver';

export const GalleryApp: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'certs' | 'shows'>('all');
  const [activeMedia, setActiveMedia] = useState<any | null>(null);

  const filteredMedia = portfolioData.media.filter(m => {
    if (filter === 'certs') return m.category === 'Certificates';
    if (filter === 'shows') return m.category === 'Movies & Series';
    return true;
  });

  return (
    <AppWindow
      id="gallery"
      title="Gallery"
      subtitle={`${filteredMedia.length} Visual Assets`}
      icon={<ImageIcon className="w-4 h-4 text-pink-500" />}
    >
      <IOSSegmentedControl
        options={[
          { value: 'all', label: 'All Items' },
          { value: 'certs', label: 'Certificates' },
          { value: 'shows', label: 'Cinema & Stills' },
        ]}
        value={filter}
        onChange={(v) => setFilter(v as any)}
        className="mb-4"
      />

      {/* 2-Column Responsive Visual Masonry */}
      <div className="grid grid-cols-2 gap-2.5">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              sound.tap();
              setActiveMedia(item);
            }}
            className="group relative aspect-4/3 rounded-[16px] bg-neutral-200 dark:bg-neutral-800 overflow-hidden cursor-pointer shadow-xs active:scale-95 transition-all border border-black/5 dark:border-white/10"
          >
            {/* Real portfolio media with a readable fallback behind it. */}
            <div className="absolute inset-0 flex flex-col justify-between p-3 bg-gradient-to-br from-neutral-800 to-neutral-950 text-white">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-md">
                  {item.category}
                </span>
                {item.favorite && <span className="text-rose-400 text-xs">★</span>}
              </div>

              <div>
                <h4 className="text-[13px] font-bold text-white tracking-tight line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[10px] text-white/70 line-clamp-1 mt-0.5">
                  {item.year || item.description}
                </p>
              </div>
            </div>
            {item.type === 'video' ? (
              <video
                src={resolveMediaUrl(item.mediaUrl || item.thumbnail)}
                poster={resolveMediaUrl(item.thumbnail)}
                muted
                playsInline
                className="relative w-full h-full object-cover"
                onError={(event) => { event.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <img
                src={resolveMediaUrl(item.thumbnail || item.mediaUrl)}
                alt={item.title}
                loading="lazy"
                className="relative w-full h-full object-cover"
                onError={(event) => { event.currentTarget.style.display = 'none'; }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl p-4 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold text-white/70 uppercase">
              {activeMedia.category}
            </span>
            <button
              onClick={() => {
                sound.tap();
                setActiveMedia(null);
              }}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto flex flex-col items-center text-center p-4">
            <div className="w-full max-w-[340px] h-56 rounded-3xl bg-white/10 overflow-hidden flex items-center justify-center text-white mb-4 border border-white/20 shadow-2xl">
              {activeMedia.type === 'video' ? (
                <video
                  src={resolveMediaUrl(activeMedia.mediaUrl || activeMedia.thumbnail)}
                  poster={resolveMediaUrl(activeMedia.thumbnail)}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={resolveMediaUrl(activeMedia.mediaUrl || activeMedia.thumbnail)}
                  alt={activeMedia.title}
                  className="w-full h-full object-contain"
                  onError={(event) => { event.currentTarget.style.display = 'none'; }}
                />
              )}
            </div>
            <h3 className="text-[20px] font-bold text-white tracking-tight">
              {activeMedia.title}
            </h3>
            <p className="text-[13px] text-white/80 max-w-xs mt-1 leading-relaxed">
              {activeMedia.description}
            </p>
            {activeMedia.year && (
              <span className="text-[11px] font-mono text-cyan-300 mt-2 px-2.5 py-0.5 rounded-full bg-white/10">
                {activeMedia.year}
              </span>
            )}
          </div>

          <div className="pb-2 text-center text-[11px] text-white/50">
            Tap close to return
          </div>
        </div>
      )}
    </AppWindow>
  );
};
