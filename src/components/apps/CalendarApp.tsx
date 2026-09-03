import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  X, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Rocket, 
  Trophy, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { CalendarTimelineItem } from '../../types';
import { sound } from '../../utils/audioHaptics';

export const CalendarApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'certs' | 'edu'>('all');
  const [selectedEvent, setSelectedEvent] = useState<CalendarTimelineItem | null>(null);

  const timeline = portfolioData.calendarTimeline;

  const filteredEvents = timeline.filter((item) => {
    if (activeTab === 'projects') return item.category === 'Project' || item.category === 'Milestone';
    if (activeTab === 'certs') return item.category === 'Certification';
    if (activeTab === 'edu') return item.category === 'Education' || item.category === 'Internship';
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Education': return <GraduationCap className="w-4 h-4" />;
      case 'Internship': return <Briefcase className="w-4 h-4" />;
      case 'Certification': return <Award className="w-4 h-4" />;
      case 'Project': return <Rocket className="w-4 h-4" />;
      case 'Achievement': return <Trophy className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full w-full bg-neutral-900/95 text-neutral-100 flex flex-col overflow-hidden select-text">
      {/* Top Toolbar */}
      <div className="h-12 px-5 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[13px] font-bold text-white tracking-tight">
              Calendar & Milestone Timeline
            </h2>
            <p className="text-[10.5px] text-neutral-400">
              {timeline.length} Milestones (2023 – 2027)
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-neutral-800/80 p-1 rounded-lg border border-neutral-700/60">
          {[
            { id: 'all', label: 'All' },
            { id: 'projects', label: 'Projects' },
            { id: 'certs', label: 'Certs' },
            { id: 'edu', label: 'Edu & Work' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.tap();
                setActiveTab(tab.id as any);
              }}
              className={`px-3 py-1 rounded-md text-[11.5px] font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-red-500 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid View */}
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => {
                sound.tap();
                setSelectedEvent(event);
              }}
              className="p-4 rounded-xl bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700/60 transition-all cursor-pointer flex items-start gap-3.5 group shadow-sm hover:border-neutral-600"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-md"
                style={{ backgroundColor: event.color }}
              >
                {getCategoryIcon(event.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    {event.category}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {event.date}
                  </span>
                </div>
                <h4 className="text-[13.5px] font-bold text-white tracking-tight truncate group-hover:text-cyan-400 transition-colors">
                  {event.title}
                </h4>
                <p className="text-[12px] text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Inspector Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-neutral-900 rounded-2xl p-5 shadow-2xl border border-neutral-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedEvent.color }}
                />
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  {selectedEvent.category} Milestone
                </span>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-7 h-7 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-[18px] font-bold text-white tracking-tight mb-2">
              {selectedEvent.title}
            </h3>

            <div className="space-y-1.5 mb-4 text-[12px] text-neutral-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>{selectedEvent.date} {selectedEvent.time ? `• ${selectedEvent.time}` : ''}</span>
              </div>
              {selectedEvent.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{selectedEvent.location}</span>
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-800/80 border border-neutral-700 mb-4">
              <p className="text-[13px] text-neutral-200 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-[13px] cursor-pointer transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
