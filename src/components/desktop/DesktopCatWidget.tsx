import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../utils/audioHaptics';

export const DesktopCatWidget: React.FC = () => {
  return (
    <div 
      id="desktop-cat-area"
      className="fixed bottom-3 left-4 z-30 pointer-events-auto flex items-end select-none"
    >
      <AnimatePresence>
        {
          <motion.div
            id="resting-white-cat"
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            className="relative flex items-end group cursor-pointer"
            onClick={() => sound.tap()}
            title="A cute white cartoon cat resting peacefully"
          >
            {/* Subtle soft ambient light glow beneath cat */}
            <div className="absolute -bottom-1 left-2 right-2 h-3 bg-black/25 rounded-full blur-[3px] pointer-events-none" />

            {/* High-quality vector illustration of a cute white cartoon cat with big eyes and playful expression */}
            <motion.div
              animate={{ 
                y: [0, -2, 0],
              }}
              transition={{ 
                duration: 3.5, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="relative w-16 h-16 sm:w-18 sm:h-18 drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)]"
            >
              <svg
                viewBox="0 0 120 120"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="catBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="85%" stopColor="#F4F6F9" />
                    <stop offset="100%" stopColor="#E2E7ED" />
                  </linearGradient>
                  <linearGradient id="catEarPink" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFB6C1" />
                    <stop offset="100%" stopColor="#FFA0B4" />
                  </linearGradient>
                  <radialGradient id="catEyeShine" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="60%" stopColor="#0284C7" />
                    <stop offset="100%" stopColor="#0369A1" />
                  </radialGradient>
                </defs>

                {/* Animated Tail curling gently behind */}
                <path
                  d="M86 92 C98 90 108 80 105 68 C102 60 92 64 90 70 C88 75 94 82 86 86"
                  stroke="#E2E7ED"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M86 92 C98 90 108 80 105 68 C102 60 92 64 90 70 C88 75 94 82 86 86"
                  stroke="#FFFFFF"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Cat Body (Chubby, resting calmly) */}
                <ellipse cx="60" cy="85" rx="34" ry="24" fill="url(#catBodyGrad)" />
                <path
                  d="M32 90 C34 76 46 68 60 68 C74 68 86 76 88 90 C88 102 76 106 60 106 C44 106 32 102 32 90 Z"
                  fill="url(#catBodyGrad)"
                />

                {/* Front Paws resting neatly */}
                <ellipse cx="48" cy="102" rx="7" ry="5" fill="#FFFFFF" stroke="#E2E7ED" strokeWidth="1" />
                <ellipse cx="68" cy="102" rx="7" ry="5" fill="#FFFFFF" stroke="#E2E7ED" strokeWidth="1" />
                {/* Paw toe details */}
                <line x1="46" y1="102" x2="46" y2="105" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
                <line x1="50" y1="102" x2="50" y2="105" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
                <line x1="66" y1="102" x2="66" y2="105" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
                <line x1="70" y1="102" x2="70" y2="105" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />

                {/* Left Ear */}
                <path
                  d="M36 46 L24 20 C23 18 26 16 28 18 L48 32 Z"
                  fill="url(#catBodyGrad)"
                />
                <path
                  d="M35 42 L27 24 L44 33 Z"
                  fill="url(#catEarPink)"
                />

                {/* Right Ear */}
                <path
                  d="M84 46 L96 20 C97 18 94 16 92 18 L72 32 Z"
                  fill="url(#catBodyGrad)"
                />
                <path
                  d="M85 42 L93 24 L76 33 Z"
                  fill="url(#catEarPink)"
                />

                {/* Head (Round, cute cartoon shape) */}
                <circle cx="60" cy="50" r="28" fill="url(#catBodyGrad)" />

                {/* Big Expressive Cartoon Eyes */}
                {/* Left Eye */}
                <ellipse cx="47" cy="48" rx="8" ry="9" fill="url(#catEyeShine)" />
                <ellipse cx="47" cy="48" rx="5.5" ry="6.5" fill="#0F172A" />
                {/* Eye sparkle highlights */}
                <circle cx="44.5" cy="45" r="3" fill="#FFFFFF" />
                <circle cx="49" cy="50.5" r="1.3" fill="#FFFFFF" />

                {/* Right Eye */}
                <ellipse cx="73" cy="48" rx="8" ry="9" fill="url(#catEyeShine)" />
                <ellipse cx="73" cy="48" rx="5.5" ry="6.5" fill="#0F172A" />
                {/* Eye sparkle highlights */}
                <circle cx="70.5" cy="45" r="3" fill="#FFFFFF" />
                <circle cx="75" cy="50.5" r="1.3" fill="#FFFFFF" />

                {/* Cute Pink Nose */}
                <polygon points="60,56 57.5,53.5 62.5,53.5" fill="#FF85A2" />

                {/* Playful Cat Smile (Mouth) */}
                <path
                  d="M56 57 Q60 60 60 57 Q60 60 64 57"
                  stroke="#475569"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Soft Blush on Cheeks */}
                <ellipse cx="38" cy="55" rx="4" ry="2.2" fill="#FFB6C1" opacity="0.6" />
                <ellipse cx="82" cy="55" rx="4" ry="2.2" fill="#FFB6C1" opacity="0.6" />

                {/* Delicate Whiskers */}
                {/* Left Whiskers */}
                <line x1="36" y1="52" x2="22" y2="50" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="36" y1="55" x2="20" y2="56" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
                {/* Right Whiskers */}
                <line x1="84" y1="52" x2="98" y2="50" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="84" y1="55" x2="100" y2="56" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
};
