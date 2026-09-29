import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { PORTFOLIO, PROJECTS } from './data/portfolioData';
import SemicolonGlitch from './components/SemicolonGlitch';
import MinimalHeader from './components/navigation/MinimalHeader';
import TactileSideScrubber from './components/navigation/TactileSideScrubber';
import ProjectCard from './components/projects/ProjectCard';
import ArtSection from './components/art/ArtSection';
import WritingSection from './components/writing/WritingSection';
import LifeGallery from './components/gallery/LifeGallery';
import SmoothScrollProvider from './components/ui/SmoothScrollProvider';
import AgentWaveBackground from './components/background/AgentWaveBackground';
import DeepSemicolon from './components/background/DeepSemicolon';
import { Skiper8, Skiper8Text } from './components/ui/skiper8';
import { Skiper59 } from './components/ui/skiper59';
import { Skiper41 } from './components/ui/skiper41';
import { Signature } from './components/ui/Signature';
import { LanguageProvider, useLanguage } from './utils/useLanguage';

function MainApp() {
  const [isLoading, setIsLoading] = useState(true);
  const { lang } = useLanguage();

  // Tight, rhythmic, non-duplicate preloader sequence
  const introWords = [
    ";",
    "AIZATFIR",
    "Hi",
    "7AUDIO",
    "FOCUS CLOCK",
    "RYNC432",
    "QURABIC",
    "TERRA FLOW",
    "FITRAH LAUNCHER",
    "SADAR",
    'Turning problems into "Manfaat"'
  ];

  return (
    <SmoothScrollProvider>
      {/* Official Skiper8 Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Skiper8
            words={introWords}
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      {/* Skiper59 - Fluid Drawing Cursor & Paper Canvas Layer */}
      <Skiper59 color="#ff6f1e" lineWidth={2.5} pointCount={24} decaySpeed={0.045} />

      <div className="min-h-screen w-full max-w-full bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-orange)] selection:text-white font-sans antialiased relative overflow-x-hidden transition-colors duration-500">
        {/* Optical Progressive Blur Masks */}
        <Skiper41 position="top" height="60px" />
        <Skiper41 position="bottom" height="60px" />

        {/* Minimal Static Top Header */}
        <MinimalHeader />

        {/* Tactile Side Navigation Scrubber */}
        <TactileSideScrubber />

        {/* HERO SECTION — Clean Typography Choreography with Authentic Signature */}
        <section
          className="hero-section relative w-full min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-4 sm:px-6 md:px-16 overflow-hidden z-10"
          id="intro"
        >
          {/* Subtle Vector Wave Canvas */}
          <AgentWaveBackground />

          {/* Deep Semicolon Background Glyph */}
          <DeepSemicolon />

          {/* Hero Core Identity: Crisp, Intentional & Uncluttered */}
          <div className="relative z-10 my-auto text-center max-w-[1400px] mx-auto w-full px-2 sm:px-4 select-none">
            {/* Primary Headline: AIZAT FIRMANSYAH */}
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] font-black tracking-tight text-center mx-auto text-[var(--color-headline)] leading-[0.95] max-w-full mb-3">
              <Skiper8Text text="AIZAT FIRMANSYAH" />
            </h1>

            {/* Hand-Drawn Authentic Signature Stamp */}
            <div className="flex items-center justify-center gap-3 my-2">
              <Signature text="aizatfir" size="lg" />
            </div>

            {/* Single Punchy Sub-Identity */}
            <p className="font-mono text-xs sm:text-sm tracking-widest text-[var(--color-muted)] uppercase mt-2">
              {lang === 'id' ? 'Pengembang Interaktif' : 'Interactive Developer'} • {lang === 'id' ? 'Arsitek Sistem' : 'Systems Builder'}
              <SemicolonGlitch className="text-[var(--color-orange)] inline-block font-mono font-bold ml-1" />
            </p>
          </div>

          {/* Bottom Ambient Cue */}
          <div className="relative z-10 pt-4 flex items-center justify-center text-xs font-mono text-[var(--color-muted)]">
            <a href="#work" className="hover:text-[var(--color-orange)] transition-colors flex items-center gap-1.5 font-bold">
              <span>{lang === 'id' ? 'TELUSURI' : 'EXPLORE'}</span>
              <ArrowDown size={13} className="animate-bounce" />
            </a>
          </div>
        </section>

        {/* WORK — FULLSCREEN IMMERSIVE PROJECT SHOWCASE */}
        <div id="work" className="pt-8 pb-16">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* ART — VISUAL EXPERIMENTS & STUDIES */}
        <ArtSection />

        {/* WRITING — EDITORIAL THOUGHT STREAM */}
        <WritingSection />

        {/* LIFE — LIVING GALLERY OF EXPERIMENTS */}
        <LifeGallery />

        {/* CONTACT SECTION */}
        <section className="contact-section py-28 sm:py-32" id="contact">
          <div className="w-[96vw] max-w-[1200px] mx-auto px-4 text-center">
            <span className="font-mono text-xs font-bold text-[var(--color-orange)] uppercase tracking-widest block mb-3">
              {lang === 'id' ? 'KONTAK LANGSUNG' : 'DIRECT CHANNEL'}
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold font-display text-[var(--color-headline)] max-w-3xl mx-auto leading-tight mb-8">
              {lang === 'id' ? 'punya masalah menarik?' : 'have an interesting problem?'} <br />
              <span className="text-[var(--color-orange)]">{lang === 'id' ? 'mari bangun solusi.' : "let's build."}</span>
            </h2>

            <div className="flex justify-center mb-10">
              <a
                href={`mailto:${PORTFOLIO.email}`}
                className="pill-btn text-sm sm:text-base font-bold px-7 py-3.5"
              >
                <Mail size={16} />
                <span>{PORTFOLIO.email}</span>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-5 sm:gap-7 text-xs font-mono text-[var(--color-muted)]">
              {PORTFOLIO.socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-orange)] transition-colors underline decoration-dotted font-bold"
                >
                  {s.name} ({s.handle})
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER — Clean, Balanced Typography with Signature */}
        <footer className="w-full py-10 border-t border-[var(--color-border)] select-none bg-[var(--color-surface-tint)]">
          <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-lg font-bold tracking-widest text-[var(--color-headline)]">
                ZAFIR;
              </span>
              <Signature text="aizatfir" size="sm" />
            </div>

            <div className="text-xs font-mono text-[var(--color-muted)] font-medium text-center md:text-right">
              © 2026 AIZAT FAHIM FIRMANSYAH
            </div>
          </div>
        </footer>
      </div>
    </SmoothScrollProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
