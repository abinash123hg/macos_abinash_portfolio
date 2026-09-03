import React from 'react';

// Common squircle clip & filter definitions for authentic macOS icons
export const SquircleDefs: React.FC = () => (
  <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
    <defs>
      {/* Mathematical macOS Squircle Path: Continuous corner curvature (G2) */}
      <clipPath id="mac-squircle-clip" clipPathUnits="objectBoundingBox">
        <path d="M 0,0.22 C 0,0.06 0.06,0 0.22,0 L 0.78,0 C 0.94,0 1,0.06 1,0.22 L 1,0.78 C 1,0.94 0.94,1 0.78,1 L 0.22,1 C 0.06,1 0,0.94 0,0.78 Z" />
      </clipPath>
    </defs>
  </svg>
);

// 1. Macintosh HD: Hyper-realistic 3D silver classic internal hard drive / aluminum chassis
export const MacintoshHDIcon: React.FC = () => (
  <div className="w-12 h-12 relative flex items-center justify-center filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.35)]">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="mhd-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ECEFF1" />
          <stop offset="35%" stopColor="#CFD8DC" />
          <stop offset="85%" stopColor="#90A4AE" />
          <stop offset="100%" stopColor="#78909C" />
        </linearGradient>
        <linearGradient id="mhd-bevel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#B0BEC5" />
          <stop offset="100%" stopColor="#546E7A" />
        </linearGradient>
        <radialGradient id="mhd-platter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#CFD8DC" />
          <stop offset="45%" stopColor="#ECEFF1" />
          <stop offset="70%" stopColor="#90A4AE" />
          <stop offset="90%" stopColor="#B0BEC5" />
          <stop offset="100%" stopColor="#78909C" />
        </radialGradient>
        <linearGradient id="mhd-arm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECEFF1" />
          <stop offset="50%" stopColor="#B0BEC5" />
          <stop offset="100%" stopColor="#607D8B" />
        </linearGradient>
      </defs>

      {/* Heavy Aluminum Hard Drive Chassis */}
      <rect x="8" y="10" width="84" height="80" rx="14" fill="url(#mhd-bevel)" />
      <rect x="10" y="12" width="80" height="76" rx="12" fill="url(#mhd-body)" />

      {/* Recessed Interior Drive Cavity */}
      <rect x="15" y="17" width="70" height="66" rx="8" fill="#263238" />
      <rect x="16" y="18" width="68" height="64" rx="7" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />

      {/* Circular Magnetic Platter with Metallic Concentric Sheen */}
      <circle cx="50" cy="50" r="28" fill="url(#mhd-platter)" stroke="#475569" strokeWidth="1" />
      {/* Platter Center Spindle Hub */}
      <circle cx="50" cy="50" r="9" fill="#94A3B8" stroke="#334155" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="4" fill="#E2E8F0" />
      <circle cx="50" cy="50" r="1.5" fill="#0F172A" />

      {/* Metallic Read/Write Actuator Arm */}
      <circle cx="70" cy="27" r="5" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
      <circle cx="70" cy="27" r="2" fill="#F8FAFC" />
      <polygon points="68,29 38,47 37,51 41,50 69,32" fill="url(#mhd-arm)" stroke="#334155" strokeWidth="0.8" />
      {/* Actuator Head Tip */}
      <rect x="34" y="48" width="4" height="2.5" rx="0.5" fill="#F59E0B" />

      {/* Corner Fastener Screws */}
      <circle cx="14" cy="16" r="2" fill="#94A3B8" stroke="#475569" strokeWidth="0.8" />
      <line x1="13" y1="16" x2="15" y2="16" stroke="#1E293B" strokeWidth="0.8" />
      <circle cx="86" cy="16" r="2" fill="#94A3B8" stroke="#475569" strokeWidth="0.8" />
      <line x1="85" y1="16" x2="87" y2="16" stroke="#1E293B" strokeWidth="0.8" />
      <circle cx="14" cy="84" r="2" fill="#94A3B8" stroke="#475569" strokeWidth="0.8" />
      <line x1="13" y1="84" x2="15" y2="84" stroke="#1E293B" strokeWidth="0.8" />
      <circle cx="86" cy="84" r="2" fill="#94A3B8" stroke="#475569" strokeWidth="0.8" />
      <line x1="85" y1="84" x2="87" y2="84" stroke="#1E293B" strokeWidth="0.8" />

      {/* Activity LED & Top Metallic Trim */}
      <circle cx="20" cy="23" r="1.5" fill="#22C55E" />
    </svg>
  </div>
);

