import React from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';

export const EducationApp: React.FC = () => {
  return (
    <AppWindow
      id="education"
      title="Education"
      subtitle="Academic Journey"
      icon={<GraduationCap className="w-4 h-4 text-cyan-500" />}
    >
      {/* 1. Higher Education Primary Platter */}
      <IOSCard variant="tinted" className="bg-cyan-50/70 dark:bg-cyan-950/40 border-cyan-200/60 dark:border-cyan-800/50 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
            Undergraduate Degree
          </span>
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 text-[11px] font-bold">
            8.32 CGPA
          </span>
        </div>

        <h3 className="text-[16px] font-bold text-neutral-900 dark:text-white tracking-tight">
          B.Tech in Computer Science & Engineering (AI & ML)
        </h3>
        <p className="text-[13px] font-medium text-cyan-700 dark:text-cyan-300 mt-0.5">
          Centurion University of Technology and Management
        </p>

        <div className="flex items-center gap-3 text-[12px] text-neutral-500 dark:text-neutral-400 mt-2">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> 2023 – 2027 (3rd Year)
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> Bhubaneswar, India
          </span>
        </div>
      </IOSCard>

      {/* Coursework & Competencies */}
      <IOSSectionHeader title="Core Coursework" />
      <IOSList>
        {[
          { title: 'Machine Learning & Predictive Modeling', grade: 'A+' },
          { title: 'Data Structures & Algorithms', grade: 'A' },
          { title: 'Database Management Systems (SQL)', grade: 'A+' },
          { title: 'Probability & Statistical Computing', grade: 'A' },
          { title: 'Artificial Intelligence Architecture', grade: 'A+' },
        ].map((course, i) => (
          <IOSListItem
            key={i}
            icon={<BookOpen className="w-4 h-4" />}
            iconBg="bg-cyan-500"
            title={course.title}
            value={<span className="font-mono text-emerald-500 font-semibold">{course.grade}</span>}
          />
        ))}
      </IOSList>

      {/* Higher Secondary School */}
      <IOSSectionHeader title="Secondary Education" />
      <IOSCard className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-[14px] font-semibold text-neutral-900 dark:text-white">
            Higher Secondary (Mathematics & CS)
          </h4>
          <span className="text-[12px] font-bold text-neutral-600 dark:text-neutral-300">
            78% Score
          </span>
        </div>
        <p className="text-[12px] text-neutral-500 dark:text-neutral-400">
          Royal Higher Secondary Education • 2021 – 2023
        </p>
      </IOSCard>
    </AppWindow>
  );
};
