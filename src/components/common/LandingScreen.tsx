import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Linkedin, Mail, Menu, X } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { sound } from '../../utils/audioHaptics';

interface LandingScreenProps {
  onExplore: () => void;
  onResume?: () => void;
}

const profileImage = 'https://media.licdn.com/dms/image/v2/D4D03AQHu8iauv0OdlA/profile-displayphoto-scale_400_400/B4DZ_ILs1ZIoAk-/0/1785769943899?e=1789603200&v=beta&t=OOZYTjy226VAOPwWen2qM1sN7U2FZai2zeoktl60x-g';

export const LandingScreen: React.FC<LandingScreenProps> = ({ onExplore, onResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [activeVideo, setActiveVideo] = useState<0 | 1>(0);
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const videoSwitchingRef = useRef(false);
  const videoResetTimerRef = useRef<number | null>(null);
  const videoSource = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4';

  useEffect(() => () => {
    if (videoResetTimerRef.current !== null) window.clearTimeout(videoResetTimerRef.current);
  }, []);

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

  const enterPortfolio = () => {
    if (isLeaving) return;
    sound.landingOpenChime();
    setMobileMenuOpen(false);
    setIsLeaving(true);
    onExplore();
  };

  return (
    <main className={`foldcraft-landing ${isLeaving ? 'foldcraft-landing--leaving' : ''}`}>
      {[0, 1].map((index) => (
        <video
          key={index}
          ref={videoRefs[index]}
          className={`foldcraft-video ${activeVideo === index ? 'foldcraft-video--active' : ''}`}
          autoPlay={index === 0}
          muted
          playsInline
          preload={index === 0 ? 'auto' : 'metadata'}
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

      <motion.nav className="foldcraft-nav" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} aria-label="Portfolio navigation">
        <div className="foldcraft-nav-inner">
          <button className="foldcraft-wordmark" onClick={() => setMobileMenuOpen(false)} aria-label={`${portfolioData.name} home`}>ABINASH SWAIN</button>
          <div className="foldcraft-desktop-links">
            <button onClick={() => setMobileMenuOpen(false)}>Home</button>
            <button onClick={enterPortfolio}>About</button>
            <button onClick={enterPortfolio}>Projects</button>
            <button onClick={enterPortfolio}>Skills</button>
            <a href={`mailto:${portfolioData.email}`}>Contact</a>
          </div>
          <div className="foldcraft-nav-actions">
            <button className="foldcraft-talk" onClick={onResume || enterPortfolio}>View Portfolio</button>
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
              <button onClick={() => setMobileMenuOpen(false)}>Home</button>
              <button onClick={enterPortfolio}>About</button>
              <button onClick={enterPortfolio}>Projects</button>
              <button onClick={enterPortfolio}>Skills</button>
              <a href={`mailto:${portfolioData.email}`} onClick={() => setMobileMenuOpen(false)}>Reach Us</a>
              <button className="foldcraft-mobile-cta" onClick={onResume || enterPortfolio}>View Portfolio <ArrowRight size={18} /></button>
            </div>
          </motion.div>}
        </AnimatePresence>
      </motion.nav>

      <section className="foldcraft-hero" id="landing-hero">
        <div className="foldcraft-hero-top">
          <motion.div className="foldcraft-profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}><img src={profileImage} alt={portfolioData.name} referrerPolicy="no-referrer" /></motion.div>
          <motion.p className="foldcraft-eyebrow" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>AI · MACHINE LEARNING · DATA ANALYTICS</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4, duration: .8 }}>{portfolioData.name}</motion.h1>
          <motion.p className="foldcraft-hero-role" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }}>AI/ML Engineer · Data Analyst · RAG Systems Specialist</motion.p>
        </div>
        <div className="foldcraft-hero-bottom">
          <motion.p className="foldcraft-bio" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 }}>Building grounded RAG systems, autonomous AI copilots, and practical machine learning products that turn complex data into clear decisions.</motion.p>
          <motion.div className="foldcraft-cta-row" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9 }}>
            <button className="foldcraft-primary-cta" onClick={enterPortfolio} disabled={isLeaving}>Explore Work <ArrowRight size={16} /></button>
            <button className="foldcraft-secondary-cta" onClick={onResume || enterPortfolio}>View Resume</button>
            <a className="foldcraft-secondary-cta" href={`mailto:${portfolioData.email}`}><Mail size={16} /> Email Me</a>
            <a className="foldcraft-secondary-cta" href={portfolioData.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
          </motion.div>
          <motion.div className="foldcraft-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}><span>{portfolioData.projects.length}+ projects</span><i /><span>RAG &amp; AI Assistants · ML Systems</span><i /><span>Open to full-time roles</span></motion.div>
        </div>
      </section>
    </main>
  );
};
