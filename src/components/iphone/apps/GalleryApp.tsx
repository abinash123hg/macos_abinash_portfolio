import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSSegmentedControl } from '../ui/IOSSegmentedControl';
import { useDevice } from '../../../context/DeviceContext';
import { Image as ImageIcon, X, Sparkles, Award, Film, Maximize2, ChevronLeft, ChevronRight, Share, Heart, Smartphone } from 'lucide-react';
import { sound } from '../../../utils/audioHaptics';
import { resolveMediaUrl } from '../../../utils/mediaResolver';

export const GalleryApp: React.FC = () => {
  const { mediaItems, favorites, toggleFavorite, setWallpaper } = useDevice();
  const [filter, setFilter] = useState<'all' | 'favorites' | 'certs' | 'shows'>('all');
  const [activeMedia, setActiveMedia] = useState<any | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  const [wallpaperNotice, setWallpaperNotice] = useState<string | null>(null);
  const swipeStartX = React.useRef<number | null>(null);

  const filteredMedia = mediaItems.filter(m => {
    if (filter === 'favorites') return favorites[m.id] ?? !!m.favorite;
    if (filter === 'certs') return m.category === 'Certificates';
    if (filter === 'shows') return m.category === 'Movies & Series';
    return true;
  });

  const setActiveWallpaper = () => {
    if (!activeMedia) return;
    setWallpaper('ios-home', activeMedia.thumbnail || activeMedia.mediaUrl);
    setWallpaperNotice('Home wallpaper updated');
    window.setTimeout(() => setWallpaperNotice(null), 1400);
  };

  const activeMediaIndex = activeMedia ? filteredMedia.findIndex(item => item.id === activeMedia.id) : -1;
  const showPreviousMedia = () => {
    if (activeMediaIndex < 0 || filteredMedia.length === 0) return;
    sound.tap();
    setActiveMedia(filteredMedia[(activeMediaIndex - 1 + filteredMedia.length) % filteredMedia.length]);
  };
  const showNextMedia = () => {
    if (activeMediaIndex < 0 || filteredMedia.length === 0) return;
    sound.tap();
    setActiveMedia(filteredMedia[(activeMediaIndex + 1) % filteredMedia.length]);
  };

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
          { value: 'favorites', label: 'Favorites' },
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
              setShowDetails(true);
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
                preload="none"
                className="relative w-full h-full object-contain bg-neutral-950"
                onError={(event) => { event.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <img
                src={resolveMediaUrl(item.thumbnail || item.mediaUrl)}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="relative w-full h-full object-contain bg-neutral-950"
                onError={(event) => { event.currentTarget.style.display = 'none'; }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div
          className="ios-photo-viewer fixed inset-0 z-50 bg-black flex flex-col justify-between animate-in fade-in duration-200"
          onTouchStart={(event) => { swipeStartX.current = event.touches[0]?.clientX ?? null; }}
          onTouchEnd={(event) => {
            if (swipeStartX.current === null) return;
            const deltaX = (event.changedTouches[0]?.clientX ?? swipeStartX.current) - swipeStartX.current;
            swipeStartX.current = null;
            if (Math.abs(deltaX) < 45) return;
            if (deltaX < 0) showNextMedia();
            else showPreviousMedia();
          }}
        >
          <div className="ios-photo-viewer__header flex items-center justify-between px-4 pt-[calc(.5rem+env(safe-area-inset-top,0px))]">
            <button onClick={() => setActiveMedia(null)} className="min-h-11 flex items-center gap-1 rounded-full px-2 text-[15px] text-[#0a84ff] active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a84ff]">
              <ChevronLeft className="w-5 h-5" />
              <span>Gallery</span>
            </button>
            <span className="text-[13px] font-bold text-white/75 uppercase truncate max-w-[150px]">
              {activeMedia.category}
            </span>
            <button
              onClick={() => { sound.tap(); if (navigator.share) void navigator.share({ title: activeMedia.title, text: activeMedia.description, url: window.location.href }); }}
              aria-label="Share media"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              <Share className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto flex flex-col items-center text-center px-0 py-4">
            <div className="relative w-full h-[min(70dvh,620px)] bg-black overflow-hidden flex items-center justify-center text-white mb-4">
              {activeMedia.type === 'video' ? (
                <video
                  src={resolveMediaUrl(activeMedia.mediaUrl || activeMedia.thumbnail)}
                  poster={resolveMediaUrl(activeMedia.thumbnail)}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                  onClick={() => setShowDetails((value) => !value)}
                />
              ) : (
                <img
                  src={resolveMediaUrl(activeMedia.mediaUrl || activeMedia.thumbnail)}
                  alt={activeMedia.title}
                  className="w-full h-full object-contain"
                  onClick={() => setShowDetails((value) => !value)}
                  onError={(event) => { event.currentTarget.style.display = 'none'; }}
                />
              )}
              <button onClick={showPreviousMedia} aria-label="Previous media" className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 text-white flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={showNextMedia} aria-label="Next media" className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 text-white flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            {showDetails && (
              <>
                <h3 className="text-[20px] font-bold text-white tracking-tight">{activeMedia.title}</h3>
                <p className="text-[13px] text-white/80 max-w-xs mt-1 leading-relaxed">{activeMedia.description}</p>
                {activeMedia.year && <span className="text-[11px] font-mono text-cyan-300 mt-2 px-2.5 py-0.5 rounded-full bg-white/10">{activeMedia.year}</span>}
              </>
            )}
          </div>

          <div className="ios-photo-viewer__actions flex items-center justify-center gap-2 px-4 pb-[calc(.5rem+env(safe-area-inset-bottom,0px))]">
            {wallpaperNotice && <span className="text-[11px] text-emerald-300">{wallpaperNotice}</span>}
            <button onClick={() => toggleFavorite(activeMedia.id)} aria-label="Toggle favorite" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
              <Heart className={favorites[activeMedia.id] ? 'w-4 h-4 text-rose-400 fill-rose-400' : 'w-4 h-4 text-white'} />
            </button>
            <button onClick={setActiveWallpaper} aria-label="Set as home wallpaper" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-white" />
            </button>
            {!wallpaperNotice && <span className="text-[11px] text-white/50">Tap image for details</span>}
          </div>
        </div>
      )}
    </AppWindow>
  );
};
