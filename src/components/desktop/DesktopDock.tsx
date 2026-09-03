import React, { useState } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { portfolioData } from '../../data/portfolioData';
import { sound } from '../../utils/audioHaptics';

// --- AUTHENTIC MACOS & BRAND ICONS ---

const FinderIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="finderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#80d0ff" />
        <stop offset="40%" stopColor="#30a0fe" />
        <stop offset="100%" stopColor="#0060df" />
      </linearGradient>
      <linearGradient id="finderRight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4db2ff" />
        <stop offset="100%" stopColor="#0050c8" />
      </linearGradient>
    </defs>
    {/* Base Squircle */}
    <rect width="100" height="100" rx="22" fill="url(#finderGrad)" />
    
    {/* Right Face Shade */}
    <path d="M50 0 H78 C90.15 0 100 9.85 100 22 V78 C100 90.15 90.15 100 78 100 H50 C50 100 58 75 58 50 C58 25 50 0 50 0 Z" fill="url(#finderRight)" opacity="0.9" />

    {/* Center Dividing Curve Line */}
    <path d="M50 8 C50 8 58 30 58 50 C58 70 50 92 50 92" stroke="#1c355e" strokeWidth="4.5" strokeLinecap="round" />

    {/* Eyes */}
    <ellipse cx="32" cy="38" rx="4.5" ry="6" fill="#1c355e" />
    <ellipse cx="68" cy="38" rx="4.5" ry="6" fill="#1c355e" />

    {/* Smile Curve */}
    <path d="M28 64 C38 78 62 78 72 64" stroke="#1c355e" strokeWidth="5" strokeLinecap="round" fill="none" />
    {/* Smile ends */}
    <circle cx="28" cy="64" r="2.5" fill="#1c355e" />
    <circle cx="72" cy="64" r="2.5" fill="#1c355e" />
  </svg>
);

const SafariIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="safariBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
      <linearGradient id="compassBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#25a8fe" />
        <stop offset="50%" stopColor="#007aff" />
        <stop offset="100%" stopColor="#0055d4" />
      </linearGradient>
      <linearGradient id="needleRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff453a" />
        <stop offset="100%" stopColor="#d70015" />
      </linearGradient>
      <linearGradient id="needleWhite" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#d1d5db" />
      </linearGradient>
    </defs>
    {/* Outer Squircle */}
    <rect width="100" height="100" rx="22" fill="url(#safariBg)" />
    
    {/* Compass Dial Circle */}
    <circle cx="50" cy="50" r="41" fill="url(#compassBg)" stroke="#ffffff" strokeWidth="2" />

    {/* Dial Ticks (Compass Markings) */}
    {[...Array(36)].map((_, i) => (
      <line
        key={i}
        x1="50"
        y1="13"
        x2="50"
        y2={i % 3 === 0 ? "17" : "15"}
        stroke="#ffffff"
        strokeWidth={i % 3 === 0 ? "1.6" : "0.9"}
        strokeOpacity={i % 3 === 0 ? "0.95" : "0.6"}
        transform={`rotate(${i * 10} 50 50)`}
      />
    ))}

    {/* Needle (Angled at 45 deg) */}
    <g transform="rotate(45 50 50)">
      {/* Top Half Red Needle */}
      <polygon points="50,15 56,50 44,50" fill="url(#needleRed)" />
      {/* Bottom Half White Needle */}
      <polygon points="50,85 56,50 44,50" fill="url(#needleWhite)" />
      {/* Needle Shadow / Highlights */}
      <polygon points="50,15 56,50 50,50" fill="#ff6961" opacity="0.6" />
      <polygon points="50,85 56,50 50,50" fill="#b0b5be" opacity="0.6" />
      {/* Center Pivot Brass Pin */}
      <circle cx="50" cy="50" r="4.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <circle cx="50" cy="50" r="2" fill="#ef4444" />
    </g>
  </svg>
);

const NotesIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="notesYellow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffd84d" />
        <stop offset="100%" stopColor="#f5b300" />
      </linearGradient>
      <linearGradient id="notesBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f8fafc" />
      </linearGradient>
    </defs>
    {/* Squircle Body */}
    <rect width="100" height="100" rx="22" fill="url(#notesBody)" />
    
    {/* Yellow Top Banner */}
    <path d="M0 22 C0 9.85 9.85 0 22 0 H78 C90.15 0 100 9.85 100 22 V30 H0 V22 Z" fill="url(#notesYellow)" />
    
    {/* Orange Stitching Line */}
    <line x1="0" y1="30" x2="100" y2="30" stroke="#d97706" strokeWidth="1.5" />
    
    {/* Ruled Lines */}
    <line x1="16" y1="44" x2="84" y2="44" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="16" y1="58" x2="84" y2="58" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="16" y1="72" x2="84" y2="72" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="16" y1="86" x2="60" y2="86" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Yellow Header Perforation / Accent */}
    <circle cx="16" cy="15" r="2.5" fill="#ca8a04" opacity="0.8" />
    <circle cx="84" cy="15" r="2.5" fill="#ca8a04" opacity="0.8" />
  </svg>
);

const PhotosIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="22" fill="#ffffff" />
    <g transform="translate(50, 50)" style={{ mixBlendMode: 'multiply' }}>
      {/* 8 Multicolor Petals */}
      {/* Cyan */}
      <ellipse cx="0" cy="-22" rx="10" ry="17" fill="#00c7be" opacity="0.85" />
      {/* Blue */}
      <ellipse cx="0" cy="-22" rx="10" ry="17" fill="#007aff" opacity="0.85" transform="rotate(45)" />
      {/* Purple */}
      <ellipse cx="0" cy="-22" rx="10" ry="17" fill="#af52de" opacity="0.85" transform="rotate(90)" />
      {/* Pink / Red */}
      <ellipse cx="0" cy="-22" rx="10" ry="17" fill="#ff2d55" opacity="0.85" transform="rotate(135)" />
      {/* Red / Orange */}
      <ellipse cx="0" cy="-22" rx="10" ry="17" fill="#ff3b30" opacity="0.85" transform="rotate(180)" />
      {/* Orange */}
      <ellipse cx="0" cy="-22" rx="10" ry="17" fill="#ff9500" opacity="0.85" transform="rotate(225)" />
      {/* Yellow */}
      <ellipse cx="0" cy="-22" rx="10" ry="17" fill="#ffcc00" opacity="0.85" transform="rotate(270)" />
      {/* Green */}
      <ellipse cx="0" cy="-22" rx="10" ry="17" fill="#34c759" opacity="0.85" transform="rotate(315)" />
    </g>
  </svg>
);

const VSCodeIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="22" fill="#1e1e1e" />
    <g transform="translate(14, 14) scale(0.72)">
      {/* Official VS Code Geometric Poly Ribbons */}
      <path d="M72.2 4.4L51.8 23.3L32.2 8.3C30.3 6.9 27.6 7.2 26.1 9.1L4.6 37.1C3.3 38.7 3.3 41.1 4.6 42.7L26.1 70.7C27.6 72.6 30.3 72.9 32.2 71.5L51.8 56.5L72.2 75.4C74.6 77.6 78.4 76.8 79.8 73.8L95.2 43.1C96.1 41.3 96.1 39.1 95.2 37.3L79.8 6.6C78.4 3.6 74.6 2.8 72.2 4.4Z" fill="#0066B8" opacity="0.4" />
      <path d="M79.8 6.6C78.4 3.6 74.6 2.8 72.2 4.4L26.1 41L4.6 24.3C3.3 23.3 1.4 24.2 1.4 25.8V74C1.4 75.6 3.3 76.5 4.6 75.5L26.1 58.8L72.2 95.4C74.6 97 78.4 96.2 79.8 93.2L95.2 62.5C96.1 60.7 96.1 58.5 95.2 56.7L79.8 6.6Z" fill="#007ACC" />
      <path d="M72.2 4.4C74.6 2.8 78.4 3.6 79.8 6.6L95.2 37.3C96.1 39.1 96.1 41.3 95.2 43.1L79.8 73.8C78.4 76.8 74.6 77.6 72.2 75.4L51.8 56.5V23.3L72.2 4.4Z" fill="#1F8AD2" />
      <path d="M26.1 70.7L4.6 42.7C3.3 41.1 3.3 38.7 4.6 37.1L26.1 9.1C27.6 7.2 30.3 6.9 32.2 8.3L51.8 23.3V56.5L32.2 71.5C30.3 72.9 27.6 72.6 26.1 70.7Z" fill="#0066B8" />
      <path d="M79.8 6.6L51.8 32.2L32.2 8.3L72.2 4.4C74.6 2.8 78.4 3.6 79.8 6.6Z" fill="#0098FF" />
    </g>
  </svg>
);

const TerminalIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="termGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2c2d30" />
        <stop offset="100%" stopColor="#151618" />
      </linearGradient>
    </defs>
    {/* Dark Acrylic Squircle */}
    <rect width="100" height="100" rx="22" fill="url(#termGrad)" stroke="#475569" strokeWidth="1.5" />
    
    {/* Terminal Header Bar */}
    <path d="M0 22 C0 9.85 9.85 0 22 0 H78 C90.15 0 100 9.85 100 22 V24 H0 V22 Z" fill="#383a40" />
    
    {/* Mini Traffic Lights */}
    <circle cx="16" cy="12" r="3" fill="#ff5f56" />
    <circle cx="26" cy="12" r="3" fill="#ffbd2e" />
    <circle cx="36" cy="12" r="3" fill="#27c93f" />

    {/* Prompt Chevron `>` */}
    <path d="M22 45 L38 56 L22 67" stroke="#34d399" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Cursor Rectangle `_` */}
    <rect x="46" y="62" width="22" height="6" rx="2" fill="#f8fafc" />
  </svg>
);

const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gitBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#24292e" />
        <stop offset="100%" stopColor="#0f1419" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#gitBg)" stroke="#374151" strokeWidth="1" />
    {/* Official GitHub Octocat Silhouette */}
    <path fillRule="evenodd" clipRule="evenodd" d="M50 18C32.32 18 18 32.33 18 50.02C18 64.18 27.18 76.19 39.9 80.44C41.5 80.73 42.08 79.74 42.08 78.89C42.08 78.13 42.06 75.64 42.04 72.96C33.15 74.89 31.27 69.11 31.27 69.11C29.82 65.42 27.72 64.44 27.72 64.44C24.81 62.46 27.93 62.5 27.93 62.5C31.14 62.73 32.83 65.81 32.83 65.81C35.68 70.7 40.3 69.29 42.12 68.47C42.41 66.4 43.24 64.99 44.15 64.19C37.06 63.38 29.6 60.64 29.6 48.4C29.6 44.91 30.85 42.06 32.89 39.83C32.56 39.02 31.47 35.77 33.2 31.37C33.2 31.37 35.88 30.51 41.98 34.64C44.53 33.93 47.24 33.58 49.95 33.56C52.66 33.58 55.37 33.93 57.92 34.64C64.02 30.51 66.7 31.37 66.7 31.37C68.43 35.77 67.34 39.02 67.01 39.83C69.07 42.06 70.3 44.91 70.3 48.4C70.3 60.67 62.82 63.37 55.7 64.16C56.84 65.14 57.86 67.08 57.86 70.05C57.86 74.31 57.82 77.75 57.82 78.89C57.82 79.75 58.4 80.76 60.03 80.43C72.78 76.17 81.96 64.16 81.96 50.02C81.96 32.33 67.66 18 50 18Z" fill="#ffffff" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="22" fill="#0a66c2" />
    {/* Official LinkedIn 'in' Typography */}
    <g fill="#ffffff">
      {/* 'i' dot */}
      <circle cx="34" cy="33" r="5.5" />
      {/* 'i' bar */}
      <rect x="28.5" y="43" width="11" height="33" rx="2" />
      {/* 'n' letter */}
      <path d="M47 43 H57 V48 C58.8 44.8 63 42 70 42 C81 42 85 49 85 61 V76 H74 V63 C74 56 71 52 65 52 C59 52 57 56 57 62 V76 H47 V43 Z" />
    </g>
  </svg>
);

const ProfileAvatarIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <div className={`relative rounded-[20px] overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-500 shadow-md ${className}`}>
    <img
      src="https://media.licdn.com/dms/image/v2/D4D03AQHu8iauv0OdlA/profile-displayphoto-scale_400_400/B4DZ_ILs1ZIoAk-/0/1785769943899?e=1789603200&v=beta&t=OOZYTjy226VAOPwWen2qM1sN7U2FZai2zeoktl60x-g"
      alt="Abinash Portfolio"
      className="w-full h-full object-cover rounded-[18px]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white ring-1 ring-black/20" />
  </div>
);

const SystemSettingsIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="settingsBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9ca3af" />
        <stop offset="50%" stopColor="#6b7280" />
        <stop offset="100%" stopColor="#374151" />
      </linearGradient>
      <linearGradient id="gearSilver" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f3f4f6" />
        <stop offset="100%" stopColor="#9ca3af" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#settingsBg)" stroke="#4b5563" strokeWidth="1" />
    
    {/* Authentic macOS Big Sur Metallic Gear */}
    <g transform="translate(50, 50)">
      {/* 8 Outer Cogs */}
      {[...Array(8)].map((_, i) => (
        <rect
          key={i}
          x="-5.5"
          y="-36"
          width="11"
          height="14"
          rx="2.5"
          fill="url(#gearSilver)"
          transform={`rotate(${i * 45})`}
        />
      ))}
      {/* Outer Gear Ring */}
      <circle cx="0" cy="0" r="28" fill="url(#gearSilver)" />
      {/* Inner Recessed Hole */}
      <circle cx="0" cy="0" r="14" fill="#374151" stroke="#1f2937" strokeWidth="2" />
      {/* Center Core Pin */}
      <circle cx="0" cy="0" r="5" fill="#e5e7eb" />
    </g>
  </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="trashBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.95" />
      </linearGradient>
      <linearGradient id="trashMesh" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
    </defs>
    {/* Frosted Acrylic Wire-Mesh Bin */}
    <ellipse cx="50" cy="24" rx="28" ry="7" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
    
    {/* Body tapered basket */}
    <path d="M22 24 L30 84 C30 88 38 92 50 92 C62 92 70 88 70 84 L78 24" fill="url(#trashBody)" stroke="#94a3b8" strokeWidth="2" />
    
    {/* Vertical Mesh Ribs */}
    <line x1="33" y1="26" x2="38" y2="86" stroke="#64748b" strokeWidth="1.5" strokeOpacity="0.7" />
    <line x1="44" y1="28" x2="46" y2="90" stroke="#64748b" strokeWidth="1.5" strokeOpacity="0.7" />
    <line x1="56" y1="28" x2="54" y2="90" stroke="#64748b" strokeWidth="1.5" strokeOpacity="0.7" />
    <line x1="67" y1="26" x2="62" y2="86" stroke="#64748b" strokeWidth="1.5" strokeOpacity="0.7" />

    {/* Crumpled paper inside bin */}
    <path d="M36 34 Q45 22 54 30 Q63 24 64 34 Z" fill="#ffffff" opacity="0.95" />
    <path d="M42 28 Q50 20 58 26 Z" fill="#f8fafc" opacity="0.9" />
  </svg>
);

const QuickTimeIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="qtBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="qtSheen" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#qtBg)" />
    <rect width="100" height="50" rx="22" fill="url(#qtSheen)" />
    
    {/* Outer Q Ring */}
    <circle cx="50" cy="46" r="28" stroke="#ffffff" strokeWidth="8.5" fill="none" />
    {/* Inner Play / Lens Core */}
    <polygon points="46,38 46,54 59,46" fill="#ffffff" />
    {/* Q Tail Flourish */}
    <path d="M60 56 L74 76 C76 78 74 81 70 80 L52 68" fill="#ffffff" />
  </svg>
);

const MusicDockIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="appleMusicBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FA233B" />
        <stop offset="50%" stopColor="#FB5C74" />
        <stop offset="100%" stopColor="#FA233B" />
      </linearGradient>
      <linearGradient id="musicSheen" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#appleMusicBg)" />
    <rect width="100" height="50" rx="22" fill="url(#musicSheen)" />
    
    {/* Apple Music Double Eighth Note Glyph */}
    <g fill="#ffffff">
      {/* Left Note Head */}
      <ellipse cx="37" cy="67" rx="8" ry="6" transform="rotate(-20 37 67)" />
      {/* Right Note Head */}
      <ellipse cx="65" cy="59" rx="8" ry="6" transform="rotate(-20 65 59)" />
      {/* Left Stem */}
      <rect x="42" y="32" width="4.5" height="34" rx="2" />
      {/* Right Stem */}
      <rect x="70" y="24" width="4.5" height="34" rx="2" />
      {/* Cross Beam */}
      <polygon points="42,32 74.5,24 74.5,32 42,40" />
    </g>
  </svg>
);

const CertificatesDockIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="certBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="certRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#certBg)" />
    
    {/* Hanging Seal Ribbons */}
    <polygon points="42,54 36,82 46,76 48,82 50,54" fill="url(#certRibbon)" opacity="0.9" />
    <polygon points="50,54 52,82 54,76 64,82 58,54" fill="url(#certRibbon)" opacity="0.9" />
    
    {/* Outer Seal Ring */}
    <circle cx="50" cy="46" r="23" fill="#ffffff" stroke="#fef3c7" strokeWidth="2.5" />
    <circle cx="50" cy="46" r="19" fill="#f59e0b" />
    
    {/* Star in center */}
    <polygon points="50,34 53,42 61,43 55,48 57,56 50,51 43,56 45,48 39,43 47,42" fill="#ffffff" />
  </svg>
);

