import React from 'react';
import { useDevice } from '../../../context/DeviceContext';
import { resolveMediaUrl } from '../../../utils/mediaResolver';

interface DesktopBackgroundProps {
  children?: React.ReactNode;
}

export const DesktopBackground: React.FC<DesktopBackgroundProps> = ({ children }) => {
  const { resolvedTheme, settings } = useDevice();
  const isDark = resolvedTheme === 'dark';
  const customWallpaper = settings.wallpapers?.macDesktop;
  const wallpaperStyles = [
    'radial-gradient(ellipse at 75% 10%, #67c7f2 0%, #275a9d 26%, transparent 53%), linear-gradient(145deg, #07163b 0%, #182b68 48%, #020617 100%)',
    'radial-gradient(ellipse at 62% 28%, #7bd68d 0%, #217d72 26%, transparent 55%), linear-gradient(145deg, #063b32 0%, #124f72 52%, #06152c 100%)',
    'radial-gradient(ellipse at 78% 12%, #f4a261 0%, #466bc0 30%, transparent 58%), linear-gradient(145deg, #1a254d 0%, #172d72 48%, #080b22 100%)',
    'radial-gradient(ellipse at 30% 24%, #62d8e9 0%, #2355a0 32%, transparent 62%), linear-gradient(145deg, #071b49 0%, #3b176e 58%, #08071b 100%)',
    'radial-gradient(ellipse at 80% 18%, #59a9f5 0%, #254a9b 30%, transparent 60%), linear-gradient(145deg, #06183b 0%, #113d7d 50%, #020617 100%)',
    'radial-gradient(ellipse at 28% 12%, #f5bb65 0%, #3a83ad 30%, transparent 58%), linear-gradient(145deg, #5b2c2c 0%, #0b5384 58%, #06162f 100%)',
    'radial-gradient(ellipse at 68% 20%, #e5a15a 0%, #8b4936 26%, transparent 55%), linear-gradient(145deg, #47251e 0%, #162b50 58%, #080b18 100%)',
    'radial-gradient(ellipse at 25% 18%, #74e0ed 0%, #2263a8 30%, transparent 60%), linear-gradient(145deg, #062644 0%, #123d7e 52%, #020a1f 100%)',
    'radial-gradient(ellipse at 72% 10%, #a7c5d4 0%, #41698b 28%, transparent 55%), linear-gradient(145deg, #1b3048 0%, #193b67 54%, #07101e 100%)',
    'radial-gradient(ellipse at 52% 12%, #6bc8f4 0%, #3566ad 28%, transparent 58%), linear-gradient(145deg, #082446 0%, #1e4e80 48%, #060c1c 100%)',
    'radial-gradient(circle at 70% 15%, #b06df2 0%, #3e47bf 28%, transparent 60%), linear-gradient(135deg, #111450 0%, #b24b7c 55%, #f08a52 100%)',
    'linear-gradient(145deg, #0c7b63 0%, #2f9fc0 46%, #0c2e68 100%)',
    '#263042',
    'linear-gradient(135deg, #22d3ee 0%, #2563eb 48%, #7c3aed 100%)'
  ];
  const fallbackWallpaper = wallpaperStyles[settings.wallpaperIndex] || wallpaperStyles[isDark ? 0 : 2];

  return (
    <div className={`fixed inset-0 w-screen h-screen overflow-hidden select-none transition-colors duration-500 ${isDark ? 'bg-[#030712]' : 'bg-[#034488]'}`}>
      {/* Custom Wallpaper if set */}
      {customWallpaper ? (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 animate-in fade-in"
          style={{ backgroundImage: `url(${resolveMediaUrl(customWallpaper)})` }}
        >
          {/* Subtle contrast overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full mac-sequoia-wallpaper" style={{ background: fallbackWallpaper }} aria-hidden="true" />
      )}

      {/* Children Layer */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
