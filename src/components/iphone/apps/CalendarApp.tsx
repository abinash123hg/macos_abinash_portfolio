import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { IOSSegmentedControl } from '../ui/IOSSegmentedControl';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  MapPin, 
  X, 
  Code2, 
  Rocket, 
  Trophy 
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { CalendarTimelineItem } from '../../../types';
import { sound } from '../../../utils/audioHaptics';

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
      case 'Education':
        return <GraduationCap className="w-4 h-4" />;
      case 'Internship':
        return <Briefcase className="w-4 h-4" />;
      case 'Certification':
        return <Award className="w-4 h-4" />;
      case 'Project':
        return <Rocket className="w-4 h-4" />;
      case 'Achievement':
        return <Trophy className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <AppWindow
      id="calendar"
      title="Calendar"
      subtitle={`${timeline.length} Milestones`}
      icon={<CalendarIcon className="w-4 h-4 text-red-500" />}
    >
      {/* Segmented Filter */}
      <div className="mb-4">
        <IOSSegmentedControl
          options={[
            { value: 'all', label: 'All' },
            { value: 'projects', label: 'Projects' },
            { value: 'certs', label: 'Certs' },
            { value: 'edu', label: 'Edu & Work' },
          ]}
          value={activeTab}
          onChange={(val) => {
            sound.tap();
            setActiveTab(val as any);
          }}
        />
      </div>

      {/* Month & Target Range Header */}
      <div className="flex items-center justify-between px-1 mb-3">
        <div>
          <span className="text-[17px] font-bold text-neutral-900 dark:text-white">
            Portfolio Journey Timeline
          </span>
          <p className="text-[11.5px] text-neutral-500">
            2023 – 2027 • Milestones & Deployments
          </p>
        </div>
        <span className="text-xs font-semibold text-[#007AFF] px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50">
          {filteredEvents.length} Events
        </span>
      </div>

      {/* Events Timeline List */}
      <div className="space-y-2 mb-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => {
              sound.tap();
              setSelectedEvent(event);
            }}
            className="p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm cursor-pointer active:scale-98 transition-all flex items-start gap-3"
          >
            {/* Color Accent Indicator */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm"
              style={{ backgroundColor: event.color }}
            >
              {getCategoryIcon(event.category)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {event.category}
                </span>
                <span className="text-[11px] font-mono text-neutral-500">
                  {event.date}
                </span>
              </div>
              <h4 className="text-[14px] font-bold text-neutral-900 dark:text-white tracking-tight truncate">
                {event.title}
              </h4>
              <p className="text-[12px] text-neutral-600 dark:text-neutral-300 line-clamp-1 mt-0.5">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Bottom Sheet Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-0 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white dark:bg-neutral-900 rounded-t-[28px] p-5 shadow-2xl border-t border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-bottom duration-250">
            {/* Sheet Handle */}
            <div className="w-10 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700 mx-auto mb-4" />

            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedEvent.color }}
                />
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  {selectedEvent.category} Milestone
                </span>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-[18px] font-bold text-neutral-900 dark:text-white tracking-tight leading-snug mb-2">
              {selectedEvent.title}
            </h3>

            <div className="space-y-1.5 mb-4 text-[12.5px] text-neutral-600 dark:text-neutral-300">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{selectedEvent.date} {selectedEvent.time ? `• ${selectedEvent.time}` : ''}</span>
              </div>
              {selectedEvent.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{selectedEvent.location}</span>
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 mb-4">
              <p className="text-[13px] text-neutral-800 dark:text-neutral-200 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full py-3 rounded-xl bg-[#007AFF] text-white font-semibold text-[14px] cursor-pointer active:scale-98 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </AppWindow>
  );
};

