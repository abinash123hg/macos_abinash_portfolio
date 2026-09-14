/**
 * Flexible Media Asset Resolver
 * Dynamically resolves uploaded images, posters, videos, wallpapers, music and icons
 * across flexible directory structures without rigid path dependencies.
 */

const LOCAL_MEDIA_ALIASES: Record<string, string> = {
  'Gen-AI-Powered-Data-Analytics-Job-Simulation-page-0001.jpg': '/assets/certifications/GenAI Powered Data Analytics Job Simulation_page-0001.jpg',
  'deloitte-page-0001.jpg': '/assets/certifications/deloitte_page-0001.jpg',
  'internship-tutorialspoint-page-0001.jpg': '/assets/certifications/internship_tutorialspoint_page-0001.jpg',
  'breakingbad.jpg': '/assets/favorites/breakingbad.jpg',
  'Dark.jpg': '/assets/favorites/Dark.jpg',
  'Money-Heist.jpg': '/assets/favorites/Money Heist.jpg',
  'The-Boys.jpg': '/assets/favorites/The Boys.jpg',
  'vikings.jpg': '/assets/favorites/vikings.jpg',
  '123760.jpg': '/assets/photos/123760.jpg',
  '1566397.jpg': '/assets/photos/1566397.jpg',
  '250542.jpg': '/assets/photos/250542.jpg',
  '26640376.jpg': '/assets/photos/26640376.jpg',
  '295657.jpg': '/assets/photos/295657.jpg',
  '38598.jpg': '/assets/photos/38598.jpg',
  '4512060.jpg': '/assets/photos/4512060.jpg',
  '4512081.jpg': '/assets/photos/4512081.jpg',
  '7310.jpg': '/assets/photos/7310.jpg',
};

export const resolveMediaUrl = (filename: string, subfolder?: string): string => {
  if (!filename) return '';
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    const remoteName = decodeURIComponent(filename.split('?')[0].split('/').pop() || '');
    if (LOCAL_MEDIA_ALIASES[remoteName]) return LOCAL_MEDIA_ALIASES[remoteName];
    return filename;
  }
  if (filename.startsWith('data:')) {
    return filename;
  }
  if (filename.startsWith('/src/assets/') || filename.startsWith('/assets/')) {
    return filename;
  }

  // Clean filename
  let cleanName = filename.startsWith('/') ? filename.slice(1) : filename;

  if (cleanName.startsWith('src/assets/')) {
    cleanName = cleanName.slice(4); // transforms 'src/assets/...' to 'assets/...'
  } else if (cleanName.startsWith('src/')) {
    cleanName = cleanName.slice(4);
  }

  if (cleanName.startsWith('assets/')) {
    return `/${cleanName}`;
  }

  if (subfolder) {
    const cleanSub = subfolder.replace(/^\/+|\/+$/g, '');
    return `/${cleanSub}/${cleanName}`;
  }

  // Auto-detect subfolder based on extension/name if possible
  if (cleanName.endsWith('.mp3')) {
    return `/assets/music/${cleanName}`;
  }
  if (cleanName.endsWith('.mp4')) {
    return `/assets/video/${cleanName}`;
  }

  return `/${cleanName}`;
};

export const getAssetCandidates = (filename: string): string[] => {
  if (!filename) return [];
  if (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('data:')) {
    return [filename];
  }

  const clean = filename.replace(/^\/+/, '');
  const baseName = clean.split('/').pop() || clean;

  const list = [
    `/${clean}`,
    `/assets/${clean}`,
    `/assets/certifications/${baseName}`,
    `/assets/favorites/${baseName}`,
    `/assets/photos/${baseName}`,
    `/assets/video/${baseName}`,
    `/assets/music/${baseName}`,
    `/favorites/${baseName}`,
    `/photos/${baseName}`,
    `/${baseName}`
  ];

  // Remove duplicates
  return Array.from(new Set(list));
};

export interface VideoMediaInfo {
  id: string;
  title: string;
  filename: string;
  duration: string;
  category: string;
  description: string;
  posterBg: string;
}

export const UPLOADED_VIDEOS: VideoMediaInfo[] = [
  {
    id: 'vid-149947',
    title: 'Cinematic Video 01',
    filename: '149947-797491657_medium.mp4',
    duration: '0:10',
    category: 'Cinematic',
    description: 'High-definition 1080p motion video demonstration.',
    posterBg: 'from-blue-600 to-indigo-900',
  },
  {
    id: 'vid-172475',
    title: 'Cinematic Video 02',
    filename: '172475-847499816_medium.mp4',
    duration: '0:30',
    category: 'Cinematic',
    description: 'Widescreen landscape and creative motion sequence.',
    posterBg: 'from-emerald-600 to-teal-950',
  },
  {
    id: 'vid-178501',
    title: 'Cinematic Video 03',
    filename: '178501-860033423_medium.mp4',
    duration: '0:30',
    category: 'Cinematic',
    description: 'Atmospheric visual reel with ambient sound design.',
    posterBg: 'from-purple-600 to-slate-950',
  },
  {
    id: 'vid-34301',
    title: 'Cinematic Video 04',
    filename: '34301-400974283_medium.mp4',
    duration: '0:13',
    category: 'Cinematic',
    description: 'High-definition dynamic visual and motion showcase.',
    posterBg: 'from-amber-600 to-red-950',
  },
  {
    id: 'vid-48569',
    title: 'Cinematic Video 05',
    filename: '48569-454825064_medium.mp4',
    duration: '0:10',
    category: 'Cinematic',
    description: 'Ultra-high resolution 1440p creative visual showcase.',
    posterBg: 'from-cyan-600 to-blue-950',
  },
];
