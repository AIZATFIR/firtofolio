import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Mail } from 'lucide-react';
import GithubIcon from '../GithubIcon';
import SemicolonGlitch from '../SemicolonGlitch';
import ThemeToggle from './ThemeToggle';
import { Skiper25 } from '../ui/skiper25';
import { PORTFOLIO } from '../../data/portfolioData';

export default function MinimalHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'WORK', href: '#work', number: '01' },
    { label: 'ART', href: '#art', number: '02' },
    { label: 'WRITING', href: '#writing', number: '03' },
    { label: 'GALLERY', href: '#gallery', number: '04' },
    { label: 'CONTACT', href: '#contact', number: '05' },
  ];

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-30 py-5 sm:py-6 bg-transparent">
        <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Left: Mobile Menu Button (on mobile) + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger on Left */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-text)] text-xs font-mono font-bold shadow-xs hover:border-[var(--color-orange)] transition-colors cursor-pointer"
              aria-label="Open Mobile Menu"
            >
              <Menu size={15} className="text-[var(--color-orange)]" />
              <span>NAV</span>
            </button>

            {/* Brand Logo: ZAFIR; */}
            <a
              href="#"
              className="flex items-center gap-0.5 group font-mono font-bold text-sm sm:text-base tracking-tight text-[var(--color-text)]"
            >
              <span className="tracking-widest font-bold">ZAFIR</span>
              <SemicolonGlitch className="font-mono text-base text-[var(--color-orange)]" />
            </a>
          </div>

          {/* Right Controls: Desktop Nav, Music Toggle (@skiper-ui/skiper25), & Theme Toggle */}
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

            {/* Skiper25 Music Toggle Button with Lyn - No More What Ifs */}
            <Skiper25
              audioSrc="/audio/lyn-no-more-what-ifs.mp3"
              trackTitle="Lyn - No More What Ifs"
            />

            {/* Animated Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Slide-in from Left) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative z-10 w-[84vw] max-w-[340px] h-full bg-[var(--color-bg)] border-r border-[var(--color-border)] shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
            >
              {/* Drawer Top Bar */}
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-1 font-mono font-bold text-base text-[var(--color-text)]">
                    <span className="tracking-widest">ZAFIR</span>
                    <SemicolonGlitch className="text-[var(--color-orange)]" />
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-[var(--color-surface-tint)] text-[var(--color-text)] transition-colors"
                    aria-label="Close Mobile Menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3 px-3.5 rounded-xl hover:bg-[var(--color-surface-tint)] group transition-colors"
                    >
                      <span className="font-display text-2xl font-bold text-[var(--color-headline)] group-hover:text-[var(--color-orange)] transition-colors">
                        {link.label}
                      </span>
                      <span className="font-mono text-xs text-[var(--color-muted)] group-hover:text-[var(--color-orange)]">
                        {link.number}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Drawer Bottom Info & Channels */}
              <div className="pt-6 mt-6 border-t border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-wider">
                    Background Track
                  </span>
                  <Skiper25
                    audioSrc="/audio/lyn-no-more-what-ifs.mp3"
                    trackTitle="Lyn - No More What Ifs"
                  />
                </div>

                <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-wider block mb-2">
                  Direct Channels
                </span>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://github.com/AIZATFIR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs font-mono text-[var(--color-text)] hover:text-[var(--color-orange)] py-1.5"
                  >
                    <span className="flex items-center gap-2">
                      <GithubIcon size={14} />
                      <span>GitHub</span>
                    </span>
                    <ArrowUpRight size={13} className="text-[var(--color-muted)]" />
                  </a>
                  <a
                    href={`mailto:${PORTFOLIO.email}`}
                    className="flex items-center justify-between text-xs font-mono text-[var(--color-text)] hover:text-[var(--color-orange)] py-1.5"
                  >
                    <span className="flex items-center gap-2">
                      <Mail size={14} />
                      <span>{PORTFOLIO.email}</span>
                    </span>
                    <ArrowUpRight size={13} className="text-[var(--color-muted)]" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
