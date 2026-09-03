import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { 
  DeviceMode, 
  WindowState, 
  DynamicIslandState, 
  CameraControlState, 
  NotificationItem, 
  SystemSettings,
  MediaItem,
  TrashItem,
  WallpaperSettings,
  MusicTrack
} from '../types';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audioHaptics';

export type IPhoneScreen = 
  | 'lock' 
  | 'passcode' 
  | 'home' 
  | 'app' 
  | 'switcher' 
  | 'control_center' 
  | 'notifications' 
  | 'spotlight' 
  | 'app_library' 
  | 'camera_fullscreen';

export const DEFAULT_MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'track-rhythm-funk',
    title: 'Rhythm Funk',
    artist: 'AlexGuz',
    album: 'Groove & Funk Sessions',
    duration: '2:15',
    coverUrl: 'assets/photos/295657.jpg',
    audioUrl: 'assets/music/alexguz-rhythm-funk-511536.mp3',
    genre: 'Funk / Groove',
    accentColor: '#007AFF'
  },
  {
    id: 'track-tokyo-funk',
    title: 'Tokyo Funk Commercial Promo',
    artist: 'FAS Sounds',
    album: 'Commercial Promo Funk',
    duration: '2:30',
    coverUrl: 'assets/photos/26640376.jpg',
    audioUrl: 'assets/music/fassounds-tokyo-funk-commercial-promo-funk-423844.mp3',
    genre: 'Commercial Promo Funk',
    accentColor: '#EC4899'
  },
];

export const INITIAL_TRASH_ITEMS: TrashItem[] = [
  {
    id: 'trash-1',
    originalId: 'legacy-model-1',
    name: 'deprecated_linear_regression.py',
    title: 'Deprecated Linear Model',
    category: 'Legacy Machine Learning',
    type: 'script',
    deletedAt: '2 days ago',
    size: '4.2 KB',
  },
  {
    id: 'trash-2',
    originalId: 'legacy-data-1',
    name: 'uncalibrated_telemetry_synthetic.csv',
    title: 'Synthetic Telemetry Log',
    category: 'Mock Dataset',
    type: 'file',
    deletedAt: 'Yesterday',
    size: '1.8 MB',
  },
  {
    id: 'trash-3',
    originalId: 'legacy-notes-1',
    name: 'draft_capstone_notes_v1.txt',
    title: 'Draft Notes V1',
    category: 'Drafts',
    type: 'file',
    deletedAt: '3 hours ago',
    size: '12 KB',
  }
];

interface DeviceContextType {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  toggleDeviceMode: () => void;
  
  // iPhone OS State
  isLocked: boolean;
  unlockPhone: () => void;
  lockPhone: () => void;
  triggerFaceId: () => void;
  phoneScreen: IPhoneScreen;
  setPhoneScreen: (screen: IPhoneScreen) => void;
  activeAppId: string | null;
  openApp: (appId: string) => void;
  closeApp: () => void;
  recentApps: string[];
  closeRecentApp: (appId: string) => void;
  
  // Dynamic Island
  dynamicIsland: DynamicIslandState;
  triggerDynamicIsland: (state: Partial<DynamicIslandState>, autoDismissMs?: number) => void;
  setDynamicIslandExpanded: (expanded: boolean) => void;
  
  // Camera Control System
  cameraControl: CameraControlState;
  updateCameraControl: (updates: Partial<CameraControlState>) => void;
  clickCameraControl: () => void;
  lightPressCameraControl: () => void;
  lockFocusExposure: (locked: boolean) => void;
  
  // macOS Window Manager
  windows: Record<string, WindowState>;
  openDesktopWindow: (appId: string) => void;
  closeDesktopWindow: (appId: string) => void;
  minimizeDesktopWindow: (appId: string) => void;
  maximizeDesktopWindow: (appId: string) => void;
  focusDesktopWindow: (appId: string) => void;
  updateWindowPosition: (appId: string, pos: { x: number; y: number }) => void;
  updateWindowSize: (appId: string, size: { width: number; height: number }) => void;
  activeDesktopWindowId: string | null;
  
  // System State & Settings
  settings: SystemSettings;
  updateSettings: (updates: Partial<SystemSettings>) => void;
  toggleFlashlight: () => Promise<void>;
  theme: 'dark' | 'light' | 'system';
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
  resolvedTheme: 'dark' | 'light';
  notifications: NotificationItem[];
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Wallpaper System
  setWallpaper: (target: 'ios-lock' | 'ios-home' | 'ios-both' | 'mac-desktop' | 'mac-lock' | 'mac-both', imageUrl: string) => void;
  resetWallpaper: (target?: string) => void;

