import React, { useEffect, useState } from 'react';

/**
 * DeepSemicolon Component
 * Massive atmospheric background semicolon glyph functioning as an architectural design object.
 */
export default function DeepSemicolon({ className = '' }) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`pointer-events-none absolute right-[5%] top-[10%] z-0 select-none opacity-4 transition-transform duration-75 ease-out ${className}`}
      style={{
        transform: `translateY(${offsetY}px)`,
      }}
      aria-hidden="true"
    >
      <span className="font-mono text-[420px] md:text-[680px] lg:text-[850px] font-black leading-none text-[var(--color-cocoa-ink)] tracking-tighter block">
        ;
      </span>
    </div>
  );
}
