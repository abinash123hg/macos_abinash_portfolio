export type DeviceMode = 'desktop' | 'mobile';

export interface CaseStudyArchitectureSection {
  label: string;
  detail: string;
}

export interface CaseStudyChallenge {
  challenge: string;
  solution: string;
  tradeoff: string;
}

export interface CaseStudyImpactMetric {
  metric: string;
  label: string;
  businessOutcome: string;
}

export interface CaseStudyEval {
  name: string;
  score: string;
  methodology: string;
}

export interface CaseStudyDetails {
  summary: string;
  contextProblem: string;
  role: string;
  architecturePoints: CaseStudyArchitectureSection[];
  ragDecisions?: {
    ingestionChunking: string;
    embeddingVectorDb: string;
    retrievalStrategy: string;
    promptStreamingStrategy: string;
  };
  challengesTradeoffs: CaseStudyChallenge[];
  resultsImpact: CaseStudyImpactMetric[];
  evalFramework: CaseStudyEval[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'LLM & RAG Systems' | 'AI Assistants & Agents' | 'ML Ranking & Search' | 'AI / Machine Learning';
  subtitle: string;
  description: string;
  longDescription: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  featured?: boolean;
  color: string;
  iconName: string;
  caseStudy?: CaseStudyDetails;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  badge: string;
  category: 'Cloud & AI' | 'Data Analytics' | 'Industry Training';
  description: string;
  skills: string[];
  imageSrc?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  score: string;
  scoreLabel: string;
  period: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  offerId?: string;
  responsibilities: string[];
  skills: string[];
}

export interface SkillCategory {
  name: string;
  color: string;
  icon: string;
  skills: { name: string; level: number; tag?: string }[];
}

export interface MediaItem {
  id: string;
  title: string;
  category: 'Movies & Series' | 'Certificates' | 'Visuals' | 'Videos' | 'Photography';
  type: 'image' | 'video';
  thumbnail: string;
  mediaUrl: string;
  url?: string;
  description: string;
  favorite?: boolean;
  year?: string;
  duration?: string;
}

export interface CalendarTimelineItem {
  id: string;
  category: 'Education' | 'Internship' | 'Certification' | 'Project' | 'Milestone' | 'Achievement';
  title: string;
  date: string;
  time?: string;
  location?: string;
  description: string;
  color: string;
}

export interface DomainFocusItem {
  id: string;
  title: string;
  badge: string;
  color: string;
  description: string;
  skills: string[];
}

export interface RecruiterBriefData {
  targetRole: string;
  location: string;
  status: string;
  valueProposition: string;
  impactMetrics: { label: string; value: string; detail: string }[];
  domainFocus: DomainFocusItem[];
  whatIBring: string[];
  ownership3060Days: string[];
  targetOpportunities: string[];
  pitchText: string;
}

export interface FavoriteShow {
  id: string;
  title: string;
  years: string;
  year?: string;
  creator: string;
  director?: string;
  badge: string;
  imdbRating: string;
  rtRating: string;
  description: string;
  dialogue: string;
  viralDialogue?: string;
  viralDialogue1?: string;
  viralDialogue2?: string;
  quoteSpeaker: string;
  dialogueCharacter?: string;
  posterFileName: string;
  poster?: string;
  backdrop?: string;
  themeColor: string;
  accentGradient: string;
}

export interface VideoAsset {
  id: string;
  title: string;
  fileName: string;
  duration: string;
  category: string;
  description: string;
  aspectRatio: '16:9' | '9:16' | '4:3';
  accentColor: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  headline: string;
  targetRole: string;
  availabilityStatus: string;
  aiDisclosure: string;
  bio: string;
  aboutEditorial: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  cgpa: string;
  college: string;
  skills: SkillCategory[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  media: MediaItem[];
  favoriteShows: FavoriteShow[];
  videos: VideoAsset[];
  quickStats: { label: string; value: string; subtext: string }[];
  calendarTimeline: CalendarTimelineItem[];
  recruiterSummary: RecruiterBriefData;
}

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export type DynamicIslandMode = 
  | 'idle' 
  | 'music' 
  | 'camera' 
  | 'ai' 
  | 'charging' 
  | 'notification' 
  | 'call' 
  | 'airdrop' 
  | 'timer'
  | 'system';

export interface DynamicIslandState {
  mode: DynamicIslandMode;
  expanded: boolean;
  title?: string;
  subtitle?: string;
  icon?: string;
  durationMs?: number;
}

export interface CameraControlState {
  isOpen: boolean;
  activeControl: 'zoom' | 'exposure' | 'depth' | 'cameras' | 'styles' | 'tone';
  menuOpen: boolean;
  zoom: number; // 0.5, 1.0, 2.0, 5.0
  exposure: number; // -2 to +2
  depth: number; // 1.4 to 16
  cameraLens: 'main' | 'ultra-wide' | 'telephoto' | 'front';
  style: 'Standard' | 'Rich Contrast' | 'Vibrant' | 'Warm' | 'Cool' | 'Dramatic';
  tone: number; // -100 to +100
  isAeAfLocked: boolean;
  visualIntelligenceOpen: boolean;
  mode: 'photo' | 'video' | 'portrait' | 'pano' | 'cinematic';
  isRecording: boolean;
}

export interface NotificationItem {
  id: string;
  appId: string;
  appName: string;
  appIcon: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface WallpaperSettings {
  macDesktop: string | null;
  macLock: string | null;
  iosHome: string | null;
  iosLock: string | null;
}

export interface TrashItem {
  id: string;
  originalId: string;
  name: string;
  title: string;
  category: string;
  type: 'photo' | 'video' | 'file' | 'script' | 'note';
  deletedAt: string;
  size: string;
  thumbnail?: string;
  mediaUrl?: string;
  itemData?: any;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl?: string;
  audioUrl?: string;
  genre: string;
  accentColor: string;
}

export interface SystemSettings {
  theme: 'dark' | 'light' | 'system';
  wallpaperIndex: number;
  wallpapers: WallpaperSettings;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  wifiEnabled: boolean;
  bluetoothEnabled: boolean;
  airplaneMode: boolean;
  flashlightOn: boolean;
  focusMode: boolean;
  brightness: number;
  volume: number;
  batteryLevel: number;
  isCharging: boolean;
  iCloudSync: boolean;
  cameraControlClickCount: 'single' | 'double';
  lockFocusExposureSetting: boolean;
  use24HourClock?: boolean;
  lowPowerMode?: boolean;
}
