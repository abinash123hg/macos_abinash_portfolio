import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { FavoriteShow } from '../../types';
import { PosterCard } from '../common/PosterCard';
import { 
  Film, 
  Heart, 
  Sparkles, 
  Star, 
  Tv, 
  Quote, 
  X, 
  Copy, 
  Check, 
  Play, 
  Share2, 
  Popcorn, 
  Flame,
  Award
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';
import { resolveMediaUrl } from '../../utils/mediaResolver';

export const FavoritesApp: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'top-rated' | 'thriller' | 'quotes'>('all');
  const [selectedShow, setSelectedShow] = useState<FavoriteShow | null>(null);
  const [copied, setCopied] = useState(false);

  const shows = portfolioData.favoriteShows;

  const filteredShows = shows.filter(show => {
    if (filter === 'top-rated') return parseFloat(show.imdbRating) >= 9.0;
    if (filter === 'thriller') return show.badge.toLowerCase().includes('thriller') || show.badge.toLowerCase().includes('mystery') || show.badge.toLowerCase().includes('legendary');
    return true;
  });

  const handleCopyQuote = (dialogue: string, speaker: string) => {
    sound.tap();
    navigator.clipboard.writeText(`${dialogue} — ${speaker}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full w-full flex flex-col bg-neutral-950 text-neutral-100 overflow-hidden select-text">
      {/* Top Banner / Filter Header */}
      <div className="border-b border-neutral-800/80 bg-neutral-900/40 backdrop-blur-md p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-500 to-amber-500 flex items-center justify-center text-white shadow-md">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Favorite Cinema & Masterpieces</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                  {shows.length} Selections
                </span>
              </h1>
              <p className="text-xs text-neutral-400">
                Curated legendary films, series, high-impact storytelling, and iconic dialogues.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800 self-start sm:self-auto text-xs">
          <button
            onClick={() => { sound.tap(); setFilter('all'); }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filter === 'all' ? 'bg-neutral-800 text-white font-bold shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Shows ({shows.length})
          </button>
          <button
            onClick={() => { sound.tap(); setFilter('top-rated'); }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              filter === 'top-rated' ? 'bg-neutral-800 text-amber-400 font-bold shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Star className="w-3 h-3 fill-amber-400" />
            <span>9.0+ IMDb</span>
          </button>
          <button
            onClick={() => { sound.tap(); setFilter('thriller'); }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filter === 'thriller' ? 'bg-neutral-800 text-cyan-400 font-bold shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Mystery & Thrillers
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {filteredShows.map((show) => (
            <PosterCard
              key={show.id}
              show={show}
              onSelect={(s) => setSelectedShow(s)}
            />
          ))}
        </div>

        {/* Quote Spotlight Section */}
        <div className="mt-8 pt-6 border-t border-neutral-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5 text-red-400" />
              <span>Iconic Screenwriting Quotes</span>
            </h2>
            <span className="text-[11px] text-neutral-500">Tap to copy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {shows.map((show) => (
              <div
                key={show.id}
                onClick={() => handleCopyQuote(show.dialogue, show.quoteSpeaker)}
                className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer flex flex-col justify-between gap-2 group"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {show.title}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">{show.years}</span>
                </div>
                <p className="text-xs italic text-neutral-300 leading-relaxed font-serif">
                  {show.dialogue}
                </p>
                <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1 border-t border-neutral-800/50">
                  <span className="font-semibold text-neutral-300">— {show.quoteSpeaker}</span>
                  <span className="text-neutral-500 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                    <Copy className="w-2.5 h-2.5" />
                    Copy
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cinematic Modal Inspector */}
      {selectedShow && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700/80 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: selectedShow.themeColor }}
            />

            <button
              onClick={() => {
                sound.tap();
                setSelectedShow(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {/* Mini Poster */}
              <div
                className={`w-28 sm:w-36 aspect-2/3 rounded-2xl p-3 flex flex-col justify-between shrink-0 bg-gradient-to-t ${selectedShow.accentGradient} border border-white/10 shadow-lg relative overflow-hidden`}
              >
                <img
                  src={resolveMediaUrl(selectedShow.posterFileName, 'assets/favorites')}
                  alt={selectedShow.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50 z-0" />
                <span
                  className="text-[9px] font-black uppercase px-2 py-0.5 rounded text-white self-start relative z-10"
                  style={{ backgroundColor: `${selectedShow.themeColor}EE` }}
                >
                  {selectedShow.badge}
                </span>
                <div className="relative z-10">
                  <div className="text-xs font-black text-white leading-tight drop-shadow">
                    {selectedShow.title}
                  </div>
                  <div className="text-[10px] text-neutral-300 font-mono mt-0.5 drop-shadow">
                    {selectedShow.years}
                  </div>
                </div>
              </div>

              {/* Show Meta */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: selectedShow.themeColor }}
                  >
                    {selectedShow.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>IMDb {selectedShow.imdbRating}</span>
                  </div>
                  <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-md border border-red-500/20">
                    RT {selectedShow.rtRating}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white">{selectedShow.title}</h3>
                <div className="text-xs text-neutral-400 font-medium">
                  Created & Directed by <strong className="text-neutral-200">{selectedShow.creator}</strong>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                  {selectedShow.description}
                </p>
              </div>
            </div>

            {/* Iconic Dialogue Box */}
            <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-neutral-400">
                <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5 text-cyan-400">
                  <Quote className="w-3.5 h-3.5" />
                  Iconic Dialogue
                </span>
                <button
                  onClick={() => handleCopyQuote(selectedShow.dialogue, selectedShow.quoteSpeaker)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors text-[11px] cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Quote'}</span>
                </button>
              </div>
              <p className="text-sm italic text-neutral-100 font-serif leading-relaxed">
                {selectedShow.dialogue}
              </p>
              <div className="text-right text-xs font-semibold text-neutral-400">
                — {selectedShow.quoteSpeaker}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800/80">
              <span className="font-mono text-[11px]">Asset: {selectedShow.posterFileName}</span>
              <button
                onClick={() => {
                  sound.tap();
                  setSelectedShow(null);
                }}
                className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
