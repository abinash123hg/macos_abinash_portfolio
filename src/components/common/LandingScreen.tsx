import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Battery, Linkedin, Mail, Menu, X } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { sound } from '../../utils/audioHaptics';

interface LandingScreenProps {
  onExplore: (destination?: LandingDestination) => void;
  onResume?: () => void;
  showSystemHud?: boolean;
}

export type LandingDestination = 'home' | 'about' | 'projects' | 'skills' | 'contact';

const profileImage = 'https://media.licdn.com/dms/image/v2/D4D03AQHu8iauv0OdlA/profile-displayphoto-scale_400_400/B4DZ_ILs1ZIoAk-/0/1785769943899?e=1789603200&v=beta&t=OOZYTjy226VAOPwWen2qM1sN7U2FZai2zeoktl60x-g';

export const LandingScreen: React.FC<LandingScreenProps> = ({ onExplore, onResume, showSystemHud = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [activeNav, setActiveNav] = useState<LandingDestination>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [batteryPercent, setBatteryPercent] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<0 | 1>(0);
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const videoSwitchingRef = useRef(false);
  const videoResetTimerRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const videoSource = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4';

  useEffect(() => () => {
    if (videoResetTimerRef.current !== null) window.clearTimeout(videoResetTimerRef.current);
    if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
  }, []);

  useEffect(() => {
    if (!showSystemHud) return;

    const timer = window.setInterval(() => setNow(new Date()), 1000);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    type BatteryManager = EventTarget & { level: number; addEventListener: (type: string, listener: EventListener) => void; removeEventListener: (type: string, listener: EventListener) => void };
    const getBattery = (navigator as Navigator & { getBattery?: () => Promise<BatteryManager> }).getBattery;
    let battery: BatteryManager | null = null;
    const updateBattery = (event?: Event) => {
      const target = (event?.currentTarget || battery) as BatteryManager | null;
      if (target) setBatteryPercent(Math.round(target.level * 100));
    };

    if (getBattery) {
      void getBattery().then((result) => {
        battery = result;
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
      });
    }

    return () => {
      window.clearInterval(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      battery?.removeEventListener('levelchange', updateBattery);
    };
  }, [showSystemHud]);

  const dateParts = new Intl.DateTimeFormat('en-US', { weekday: 'short', day: '2-digit', month: 'short' }).formatToParts(now);
  const weekday = dateParts.find((part) => part.type === 'weekday')?.value || '';
  const day = dateParts.find((part) => part.type === 'day')?.value || '';
  const month = dateParts.find((part) => part.type === 'month')?.value || '';
  const time = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(now);

  const handleVideoProgress = (index: 0 | 1) => {
    if (index !== activeVideo || videoSwitchingRef.current) return;
    const video = videoRefs[index].current;
    if (!video || !video.duration || video.duration - video.currentTime > 0.8) return;

    const nextIndex = index === 0 ? 1 : 0;
    const nextVideo = videoRefs[nextIndex].current;
    if (!nextVideo) return;
    videoSwitchingRef.current = true;
    nextVideo.currentTime = 0;
    void nextVideo.play();
    setActiveVideo(nextIndex);
    videoResetTimerRef.current = window.setTimeout(() => {
      video.pause();
      video.currentTime = 0;
      videoSwitchingRef.current = false;
    }, 750);
  };

  const enterPortfolio = (destination: LandingDestination = 'home') => {
    if (isLeaving) return;
    sound.landingOpenChime();
    setMobileMenuOpen(false);
    setActiveNav(destination);
    setIsLeaving(true);
    transitionTimerRef.current = window.setTimeout(() => onExplore(destination), 520);
  };

  const navigateTo = (destination: LandingDestination) => {
    setActiveNav(destination);
    enterPortfolio(destination);
  };

  return (
    <main className={`foldcraft-landing ${isLeaving ? 'foldcraft-landing--leaving' : ''}`} onScroll={(event) => setIsScrolled(event.currentTarget.scrollTop > 8)}>
      {[0, 1].map((index) => (
        <video
          key={index}
          ref={videoRefs[index]}
          className={`foldcraft-video ${activeVideo === index ? 'foldcraft-video--active' : ''}`}
          autoPlay={index === 0}
          muted
          playsInline
          preload={index === 0 ? 'metadata' : 'none'}
          aria-hidden="true"
          onTimeUpdate={() => handleVideoProgress(index as 0 | 1)}
          onEnded={(event) => {
            event.currentTarget.currentTime = 0;
            void event.currentTarget.play();
          }}
        >
          <source src={videoSource} type="video/mp4" />
        </video>
      ))}
      <div className="foldcraft-video-overlay" aria-hidden="true" />

      {showSystemHud && (
        <div className="foldcraft-system-hud" aria-live="off" aria-label="Local time, battery, and network status">
          <span>{weekday}, {day} {month}</span>
          <i aria-hidden="true">·</i>
          <time dateTime={now.toISOString()}>{time}</time>
          <i aria-hidden="true">·</i>
          <span className="foldcraft-system-hud__network">
            <b className={isOnline ? 'foldcraft-system-hud__dot--online' : 'foldcraft-system-hud__dot--offline'} aria-hidden="true" />
            {isOnline ? 'Online' : 'Offline'}
          </span>
          {batteryPercent !== null && <><i aria-hidden="true">·</i><span className="foldcraft-system-hud__battery"><Battery size={12} aria-hidden="true" /> {batteryPercent}%</span></>}
        </div>
      )}

      <motion.nav className={`foldcraft-nav ${isScrolled ? 'foldcraft-nav--scrolled' : ''}`} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} aria-label="Portfolio navigation">
        <div className="foldcraft-nav-inner">
            <button className={`foldcraft-wordmark ${activeNav === 'home' ? 'foldcraft-nav-item--active' : ''}`} onClick={() => navigateTo('home')} aria-label={`${portfolioData.name} home`}>ABINASH SWAIN</button>
          <div className="foldcraft-desktop-links">
            <button className={activeNav === 'home' ? 'foldcraft-nav-item--active' : ''} onClick={() => navigateTo('home')}>Home</button>
            <button className={activeNav === 'about' ? 'foldcraft-nav-item--active' : ''} onClick={() => navigateTo('about')}>About Me</button>
            <button className={activeNav === 'projects' ? 'foldcraft-nav-item--active' : ''} onClick={() => navigateTo('projects')}>Work</button>
            <button className={activeNav === 'skills' ? 'foldcraft-nav-item--active' : ''} onClick={() => navigateTo('skills')}>Expertise</button>
            <button className={activeNav === 'contact' ? 'foldcraft-nav-item--active' : ''} onClick={() => navigateTo('contact')}>Contact</button>
          </div>
          <div className="foldcraft-nav-actions">
            <button className="foldcraft-talk" onClick={() => enterPortfolio('home')}>Enter Portfolio</button>
            <button className="foldcraft-menu-button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen}>
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? <motion.span key="close" initial={{ opacity: 0, rotate: -90, scale: .7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: .7 }} transition={{ duration: .3 }}><X size={21} /></motion.span> : <motion.span key="menu" initial={{ opacity: 0, rotate: 90, scale: .7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: -90, scale: .7 }} transition={{ duration: .3 }}><Menu size={21} /></motion.span>}
              </AnimatePresence>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && <motion.div className="foldcraft-mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: '100svh' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .5, ease: [0.16, 1, 0.3, 1] }}>
            <div className="foldcraft-mobile-links">
              <button onClick={() => navigateTo('home')}>Home</button>
              <button onClick={() => navigateTo('about')}>About Me</button>
              <button onClick={() => navigateTo('projects')}>Work</button>
              <button onClick={() => navigateTo('skills')}>Expertise</button>
              <button onClick={() => navigateTo('contact')}>Contact</button>
              <button className="foldcraft-mobile-cta" onClick={() => enterPortfolio('home')}>Enter Portfolio <ArrowRight size={18} /></button>
            </div>
          </motion.div>}
        </AnimatePresence>
      </motion.nav>

      <section className="foldcraft-hero" id="landing-hero">
        <div className="foldcraft-hero-top">
          <motion.div className="foldcraft-profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}><img src={profileImage} alt={portfolioData.name} width="400" height="400" referrerPolicy="no-referrer" /></motion.div>
          <motion.p className="foldcraft-eyebrow" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>AI · MACHINE LEARNING · DATA ANALYTICS</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4, duration: .8 }}>{portfolioData.name}</motion.h1>
          <motion.p className="foldcraft-hero-role" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }}>AI/ML Engineer delivering scalable, measurable intelligence</motion.p>
        </div>
        <div className="foldcraft-hero-bottom">
          <motion.p className="foldcraft-bio" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 }}>I build machine learning and analytics systems that improve operational decisions, automate insight generation, and create measurable business value. My 5G KPI platform achieved 96.2% accuracy and a 96.5% F1-score across 5,000+ telemetry records.</motion.p>
          <motion.div className="foldcraft-cta-row" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9 }}>
            <button className="foldcraft-primary-cta" onClick={() => enterPortfolio('projects')} disabled={isLeaving}>Explore Work <ArrowRight size={16} /></button>
            <button className="foldcraft-secondary-cta" onClick={() => onResume ? onResume() : enterPortfolio('home')}>View Resume</button>
            <a className="foldcraft-secondary-cta" href={`mailto:${portfolioData.email}`}><Mail size={16} /> Email Me</a>
            <a className="foldcraft-secondary-cta" href={portfolioData.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
          </motion.div>
          <motion.div className="foldcraft-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}><span>96.2% Accuracy</span><i /><span>96.5% F1-Score</span><i /><span>5,000+ Telemetry Records</span></motion.div>
        </div>
      </section>
    </main>
  );
};
