import React, { useState, useRef, useEffect } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { AppIcon } from './AppIcon';
import { 
  User, 
  FolderGit2, 
  Cpu, 
  Award, 
  Compass, 
  Image, 
  Mail, 
  Terminal, 
  Sparkles, 
  Camera, 
  Gamepad2, 
  Settings,
  SlidersHorizontal,
  Phone,
  FileText,
  Search,
  Radio,
  Briefcase,
  GraduationCap,
  Heart,
  BarChart3,
  Video,
  Film,
  Music2,
  Trash2,
  MessageCircle,
  Bookmark,
  Brain,
  ChevronLeft,
  ChevronRight,
  Calculator,
  CloudSun,
  Map,
  MessageSquare,
  Wallet,
  ClipboardList,
  Folder,
  Clock3,
  Newspaper,
  TrendingUp,
  Languages,
  Ruler,
  LocateFixed,
  Lightbulb,
  ShoppingBag,
  House,
  Shield,
  PenTool,
  Users,
  Watch,
  Tv,
  Dumbbell,
  Download,
  MoreHorizontal,
  BookOpen
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export interface HomeScreenProps {
  onOpenSpotlight: () => void;
}

interface HomeAppDef {
  id: string;
  name: string;
  icon: React.ReactNode;
  gradient: string;
  badge?: string | number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onOpenSpotlight }) => {
  const { openApp } = useDevice();
  const [activePage, setActivePage] = useState<0 | 1 | 2>(() => {
    if (typeof window === 'undefined') return 0;
    const storedPage = Number(window.sessionStorage.getItem('iphone-home-page'));
    return storedPage === 1 || storedPage === 2 ? storedPage : 0;
  });

  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const dragOffsetRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const isAnimatingRef = useRef<boolean>(false);

  // Sync track transform with activePage smoothly
  useEffect(() => {
    if (trackRef.current && !isDraggingRef.current) {
      trackRef.current.style.transition = 'transform 320ms cubic-bezier(0.25, 1, 0.5, 1)';
      trackRef.current.style.transform = `translate3d(${-activePage * (100 / 3)}%, 0, 0)`;
    }
  }, [activePage]);

  useEffect(() => {
    window.sessionStorage.setItem('iphone-home-page', String(activePage));
  }, [activePage]);

  // Page 1: Main Portfolio Apps & Core Showcases
  const primaryApps: HomeAppDef[] = [
    {
      id: 'about',
      name: 'About',
      icon: <User className="w-7 h-7 text-white" />,
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: <FolderGit2 className="w-7 h-7 text-white" />,
      gradient: 'from-sky-500 to-blue-600',
      badge: 4,
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: <Cpu className="w-7 h-7 text-white" />,
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'certificates',
      name: 'Certs',
      icon: <Award className="w-7 h-7 text-white" />,
      gradient: 'from-amber-500 to-orange-600',
      badge: 4,
    },
    {
      id: 'experience',
      name: 'Experience',
      icon: <Briefcase className="w-7 h-7 text-white" />,
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      id: 'education',
      name: 'Education',
      icon: <GraduationCap className="w-7 h-7 text-white" />,
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: <BarChart3 className="w-7 h-7 text-white" />,
      gradient: 'from-teal-500 to-emerald-700',
    },
    {
      id: 'recruiter',
      name: 'Recruiter',
      icon: <FileText className="w-7 h-7 text-white" />,
      gradient: 'from-rose-500 to-red-600',
      badge: 1,
    },
    {
      id: 'photos',
      name: 'Photos',
      icon: <Image className="w-7 h-7 text-white" />,
      gradient: 'from-pink-500 via-rose-500 to-amber-500',
    },
    {
      id: 'camera',
      name: 'Camera',
      icon: <Camera className="w-7 h-7 text-white" />,
      gradient: 'from-neutral-700 to-neutral-800',
    },
    {
      id: 'games',
      name: 'Games',
      icon: <Gamepad2 className="w-7 h-7 text-white" />,
      gradient: 'from-indigo-600 to-purple-700',
    },
    {
      id: 'calendar',
      name: 'Calendar',
      icon: <Radio className="w-7 h-7 text-white" />,
      gradient: 'from-red-500 to-orange-500',
    },
    {
      id: 'favourites',
      name: 'Favorites',
      icon: <Heart className="w-7 h-7 text-white" />,
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      id: 'music',
      name: 'Music',
      icon: <Music2 className="w-7 h-7 text-white" />,
      gradient: 'from-pink-500 to-red-600',
    },
    {
      id: 'videos',
      name: 'Videos',
      icon: <Film className="w-7 h-7 text-white" />,
      gradient: 'from-purple-500 to-pink-600',
    },
  ];

  // Page 2: Extended Suite & Utilities
  const secondaryApps: HomeAppDef[] = [
    {
      id: 'quiz',
      name: 'Quiz',
      icon: <Brain className="w-7 h-7 text-white" />,
      gradient: 'from-cyan-500 to-blue-600',
      badge: 30,
    },
    {
      id: 'resume',
      name: 'Resume',
      icon: <FileText className="w-7 h-7 text-white" />,
      gradient: 'from-red-500 to-pink-600',
    },
    {
      id: 'cv',
      name: 'CV',
      icon: <FileText className="w-7 h-7 text-white" />,
      gradient: 'from-blue-500 to-indigo-700',
    },
    {
      id: 'notes',
      name: 'Notes',
      icon: <Bookmark className="w-7 h-7 text-amber-900" />,
      gradient: 'from-amber-200 to-yellow-400',
    },
    {
      id: 'finder',
      name: 'Files',
      icon: <FolderGit2 className="w-7 h-7 text-white" />,
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <Settings className="w-7 h-7 text-neutral-300" />,
      gradient: 'from-neutral-600 to-neutral-800',
    },
    {
      id: 'gallery',
      name: 'Gallery',
      icon: <Image className="w-7 h-7 text-white" />,
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'chatbot',
      name: 'Chatbot',
      icon: <MessageCircle className="w-7 h-7 text-white" />,
      gradient: 'from-emerald-500 to-teal-700',
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: <Phone className="w-7 h-7 text-white" />,
      gradient: 'from-green-500 to-emerald-600',
    },
  ];

  // Bottom Dock Icons (Always visible)
  const dockApps = [
    {
      id: 'contact',
      name: 'Phone',
      icon: <Phone className="w-6 h-6 text-white" />,
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      id: 'safari',
      name: 'Safari',
      icon: <Compass className="w-6 h-6 text-white" />,
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      id: 'mail',
      name: 'Mail',
      icon: <Mail className="w-6 h-6 text-white" />,
      gradient: 'from-blue-500 to-indigo-600',
      badge: '1',
    },
    {
      id: 'ai',
      name: 'Abinash AI',
      icon: <Sparkles className="w-6 h-6 text-white" />,
      gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
    },
  ];

  const utilityApps: HomeAppDef[] = [
    { id: 'phone', name: 'Phone', icon: <Phone className="w-7 h-7 text-white" />, gradient: 'from-[#35c759] to-[#1f9f48]' },
    { id: 'messages', name: 'Messages', icon: <MessageSquare className="w-7 h-7 text-white" />, gradient: 'from-[#4ccc7a] to-[#2aa95f]' },
    { id: 'weather', name: 'Weather', icon: <CloudSun className="w-7 h-7 text-white" />, gradient: 'from-[#5bb2ff] to-[#2a79d7]' },
    { id: 'clock', name: 'Clock', icon: <Clock3 className="w-7 h-7 text-white" />, gradient: 'from-[#2f2f31] to-[#1a1a1d]' },
    { id: 'calculator', name: 'Calculator', icon: <Calculator className="w-7 h-7 text-white" />, gradient: 'from-[#5f646c] to-[#2b2d31]' },
    { id: 'maps', name: 'Maps', icon: <Map className="w-7 h-7 text-white" />, gradient: 'from-[#4ec7a5] to-[#2d8f7d]' },
    { id: 'wallet', name: 'Wallet', icon: <Wallet className="w-7 h-7 text-white" />, gradient: 'from-[#1d1f22] to-[#0d1013]' },
    { id: 'reminders', name: 'Reminders', icon: <ClipboardList className="w-7 h-7 text-white" />, gradient: 'from-[#f3a34e] to-[#db7d26]' },
    { id: 'files', name: 'Files', icon: <Folder className="w-7 h-7 text-white" />, gradient: 'from-[#4f8cff] to-[#2c60d6]' },
    { id: 'voice', name: 'Voice Memos', icon: <Radio className="w-7 h-7 text-white" />, gradient: 'from-[#ff5c5c] to-[#ff4141]' },
    { id: 'journal', name: 'Journal', icon: <BookOpen className="w-7 h-7 text-white" />, gradient: 'from-[#f3c76d] to-[#e0a63d]' },
    { id: 'shortcuts', name: 'Shortcuts', icon: <Sparkles className="w-7 h-7 text-white" />, gradient: 'from-[#9b6ae8] to-[#7c3aed]' },
  ];

  // Swipe / Gesture Handlers with zero-rerender GPU acceleration
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    dragOffsetRef.current = 0;
    isHorizontalSwipeRef.current = null;
    isDraggingRef.current = true;
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
      trackRef.current.style.willChange = 'transform';
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || startXRef.current === null || startYRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - startXRef.current;
    const deltaY = currentY - startYRef.current;

    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 6) {
        isHorizontalSwipeRef.current = true;
      } else if (Math.abs(deltaY) > 6) {
        isHorizontalSwipeRef.current = false;
      }
    }

    if (isHorizontalSwipeRef.current && trackRef.current) {
      let offset = deltaX;
      const maxPage = 2;
      const pageLimit = (activePage === 0 && deltaX > 0) || (activePage === maxPage && deltaX < 0);
      if (pageLimit) {
        offset = deltaX * 0.25;
      }
      dragOffsetRef.current = offset;
      trackRef.current.style.transform = `translate3d(calc(${-activePage * (100 / 3)}% + ${offset}px), 0, 0)`;
    }
  };

  const handleTouchEnd = () => {
    if (isDraggingRef.current && startXRef.current !== null) {
      const offset = dragOffsetRef.current;
      isDraggingRef.current = false;
      if (trackRef.current) {
        trackRef.current.style.transition = 'transform 300ms cubic-bezier(0.25, 1, 0.5, 1)';
        trackRef.current.style.willChange = 'auto';
      }

      if (isHorizontalSwipeRef.current) {
        if (offset < -35 && activePage < 2) {
          sound.tap();
          setActivePage((prev) => (prev + 1) as 0 | 1 | 2);
        } else if (offset > 35 && activePage > 0) {
          sound.tap();
          setActivePage((prev) => (prev - 1) as 0 | 1 | 2);
        } else if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${-activePage * (100 / 3)}%, 0, 0)`;
        }
      }
    }
    startXRef.current = null;
    startYRef.current = null;
    isHorizontalSwipeRef.current = null;
    dragOffsetRef.current = 0;
  };

  // Mouse drag support for desktop/laptop preview
  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    dragOffsetRef.current = 0;
    isHorizontalSwipeRef.current = null;
    isDraggingRef.current = true;
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
      trackRef.current.style.willChange = 'transform';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || startXRef.current === null) return;
    const deltaX = e.clientX - startXRef.current;
    
    if (Math.abs(deltaX) > 6) {
      isHorizontalSwipeRef.current = true;
    }

    if (isHorizontalSwipeRef.current && trackRef.current) {
      let offset = deltaX;
      const maxPage = 2;
      const pageLimit = (activePage === 0 && deltaX > 0) || (activePage === maxPage && deltaX < 0);
      if (pageLimit) {
        offset = deltaX * 0.25;
      }
      dragOffsetRef.current = offset;
      trackRef.current.style.transform = `translate3d(calc(${-activePage * (100 / 3)}% + ${offset}px), 0, 0)`;
    }
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current && startXRef.current !== null) {
      const offset = dragOffsetRef.current;
      isDraggingRef.current = false;
      if (trackRef.current) {
        trackRef.current.style.transition = 'transform 300ms cubic-bezier(0.25, 1, 0.5, 1)';
        trackRef.current.style.willChange = 'auto';
      }

      if (isHorizontalSwipeRef.current) {
        if (offset < -35 && activePage < 2) {
          sound.tap();
          setActivePage((prev) => (prev + 1) as 0 | 1 | 2);
        } else if (offset > 35 && activePage > 0) {
          sound.tap();
          setActivePage((prev) => (prev - 1) as 0 | 1 | 2);
        } else if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${-activePage * (100 / 3)}%, 0, 0)`;
        }
      }
    }
    startXRef.current = null;
    startYRef.current = null;
    isHorizontalSwipeRef.current = null;
    dragOffsetRef.current = 0;
  };

  return (
    <div 
      className="iphone-home-screen relative w-full h-full flex flex-col justify-between p-4 pt-14 text-white select-none overflow-hidden font-sans"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Sliding App Track (Horizontal side scrolling between Page 1 and Page 2) */}
      <div className="flex-1 w-full overflow-hidden relative touch-pan-y">
        <div 
          ref={trackRef}
          className="flex flex-row w-[300%] h-full will-change-transform"
          style={{
            transform: `translate3d(${-activePage * (100 / 3)}%, 0, 0)`,
            transition: 'transform 320ms cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {/* ================= PAGE 1 ================= */}
          <div className="w-1/3 h-full flex flex-col justify-between px-1">
            <div className="w-full grid grid-cols-2 gap-3 mb-2.5">
              <div
                onClick={(e) => {
                  if (Math.abs(dragOffsetRef.current) > 8) return;
                  e.stopPropagation();
                  sound.appOpen();
                  openApp('about');
                }}
                className="ios-home-widget p-3.5 rounded-[26px] bg-white/20 dark:bg-black/35 backdrop-blur-2xl border border-white/25 shadow-lg flex flex-col justify-between cursor-pointer hover:bg-white/25 active:scale-95 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">Abinash Swain</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div>
                  <div className="text-[20px] font-bold text-white tracking-tight leading-tight">8.32 CGPA</div>
                  <div className="text-[11px] text-white/80 font-medium truncate mt-0.5">B.Tech AI/ML • CUTM</div>
                </div>
              </div>

              <div
                onClick={(e) => {
                  if (Math.abs(dragOffsetRef.current) > 8) return;
                  e.stopPropagation();
                  sound.appOpen();
                  openApp('recruiter');
                }}
                className="ios-home-widget p-3.5 rounded-[26px] bg-gradient-to-br from-blue-600/30 to-indigo-900/40 backdrop-blur-2xl border border-blue-400/30 shadow-lg flex flex-col justify-between cursor-pointer hover:bg-blue-600/40 active:scale-95 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-cyan-300">
                    <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                    <span>Recruiter Brief</span>
                  </div>
                  <span className="text-[10px] text-white/70 font-mono">96.2%</span>
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white tracking-tight leading-tight">Open portfolio summary</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-x-3 gap-y-3.5 px-0.5 py-0.5">
              {primaryApps.map((app) => (
                <div key={app.id} className="flex justify-center">
                  <AppIcon
                    id={app.id}
                    name={app.name}
                    icon={app.icon}
                    gradient={app.gradient}
                    badge={app.badge}
                    onClick={() => {
                      if (Math.abs(dragOffsetRef.current) > 8) return;
                      openApp(app.id);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ================= PAGE 2 ================= */}
          <div className="w-1/3 h-full flex flex-col justify-between px-1">
            <div className="grid grid-cols-2 gap-3 mb-2.5">
              <div className="ios-home-widget p-3.5 rounded-[26px] bg-gradient-to-br from-emerald-500/35 to-cyan-900/45 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">Skills</span>
                  <TrendingUp className="w-4 h-4 text-emerald-200" />
                </div>
                <div>
                  <div className="text-[20px] font-bold text-white tracking-tight leading-tight">AI / ML</div>
                  <div className="text-[11px] text-white/80 font-medium mt-0.5">Core strengths</div>
                </div>
              </div>
              <div className="ios-home-widget p-3.5 rounded-[26px] bg-gradient-to-br from-amber-500/35 to-rose-900/45 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">Library</span>
                  <BookOpen className="w-4 h-4 text-amber-200" />
                </div>
                <div>
                  <div className="text-[20px] font-bold text-white tracking-tight leading-tight">6+</div>
                  <div className="text-[11px] text-white/80 font-medium mt-0.5">Certificates</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-x-3 gap-y-3.5 px-0.5 py-0.5">
              {secondaryApps.map((app) => (
                <div key={app.id} className="flex justify-center">
                  <AppIcon
                    id={app.id}
                    name={app.name}
                    icon={app.icon}
                    gradient={app.gradient}
                    badge={app.badge}
                    onClick={() => {
                      if (Math.abs(dragOffsetRef.current) > 8) return;
                      openApp(app.id);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ================= PAGE 3 ================= */}
          <div className="w-1/3 h-full flex flex-col justify-between px-1">
            <div className="ios-home-widget p-3.5 rounded-[26px] bg-gradient-to-br from-sky-500/35 to-blue-900/45 mb-2.5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] font-bold text-white uppercase tracking-wider">
                  <CloudSun className="w-4 h-4 text-sky-200" />
                  <span>Bhubaneswar</span>
                </div>
                <span className="text-[10px] text-white/70">Today</span>
              </div>
              <div className="flex items-end justify-between mt-3">
                <div className="text-[28px] font-semibold text-white tracking-tight leading-none">28°</div>
                <div className="text-right text-[11px] text-white/80 font-medium">Partly cloudy<br />Good day to explore</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-x-3 gap-y-3.5 px-0.5 py-0.5 mt-1">
              {utilityApps.map((app) => (
                <div key={app.id} className="flex justify-center">
                  <AppIcon
                    id={app.id}
                    name={app.name}
                    icon={app.icon}
                    gradient={app.gradient}
                    badge={app.badge}
                    onClick={() => {
                      if (Math.abs(dragOffsetRef.current) > 8) return;
                      openApp(app.id);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Center Pagination Dots & Spotlight Search Pill */}
      <div className="w-full flex flex-col items-center gap-1.5 py-1 shrink-0">
        {/* Pagination Dots with Smooth Indicator */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.tap();
              setActivePage(0);
            }}
            aria-label="Page 1"
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activePage === 0 ? 'bg-white w-5 shadow-sm' : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
          />
          <button
            onClick={() => {
              sound.tap();
              setActivePage(1);
            }}
            aria-label="Page 2"
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activePage === 1 ? 'bg-white w-5 shadow-sm' : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
          />
          <button
            onClick={() => {
              sound.tap();
              setActivePage(2);
            }}
            aria-label="Page 3"
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activePage === 2 ? 'bg-white w-5 shadow-sm' : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
          />
        </div>

        {/* Spotlight Search Capsule */}
        <button
          onClick={() => {
            sound.tap();
            onOpenSpotlight();
          }}
          className="ios-home-search px-3.5 py-1 rounded-full bg-black/30 backdrop-blur-xl border border-white/20 text-white/90 hover:bg-black/40 active:scale-95 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Search className="w-3 h-3 text-white/70" />
          <span className="text-[11px] font-medium tracking-tight">Search</span>
        </button>
      </div>

      {/* iOS 18 Frosted Glass Bottom Dock */}
      <div className="ios-home-dock w-full p-2.5 rounded-[32px] bg-white/20 dark:bg-black/35 backdrop-blur-3xl border border-white/25 shadow-2xl flex items-center justify-around shrink-0">
        {dockApps.map((app) => (
          <AppIcon
            key={app.id}
            id={app.id}
            name={app.name}
            icon={app.icon}
            gradient={app.gradient}
            badge={app.badge}
            onClick={() => openApp(app.id)}
            size="sm"
            showLabel={false}
          />
        ))}
      </div>
    </div>
  );
};
