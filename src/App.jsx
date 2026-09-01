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

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-orange)] selection:text-white font-sans antialiased relative overflow-hidden transition-colors duration-400">
        {/* Minimal Transparent Floating Headbar */}
        <MinimalHeader />

        {/* HERO SECTION — 100vw × 100svh Pure Minimal Atmospheric Canvas */}
        <section
          className="hero-section relative w-full min-h-[100svh] flex flex-col justify-between pt-24 pb-10 px-6 md:px-16 overflow-hidden z-10"
          id="intro"
        >
          {/* Subtle Flowing Vector Wave Canvas */}
          <AgentWaveBackground />

          {/* Deep Architectural Background Semicolon Glyph */}
          <DeepSemicolon />

          {/* Hero Core Identity (Centered in Viewport) */}
          <div className="relative z-10 my-auto text-center max-w-[1400px] mx-auto w-full select-none">
            {/* Primary Name: ZAFIR in CAPS LOCK */}
            <h1 className="display-headline text-7xl sm:text-9xl md:text-[140px] lg:text-[180px] xl:text-[220px] font-black tracking-tighter leading-none mb-2 text-[var(--color-headline)]">
              ZAFIR<SemicolonGlitch className="text-[var(--color-orange)] inline-block font-mono" />
            </h1>

            {/* Sub-Identity */}
            <p className="font-mono text-sm md:text-base tracking-widest text-[var(--color-muted)] uppercase">
              Zafir / Zephyr
            </p>
          </div>

          {/* Bottom Ambient Cue */}
          <div className="relative z-10 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-muted)]">
            <span className="tracking-widest">AIZAT FIRMANSYAH — 2026</span>
            <a href="#work" className="hover:text-[var(--color-orange)] transition-colors flex items-center gap-1.5 font-bold">
              <span>EXPLORE</span>
              <ArrowDown size={13} className="animate-bounce" />
            </a>
          </div>
        </section>

        {/* WORK — FULLSCREEN IMMERSIVE PROJECT SHOWCASE (PRIMARY EXPERIENCE) */}
        <div id="work" className="py-16">
          <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8 mb-12 flex items-baseline justify-between">
            <div>
              <span className="font-mono text-xs text-[var(--color-orange)] uppercase tracking-wider font-bold block mb-1">
                01 / PRIMARY EXPERIENCE
              </span>
              <h2 className="display-headline text-5xl sm:text-7xl font-bold">
                work
              </h2>
            </div>
            <span className="font-mono text-xs text-[var(--color-muted)] hidden sm:inline-block">
              01 — 05 / interactive exploration
            </span>
          </div>

          {/* Project List with Continuous Perspective Tilt & 95vw Width */}
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
              05 / DIRECT CHANNEL
            </span>

            <h2 className="text-5xl md:text-8xl font-bold font-display text-[var(--color-headline)] max-w-3xl mx-auto leading-tight mb-8">
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

            <div className="flex flex-wrap justify-center gap-8 text-xs font-mono text-[var(--color-muted)]">
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
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-2xl font-bold tracking-widest text-[var(--color-headline)]">
                ZAFIR;
              </span>
              <span className="text-xs font-mono text-[var(--color-muted)]">
                [Zafir / Zephyr]
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
