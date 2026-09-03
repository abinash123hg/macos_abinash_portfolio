import React, { useState } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { 
  Search, 
  X, 
  FolderGit2, 
  Award, 
  Cpu, 
  User, 
  Mail, 
  Compass, 
  Terminal, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Radio,
  FileSpreadsheet
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { sound } from '../../utils/audioHaptics';

export interface SpotlightProps {
  onClose: () => void;
}

export const Spotlight: React.FC<SpotlightProps> = ({ onClose }) => {
  const { openApp } = useDevice();
  const [query, setQuery] = useState('');

  const q = query.toLowerCase().trim();

  // Search Results
  const matchedProjects = portfolioData.projects.filter(
    p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.technologies.some(t => t.toLowerCase().includes(q))
  );

  const matchedCerts = portfolioData.certificates.filter(
    c => c.title.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q) || c.skills.some(s => s.toLowerCase().includes(q))
  );

  const matchedSkillGroups = portfolioData.skills.flatMap(cat => 
    cat.skills.filter(s => s.name.toLowerCase().includes(q) || (s.tag && s.tag.toLowerCase().includes(q)))
  );

  const handleLaunch = (appId: string) => {
    sound.appOpen();
    openApp(appId);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-3xl p-4 flex flex-col justify-start select-none font-sans text-white animate-in fade-in zoom-in-95 duration-200">
      {/* Top Search Input Box */}
      <div className="w-full flex items-center gap-2 mb-4 pt-2">
        <div className="flex-1 h-11 px-3.5 rounded-2xl bg-white/15 backdrop-blur-2xl border border-white/20 flex items-center gap-2 text-white shadow-lg">
          <Search className="w-4 h-4 text-white/60 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search apps, AI models, skills, certs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none outline-none text-[15px] placeholder-white/50 text-white"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        <button
          onClick={() => {
            sound.tap();
            onClose();
          }}
          className="text-[#007AFF] hover:text-[#3897FF] font-medium text-[15px] px-2 py-1 cursor-pointer"
        >
          Cancel
        </button>
      </div>

      {/* Suggested / Results List */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-10">
        {!query ? (
          /* Siri Suggestions */
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-white/50 px-1 mb-2 block">
              Siri Suggestions
            </span>
            <div className="grid grid-cols-4 gap-2.5">
              {[
                { id: 'projects', label: '5G SLA AI', icon: <Radio className="w-5 h-5 text-blue-400" /> },
                { id: 'certificates', label: 'Oracle Cert', icon: <Award className="w-5 h-5 text-amber-400" /> },
                { id: 'skills', label: 'Skills', icon: <Cpu className="w-5 h-5 text-emerald-400" /> },
                { id: 'ai', label: 'AI Assistant', icon: <Sparkles className="w-5 h-5 text-cyan-400" /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLaunch(item.id)}
                  className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 flex flex-col items-center gap-1.5 transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shadow-xs">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-medium text-white/90 truncate max-w-full">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Search Matches */
          <div className="space-y-4">
            {/* Projects Matches */}
            {matchedProjects.length > 0 && (
              <div className="bg-neutral-900/80 rounded-2xl p-2 border border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 px-2 py-1 block">
                  Projects & AI Models
                </span>
                {matchedProjects.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleLaunch('projects')}
                    className="p-2.5 rounded-xl hover:bg-white/10 active:bg-white/20 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <FolderGit2 className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-[13px] font-semibold text-white">{p.title}</div>
                        <div className="text-[11px] text-white/60 truncate max-w-[200px]">{p.subtitle}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40" />
                  </div>
                ))}
              </div>
            )}

            {/* Certifications Matches */}
            {matchedCerts.length > 0 && (
              <div className="bg-neutral-900/80 rounded-2xl p-2 border border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 px-2 py-1 block">
                  Certifications
                </span>
                {matchedCerts.slice(0, 3).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleLaunch('certificates')}
                    className="p-2.5 rounded-xl hover:bg-white/10 active:bg-white/20 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-[13px] font-semibold text-white">{c.title}</div>
                        <div className="text-[11px] text-white/60 truncate max-w-[200px]">{c.issuer}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40" />
                  </div>
                ))}
              </div>
            )}

            {/* Skills Matches */}
            {matchedSkillGroups.length > 0 && (
              <div className="bg-neutral-900/80 rounded-2xl p-2 border border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 px-2 py-1 block">
                  Skills & Technologies
                </span>
                <div className="flex flex-wrap gap-1.5 p-1">
                  {matchedSkillGroups.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLaunch('skills')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-cyan-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Cpu className="w-3 h-3 text-cyan-400" />
                      <span>{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