// 2. Projects & Models: Official macOS blue physical textured file folder with papers peeking out
export const ProjectsFolderIcon: React.FC = () => (
  <div className="w-12 h-12 relative flex items-center justify-center filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.35)]">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="folder-back" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E88E5" />
          <stop offset="100%" stopColor="#0D47A1" />
        </linearGradient>
        <linearGradient id="folder-front" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#42A5F5" />
          <stop offset="35%" stopColor="#1E88E5" />
          <stop offset="100%" stopColor="#1565C0" />
        </linearGradient>
        <linearGradient id="paper-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>
      </defs>

      {/* Back Folder Tab & Body */}
      <path
        d="M10 24 C10 19 14 16 19 16 L40 16 C45 16 48 20 52 23 L56 26 L81 26 C86 26 90 29 90 34 L90 76 C90 82 86 86 80 86 L10 86 Z"
        fill="url(#folder-back)"
      />

      {/* White Paper Sheets Peeking Out */}
      {/* Background paper */}
      <rect x="22" y="18" width="56" height="40" rx="3" fill="#E2E8F0" transform="rotate(-3 22 18)" />
      {/* Foreground primary paper with code/spec lines */}
      <g transform="rotate(2 26 16)">
        <rect x="26" y="16" width="52" height="42" rx="3" fill="url(#paper-grad)" stroke="#CBD5E1" strokeWidth="0.8" />
        {/* Top fold corner */}
        <path d="M70 16 L78 24 L70 24 Z" fill="#CBD5E1" />
        {/* Code / Diagram preview lines */}
        <line x1="32" y1="24" x2="62" y2="24" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="32" y1="30" x2="55" y2="30" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="32" y1="35" x2="68" y2="35" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="32" y1="40" x2="48" y2="40" stroke="#0284C7" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* Front Folder Flap (Rich macOS translucent frosted blue with embossed crease) */}
      <path
        d="M8 38 C8 32 12 30 18 30 L82 30 C88 30 92 32 92 38 L90 78 C90 84 86 88 80 88 L10 88 C4 88 0 84 0 78 Z"
        transform="matrix(1 0 0 1 5 0)"
        fill="url(#folder-front)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
      />

      {/* Folder Highlight Rim & Crease */}
      <path
        d="M13 32 L87 32"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M14 48 L86 48"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

// 3. Certifications: Premium Apple-style certificate scroll tied with a realistic red ribbon
export const CertificationsIcon: React.FC = () => (
  <div className="w-12 h-12 relative flex items-center justify-center filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.35)]">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="cert-parchment" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF5" />
          <stop offset="40%" stopColor="#FEF3C7" />
          <stop offset="85%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="cert-roll" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="cert-ribbon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="40%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <radialGradient id="cert-seal" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
      </defs>

      {/* Rolled Certificate Diploma Scroll Body */}
      <g transform="rotate(-25 50 50)">
        {/* Left rolled cylinder curl */}
        <ellipse cx="20" cy="50" rx="6" ry="18" fill="url(#cert-roll)" stroke="#B45309" strokeWidth="0.8" />
        <ellipse cx="20" cy="50" rx="3" ry="12" fill="#78350F" />

        {/* Scroll Body */}
        <path d="M20 32 L80 32 C84 32 86 40 86 50 C86 60 84 68 80 68 L20 68 Z" fill="url(#cert-parchment)" />

        {/* Right rolled curl */}
        <ellipse cx="80" cy="50" rx="6" ry="18" fill="url(#cert-roll)" stroke="#B45309" strokeWidth="0.8" />
        <ellipse cx="80" cy="50" rx="3" ry="12" fill="#78350F" />

        {/* Text lines on diploma parchment */}
        <line x1="32" y1="42" x2="68" y2="42" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="35" y1="48" x2="65" y2="48" stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <line x1="38" y1="54" x2="62" y2="54" stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />

        {/* Red Silk Ribbon Wrapped Around Cylinder */}
        <rect x="46" y="31" width="9" height="38" rx="1.5" fill="url(#cert-ribbon)" stroke="#7F1D1D" strokeWidth="0.6" />
        {/* Ribbon fold highlights */}
        <line x1="47" y1="31" x2="47" y2="69" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />

        {/* Dangling Ribbon Tails */}
        <path d="M47 68 L42 85 L48 81 L53 87 L52 68 Z" fill="url(#cert-ribbon)" stroke="#7F1D1D" strokeWidth="0.6" />

        {/* Embossed Golden Wax Medal Seal */}
        <circle cx="50" cy="50" r="10" fill="url(#cert-seal)" stroke="#78350F" strokeWidth="1" />
        <circle cx="50" cy="50" r="7.5" fill="none" stroke="#FEF3C7" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
        <path d="M50 45 L52 48 L56 49 L53 52 L54 56 L50 53 L46 56 L47 52 L44 49 L48 48 Z" fill="#FFFDF5" />
      </g>
    </svg>
  </div>
);

// 4. Mail Contact: Official macOS Mail postage stamp icon with metallic eagle silhouette
export const MailPostageStampIcon: React.FC = () => (
  <div className="w-12 h-12 relative flex items-center justify-center filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.35)]">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="mail-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="45%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="eagle-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#F1F5F9" />
          <stop offset="85%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <filter id="stamp-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Scalloped Postage Stamp White Perforated Paper Base */}
      <rect x="8" y="10" width="84" height="80" rx="5" fill="#FFFFFF" filter="url(#stamp-shadow)" />
      
      {/* Perforated edge scalloped cutouts along top/bottom/sides */}
      {/* Top scallops */}
      {[16, 26, 36, 46, 56, 66, 76, 84].map((cx) => (
        <circle key={`t-${cx}`} cx={cx} cy="10" r="3" fill="#000000" fillOpacity="0.12" />
      ))}
      {/* Bottom scallops */}
      {[16, 26, 36, 46, 56, 66, 76, 84].map((cx) => (
        <circle key={`b-${cx}`} cx={cx} cy="90" r="3" fill="#000000" fillOpacity="0.12" />
      ))}
      {/* Left scallops */}
      {[20, 32, 44, 56, 68, 80].map((cy) => (
        <circle key={`l-${cy}`} cx="8" cy={cy} r="3" fill="#000000" fillOpacity="0.12" />
      ))}
      {/* Right scallops */}
      {[20, 32, 44, 56, 68, 80].map((cy) => (
        <circle key={`r-${cy}`} cx="92" cy={cy} r="3" fill="#000000" fillOpacity="0.12" />
      ))}

      {/* Stamp Blue Vignette Picture Area */}
      <rect x="14" y="16" width="72" height="68" rx="2" fill="url(#mail-bg)" />

      {/* Metallic Silver Soaring Eagle Silhouette */}
      <path
        d="M50 36 C55 33 65 26 76 25 C74 30 70 36 64 40 C72 38 78 40 76 43 C70 47 62 48 55 49 C60 52 64 56 61 60 C58 57 55 54 50 53 C45 54 42 57 39 60 C36 56 40 52 45 49 C38 48 30 47 24 43 C22 40 28 38 36 40 C30 36 26 30 24 25 C35 26 45 33 50 36 Z"
        fill="url(#eagle-metal)"
        filter="drop-shadow(0 2px 2px rgba(0,0,0,0.4))"
      />
      {/* Eagle Head & Beak Detail */}
      <circle cx="50" cy="35" r="3.2" fill="#FFFFFF" />
      <polygon points="50,33 53,35 50,36" fill="#F59E0B" />

      {/* Authentic Wavy Cancellation Postmark Lines */}
      <path
        d="M16 66 Q24 62 32 66 T48 66 T64 66 T80 66"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.8"
        fill="none"
      />
      <path
        d="M16 72 Q24 68 32 72 T48 72 T64 72 T80 72"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.8"
        fill="none"
      />
    </svg>
  </div>
);

