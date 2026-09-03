import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSSegmentedControl } from '../ui/IOSSegmentedControl';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { 
  Heart, 
  Film, 
  Tv, 
  Code2, 
  Star, 
  Quote, 
  Copy, 
  Check, 
  X, 
  Clapperboard,
  Sparkles
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { FavoriteShow } from '../../../types';
import { sound } from '../../../utils/audioHaptics';
import { resolveMediaUrl } from '../../../utils/mediaResolver';

export const FavouritesApp: React.FC = () => {
  const [tab, setTab] = useState<'shows' | 'quotes' | 'tech'>('shows');
  const [selectedShow, setSelectedShow] = useState<FavoriteShow | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const shows = portfolioData.favoriteShows;

  const handleCopy = (id: string, dialogue: string, speaker: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.tap();
    navigator.clipboard.writeText(`${dialogue} — ${speaker}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AppWindow
      id="favourites"
      title="Favorites"
      subtitle="Cinema, Quotes & Tech"
      icon={<Heart className="w-4 h-4 text-pink-500" />}
    >
      <IOSSegmentedControl
        options={[
          { value: 'shows', label: `Cinema (${shows.length})` },
          { value: 'quotes', label: 'Dialogues' },
          { value: 'tech', label: 'Tech Stack' },
        ]}
        value={tab}
        onChange={(v) => setTab(v as any)}
        className="mb-4"
      />

      {tab === 'shows' && (
        <div className="space-y-4 pb-8">
          <div className="grid grid-cols-2 gap-2.5">
            {shows.map((show, index) => (
              <div
                key={show.id}
                onClick={() => {
                  sound.tap();
                  setSelectedShow(show);
                }}
                className="group relative rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-md active:scale-97 transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Poster Artwork Header */}
                <div className="aspect-2/3 w-full relative overflow-hidden bg-neutral-950">
                  <img
                    src={resolveMediaUrl(show.posterFileName, 'assets/favorites')}
                    alt={show.title}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    fetchPriority={index < 4 ? 'high' : 'low'}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${show.accentGradient} opacity-60 mix-blend-multiply`} />
                  <div className="absolute inset-0 p-2.5 flex flex-col justify-between z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/50">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[8.5px] font-black uppercase px-2 py-0.5 rounded-full text-white backdrop-blur-md shadow-xs"
                        style={{ backgroundColor: `${show.themeColor}DD` }}
                      >
                        {show.badge}
                      </span>
                      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[9.5px] font-bold text-amber-300">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        <span>{show.imdbRating}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] text-white/80 font-mono drop-shadow">
                        {show.creator}
                      </span>
                      <h4 className="text-[13px] font-black text-white leading-tight tracking-tight mt-0.5 drop-shadow-md">
                        {show.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[9.5px] font-mono text-white/90 mt-0.5 drop-shadow">
                        <span>{show.years}</span>
                        <span>•</span>
                        <span className="text-red-300 font-bold">RT {show.rtRating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body Meta */}
                <div className="p-2.5 bg-neutral-900/95 space-y-1.5 flex-1 flex flex-col justify-between">
                  <p className="text-[10.5px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {show.description}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-neutral-800/60 text-[9.5px] text-neutral-400 font-mono">
                    <span className="text-neutral-500">Poster: {show.posterFileName}</span>
                    <span className="text-cyan-400 font-bold">View Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'quotes' && (
        <div className="space-y-3 pb-8">
          <IOSSectionHeader title="Iconic Screenplay Dialogues" />
          {shows.map((show) => {
            const isCopied = copiedId === show.id;
            return (
              <div
                key={show.id}
                onClick={(e) => handleCopy(show.id, show.dialogue, show.quoteSpeaker, e)}
                className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 active:scale-98 transition-all cursor-pointer space-y-1.5 shadow-xs"
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

                <p className="text-[12px] italic font-serif text-neutral-200 leading-relaxed pl-2 border-l-2 border-neutral-700">
                  {show.dialogue}
                </p>

                <div className="text-right text-[10.5px] font-semibold text-neutral-400">
                  — {show.quoteSpeaker}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'tech' && (
        <div className="space-y-3 pb-8">
          <IOSSectionHeader title="Beloved Technologies & Tools" />
          <IOSList>
            {[
              { name: 'Python', why: 'Primary weapon for data pipelines & machine learning', tag: 'Core' },
              { name: 'Pandas & NumPy', why: 'High-speed matrix & tabular manipulations', tag: 'Data' },
              { name: 'Streamlit & Next.js', why: 'Instant production-grade data application delivery', tag: 'UI' },
              { name: 'Scikit-Learn & PyTorch', why: 'Robust ensemble algorithms & deep neural architectures', tag: 'ML' },
              { name: 'VS Code & Desktop', why: 'Flow-state engineering environment', tag: 'IDE' },
            ].map((t, idx) => (
              <IOSListItem
                key={idx}
                icon={<Code2 className="w-4 h-4" />}
                iconBg="bg-blue-500"
                title={t.name}
                subtitle={t.why}
                badge={t.tag}
                badgeColor="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300"
              />
            ))}
          </IOSList>
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

          <div className="my-auto p-4 space-y-3.5 text-center flex flex-col items-center">
            <div className="w-36 aspect-2/3 rounded-2xl overflow-hidden relative border border-white/20 shadow-2xl bg-neutral-950">
              <img
                src={resolveMediaUrl(selectedShow.posterFileName, 'assets/favorites')}
                alt={selectedShow.title}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 p-2.5 flex flex-col justify-between">
                <span
                  className="text-[8px] font-black uppercase px-2 py-0.5 rounded text-white self-start"
                  style={{ backgroundColor: selectedShow.themeColor }}
                >
                  {selectedShow.badge}
                </span>
                <div>
                  <div className="text-xs font-black text-white leading-tight drop-shadow">
                    {selectedShow.title}
                  </div>
                  <div className="text-[9px] text-neutral-300 font-mono mt-0.5 drop-shadow">
                    {selectedShow.years}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-white">{selectedShow.title}</h3>
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
