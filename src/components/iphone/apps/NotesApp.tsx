import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { IOSButton } from '../ui/IOSButton';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { 
  Bookmark, 
  Plus, 
  FileText, 
  Calendar, 
  Trash2, 
  Sparkles, 
  ChevronLeft 
} from 'lucide-react';
import { sound } from '../../../utils/audioHaptics';

interface NoteItem {
  id: string;
  title: string;
  body: string;
  date: string;
  category: string;
}

export const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: '1',
      title: '5G Small-Cell KPI Optimization Notes',
      body: `10 Essential KPIs monitored:\n- Downlink/Uplink Throughput (Mbps)\n- Jitter & Packet Loss Ratio\n- Radio Link Failure (RLF) Rate\n- PRB Utilization Rate\n- RSRP / RSRQ metrics\n\nValidation Strategy: Stratified 80/20 train-test split over 5,000 telemetry instances yielded 96.2% generalization accuracy.`,
      date: 'Aug 28, 2026',
      category: 'Research & ML',
    },
    {
      id: '2',
      title: 'Oracle Agentic AI Framework Highlights',
      body: `Autonomous AI Workflows Core Tenets:\n1. Perception & Context ingestion\n2. Deliberation & multi-agent subtask routing\n3. Tool invocation with strict deterministic bounds\n4. Self-reflection & verification loops`,
      date: 'Aug 20, 2026',
      category: 'Architecture',
    },
    {
      id: '3',
      title: 'EDA & Statistical Data Cleansing Checklist',
      body: `Standard pipeline:\n- Missingness imputation (Iterative/KNN/Median)\n- Outlier fence calculation via IQR\n- Collinearity screening (VIF > 5.0)\n- Standardized z-score transformations`,
      date: 'Aug 14, 2026',
      category: 'Data Analytics',
    },
  ]);

  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const activeNote = notes.find(n => n.id === activeNoteId);

  const handleCreateNote = () => {
    if (!newTitle.trim()) return;
    sound.tap();
    const newN: NoteItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      body: newBody.trim() || 'No additional content.',
      date: 'Just now',
      category: 'Quick Note',
    };
    setNotes([newN, ...notes]);
    setNewTitle('');
    setNewBody('');
    setIsCreating(false);
    setActiveNoteId(newN.id);
  };

  return (
    <AppWindow
      id="notes"
      title={activeNote ? activeNote.title : 'Notes'}
      subtitle={`${notes.length} Notes`}
      icon={<Bookmark className="w-4 h-4 text-amber-500" />}
      headerRight={
        !activeNote && !isCreating ? (
          <button
            onClick={() => {
              sound.tap();
              setIsCreating(true);
            }}
            className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center cursor-pointer"
            title="New Note"
          >
            <Plus className="w-4 h-4" />
          </button>
        ) : undefined
      }
      onBack={activeNote ? () => setActiveNoteId(null) : isCreating ? () => setIsCreating(false) : undefined}
      backLabel={activeNote || isCreating ? 'Notes' : 'Back'}
    >
      {isCreating ? (
        /* Create Note Form */
        <div className="space-y-3">
          <IOSCard className="space-y-3">
            <input
              type="text"
              placeholder="Note Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
              className="w-full text-[16px] font-bold text-neutral-900 dark:text-white bg-transparent border-b border-neutral-200 dark:border-neutral-800 pb-2 outline-none"
            />
            <textarea
              rows={8}
              placeholder="Start writing notes, ML ideas, formulas..."
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              className="w-full text-[13.5px] text-neutral-800 dark:text-neutral-200 bg-transparent outline-none resize-none"
            />
          </IOSCard>
          <IOSButton
            fullWidth
            variant="primary"
            onClick={handleCreateNote}
          >
            Save Note
          </IOSButton>
        </div>
      ) : activeNote ? (
        /* View Note */
        <div className="space-y-3">
          <IOSCard className="space-y-3">
            <div>
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {activeNote.category} • {activeNote.date}
              </span>
              <h2 className="text-[18px] font-bold text-neutral-900 dark:text-white tracking-tight mt-1">
                {activeNote.title}
              </h2>
            </div>
            <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 text-[13.5px] text-neutral-800 dark:text-neutral-200 whitespace-pre-line leading-relaxed">
              {activeNote.body}
            </div>
          </IOSCard>
        </div>
      ) : (
        /* Notes List */
        <div className="space-y-4">
          <IOSSectionHeader title="All Folders" />
          <IOSList>
            {notes.map((n) => (
              <IOSListItem
                key={n.id}
                icon={<FileText className="w-4 h-4" />}
                iconBg="bg-amber-500"
                title={n.title}
                subtitle={`${n.date} • ${n.body.slice(0, 45)}...`}
                chevron
                onClick={() => {
                  sound.tap();
                  setActiveNoteId(n.id);
                }}
              />
            ))}
          </IOSList>
        </div>
      )}
    </AppWindow>
  );
};