// 5. Photos Library: Authentic multi-colored translucent glass flower petal macOS Photos icon
export const PhotosLibraryIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-[13px] relative flex items-center justify-center bg-white shadow-[0_5px_12px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.9)] border border-black/10 overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none">
      <defs>
        {/* 8 macOS Petal Colors with Soft Transparency */}
        <radialGradient id="p-yellow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FACC15" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#EAB308" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id="p-orange" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FB923C" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id="p-red" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F87171" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id="p-pink" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F472B6" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id="p-purple" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#C084FC" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id="p-blue" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id="p-cyan" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id="p-green" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0.8" />
        </radialGradient>
      </defs>

      {/* 8 Radial Overlapping Translucent Glass Flower Petals */}
      <g transform="translate(50 50) scale(0.92)" style={{ mixBlendMode: 'multiply' }}>
        {/* Top (Yellow) */}
        <g transform="rotate(0)">
          <path d="M0 -36 C-8 -36 -12 -24 0 0 C12 -24 8 -36 0 -36 Z" fill="url(#p-yellow)" />
        </g>
        {/* Top-Right (Orange) */}
        <g transform="rotate(45)">
          <path d="M0 -36 C-8 -36 -12 -24 0 0 C12 -24 8 -36 0 -36 Z" fill="url(#p-orange)" />
        </g>
        {/* Right (Red) */}
        <g transform="rotate(90)">
          <path d="M0 -36 C-8 -36 -12 -24 0 0 C12 -24 8 -36 0 -36 Z" fill="url(#p-red)" />
        </g>
        {/* Bottom-Right (Pink) */}
        <g transform="rotate(135)">
          <path d="M0 -36 C-8 -36 -12 -24 0 0 C12 -24 8 -36 0 -36 Z" fill="url(#p-pink)" />
        </g>
        {/* Bottom (Purple) */}
        <g transform="rotate(180)">
          <path d="M0 -36 C-8 -36 -12 -24 0 0 C12 -24 8 -36 0 -36 Z" fill="url(#p-purple)" />
        </g>
        {/* Bottom-Left (Blue) */}
        <g transform="rotate(225)">
          <path d="M0 -36 C-8 -36 -12 -24 0 0 C12 -24 8 -36 0 -36 Z" fill="url(#p-blue)" />
        </g>
        {/* Left (Cyan) */}
        <g transform="rotate(270)">
          <path d="M0 -36 C-8 -36 -12 -24 0 0 C12 -24 8 -36 0 -36 Z" fill="url(#p-cyan)" />
        </g>
        {/* Top-Left (Green) */}
        <g transform="rotate(315)">
          <path d="M0 -36 C-8 -36 -12 -24 0 0 C12 -24 8 -36 0 -36 Z" fill="url(#p-green)" />
        </g>
      </g>

      {/* Central White Glass Core */}
      <circle cx="50" cy="50" r="9" fill="#FFFFFF" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.15))" />
    </svg>
  </div>
);

// 6. iCloud Drive: Realistic semi-translucent glass squircle featuring a 3D white cloud
export const ICloudDriveIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-[13px] relative flex items-center justify-center bg-gradient-to-br from-[#38BDF8] via-[#0284C7] to-[#1D4ED8] shadow-[0_5px_12px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.7)] border border-white/30 overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="cloud-shading" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="glass-glare" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Glass Gloss Surface Accent */}
      <rect width="100" height="100" fill="url(#glass-glare)" />

      {/* Dimensional 3D White Cloud */}
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.35))">
        {/* Soft back cloud ambient shadow */}
        <path
          d="M32 64 C25 64 20 59 20 52 C20 46 24 41 30 40 C32 32 40 26 49 26 C58 26 65 31 68 39 C70 38 72 38 74 38 C81 38 86 43 86 50 C86 57 80 64 73 64 Z"
          fill="url(#cloud-shading)"
        />
        {/* Cloud top highlight crests */}
        <circle cx="49" cy="38" r="14" fill="#FFFFFF" fillOpacity="0.6" />
        <circle cx="35" cy="51" r="10" fill="#FFFFFF" fillOpacity="0.5" />
        <circle cx="67" cy="49" r="11" fill="#FFFFFF" fillOpacity="0.5" />
      </g>
    </svg>
  </div>
);

