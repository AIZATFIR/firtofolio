import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Disc, ChevronRight, Hash, Compass, MousePointer } from 'lucide-react';

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

/**
 * TactileSideScrubber Component
 * 
 * Physical 3/4 Circular Glider Trackball slider on the left screen edge.
 * - Semicircular convex glider protruding from the left edge.
 * - Fused Skiper94 & Skiper95 real-time clip-path liquid progress fill & inverted percentage.
 * - Interactive slide-scrubbing: Drag up/down to slide the entire portfolio.
 * - Click to expand radial radar menu.
 */
export default function TactileSideScrubber() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [activeShort, setActiveShort] = useState('00');
  const [isDragging, setIsDragging] = useState(false);
  const [percentageNumber, setPercentageNumber] = useState(0);

  const startYRef = useRef(0);
  const startScrollRef = useRef(0);
  const trackballRef = useRef(null);

  // Framer Motion Scroll Progress
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Track numerical percentage
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const p = Math.max(0, Math.min(100, Math.round(latest * 100)));
      setPercentageNumber(p);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Monitor active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          setActiveShort(SECTIONS[i].short);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 select-none flex items-center">
      {/* 1-Click Expandable Radar HUD Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="ml-9 py-4 px-3.5 rounded-[24px] bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-2xl backdrop-blur-xl w-56 max-h-[75vh] overflow-y-auto flex flex-col gap-1 z-50 text-[var(--color-text)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-border)] px-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-orange)] flex items-center gap-1.5">
                <Compass size={12} className="animate-spin" />
                <span>Scroll Radar • {String(percentageNumber).padStart(2, '0')}%</span>
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="font-mono text-[10px] text-[var(--color-muted)] hover:text-[var(--color-text)] cursor-pointer"
                title="Close"
              >
                ✕
              </button>
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
                    className={`group flex items-center justify-between py-1.5 px-2.5 rounded-lg text-left transition-all cursor-pointer font-mono text-xs ${
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
          whileHover={{ x: 8, scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className={`relative cursor-grab active:cursor-grabbing flex flex-col items-center justify-between py-4 px-1.5 rounded-r-[48px] border-y-2 border-r-2 border-[var(--color-text)] shadow-2xl transition-all duration-300 overflow-hidden select-none ${
            isExpanded
              ? 'w-12 sm:w-14 h-48 bg-[var(--color-surface-tint)] shadow-[8px_0_30px_rgba(255,111,30,0.3)]'
              : 'w-9 sm:w-11 h-44 bg-[var(--color-card-bg)] hover:w-12'
          }`}
          style={{
            boxShadow: '8px 0 28px rgba(0,0,0,0.25), inset 3px 0 8px rgba(255,255,255,0.3)',
          }}
          title="Drag up/down to slide portfolio • Click to open radar"
        >
          {/* Dynamic Orange Liquid Progress Fill */}
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-[var(--color-orange)] pointer-events-none origin-bottom"
            style={{
              height: fillHeightTransform,
              boxShadow: '0 0 16px rgba(255, 111, 30, 0.8)',
            }}
          />

          {/* ============ LAYER 1: BASE UNFILLED STATE (Dark/Muted Text) ============ */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between items-center pointer-events-none font-mono text-[9px] font-bold text-[var(--color-muted)]">
            <span className="tracking-tighter">{activeShort}</span>

            {/* Tactical Glider Arc Ribs */}
            <div className="flex flex-col gap-1.5 items-center my-auto opacity-75">
              <span className="w-3.5 h-[1.5px] rounded-full bg-current" />
              <span className="w-2 h-[1px] rounded-full bg-current" />
              <span className="w-4 h-[2px] rounded-full bg-current shadow-xs" />
              <span className="w-2 h-[1px] rounded-full bg-current" />
              <span className="w-3.5 h-[1.5px] rounded-full bg-current" />
            </div>

            <span className="tracking-tighter font-mono">
              {String(percentageNumber).padStart(2, '0')}%
            </span>
          </div>

          {/* ============ LAYER 2: INVERTED WHITE TEXT VIA CLIP-PATH ============ */}
          <motion.div
            className="absolute inset-0 z-20 w-full h-full py-4 px-1.5 flex flex-col justify-between items-center pointer-events-none font-mono text-[9px] font-bold text-white select-none"
            style={{
              clipPath: useTransform(clipBottomTransform, (val) => `inset(0 0 ${val} 0)`),
            }}
          >
            <span className="tracking-tighter drop-shadow-xs">{activeShort}</span>

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
  );
}
