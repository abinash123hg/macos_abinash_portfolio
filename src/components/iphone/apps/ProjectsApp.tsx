import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { IOSButton } from '../ui/IOSButton';
import { IOSSegmentedControl } from '../ui/IOSSegmentedControl';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { 
  BrainCircuit, 
  Github, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  BarChart2, 
  ChevronRight, 
  Star,
  Cpu,
  Database,
  Search,
  Scale,
  Activity,
  AlertTriangle,
  ShieldCheck,
  FileCode,
  Zap
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { ProjectItem } from '../../../types';
import { sound } from '../../../utils/audioHaptics';

export const ProjectsApp: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'LLM & RAG Systems' | 'AI Assistants & Agents' | 'ML Ranking & Search'>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [detailTab, setDetailTab] = useState<'Case Study' | 'Tech Details'>('Case Study');

  const projects = portfolioData.projects.filter(p => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  const flagship = portfolioData.projects.find(p => p.id === 'abinash-os-rag') || portfolioData.projects[0];
  const cs = selectedProject?.caseStudy;

  return (
    <AppWindow
      id="projects"
      title={selectedProject ? selectedProject.title : 'Projects & Case Studies'}
      subtitle={selectedProject ? selectedProject.category : `${portfolioData.projects.length} Engineering Systems`}
      icon={<BrainCircuit className="w-4 h-4 text-blue-500" />}
      onBack={selectedProject ? () => setSelectedProject(null) : undefined}
      backLabel={selectedProject ? 'Projects' : 'Back'}
    >
      {!selectedProject ? (
        /* Project List View */
        <div className="space-y-4">
          <IOSSegmentedControl
            options={[
              { value: 'All', label: 'All' },
              { value: 'LLM & RAG Systems', label: 'RAG Systems' },
              { value: 'AI Assistants & Agents', label: 'Agents' },
              { value: 'ML Ranking & Search', label: 'Search ML' },
            ]}
            value={filter}
            onChange={(v) => setFilter(v as any)}
            className="mb-3"
          />

          {/* Flagship Featured Project Banner */}
          <IOSCard
            variant="tinted"
            className="bg-blue-50/90 dark:bg-blue-950/40 border-blue-200/60 dark:border-blue-800/50 mb-3 cursor-pointer"
            onClick={() => {
              sound.tap();
              setSelectedProject(flagship);
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#007AFF] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Flagship Dual-OS AI Architecture
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-[10.5px] font-mono font-bold">
                98.4% Faithfulness
              </span>
            </div>
            <h3 className="text-[16px] font-bold text-neutral-900 dark:text-white tracking-tight">
              {flagship.title}
            </h3>
            <p className="text-[12.5px] text-neutral-600 dark:text-neutral-400 mt-1 leading-snug">
              {flagship.subtitle}
            </p>
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-blue-200/50 dark:border-blue-800/40 text-[11.5px] text-[#007AFF] font-semibold">
              <span>Sub-300ms SSE Twin</span>
              <span className="flex items-center gap-0.5">Read Case Study <ChevronRight className="w-3 h-3" /></span>
            </div>
          </IOSCard>

          {/* Inset List of All Projects */}
          <IOSSectionHeader title="Case Studies & Repositories" />
          <IOSList>
            {projects.map((proj) => (
              <IOSListItem
                key={proj.id}
                icon={<BrainCircuit className="w-4 h-4" />}
                iconBg={proj.category === 'LLM & RAG Systems' ? 'bg-blue-500' : proj.category === 'AI Assistants & Agents' ? 'bg-purple-500' : 'bg-emerald-500'}
                title={proj.title}
                subtitle={proj.subtitle}
                badge={proj.featured ? 'Case Study' : undefined}
                badgeColor="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 border border-blue-200/40"
                chevron
                onClick={() => {
                  sound.tap();
                  setSelectedProject(proj);
                }}
              />
            ))}
          </IOSList>
        </div>
      ) : (
        /* Detailed Single Project View */
        <div className="space-y-4">
          <IOSSegmentedControl
            options={[
              { value: 'Case Study', label: 'Case Study' },
              { value: 'Tech Details', label: 'Overview & Stack' }
            ]}
            value={detailTab}
            onChange={(v) => setDetailTab(v as any)}
            className="mb-2"
          />

          {detailTab === 'Case Study' && cs ? (
            /* Case Study Breakdown */
            <div className="space-y-3">
              <IOSCard className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#007AFF] uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-mono font-bold">
                    Verified
                  </span>
                </div>
                <h2 className="text-[17px] font-bold text-neutral-900 dark:text-white tracking-tight leading-snug">
                  {selectedProject.title}
                </h2>
                <p className="text-[12.5px] text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
                  {cs.summary}
                </p>
              </IOSCard>

              {/* Impact Metrics */}
              <div className="grid grid-cols-3 gap-2">
                {cs.resultsImpact.map((res, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-neutral-900 border border-blue-100 dark:border-neutral-800 text-center">
                    <div className="text-[15px] font-extrabold text-[#007AFF] font-mono">{res.metric}</div>
                    <div className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200 mt-0.5 truncate">{res.label}</div>
                  </div>
                ))}
              </div>

              {/* Problem & Role */}
              <IOSCard className="space-y-3">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Problem & Context
                  </div>
                  <p className="text-[12px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {cs.contextProblem}
                  </p>
                </div>
                <div className="space-y-1 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Role & Ownership
                  </div>
                  <p className="text-[12px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {cs.role}
                  </p>
                </div>
              </IOSCard>

              {/* Architecture Points */}
              <IOSSectionHeader title="3-Point Architecture" />
              <div className="space-y-2">
                {cs.architecturePoints.map((arch, i) => (
                  <IOSCard key={i} padding="sm" className="space-y-1">
                    <div className="text-[12px] font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-500 text-[10px] font-mono flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      {arch.label}
                    </div>
                    <p className="text-[11.5px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {arch.detail}
                    </p>
                  </IOSCard>
                ))}
              </div>

              {/* Technical Trade-offs */}
              <IOSSectionHeader title="Key Engineering Challenges" />
              <div className="space-y-2">
                {cs.challengesTradeoffs.map((item, i) => (
                  <IOSCard key={i} padding="sm" className="space-y-1.5">
                    <div className="text-[11.5px] font-bold text-red-500 dark:text-red-400">
                      Challenge: {item.challenge}
                    </div>
                    <div className="text-[11.5px] text-neutral-800 dark:text-neutral-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Solution: </span>
                      {item.solution}
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 italic">
                      <span className="font-semibold text-amber-500 not-italic">Trade-off: </span>
                      {item.tradeoff}
                    </div>
                  </IOSCard>
                ))}
              </div>
            </div>
          ) : (
            /* Traditional Tech Details */
            <div className="space-y-3">
              <IOSCard className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-[#007AFF] uppercase tracking-wider">
                      {selectedProject.category}
                    </span>
                    {selectedProject.featured && (
                      <span className="text-[11px] text-amber-500 font-semibold">
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-[18px] font-bold text-neutral-900 dark:text-white tracking-tight leading-snug">
                    {selectedProject.title}
                  </h2>
                  <p className="text-[12.5px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {selectedProject.subtitle}
                  </p>
                </div>

                <p className="text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-3">
                  {selectedProject.longDescription}
                </p>
              </IOSCard>

              {/* Highlights & Metrics */}
              <IOSSectionHeader title="Key Architectural Highlights" />
              <IOSCard padding="sm">
                <div className="space-y-2">
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12.5px] text-neutral-700 dark:text-neutral-300 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </IOSCard>

              {/* Technologies Chips */}
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5 px-1">
                  Tech Stack & Libraries
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[11.5px] font-medium border border-neutral-200/80 dark:border-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {selectedProject.githubUrl && (
              <IOSButton
                fullWidth
                variant="primary"
                icon={<Github className="w-4 h-4" />}
                onClick={() => {
                  sound.tap();
                  window.open(selectedProject.githubUrl, '_blank');
                }}
              >
                GitHub Repo
              </IOSButton>
            )}
            {selectedProject.liveDemoUrl && (
              <IOSButton
                fullWidth
                variant="tinted"
                icon={<ExternalLink className="w-4 h-4" />}
                onClick={() => {
                  sound.tap();
                  window.open(selectedProject.liveDemoUrl, '_blank');
                }}
              >
                Live Demo
              </IOSButton>
            )}
          </div>
        </div>
      )}
    </AppWindow>
  );
};