// 7. Analytics Lab: Premium macOS-style stock/graph icon with neon green fluctuating trend line over dark glass grid
export const AnalyticsLabIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-[13px] relative flex items-center justify-center bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] shadow-[0_5px_12px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/20 overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="neon-area" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#16A34A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="neon-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="50%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>

      {/* Dark Glass Grid Sheet Lines */}
      {[24, 40, 56, 72].map((y) => (
        <line key={`gy-${y}`} x1="12" y1={y} x2="88" y2={y} stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
      ))}
      {[28, 48, 68].map((x) => (
        <line key={`gx-${x}`} x1={x} y1="16" x2={x} y2="84" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
      ))}

      {/* Glowing Neon Area Fill */}
      <path
        d="M16 68 L28 60 L42 66 L56 46 L70 52 L84 28 L84 80 L16 80 Z"
        fill="url(#neon-area)"
      />

      {/* Neon Green Fluctuating Stock Trend Line */}
      <path
        d="M16 68 L28 60 L42 66 L56 46 L70 52 L84 28"
        stroke="url(#neon-stroke)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="drop-shadow(0 0 4px #22C55E)"
      />

      {/* Glowing Data Peak Indicator Dot */}
      <circle cx="84" cy="28" r="4" fill="#FFFFFF" filter="drop-shadow(0 0 6px #4ADE80)" />
      <circle cx="84" cy="28" r="2" fill="#22C55E" />
    </svg>
  </div>
);

// 8. Timeline & Events: Physical macOS Calendar page style icon, displaying red header and grid lines
export const TimelineCalendarIcon: React.FC = () => (
  <div className="w-12 h-12 relative flex items-center justify-center filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.35)]">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="cal-header" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
      </defs>

      {/* Calendar White Paper Pad */}
      <rect x="10" y="14" width="80" height="74" rx="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      {/* Paper Thickness Layer */}
      <rect x="12" y="84" width="76" height="4" rx="2" fill="#CBD5E1" />

      {/* Red Header Bar */}
      <path d="M10 24 C10 18 14 14 20 14 L80 14 C86 14 90 18 90 24 L90 38 L10 38 Z" fill="url(#cal-header)" />
      
      {/* Month Label */}
      <text x="50" y="30" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="1.2">
        SEP
      </text>

      {/* Calendar Grid & Large Day Number */}
      {/* Subtle grid lines */}
      <line x1="20" y1="52" x2="80" y2="52" stroke="#F1F5F9" strokeWidth="1" />
      <line x1="20" y1="66" x2="80" y2="66" stroke="#F1F5F9" strokeWidth="1" />

      {/* Current Date Number "2" (or "15") in bold San Francisco display */}
      <text x="50" y="72" fill="#1E293B" fontSize="36" fontWeight="800" textAnchor="middle" fontFamily="system-ui, -apple-system">
        2
      </text>
    </svg>
  </div>
);

// 9. Ask Abinash AI: Authentic, glowing Siri-style or AI-style colorful abstract glass orb sitting inside squircle
export const AskAbinashAIIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-[13px] relative flex items-center justify-center bg-gradient-to-b from-[#18181B] via-[#09090B] to-[#000000] shadow-[0_5px_12px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)] border border-white/25 overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <radialGradient id="siri-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="25%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="55%" stopColor="#A855F7" stopOpacity="0.75" />
          <stop offset="85%" stopColor="#EC4899" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="orb-swirl-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="orb-swirl-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="50%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Radiant Background Nebula */}
      <circle cx="50" cy="50" r="38" fill="url(#siri-glow)" />

      {/* Luminous Apple Intelligence Glowing Ribbon Ribs */}
      <path
        d="M24 50 C24 35 35 24 50 24 C65 24 76 35 76 50 C76 65 65 76 50 76 C35 76 24 65 24 50 Z"
        stroke="url(#orb-swirl-1)"
        strokeWidth="5"
        fill="none"
        filter="drop-shadow(0 0 6px #06B6D4)"
      />
      <path
        d="M28 42 C36 28 64 28 72 42 C80 56 64 74 50 74 C36 74 20 56 28 42 Z"
        stroke="url(#orb-swirl-2)"
        strokeWidth="4"
        fill="none"
        filter="drop-shadow(0 0 6px #EC4899)"
      />

      {/* Bright Central Core Light Burst */}
      <circle cx="50" cy="50" r="9" fill="#FFFFFF" filter="drop-shadow(0 0 8px #FFFFFF)" />
      <circle cx="50" cy="50" r="4" fill="#E0F2FE" />
    </svg>
  </div>
);

// 10. Cinema Favorites: Physical metallic macOS movie clapboard with realistic wood grain textures
export const CinemaFavoritesIcon: React.FC = () => (
  <div className="w-12 h-12 relative flex items-center justify-center filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.35)]">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="clapper-slate" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="clapper-top" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>

      {/* Slate Clapboard Body */}
      <rect x="12" y="38" width="76" height="52" rx="4" fill="url(#clapper-slate)" stroke="#475569" strokeWidth="1" />

      {/* Production Slate Chalk Grid & Text */}
      <line x1="12" y1="56" x2="88" y2="56" stroke="#475569" strokeWidth="1" />
      <line x1="38" y1="38" x2="38" y2="56" stroke="#475569" strokeWidth="1" />
      <line x1="64" y1="38" x2="64" y2="56" stroke="#475569" strokeWidth="1" />

      <text x="25" y="49" fill="#E2E8F0" fontSize="7" fontWeight="bold" textAnchor="middle">PROD</text>
      <text x="51" y="49" fill="#E2E8F0" fontSize="7" fontWeight="bold" textAnchor="middle">SCENE</text>
      <text x="76" y="49" fill="#E2E8F0" fontSize="7" fontWeight="bold" textAnchor="middle">TAKE</text>

      <text x="50" y="74" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">
        CINEMA 4K
      </text>

      {/* Angled Top Clapper Stick with Diagonal Chevron Stripes */}
      <g transform="rotate(-14 14 34)">
        <rect x="12" y="22" width="76" height="14" rx="2" fill="url(#clapper-top)" stroke="#334155" strokeWidth="1" />
        {/* Alternating White Chevrons */}
        <polygon points="22,22 30,22 24,36 16,36" fill="#F8FAFC" />
        <polygon points="38,22 46,22 40,36 32,36" fill="#F8FAFC" />
        <polygon points="54,22 62,22 56,36 48,36" fill="#F8FAFC" />
        <polygon points="70,22 78,22 72,36 64,36" fill="#F8FAFC" />
        <polygon points="82,22 88,22 88,26 83,36 80,36" fill="#F8FAFC" />

        {/* Metallic Hinge Bolt */}
        <circle cx="16" cy="29" r="3" fill="#94A3B8" stroke="#475569" strokeWidth="0.8" />
        <circle cx="16" cy="29" r="1" fill="#FFFFFF" />
      </g>
    </svg>
  </div>
);

// 11. Resume_Abinash.pdf: Realistic white document icon with red corner tag, PDF emblem and mini preview sheet layout
export const ResumePdfIcon: React.FC = () => (
  <div className="w-12 h-12 relative flex items-center justify-center filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.35)]">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="doc-paper" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>
        <linearGradient id="pdf-badge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
      </defs>

      {/* Crisp White Document Sheet with Dog-Ear Fold */}
      <path
        d="M18 12 L64 12 L82 30 L82 86 C82 90 78 94 74 94 L18 94 C14 94 10 90 10 86 L10 20 C10 16 14 12 18 12 Z"
        fill="url(#doc-paper)"
        stroke="#CBD5E1"
        strokeWidth="1.2"
      />

      {/* Top-Right Dog-Ear Fold Shading */}
      <polygon points="64,12 82,30 64,30" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
      <polygon points="64,30 82,30 64,34" fill="#94A3B8" opacity="0.3" />

      {/* Red Corner Badge with "PDF" */}
      <rect x="8" y="24" width="30" height="15" rx="3" fill="url(#pdf-badge)" filter="drop-shadow(0 2px 3px rgba(185,28,28,0.4))" />
      <text x="23" y="35" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        PDF
      </text>

      {/* Mini Preview Sheet Layout */}
      {/* Resume Profile Header */}
      <circle cx="26" cy="54" r="5" fill="#94A3B8" />
      <line x1="36" y1="52" x2="68" y2="52" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="36" y1="58" x2="56" y2="58" stroke="#64748B" strokeWidth="1.6" strokeLinecap="round" />

      {/* Resume Content Mockup Lines */}
      <line x1="20" y1="68" x2="72" y2="68" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="74" x2="66" y2="74" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="80" x2="54" y2="80" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="86" x2="44" y2="86" stroke="#CBD5E1" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  </div>
);

// 12. Work History: Realistic leather premium executive briefcase with metallic latches
export const WorkHistoryIcon: React.FC = () => (
  <div className="w-12 h-12 relative flex items-center justify-center filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.35)]">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="briefcase-leather" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8D6E63" />
          <stop offset="40%" stopColor="#6D4C41" />
          <stop offset="100%" stopColor="#4E342E" />
        </linearGradient>
        <linearGradient id="metal-latch" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Arched Top Leather Handle */}
      <path
        d="M38 28 C38 18 62 18 62 28"
        stroke="#3E2723"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M38 28 C38 20 62 20 62 28"
        stroke="#8D6E63"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Handle Chrome Mounts */}
      <rect x="35" y="27" width="6" height="5" rx="1.5" fill="url(#metal-latch)" />
      <rect x="59" y="27" width="6" height="5" rx="1.5" fill="url(#metal-latch)" />

      {/* Main Executive Leather Briefcase Body */}
      <rect x="10" y="30" width="80" height="58" rx="9" fill="url(#briefcase-leather)" stroke="#3E2723" strokeWidth="1.2" />

      {/* Briefcase Lid Flap */}
      <path
        d="M10 30 L90 30 L90 56 C90 56 65 62 50 62 C35 62 10 56 10 56 Z"
        fill="#5D4037"
        stroke="#3E2723"
        strokeWidth="1"
      />

      {/* Fine Stitched Leather Border */}
      <path
        d="M13 33 L87 33 L87 54 C87 54 64 60 50 60 C36 60 13 54 13 54 Z"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="0.8"
        strokeDasharray="2 2"
        fill="none"
      />

      {/* Dual Polished Gold Metal Latches */}
      <rect x="26" y="52" width="10" height="12" rx="2" fill="url(#metal-latch)" stroke="#78350F" strokeWidth="0.8" />
      <circle cx="31" cy="58" r="1.5" fill="#3E2723" />

      <rect x="64" y="52" width="10" height="12" rx="2" fill="url(#metal-latch)" stroke="#78350F" strokeWidth="0.8" />
      <circle cx="69" cy="58" r="1.5" fill="#3E2723" />
    </svg>
  </div>
);

