import React, { useState } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { MediaItem } from '../../types';
import { 
  Image as ImageIcon, 
  Heart, 
  Film, 
  Award, 
  Sparkles, 
  Grid, 
  X, 
  Info, 
  Share2, 
  Trash2,
  Monitor,
  Lock,
  Layers,
  Check,
  RotateCcw,
  Maximize2,
  Camera
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';
import { resolveMediaUrl } from '../../utils/mediaResolver';

export const PhotosApp: React.FC = () => {
  const { 
    mediaItems, 
    favorites, 
    toggleFavorite, 
    moveToTrash, 
    setWallpaper 
  } = useDevice();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [showWallpaperDialog, setShowWallpaperDialog] = useState(false);
  const [wallpaperSetSuccess, setWallpaperSetSuccess] = useState<string | null>(null);

  const isItemFavorite = (item: MediaItem) => {
    return favorites[item.id] !== undefined ? favorites[item.id] : !!item.favorite;
  };

  const filteredMedia = mediaItems.filter(m => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'favorites') return isItemFavorite(m);
    if (selectedCategory === 'photography') return m.category === 'Photography';
    if (selectedCategory === 'movies') return m.category === 'Movies & Series';
    if (selectedCategory === 'certificates') return m.category === 'Certificates';
    return true;
  });

  const favoritesCount = mediaItems.filter(isItemFavorite).length;
  const certificatesCount = mediaItems.filter(m => m.category === 'Certificates').length;

  const handleSetWallpaper = (target: 'mac-desktop' | 'mac-lock' | 'mac-both') => {
    if (!activeMedia) return;
    const mediaUrl = activeMedia.thumbnail || activeMedia.url;
    setWallpaper(target, mediaUrl);
    
    let label = 'Desktop Wallpaper';
    if (target === 'mac-lock') label = 'Lock Screen';
    if (target === 'mac-both') label = 'Desktop & Lock Screen';

    setWallpaperSetSuccess(label);
    setTimeout(() => {
      setWallpaperSetSuccess(null);
      setShowWallpaperDialog(false);
    }, 1400);
  };

  const handleDeleteItem = (item: MediaItem) => {
    moveToTrash(item, 'photo');
    if (activeMedia?.id === item.id) {
      setActiveMedia(null);
      setShowWallpaperDialog(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col md:flex-row bg-[#1e1e1e] text-neutral-100 overflow-hidden select-text">
      {/* Photos Sidebar */}
      <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-black/30 bg-[#252526] p-3 flex md:flex-col gap-1.5 shrink-0 overflow-x-auto">
        <div className="hidden md:flex items-center gap-2 px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
          Photos Library
        </div>

        <button
          onClick={() => { sound.tap(); setSelectedCategory('all'); }}
          className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
            selectedCategory === 'all' ? 'bg-[#007aff] text-white shadow-xs' : 'hover:bg-white/5 text-neutral-300'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>All Photos ({mediaItems.length})</span>
        </button>

        <button
          onClick={() => { sound.tap(); setSelectedCategory('favorites'); }}
          className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
            selectedCategory === 'favorites' ? 'bg-rose-600 text-white shadow-xs' : 'hover:bg-white/5 text-neutral-300'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Favourites ({favoritesCount})</span>
        </button>

        <button
          onClick={() => { sound.tap(); setSelectedCategory('photography'); }}
          className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
            selectedCategory === 'photography' ? 'bg-cyan-600 text-white shadow-xs' : 'hover:bg-white/5 text-neutral-300'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Photography</span>
        </button>

        <button
          onClick={() => { sound.tap(); setSelectedCategory('movies'); }}
          className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
            selectedCategory === 'movies' ? 'bg-amber-600 text-white shadow-xs' : 'hover:bg-white/5 text-neutral-300'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Cinema & TV</span>
        </button>

        <button
          onClick={() => { sound.tap(); setSelectedCategory('certificates'); }}
          className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
            selectedCategory === 'certificates' ? 'bg-emerald-600 text-white shadow-xs' : 'hover:bg-white/5 text-neutral-300'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certifications ({certificatesCount})</span>
        </button>
      </div>

      {/* Main Photos Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#181818]">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              {selectedCategory === 'all' 
                ? 'All Photos' 
                : selectedCategory === 'favorites' 
                ? 'Favourites' 
                : selectedCategory === 'certificates' 
                ? 'Certifications' 
                : selectedCategory === 'movies' 
                ? 'Cinema & TV' 
                : 'Photography'}
            </h2>
            <p className="text-xs text-neutral-400">{filteredMedia.length} Visual Items</p>
          </div>
          <span className="text-[11px] text-neutral-400 font-mono">Synced with iCloud</span>
        </div>

        {filteredMedia.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <ImageIcon className="w-12 h-12 text-neutral-600 mb-3" />
            <p className="text-sm text-neutral-400">No items found in this section</p>
            <p className="text-xs text-neutral-600 mt-1">Items moved to Trash can be restored from the Trash Bin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {filteredMedia.map((m) => {
              const isFav = isItemFavorite(m);
              const imageSrc = resolveMediaUrl(m.thumbnail || m.url);

              return (
                <div
                  key={m.id}
                  onClick={() => {
                    sound.tap();
                    setActiveMedia(m);
                    setShowWallpaperDialog(false);
                  }}
                  className="group relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-[#007aff] transition-all cursor-pointer shadow-md"
                >
                  {/* Photo Thumbnail / Poster */}
                  {imageSrc ? (
                    <img 
                      src={imageSrc} 
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // fallback to styled gradient card if direct image file missing
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}

                  {/* Gradient Card Overlay with metadata */}
                  <div className="absolute inset-0 p-3 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-black/60 text-white font-mono backdrop-blur-md border border-white/10">
                        {m.category === 'Certificates' ? 'CERTIFICATE' : m.category === 'Photography' ? 'PHOTO' : 'CINEMA'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(m.id);
                        }}
                        className={`p-1.5 rounded-full bg-black/60 backdrop-blur-md transition-colors cursor-pointer ${
                          isFav ? 'text-rose-500' : 'text-neutral-400 hover:text-white'
                        }`}
                        title={isFav ? 'Favorited' : 'Add to Favorites'}
                      >
                        <Heart className="w-3.5 h-3.5" fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-[#007aff] transition-colors line-clamp-1 drop-shadow-md">
                        {m.title}
                      </div>
                      <div className="text-[10px] text-neutral-300 drop-shadow-sm">{m.year || '2026'}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Photo Inspector Lightbox */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#202022] border border-white/15 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative text-neutral-100 animate-in fade-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button
              onClick={() => {
                sound.tap();
                setActiveMedia(null);
                setShowWallpaperDialog(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Media Preview Box */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center border border-white/10">
              <img 
                src={resolveMediaUrl(activeMedia.thumbnail || activeMedia.url)} 
                alt={activeMedia.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-xs font-semibold text-white border border-white/10">
                {activeMedia.category}
              </div>
            </div>

            {/* Title & Details */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white tracking-tight">{activeMedia.title}</h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  {activeMedia.year || '2026'}
                </span>
              </div>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{activeMedia.description}</p>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {/* Set as Wallpaper Button */}
                <button
                  onClick={() => {
                    sound.tap();
                    setShowWallpaperDialog(prev => !prev);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-[#007aff] hover:bg-[#007aff]/90 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Set as Wallpaper</span>
                </button>

                {/* Favorite Toggle Button */}
                <button
                  onClick={() => toggleFavorite(activeMedia.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    favorites[activeMedia.id] 
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
                      : 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" fill={favorites[activeMedia.id] ? 'currentColor' : 'none'} />
                  <span>{favorites[activeMedia.id] ? 'Favorited' : 'Favorite'}</span>
                </button>
              </div>

              {/* Move to Trash Button */}
              <button
                onClick={() => handleDeleteItem(activeMedia)}
                className="px-3 py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Move to Trash"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Move to Trash</span>
              </button>
            </div>

            {/* Wallpaper Selection Dialog / Popover */}
            {showWallpaperDialog && (
              <div className="p-4 rounded-xl bg-black/90 border border-white/20 shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Set As Desktop Wallpaper
                  </span>
                  {wallpaperSetSuccess && (
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Updated!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleSetWallpaper('mac-desktop')}
                    className="p-2.5 rounded-lg bg-white/10 hover:bg-[#007aff] text-neutral-200 hover:text-white flex flex-col items-center gap-1 text-xs font-medium transition-all cursor-pointer"
                  >
                    <Monitor className="w-4 h-4" />
                    <span>Desktop</span>
                  </button>

                  <button
                    onClick={() => handleSetWallpaper('mac-lock')}
                    className="p-2.5 rounded-lg bg-white/10 hover:bg-[#007aff] text-neutral-200 hover:text-white flex flex-col items-center gap-1 text-xs font-medium transition-all cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Lock Screen</span>
                  </button>

                  <button
                    onClick={() => handleSetWallpaper('mac-both')}
                    className="p-2.5 rounded-lg bg-white/10 hover:bg-[#007aff] text-neutral-200 hover:text-white flex flex-col items-center gap-1 text-xs font-medium transition-all cursor-pointer"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Both</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
