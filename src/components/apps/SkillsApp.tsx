import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  Code2, 
  BarChart3, 
  Cpu, 
  PieChart, 
  Database, 
  Search, 
  Layers, 
  CheckCircle, 
  Zap, 
  Terminal 
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export const SkillsApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'Code2': return <Code2 className="w-4 h-4" />;
      case 'BarChart3': return <BarChart3 className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'PieChart': return <PieChart className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  const filteredCategories = portfolioData.skills.map(cat => {
    if (selectedCategory !== 'all' && cat.name !== selectedCategory) {
      return null;
    }
    const filteredSkills = cat.skills.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.tag && s.tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    if (filteredSkills.length === 0) return null;
    return {
      ...cat,
      skills: filteredSkills
    };
  }).filter(Boolean);

  return (
    <div className="h-full w-full overflow-y-auto bg-neutral-950/90 text-neutral-100 p-4 sm:p-6 select-text space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            Skills & Technical Competencies
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Core machine learning, data engineering, statistical modeling, and analytical frameworks.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search skills (e.g. Python, EDA)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 pb-2 overflow-x-auto">
        <button
          onClick={() => { sound.tap(); setSelectedCategory('all'); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-cyan-500 text-neutral-950 border-cyan-400 shadow-xs'
              : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white'
          }`}
        >
          All Domains
        </button>
        {portfolioData.skills.map((cat) => (
          <button
            key={cat.name}
            onClick={() => { sound.tap(); setSelectedCategory(cat.name); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === cat.name
                ? 'bg-neutral-800 text-white border-cyan-500/50 shadow-xs'
                : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <span style={{ color: cat.color }}>{getCategoryIcon(cat.icon)}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCategories.map((cat: any) => (
          <div
            key={cat.name}
            className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 space-y-3.5 backdrop-blur-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                >
                  {getCategoryIcon(cat.icon)}
                </div>
                <h3 className="font-semibold text-xs text-white">{cat.name}</h3>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono">
                {cat.skills.length} skills
              </span>
            </div>

            <div className="space-y-2.5">
              {cat.skills.map((skill: any) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-neutral-200 font-medium">{skill.name}</span>
                      {skill.tag && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                          {skill.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">{skill.level}%</span>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: cat.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Highlights Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 to-blue-950/20 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <div className="font-semibold text-white">Full Machine Learning & EDA Lifecycle</div>
            <div className="text-[11px] text-neutral-300">
              Data Ingestion → Preprocessing & Feature Engineering → Cross-Validation → Deployment
            </div>
          </div>
        </div>
        <div className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-cyan-400 font-mono">
          Scikit-Learn • Streamlit • Pandas
        </div>
      </div>
    </div>
  );
};
