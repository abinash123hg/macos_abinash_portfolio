import React from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  Award,
  ChevronRight
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';

export const ExperienceApp: React.FC = () => {
  const experiences = portfolioData.experience;

  return (
    <AppWindow
      id="experience"
      title="Experience"
      subtitle="Work History & Internships"
      icon={<Briefcase className="w-4 h-4 text-purple-500" />}
    >
      <div className="space-y-4">
        {experiences.map((exp, idx) => (
          <div key={exp.id || idx}>
            {idx === 0 && <IOSSectionHeader title="Internship Experience" />}
            {idx === 1 && <IOSSectionHeader title="Industry Training & Programs" />}

            <IOSCard
              variant={idx === 0 ? 'tinted' : 'default'}
              className={
                idx === 0
                  ? 'bg-purple-50/70 dark:bg-purple-950/40 border-purple-200/60 dark:border-purple-800/50'
                  : ''
              }
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1">
                  {idx === 0 ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5" /> Hands-On Internship
                    </>
                  ) : (
                    <>
                      <Award className="w-3.5 h-3.5 text-blue-500" /> Certified Program
                    </>
                  )}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-[10.5px] font-bold">
                  {exp.type}
                </span>
              </div>

              <h3 className="text-[16px] font-bold text-neutral-900 dark:text-white tracking-tight">
                {exp.role}
              </h3>
              <p className="text-[13px] font-semibold text-purple-700 dark:text-purple-300 mt-0.5">
                {exp.company} {exp.offerId ? `• ${exp.offerId}` : ''}
              </p>
              <div className="flex items-center gap-3 text-[12px] text-neutral-500 dark:text-neutral-400 mt-1 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {exp.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {exp.location}
                </span>
              </div>

              {/* Responsibilities list */}
              <div className="space-y-1.5 border-t border-purple-200/40 dark:border-purple-800/40 pt-2.5 mb-3">
                {exp.responsibilities.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-[12px] text-neutral-700 dark:text-neutral-300 leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              {/* Tech stack pills */}
              {exp.skills && exp.skills.length > 0 && (
                <div className="pt-2 border-t border-neutral-200/50 dark:border-neutral-800/50">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium border border-neutral-200/60 dark:border-neutral-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </IOSCard>
          </div>
        ))}
      </div>
    </AppWindow>
  );
};
