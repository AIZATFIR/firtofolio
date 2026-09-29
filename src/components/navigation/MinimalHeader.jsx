import React from 'react';
import SemicolonGlitch from '../SemicolonGlitch';
import { Skiper26 } from '../ui/skiper26';
import { Skiper25 } from '../ui/skiper25';

export default function MinimalHeader() {
  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'ART', href: '#art' },
    { label: 'WRITING', href: '#writing' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-30 py-5 sm:py-6 bg-transparent">
      <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left: Brand Logo: ZAFIR; */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-0.5 group font-mono font-bold text-sm sm:text-base tracking-tight text-[var(--color-text)]"
          >
            <span className="tracking-widest font-bold">ZAFIR</span>
            <SemicolonGlitch className="font-mono text-base text-[var(--color-orange)]" />
          </a>
        </div>

        {/* Right Controls: Desktop Nav, Music Toggle (@skiper-ui/skiper25), & Sliding Theme Toggle (@skiper-ui/skiper26) */}
        <div className="flex items-center gap-3 sm:gap-5 md:gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono tracking-wider uppercase text-[var(--color-muted)]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[var(--color-orange)] transition-colors font-medium relative group"
              >
                <span>{link.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[var(--color-orange)] transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Skiper25 Music Toggle Button with Complete Arch BGM Playlist (27 tracks) */}
          <Skiper25 />

          {/* Skiper26 Animated Sliding Theme Toggle */}
          <Skiper26 />
        </div>
      </div>
    </header>
  );
}
