import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export const EducationApp: React.FC = () => {
  return (
    <div className="h-full w-full bg-neutral-900/95 text-neutral-100 flex flex-col overflow-hidden select-text">
      {/* Top Toolbar */}
      <div className="h-12 px-5 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[13px] font-bold text-white tracking-tight">
              Education & Academic Milestones
            </h2>
            <p className="text-[10.5px] text-neutral-400">
              Centurion University of Technology and Management (CUTM)
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
        {/* Main Degree Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/30 via-neutral-900 to-neutral-900 border border-cyan-800/40 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
              Undergraduate Degree
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-bold border border-cyan-500/30">
              8.32 CGPA
            </span>
          </div>

          <h3 className="text-[19px] font-bold text-white tracking-tight">
            B.Tech in Computer Science & Engineering (AI & ML)
          </h3>
          <p className="text-[14px] font-semibold text-cyan-400 mt-0.5">
            {portfolioData.college}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[12px] text-neutral-400 mt-2.5">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> 2023 – 2027
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Bhubaneswar, Odisha, India
            </span>
          </div>
        </div>

        {/* Core Coursework Grid */}
        <div>
          <h3 className="text-[11.5px] font-bold uppercase tracking-wider text-neutral-400 mb-3">
            Core Academic Coursework & Grades
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { title: 'Machine Learning & Predictive Modeling', grade: 'A+', code: 'CSE-401' },
              { title: 'Data Structures & Algorithms', grade: 'A', code: 'CSE-201' },
              { title: 'Database Management Systems (SQL)', grade: 'A+', code: 'CSE-302' },
              { title: 'Probability & Statistical Computing', grade: 'A', code: 'MATH-202' },
              { title: 'Deep Learning & Neural Networks', grade: 'A+', code: 'CSE-404' },
              { title: 'Python for Data Science & Telemetry', grade: 'O (Outstanding)', code: 'CSE-310' },
            ].map((course, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-neutral-800/60 border border-neutral-700/60 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-neutral-700/50 text-neutral-300">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[12.5px] font-bold text-white">{course.title}</h4>
                    <span className="text-[10.5px] text-neutral-400 font-mono">{course.code}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-[11.5px] font-bold border border-emerald-500/20">
                  {course.grade}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
