import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Calendar, 
  Sparkles, 
  Search,
  BookMarked,
  Tag
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

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

  const [activeNoteId, setActiveNoteId] = useState<string>('1');
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

  const handleCreateNote = () => {
    if (!newTitle.trim()) return;
    sound.tap();
    const newNote: NoteItem = {
      id: Date.now().toString(),
      title: newTitle,
      body: newBody || 'No extra content.',
      date: 'Just now',
      category: 'General Notes',
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setNewTitle('');
    setNewBody('');
  };

  const handleDeleteNote = (id: string) => {
    sound.tap();
    const remaining = notes.filter(n => n.id !== id);
    setNotes(remaining);
    if (activeNoteId === id && remaining.length > 0) {
      setActiveNoteId(remaining[0].id);
    }
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full w-full bg-neutral-900/95 text-neutral-100 flex flex-col overflow-hidden select-text">
      {/* Top Toolbar */}
      <div className="h-12 px-5 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="text-[13px] font-bold text-white tracking-tight">
            Notes & Engineering Scratchpad
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-[11.5px] text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 w-44"
            />
          </div>
        </div>
      </div>

      {/* 2-Column Split: Sidebar + Note Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Notes Sidebar List */}
        <div className="w-64 border-r border-neutral-800 bg-neutral-950/40 flex flex-col shrink-0">
          <div className="p-3 border-b border-neutral-800/80">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="New note title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-[11.5px] text-white placeholder-neutral-500 focus:outline-none"
              />
              <textarea
                placeholder="Quick body (optional)..."
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                rows={2}
                className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-[11.5px] text-white placeholder-neutral-500 focus:outline-none resize-none"
              />
              <button
                onClick={handleCreateNote}
                className="w-full py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-[11.5px] flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add Note
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => {
                  sound.tap();
                  setActiveNoteId(note.id);
                }}
                className={`p-2.5 rounded-xl transition-all cursor-pointer group flex flex-col justify-between ${
                  activeNoteId === note.id
                    ? 'bg-amber-500/20 border border-amber-500/40 text-white'
                    : 'hover:bg-neutral-800/60 text-neutral-300'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <h4 className="text-[12px] font-bold truncate">
                    {note.title}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 hover:text-red-400 p-0.5"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-1">
                  <span>{note.category}</span>
                  <span>{note.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note Editor / Inspector Pane */}
        <div className="flex-1 overflow-y-auto p-6 bg-neutral-900 custom-scrollbar">
          {activeNote ? (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-amber-400 font-mono text-[10.5px] font-bold">
                    {activeNote.category}
                  </span>
                  <h1 className="text-[20px] font-bold text-white mt-1.5">
                    {activeNote.title}
                  </h1>
                </div>
                <span className="text-[11.5px] text-neutral-400 font-mono">
                  {activeNote.date}
                </span>
              </div>

              <div className="text-[13px] text-neutral-200 leading-relaxed whitespace-pre-line font-mono bg-neutral-950/40 p-4 rounded-xl border border-neutral-800">
                {activeNote.body}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-neutral-500 text-[13px]">
              Select or create a note from the left sidebar
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
