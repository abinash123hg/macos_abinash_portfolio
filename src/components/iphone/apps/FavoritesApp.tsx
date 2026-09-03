import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSSegmentedControl } from '../ui/IOSSegmentedControl';
import { portfolioData } from '../../../data/portfolioData';
import { FavoriteShow } from '../../../types';
import { 
  Film, 
  Heart, 
  Star, 
  Quote, 
  Copy, 
  Check, 
  X, 
  Popcorn, 
  Sparkles,
  Clapperboard
} from 'lucide-react';
import { sound } from '../../../utils/audioHaptics';

export const FavoritesApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'top' | 'quotes'>('all');
  const [selectedShow, setSelectedShow] = useState<FavoriteShow | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const shows = portfolioData.favoriteShows;

  const filteredShows = shows.filter((s) => {
    if (activeTab === 'top') return parseFloat(s.imdbRating) >= 9.0;
    return true;
  });

  const handleCopy = (id: string, dialogue: string, speaker: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.tap();
    navigator.clipboard.writeText(`${dialogue} — ${speaker}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AppWindow
      id="favorites"
      title="Favorite Cinema"
      subtitle={`${shows.length} Masterpieces`}
      icon={<Clapperboard className="w-4 h-4 text-red-500" />}
    >
      <IOSSegmentedControl
        options={[
          { value: 'all', label: 'All Shows (6)' },
          { value: 'top', label: '9.0+ IMDb' },
          { value: 'quotes', label: 'Dialogues' },
        ]}
        value={activeTab}
        onChange={(v) => setActiveTab(v as any)}
        className="mb-4"
      />

      {activeTab !== 'quotes' ? (
        /* 2-Column iOS 18 Poster Stream */
        <div className="grid grid-cols-2 gap-3 pb-8">
          {filteredShows.map((show) => {
            const isCopied = copiedId === show.id;
            return (
              <div
                key={show.id}
                onClick={() => {
                  sound.tap();
                  setSelectedShow(show);
                }}
                className="group relative rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-md active:scale-97 transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Poster Box */}
                <div className={`aspect-2/3 w-full bg-gradient-to-t ${show.accentGradient} p-3 flex flex-col justify-between relative`}>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white backdrop-blur-md shadow-xs"
                      style={{ backgroundColor: `${show.themeColor}DD` }}
                    >
                      {show.badge}
                    </span>
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[10px] font-bold text-amber-300">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      <span>{show.imdbRating}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-white/70 font-mono">
                      {show.creator}
                    </span>
                    <h4 className="text-[14px] font-black text-white leading-tight tracking-tight mt-0.5">
                      {show.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/75 mt-1">
                      <span>{show.years}</span>
                      <span>•</span>
                      <span className="text-red-300 font-bold">RT {show.rtRating}</span>
                    </div>
                  </div>
                </div>

                {/* Card Meta & Quote */}
                <div className="p-2.5 bg-neutral-900/95 space-y-2 flex-1 flex flex-col justify-between">
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {show.description}
                  </p>

                  <div
                    onClick={(e) => handleCopy(show.id, show.dialogue, show.quoteSpeaker, e)}
                    className="p-2 rounded-xl bg-black/50 border border-neutral-800/80 text-[10.5px] text-neutral-300 flex items-start gap-1.5 group/quote active:bg-neutral-800"
                  >
                    <Quote className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="italic line-clamp-2 flex-1 text-[10px]">
                      {show.dialogue}
                    </span>
                    <div className="shrink-0 text-neutral-500">
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Dialogue Quotes Stream */
        <div className="space-y-3 pb-8">
          {shows.map((show) => {
            const isCopied = copiedId === show.id;
            return (
              <div
                key={show.id}
                onClick={(e) => handleCopy(show.id, show.dialogue, show.quoteSpeaker, e)}
                className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 active:scale-98 transition-all cursor-pointer space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: show.themeColor }}
                    />
                    <span className="text-xs font-bold text-white">{show.title}</span>
                    <span className="text-[10px] text-neutral-500 font-mono">({show.years})</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                    {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {isCopied ? 'Copied' : 'Copy'}
                  </span>
                </div>

                <p className="text-[13px] italic font-serif text-neutral-200 leading-relaxed pl-2 border-l-2 border-neutral-700">
                  {show.dialogue}
                </p>

                <div className="text-right text-[11px] font-semibold text-neutral-400">
                  — {show.quoteSpeaker}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* iOS Modal Inspector */}
      {selectedShow && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl p-4 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {selectedShow.badge}
            </span>
            <button
              onClick={() => setSelectedShow(null)}
              className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto p-4 space-y-4 text-center flex flex-col items-center">
            <div
              className={`w-32 aspect-2/3 rounded-2xl p-3 flex flex-col justify-between bg-gradient-to-t ${selectedShow.accentGradient} border border-white/20 shadow-2xl`}
            >
              <span
                className="text-[8px] font-black uppercase px-2 py-0.5 rounded text-white self-start"
                style={{ backgroundColor: selectedShow.themeColor }}
              >
                {selectedShow.badge}
              </span>
              <div>
                <div className="text-xs font-black text-white leading-tight">
                  {selectedShow.title}
                </div>
                <div className="text-[9px] text-neutral-300 font-mono mt-0.5">
                  {selectedShow.years}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">{selectedShow.title}</h3>
              <div className="text-xs text-neutral-400">
                Created by <strong className="text-neutral-200">{selectedShow.creator}</strong>
              </div>
              <div className="flex items-center justify-center gap-2 pt-1 text-xs">
                <span className="text-amber-400 font-bold">★ IMDb {selectedShow.imdbRating}</span>
                <span>•</span>
                <span className="text-red-400 font-bold">RT {selectedShow.rtRating}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed max-w-xs text-left bg-neutral-900/80 p-3 rounded-xl border border-neutral-800">
              {selectedShow.description}
            </p>

            <div className="p-3 rounded-xl bg-black/60 border border-neutral-800 text-left w-full max-w-xs space-y-1">
              <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                Iconic Dialogue
              </div>
              <p className="text-xs italic font-serif text-white">
                {selectedShow.dialogue}
              </p>
              <div className="text-right text-[10px] text-neutral-400">
                — {selectedShow.quoteSpeaker}
              </div>
            </div>
          </div>

          <div className="pb-2 text-center text-[11px] text-white/50">
            Tap close to return
          </div>
        </div>
      )}
    </AppWindow>
  );
};
