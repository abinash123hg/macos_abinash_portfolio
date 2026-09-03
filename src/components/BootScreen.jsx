import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/portfolioData";
import { Image } from "@/components/ui/image";

// Cinematic boot animation — macOS on desktop, iOS on mobile.
export default function BootScreen({ isMobile, onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(onDone, 300);
          return 100;
        }
        return p + Math.random() * 25 + 10;
      });
    }, 120);

    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-black select-none pointer-events-auto"
      style={{ willChange: 'opacity' }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-blue-600/15 blur-3xl opacity-80" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex flex-col items-center"
      >
        <div className="relative">
          <Image
            src={profile.avatar}
            alt=""
            className="relative h-20 w-20 rounded-full object-cover ring-2 ring-white/20 shadow-xl"
          />
        </div>

        <h1 className="mt-5 text-xl font-light tracking-wide text-white/90">
          {profile.name}
        </h1>

        <p className="mt-1 text-xs text-cyan-300/80">
          {isMobile ? "iPhone" : "macOS"} · Abinash OS
        </p>

        {isMobile ? (
          <div className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full bg-white/90 transition-all duration-150 ease-out"
              style={{ width: `${Math.min(100, progress)}%`, willChange: 'width' }}
            />
          </div>
        ) : (
          <div className="mt-8">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
