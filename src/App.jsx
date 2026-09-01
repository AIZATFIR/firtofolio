import React from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import { PORTFOLIO, PROJECTS } from './data/portfolioData';
import SemicolonGlitch from './components/SemicolonGlitch';
import FullscreenProjectStage from './components/ui/FullscreenProjectStage';
import ToolboxWall from './components/ToolboxWall';
import ExperimentsSketch from './components/ExperimentsSketch';
import SmoothScrollProvider from './components/ui/SmoothScrollProvider';
import HandDrawnArrow from './components/ui/HandDrawnArrow';
import AgentWaveBackground from './components/background/AgentWaveBackground';
import DeepSemicolon from './components/background/DeepSemicolon';
import { LightningSticker, BearSticker, SproutSparkleSticker } from './components/ui/StickerCluster';

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[var(--color-cream-paper)] text-[var(--color-charcoal)] selection:bg-[var(--color-marker-orange)] selection:text-white font-sans antialiased relative overflow-hidden">
        {/* Minimal Transparent Floating Headbar */}
        <header className="fixed top-0 left-0 right-0 z-40 py-5 bg-[rgba(253,251,249,0.85)] backdrop-blur-xs border-b border-[var(--color-border)]">
          <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between">
            {/* Top-Left Brand Wordmark */}
            <a href="#" className="flex items-center gap-1 group">
              <span className="font-display text-2xl font-bold text-[var(--color-cocoa-ink)] tracking-tight">
                zafir
              </span>
              <SemicolonGlitch className="text-2xl font-mono" />
            </a>

            {/* Clean Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-bold tracking-wider uppercase text-[var(--color-cocoa-ink)]">
              <a href="#work" className="hover:text-[var(--color-marker-orange)] transition-colors">
                work
              </a>
              <a href="#about" className="hover:text-[var(--color-marker-orange)] transition-colors">
                about
              </a>
              <a href="#toolbox" className="hover:text-[var(--color-marker-orange)] transition-colors">
                toolbox
              </a>
              <a href="#experiments" className="hover:text-[var(--color-marker-orange)] transition-colors">
                experiments
              </a>
              <a href="#contact" className="hover:text-[var(--color-marker-orange)] transition-colors">
                contact
              </a>
            </nav>

            {/* Persistent CTA Button */}
            <a
              href="mailto:aizatfir@gmail.com"
              className="pill-btn text-xs font-bold"
            >
              <span>let's build ↗</span>
            </a>
          </div>
        </header>

        {/* HERO SECTION — 100vw × 100svh Immersive Canvas */}
        <section
          className="hero-section relative w-full min-h-[100svh] flex flex-col justify-between pt-32 pb-12 px-6 md:px-16 overflow-hidden z-10"
          id="intro"
        >
          {/* Generative Agent-Wave Background */}
          <AgentWaveBackground />

          {/* Deep Architectural Semicolon Glyph */}
          <DeepSemicolon />

          {/* Hero Content */}
          <div className="relative z-10 my-auto max-w-[1400px]">
            {/* Handwritten Script Annotation */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-handwritten text-3xl md:text-4xl text-[var(--color-marker-orange)] font-bold">
                Dear visitor,
              </span>
              <HandDrawnArrow direction="curled" className="-mb-3" />
            </div>

            {/* Massive Display Headline */}
            <h1 className="display-headline text-6xl sm:text-8xl md:text-9xl lg:text-[130px] font-bold tracking-tighter leading-[0.95] mb-6 select-none">
              meet zafir<SemicolonGlitch className="text-[var(--color-marker-orange)] font-mono" />
            </h1>

            {/* Editorial Body Statement */}
            <p className="text-2xl sm:text-3xl md:text-4xl text-[var(--color-cocoa-ink)] font-serif leading-snug max-w-4xl mb-8">
              A software engineer building tactile digital tools, distributed audio mesh, and cognitive flow architectures{' '}
              <span className="marker-highlight">actually!</span>
            </p>

            {/* CTA Row with Stickers */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href="#work"
                className="pill-btn text-base md:text-lg font-bold px-8 py-3.5"
              >
                <span>explore work</span>
                <ArrowDown size={16} />
              </a>

              <div className="hidden sm:flex items-center gap-3">
                <LightningSticker rotation="rotate-[-10deg]" />
                <BearSticker rotation="rotate-[8deg]" />
                <SproutSparkleSticker rotation="rotate-[-6deg]" />
              </div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="relative z-10 pt-6 border-t border-[var(--color-charcoal)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[var(--color-charcoal)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-marker-orange)]" />
              <span>Available for software engineering & interface craft • 2026</span>
            </div>
            <a href="#work" className="hover:text-[var(--color-marker-orange)] transition-colors flex items-center gap-1">
              <span>scroll into the work</span>
              <ArrowDown size={12} className="animate-bounce" />
            </a>
          </div>
        </section>

        {/* ABOUT SECTION — Editorial Statement */}
        <section className="about-section py-28 border-y border-[var(--color-border)] bg-[var(--color-dew-drop)]" id="about">
          <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-handwritten text-2xl text-[var(--color-marker-orange)]">
                about aizat fahim
              </span>
              <HandDrawnArrow direction="down-right" className="-mb-2" />
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display text-[var(--color-cocoa-ink)] leading-[1.05] mb-12 max-w-5xl">
              i build digital systems;
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-[var(--color-charcoal)] items-start">
              <div className="md:col-span-4 space-y-1">
                <span className="font-mono text-xs font-bold text-[var(--color-charcoal)] uppercase block">
                  Aizat Fahim Firmansyah
                </span>
                <span className="font-mono text-xs text-gray-600 block">
                  Software Engineering (PPLG)
                </span>
                <span className="font-mono text-xs text-gray-500 block">
                  Solo / Bandung / Remote
                </span>
              </div>

              <div className="md:col-span-8 space-y-4 text-base md:text-xl text-[var(--color-cocoa-ink)] leading-relaxed font-serif">
                <p>
                  Software is best when it feels like an honest, physical notebook: clear boundaries, high performance, and visual craft that respects human cognitive rhythms.
                </p>
                <p>
                  Whether synchronizing distributed Web Audio across browser tabs or tuning a 90-minute circadian clock dial in Flutter, my goal is always: <span className="marker-highlight">less is more</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FULLSCREEN SELECTED WORK SHOWCASE */}
        <div id="work" className="py-12">
          <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-handwritten text-2xl text-[var(--color-marker-orange)]">
                the work is the product
              </span>
              <HandDrawnArrow direction="down-right" className="-mb-2" />
            </div>
            <h2 className="display-headline text-5xl sm:text-7xl font-bold">
              selected projects
            </h2>
          </div>

          {PROJECTS.map((project, idx) => (
            <FullscreenProjectStage key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* TOOLBOX NOTEBOOK WALL */}
        <ToolboxWall />

        {/* EXPERIMENTS SKETCHBOOK */}
        <ExperimentsSketch />

        {/* CONTACT SECTION */}
        <section className="contact-section py-28" id="contact">
          <div className="w-[96vw] max-w-[1200px] mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-2 mb-3">
              <span className="font-handwritten text-2xl text-[var(--color-marker-orange)]">
                say hello
              </span>
              <HandDrawnArrow direction="down-left" className="-mb-2" />
            </div>

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
                <span>say hello → {PORTFOLIO.email}</span>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-[var(--color-charcoal)]">
              {PORTFOLIO.socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-marker-orange)] transition-colors underline decoration-dotted"
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
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold tracking-tight text-[var(--color-charcoal)]">
                zafir;
              </span>
              <span className="text-xs font-mono text-[var(--color-charcoal)] opacity-80">
                built with craft & curiosity on cream paper
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
