import React, { useState, useEffect } from 'react';

/**
 * SemicolonGlitch Component
 * The signature visual element for ZAFIR;
 * Performs subtle initial load glitch/flicker and interactive hover SVG state transformations.
 */
export default function SemicolonGlitch({ className = '' }) {
  const [isGlitching, setIsGlitching] = useState(true);
  const [hoverCount, setHoverCount] = useState(0);

  useEffect(() => {
    // Initial entrance glitch sequence
    const timer = setTimeout(() => {
      setIsGlitching(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setHoverCount((prev) => (prev + 1) % 3);
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 600);
  };

  return (
    <span
      className={`semicolon-glitch-wrapper relative inline-block cursor-pointer select-none text-[var(--color-orange,#ff6f1e)] ${
        isGlitching ? 'glitching' : ''
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      data-cursor="view"
      title="ZAFIR; Technical Signature"
    >
      <span className="relative z-10 font-mono font-black">
        {hoverCount === 0 && ';'}
        {hoverCount === 1 && '{;}'}
        {hoverCount === 2 && '://'}
      </span>

      {isGlitching && (
        <>
          {/* Subtle Chromatic Offsets */}
          <span
            className="pointer-events-none absolute top-0 left-0 text-[#3b82f6] opacity-70 font-mono font-black -translate-x-[2px] translate-y-[1px] mix-blend-multiply"
            aria-hidden="true"
          >
            ;
          </span>
          <span
            className="pointer-events-none absolute top-0 left-0 text-[#ff66cf] opacity-70 font-mono font-black translate-x-[2px] -translate-y-[1px] mix-blend-multiply"
            aria-hidden="true"
          >
            ;
          </span>
        </>
      )}
    </span>
  );
}
