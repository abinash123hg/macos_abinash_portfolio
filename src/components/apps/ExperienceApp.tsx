import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Award,
  ExternalLink,
  Code2
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export const ExperienceApp: React.FC = () => {
  const experiences = portfolioData.experience;

  return (
    <div className="h-full w-full bg-neutral-900/95 text-neutral-100 flex flex-col overflow-hidden select-text">
      {/* Top Toolbar */}
      <div className="h-12 px-5 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[13px] font-bold text-white tracking-tight">
              Work History & Experience
            </h2>
            <p className="text-[10.5px] text-neutral-400">
              Internships & Industry Training Programs
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
        {experiences.map((exp, idx) => (
          <div
            key={exp.id || idx}
            className={`p-5 rounded-2xl border transition-all ${
              idx === 0
                ? 'bg-gradient-to-br from-purple-950/30 to-neutral-900 border-purple-800/40 shadow-lg'
                : 'bg-neutral-800/50 border-neutral-700/60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                {idx === 0 ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5" /> Hands-On Internship
                  </>
                ) : (
                  <>
                    <Award className="w-3.5 h-3.5 text-blue-400" /> Industry Training
                  </>
                )}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                {exp.type}
              </span>
            </div>

            <h3 className="text-[18px] font-bold text-white tracking-tight">
              {exp.role}
            </h3>
            <p className="text-[13.5px] font-semibold text-purple-300 mt-0.5">
              {exp.company} {exp.offerId ? `• ${exp.offerId}` : ''}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-[12px] text-neutral-400 mt-2 mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {exp.period}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {exp.location}
              </span>
            </div>

            {/* Responsibilities list */}
            <div className="space-y-2 border-t border-neutral-800 pt-3.5 mb-4">
              {exp.responsibilities.map((r, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[12.5px] text-neutral-200 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>{r}</span>
                </div>
              ))}
            </div>

            {/* Tech stack pills */}
            {exp.skills && exp.skills.length > 0 && (
              <div className="pt-3 border-t border-neutral-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-200 text-[11.5px] font-medium border border-neutral-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
