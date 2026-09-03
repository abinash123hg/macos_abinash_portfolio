import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  List, 
  Columns, 
  GalleryVertical, 
  Share2, 
  Tag, 
  Search, 
  SlidersHorizontal,
  Folder, 
  Clock, 
  Grid, 
  ArrowDownCircle, 
  Monitor, 
  FileText, 
  HardDrive, 
  FolderGit2,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  FileCode2,
  Mail,
  Linkedin,
  Activity,
  Cpu,
  Trash2,
  Music,
  Image as ImageIcon
} from 'lucide-react';
import { MacTrafficLights } from '../primitives/MacTrafficLights';
import { MacList, MacSidebarSection } from '../primitives/MacList';
import { useDevice } from '../../../context/DeviceContext';
import { sound } from '../../../utils/audioHaptics';

interface FinderItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'pdf' | 'link';
  appId?: string;
  category?: string;
  iconType?: 'folder' | 'pdf' | 'code' | 'model' | 'cert' | 'work' | 'contact' | 'link';
  badgeColor?: string;
}

export const FinderWindow: React.FC = () => {
  const [selectedSidebar, setSelectedSidebar] = useState('portfolio-drive');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'columns' | 'gallery'>('grid');
  const [selectedItem, setSelectedItem] = useState<string | null>('Resume.pdf');
  const [searchQuery, setSearchQuery] = useState('');
  const [navigationHistory, setNavigationHistory] = useState(['portfolio-drive']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isGrouped, setIsGrouped] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const {
    openDesktopWindow,
    focusDesktopWindow,
    windows,
    closeDesktopWindow,
    minimizeDesktopWindow,
    maximizeDesktopWindow,
  } = useDevice();

  const sidebarSections: MacSidebarSection[] = [
    {
      title: 'Favorites',
      items: [
        { id: 'recents', label: 'Recents', icon: <Clock className="w-3.5 h-3.5 text-blue-500" /> },
        { id: 'applications', label: 'Applications', icon: <Grid className="w-3.5 h-3.5 text-blue-500" /> },
        { id: 'photos', label: 'Photos', icon: <ImageIcon className="w-3.5 h-3.5 text-pink-500" /> },
        { id: 'music', label: 'Music', icon: <Music className="w-3.5 h-3.5 text-rose-500" /> },
        { id: 'downloads', label: 'Downloads', icon: <ArrowDownCircle className="w-3.5 h-3.5 text-blue-500" /> },
        { id: 'desktop', label: 'Desktop', icon: <Monitor className="w-3.5 h-3.5 text-blue-500" /> },
        { id: 'documents', label: 'Documents', icon: <FileText className="w-3.5 h-3.5 text-blue-500" /> },
        { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-3.5 h-3.5 text-blue-500" /> },
        { id: 'trash', label: 'Trash', icon: <Trash2 className="w-3.5 h-3.5 text-neutral-400" /> },
      ]
    },
    {
      title: 'Locations',
      items: [
        { id: 'portfolio-drive', label: 'Portfolio Drive', icon: <HardDrive className="w-3.5 h-3.5 text-blue-600" /> },
        { id: 'abinash-swain', label: 'Abinash Swain', icon: <Cpu className="w-3.5 h-3.5 text-cyan-600" /> },
        { id: 'machd', label: 'Macintosh HD', icon: <HardDrive className="w-3.5 h-3.5 text-neutral-600" /> },
      ]
    }
  ];

  // Abinash Swain's Real Portfolio Items (Folders & Files)
  const finderItems: FinderItem[] = [
    // Real Portfolio Folders
    { id: 'f-projects', name: 'Projects', type: 'folder', appId: 'projects', iconType: 'folder' },
    { id: 'f-certs', name: 'Certifications', type: 'folder', appId: 'certificates', iconType: 'folder' },
    { id: 'f-cinema', name: 'Favorite Cinema', type: 'folder', appId: 'favorites', iconType: 'folder' },
    { id: 'f-videos', name: 'Video Demos', type: 'folder', appId: 'videoplayer', iconType: 'folder' },
    { id: 'f-exp', name: 'Experience', type: 'folder', appId: 'experience', iconType: 'folder' },
    { id: 'f-resume', name: 'Resume', type: 'folder', appId: 'recruiter', iconType: 'folder' },
    { id: 'f-skills', name: 'Skills', type: 'folder', appId: 'skills', iconType: 'folder' },

    // Real Portfolio Files & Models
    { id: 'file-5g', name: '5G KPI Analytics', type: 'file', appId: 'projects', iconType: 'model', badgeColor: 'from-blue-500 to-indigo-600' },
    { id: 'file-csv', name: 'CSV Intelligence', type: 'file', appId: 'projects', iconType: 'code', badgeColor: 'from-teal-500 to-emerald-700' },
    { id: 'file-safedrive', name: 'SafeDrive AI', type: 'file', appId: 'projects', iconType: 'model', badgeColor: 'from-cyan-500 to-blue-700' },
    { id: 'file-viral', name: 'Viral Predictor', type: 'file', appId: 'projects', iconType: 'code', badgeColor: 'from-rose-500 to-pink-600' },
    { id: 'file-inventory', name: 'Smart Inventory AI', type: 'file', appId: 'projects', iconType: 'model', badgeColor: 'from-amber-500 to-orange-600' },

    // Real Certifications
    { id: 'file-oracle', name: 'Oracle Agentic AI', type: 'file', appId: 'certificates', iconType: 'cert', badgeColor: 'from-amber-400 to-red-500' },
    { id: 'file-deloitte', name: 'Deloitte Analytics', type: 'file', appId: 'certificates', iconType: 'cert', badgeColor: 'from-emerald-500 to-teal-700' },
    { id: 'file-tata', name: 'Tata GenAI', type: 'file', appId: 'certificates', iconType: 'cert', badgeColor: 'from-blue-500 to-indigo-600' },

    // Experience & Academics
    { id: 'file-internpe', name: 'InternPe Internship', type: 'file', appId: 'experience', iconType: 'work', badgeColor: 'from-purple-500 to-indigo-600' },
    { id: 'file-cutm', name: 'B.Tech AI/ML', type: 'file', appId: 'education', iconType: 'work', badgeColor: 'from-blue-600 to-indigo-800' },

    // Documents & Contact
    { id: 'file-resume-pdf', name: 'Resume.pdf', type: 'pdf', appId: 'recruiter', iconType: 'pdf' },
    { id: 'file-linkedin', name: 'LinkedIn', type: 'link', appId: 'about', iconType: 'link' },
    { id: 'file-contact', name: 'Contact', type: 'link', appId: 'mail', iconType: 'contact' },
  ];

  const handleLaunch = (item: FinderItem) => {
    sound.tap();
    if (item.appId) {
      const win = windows[item.appId];
      if (win && win.isOpen) {
        focusDesktopWindow(item.appId);
      } else {
        openDesktopWindow(item.appId);
      }
    }
  };

  const handleSidebarClick = (id: string) => {
    sound.tap();
    setSelectedSidebar(id);
    setNavigationHistory((history) => [...history.slice(0, historyIndex + 1), id]);
    setHistoryIndex((index) => index + 1);
    if (id === 'projects') openDesktopWindow('projects');
    else if (id === 'certifications') openDesktopWindow('certificates');
    else if (id === 'experience') openDesktopWindow('experience');
    else if (id === 'applications') openDesktopWindow('skills');
    else if (id === 'photos') openDesktopWindow('photos');
    else if (id === 'music') openDesktopWindow('music');
    else if (id === 'trash') openDesktopWindow('trash');
  };

  const navigateHistory = (direction: -1 | 1) => {
    const nextIndex = historyIndex + direction;
    if (nextIndex < 0 || nextIndex >= navigationHistory.length) return;
    sound.tap();
    setHistoryIndex(nextIndex);
    setSelectedSidebar(navigationHistory[nextIndex]);
  };

  const handleShare = async () => {
    sound.tap();
    try {
      await navigator.clipboard.writeText(window.location.href);
      setActionMessage('Portfolio link copied');
    } catch {
      setActionMessage('Portfolio link ready to share');
    }
  };

  const handleToolbarAction = (message: string) => {
    sound.tap();
    setActionMessage(message);
  };

  const filteredItems = finderItems
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((first, second) => isGrouped
      ? first.type.localeCompare(second.type) || first.name.localeCompare(second.name)
      : 0
    );

  return (
    <div className="w-[840px] max-w-[95vw] h-[520px] max-h-[80vh] min-h-0 rounded-[13px] bg-white/95 backdrop-blur-2xl border border-black/15 shadow-[0_25px_65px_-10px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden text-neutral-800 select-none animate-in fade-in zoom-in-95 duration-200">
      {/* 1. macOS Title & Unified Toolbar */}
      <div className="min-h-[52px] px-3.5 py-2 bg-gradient-to-b from-[#f6f6f6] to-[#ececec] border-b border-black/12 flex flex-wrap items-center gap-2 shrink-0">
        {/* Left: Traffic Lights & Navigation */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <MacTrafficLights
            onClose={() => closeDesktopWindow('finder')}
            onMinimize={() => minimizeDesktopWindow('finder')}
            onMaximize={() => maximizeDesktopWindow('finder')}
          />

          {/* Back / Forward arrows */}
          <div className="flex items-center gap-0.5 ml-1">
            <button
              onClick={() => navigateHistory(-1)}
              disabled={historyIndex === 0}
              className="p-1 rounded-[5px] text-neutral-600 hover:bg-black/5 hover:text-neutral-900 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default"
              title="Back"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              onClick={() => navigateHistory(1)}
              disabled={historyIndex === navigationHistory.length - 1}
              className="p-1 rounded-[5px] text-neutral-600 hover:bg-black/5 hover:text-neutral-900 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default"
              title="Forward"
            >
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

          {/* Window Title */}
          <h1 className="text-[13.5px] font-bold text-neutral-900 tracking-tight truncate">
            Portfolio Drive — Abinash Swain
          </h1>
        </div>

        {/* Center: View Switcher Segmented Control */}
        <div className="flex items-center bg-black/[0.06] p-0.5 rounded-[7px] border border-black/[0.05] shrink-0">
          <button
            onClick={() => {
              sound.tap();
              setViewMode('grid');
            }}
            className={`p-1 rounded-[5px] transition-all cursor-pointer ${
              viewMode === 'grid' ? 'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] text-neutral-900' : 'text-neutral-500 hover:text-neutral-800'
            }`}
            title="Icon View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              sound.tap();
              setViewMode('list');
            }}
            className={`p-1 rounded-[5px] transition-all cursor-pointer ${
              viewMode === 'list' ? 'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] text-neutral-900' : 'text-neutral-500 hover:text-neutral-800'
            }`}
            title="List View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              sound.tap();
              setViewMode('columns');
            }}
            className={`p-1 rounded-[5px] transition-all cursor-pointer ${
              viewMode === 'columns' ? 'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] text-neutral-900' : 'text-neutral-500 hover:text-neutral-800'
            }`}
            title="Column View"
          >
            <Columns className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              sound.tap();
              setViewMode('gallery');
            }}
            className={`p-1 rounded-[5px] transition-all cursor-pointer ${
              viewMode === 'gallery' ? 'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] text-neutral-900' : 'text-neutral-500 hover:text-neutral-800'
            }`}
            title="Gallery View"
          >
            <GalleryVertical className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Actions & Search */}
        <div className="flex items-center gap-1.5 min-w-0">
          <button 
            onClick={handleShare}
            className="p-1.5 rounded-[6px] text-neutral-700 hover:bg-black/5 transition-colors cursor-pointer"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => handleToolbarAction('Tags are ready for selected items')}
            className="p-1.5 rounded-[6px] text-neutral-700 hover:bg-black/5 transition-colors cursor-pointer"
            title="Tags"
          >
            <Tag className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => {
              sound.tap();
              setIsGrouped((grouped) => !grouped);
            }}
            className="p-1.5 rounded-[6px] text-neutral-700 hover:bg-black/5 transition-colors cursor-pointer"
            title={isGrouped ? 'Ungroup items' : 'Group by type'}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* Search Box */}
          <div className="relative ml-1">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search items"
              className="pl-8 pr-2.5 py-1 rounded-[6px] bg-black/[0.05] border border-black/[0.08] text-[12px] text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#007aff]/30 w-32 sm:focus:w-44 transition-all"
            />
          </div>
        </div>
      </div>

      {/* 2. Window Body: 2-Pane Layout (Translucent Sidebar + Content Area) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-[185px] max-[640px]:w-[140px] bg-[#eeeff2]/90 backdrop-blur-xl border-r border-black/10 flex flex-col shrink-0 overflow-y-auto custom-scrollbar p-1">
          <MacList
            sections={sidebarSections}
            selectedId={selectedSidebar}
            onSelect={handleSidebarClick}
          />
        </aside>

        {/* Main Content Area (Icon View) */}
        <main className="flex-1 min-w-0 bg-white p-5 max-[640px]:p-3 overflow-y-auto custom-scrollbar flex flex-col justify-between">
          <div className={
            viewMode === 'list'
              ? 'grid grid-cols-1 gap-1'
              : viewMode === 'columns'
                ? 'grid grid-cols-2 md:grid-cols-3 gap-4'
                : viewMode === 'gallery'
                  ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'
                  : 'grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-6 gap-x-4'
          }>
            {filteredItems.map((item) => {
              const isSelected = selectedItem === item.name;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.tap();
                    setSelectedItem(item.name);
                    handleLaunch(item);
                  }}
                  className={`group cursor-pointer p-1.5 rounded-[8px] transition-all ${
                    viewMode === 'list'
                      ? 'flex items-center gap-3 text-left'
                      : 'flex flex-col items-center'
                  } ${
                    isSelected ? 'bg-[#007aff]/15 ring-1 ring-[#007aff]/30' : 'hover:bg-black/[0.04]'
                  }`}
                >
                  {/* Item Icon */}
                  {item.type === 'folder' ? (
                    /* macOS Native Blue Folder SVG */
                      <div className={`${viewMode === 'gallery' ? 'w-[76px] h-[62px]' : 'w-[64px] h-[52px]'} relative flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.14)]`}>
                      <svg viewBox="0 0 64 52" className="w-full h-full">
                        {/* Back folder flap */}
                        <path
                          d="M4 8C4 5.79 5.79 4 8 4H24L29 10H56C58.21 10 60 11.79 60 14V44C60 46.21 58.21 48 56 48H8C5.79 48 4 46.21 4 44V8Z"
                          fill="#0091ff"
                        />
                        {/* Folder inner paper gradient */}
                        <path
                          d="M8 14H56V44H8V14Z"
                          fill="#ffffff"
                          opacity="0.25"
                        />
                        {/* Front folder flap */}
                        <path
                          d="M4 16C4 13.79 5.79 12 8 12H56C58.21 12 60 13.79 60 16V44C60 46.21 58.21 48 56 48H8C5.79 48 4 46.21 4 44V16Z"
                          fill="url(#macFolderGrad)"
                        />
                        <defs>
                          <linearGradient id="macFolderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#007aff" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  ) : item.type === 'pdf' ? (
                    /* PDF Document Icon */
                    <div className={`${viewMode === 'gallery' ? 'w-[64px] h-[64px]' : 'w-[52px] h-[52px]'} rounded-[10px] bg-white border border-red-200 p-1 flex flex-col items-center justify-center shadow-[0_3px_8px_rgba(0,0,0,0.15)] relative`}>
                      <span className="text-[7.5px] font-black uppercase tracking-wider text-red-600 bg-red-100 px-1 rounded-xs">PDF</span>
                      <FileText className="w-6 h-6 text-red-500 mt-0.5" />
                    </div>
                  ) : item.type === 'link' ? (
                    /* Link / Contact Icon */
                    <div className={`${viewMode === 'gallery' ? 'w-[64px] h-[64px]' : 'w-[52px] h-[52px]'} rounded-[12px] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-[0_3px_8px_rgba(0,0,0,0.18)]`}>
                      {item.iconType === 'contact' ? <Mail className="w-6 h-6" /> : <Linkedin className="w-6 h-6" />}
                    </div>
                  ) : (
                    /* Model / Code File Thumbnail */
                    <div className={`${viewMode === 'gallery' ? 'w-[64px] h-[64px]' : 'w-[52px] h-[52px]'} rounded-[12px] bg-gradient-to-br ${item.badgeColor || 'from-blue-500 to-indigo-600'} flex items-center justify-center text-white shadow-[0_3px_8px_rgba(0,0,0,0.18)] border border-white/40`}>
                      {item.iconType === 'cert' ? (
                        <Award className="w-6 h-6" />
                      ) : item.iconType === 'work' ? (
                        <Briefcase className="w-6 h-6" />
                      ) : (
                        <Sparkles className="w-6 h-6" />
                      )}
                    </div>
                  )}

                  {/* Item Label with macOS blue highlight when selected */}
                  <span
                    className={`text-[11.5px] leading-tight px-1.5 py-0.5 rounded-[4px] truncate ${
                      viewMode === 'list' ? 'flex-1 text-left max-w-none' : 'mt-1.5 text-center max-w-[85px]'
                    } ${
                      isSelected
                        ? 'bg-[#007aff] text-white font-medium shadow-[0_1px_2px_rgba(0,122,255,0.4)]'
                        : 'text-neutral-800'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 3. Bottom Finder Status Bar */}
          <div className="h-6 border-t border-black/8 text-[11px] text-neutral-500 flex items-center justify-between px-2 shrink-0 pt-1 font-normal">
            <span>{actionMessage || `${filteredItems.length} items`}</span>
            <span>Abinash Swain • AI & ML Portfolio HD</span>
            <span>1.48 TB available</span>
          </div>
        </main>
      </div>
    </div>
  );
};