// 13. Engineering Notes: Physical yellow legal notepad with a realistic wooden yellow pencil laying diagonally across it
export const EngineeringNotesIcon: React.FC = () => (
  <div className="w-12 h-12 relative flex items-center justify-center filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.35)]">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="pad-yellow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#FDE047" />
        </linearGradient>
        <linearGradient id="pencil-wood" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* Legal Notepad Body */}
      <rect x="14" y="10" width="72" height="82" rx="4" fill="url(#pad-yellow)" stroke="#CA8A04" strokeWidth="1" />

      {/* Dark Leatherette Top Binding Tape */}
      <rect x="14" y="10" width="72" height="14" rx="2" fill="#78350F" />
      {/* Binding Stitch Perforation Line */}
      <line x1="14" y1="24" x2="86" y2="24" stroke="#FDE047" strokeWidth="1.2" strokeDasharray="2.5 2" />

      {/* Left Red Margin Rule Line */}
      <line x1="28" y1="24" x2="28" y2="92" stroke="#EF4444" strokeWidth="1" opacity="0.6" />

      {/* Horizontal Light Blue Legal Ruling Lines */}
      {[34, 44, 54, 64, 74, 84].map((y) => (
        <line key={`rule-${y}`} x1="18" y1={y} x2="82" y2={y} stroke="#93C5FD" strokeWidth="1" opacity="0.8" />
      ))}

      {/* Diagonal Wooden Yellow Hexagonal Pencil */}
      <g transform="rotate(35 50 50)">
        {/* Pink Eraser */}
        <rect x="46" y="8" width="8" height="8" rx="2" fill="#F472B6" />
        {/* Silver Ferrule */}
        <rect x="46" y="16" width="8" height="6" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.5" />
        <line x1="46" y1="19" x2="54" y2="19" stroke="#64748B" strokeWidth="0.6" />

        {/* Pencil Wooden Body */}
        <rect x="46" y="22" width="8" height="52" fill="url(#pencil-wood)" stroke="#B45309" strokeWidth="0.6" />
        <line x1="50" y1="22" x2="50" y2="74" stroke="#D97706" strokeWidth="1" />

        {/* Sharpened Wood Point & Graphite Lead Tip */}
        <polygon points="46,74 54,74 50,86" fill="#FDE68A" />
        <polygon points="48,80 52,80 50,86" fill="#1E293B" />
      </g>
    </svg>
  </div>
);

