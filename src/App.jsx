import React from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import { PORTFOLIO, PROJECTS } from './data/portfolioData';
import SemicolonGlitch from './components/SemicolonGlitch';
import MinimalHeader from './components/navigation/MinimalHeader';
import ProjectCard from './components/projects/ProjectCard';
import ArtSection from './components/art/ArtSection';
import WritingSection from './components/writing/WritingSection';
import LifeGallery from './components/gallery/LifeGallery';
import SmoothScrollProvider from './components/ui/SmoothScrollProvider';
import AgentWaveBackground from './components/background/AgentWaveBackground';
import DeepSemicolon from './components/background/DeepSemicolon';
import { Skiper8, Skiper8Text } from './components/ui/skiper8';

export default function App() {
  // Preloader with customized pacing per item
  const introWords = [
    // Initial deliberate slow entry
    { text: ";", duration: 850, sub: "ZAFIR;" },
    { text: "AIZATFIR", duration: 600 },
    { text: "AIZAT FAHIM FIRMANSYAH", duration: 800 },

    // Playful / warm greetings (fast cadence)
    { text: "Hi", duration: 180 },
    { text: "Hello World", duration: 200 },
    { text: "Alooo", duration: 180 },
    { text: "^-^", duration: 180 },
    { text: "^-^  !", duration: 190 },
    { text: "Alooooo", duration: 200 },

    // Complete portfolio project catalog
    { text: "FOCUS CLOCK", duration: 280 },
    { text: "7AUDIO", duration: 280 },
    { text: "FITRAH LAUNCHER", duration: 280 },
    { text: "SADAR", duration: 280 },
    { text: "RYNC432", duration: 280 },
    { text: "QURABIC", duration: 280 },
    { text: "TERRA FLOW", duration: 280 },
    { text: "SOCIAL AFFINITY", duration: 280 },

    // High-impact slow closing cadence
    { text: "AIZATFIR", duration: 700 },
    { text: "AIZAT FAHIM FIRMANSYAH", duration: 850 },
    { text: "Building Solutions", duration: 950 },
    { text: 'Turning problems into "Manfaat"', duration: 1500 }
  ];

  return (
    <SmoothScrollProvider>
      {/* Skiper8 Words Preloader with Dennis Snellenberg curved SVG exit */}
      <Skiper8 words={introWords} />

      <div className="min-h-screen w-full max-w-full bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-orange)] selection:text-white font-sans antialiased relative overflow-x-hidden transition-colors duration-400">
        {/* Minimal Transparent Static Top Header (Desktop + Mobile Drawer Nav on Left) */}
        <MinimalHeader />

        {/* HERO SECTION — 100vw × 100svh Pure Minimal Atmospheric Canvas */}
        <section
          className="hero-section relative w-full min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-4 sm:px-6 md:px-16 overflow-hidden z-10"
          id="intro"
        >
          {/* Subtle Flowing Vector Wave Canvas */}
          <AgentWaveBackground />

          {/* Deep Architectural Background Semicolon Glyph */}
          <DeepSemicolon />

          {/* Hero Core Identity (Centered in Viewport, fully responsive and never clipping) */}
          <div className="relative z-10 my-auto text-center max-w-[1400px] mx-auto w-full px-2 sm:px-4 select-none">
            {/* Primary Name: AIZAT FAHIM FIRMANSYAH with Skiper8 Animated Text */}
            <h1 className="display-headline font-bold text-center mx-auto mb-3 text-[var(--color-headline)] leading-[0.98] max-w-full">
              <Skiper8Text text="AIZAT FAHIM FIRMANSYAH" />
            </h1>

            {/* Sub-Identity */}
            <p className="font-mono text-xs sm:text-sm md:text-base tracking-widest text-[var(--color-muted)] uppercase mt-2">
              ZAFIR<SemicolonGlitch className="text-[var(--color-orange)] inline-block font-mono" /> • Zafir / Zephyr
            </p>
          </div>

          {/* Bottom Ambient Cue (Without "- 2026") */}
          <div className="relative z-10 pt-4 flex items-center justify-center text-xs font-mono text-[var(--color-muted)]">
            <a href="#work" className="hover:text-[var(--color-orange)] transition-colors flex items-center gap-1.5 font-bold">
              <span>EXPLORE</span>
              <ArrowDown size={13} className="animate-bounce" />
            </a>
          </div>
        </section>

        {/* WORK — FULLSCREEN IMMERSIVE PROJECT SHOWCASE */}
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
                AIZAT FAHIM FIRMANSYAH
              </span>
              <span className="text-xs font-mono text-[var(--color-muted)]">
                [ZAFIR; / Zephyr]
              </span>
            </div>

            <div className="text-xs font-mono text-[var(--color-muted)] font-medium text-center md:text-right">
              {PORTFOLIO.copyright}
            </div>
          </div>
        </footer>
      </div>
    </SmoothScrollProvider>
  );
}
