import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Linkedin, 
  Github, 
  GraduationCap, 
  Award, 
  Cpu, 
  Briefcase, 
  CheckCircle2,
  Sparkles,
  Bot,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useDevice } from '../../context/DeviceContext';

export const AboutApp: React.FC = () => {
  const { openApp, openDesktopWindow, deviceMode } = useDevice();

  const handleNavigateProjects = () => {
    if (deviceMode === 'mobile') {
      openApp('projects');
    } else {
      openDesktopWindow('projects');
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-neutral-950/90 text-neutral-100 p-4 sm:p-6 select-text">
      {/* Header Profile Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-neutral-800">
        <div className="relative group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-800 p-0.5 shadow-xl shadow-cyan-500/10">
            <div className="w-full h-full rounded-[14px] bg-neutral-900 flex flex-col items-center justify-center text-center overflow-hidden">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQHu8iauv0OdlA/profile-displayphoto-scale_400_400/B4DZ_ILs1ZIoAk-/0/1785769943899?e=1789603200&v=beta&t=OOZYTjy226VAOPwWen2qM1sN7U2FZai2zeoktl60x-g"
                alt="Abinash Swain"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-neutral-950 rounded-full p-1 border-2 border-neutral-950" title="Active for opportunities">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{portfolioData.name}</h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              B.Tech AI/ML
            </span>
          </div>

          <p className="text-sm font-semibold text-cyan-300 mt-1">{portfolioData.targetRole}</p>
          <p className="text-xs text-neutral-400 mt-0.5">{portfolioData.college} • CGPA {portfolioData.cgpa}</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              {portfolioData.location}
            </span>
            <a 
              href={`mailto:${portfolioData.email}`} 
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-neutral-500" />
              {portfolioData.email}
            </a>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-neutral-500" />
              {portfolioData.phone}
            </span>
          </div>

          {/* Social & Action Links */}
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-4">
            <a
              href={portfolioData.github}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-medium text-neutral-200 flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-medium text-blue-400 flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
            <button
              onClick={handleNavigateProjects}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-semibold text-neutral-950 flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Explore Case Studies
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
        {portfolioData.quickStats.map((stat, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-black text-white tracking-tight">{stat.value}</div>
            <div className="text-xs font-semibold text-neutral-300 mt-0.5">{stat.label}</div>
            <div className="text-[10px] text-neutral-500 mt-0.5 leading-tight">{stat.subtext}</div>
          </div>
        ))}
      </div>

      {/* Editorial Bio & What I Do */}
      <div className="space-y-4">
        <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Zap className="w-4 h-4" />
            Positioning & Technical Focus
          </h2>
          <p className="text-sm leading-relaxed text-neutral-200 font-normal">
            {portfolioData.headline}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="font-bold text-cyan-300">1. Production RAG</div>
              <p className="text-[11px] text-neutral-400">Hybrid dense + BM25 search, cross-encoders, and 98.4% Ragas faithfulness.</p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="font-bold text-purple-300">2. Autonomous Copilots</div>
              <p className="text-[11px] text-neutral-400">LangGraph state machines, multi-tool API calling, and confidence scoring gates.</p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="font-bold text-emerald-300">3. Full-Stack Craft</div>
              <p className="text-[11px] text-neutral-400">Apple HIG desktop and mobile ecosystems with streaming token latencies.</p>
            </div>
          </div>
        </div>

        {/* AI Transparency & Disclosure */}
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-3">
          <Bot className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <div className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">AI Tooling & Authenticity Disclosure</div>
            <p className="text-neutral-300 leading-relaxed text-[11.5px]">
              {portfolioData.aiDisclosure}
            </p>
          </div>
        </div>

        {/* Education & Experience Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4" />
              Academic Degree
            </div>
            <div className="font-semibold text-sm text-white">{portfolioData.education[0].degree}</div>
            <div className="text-xs text-neutral-400 mt-0.5">{portfolioData.education[0].institution}</div>
            <div className="mt-2 text-xs text-emerald-400 font-medium">CGPA: {portfolioData.education[0].score}</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-4 h-4" />
              Industry Experience
            </div>
            <div className="font-semibold text-sm text-white">{portfolioData.experience[0].role}</div>
            <div className="text-xs text-neutral-400 mt-0.5">{portfolioData.experience[0].company} ({portfolioData.experience[0].period})</div>
            <div className="mt-2 text-xs text-cyan-400 font-medium">Offer ID: {portfolioData.experience[0].offerId}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