// 14. Game Center: Official Apple Game Center icon featuring floating, vibrant, glossy 3D colored balloons
export const GameCenterIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-[13px] relative flex items-center justify-center bg-white shadow-[0_5px_12px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.9)] border border-black/10 overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none">
      <defs>
        {/* 4 Glossy 3D Balloon Gradients */}
        <radialGradient id="balloon-blue" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="40%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </radialGradient>
        <radialGradient id="balloon-green" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="40%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </radialGradient>
        <radialGradient id="balloon-yellow" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#A16207" />
        </radialGradient>
        <radialGradient id="balloon-pink" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="40%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#9F1239" />
        </radialGradient>
      </defs>

      {/* Floating 4 Glossy 3D Balloons */}
      {/* Blue balloon (top left) */}
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))">
        <circle cx="38" cy="38" r="17" fill="url(#balloon-blue)" />
        <ellipse cx="32" cy="31" rx="4" ry="2" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 32 31)" />
      </g>

      {/* Green balloon (top right) */}
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))">
        <circle cx="62" cy="35" r="16" fill="url(#balloon-green)" />
        <ellipse cx="56" cy="28" rx="4" ry="2" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 56 28)" />
      </g>

      {/* Yellow balloon (bottom left) */}
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))">
        <circle cx="36" cy="64" r="16" fill="url(#balloon-yellow)" />
        <ellipse cx="30" cy="57" rx="4" ry="2" fill="#FFFFFF" opacity="0.7" transform="rotate(-30 30 57)" />
      </g>

      {/* Pink/Magenta balloon (bottom right) */}
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))">
        <circle cx="62" cy="62" r="18" fill="url(#balloon-pink)" />
        <ellipse cx="55" cy="54" rx="4.5" ry="2.2" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 55 54)" />
      </g>
    </svg>
  </div>
);

// 15. Apple Music: Authentic, glossy red macOS Apple Music squircle icon with white 3D musical note extrusion
export const AppleMusicIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-[13px] relative flex items-center justify-center bg-gradient-to-b from-[#FA2D48] via-[#FB233B] to-[#D9142E] shadow-[0_5px_12px_rgba(250,45,72,0.45),inset_0_1px_1px_rgba(255,255,255,0.7)] border border-white/30 overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="music-note-3d" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>
      </defs>

      {/* Gloss Top Specular Sheen */}
      <path
        d="M0 0 L100 0 L100 45 C75 52 25 52 0 45 Z"
        fill="rgba(255,255,255,0.18)"
      />

      {/* Iconic 3D Solid White Musical Note Extrusion */}
      <path
        d="M72 24 L42 32 C39 33 38 35 38 38 L38 66 C36 64 32 63 28 64 C22 66 18 71 20 76 C22 81 29 83 35 81 C40 79 43 74 43 69 L43 45 L67 39 L67 60 C65 58 61 57 57 58 C51 60 47 65 49 70 C51 75 58 77 64 75 C69 73 72 68 72 63 L72 24 Z"
        fill="url(#music-note-3d)"
        filter="drop-shadow(0 4px 6px rgba(0,0,0,0.35))"
      />
    </svg>
  </div>
);

