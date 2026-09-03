import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useDevice } from '../../context/DeviceContext';
import { Search, FolderGit2, Cpu, Award, Terminal, Mail, Sparkles, X, ChevronRight } from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export const DesktopSpotlight: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { openDesktopWindow, openApp, deviceMode } = useDevice();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results: { title: string; subtitle: string; appId: string; icon: any; category: string }[] = [];

  // Match projects
  portfolioData.projects.forEach(p => {
    if (p.title.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase())) {
      results.push({ title: p.title, subtitle: p.category, appId: 'projects', icon: FolderGit2, category: 'Projects' });
    }
  });

  // Match skills
  portfolioData.skills.forEach(cat => {
    cat.skills.forEach(s => {
      if (s.name.toLowerCase().includes(query.toLowerCase())) {
        results.push({ title: s.name, subtitle: `${cat.name} (${s.level}%)`, appId: 'skills', icon: Cpu, category: 'Skills' });
      }
    });
  });

  // Match certificates
  portfolioData.certificates.forEach(c => {
    if (c.title.toLowerCase().includes(query.toLowerCase()) || c.issuer.toLowerCase().includes(query.toLowerCase())) {
      results.push({ title: c.title, subtitle: c.issuer, appId: 'certificates', icon: Award, category: 'Certifications' });
    }
  });

  // Match experience & milestones
  portfolioData.experience.forEach(e => {
    if (e.role.toLowerCase().includes(query.toLowerCase()) || e.company.toLowerCase().includes(query.toLowerCase())) {
      results.push({ title: e.role, subtitle: e.company, appId: 'experience', icon: Award, category: 'Experience' });
    }
  });

  if ('recruiter brief summary pitch'.includes(query.toLowerCase())) {
    results.push({ title: 'Recruiter Brief & 1-Page Summary', subtitle: 'Executive Hiring Dossier', appId: 'recruiter', icon: Sparkles, category: 'Recruiter Fast-Track' });
  }
  if ('analytics 5g telemetry benchmarks'.includes(query.toLowerCase())) {
    results.push({ title: 'Model Analytics & Telemetry Lab', subtitle: '5G Random Forest & Vision Benchmarks', appId: 'analytics', icon: Cpu, category: 'Analytics' });
  }
  if ('notes scratchpad engineering'.includes(query.toLowerCase())) {
    results.push({ title: 'Engineering Notes', subtitle: 'Scratchpad & system design highlights', appId: 'notes', icon: Terminal, category: 'Notes' });
  }
  if ('calendar timeline events milestones'.includes(query.toLowerCase())) {
    results.push({ title: 'Calendar & Timeline', subtitle: '12 Portfolio Milestones (2023 - 2027)', appId: 'calendar', icon: Award, category: 'Timeline' });
  }

  // Default suggestions if query is empty
  const displayResults = query.trim() ? results.slice(0, 8) : [
    { title: 'SafeDrive AI', subtitle: 'Real-time accident hotspot model', appId: 'projects', icon: FolderGit2, category: 'Flagship Project' },
    { title: '5G Small-Cell KPI Management', subtitle: 'Random Forest 96.2% Accuracy', appId: 'projects', icon: FolderGit2, category: 'Flagship Project' },
    { title: 'Oracle Certified Associate — Agentic AI', subtitle: 'Official Oracle Credential #103519150AAI26OFA', appId: 'certificates', icon: Award, category: 'Certification' },
    { title: 'Ask Abinash AI', subtitle: 'Gemini-powered neural assistant', appId: 'ai', icon: Sparkles, category: 'AI Assistant' },
    { title: 'Terminal zsh', subtitle: 'Interactive command line', appId: 'terminal', icon: Terminal, category: 'Developer Utility' }
  ];

  const handleSelect = (appId: string) => {
    sound.tap();
    if (deviceMode === 'desktop') {
      openDesktopWindow(appId);
    } else {
      openApp(appId);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % displayResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + displayResults.length) % displayResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (displayResults[selectedIndex]) {
        handleSelect(displayResults[selectedIndex].appId);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-24 p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-neutral-900/95 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Spotlight Search (e.g. 5G, SafeDrive, Oracle, Python)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm sm:text-base text-white focus:outline-none placeholder-neutral-500 font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {displayResults.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(item.appId)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer group ${
                  isSelected ? 'bg-[#007aff] text-white' : 'hover:bg-neutral-800/80 text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-neutral-800 text-cyan-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-white group-hover:text-cyan-300'}`}>
                      {item.title}
                    </div>
                    <div className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-neutral-400'}`}>{item.subtitle}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[9px] px-2 py-0.5 rounded-md uppercase font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {item.category}
                  </span>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-neutral-600 group-hover:text-cyan-400'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
