import React from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { IOSButton } from '../ui/IOSButton';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  GraduationCap, 
  Sparkles, 
  Award, 
  FileText,
  BrainCircuit,
  ArrowUpRight
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { useDevice } from '../../../context/DeviceContext';
import { sound } from '../../../utils/audioHaptics';

export const AboutApp: React.FC = () => {
  const { openApp } = useDevice();

  return (
    <AppWindow
      id="about"
      title="Abinash Swain"
      subtitle="Data Analyst • AI/ML Engineer"
      icon={<User className="w-4 h-4 text-blue-500" />}
    >
      {/* 1. iOS 18 Hero Profile Platter */}
      <div className="flex flex-col items-center text-center mb-5">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-neutral-900 overflow-hidden">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQHu8iauv0OdlA/profile-displayphoto-scale_400_400/B4DZ_ILs1ZIoAk-/0/1785769943899?e=1789603200&v=beta&t=OOZYTjy226VAOPwWen2qM1sN7U2FZai2zeoktl60x-g"
                alt="Abinash Swain"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#34C759] border-2 border-white dark:border-black flex items-center justify-center shadow-xs" title="Available for Roles">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>

        <h2 className="text-[20px] font-bold text-neutral-900 dark:text-white tracking-tight">
          {portfolioData.name}
        </h2>
        <p className="text-[13px] text-neutral-500 dark:text-neutral-400 font-medium max-w-[280px] mt-0.5">
          {portfolioData.title}
        </p>
        <div className="flex items-center gap-1 text-[12px] text-neutral-400 dark:text-neutral-500 mt-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>{portfolioData.location}</span>
        </div>

        {/* Quick Contact Circle Actions */}
        <div className="flex items-center gap-3 mt-4">
          <a
            href={`mailto:${portfolioData.email}`}
            className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#007AFF] flex items-center justify-center shadow-xs active:scale-95 transition-transform"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={`tel:${portfolioData.phone}`}
            className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-950/50 text-[#34C759] flex items-center justify-center shadow-xs active:scale-95 transition-transform"
            title="Call"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-950/50 text-sky-600 flex items-center justify-center shadow-xs active:scale-95 transition-transform"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center shadow-xs active:scale-95 transition-transform"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {portfolioData.quickStats.map((stat, i) => (
          <IOSCard key={i} padding="sm" className="bg-white/90 dark:bg-neutral-900/90">
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium block">
              {stat.label}
            </span>
            <span className="text-[18px] font-bold text-neutral-900 dark:text-white tracking-tight leading-tight mt-0.5 block">
              {stat.value}
            </span>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 leading-tight block mt-0.5">
              {stat.subtext}
            </span>
          </IOSCard>
        ))}
      </div>

      {/* 3. Editorial Bio Card */}
      <IOSSectionHeader title="Executive Summary" />
      <IOSCard className="mb-4">
        <p className="text-[13.5px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {portfolioData.aboutEditorial}
        </p>
      </IOSCard>

      {/* 4. Quick Link Inset Group */}
      <IOSSectionHeader title="Explore Profile" />
      <IOSList>
        <IOSListItem
          icon={<BrainCircuit className="w-4 h-4" />}
          iconBg="bg-blue-500"
          title="Projects & AI Models"
          subtitle="SafeDrive AI & 5G KPI Management"
          chevron
          onClick={() => openApp('projects')}
        />
        <IOSListItem
          icon={<Award className="w-4 h-4" />}
          iconBg="bg-amber-500"
          title="Certifications & Credentials"
          subtitle="Oracle Agentic AI & Tata GenAI"
          chevron
          onClick={() => openApp('certificates')}
        />
        <IOSListItem
          icon={<FileText className="w-4 h-4" />}
          iconBg="bg-rose-500"
          title="Recruiter Quick View"
          subtitle="Summary, Match Score & One-Click Contact"
          chevron
          onClick={() => openApp('recruiter')}
        />
      </IOSList>
    </AppWindow>
  );
};
