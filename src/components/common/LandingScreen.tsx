import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { sound } from '../../utils/audioHaptics';
import landingVideo from '../../assets/video/34301-400974283_medium.mp4';

// Below-the-fold landing sections load in a separate chunk so the hero and
// navigation stay in the smallest possible initial bundle.
const LandingSections = lazy(() => import('./LandingSections').then((m) => ({ default: m.LandingSections })));

interface LandingScreenProps {
  onExplore: (destination?: LandingDestination) => void;
  onResume?: () => void;
  showSystemHud?: boolean;
}

export type LandingDestination = 'home' | 'about' | 'work' | 'expertise' | 'contact';

// Locally optimized WebP portrait (192px + 384px @2x) served from this origin.
const PROFILE_IMAGE_192 = '/assets/images/abinash-profile-192.webp';
const PROFILE_IMAGE_384 = '/assets/images/abinash-profile-384.webp';
const profileImageSrcSet = `${PROFILE_IMAGE_192} 1x, ${PROFILE_IMAGE_384} 2x`;

export const LandingScreen: React.FC<LandingScreenProps> = ({ onExplore, onResume, showSystemHud = false }) => {
  const landingRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<LandingDestination>('home');
  const [isLeaving, setIsLeaving] = useState(false);
  const [landingTheme, setLandingTheme] = useState<'day' | 'night'>('night');
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const shouldAvoidVideo = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || connection?.saveData
      || ['slow-2g', '2g'].includes(connection?.effectiveType ?? '')
      || window.matchMedia('(max-width: 767px)').matches;

    if (shouldAvoidVideo) return;

    const loadVideo = () => setShouldLoadVideo(true);
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(loadVideo, { timeout: 2500 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(loadVideo, 1800);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const navItems = [
    { id: 'home' as LandingDestination, label: 'Home' },
    { id: 'about' as LandingDestination, label: 'About' },
    { id: 'work' as LandingDestination, label: 'Work' },
    { id: 'expertise' as LandingDestination, label: 'Expertise' },
    { id: 'contact' as LandingDestination, label: 'Contact' },
  ];

  const navigateTo = (destination: LandingDestination) => {
    setActiveNav(destination);
    let attempts = 0;
    const scrollToTarget = () => {
      const target = landingRef.current?.querySelector<HTMLElement>(`#${destination}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (attempts < 20) {
        attempts += 1;
        window.setTimeout(scrollToTarget, 50);
      }
    };
    scrollToTarget();
    setMobileMenuOpen(false);
  };

  const enterPortfolio = (destination: LandingDestination = 'work') => {
    if (isLeaving) return;
    sound.landingOpenChime();
    setActiveNav(destination);
    setIsLeaving(true);
    transitionTimerRef.current = window.setTimeout(() => onExplore(destination), 420);
  };

  return (
    <div ref={landingRef} className={`portfolio-landing portfolio-landing--${landingTheme}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {shouldLoadVideo && (
        <video className="portfolio-video" autoPlay muted loop playsInline preload="none" aria-hidden="true">
          <source src={landingVideo} type="video/mp4" />
        </video>
      )}
      <div className="portfolio-video-overlay" aria-hidden="true" />

      <header className="portfolio-header">
        <nav className="portfolio-nav" aria-label="Main">
          <a className="portfolio-brand" href="#home">ABINASH SWAIN</a>

          <div className="portfolio-desktop-links">
            {navItems.map((item) => (
              <a className={activeNav === item.id ? 'active' : ''} key={item.id} href={item.id === 'work' ? '#work' : `#${item.id}`} onClick={(e) => { e.preventDefault(); navigateTo(item.id); }}>{item.label}</a>
            ))}
          </div>

          <div className="portfolio-nav-actions">
            {showSystemHud && (
              <div className="portfolio-mode-toggle" aria-label="Landing page theme">
                <button
                  className={`portfolio-mode-button ${landingTheme === 'day' ? 'active' : ''}`}
                  aria-pressed={landingTheme === 'day'}
                  onClick={() => setLandingTheme('day')}
                >
                  <Sun size={14} />
                  <span>Day</span>
                </button>
                <button
                  className={`portfolio-mode-button ${landingTheme === 'night' ? 'active' : ''}`}
                  aria-pressed={landingTheme === 'night'}
                  onClick={() => setLandingTheme('night')}
                >
                  <Moon size={14} />
                  <span>Night</span>
                </button>
              </div>
            )}
            <button className="portfolio-enter" onClick={() => enterPortfolio('work')}>Enter Portfolio</button>
            <button className="portfolio-menu-button" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-controls="mobile-navigation" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div id="mobile-navigation" className="portfolio-mobile-menu portfolio-mobile-menu--enter">
            <button className="portfolio-mobile-close" aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)}><X size={22} /></button>
            <div className="portfolio-mobile-links">
              {navItems.map((item) => (
                <a key={item.id} href={item.id === 'work' ? '#work' : `#${item.id}`} onClick={(e) => { e.preventDefault(); navigateTo(item.id); }}>{item.label}</a>
              ))}
              <button className="portfolio-mobile-enter" onClick={() => enterPortfolio('work')}>Enter Portfolio</button>
            </div>
          </div>
        )}
      </header>

      <main id="main-content" className="portfolio-main">
        <section id="home" className="portfolio-hero">
          <div className="portfolio-hero-copy">
            {showSystemHud && (
              <div className="portfolio-hero-photo-wrap portfolio-hero-photo-wrap--inline">
                <div className="portfolio-photo-frame">
                  <img
                    src={PROFILE_IMAGE_192}
                    srcSet={profileImageSrcSet}
                    sizes="160px"
                    alt="Abinash Swain, AI and machine learning developer"
                    width="192"
                    height="192"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}
            <div className="portfolio-hero-kicker">AI · MACHINE LEARNING · DATA ANALYTICS</div>
            <h1>Abinash Swain</h1>
            <div className="portfolio-hero-label">AI/ML Developer · RAG · LLMs · MCP · Data Analytics</div>
            <div className="portfolio-hero-headline">Building practical AI systems from data to intelligent decisions.</div>
            <p className="portfolio-hero-description">I build practical AI and data-driven applications using machine learning, LLMs, RAG, MCP, AI agents, and data analytics. My focus is on turning technical concepts into useful, working solutions.</p>

            <div className="portfolio-hero-actions">
              <a className="portfolio-button portfolio-button--primary" href="#home" onClick={(event) => { event.preventDefault(); enterPortfolio('work'); }}>
                <span>Enter Portfolio</span>
                <ArrowDown size={16} />
              </a>

              <a className="portfolio-button portfolio-button--secondary" href="/Abinash-Swain-Resume.pdf" download aria-label="Download Abinash Swain's resume (PDF)">
                <Download size={16} />
                <span>View Resume</span>
              </a>

              <div className="portfolio-socials">
                <a aria-label="Visit Abinash Swain's GitHub profile" target="_blank" rel="noreferrer" href={portfolioData.github}><Github size={16} />GitHub</a>
                <a aria-label="Visit Abinash Swain's LinkedIn profile" target="_blank" rel="noreferrer" href={portfolioData.linkedin}><Linkedin size={16} />LinkedIn</a>
                <a aria-label="Email Abinash Swain" href={`mailto:${portfolioData.email}`}>
                  <Mail size={16} />Email
                </a>
              </div>
            </div>

            <div className="portfolio-availability">
              <Sparkles size={14} />
              Available for AI/ML opportunities
            </div>
          </div>

          {!showSystemHud && (
            <div className="portfolio-hero-photo-wrap">
              <div className="portfolio-photo-frame">
                <img
                  src={PROFILE_IMAGE_192}
                  srcSet={profileImageSrcSet}
                  sizes="280px"
                  alt="Abinash Swain, AI and machine learning developer"
                  width="192"
                  height="192"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="portfolio-photo-grid">
                <span></span><span></span><span></span><span></span>
              </div>
            </div>
          )}
        </section>

        <Suspense fallback={null}>
          <LandingSections showSystemHud={showSystemHud} />
        </Suspense>
      </main>

      <footer className="portfolio-footer">
        <div className="portfolio-footer-inner">
          <div>
            <span className="portfolio-footer-name">Abinash Swain</span>
            <span className="portfolio-footer-role">AI/ML Developer · RAG · LLMs · MCP · Data Analytics</span>
          </div>
          <div className="portfolio-footer-links">
            <a href={portfolioData.github} target="_blank" rel="noreferrer" aria-label="Visit Abinash Swain's GitHub profile">GitHub</a>
            <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" aria-label="Visit Abinash Swain's LinkedIn profile">LinkedIn</a>
            <a href={`mailto:${portfolioData.email}`} aria-label={`Email Abinash Swain at ${portfolioData.email}`}>Email</a>
          </div>
          <span className="portfolio-footer-copy">© 2026 Abinash Swain</span>
        </div>
      </footer>
    </div>
  );
};