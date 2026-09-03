import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { IOSButton } from '../ui/IOSButton';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { 
  Sparkles, 
  CheckCircle2, 
  Download, 
  Mail, 
  Phone, 
  Award, 
  Copy, 
  Check, 
  ExternalLink,
  Target,
  Zap,
  TrendingUp,
  Brain,
  Database,
  Layers,
  BarChart3
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { useDevice } from '../../../context/DeviceContext';
import { sound } from '../../../utils/audioHaptics';

export const RecruiterApp: React.FC = () => {
  const { openApp } = useDevice();
  const [copied, setCopied] = useState(false);
  const [activeDomain, setActiveDomain] = useState<string>('ml');

  const summary = portfolioData.recruiterSummary;

  const handleCopyPitch = () => {
    sound.tap();
    navigator.clipboard.writeText(summary.pitchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const domainIcons: Record<string, React.ReactNode> = {
    ml: <Brain className="w-4 h-4 text-blue-500" />,
    dl: <Layers className="w-4 h-4 text-purple-500" />,
    rag: <Zap className="w-4 h-4 text-amber-500" />,
    analytics: <BarChart3 className="w-4 h-4 text-emerald-500" />
  };

  return (
    <AppWindow
      id="recruiter"
      title="Recruiter Brief"
      subtitle="Executive Summary & Hiring Fit"
      icon={<Sparkles className="w-4 h-4 text-emerald-500" />}
      headerRight={
        <button
          onClick={handleCopyPitch}
          className="flex items-center gap-1 text-[12px] font-semibold text-[#007AFF] bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200/50 cursor-pointer active:scale-95 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy 1-Page</span>
            </>
          )}
        </button>
      }
    >
      {/* Candidate Overview Card */}
      <IOSCard variant="tinted" className="bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-800/50 mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Candidate Profile
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-[10.5px] font-bold">
            {summary.status}
          </span>
        </div>
        <h2 className="text-[17px] font-bold text-neutral-900 dark:text-white tracking-tight">
          {portfolioData.name}
        </h2>
        <p className="text-[13px] font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
          {summary.targetRole} • {summary.location}
        </p>
        <p className="text-[12.5px] text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
          {summary.valueProposition}
        </p>
      </IOSCard>

      {/* Impact Metrics Row (4 Metrics) */}
      <IOSSectionHeader title="Verified Impact Metrics" />
      <div className="grid grid-cols-2 gap-2 mb-4">
        {summary.impactMetrics.map((metric, i) => (
          <div
            key={i}
            className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col justify-between"
          >
            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
              {metric.label}
            </span>
            <div className="my-1 text-[22px] font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">
              {metric.value}
            </div>
            <span className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-tight">
              {metric.detail}
            </span>
          </div>
        ))}
      </div>

      {/* Domain Focus Section */}
      <IOSSectionHeader title="Domain Focus & Core Capabilities" />
      <div className="grid grid-cols-2 gap-2 mb-3">
        {summary.domainFocus.map((domain) => (
          <button
            key={domain.id}
            onClick={() => {
              sound.tap();
              setActiveDomain(domain.id);
            }}
            className={`p-3 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeDomain === domain.id
                ? 'bg-[#007AFF] text-white shadow-md'
                : 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-800'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="p-1 rounded-lg bg-black/10 dark:bg-white/10">
                {domainIcons[domain.id]}
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeDomain === domain.id ? 'bg-white/20 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
              }`}>
                {domain.badge}
              </span>
            </div>
            <h4 className="text-[13.5px] font-bold mt-1">
              {domain.title}
            </h4>
          </button>
        ))}
      </div>

      {/* Selected Domain Detail Card */}
      {(() => {
        const selected = summary.domainFocus.find(d => d.id === activeDomain) || summary.domainFocus[0];
        return (
          <IOSCard className="mb-4">
            <h4 className="text-[13.5px] font-bold text-neutral-900 dark:text-white mb-1.5">
              {selected.title} Focus
            </h4>
            <p className="text-[12px] text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
              {selected.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {selected.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium border border-neutral-200/60 dark:border-neutral-700/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          </IOSCard>
        );
      })()}

      {/* What I Can Own in First 30-60 Days */}
      <IOSSectionHeader title="What I Can Own in First 30–60 Days" />
      <IOSCard className="mb-4">
        <div className="space-y-2">
          {summary.ownership3060Days.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-[12px] text-neutral-800 dark:text-neutral-200 leading-snug">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </IOSCard>

      {/* Quick Action Grid */}
      <IOSSectionHeader title="Recruiter Fast-Track Actions" />
      <div className="grid grid-cols-2 gap-2 mb-3">
        <IOSButton
          variant="primary"
          icon={<Download className="w-4 h-4" />}
          onClick={() => {
            sound.tap();
            openApp('resume');
          }}
        >
          View Resume
        </IOSButton>
        <IOSButton
          variant="tinted"
          icon={<Mail className="w-4 h-4" />}
          onClick={() => {
            sound.tap();
            openApp('mail');
          }}
        >
          Email Abinash
        </IOSButton>
      </div>

      <IOSList>
        <IOSListItem
          icon={<Phone className="w-4 h-4" />}
          iconBg="bg-[#34C759]"
          title="Direct Phone Line"
          subtitle={portfolioData.phone}
          value="Call"
          chevron
          onClick={() => window.open(`tel:${portfolioData.phone}`)}
        />
        <IOSListItem
          icon={<ExternalLink className="w-4 h-4" />}
          iconBg="bg-[#0A66C2]"
          title="LinkedIn Profile"
          subtitle="linkedin.com/in/abinash-swain"
          value="Connect"
          chevron
          onClick={() => window.open(portfolioData.linkedin, '_blank')}
        />
        <IOSListItem
          icon={<Award className="w-4 h-4" />}
          iconBg="bg-amber-500"
          title="Verified Credentials"
          subtitle="Oracle, Deloitte, Tata, Skill India"
          value="View"
          chevron
          onClick={() => openApp('certificates')}
        />
      </IOSList>
    </AppWindow>
  );
};

