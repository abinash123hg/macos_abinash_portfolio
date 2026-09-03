import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Phone, 
  Mail, 
  Award, 
  Brain, 
  Layers, 
  Zap, 
  Cpu,
  FileText,
  Briefcase,
  Monitor
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { useDevice } from '../../context/DeviceContext';
import { sound } from '../../utils/audioHaptics';

export const RecruiterBriefApp: React.FC = () => {
  const { openDesktopWindow } = useDevice();
  const [copied, setCopied] = useState(false);
  const [activeDomain, setActiveDomain] = useState<string>('rag');

  const summary = portfolioData.recruiterSummary;

  const handleCopyPitch = () => {
    sound.tap();
    navigator.clipboard.writeText(summary.pitchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const domainIcons: Record<string, React.ReactNode> = {
    rag: <Zap className="w-4 h-4 text-blue-400" />,
    agents: <Layers className="w-4 h-4 text-purple-400" />,
    ranking: <Brain className="w-4 h-4 text-amber-400" />,
    ui: <Monitor className="w-4 h-4 text-emerald-400" />
  };

  return (
    <div className="h-full w-full bg-neutral-900/95 text-neutral-100 flex flex-col overflow-hidden select-text">
      {/* Top Toolbar */}
      <div className="h-12 px-5 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[13px] font-bold text-white tracking-tight">
              Recruiter Dossier & Hiring Brief
            </h2>
            <p className="text-[10.5px] text-neutral-400">
              Executive Candidate Summary • {summary.targetRole}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyPitch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-[12px] font-medium border border-neutral-700 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied Pitch</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-300" />
                <span>Copy 1-Page Summary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
        {/* Candidate Profile Hero Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-neutral-900 to-neutral-900 border border-cyan-800/40 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
              Candidate Profile
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-bold border border-cyan-500/30">
              {summary.status}
            </span>
          </div>

          <h1 className="text-[20px] font-extrabold text-white tracking-tight">
            {portfolioData.name}
          </h1>
          <p className="text-[13px] font-semibold text-cyan-400 mb-2">
            {summary.targetRole} • {summary.location}
          </p>
          <p className="text-[13px] text-neutral-300 leading-relaxed max-w-3xl">
            {summary.valueProposition}
          </p>
        </div>

        {/* 4 Impact Metrics Grid */}
        <div>
          <h3 className="text-[11.5px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
            Verified Impact Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {summary.impactMetrics.map((metric, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-neutral-800/60 border border-neutral-700/60 shadow-sm flex flex-col justify-between"
              >
                <span className="text-[11px] font-medium text-neutral-400">
                  {metric.label}
                </span>
                <div className="my-1 text-[24px] font-black tracking-tight text-white font-mono">
                  {metric.value}
                </div>
                <span className="text-[11px] text-neutral-300 leading-tight">
                  {metric.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Domain Focus Grid & Dynamic Inspector */}
        <div>
          <h3 className="text-[11.5px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
            Domain Focus & Core Capabilities
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
            {summary.domainFocus.map((domain) => (
              <button
                key={domain.id}
                onClick={() => {
                  sound.tap();
                  setActiveDomain(domain.id);
                }}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                  activeDomain === domain.id
                    ? 'bg-blue-600/30 border-blue-500 text-white shadow-md'
                    : 'bg-neutral-800/60 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span className="p-1 rounded-md bg-neutral-700/60">
                    {domainIcons[domain.id]}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    activeDomain === domain.id ? 'bg-blue-500/30 text-blue-300' : 'bg-neutral-700/60 text-neutral-400'
                  }`}>
                    {domain.badge}
                  </span>
                </div>
                <h4 className="text-[13px] font-bold text-white">
                  {domain.title}
                </h4>
              </button>
            ))}
          </div>

          {/* Active Domain Detail Card */}
          {(() => {
            const selected = summary.domainFocus.find(d => d.id === activeDomain) || summary.domainFocus[0];
            return (
              <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60">
                <h4 className="text-[13.5px] font-bold text-white mb-1.5">
                  {selected.title} Specialization
                </h4>
                <p className="text-[12.5px] text-neutral-300 leading-relaxed mb-3">
                  {selected.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-200 text-[11.5px] font-medium border border-neutral-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* 30-60 Day Ownership Plan */}
        <div>
          <h3 className="text-[11.5px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
            What I Can Own in First 30–60 Days
          </h3>
          <div className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/60 space-y-2.5">
            {summary.ownership3060Days.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[12.5px] text-neutral-200 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recruiter Quick Actions */}
        <div>
          <h3 className="text-[11.5px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
            Recruiter Fast-Track Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => openDesktopWindow('mail')}
              className="p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 flex items-center justify-between text-left transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="text-[12px] font-bold text-white">Direct Email</div>
                  <div className="text-[11px] text-neutral-400">{portfolioData.email}</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            <button
              onClick={() => window.open(portfolioData.linkedin, '_blank')}
              className="p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 flex items-center justify-between text-left transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-[12px] font-bold text-white">LinkedIn Profile</div>
                  <div className="text-[11px] text-neutral-400">Connect with Abinash</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            <button
              onClick={() => openDesktopWindow('certificates')}
              className="p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 flex items-center justify-between text-left transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="text-[12px] font-bold text-white">Verified Credentials</div>
                  <div className="text-[11px] text-neutral-400">Oracle, Deloitte, Tata</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