// 16. Recruiter Brief: Authentic Apple-style dark developer icon with code glyphs inside
export const RecruiterBriefIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-[13px] relative flex items-center justify-center bg-gradient-to-b from-[#1F2937] via-[#111827] to-[#030712] shadow-[0_5px_12px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/20 overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="code-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Developer Window Header with Mac Dots */}
      <rect x="0" y="0" width="100" height="22" fill="#1E293B" opacity="0.6" />
      <circle cx="16" cy="11" r="2.5" fill="#EF4444" />
      <circle cx="24" cy="11" r="2.5" fill="#F59E0B" />
      <circle cx="32" cy="11" r="2.5" fill="#10B981" />

      {/* Code Glyphs < / > with Terminal Command Text */}
      <path
        d="M32 44 L20 54 L32 64"
        stroke="url(#code-grad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="drop-shadow(0 0 4px #10B981)"
      />
      <line
        x1="54"
        y1="38"
        x2="46"
        y2="70"
        stroke="#60A5FA"
        strokeWidth="3.5"
        strokeLinecap="round"
        filter="drop-shadow(0 0 4px #3B82F6)"
      />
      <path
        d="M68 44 L80 54 L68 64"
        stroke="url(#code-grad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="drop-shadow(0 0 4px #10B981)"
      />

      {/* Terminal Mini Prompt Footer Line */}
      <text x="50" y="86" fill="#9CA3AF" fontSize="8" fontWeight="mono" textAnchor="middle">
        brief.ts · 100% match
      </text>
    </svg>
  </div>
);

// 17. Academics & CGPA: Physical navy blue graduation cap with realistic dangling silky yellow tassel
export const AcademicsGradCapIcon: React.FC = () => (
  <div className="w-12 h-12 relative flex items-center justify-center filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.35)]">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="cap-navy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="50%" stopColor="#172554" />
          <stop offset="100%" stopColor="#0B132B" />
        </linearGradient>
        <linearGradient id="tassel-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#A16207" />
        </linearGradient>
      </defs>

      {/* Skull Cap Base */}
      <path
        d="M32 52 C32 64 68 64 68 52 L66 66 C66 74 34 74 34 66 Z"
        fill="#0F172A"
        stroke="#1E3A8A"
        strokeWidth="1"
      />

      {/* 3D Tilted Mortarboard Rhombus Top */}
      <polygon
        points="50,22 88,38 50,54 12,38"
        fill="url(#cap-navy)"
        stroke="#3B82F6"
        strokeWidth="1"
      />

      {/* Center Metallic Button on Diamond Cap */}
      <circle cx="50" cy="38" r="3.5" fill="url(#tassel-gold)" stroke="#78350F" strokeWidth="0.8" />

      {/* Dangling Silky Yellow Tassel */}
      <path
        d="M50 38 Q65 42 74 54 L76 74"
        stroke="url(#tassel-gold)"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Tassel Fringe Brush End */}
      <polygon points="73,74 79,74 81,88 71,88" fill="url(#tassel-gold)" />
      <line x1="75" y1="76" x2="75" y2="88" stroke="#78350F" strokeWidth="0.8" />
      <line x1="77" y1="76" x2="77" y2="88" stroke="#78350F" strokeWidth="0.8" />
    </svg>
  </div>
);

// 18. Terminal zsh: Premium dark glass macOS Terminal window showing color-coded command-line text prompts
export const TerminalZshIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-[13px] relative flex items-center justify-center bg-gradient-to-b from-[#18181B] via-[#09090B] to-[#000000] shadow-[0_5px_12px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/20 overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      {/* Top Window Chrome Bar */}
      <rect x="0" y="0" width="100" height="22" fill="#27272A" />
      {/* Window Controls */}
      <circle cx="16" cy="11" r="2.5" fill="#EF4444" />
      <circle cx="24" cy="11" r="2.5" fill="#F59E0B" />
      <circle cx="32" cy="11" r="2.5" fill="#10B981" />
      <text x="50" y="14" fill="#71717A" fontSize="7" fontWeight="bold" textAnchor="middle">
        zsh
      </text>

      {/* Terminal Command Line Output */}
      <g fontFamily="monospace" fontSize="9" fontWeight="bold">
        {/* Prompt 1 */}
        <text x="14" y="38" fill="#38BDF8">
          ~ <tspan fill="#A855F7">%</tspan> <tspan fill="#F8FAFC">zsh</tspan>
        </text>
        {/* Output Line */}
        <text x="14" y="52" fill="#4ADE80" fontSize="7.5">
          ➜ Ready
        </text>
        {/* Prompt 2 with Blinking Block Cursor */}
        <text x="14" y="68" fill="#38BDF8">
          ~ <tspan fill="#A855F7">%</tspan>
        </text>
        {/* Blinking Cyan Cursor */}
        <rect x="36" y="59" width="6" height="11" fill="#38BDF8" opacity="0.9" />
      </g>
    </svg>
  </div>
);

// 19. HR Politely: Official macOS Contacts style book icon with realistic paper edge layers and leather silhouette tab
export const HrPolitelyContactsIcon: React.FC = () => (
  <div className="w-12 h-12 relative flex items-center justify-center filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.35)]">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="book-leather" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#78350F" />
          <stop offset="40%" stopColor="#451A03" />
          <stop offset="100%" stopColor="#2E1065" />
        </linearGradient>
      </defs>

      {/* White Paper Page Edge Stack along Right Side */}
      <rect x="18" y="14" width="70" height="72" rx="4" fill="#E2E8F0" />
      <rect x="18" y="16" width="68" height="68" rx="3" fill="#FFFFFF" />
      {/* Paper page edge lines */}
      <line x1="84" y1="18" x2="84" y2="82" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="86" y1="20" x2="86" y2="80" stroke="#94A3B8" strokeWidth="1" />

      {/* Alphabetical Leather Index Tabs (A, B, C, D) on the Right */}
      <rect x="86" y="24" width="6" height="8" rx="1" fill="#D97706" />
      <rect x="86" y="36" width="6" height="8" rx="1" fill="#DC2626" />
      <rect x="86" y="48" width="6" height="8" rx="1" fill="#2563EB" />
      <rect x="86" y="60" width="6" height="8" rx="1" fill="#16A34A" />

      {/* Main Leather Address Book Cover */}
      <rect x="12" y="12" width="72" height="76" rx="6" fill="url(#book-leather)" stroke="#27272A" strokeWidth="1" />

      {/* Book Spine Stitch & Crease */}
      <line x1="22" y1="12" x2="22" y2="88" stroke="#1F2937" strokeWidth="1.5" />
      <line x1="24" y1="12" x2="24" y2="88" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />

      {/* Embossed Cameo Profile Silhouette */}
      <circle cx="48" cy="42" r="11" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
      {/* Head */}
      <circle cx="48" cy="38" r="4.5" fill="#451A03" />
      {/* Shoulders */}
      <path d="M40 50 C40 45 44 44 48 44 C52 44 56 45 56 50 Z" fill="#451A03" />

      {/* Gold Embossed "CONTACTS" Under Cameo */}
      <text x="48" y="68" fill="#FDE68A" fontSize="6.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">
        CONTACTS
      </text>
    </svg>
  </div>
);

// 20. System Settings: Authentic Apple macOS System Settings icon—heavy 3D metallic silver industrial gear
export const SystemSettingsIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-[13px] relative flex items-center justify-center bg-gradient-to-b from-[#475569] via-[#334155] to-[#1E293B] shadow-[0_5px_12px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/30 overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-full h-full p-0.5" fill="none">
      <defs>
        <radialGradient id="gear-metal" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#CBD5E1" />
          <stop offset="80%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </radialGradient>
        <linearGradient id="gear-bevel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>

      {/* 3D Metallic Silver Industrial Gear Mechanism with 8 Cog Teeth */}
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))">
        {/* Outer Teeth Path */}
        <path
          d="M44 14 L56 14 L57 23 C60 24 64 26 67 28 L74 23 L82 31 L77 38 C79 41 81 44 82 48 L91 49 L91 61 L82 62 C81 65 79 69 77 71 L82 79 L74 87 L67 82 C64 84 60 86 57 87 L56 96 L44 96 L43 87 C40 86 36 84 33 82 L26 87 L18 79 L23 71 C21 69 19 65 18 62 L9 61 L9 49 L18 48 C19 44 21 41 23 38 L18 31 L26 23 L33 28 C36 26 40 24 43 23 Z"
          fill="url(#gear-metal)"
          stroke="url(#gear-bevel)"
          strokeWidth="1.2"
        />

        {/* Center Recessed Hub */}
        <circle cx="50" cy="55" r="16" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
        <circle cx="50" cy="55" r="9" fill="url(#gear-metal)" />
      </g>
    </svg>
  </div>
);