  // Photos & Media State
  mediaItems: MediaItem[];
  addMediaItem: (item: MediaItem) => void;
  favorites: Record<string, boolean>;
  toggleFavorite: (id: string) => void;

  // Trash & Bin System
  trashItems: TrashItem[];
  moveToTrash: (item: MediaItem | any, type?: 'photo' | 'video' | 'file' | 'script') => void;
  restoreFromTrash: (trashId: string) => void;
  deletePermanently: (trashId: string) => void;
  emptyTrash: () => void;

  // Music System
  musicTracks: MusicTrack[];
  nowPlayingTrack: MusicTrack | null;
  isPlayingMusic: boolean;
  playMusicTrack: (track: MusicTrack) => void;
  togglePlayMusic: () => void;
  nextMusicTrack: () => void;
  prevMusicTrack: () => void;

  // Media Previews / Fullscreen
  fullscreenMediaUrl: string | null;
  setFullscreenMediaUrl: (url: string | null) => void;
}

const DEFAULT_WINDOWS: Record<string, WindowState> = {
  about: {
    id: 'about',
    title: 'About Abinash',
    icon: 'User',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    position: { x: 70, y: 70 },
    size: { width: 680, height: 500 },
    zIndex: 10
  },
  projects: {
    id: 'projects',
    title: 'Projects & AI Models',
    icon: 'FolderGit2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 120, y: 90 },
    size: { width: 880, height: 580 },
    zIndex: 9
  },
  skills: {
    id: 'skills',
    title: 'Skills & Tech Stack',
    icon: 'Cpu',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 160, y: 110 },
    size: { width: 720, height: 520 },
    zIndex: 8
  },
  certificates: {
    id: 'certificates',
    title: 'Certifications & Credentials',
    icon: 'Award',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 190, y: 100 },
    size: { width: 840, height: 560 },
    zIndex: 7
  },
  safari: {
    id: 'safari',
    title: 'Safari — Abinash Live Demos',
    icon: 'Compass',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 140, y: 80 },
    size: { width: 860, height: 580 },
    zIndex: 6
  },
  photos: {
    id: 'photos',
    title: 'Photos & Media Gallery',
    icon: 'Image',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 220, y: 120 },
    size: { width: 820, height: 540 },
    zIndex: 5
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal — zsh (abinash@macbook)',
    icon: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 250, y: 140 },
    size: { width: 660, height: 440 },
    zIndex: 4
  },
  ai: {
    id: 'ai',
    title: 'Ask Abinash AI',
    icon: 'Sparkles',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 280, y: 90 },
    size: { width: 520, height: 600 },
    zIndex: 11
  },
  mail: {
    id: 'mail',
    title: 'Mail — Contact Abinash',
    icon: 'Mail',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 200, y: 130 },
    size: { width: 700, height: 500 },
    zIndex: 3
  },
  settings: {
    id: 'settings',
    title: 'System Settings',
    icon: 'Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 180, y: 110 },
    size: { width: 680, height: 480 },
    zIndex: 2
  },
  games: {
    id: 'games',
    title: 'Game Center & Arcade',
    icon: 'Gamepad2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 240, y: 100 },
    size: { width: 720, height: 520 },
    zIndex: 4
  },
  camera: {
    id: 'camera',
    title: 'Camera & Vision Studio',
    icon: 'Camera',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 210, y: 90 },
    size: { width: 640, height: 540 },
    zIndex: 6
  },
  recruiter: {
    id: 'recruiter',
    title: 'Recruiter Dossier & Hiring Brief',
    icon: 'Sparkles',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 100, y: 80 },
    size: { width: 860, height: 600 },
    zIndex: 12
  },
  hrpolitely: {
    id: 'hrpolitely',
    title: 'HR Politely — Candidate Profile & Hiring Overview',
    icon: 'Briefcase',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 80, y: 60 },
    size: { width: 880, height: 620 },
    zIndex: 13
  },
  experience: {
    id: 'experience',
    title: 'Work History & Experience',
    icon: 'Briefcase',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 150, y: 100 },
    size: { width: 760, height: 540 },
    zIndex: 7
  },
  education: {
    id: 'education',
    title: 'Education & Academics',
    icon: 'GraduationCap',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 180, y: 110 },
    size: { width: 720, height: 500 },
    zIndex: 6
  },
  calendar: {
    id: 'calendar',
    title: 'Calendar & Milestone Timeline',
    icon: 'Calendar',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 200, y: 90 },
    size: { width: 820, height: 560 },
    zIndex: 8
  },
  notes: {
    id: 'notes',
    title: 'Engineering Scratchpad & Notes',
    icon: 'FileText',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 220, y: 120 },
    size: { width: 800, height: 520 },
    zIndex: 9
  },
  analytics: {
    id: 'analytics',
    title: 'Model Analytics & Telemetry Lab',
    icon: 'BarChart3',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 160, y: 90 },
    size: { width: 860, height: 580 },
    zIndex: 10
  },
  quiz: {
    id: 'quiz',
    title: 'AI Knowledge Quiz',
    icon: 'Brain',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 140, y: 70 },
    size: { width: 880, height: 600 },
    zIndex: 10
  },
  finder: {
    id: 'finder',
    title: 'iCloud Drive',
    icon: 'Cloud',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 110, y: 75 },
    size: { width: 840, height: 520 },
    zIndex: 11
  },
  favorites: {
    id: 'favorites',
    title: 'Favorite Cinema & Series',
    icon: 'Film',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 150, y: 85 },
    size: { width: 900, height: 600 },
    zIndex: 10
  },
  videoplayer: {
    id: 'videoplayer',
    title: 'QuickTime & Video Demos',
    icon: 'Tv',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 170, y: 95 },
    size: { width: 880, height: 580 },
    zIndex: 10
  },
  videos: {
    id: 'videos',
    title: 'Videos & Demos',
    icon: 'Tv',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 170, y: 95 },
    size: { width: 880, height: 580 },
    zIndex: 10
  },
  trash: {
    id: 'trash',
    title: 'Trash Bin',
    icon: 'Trash2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 180, y: 120 },
    size: { width: 780, height: 500 },
    zIndex: 12
  },
  music: {
    id: 'music',
    title: 'Apple Music',
    icon: 'Music',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 130, y: 80 },
    size: { width: 820, height: 540 },
    zIndex: 11
  }
};

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Device Mode: auto-detect from responsive viewport on mount
  const [deviceMode, setDeviceMode] = useState<DeviceMode>(() => {
    if (typeof window !== 'undefined') {
      const isMobileQuery = window.matchMedia('(max-width: 767px)').matches;
      return isMobileQuery ? 'mobile' : 'desktop';
    }
    return 'desktop';
  });

  // Automatically listen to viewport and orientation changes for responsive switching
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    
    const updateDeviceMode = (e?: MediaQueryListEvent) => {
      const isMobile = e ? e.matches : mediaQuery.matches;
      setDeviceMode(isMobile ? 'mobile' : 'desktop');
    };

    // Initial check synchronization
    updateDeviceMode();

    // Listen to media query changes (supported in all modern browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateDeviceMode);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(updateDeviceMode);
    }

    // Additional listeners for orientation and window resize events
    window.addEventListener('resize', () => updateDeviceMode());
    window.addEventListener('orientationchange', () => updateDeviceMode());

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateDeviceMode);
      } else {
        mediaQuery.removeListener(updateDeviceMode);
      }
      window.removeEventListener('resize', () => updateDeviceMode());
      window.removeEventListener('orientationchange', () => updateDeviceMode());
    };
  }, []);

  const toggleDeviceMode = useCallback(() => {
    setDeviceMode(prev => {
      const next = prev === 'desktop' ? 'mobile' : 'desktop';
      sound.tap();
      return next;
    });
  }, []);

  // iPhone 15 States
  const [isLocked, setIsLocked] = useState(true);
  const [phoneScreen, setPhoneScreen] = useState<IPhoneScreen>('lock');
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [recentApps, setRecentApps] = useState<string[]>(['about', 'projects', 'skills', 'photos']);

  // Dynamic Island
  const [dynamicIsland, setDynamicIsland] = useState<DynamicIslandState>({
    mode: 'idle',
    expanded: false,
  });

  // Camera Control State
  const [cameraControl, setCameraControl] = useState<CameraControlState>({
    isOpen: false,
    activeControl: 'zoom',
    menuOpen: false,
    zoom: 1.0,
    exposure: 0,
    depth: 2.8,
    cameraLens: 'main',
    style: 'Standard',
    tone: 0,
    isAeAfLocked: false,
    visualIntelligenceOpen: false,
    mode: 'photo',
    isRecording: false
  });
  const flashlightStreamRef = useRef<MediaStream | null>(null);

  // Desktop Window Manager
  const [windows, setWindows] = useState<Record<string, WindowState>>(DEFAULT_WINDOWS);
  const [topZIndex, setTopZIndex] = useState(20);
  const [activeDesktopWindowId, setActiveDesktopWindowId] = useState<string | null>('about');

  // Settings & Wallpapers
  const storedWallpaperIndex = typeof window !== 'undefined'
    ? Number(window.localStorage.getItem('abinash-wallpaper-index'))
    : NaN;
  const [settings, setSettings] = useState<SystemSettings>({
    theme: 'dark',
    wallpaperIndex: Number.isInteger(storedWallpaperIndex) && storedWallpaperIndex >= 0 && storedWallpaperIndex <= 3
      ? storedWallpaperIndex
      : 0,
    wallpapers: {
      macDesktop: null,
      macLock: null,
      iosHome: null,
      iosLock: null,
    },
    soundEnabled: true,
    hapticEnabled: true,
    wifiEnabled: true,
    bluetoothEnabled: true,
    airplaneMode: false,
    flashlightOn: false,
    focusMode: false,
    brightness: 90,
    volume: 75,
    batteryLevel: 98,
    isCharging: true,
    iCloudSync: true,
    cameraControlClickCount: 'single',
    lockFocusExposureSetting: true
  });

  useEffect(() => {
    type BatteryManagerLike = EventTarget & {
      level: number;
      charging: boolean;
      addEventListener: (type: string, listener: EventListener) => void;
      removeEventListener: (type: string, listener: EventListener) => void;
    };

    const getBattery = (navigator as Navigator & {
      getBattery?: () => Promise<BatteryManagerLike>;
    }).getBattery;

    if (!getBattery) return;

    let battery: BatteryManagerLike | null = null;
    const updateBattery = () => {
      if (!battery) return;
      setSettings(prev => ({
        ...prev,
        batteryLevel: Math.round(battery.level * 100),
        isCharging: battery.charging,
      }));
    };

    getBattery().then((availableBattery) => {
      battery = availableBattery;
      updateBattery();
      battery.addEventListener('levelchange', updateBattery);
      battery.addEventListener('chargingchange', updateBattery);
    }).catch(() => {});

    return () => {
      if (battery) {
        battery.removeEventListener('levelchange', updateBattery);
        battery.removeEventListener('chargingchange', updateBattery);
      }
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('abinash-wallpaper-index', String(settings.wallpaperIndex));
    } catch {
      // Storage may be unavailable in private browsing or embedded previews.
    }
  }, [settings.wallpaperIndex]);

  // Dynamic Media Items & Favorites State
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => portfolioData.media || []);

  const addMediaItem = useCallback((item: MediaItem) => {
    setMediaItems(prev => [item, ...prev]);
  }, []);
  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => ({
    'breaking-bad': true,
    'dark-knight': true,
    'dark-series': true,
    'm-1': true,
    'm-2': true,
    'm-3': true,
    'm-4': true,
    'm-5': true,
    'm-6': true,
    'photo-1': true,
    'photo-3': true,
    'photo-5': true,
    'photo-8': true,
    'cert-adobe-ai': true,
    'cert-tata-genai': true,
    'cert-deloitte-analytics': true,
    'cert-skill-india': true,
    'cert-oracle-agentic': true
  }));

  // Trash Items State
  const [trashItems, setTrashItems] = useState<TrashItem[]>(INITIAL_TRASH_ITEMS);

  // Music System State
  const [musicTracks] = useState<MusicTrack[]>(DEFAULT_MUSIC_TRACKS);
  const [nowPlayingTrack, setNowPlayingTrack] = useState<MusicTrack | null>(DEFAULT_MUSIC_TRACKS[0]);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      appId: 'projects',
      appName: 'SafeDrive AI',
      appIcon: 'ShieldAlert',
      title: 'Real-Time Model Deployed',
      message: 'Accident hotspot prediction system is live with 96.2% accuracy.',
      timestamp: '2m ago',
      read: false
    },
    {
      id: 'notif-2',
      appId: 'certificates',
      appName: 'Oracle University',
      appIcon: 'Award',
      title: 'Agentic AI Associate Verified',
      message: 'Credential #103519150AAI26OFA confirmed.',
      timestamp: '15m ago',
      read: false
    },
    {
      id: 'notif-3',
      appId: 'ai',
      appName: 'Abinash AI',
      appIcon: 'Sparkles',
      title: 'AI Assistant Active',
      message: 'Ready to answer questions about Abinash’s portfolio.',
      timestamp: '1h ago',
      read: true
    }
  ]);

  const [fullscreenMediaUrl, setFullscreenMediaUrl] = useState<string | null>(null);

  // Dynamic Island trigger helper
  const triggerDynamicIsland = useCallback((state: Partial<DynamicIslandState>, autoDismissMs = 3500) => {
    setDynamicIsland(prev => ({ ...prev, ...state, expanded: true }));
    sound.tap();

    if (autoDismissMs > 0) {
      setTimeout(() => {
        setDynamicIsland(prev => ({ ...prev, expanded: false, mode: 'idle' }));
      }, autoDismissMs);
    }
  }, []);

  const setDynamicIslandExpanded = useCallback((expanded: boolean) => {
    setDynamicIsland(prev => ({ ...prev, expanded }));
  }, []);

  // Wallpaper Setter
  const setWallpaper = useCallback((
    target: 'ios-lock' | 'ios-home' | 'ios-both' | 'mac-desktop' | 'mac-lock' | 'mac-both', 
    imageUrl: string
  ) => {
    sound.successChime();
    setSettings(prev => {
      const current = prev.wallpapers || {
        macDesktop: null,
        macLock: null,
        iosHome: null,
        iosLock: null,
      };
      const updated = { ...current };

      if (target === 'ios-lock' || target === 'ios-both') {
        updated.iosLock = imageUrl;
      }
      if (target === 'ios-home' || target === 'ios-both') {
        updated.iosHome = imageUrl;
      }
      if (target === 'mac-desktop' || target === 'mac-both') {
        updated.macDesktop = imageUrl;
      }
      if (target === 'mac-lock' || target === 'mac-both') {
        updated.macLock = imageUrl;
      }

      return {
        ...prev,
        wallpapers: updated
      };
    });

    let targetLabel = 'Wallpaper';
    if (target === 'ios-lock') targetLabel = 'iPhone Lock Screen Wallpaper';
    else if (target === 'ios-home') targetLabel = 'iPhone Home Screen Wallpaper';
    else if (target === 'ios-both') targetLabel = 'iPhone Lock & Home Screen';
    else if (target === 'mac-desktop') targetLabel = 'macOS Desktop Wallpaper';
    else if (target === 'mac-lock') targetLabel = 'macOS Lock Screen Wallpaper';
    else if (target === 'mac-both') targetLabel = 'macOS Desktop & Lock Screen';

    triggerDynamicIsland({
      mode: 'system',
      title: 'Wallpaper Updated',
      subtitle: targetLabel
    }, 2800);
  }, [triggerDynamicIsland]);

  const resetWallpaper = useCallback((target?: string) => {
    sound.tap();
    setSettings(prev => ({
      ...prev,
      wallpapers: {
        macDesktop: null,
        macLock: null,
        iosHome: null,
        iosLock: null,
      }
    }));
    triggerDynamicIsland({
      mode: 'system',
      title: 'Wallpapers Restored',
      subtitle: 'Default Sonoma / iOS 18 Gradients'
    }, 2500);
  }, [triggerDynamicIsland]);

  // Favorites Toggle
  const toggleFavorite = useCallback((id: string) => {
    sound.tap();
    setFavorites(prev => {
      const nextVal = !prev[id];
      const next = { ...prev, [id]: nextVal };
      triggerDynamicIsland({
        mode: 'system',
        title: nextVal ? 'Added to Favorites' : 'Removed from Favorites',
        subtitle: id
      }, 2000);
      return next;
    });
  }, [triggerDynamicIsland]);

  // Move Item to Trash
  const moveToTrash = useCallback((item: any, type: 'photo' | 'video' | 'file' | 'script' = 'photo') => {
    sound.deleteTrash();
    const itemId = item.id || `item-${Date.now()}`;
    const itemTitle = item.title || item.name || 'Untitled Item';
    
    // Remove from mediaItems if it was in photos/media
    setMediaItems(prev => prev.filter(m => m.id !== itemId));

    const newTrashItem: TrashItem = {
      id: `trash-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      originalId: itemId,
      name: item.filename || item.name || itemTitle,
      title: itemTitle,
      category: item.category || 'User Media',
      type: type,
      deletedAt: 'Just now',
      size: item.size || '3.4 MB',
      thumbnail: item.url || item.thumbnail || item.coverUrl,
      mediaUrl: item.url || item.mediaUrl,
      itemData: item
    };

    setTrashItems(prev => [newTrashItem, ...prev]);

    triggerDynamicIsland({
      mode: 'system',
      title: 'Moved to Trash',
      subtitle: itemTitle
    }, 2500);
  }, [triggerDynamicIsland]);

  // Restore Item from Trash
  const restoreFromTrash = useCallback((trashId: string) => {
    sound.successChime();
    setTrashItems(prev => {
      const itemToRestore = prev.find(t => t.id === trashId);
      if (itemToRestore && itemToRestore.itemData) {
        setMediaItems(mPrev => {
          if (mPrev.some(m => m.id === itemToRestore.originalId)) return mPrev;
          return [itemToRestore.itemData, ...mPrev];
        });
      }
      return prev.filter(t => t.id !== trashId);
    });

    triggerDynamicIsland({
      mode: 'system',
      title: 'Item Restored',
      subtitle: 'Restored to original location'
    }, 2500);
  }, [triggerDynamicIsland]);

  // Delete Permanently
  const deletePermanently = useCallback((trashId: string) => {
    sound.deleteTrash();
    setTrashItems(prev => prev.filter(t => t.id !== trashId));
    triggerDynamicIsland({
      mode: 'system',
      title: 'Deleted Permanently',
      subtitle: 'Storage reclaimed'
    }, 2000);
  }, [triggerDynamicIsland]);

  // Empty Trash
  const emptyTrash = useCallback(() => {
    sound.deleteTrash();
    setTrashItems([]);
    triggerDynamicIsland({
      mode: 'system',
      title: 'Trash Emptied',
      subtitle: 'All trashed items permanently deleted'
    }, 2500);
  }, [triggerDynamicIsland]);

  // Music Playback Controls
  const playMusicTrack = useCallback((track: MusicTrack) => {
    setNowPlayingTrack(track);
    setIsPlayingMusic(true);
    sound.playTrack(track.audioUrl);
    triggerDynamicIsland({
      mode: 'music',
      title: track.title,
      subtitle: track.artist
    }, 3500);
  }, [triggerDynamicIsland]);

  const togglePlayMusic = useCallback(() => {
    setIsPlayingMusic(prev => {
      const next = !prev;
      if (next) {
        sound.resumeTrack();
        if (!sound.getTrackProgress().duration) {
          sound.playTrack(nowPlayingTrack?.audioUrl);
        }
        if (nowPlayingTrack) {
          triggerDynamicIsland({
            mode: 'music',
            title: nowPlayingTrack.title,
            subtitle: 'Playing'
          }, 2500);
        }
      } else {
        sound.pauseTrack();
        triggerDynamicIsland({
          mode: 'music',
          title: 'Music Paused',
          subtitle: nowPlayingTrack?.title || ''
        }, 1500);
      }
      return next;
    });
  }, [nowPlayingTrack, triggerDynamicIsland]);

  const nextMusicTrack = useCallback(() => {
    if (!nowPlayingTrack) return;
    const currentIndex = musicTracks.findIndex(t => t.id === nowPlayingTrack.id);
    const nextIndex = (currentIndex + 1) % musicTracks.length;
    playMusicTrack(musicTracks[nextIndex]);
  }, [nowPlayingTrack, musicTracks, playMusicTrack]);

  const prevMusicTrack = useCallback(() => {
    if (!nowPlayingTrack) return;
    const currentIndex = musicTracks.findIndex(t => t.id === nowPlayingTrack.id);
    const prevIndex = (currentIndex - 1 + musicTracks.length) % musicTracks.length;
    playMusicTrack(musicTracks[prevIndex]);
  }, [nowPlayingTrack, musicTracks, playMusicTrack]);

  // Unlock Phone
  const unlockPhone = useCallback(() => {
    sound.faceIdSuccess();
    setIsLocked(false);
    setPhoneScreen('home');
    triggerDynamicIsland({
      mode: 'notification',
      title: 'Face ID Verified',
      subtitle: 'Welcome to Abinash’s iPhone 15'
    }, 2500);
  }, [triggerDynamicIsland]);

  const lockPhone = useCallback(() => {
    sound.lockSound();
    setIsLocked(true);
    setPhoneScreen('lock');
    setActiveAppId(null);
  }, []);

  const triggerFaceId = useCallback(() => {
    sound.faceIdSuccess();
    unlockPhone();
  }, [unlockPhone]);

  // Open App on iPhone
  const openApp = useCallback((appId: string) => {
    sound.tap();
    setActiveAppId(appId);
    setPhoneScreen('app');
    
    // Add to recent apps
    setRecentApps(prev => {
      const filtered = prev.filter(id => id !== appId);
      return [appId, ...filtered].slice(0, 10);
    });

    if (appId === 'camera') {
      triggerDynamicIsland({
        mode: 'camera',
        title: 'Camera Active',
        subtitle: '48MP Main Lens'
      }, 2500);
    } else if (appId === 'ai') {
      triggerDynamicIsland({
        mode: 'ai',
        title: 'Abinash AI Ready',
        subtitle: 'Gemini 2.5 Flash'
      }, 2500);
    }
  }, [triggerDynamicIsland]);

  // Close App on iPhone (swipe up to home)
  const closeApp = useCallback(() => {
    sound.tap();
    setActiveAppId(null);
    setPhoneScreen('home');
  }, []);

  const closeRecentApp = useCallback((appId: string) => {
    sound.tap();
    setRecentApps(prev => prev.filter(id => id !== appId));
    if (activeAppId === appId) {
      setActiveAppId(null);
      setPhoneScreen('home');
    }
  }, [activeAppId]);

  // Camera Control actions
  const updateCameraControl = useCallback((updates: Partial<CameraControlState>) => {
    setCameraControl(prev => ({ ...prev, ...updates }));
    sound.cameraControlClick();
  }, []);

  const clickCameraControl = useCallback(() => {
    sound.cameraShutter();
    if (phoneScreen !== 'app' || activeAppId !== 'camera') {
      openApp('camera');
      triggerDynamicIsland({
        mode: 'camera',
        title: 'Camera Opened',
        subtitle: 'Via Camera Control'
      }, 2000);
    } else {
      // In camera app: take photo or toggle recording
      if (cameraControl.mode === 'video') {
        setCameraControl(prev => ({ ...prev, isRecording: !prev.isRecording }));
      } else {
        // Flash trigger animation
        triggerDynamicIsland({
          mode: 'camera',
          title: 'Photo Captured',
          subtitle: '48MP ProRAW saved to Photos'
        }, 2000);
      }
    }
  }, [phoneScreen, activeAppId, openApp, triggerDynamicIsland, cameraControl.mode]);

  const lightPressCameraControl = useCallback(() => {
    sound.cameraControlClick();
    setCameraControl(prev => ({
      ...prev,
      menuOpen: !prev.menuOpen
    }));
  }, []);

  const lockFocusExposure = useCallback((locked: boolean) => {
    sound.cameraControlClick();
    setCameraControl(prev => ({ ...prev, isAeAfLocked: locked }));
    if (locked) {
      triggerDynamicIsland({
        mode: 'camera',
        title: 'AE/AF Lock',
        subtitle: 'Exposure & Focus Locked'
      }, 2000);
    }
  }, [triggerDynamicIsland]);

  // Desktop Window Controls
  const openDesktopWindow = useCallback((appId: string) => {
    sound.tap();
    setTopZIndex(z => z + 1);
    setWindows(prev => {
      const current = prev[appId] || {
        id: appId,
        title: appId,
        icon: 'AppWindow',
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        position: { x: 100 + Math.random() * 80, y: 80 + Math.random() * 60 },
        size: { width: 720, height: 500 },
        zIndex: topZIndex + 1
      };
      return {
        ...prev,
        [appId]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          zIndex: topZIndex + 1
        }
      };
    });
    setActiveDesktopWindowId(appId);
  }, [topZIndex]);

  const closeDesktopWindow = useCallback((appId: string) => {
    sound.tap();
    setWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], isOpen: false }
    }));
    if (activeDesktopWindowId === appId) {
      setActiveDesktopWindowId(null);
    }
  }, [activeDesktopWindowId]);

  const minimizeDesktopWindow = useCallback((appId: string) => {
    sound.tap();
    setWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], isMinimized: true }
    }));
    if (activeDesktopWindowId === appId) {
      setActiveDesktopWindowId(null);
    }
  }, [activeDesktopWindowId]);

  const maximizeDesktopWindow = useCallback((appId: string) => {
    sound.tap();
    setWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], isMaximized: !prev[appId]?.isMaximized }
    }));
  }, []);

  const focusDesktopWindow = useCallback((appId: string) => {
    setTopZIndex(z => z + 1);
    setWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], isMinimized: false, zIndex: topZIndex + 1 }
    }));
    setActiveDesktopWindowId(appId);
  }, [topZIndex]);

  const updateWindowPosition = useCallback((appId: string, pos: { x: number; y: number }) => {
    setWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], position: pos }
    }));
  }, []);

  const updateWindowSize = useCallback((appId: string, size: { width: number; height: number }) => {
    setWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], size }
    }));
  }, []);

  // Calculate resolved theme
  const getResolvedTheme = useCallback((themeSetting: 'dark' | 'light' | 'system'): 'dark' | 'light' => {
    if (themeSetting === 'system') {
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'dark';
    }
    return themeSetting;
  }, []);

  const resolvedTheme = getResolvedTheme(settings.theme);

  // Sync theme to DOM
  useEffect(() => {
    const applyThemeToDOM = () => {
      const currentResolved = getResolvedTheme(settings.theme);
      if (currentResolved === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    };

    applyThemeToDOM();

    if (settings.theme === 'system' && typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyThemeToDOM();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [settings.theme, getResolvedTheme]);

  // System Settings update
  const updateSettings = useCallback((updates: Partial<SystemSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...updates };
      if (updates.volume !== undefined) {
        sound.setVolume(updates.volume / 100);
      }
      return next;
    });
    sound.tap();
  }, []);

  const toggleFlashlight = useCallback(async () => {
    if (settings.flashlightOn) {
      flashlightStreamRef.current?.getTracks().forEach(track => track.stop());
      flashlightStreamRef.current = null;
      setSettings(prev => ({ ...prev, flashlightOn: false }));
      sound.tap();
      return;
    }

    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      const track = stream?.getVideoTracks()[0];
      const capabilities = track?.getCapabilities() as MediaTrackCapabilities & { torch?: boolean };
      if (!track || !capabilities.torch) {
        stream?.getTracks().forEach(item => item.stop());
        setSettings(prev => ({ ...prev, flashlightOn: true }));
      } else {
        await track.applyConstraints({ advanced: [{ torch: true } as MediaTrackConstraintSet] });
        flashlightStreamRef.current = stream;
        setSettings(prev => ({ ...prev, flashlightOn: true }));
      }
    } catch {
      setSettings(prev => ({ ...prev, flashlightOn: true }));
    }
    sound.tap();
  }, [settings.flashlightOn]);

  const setTheme = useCallback((newTheme: 'dark' | 'light' | 'system') => {
    updateSettings({ theme: newTheme });
  }, [updateSettings]);

  // Notifications
  const addNotification = useCallback((notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    sound.notificationPing();
    triggerDynamicIsland({
      mode: 'notification',
      title: notif.title,
      subtitle: notif.message
    }, 3500);
  }, [triggerDynamicIsland]);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    sound.tap();
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        deviceMode,
        setDeviceMode,
        toggleDeviceMode,
        isLocked,
        unlockPhone,
        lockPhone,
        triggerFaceId,
        phoneScreen,
        setPhoneScreen,
        activeAppId,
        openApp,
        closeApp,
        recentApps,
        closeRecentApp,
        dynamicIsland,
        triggerDynamicIsland,
        setDynamicIslandExpanded,
        cameraControl,
        updateCameraControl,
        clickCameraControl,
        lightPressCameraControl,
        lockFocusExposure,
        windows,
        openDesktopWindow,
        closeDesktopWindow,
        minimizeDesktopWindow,
        maximizeDesktopWindow,
        focusDesktopWindow,
        updateWindowPosition,
        updateWindowSize,
        activeDesktopWindowId,
        settings,
        updateSettings,
        toggleFlashlight,
        theme: settings.theme,
        setTheme,
        resolvedTheme,
        notifications,
        addNotification,
        markNotificationAsRead,
        clearAllNotifications,
        fullscreenMediaUrl,
        setFullscreenMediaUrl,
        setWallpaper,
        resetWallpaper,
        mediaItems,
        addMediaItem,
        favorites,
        toggleFavorite,
        trashItems,
        moveToTrash,
        restoreFromTrash,
        deletePermanently,
        emptyTrash,
        musicTracks,
        nowPlayingTrack,
        isPlayingMusic,
        playMusicTrack,
        togglePlayMusic,
        nextMusicTrack,
        prevMusicTrack
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const ctx = useContext(DeviceContext);
  if (!ctx) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return ctx;
};
