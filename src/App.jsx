import React from 'react';
import { ArrowDown, Mail, ExternalLink } from 'lucide-react';
import GithubIcon from './components/GithubIcon';
import { PORTFOLIO, PROJECTS } from './data/portfolioData';
import SemicolonGlitch from './components/SemicolonGlitch';
import FullscreenProjectStage from './components/ui/FullscreenProjectStage';
import ToolboxWall from './components/ToolboxWall';
import ExperimentsSketch from './components/ExperimentsSketch';
import SmoothScrollProvider from './components/ui/SmoothScrollProvider';
import AgentWaveBackground from './components/background/AgentWaveBackground';
import DeepSemicolon from './components/background/DeepSemicolon';

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[var(--color-cream-paper)] text-[var(--color-charcoal)] selection:bg-[var(--color-marker-orange)] selection:text-white font-sans antialiased relative overflow-hidden">
        {/* Minimal Transparent Floating Headbar */}
        <header className="fixed top-0 left-0 right-0 z-40 py-5 bg-[rgba(253,251,249,0.85)] backdrop-blur-xs border-b border-[var(--color-border)]">
          <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between">
            {/* Top-Left Brand Identity */}
            <a href="#" className="flex items-center gap-2 group">
              <span className="font-display text-xl font-bold text-[var(--color-cocoa-ink)] tracking-tight">
                aizat fahim
              </span>
              <span className="font-mono text-xs text-[var(--color-marker-orange)] font-bold">
                [zafir; / zephyr]
              </span>
            </a>

            {/* Navigation Links */}
            <nav className="flex items-center gap-6 md:gap-8 text-xs font-mono font-bold tracking-wider uppercase text-[var(--color-cocoa-ink)]">
              <a href="#work" className="hover:text-[var(--color-marker-orange)] transition-colors">
                work
              </a>
              <a href="#about" className="hover:text-[var(--color-marker-orange)] transition-colors">
                about
              </a>
              <a href="#toolbox" className="hover:text-[var(--color-marker-orange)] transition-colors">
                toolbox
              </a>
              <a href="#contact" className="hover:text-[var(--color-marker-orange)] transition-colors">
                contact
              </a>
            </nav>
          </div>
        </header>

        {/* HERO SECTION — 100vw × 100svh Pure Minimal Canvas */}
        <section
          className="hero-section relative w-full min-h-[100svh] flex flex-col justify-between pt-32 pb-12 px-6 md:px-16 overflow-hidden z-10"
          id="intro"
        >
          {/* Subtle Generative Wave Canvas */}
          <AgentWaveBackground />

          {/* Deep Architectural Semicolon Glyph */}
          <DeepSemicolon />

          {/* Core Hero Identity */}
          <div className="relative z-10 my-auto max-w-[1500px]">
            {/* Signature Sub-Badge */}
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs md:text-sm font-bold text-[var(--color-marker-orange)] uppercase tracking-widest bg-white/70 px-3 py-1 rounded-full border border-[var(--color-charcoal)]">
                ZAFIR; <SemicolonGlitch className="inline-block font-mono" />
              </span>
              <span className="font-mono text-xs text-gray-500">• alias: Zephyr</span>
            </div>

            {/* Full Name in Massive Display Typography */}
            <h1 className="display-headline text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] font-bold tracking-tighter leading-[0.95] mb-6 select-none">
              aizat fahim firmansyah
            </h1>

            {/* Crisp, Focused Focus Line */}
            <p className="text-xl sm:text-2xl md:text-3xl text-[var(--color-cocoa-ink)] font-serif italic max-w-3xl leading-snug">
              Software engineering, distributed audio synchronization, and cognitive flow systems.
            </p>
          </div>

          {/* Pure Minimal Bottom Indicator */}
          <div className="relative z-10 pt-6 border-t border-[var(--color-charcoal)] flex items-center justify-between text-xs font-mono text-[var(--color-charcoal)]">
            <span>AIZAT FAHIM FIRMANSYAH — 2026</span>
            <a href="#work" className="hover:text-[var(--color-marker-orange)] transition-colors flex items-center gap-1.5 font-bold">
              <span>EXPLORE WORK</span>
              <ArrowDown size={13} className="animate-bounce" />
            </a>
          </div>
        </section>

        {/* FULLSCREEN SELECTED WORK SHOWCASE */}
        <div id="work" className="py-12">
          <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8 mb-8 flex items-baseline justify-between">
            <h2 className="display-headline text-5xl sm:text-7xl font-bold">
              selected projects
            </h2>
            <span className="font-mono text-xs text-gray-500 hidden sm:inline-block">
              01 — 05 / interactive exploration
            </span>
          </div>

          {PROJECTS.map((project, idx) => (
            <FullscreenProjectStage key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* ABOUT SECTION — Concise & Focused */}
        <section className="about-section py-28 border-y border-[var(--color-border)] bg-[var(--color-dew-drop)]" id="about">
          <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display text-[var(--color-cocoa-ink)] leading-[1.05] mb-8 max-w-5xl">
              i build digital systems;
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-[var(--color-charcoal)] items-start">
              <div className="md:col-span-4 space-y-1">
                <span className="font-mono text-xs font-bold text-[var(--color-charcoal)] uppercase block">
                  AIZAT FAHIM FIRMANSYAH
                </span>
                <span className="font-mono text-xs text-gray-600 block">
                  Identity: Zafir; / Zephyr
                </span>
                <span className="font-mono text-xs text-gray-500 block">
                  Bandung / Remote
                </span>
              </div>

              <div className="md:col-span-8 space-y-4 text-base md:text-xl text-[var(--color-cocoa-ink)] leading-relaxed font-serif">
                <p>
                  Technology should be calm, transparent, and tactile. I treat code as a laboratory to unpack complex systems—from real-time Web Audio mesh across browsers to biological circadian focus cycles in Flutter.
                </p>
                <p className="font-mono text-sm text-[var(--color-marker-orange)] font-bold">
                  The work is the product. The website is the frame.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TOOLBOX WALL */}
        <ToolboxWall />

        {/* EXPERIMENTS SKETCHBOOK */}
        <ExperimentsSketch />

        {/* CONTACT SECTION */}
        <section className="contact-section py-28" id="contact">
          <div className="w-[96vw] max-w-[1200px] mx-auto px-4 text-center">
            <span className="font-mono text-xs font-bold text-[var(--color-marker-orange)] uppercase tracking-widest block mb-3">
              Direct Contact
            </span>

            <h2 className="text-4xl md:text-7xl font-bold font-display text-[var(--color-cocoa-ink)] max-w-3xl mx-auto leading-tight mb-8">
              have an interesting problem? <br />
              <span className="text-[var(--color-marker-orange)]">let's build.</span>
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

            <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-[var(--color-charcoal)]">
              {PORTFOLIO.socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-marker-orange)] transition-colors underline decoration-dotted font-bold"
                >
                  {s.name} ({s.handle})
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER BRAND BAND — Marker Orange with 56px Asymmetric Top Radius */}
        <footer className="footer-brand-band py-14 select-none">
          <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold tracking-tight text-[var(--color-charcoal)]">
                AIZAT FAHIM FIRMANSYAH
              </span>
              <span className="text-xs font-mono text-[var(--color-charcoal)] opacity-80">
                [ZAFIR; / Zephyr]
              </span>
            </div>

            <div className="text-xs font-mono text-[var(--color-charcoal)] font-medium text-center md:text-right">
              {PORTFOLIO.copyright}
            </div>
          </div>
        </footer>
      </div>
    </SmoothScrollProvider>
  );
}
