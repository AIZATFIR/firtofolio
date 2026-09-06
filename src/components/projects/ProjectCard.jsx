import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Monitor, Tablet, Smartphone, RotateCcw, X } from 'lucide-react';
import GithubIcon from '../GithubIcon';

export default function ProjectCard({ project, index }) {
  const [viewportMode, setViewportMode] = useState('desktop');
  const [iframeKey, setIframeKey] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);
  const cardRef = useRef(null);
  const iframeContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [4, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  // Listen for Escape key to exit interactive mode across capture phases
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Escape' || e.keyCode === 27) && isInteractive) {
        setIsInteractive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    document.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [isInteractive]);

  return (
    <section
      ref={cardRef}
      className="project-scene relative min-h-screen py-16 flex flex-col justify-center border-b border-[var(--color-border)]"
      id={`project-${project.id}`}
    >
      <div className="w-[96vw] max-w-[1600px] mx-auto px-2 md:px-6 relative z-10">
        {/* Project Header Info */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6">
          <div>
            <h3 className="display-headline text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              {project.title}
            </h3>
            <p className="text-base md:text-xl text-[var(--color-muted)] font-serif italic mt-1 max-w-3xl">
              "{project.tagline}"
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn text-xs md:text-sm font-bold"
            >
              <span>open new tab</span>
              <ExternalLink size={13} />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn text-xs md:text-sm font-bold"
            >
              <GithubIcon size={14} />
              <span>code</span>
            </a>
          </div>
        </div>

        {/* FULLSCREEN PROJECT VIEWPORT FRAME (With Lazy Click-to-Interact to prevent scroll hijacking) */}
        <motion.div
          style={{
            rotateX,
            scale,
            opacity,
            transformPerspective: 1000,
          }}
          className="w-full border-[1.5px] border-[var(--color-text)] rounded-[20px] bg-[var(--color-card-bg)] overflow-hidden shadow-lg mb-8 will-change-transform relative"
        >
          {/* Browser Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-bg)] border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-text)] opacity-40" />
              <span className="w-2.5 h-2.5 rounded-full border border-[var(--color-text)] opacity-40" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-orange)]" />
              <span className="ml-3 text-xs font-mono text-[var(--color-muted)] truncate max-w-xs md:max-w-md hidden sm:inline-block">
                {project.liveUrl}
              </span>
            </div>

            {/* Viewport Mode Switchers & Interactive Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-[16px] text-xs font-mono font-medium transition-all ${
                  viewportMode === 'desktop'
                    ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
                title="Desktop View"
              >
                <Monitor size={13} />
                <span className="hidden md:inline">Desktop</span>
              </button>
              <button
                onClick={() => setViewportMode('tablet')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-[16px] text-xs font-mono font-medium transition-all ${
                  viewportMode === 'tablet'
                    ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
                title="Tablet View"
              >
                <Tablet size={13} />
                <span className="hidden md:inline">Tablet</span>
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-[16px] text-xs font-mono font-medium transition-all ${
                  viewportMode === 'mobile'
                    ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
                title="Mobile View"
              >
                <Smartphone size={13} />
                <span className="hidden md:inline">Mobile</span>
              </button>
              <button
                onClick={handleReload}
                className="p-1.5 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors rounded-full"
                title="Reload Live App"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* Iframe Viewport Container (88vh height) with Click-To-Interact Protection */}
          <div
            ref={iframeContainerRef}
            className="bg-[var(--color-surface-tint)] p-2 md:p-6 flex justify-center items-center overflow-hidden relative"
          >
            <div
              className="transition-all duration-300 ease-out rounded-[12px] overflow-hidden border border-[var(--color-border)] bg-white shadow-md relative"
              style={{
                width: viewportMode === 'desktop' ? '100%' : viewportMode === 'tablet' ? '768px' : '375px',
                height: viewportMode === 'desktop' ? '88vh' : viewportMode === 'tablet' ? '75vh' : '75vh',
                minHeight: viewportMode === 'desktop' ? '850px' : '550px',
                maxWidth: '100%',
              }}
            >
              {/* Real Live Iframe (pointer-events disabled when not active to prevent scroll trap) */}
              <iframe
                key={iframeKey}
                src={project.liveUrl}
                title={`${project.title} Live Application`}
                className="w-full h-full border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                style={{
                  pointerEvents: isInteractive ? 'auto' : 'none',
                }}
              />

              {/* Pure Transparent Click-to-Interact Layer (Zero visual shadow/badge, pure immersive live visual) */}
              {!isInteractive && (
                <div
                  onClick={() => setIsInteractive(true)}
                  className="absolute inset-0 z-20 cursor-pointer bg-transparent"
                  title="Click to interact"
                />
              )}

              {/* Active Mode Banner / Exit Button */}
              <AnimatePresence>
                {isInteractive && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-4 right-4 z-30 flex items-center gap-2"
                  >
                    <button
                      onClick={() => setIsInteractive(false)}
                      className="px-4 py-2 rounded-full bg-[var(--color-card-bg)] text-[var(--color-text)] border border-[var(--color-orange)] shadow-xl flex items-center gap-1.5 font-mono text-xs font-bold hover:bg-[var(--color-orange)] hover:text-white transition-all cursor-pointer select-none group"
                      title="Exit interaction mode"
                    >
                      <X size={13} className="text-[var(--color-orange)] group-hover:text-white transition-colors" />
                      <span>Exit Esc</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* 4-Stage Case Study Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-[12px] bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-orange)] block mb-1">01 / Problem</span>
            <p className="text-xs text-[var(--color-text)] leading-relaxed">{project.caseStudy.problem}</p>
          </div>
          <div className="p-4 rounded-[12px] bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-orange)] block mb-1">02 / Approach</span>
            <p className="text-xs text-[var(--color-text)] leading-relaxed">{project.caseStudy.approach}</p>
          </div>
          <div className="p-4 rounded-[12px] bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-orange)] block mb-1">03 / Architecture</span>
            <p className="text-xs text-[var(--color-text)] leading-relaxed">{project.caseStudy.architecture}</p>
          </div>
          <div className="p-4 rounded-[12px] bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-orange)] block mb-1">04 / Result</span>
            <p className="text-xs text-[var(--color-text)] leading-relaxed">{project.caseStudy.result}</p>
          </div>
        </div>

        {/* Technologies Tags */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-mono text-xs text-[var(--color-muted)] mr-2">Stack:</span>
          {project.technologies.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="px-3 py-1 rounded-[20px] text-xs font-mono bg-[var(--color-surface-tint)] border border-[var(--color-border)] text-[var(--color-text)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
