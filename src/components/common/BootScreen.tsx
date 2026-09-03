import React, { useState, useEffect } from 'react';
import { Sparkles, Mail, Linkedin, ArrowRight, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { sound } from '../../utils/audioHaptics';

interface BootScreenProps {
  platform: 'desktop' | 'mobile';
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ platform, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('Initializing system kernel...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  const isDesktop = platform === 'desktop';
  const greeting = isDesktop ? "Welcome to Abinash's macOS" : "Abinash iOS";
  const targetRole = "Data Analyst / Machine Learning Engineer";

  useEffect(() => {
    sound.appOpen?.();

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = isDesktop ? Math.random() * 12 + 8 : Math.random() * 10 + 10;
        const next = Math.min(100, prev + increment);

        if (next < 30) {
          setStageText('Loading predictive AI models & telemetry...');
        } else if (next < 65) {
          setStageText('Configuring Neural Engine & Analytics Lab...');
        } else if (next < 90) {
          setStageText('Verifying Oracle & Cloud credentials...');
        } else {
          setStageText('System Ready. Entering Secure Session...');
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              onComplete();
            }, 600);
          }, 350);
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isDesktop, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center select-none bg-radial from-[#071329] via-[#030814] to-[#01040a] text-white transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient glowing background aura */}
      <div className="absolute w-[360px] sm:w-[540px] h-[360px] sm:h-[540px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/25 to-indigo-600/20 rounded-full blur-[110px] pointer-events-none animate-pulse" />

      {/* Main Container Card */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center animate-in fade-in zoom-in-95 duration-500">
        
        {/* Platform Greeting Pill */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-medium tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.25)] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>{greeting}</span>
        </div>

        {/* Avatar with glowing electric ring */}
        <div className="relative mb-5 group">
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 opacity-75 blur-md group-hover:opacity-100 transition-opacity animate-spin" style={{ animationDuration: '6s' }} />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/90 shadow-2xl bg-neutral-900 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              alt="Abinash Swain"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* 1. Who you are: Abinash Swain */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)]">
          {portfolioData.name}
        </h1>

        {/* 2. For what role: Data Analyst / Machine Learning Engineer */}
        <div className="mt-1.5 text-sm sm:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-300">
          {targetRole}
        </div>

        {/* 3. How to contact you: Email + LinkedIn */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-neutral-300">
          <a
            href={`mailto:${portfolioData.email}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:border-cyan-400/50 hover:text-cyan-300 transition-all cursor-pointer backdrop-blur-md"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono">{portfolioData.email}</span>
          </a>
          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:border-blue-400/50 hover:text-blue-300 transition-all cursor-pointer backdrop-blur-md"
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-400" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Dynamic Loading Element (Mobile: Horizontal glowing bar; Desktop: Spinner + glowing bar) */}
        <div className="w-full mt-8 flex flex-col items-center">
          {isDesktop ? (
            /* Desktop spinner + status */
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-4 h-4 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
              <span className="text-xs text-neutral-400 font-mono tracking-tight">{stageText}</span>
            </div>
          ) : (
            <div className="text-[11px] text-neutral-400 font-mono mb-2 tracking-tight">{stageText}</div>
          )}

          {/* Premium Glowing Progress Track */}
          <div className="w-full h-2 rounded-full bg-white/10 border border-white/15 overflow-hidden p-0.5 shadow-inner backdrop-blur-md relative">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-all duration-150 ease-out shadow-[0_0_14px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="w-full flex justify-between items-center mt-2 px-1 text-[10px] font-mono text-neutral-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Encrypted Session
            </span>
            <span className="font-bold text-cyan-400">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
