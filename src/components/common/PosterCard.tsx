import React, { useState } from 'react';
import { FavoriteShow } from '../../types';
import { Star, Film, Quote, Copy, Check, Sparkles, Popcorn } from 'lucide-react';
import { sound } from '../../utils/audioHaptics';
import { resolveMediaUrl } from '../../utils/mediaResolver';

interface PosterCardProps {
  show: FavoriteShow;
  onSelect?: (show: FavoriteShow) => void;
  className?: string;
}

export const PosterCard: React.FC<PosterCardProps> = ({ show, onSelect, className = '' }) => {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.tap();
    navigator.clipboard.writeText(`${show.dialogue} — ${show.quoteSpeaker}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const primarySrc = resolveMediaUrl(show.posterFileName, 'assets/favorites');

  return (
    <div
      onClick={() => {
        sound.tap();
        onSelect?.(show);
      }}
      className={`group relative flex flex-col rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer ${className}`}
    >
      {/* Poster Media Box */}
      <div className="relative aspect-2/3 w-full bg-neutral-950 overflow-hidden flex flex-col justify-between">
        {!imageError ? (
          <img
            src={primarySrc}
            alt={show.title}
            onError={() => {
              // Try fallback direct root or assets path before switching to stylized canvas poster
              setImageError(true);
            }}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : null}

        {/* Fallback / Poster Graphic Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${show.accentGradient} p-4 flex flex-col justify-between ${
            !imageError ? 'opacity-0 group-hover:opacity-100 backdrop-blur-xs transition-opacity duration-300' : 'opacity-100'
          }`}
        >
          <div className="flex items-center justify-between gap-1">
            <span
              className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-md shadow-xs text-white"
              style={{ backgroundColor: `${show.themeColor}CC` }}
            >
              {show.badge}
            </span>
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-bold text-amber-300">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{show.imdbRating}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[10px] text-neutral-300 font-medium">Created by {show.creator}</div>
            <h3 className="text-base font-black text-white leading-tight tracking-tight drop-shadow-md">
              {show.title}
            </h3>
            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-300">
              <span>{show.years}</span>
              <span>•</span>
              <span className="text-red-400 font-bold">RT {show.rtRating}</span>
            </div>
          </div>
        </div>

        {/* Default Badge if image is visible */}
        {!imageError && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md text-white backdrop-blur-md"
              style={{ backgroundColor: `${show.themeColor}EE` }}
            >
              {show.badge}
            </span>
          </div>
        )}
      </div>

      {/* Meta Footer */}
      <div className="p-3.5 flex-1 flex flex-col justify-between bg-neutral-900/90 gap-2.5">
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
              {show.title}
            </h4>
            <span className="text-[10px] font-mono text-neutral-400">{show.years}</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
            {show.description}
          </p>
        </div>

        {/* Iconic Dialogue Box with Quick Copy */}
        <div className="p-2.5 rounded-xl bg-black/40 border border-neutral-800/80 text-[11px] text-neutral-300 flex items-start gap-2 relative group/quote">
          <Quote className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5 opacity-80" />
          <div className="flex-1 italic line-clamp-2 text-[10.5px]">
            {show.dialogue}
          </div>
          <button
            onClick={handleCopyQuote}
            title="Copy iconic quote"
            className="p-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
};
