import React from 'react';
import SemicolonGlitch from '../SemicolonGlitch';
import ThemeToggle from './ThemeToggle';

export default function MinimalHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 py-6 bg-transparent">
      <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left: ZAFIR */}
        <a href="#" className="flex items-center gap-1 group font-mono font-bold text-sm tracking-tight text-[var(--color-text)]">
          <span className="tracking-widest font-bold">ZAFIR</span>
          <SemicolonGlitch className="font-mono text-base" />
        </a>

        {/* Right Controls: Contextual Nav & Animated Theme Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          <nav className="flex items-center gap-4 md:gap-7 text-xs font-mono tracking-wider uppercase text-[var(--color-muted)]">
            <a href="#work" className="hover:text-[var(--color-orange)] transition-colors">
              work
            </a>
            <a href="#art" className="hover:text-[var(--color-orange)] transition-colors">
              art
            </a>
            <a href="#writing" className="hover:text-[var(--color-orange)] transition-colors">
              writing
            </a>
            <a href="#gallery" className="hover:text-[var(--color-orange)] transition-colors">
              gallery
            </a>
            <a href="#contact" className="hover:text-[var(--color-orange)] transition-colors">
              contact
            </a>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
