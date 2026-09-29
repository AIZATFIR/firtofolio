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
import { LanguageProvider } from './utils/useLanguage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Preloader words catalog with custom pacing
  const introWords = [
    ";",
    "AIZATFIR",
    "AIZAT FAHIM FIRMANSYAH",
    "Hi",
    "Hello World",
    "Alooo",
    "^-^",
    "^-^  !",
    "Alooooo",
    "FOCUS CLOCK",
    "7AUDIO",
    "RYNC432",
    "QURABIC",
    "TERRA FLOW",
    "SOCIAL AFFINITY",
    "FITRAH LAUNCHER",
    "SADAR",
    "AIZATFIR",
    "AIZAT FAHIM FIRMANSYAH",
    "Building Solutions",
    'Turning problems into "Manfaat"'
  ];

  return (
    <LanguageProvider>
      <SmoothScrollProvider>
        {/* Official Skiper8 Words Preloader wrapped in AnimatePresence for official slideUp & curve exit */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <Skiper8
              words={introWords}
              onComplete={() => setIsLoading(false)}
            />
          )}
        </AnimatePresence>

        {/* Skiper59 - Fluid Drawing Cursor & Paper Canvas Layer with Undo/Redo */}
        <Skiper59 color="#ff6f1e" lineWidth={2.5} pointCount={24} decaySpeed={0.045} />

        <div className="min-h-screen w-full max-w-full bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-orange)] selection:text-white font-sans antialiased relative overflow-x-hidden transition-colors duration-500">
          {/* Subtle Top & Bottom Progressive Blur Masks for Reading Ergonomics (@skiper-ui/skiper41) */}
          <Skiper41 position="top" height="60px" />
          <Skiper41 position="bottom" height="60px" />

          {/* Minimal Transparent Static Top Header (Desktop + Language Switch + Color + Music + Theme) */}
          <MinimalHeader />

          {/* Physical Trackball Side Slider Navigation on Left Screen Edge */}
          <TactileSideScrubber />

          {/* HERO SECTION — 100vw × 100svh Pure Minimal Atmospheric Canvas */}
          <section
            className="hero-section relative w-full min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-4 sm:px-6 md:px-16 overflow-hidden z-10"
            id="intro"
          >
            {/* Subtle Flowing Vector Wave Canvas */}
            <AgentWaveBackground />

            {/* Deep Architectural Background Semicolon Glyph */}
            <DeepSemicolon />

            {/* Hero Core Identity: AIZATFIR Largest + Full Name Below + Single Clean Semicolon */}
            <div className="relative z-10 my-auto text-center max-w-[1400px] mx-auto w-full px-2 sm:px-4 select-none">
              {/* Primary Display Identity: AIZATFIR (Biggest) */}
              <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[125px] xl:text-[145px] font-black tracking-tighter text-center mx-auto text-[var(--color-headline)] leading-[0.92] max-w-full mb-3">
                <Skiper8Text text="AIZATFIR" />
              </h1>

              {/* Full Name Below (Large, Elegant & Prominent) */}
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-headline)] max-w-full mx-auto mb-3">
                <Skiper8Text text="AIZAT FAHIM FIRMANSYAH" />
              </h2>

              {/* Single Clean Sub-Identity (No duplicate Zafirs) */}
              <p className="font-mono text-xs sm:text-sm tracking-widest text-[var(--color-muted)] uppercase mt-2">
                ZAFIR<SemicolonGlitch className="text-[var(--color-orange)] inline-block font-mono font-bold" />
              </p>
            </div>

            {/* Bottom Ambient Cue */}
            <div className="relative z-10 pt-4 flex items-center justify-center text-xs font-mono text-[var(--color-muted)]">
              <a href="#work" className="hover:text-[var(--color-orange)] transition-colors flex items-center gap-1.5 font-bold">
                <span>EXPLORE</span>
                <ArrowDown size={13} className="animate-bounce" />
              </a>
            </div>
          </section>

          {/* WORK — FULLSCREEN IMMERSIVE PROJECT SHOWCASE (VERTICAL DOMINO 3D PERSPECTIVE) */}
          <div id="work" className="pt-8 pb-16">
            {/* Project List with Real Live Viewports & Clickable Case Study Pop-ups */}
            {PROJECTS.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>

          {/* ART — VISUAL EXPERIMENTS & STUDIES */}
          <ArtSection />

          {/* WRITING / SUBSTACK — EDITORIAL THOUGHT STREAM */}
          <WritingSection />

          {/* LIFE / GALLERY — LIVING GALLERY OF MEMORIES & EXPERIMENTS */}
          <LifeGallery />

          {/* CONTACT SECTION */}
          <section className="contact-section py-32" id="contact">
            <div className="w-[96vw] max-w-[1200px] mx-auto px-4 text-center">
              <span className="font-mono text-xs font-bold text-[var(--color-orange)] uppercase tracking-widest block mb-4">
                DIRECT CHANNEL
              </span>

              <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold font-display text-[var(--color-headline)] max-w-3xl mx-auto leading-tight mb-8">
                have an interesting problem? <br />
                <span className="text-[var(--color-orange)]">let's build.</span>
              </h2>

              <div className="flex justify-center mb-12">
                <a
                  href={`mailto:${PORTFOLIO.email}`}
                  className="pill-btn text-base md:text-lg font-bold px-8 py-4"
                >
                  <Mail size={18} />
                  <span>{PORTFOLIO.email}</span>
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs font-mono text-[var(--color-muted)]">
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

          {/* FOOTER BRAND BAND */}
          <footer className="w-full py-12 border-t border-[var(--color-border)] select-none bg-[var(--color-surface-tint)]">
            <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap items-baseline justify-center md:justify-start gap-2 sm:gap-3 text-center md:text-left">
                <span className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-[var(--color-headline)]">
                  AIZATFIR
                </span>
                <span className="text-xs font-mono text-[var(--color-muted)]">
                  [AIZAT FAHIM FIRMANSYAH • ZAFIR;]
                </span>
              </div>

              <div className="text-xs font-mono text-[var(--color-muted)] font-medium text-center md:text-right">
                {PORTFOLIO.copyright}
              </div>
            </div>
          </footer>
        </div>
      </SmoothScrollProvider>
    </LanguageProvider>
  );
}
