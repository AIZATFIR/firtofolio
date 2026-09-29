import React from 'react';
import SemicolonGlitch from '../SemicolonGlitch';
import { Skiper26 } from '../ui/skiper26';
import { Skiper25 } from '../ui/skiper25';
import { Skiper24 } from '../ui/skiper24';
import { useLanguage } from '../../utils/useLanguage';

export default function MinimalHeader() {
  const { lang, setLang } = useLanguage();

  const navLinks = [
    { label: lang === 'id' ? 'KARYA' : 'WORK', href: '#work' },
    { label: lang === 'id' ? 'SENI' : 'ART', href: '#art' },
    { label: lang === 'id' ? 'TULISAN' : 'WRITING', href: '#writing' },
    { label: lang === 'id' ? 'GALERI' : 'GALLERY', href: '#gallery' },
    { label: lang === 'id' ? 'KONTAK' : 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-30 py-4 sm:py-6 bg-transparent">
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

        {/* Right Controls: Desktop Nav, Language Toggle [ID|EN], Palette (@skiper-ui/skiper24), Music (@skiper-ui/skiper25), Theme (@skiper-ui/skiper26) */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs font-mono tracking-wider uppercase text-[var(--color-muted)] mr-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[var(--color-orange)] transition-colors font-medium relative group py-1"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--color-orange)] transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Minimal Language Toggle Pill [ID | EN] */}
          <div className="flex items-center rounded-full bg-[var(--color-card-bg)] border border-[var(--color-border)] p-0.5 shadow-xs">
            <button
              onClick={() => setLang('id')}
              className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold transition-all cursor-pointer ${
                lang === 'id'
                  ? 'bg-[var(--color-orange)] text-white shadow-xs'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
              title="Bahasa Indonesia"
            >
              ID
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[var(--color-orange)] text-white shadow-xs'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Skiper24 Accent Color Palette Switcher */}
          <Skiper24 />

          {/* Skiper25 Music Toggle Button with Complete Arch BGM Playlist (27 tracks) */}
          <Skiper25 />

          {/* Skiper26 Animated Sliding Theme Toggle */}
          <Skiper26 />
        </div>
      </div>
    </header>
  );
}
