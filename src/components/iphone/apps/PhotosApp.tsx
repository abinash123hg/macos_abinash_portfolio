import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSSegmentedControl } from '../ui/IOSSegmentedControl';
import { useDevice } from '../../../context/DeviceContext';
import { MediaItem } from '../../../types';
import { 
  Image as ImageIcon, 
  Heart, 
  Award, 
  Film, 
  X, 
  Trash2, 
  Smartphone, 
  Check, 
  Share 
  ,Video
  ,ChevronLeft
  ,ChevronRight
} from 'lucide-react';
import { sound } from '../../../utils/audioHaptics';
import { resolveMediaUrl } from '../../../utils/mediaResolver';
import { portfolioData } from '../../../data/portfolioData';
import { VideoAsset } from '../../../types';
import { NativeVideoPlayer } from '../../common/NativeVideoPlayer';

export const PhotosApp: React.FC = () => {
  const { 
    mediaItems, 
    favorites, 
    toggleFavorite, 
    moveToTrash, 
    setWallpaper 
  } = useDevice();

  const [activeTab, setActiveTab] = useState<'all' | 'photos' | 'favorites' | 'cinema' | 'certificates' | 'videos'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<MediaItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoAsset | null>(null);
  const [showWallpaperSheet, setShowWallpaperSheet] = useState(false);
  const [wallpaperFeedback, setWallpaperFeedback] = useState<string | null>(null);
  const swipeStartX = React.useRef<number | null>(null);
  const videos = portfolioData.videos;

  const isItemFavorite = (item: MediaItem) => {
    return favorites[item.id] !== undefined ? favorites[item.id] : !!item.favorite;
  };

  const photos = mediaItems.filter((item) => {
    if (activeTab === 'favorites') return isItemFavorite(item);
    if (activeTab === 'photos') return item.category === 'Photography';
    if (activeTab === 'cinema') return item.category === 'Movies & Series';
    if (activeTab === 'certificates') return item.category === 'Certificates';
    if (activeTab === 'videos') return false;
    return true;
  });

  const handleSetWallpaper = (target: 'ios-lock' | 'ios-home' | 'ios-both') => {
    if (!selectedPhoto) return;
    const mediaUrl = selectedPhoto.thumbnail || selectedPhoto.url;
    setWallpaper(target, mediaUrl);

    let label = 'Home Screen';
    if (target === 'ios-lock') label = 'Lock Screen';
    if (target === 'ios-both') label = 'Lock & Home Screen';

    setWallpaperFeedback(label);
    setTimeout(() => {
      setWallpaperFeedback(null);
      setShowWallpaperSheet(false);
    }, 1200);
  };

  const handleDeletePhoto = (item: MediaItem) => {
    moveToTrash(item, 'photo');
    setSelectedPhoto(null);
    setShowWallpaperSheet(false);
  };

  const selectedPhotoIndex = selectedPhoto ? photos.findIndex(item => item.id === selectedPhoto.id) : -1;
  const showPreviousPhoto = () => {
    if (selectedPhotoIndex < 0) return;
    sound.tap();
    setSelectedPhoto(photos[(selectedPhotoIndex - 1 + photos.length) % photos.length]);
  };
  const showNextPhoto = () => {
    if (selectedPhotoIndex < 0) return;
    sound.tap();
    setSelectedPhoto(photos[(selectedPhotoIndex + 1) % photos.length]);
  };

  return (
    <AppWindow
      id="photos"
      title="Photos"
      subtitle={`${photos.length} Items`}
      icon={<ImageIcon className="w-4 h-4 text-rose-500" />}
    >
      <IOSSegmentedControl
        options={[
          { value: 'all', label: 'All' },
          { value: 'photos', label: 'Photos' },
          { value: 'favorites', label: 'Favs' },
          { value: 'cinema', label: 'Cinema' },
          { value: 'certificates', label: 'Certs' },
          { value: 'videos', label: `Videos (${videos.length})` },
        ]}
        value={activeTab}
        onChange={(v) => setActiveTab(v as any)}
        className="mb-4"
      />

      {/* 3-Column Square Grid (iOS 18 Photos Style) */}
      {activeTab === 'videos' ? (
        <div className="grid grid-cols-2 gap-1">
          {videos.map((video) => (
            <button key={video.id} onClick={() => { sound.tap(); setSelectedVideo(video); }} className="relative aspect-video bg-gradient-to-br from-neutral-950 via-slate-900 to-indigo-950 overflow-hidden text-left text-white cursor-pointer">
              <div className="absolute inset-0 p-2 flex flex-col justify-between">
                <span className="text-[8px] uppercase font-bold text-purple-300">{video.category}</span>
                <span className="self-center rounded-full p-2 bg-purple-600/90 text-xs">&#9654;</span>
                <span className="text-[10px] font-semibold line-clamp-1">{video.title}</span>
              </div>
            </button>
          ))}
        </div>
      ) : photos.length === 0 ? (
        <div className="py-16 text-center text-neutral-400">
          <ImageIcon className="w-10 h-10 mx-auto text-neutral-500 mb-2" />
          <p className="text-xs">No photos in this album</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1">
          {photos.map((item) => {
            const isFav = isItemFavorite(item);
            const imageSrc = resolveMediaUrl(item.thumbnail || item.url);

            return (
              <div
                key={item.id}
                onClick={() => {
                  sound.tap();
                  setSelectedPhoto(item);
                  setShowWallpaperSheet(false);
                }}
                className="aspect-square bg-neutral-900 overflow-hidden text-white cursor-pointer active:opacity-75 transition-opacity relative group"
              >
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}

                {/* Overlaid Badges */}
                <div className="absolute inset-0 p-1.5 flex flex-col justify-between bg-gradient-to-t from-black/60 via-transparent to-black/30">
                  <div className="flex justify-between items-center">
                    {item.category === 'Certificates' ? (
                      <Award className="w-3 h-3 text-amber-400 drop-shadow-sm" />
                    ) : (
                      <Film className="w-3 h-3 text-rose-400 drop-shadow-sm" />
                    )}
                    {isFav && <Heart className="w-3 h-3 text-rose-500 fill-rose-500 drop-shadow-sm" />}
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold text-white line-clamp-1 drop-shadow-md">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Fullscreen iOS Photo Viewer Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col justify-between p-4 animate-in fade-in zoom-in-95 duration-200 text-white"
          onTouchStart={(event) => { swipeStartX.current = event.touches[0]?.clientX ?? null; }}
          onTouchEnd={(event) => {
            if (swipeStartX.current === null) return;
            const deltaX = (event.changedTouches[0]?.clientX ?? swipeStartX.current) - swipeStartX.current;
            swipeStartX.current = null;
            if (Math.abs(deltaX) < 45) return;
            if (deltaX < 0) showNextPhoto();
            else showPreviousPhoto();
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-semibold text-white/80 line-clamp-1 max-w-[200px]">
              {selectedPhoto.title}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(selectedPhoto.id)}
                className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
              >
                <Heart 
                  className={`w-4 h-4 ${favorites[selectedPhoto.id] ? 'text-rose-500 fill-rose-500' : 'text-white'}`} 
                />
              </button>
              <button
                onClick={() => {
                  sound.tap();
                  setSelectedPhoto(null);
                  setShowWallpaperSheet(false);
                }}
                className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Central Image View */}
          <div className="my-auto flex flex-col items-center text-center p-2">
            <div className="relative w-full h-[min(64dvh,560px)] rounded-2xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center shadow-2xl mb-3">
              <img
                src={resolveMediaUrl(selectedPhoto.thumbnail || selectedPhoto.url)}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
              <button onClick={showPreviousPhoto} aria-label="Previous photo" className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={showNextPhoto} aria-label="Next photo" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-[17px] font-bold text-white tracking-tight">
              {selectedPhoto.title}
            </h3>
            <p className="text-[12px] text-white/70 max-w-xs mt-1 leading-relaxed line-clamp-2">
              {selectedPhoto.description}
            </p>
          </div>

          {/* Bottom iOS Action Bar */}
          <div className="space-y-3 pb-2">
            {showWallpaperSheet ? (
              <div className="bg-neutral-900/90 border border-white/15 rounded-2xl p-3.5 space-y-2.5 animate-in slide-in-from-bottom duration-150">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-300">
                  <span>SET WALLPAPER</span>
                  {wallpaperFeedback && (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> {wallpaperFeedback}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => handleSetWallpaper('ios-home')}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-[#007AFF] active:bg-[#007AFF] text-white text-[11px] font-medium flex flex-col items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Home Screen</span>
                  </button>
                </div>
              </div>
            ) : null}

            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  sound.tap();
                  setShowWallpaperSheet(prev => !prev);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#007AFF] active:bg-[#007AFF]/80 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Set as Wallpaper</span>
              </button>

              <button
                onClick={() => handleDeletePhoto(selectedPhoto)}
                className="p-2.5 rounded-xl bg-rose-600/20 active:bg-rose-600 text-rose-400 active:text-white border border-rose-500/30 flex items-center justify-center cursor-pointer"
                title="Move to Trash"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex items-center justify-center p-3">
          <div className="w-full max-w-lg relative">
            <button onClick={() => setSelectedVideo(null)} className="absolute -top-10 right-0 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center cursor-pointer" aria-label="Close video">
              <X className="w-4 h-4" />
            </button>
            <NativeVideoPlayer fileName={selectedVideo.fileName} title={selectedVideo.title} category={selectedVideo.category} accentColor={selectedVideo.accentColor} autoPlay />
            <h3 className="text-sm font-bold text-white mt-3">{selectedVideo.title}</h3>
            <p className="text-xs text-white/70 mt-1">{selectedVideo.description}</p>
          </div>
        </div>
      )}
    </AppWindow>
  );
};
