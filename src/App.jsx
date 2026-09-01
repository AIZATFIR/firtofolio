import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, ExternalLink, Sparkles, Terminal, Activity, Compass, Code2 } from 'lucide-react';
import GithubIcon from './components/GithubIcon';
import { PORTFOLIO, PROJECTS } from './data/portfolioData';
import DecryptedText from './components/reactbits/DecryptedText';
import VariableProximity from './components/reactbits/VariableProximity';
import SplitText from './components/reactbits/SplitText';
import Magnet from './components/reactbits/Magnet';
import ClickSpark from './components/reactbits/ClickSpark';
import CustomCursor from './components/reactbits/CustomCursor';
import SemicolonGlitch from './components/SemicolonGlitch';
import ProjectScene from './components/ProjectScene';
import ToolboxWall from './components/ToolboxWall';
import ExperimentsSketch from './components/ExperimentsSketch';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ClickSpark sparkColor="#ff6f1e" sparkCount={10} sparkRadius={28}>
      <CustomCursor />

      <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-charcoal)] selection:bg-[var(--color-orange)] selection:text-white font-sans antialiased">
        {/* Sticky Minimal Navigation */}
        <header
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            scrolled
              ? 'py-3.5 bg-[rgba(253,251,249,0.85)] backdrop-blur-md border-b border-[var(--color-border)] shadow-xs'
              : 'py-6 bg-transparent'
          }`}
        >
          <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* Wordmark */}
            <a href="#" className="flex items-center gap-1 group" data-cursor="link">
              <span className="font-mono text-lg md:text-xl font-black tracking-tight text-[var(--color-charcoal)]">
                ZAFIR
              </span>
              <SemicolonGlitch className="text-xl" />
            </a>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-bold tracking-wider uppercase text-[var(--color-cocoa)]">
              <a href="#work" className="hover:text-[var(--color-orange)] transition-colors" data-cursor="link">
                Work
              </a>
              <a href="#about" className="hover:text-[var(--color-orange)] transition-colors" data-cursor="link">
                About
              </a>
              <a href="#toolbox" className="hover:text-[var(--color-orange)] transition-colors" data-cursor="link">
                Toolbox
              </a>
              <a href="#experiments" className="hover:text-[var(--color-orange)] transition-colors" data-cursor="link">
                Experiments
              </a>
              <a href="#contact" className="hover:text-[var(--color-orange)] transition-colors" data-cursor="link">
                Contact
              </a>
            </nav>

            {/* CTA Button */}
            <Magnet padding={20} magnetStrength={3}>
              <a
                href="mailto:aizatfir@gmail.com"
                data-cursor="explore"
                className="px-4 py-2 rounded-full border border-[var(--color-border)] text-xs font-mono font-bold text-[var(--color-charcoal)] bg-[var(--color-card-bg)] hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition-all"
              >
                Let's Build ↗
              </a>
            </Magnet>
          </div>
        </header>

        {/* HERO SECTION — Full Viewport Experience */}
        <section className="hero-section relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 max-w-[1240px] mx-auto">
          {/* Handwritten Line Doodle */}
          <div className="absolute top-28 left-6 md:left-12 pointer-events-none opacity-40">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none">
              <path
                d="M5 20 C 30 5, 70 35, 115 15"
                stroke="var(--color-orange)"
                strokeWidth="2"
                strokeLinecap="round"
                className="animate-pulse"
              />
            </svg>
          </div>

          <div className="flex-1 flex flex-col justify-center my-auto">
            <div className="mb-4">
              <span className="font-mono text-sm md:text-base text-[var(--color-orange)] font-bold tracking-widest uppercase inline-flex items-center gap-2">
                <Sparkles size={16} />
                <DecryptedText text="hello, world" speed={35} />
              </span>
            </div>

            {/* Giant Name Typography with Semicolon */}
            <h1 className="text-[clamp(60px,12vw,160px)] font-black tracking-tighter leading-[0.9] text-[var(--color-charcoal)] mb-6 select-none flex items-baseline flex-wrap">
              <SplitText text="ZAFIR" delay={60} />
              <SemicolonGlitch className="ml-1" />
            </h1>

            {/* Tagline with Proximity & Scramble */}
            <div className="max-w-3xl mb-8">
              <p className="text-xl md:text-3xl font-medium text-[var(--color-cocoa)] leading-snug">
                <VariableProximity
                  label="developer / builder / curious human"
                  radius={140}
                  className="font-sans font-bold"
                />
              </p>
              <p className="text-sm md:text-base text-[var(--color-muted)] font-mono mt-3">
                Crafting interactive digital experiences, distributed audio mesh, and cognitive flow tools.
              </p>
            </div>

            {/* Hero CTA & Socials */}
            <div className="flex flex-wrap items-center gap-4">
              <Magnet padding={35} magnetStrength={2.2}>
                <a
                  href="#work"
                  data-cursor="explore"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[var(--color-charcoal)] text-[var(--color-cream)] text-xs md:text-sm font-mono font-bold hover:bg-[var(--color-orange)] transition-all shadow-md"
                >
                  <span>EXPLORE MY WORK</span>
                  <ArrowDown size={15} />
                </a>
              </Magnet>

              <Magnet padding={25} magnetStrength={2.5}>
                <a
                  href="https://github.com/aizatfir"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="view"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)] text-xs md:text-sm font-mono font-bold text-[var(--color-charcoal)] hover:border-[var(--color-charcoal)] transition-all"
                >
                  <GithubIcon size={15} />
                  <span>@aizatfir</span>
                </a>
              </Magnet>
            </div>
          </div>

          {/* Scroll Indicator SVG */}
          <div className="pt-8 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-muted)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              <span>Available for engineering & interaction craft</span>
            </div>
            <a href="#about" className="flex items-center gap-1.5 hover:text-[var(--color-orange)] transition-colors">
              <span>Scroll to explore</span>
              <ArrowDown size={13} className="animate-bounce" />
            </a>
          </div>
        </section>

        {/* ABOUT / IDENTITY SECTION — Large Kinetic Statement */}
        <section className="about-section py-28 border-y border-[var(--color-border)] bg-[var(--color-dew)]" id="about">
          <div className="max-w-[1240px] mx-auto px-6 md:px-12">
            <div className="mb-6 flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-orange)] uppercase tracking-widest">
              <Compass size={14} />
              <span>00 / Core Philosophy</span>
            </div>

            {/* Giant Interactive Proximity Statement */}
            <div className="py-6">
              <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-[var(--color-charcoal)] select-none">
                <VariableProximity
                  label="I BUILD THINGS I WANT TO UNDERSTAND."
                  radius={160}
                  falloff="gaussian"
                />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 pt-8 border-t border-[var(--color-border)] items-start">
              <div className="md:col-span-4">
                <span className="font-mono text-xs font-bold text-[var(--color-charcoal)] uppercase block mb-1">
                  Aizat Fahim Firmansyah
                </span>
                <span className="font-mono text-xs text-[var(--color-muted)] block">
                  Software Engineer • Bandung / Remote
                </span>
              </div>

              <div className="md:col-span-8 space-y-4 text-sm md:text-base text-[var(--color-cocoa)] leading-relaxed font-serif">
                <p>
                  Technology should not feel like an intimidating black box. I treat code as a laboratory to unpack complex systems—whether that is real-time Web Audio synchronization, Arabic computational morphology, or biological circadian productivity cycles.
                </p>
                <p>
                  Every project is an exercise in <strong>tactile craft</strong>: high performance, thoughtful typography, and animations that serve narrative hierarchy rather than decoration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SELECTED WORK — Fullscreen Project Stories */}
        <div id="work">
          <div className="max-w-[1240px] mx-auto px-6 md:px-12 pt-20 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-orange)] uppercase tracking-widest mb-2">
              <Code2 size={14} />
              <span>Selected Engineering Work</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--color-charcoal)]">
              PROJECT STORIES
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

        {/* CURRENTLY BUILDING — Live Status */}
        <section className="currently-building py-20 border-b border-[var(--color-border)] bg-[var(--color-dew)]">
          <div className="max-w-[1240px] mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)] mb-8">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-charcoal)]">
                <Activity size={14} className="text-[var(--color-orange)]" />
                <span>Currently Building</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                ACTIVE ENGINE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PORTFOLIO.currentlyBuilding.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[var(--color-orange)]">
                      {item.num}
                    </span>
                    <span className="text-xs md:text-sm font-medium text-[var(--color-charcoal)]">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--color-dew)] border border-[var(--color-border)] text-[var(--color-muted)]">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section py-28 border-b border-[var(--color-border)]" id="contact">
          <div className="max-w-[1240px] mx-auto px-6 md:px-12 text-center">
            <span className="text-xs font-mono font-bold text-[var(--color-orange)] uppercase tracking-widest block mb-4">
              Initiate Dialogue
            </span>

            <h2 className="text-4xl md:text-7xl font-black tracking-tight text-[var(--color-charcoal)] max-w-3xl mx-auto leading-tight mb-8">
              HAVE AN INTERESTING PROBLEM? <br />
              <span className="text-[var(--color-orange)]">LET'S BUILD.</span>
            </h2>

            <div className="flex justify-center mb-12">
              <Magnet padding={45} magnetStrength={2}>
                <a
                  href={`mailto:${PORTFOLIO.email}`}
                  data-cursor="explore"
                  className="inline-flex items-center gap-3 px-9 py-5 rounded-full bg-[var(--color-charcoal)] text-[var(--color-cream)] text-sm md:text-base font-mono font-bold hover:bg-[var(--color-orange)] transition-all shadow-xl"
                >
                  <Mail size={18} />
                  <span>SAY HELLO → {PORTFOLIO.email}</span>
                </a>
              </Magnet>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-[var(--color-muted)]">
              {PORTFOLIO.socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="hover:text-[var(--color-orange)] transition-colors underline decoration-dotted"
                >
                  {s.name} ({s.handle})
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* MARKER ORANGE BRAND BAND FOOTER */}
        <footer className="footer-brand-band py-12 bg-[var(--color-orange)] text-white select-none">
          <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-black tracking-tighter text-white">
                ZAFIR;
              </span>
              <span className="text-xs font-mono opacity-80">
                built with React + React Bits + curiosity
              </span>
            </div>

            <div className="text-xs font-mono opacity-90 text-center md:text-right">
              {PORTFOLIO.copyright}
            </div>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}
