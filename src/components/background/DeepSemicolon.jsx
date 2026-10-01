import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * DeepSemicolon Component
 * Massive atmospheric background semicolon glyph functioning as an architectural design object.
 * Optimized with pure Framer Motion transform (0 React state re-renders on scroll).
 */
export default function DeepSemicolon({ className = '' }) {
  const { scrollY } = useScroll();
  const translateY = useTransform(scrollY, [0, 1000], [0, 120]);

  return (
    <motion.div
      style={{ translateY }}
      className={`pointer-events-none absolute right-[2%] md:right-[5%] top-[8%] z-0 select-none opacity-4 overflow-hidden max-w-[90vw] will-change-transform ${className}`}
      aria-hidden="true"
    >
      <span className="font-mono text-[clamp(240px,42vw,800px)] font-black leading-none text-[var(--color-headline)] tracking-tighter block select-none">
        ;
      </span>
    </motion.div>
  );
}
