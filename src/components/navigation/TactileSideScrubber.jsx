import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Disc, Layers } from 'lucide-react';

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
 * Physical retro-futuristic jog-wheel / trackball slider on the left screen edge.
 * - Semicircular convex wheel protruding from the left edge (resembling a classic mouse ball / arcade trackball).
 * - Click to expand into an interactive tactile scrubbing panel.
 * - Interactive slide-scrubbing: Dragging on the trackball scrubs the entire portfolio page in real-time.
 */
export default function TactileSideScrubber() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');
  const [isDragging, setIsDragging] = useState(false);
  const trackballRef = useRef(null);
  const startYRef = useRef(0);
  const startScrollRef = useRef(0);

  // Monitor scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);

      // Determine active section
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Drag / Scrubbing
  const handlePointerDown = (e) => {
    setIsDragging(true);
    startYRef.current = e.clientY;
    startScrollRef.current = window.scrollY;
    document.body.style.userSelect = 'none';

    const handlePointerMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startYRef.current;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Sensitivity multiplier for satisfying scrub travel
      const scrollDelta = deltaY * (totalHeight / 280);
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
      {/* Expanded Scrubber HUD Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="ml-6 py-4 px-3.5 rounded-[20px] bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-2xl backdrop-blur-md w-52 max-h-[75vh] overflow-y-auto flex flex-col gap-1 z-50 text-[var(--color-text)]"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-border)] px-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-orange)] flex items-center gap-1.5">
                <Disc size={11} className="animate-spin" />
                <span>Scroll Radar</span>
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="font-mono text-[10px] text-[var(--color-muted)] hover:text-[var(--color-text)] cursor-pointer"
              >
                ✕
              </button>
            </div>

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
                    className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg text-left transition-all cursor-pointer font-mono text-xs ${
                      isActive
                        ? 'bg-[var(--color-surface-tint)] text-[var(--color-orange)] font-bold border border-[var(--color-border)]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-tint)]'
                    }`}
                  >
                    <span className="truncate pr-2">{sec.label}</span>
                    <span className="text-[10px] opacity-70 shrink-0">{sec.short}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Physical 3/4 Convex Trackball Knob Protruding from Left Edge */}
      <div className="relative flex items-center">
        <motion.div
          ref={trackballRef}
          onPointerDown={handlePointerDown}
          onClick={() => {
            if (!isDragging) setIsExpanded((prev) => !prev);
          }}
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.96 }}
          className={`relative cursor-grab active:cursor-grabbing flex flex-col items-center justify-between py-3 px-1.5 rounded-r-[26px] border-y border-r border-[var(--color-text)] shadow-xl transition-all duration-300 ${
            isExpanded
              ? 'w-9 h-40 bg-[var(--color-surface-tint)]'
              : 'w-7 h-36 bg-[var(--color-card-bg)] hover:w-8.5'
          }`}
          style={{
            boxShadow: '4px 0 16px rgba(0,0,0,0.12), inset 1px 0 4px rgba(255,255,255,0.2)',
          }}
          title="Click to expand / Drag to slide portfolio"
        >
          {/* Top Roller Ridge */}
          <div className="w-3.5 h-1 rounded-full bg-[var(--color-border)]" />

          {/* Center Tactical Ridges / Trackball Roller Ribs */}
          <div className="flex flex-col gap-1.5 items-center w-full my-auto overflow-hidden">
            {[...Array(6)].map((_, i) => {
              // Simulates rotating 3D ridges based on scroll progress
              const offset = (scrollProgress * 200 + i * 16) % 96;
              return (
                <div
                  key={i}
                  className="w-3.5 h-[2px] rounded-full bg-[var(--color-muted)] opacity-50 transition-transform duration-75"
                  style={{
                    transform: `translateY(${isDragging ? offset % 8 - 4 : 0}px)`,
                  }}
                />
              );
            })}

            {/* Glowing Orange Position Indicator Core */}
            <div
              className="w-3 h-3 rounded-full bg-[var(--color-orange)] shadow-[0_0_8px_#ff6f1e] my-1"
              style={{
                transform: `scale(${isDragging ? 1.25 : 1})`,
                transition: 'transform 0.15s ease',
              }}
            />

            {[...Array(6)].map((_, i) => (
              <div
                key={i + 6}
                className="w-3.5 h-[2px] rounded-full bg-[var(--color-muted)] opacity-50"
              />
            ))}
          </div>

          {/* Bottom Roller Ridge */}
          <div className="w-3.5 h-1 rounded-full bg-[var(--color-border)]" />
        </motion.div>

        {/* Small subtle expand hint chevron on hover */}
        {!isExpanded && (
          <div className="absolute left-full ml-1.5 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
            <span className="font-mono text-[9px] text-[var(--color-muted)] bg-[var(--color-card-bg)] border border-[var(--color-border)] px-1.5 py-0.5 rounded shadow-xs">
              SLIDE
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