// --- DOCK APP CONFIGURATION IN EXACT SPECIFIED ORDER ---

interface DockItemConfig {
  id: string;
  name: string;
  renderIcon: React.FC<{ className?: string }>;
  isExternal?: boolean;
  externalUrl?: string;
  hasSeparatorBefore?: boolean;
  isTrash?: boolean;
}

const DOCK_ITEMS: DockItemConfig[] = [
  { 
    id: 'finder', 
    name: 'Finder', 
    renderIcon: FinderIcon 
  },
  { 
    id: 'safari', 
    name: 'Safari', 
    renderIcon: SafariIcon 
  },
  { 
    id: 'notes', 
    name: 'Notes', 
    renderIcon: NotesIcon 
  },
  { 
    id: 'photos', 
    name: 'Photos', 
    renderIcon: PhotosIcon 
  },
  { 
    id: 'videoplayer', 
    name: 'QuickTime Player', 
    renderIcon: QuickTimeIcon 
  },
  { 
    id: 'music', 
    name: 'Apple Music', 
    renderIcon: MusicDockIcon 
  },
  { 
    id: 'terminal', 
    name: 'Terminal', 
    renderIcon: TerminalIcon 
  },
  { 
    id: 'settings', 
    name: 'System Settings', 
    renderIcon: SystemSettingsIcon,
    hasSeparatorBefore: true
  },
  { 
    id: 'trash', 
    name: 'Trash', 
    renderIcon: TrashIcon,
    hasSeparatorBefore: true,
    isTrash: true 
  }
];

export const DesktopDock: React.FC = () => {
  const { windows, openDesktopWindow, focusDesktopWindow, trashItems } = useDevice();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleAppClick = (item: DockItemConfig) => {
    sound.tap();
    
    if (item.isExternal && item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    const win = windows[item.id];
    if (win && win.isOpen) {
      focusDesktopWindow(item.id);
    } else {
      openDesktopWindow(item.id);
    }
  };

  return (
    <div className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-40 select-none">
      <div 
        onMouseLeave={() => setHoveredIdx(null)}
        className="relative px-4 py-2.5 rounded-[24px] bg-white/15 dark:bg-black/25 backdrop-blur-[28px] saturate-150 border border-white/30 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.25)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] flex items-end gap-3 transition-all"
      >
        {/* Soft reflection line on Dock surface */}
        <div className="absolute inset-x-4 top-[1px] h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none" />

        {DOCK_ITEMS.map((app, idx) => {
          const win = windows[app.id];
          const isOpen = win && win.isOpen;
          const isHovered = hoveredIdx === idx;
          const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

          let scaleClass = 'scale-100';
          if (isHovered) scaleClass = 'scale-125 -translate-y-2';
          else if (isNeighbor) scaleClass = 'scale-110 -translate-y-1';

          const IconComponent = app.renderIcon;

          return (
            <React.Fragment key={app.id}>
              {/* Native macOS vertical separator */}
              {app.hasSeparatorBefore && (
                <div className="w-[1px] h-9 bg-white/40 dark:bg-white/20 my-auto mx-0.5 pointer-events-none shrink-0" />
              )}

              <div
                className="relative flex flex-col items-center group"
                onMouseEnter={() => setHoveredIdx(idx)}
              >
                {/* Tooltip Label */}
                <div className="absolute -top-9 px-2.5 py-1 rounded-lg bg-neutral-900/95 text-white text-[11px] font-semibold border border-neutral-700/80 shadow-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50">
                  {app.name} {app.isTrash && trashItems.length > 0 ? `(${trashItems.length})` : ''}
                </div>

                {/* App Icon Button */}
                <button
                  onClick={() => handleAppClick(app)}
                  className={`w-11 h-11 p-0.5 flex items-center justify-center transition-all duration-150 cursor-pointer ${scaleClass}`}
                  title={app.name}
                >
                  <div className="w-full h-full relative drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] flex items-center justify-center">
                    <IconComponent className="w-full h-full" />
                    {app.isTrash && trashItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold flex items-center justify-center text-white border border-black/40 shadow-sm">
                        {trashItems.length}
                      </span>
                    )}
                  </div>
                </button>

                {/* Active Dot Indicator */}
                <div
                  className={`w-1.5 h-1.5 rounded-full mt-1 transition-all ${
                    isOpen ? 'bg-neutral-900 dark:bg-white shadow-xs' : 'bg-transparent'
                  }`}
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

