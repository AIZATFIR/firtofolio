import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Compass, X } from 'lucide-react';

const SECTIONS = [
  { id: 'intro', label: 'INTRO', short: '00' },
  { id: 'project-focus-clock', label: 'FOCUS CLOCK', short: '01' },
  { id: 'project-7audio', label: '7AUDIO', short: '02' },
  { id: 'project-rync432', label: 'RYNC432', short: '03' },
  { id: 'project-qurabic', label: 'QURABIC', short: '04' },
  { id: 'project-terraflow', label: 'TERRA FLOW', short: '05' },
  { id: 'project-social-affinity', label: 'SOCIAL AFFINITY', short: '06' },
  { id: 'project-fitrah-launcher', label: 'FITRAH LAUNCHER', short: '07' },
  { id: 'project-sadar', label: 'SADAR', short: '08' },
  { id: 'art', label: 'ART', short: '09' },
  { id: 'writing', label: 'WRITING', short: '10' },
  { id: 'gallery', label: 'GALLERY', short: '11' },
  { id: 'contact', label: 'CONTACT', short: '12' },
];

export default function TactileSideScrubber() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [activeShort, setActiveShort] = useState('00');
  const [isDragging, setIsDragging] = useState(false);
  const [percentageNumber, setPercentageNumber] = useState(0);

  const startYRef = useRef(0);
  const startScrollRef = useRef(0);
  const trackballRef = useRef(null);
  const lastPercentRef = useRef(0);

  // Framer Motion Scroll Progress
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    mass: 0.1,
  });

  // Track numerical percentage with integer throttling (prevents unnecessary re-renders)
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const p = Math.max(0, Math.min(100, Math.round(latest * 100)));
      if (p !== lastPercentRef.current) {
        lastPercentRef.current = p;
        setPercentageNumber(p);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // High-performance IntersectionObserver for active section tracking
  useEffect(() => {
    const sectionElements = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const found = SECTIONS.find(s => s.id === entry.target.id);
            if (found) {
              setActiveSection(found.id);
              setActiveShort(found.short);
            }
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    sectionElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Skiper94/95 Clip-path Transforms
  const fillHeightTransform = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const clipBottomTransform = useTransform(smoothProgress, [0, 1], ['100%', '0%']);

  // Handle Drag / Scrubbing
  const handlePointerDown = (e) => {
    setIsDragging(true);
    startYRef.current = e.clientY;
    startScrollRef.current = window.scrollY;
    document.body.style.userSelect = 'none';

    const handlePointerMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startYRef.current;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDelta = deltaY * (totalHeight / 260);
      const targetScroll = Math.max(0, Math.min(totalHeight, startScrollRef.current + scrollDelta));
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'auto'
      });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
  };

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  return (
    <>
      {/* Click outside backdrop to smoothly close radar */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 z-35 bg-black/20"
          />
        )}
      </AnimatePresence>

      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 select-none flex items-center">
        {/* 1-Click Expandable Radar HUD Panel */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              key="glider-radar"
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="ml-9 py-4 px-3.5 rounded-[24px] bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-2xl w-56 max-h-[75vh] overflow-y-auto flex flex-col gap-1 z-50 text-[var(--color-text)]"
            >
              {/* Header with Animated Close Button */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-border)] px-1">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-orange)] flex items-center gap-1.5">
                  <Compass size={12} className="animate-spin" />
                  <span>Scroll Radar • {String(percentageNumber).padStart(2, '0')}%</span>
                </span>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-full text-[var(--color-muted)] hover:text-[var(--color-orange)] hover:bg-[var(--color-surface-tint)] transition-colors cursor-pointer"
                  title="Close Radar (Esc)"
                >
                  <X size={13} />
                </motion.button>
              </div>

              {/* Section Index list */}
              <div className="flex flex-col gap-1">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        scrollToSection(sec.id);
                        setIsExpanded(false);
                      }}
                      className={`group flex items-center justify-between py-1.5 px-2.5 rounded-lg text-left transition-colors cursor-pointer font-mono text-xs ${
                        isActive
                          ? 'bg-[var(--color-surface-tint)] text-[var(--color-orange)] font-bold border border-[var(--color-border)]'
                          : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-tint)]'
                      }`}
                    >
                      <span className="truncate pr-2">{sec.label}</span>
                      <span className="text-[10px] opacity-70 shrink-0 font-mono">
                        {sec.short}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Semicircular Convex Glider Arc Protruding from Left Edge */}
        <div className="relative flex items-center">
          <motion.div
            ref={trackballRef}
            onPointerDown={handlePointerDown}
            onClick={() => {
              if (!isDragging) setIsExpanded((prev) => !prev);
            }}
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.96 }}
            className={`relative cursor-grab active:cursor-grabbing flex flex-col items-center justify-between py-4 px-1.5 rounded-r-[48px] border-y-2 border-r-2 border-[var(--color-text)] shadow-xl transition-all duration-200 overflow-hidden select-none will-change-transform ${
              isExpanded
                ? 'w-12 sm:w-14 h-48 bg-[var(--color-surface-tint)] shadow-[6px_0_24px_rgba(255,111,30,0.25)]'
                : 'w-9 sm:w-11 h-44 bg-[var(--color-card-bg)] hover:w-12'
            }`}
            title={isExpanded ? "Click to close radar" : "Drag up/down to slide • Click to open radar"}
          >
            {/* Dynamic Orange Liquid Progress Fill (GPU scaleY) */}
            <motion.div
              className="absolute inset-0 bg-[var(--color-orange)] pointer-events-none origin-bottom will-change-transform"
              style={{
                scaleY: smoothProgress,
                transformOrigin: 'bottom',
              }}
            />

            {/* LAYER 1: BASE UNFILLED STATE */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between items-center pointer-events-none font-mono text-[9px] font-bold text-[var(--color-muted)] overflow-hidden">
              {/* Rolling Indicator */}
              <div className="h-4 relative flex items-center justify-center overflow-hidden w-full">
                <span className="tracking-tighter inline-block text-center font-bold">
                  {activeShort}
                </span>
              </div>

              {/* Glider Arc Ribs */}
              <div className="flex flex-col gap-1.5 items-center my-auto opacity-75">
                <span className="w-3.5 h-[1.5px] rounded-full bg-current" />
                <span className="w-2 h-[1px] rounded-full bg-current" />
                <span className="w-4 h-[2px] rounded-full bg-current" />
                <span className="w-2 h-[1px] rounded-full bg-current" />
                <span className="w-3.5 h-[1.5px] rounded-full bg-current" />
              </div>

              <span className="tracking-tighter font-mono">
                {String(percentageNumber).padStart(2, '0')}%
              </span>
            </div>

            {/* LAYER 2: INVERTED WHITE TEXT VIA CLIP-PATH */}
            <motion.div
              className="absolute inset-0 z-20 w-full h-full py-4 px-1.5 flex flex-col justify-between items-center pointer-events-none font-mono text-[9px] font-bold text-white select-none overflow-hidden will-change-transform"
              style={{
                clipPath: useTransform(clipBottomTransform, (val) => `inset(0 0 ${val} 0)`),
              }}
            >
              <div className="h-4 relative flex items-center justify-center overflow-hidden w-full">
                <span className="tracking-tighter drop-shadow-xs inline-block text-center font-bold">
                  {activeShort}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 items-center my-auto opacity-95">
                <span className="w-3.5 h-[1.5px] rounded-full bg-white drop-shadow-xs" />
                <span className="w-2 h-[1px] rounded-full bg-white" />
                <span className="w-4 h-[2px] rounded-full bg-white drop-shadow-xs" />
                <span className="w-2 h-[1px] rounded-full bg-white" />
                <span className="w-3.5 h-[1.5px] rounded-full bg-white drop-shadow-xs" />
              </div>

              <span className="tracking-tighter drop-shadow-xs font-mono">
                {String(percentageNumber).padStart(2, '0')}%
              </span>
            </motion.div>
          </motion.div>

          {/* Hover Hint */}
          {!isExpanded && (
            <div className="absolute left-full ml-2 pointer-events-none opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity">
              <span className="font-mono text-[9px] text-[var(--color-muted)] bg-[var(--color-card-bg)] border border-[var(--color-border)] px-1.5 py-0.5 rounded shadow-xs">
                GLIDER
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
