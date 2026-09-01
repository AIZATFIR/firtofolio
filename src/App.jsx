import React, { useState } from 'react';
import { ArrowDown, Mail, ExternalLink, Sparkles, Terminal, Activity, Compass, Code2 } from 'lucide-react';
import GithubIcon from './components/GithubIcon';
import { PORTFOLIO, PROJECTS } from './data/portfolioData';
import SemicolonGlitch from './components/SemicolonGlitch';
import ProjectScene from './components/ProjectScene';
import ToolboxWall from './components/ToolboxWall';
import ExperimentsSketch from './components/ExperimentsSketch';
import SmoothScrollProvider from './components/ui/SmoothScrollProvider';
import HandDrawnArrow from './components/ui/HandDrawnArrow';
import { LightningSticker, BearSticker, HeartEyesSticker, SproutSparkleSticker } from './components/ui/StickerCluster';

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[var(--color-cream-paper)] text-[var(--color-charcoal)] selection:bg-[var(--color-marker-orange)] selection:text-white font-sans antialiased">
        {/* Top Navigation */}
        <header className="fixed top-0 left-0 right-0 z-40 py-5 bg-[rgba(253,251,249,0.9)] backdrop-blur-xs border-b border-[var(--color-border)]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* Top-Left Brand Logo */}
            <a href="#" className="flex items-center gap-1 group">
              <span className="font-display text-xl font-bold text-[var(--color-cocoa-ink)] tracking-tight">
                zafir
              </span>
              <SemicolonGlitch className="text-xl font-mono" />
            </a>

            {/* Navigation Links */}
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

            {/* Persistent Header CTA */}
            <a
              href="mailto:aizatfir@gmail.com"
              className="pill-btn text-xs font-bold"
            >
              <span>let's build ↗</span>
            </a>
          </div>
        </header>

        {/* HERO SECTION — Superr 2-Column Split */}
        <section className="hero-section relative min-h-[90vh] flex flex-col justify-center pt-32 pb-16 px-6 md:px-12 max-w-[1200px] mx-auto" id="intro">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Half: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6">
              {/* Handwritten Script Annotation with Curved Arrow */}
              <div className="flex items-center gap-3">
                <span className="font-handwritten text-2xl md:text-3xl text-[var(--color-marker-orange)]">
                  Dear visitor,
                </span>
                <HandDrawnArrow direction="curled" className="-mb-3" />
              </div>

              {/* Display Headline: 104px lowercase Cocoa Ink */}
              <h1 className="display-headline">
                meet zafir<SemicolonGlitch className="text-[var(--color-marker-orange)]" />
              </h1>

              {/* Body text with Marker Highlight underline */}
              <p className="text-xl md:text-2xl text-[var(--color-cocoa-ink)] font-serif leading-snug max-w-xl">
                A software engineer building tactile digital tools, distributed audio mesh, and cognitive flow architectures{' '}
                <span className="marker-highlight">actually!</span>
              </p>

              {/* Pill Action Button */}
              <div className="pt-2">
                <a
                  href="#work"
                  className="pill-btn text-base font-semibold"
                >
                  <span>explore work</span>
                  <ArrowDown size={15} />
                </a>

                {/* Pre-order / Status Info Block */}
                <p className="text-xs font-mono text-[var(--color-cocoa-ink)] mt-3 opacity-80">
                  Available for engineering & interface craft • 2026
                </p>
              </div>
            </div>

            {/* Right Half: Tilted Showcase Object & Sticker Cluster */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Floating Illustrated Stickers */}
              <div className="absolute -top-8 -left-4 z-20">
                <LightningSticker rotation="rotate-[-12deg]" />
              </div>
              <div className="absolute -bottom-6 -right-4 z-20">
                <BearSticker rotation="rotate-[14deg]" />
              </div>
              <div className="absolute -top-6 right-6 z-20">
                <SproutSparkleSticker rotation="rotate-[8deg]" />
              </div>

              {/* Tilted Card Object (5-8° tilt) */}
              <div className="w-full max-w-[380px] p-4 bg-white border-[1.5px] border-[var(--color-charcoal)] rounded-[16px] shadow-lg rotate-[5deg] hover:rotate-0 transition-transform duration-300">
                <div className="relative overflow-hidden rounded-[10px] border border-[var(--color-charcoal)] bg-[var(--color-dew-drop)] aspect-[4/3] flex items-center justify-center p-6 text-center">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-marker-orange)] block">
                      FLAGSHIP PRODUCT
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[var(--color-cocoa-ink)]">
                      Focus Clock
                    </h3>
                    <p className="text-xs text-[var(--color-charcoal)] font-mono">
                      Flutter • Riverpod • Isar • AI
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between font-mono text-xs text-[var(--color-charcoal)]">
                  <span>time-blocking tool</span>
                  <span className="font-bold text-[var(--color-marker-orange)]">01 / 05</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION — Editorial Notebook Moment */}
        <section className="about-section py-28 border-y border-[var(--color-border)] bg-[var(--color-dew-drop)]" id="about">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-handwritten text-2xl text-[var(--color-marker-orange)]">
                about aizat fahim
              </span>
              <HandDrawnArrow direction="down-right" className="-mb-2" />
            </div>

            {/* Huge Editorial Headline */}
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display text-[var(--color-cocoa-ink)] leading-[1.1] mb-12 max-w-4xl">
              i build things i want to understand.
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

              <div className="md:col-span-8 space-y-4 text-base md:text-lg text-[var(--color-cocoa-ink)] leading-relaxed font-serif">
                <p>
                  Software is best when it feels like an honest, physical notebook: clear boundaries, high performance, and visual craft that prioritizes human attention.
                </p>
                <p>
                  Whether synchronizing distributed Web Audio across browser tabs or tuning a 90-minute circadian clock dial in Flutter, my goal is always the same: <span className="marker-highlight">less is more</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SELECTED WORK — Fullscreen Project Stories with ContainerScroll */}
        <div id="work" className="py-16">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-handwritten text-2xl text-[var(--color-marker-orange)]">
                the work is the product
              </span>
              <HandDrawnArrow direction="down-right" className="-mb-2" />
            </div>
            <h2 className="display-headline">
              selected projects
            </h2>
          </div>

          {PROJECTS.map((project, idx) => (
            <ProjectScene key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* TOOLBOX WALL */}
        <ToolboxWall />

        {/* EXPERIMENTS SKETCHBOOK */}
        <ExperimentsSketch />

        {/* CURRENTLY BUILDING */}
        <section className="currently-building py-20 border-b border-[var(--color-border)] bg-[var(--color-dew-drop)]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-charcoal)] mb-8">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-charcoal)]">
                <Activity size={14} className="text-[var(--color-marker-orange)]" />
                <span>currently on the desk</span>
              </div>
              <span className="text-xs font-mono text-[var(--color-charcoal)] bg-white px-3 py-1 rounded-[20px] border border-[var(--color-charcoal)] font-bold">
                ● ACTIVE LAB
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PORTFOLIO.currentlyBuilding.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-[12px] bg-white border border-[var(--color-charcoal)] flex items-center justify-between shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[var(--color-marker-orange)]">
                      {item.num}
                    </span>
                    <span className="text-xs md:text-sm font-medium text-[var(--color-cocoa-ink)]">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-[20px] bg-[var(--color-dew-drop)] border border-[var(--color-charcoal)] text-[var(--color-charcoal)]">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section py-28" id="contact">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
            <div className="flex justify-center items-center gap-2 mb-3">
              <span className="font-handwritten text-2xl text-[var(--color-marker-orange)]">
                say hello
              </span>
              <HandDrawnArrow direction="down-left" className="-mb-2" />
            </div>

            <h2 className="text-4xl md:text-7xl font-bold font-display text-[var(--color-cocoa-ink)] max-w-2xl mx-auto leading-tight mb-8">
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
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold tracking-tight text-[var(--color-charcoal)]">
                zafir;
              </span>
              <span className="text-xs font-mono text-[var(--color-charcoal)] opacity-80">
                built with craft & curiosity
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
