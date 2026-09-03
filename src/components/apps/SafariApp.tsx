import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Share2, 
  Lock, 
  Search, 
  ExternalLink, 
  Radio, 
  ShieldAlert, 
  FileSpreadsheet, 
  TrendingUp, 
  Github, 
  Linkedin, 
  Globe 
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

interface Bookmark {
  title: string;
  url: string;
  category: string;
  icon: any;
  color: string;
  description: string;
}

const BOOKMARKS: Bookmark[] = [
  {
    title: '5G Small-Cell KPI Dashboard',
    url: 'https://5gkpi.netlify.app',
    category: 'AI / 5G Telemetry',
    icon: Radio,
    color: '#3b82f6',
    description: 'NOC Dashboard predicting SLA compliance across slices with 96.2% accuracy.'
  },
  {
    title: 'SafeDrive AI Road Safety',
    url: 'https://safedrive-ai.streamlit.app/',
    category: 'Accident Risk ML',
    icon: ShieldAlert,
    color: '#0ea5e9',
    description: 'Real-time accident severity forecasting & hotspot geospatial mapping.'
  },
  {
    title: 'CSV Intelligence Explorer',
    url: 'https://csvintelligence.streamlit.app/',
    category: 'Data Analytics',
    icon: FileSpreadsheet,
    color: '#10b981',
    description: 'Conversational EDA, schema profiling, and automated correlation heatmaps.'
  },
  {
    title: 'Viral Predictor & SEO AI',
    url: 'https://seoscheckerai.streamlit.app/Viral_Predictor',
    category: 'NLP & Scoring',
    icon: TrendingUp,
    color: '#f59e0b',
    description: 'NLP content scoring, engagement probability, and keyword ranking.'
  },
  {
    title: 'Abinash Swain GitHub',
    url: 'https://github.com/abinash123hg',
    category: 'Open Source',
    icon: Github,
    color: '#a855f7',
    description: 'Machine learning repositories, Jupyter notebooks, and data analysis pipelines.'
  },
  {
    title: 'Abinash Swain LinkedIn',
    url: 'https://www.linkedin.com/in/abinash-swain-a941a3330',
    category: 'Professional Network',
    icon: Linkedin,
    color: '#0284c7',
    description: 'Connect with Abinash for AI/ML engineering and data analyst opportunities.'
  }
];

export const SafariApp: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState<string>('https://5gkpi.netlify.app');
  const [inputUrl, setInputUrl] = useState<string>('https://5gkpi.netlify.app');
  const [activeBookmark, setActiveBookmark] = useState<Bookmark>(BOOKMARKS[0]);

  const handleNavigate = (bm: Bookmark) => {
    sound.tap();
    setActiveBookmark(bm);
    setCurrentUrl(bm.url);
    setInputUrl(bm.url);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.tap();
    setCurrentUrl(inputUrl);
  };

  return (
    <div className="h-full w-full flex flex-col bg-neutral-950/90 text-neutral-100 overflow-hidden select-text">
      {/* Safari Navigation Bar */}
      <div className="p-2 sm:p-3 border-b border-neutral-800 bg-neutral-900/60 flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="flex items-center gap-1 text-neutral-400">
          <button className="p-1 rounded-md hover:bg-neutral-800 text-neutral-500 cursor-not-allowed">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded-md hover:bg-neutral-800 text-neutral-500 cursor-not-allowed">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => sound.tap()} 
            className="p-1 rounded-md hover:bg-neutral-800 hover:text-white cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* URL Input Bar */}
        <form onSubmit={handleFormSubmit} className="flex-1 max-w-xl mx-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs focus-within:border-cyan-500 transition-colors">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full bg-transparent text-neutral-200 focus:outline-none font-mono text-[11px]"
            />
          </div>
        </form>

        <a
          href={currentUrl}
          target="_blank"
          rel="noreferrer"
          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors flex items-center gap-1 text-xs"
          title="Open in new window"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Launch</span>
        </a>
      </div>

      {/* Bookmarks Strip */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-800/80 bg-neutral-900/30 overflow-x-auto shrink-0">
        <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider pl-1">Bookmarks:</span>
        {BOOKMARKS.map((bm) => {
          const isCurrent = activeBookmark.title === bm.title;
          const Icon = bm.icon;
          return (
            <button
              key={bm.title}
              onClick={() => handleNavigate(bm)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer border ${
                isCurrent
                  ? 'bg-neutral-800 text-white border-cyan-500/50 shadow-xs'
                  : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-neutral-200'
              }`}
            >
              <Icon className="w-3 h-3" style={{ color: bm.color }} />
              <span>{bm.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Safari Viewport */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col items-center justify-center text-center space-y-5">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
          style={{ backgroundColor: `${activeBookmark.color}20`, color: activeBookmark.color }}
        >
          {React.createElement(activeBookmark.icon, { className: 'w-8 h-8' })}
        </div>

        <div className="max-w-md space-y-1.5">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">{activeBookmark.category}</div>
          <h2 className="text-xl font-bold text-white">{activeBookmark.title}</h2>
          <p className="text-xs text-neutral-300 leading-relaxed font-normal">{activeBookmark.description}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 max-w-sm w-full text-xs font-mono text-cyan-300 break-all">
          {activeBookmark.url}
        </div>

        <a
          href={activeBookmark.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-neutral-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
          Open Live App in Dedicated Tab
        </a>
      </div>
    </div>
  );
};
