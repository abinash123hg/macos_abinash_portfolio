import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { 
  Compass, 
  Search, 
  ExternalLink, 
  Bookmark, 
  RotateCcw, 
  Share2, 
  Lock, 
  Sparkles,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { sound } from '../../../utils/audioHaptics';

export const SafariApp: React.FC = () => {
  const [url, setUrl] = useState('https://abinashswain.dev');
  const [activeSite, setActiveSite] = useState<string | null>(null);

  const bookmarks = [
    {
      title: 'GitHub Profile',
      url: portfolioData.github,
      desc: 'Repositories, Machine Learning Models & Source Code',
      iconBg: 'bg-neutral-900',
    },
    {
      title: 'LinkedIn Network',
      url: portfolioData.linkedin,
      desc: 'Professional connections, recommendations & updates',
      iconBg: 'bg-sky-600',
    },
    {
      title: 'Oracle AI Verification',
      url: 'https://catalog-education.oracle.com',
      desc: 'Verify official Credential ID 103519150AAI26OFA',
      iconBg: 'bg-amber-600',
    },
    {
      title: 'Centurion University (CUTM)',
      url: 'https://cutm.ac.in',
      desc: 'B.Tech CSE (AI & ML) Department',
      iconBg: 'bg-blue-600',
    },
  ];

  const handleOpenUrl = (targetUrl: string) => {
    sound.tap();
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AppWindow
      id="safari"
      title="Safari"
      subtitle="Web Browser"
      icon={<Compass className="w-4 h-4 text-blue-500" />}
      noPadding
    >
      <div className="w-full h-full flex flex-col justify-between bg-[#F2F2F7] dark:bg-[#000000]">
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Hero Welcome Banner */}
          <IOSCard className="text-center p-4 bg-white dark:bg-neutral-900">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-[#007AFF] flex items-center justify-center mx-auto mb-2 shadow-xs">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-[17px] font-bold text-neutral-900 dark:text-white">
              Favorites & Bookmarks
            </h3>
            <p className="text-[12px] text-neutral-500 max-w-xs mx-auto mt-0.5">
              Explore Abinash's external code repositories, verified credentials and university portals.
            </p>
          </IOSCard>

          {/* Bookmarks List */}
          <IOSList>
            {bookmarks.map((bm, i) => (
              <IOSListItem
                key={i}
                icon={<Bookmark className="w-4 h-4" />}
                iconBg={bm.iconBg}
                title={bm.title}
                subtitle={bm.desc}
                chevron
                onClick={() => handleOpenUrl(bm.url)}
              />
            ))}
          </IOSList>
        </div>

        {/* Safari Bottom Floating URL Bar (iOS 18 Style) */}
        <div className="p-3 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-2xl border-t border-neutral-200/80 dark:border-neutral-800">
          <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-2xl bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <Lock className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
              <span className="font-mono truncate">{url}</span>
            </div>
            <button
              onClick={() => sound.tap()}
              className="p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </AppWindow>
  );
};