// 21. About Abinash: Elegant, official "About This Mac" silver Apple silhouette logo
export const AboutAbinashIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-[13px] relative flex items-center justify-center bg-gradient-to-b from-[#F8FAFC] via-[#E2E8F0] to-[#CBD5E1] shadow-[0_5px_12px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.9)] border border-white/60 overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="apple-silver" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>

      {/* Dimensional Polished Silver Apple Silhouette Logo */}
      <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))">
        {/* Apple Leaf */}
        <path
          d="M54 22 C59 18 62 14 60 10 C55 11 50 14 48 18 C46 22 50 25 54 22 Z"
          fill="url(#apple-silver)"
        />
        {/* Apple Body with Bite */}
        <path
          d="M62 43 C62 36 68 32 68 32 C65 28 59 27 55 27 C49 27 46 29 42 29 C38 29 34 27 29 27 C21 27 14 33 14 44 C14 53 22 69 29 77 C33 81 37 86 42 86 C47 86 48 83 54 83 C59 83 61 86 66 86 C71 86 75 81 79 77 C81 74 83 71 84 68 C76 65 72 58 72 51 C72 46 76 41 80 39 C77 34 71 33 69 33 C64 33 62 39 62 43 Z"
          transform="translate(10 2)"
          fill="url(#apple-silver)"
        />
      </g>
    </svg>
  </div>
);

// 22. Skills & Stack: Elegant stack of multi-colored translucent glass sheets floating above each other
export const SkillsStackIcon: React.FC = () => (
  <div className="w-12 h-12 relative flex items-center justify-center filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.35)]">
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
      <defs>
        {/* Glass Layer Gradients */}
        <linearGradient id="glass-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="glass-purple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="glass-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Layer 1: Bottom Emerald Glass Sheet */}
      <g transform="translate(0 30)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.3))">
        <polygon points="50,22 84,38 50,54 16,38" fill="url(#glass-emerald)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
        <polygon points="50,54 84,38 84,42 50,58 16,42 16,38" fill="#047857" opacity="0.8" />
      </g>

      {/* Layer 2: Middle Purple Glass Sheet */}
      <g transform="translate(0 15)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.3))">
        <polygon points="50,22 84,38 50,54 16,38" fill="url(#glass-purple)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
        <polygon points="50,54 84,38 84,42 50,58 16,42 16,38" fill="#6D28D9" opacity="0.8" />
      </g>

      {/* Layer 3: Top Cyan Floating Glass Sheet */}
      <g transform="translate(0 0)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.3))">
        <polygon points="50,22 84,38 50,54 16,38" fill="url(#glass-cyan)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
        <polygon points="50,54 84,38 84,42 50,58 16,42 16,38" fill="#0369A1" opacity="0.8" />
        {/* Chip logic circuitry glyphs on top pane */}
        <line x1="42" y1="36" x2="58" y2="36" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="50" y1="30" x2="50" y2="44" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="50" cy="37" r="2" fill="#FFFFFF" />
      </g>
    </svg>
  </div>
);
