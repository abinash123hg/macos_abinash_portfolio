/**
 * Flexible Media Asset Resolver
 * Dynamically resolves uploaded images, posters, videos, wallpapers, music and icons
 * across flexible directory structures without rigid path dependencies.
 */

export const resolveMediaUrl = (filename: string, subfolder?: string): string => {
  if (!filename) return '';
  if (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('data:')) {
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
    `/videos/${baseName}`,
    `/public/assets/${clean}`,
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
