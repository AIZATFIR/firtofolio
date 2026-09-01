import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Monitor, Tablet, Smartphone, RotateCcw, FileText, Sparkles, Terminal } from 'lucide-react';
import GithubIcon from '../GithubIcon';

export default function ProjectCard({ project, index }) {
  const [viewportMode, setViewportMode] = useState('desktop');
  const [iframeKey, setIframeKey] = useState(0);
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  const isFocusClock = project.id === 'focus-clock';

  return (
    <section
      ref={cardRef}
      className="project-scene relative min-h-screen py-16 flex flex-col justify-center border-b border-[var(--color-border)]"
      id={`project-${project.id}`}
    >
      {/* Background Big Index */}
      <div className="absolute top-6 left-6 md:left-12 pointer-events-none select-none z-0">
        <span className="font-mono text-7xl md:text-9xl font-black text-[var(--color-headline)] opacity-5">
          0{index + 1};
        </span>
      </div>

      <div className="w-[96vw] max-w-[1600px] mx-auto px-2 md:px-6 relative z-10">
        {/* Project Header Info */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-xs text-[var(--color-orange)] uppercase tracking-wider font-bold">
                0{index + 1} / {project.category}
              </span>
              <span className="text-xs font-mono text-[var(--color-muted)]">• {project.year}</span>
            </div>

            <h3 className="display-headline text-4xl sm:text-6xl md:text-7xl font-bold">
              {project.title}
            </h3>
            <p className="text-base md:text-lg text-[var(--color-muted)] font-serif italic mt-1 max-w-2xl">
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
              <span>try live</span>
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

        {/* FULLSCREEN PROJECT VIEWPORT FRAME (95vw Wide) with Smooth Scroll Tilt */}
        <motion.div
          style={{
            rotateX,
            scale,
            opacity,
            transformPerspective: 1000,
          }}
          className="w-full border-[1.5px] border-[var(--color-text)] rounded-[20px] bg-[var(--color-card-bg)] overflow-hidden shadow-lg mb-8 will-change-transform"
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

            {/* Viewport Mode Switchers */}
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

          {/* Iframe Viewport Container (75vh Height) */}
          <div className="bg-[var(--color-surface-tint)] p-2 md:p-6 flex justify-center items-center overflow-hidden">
            <div
              className="transition-all duration-300 ease-out rounded-[12px] overflow-hidden border border-[var(--color-border)] bg-white shadow-md"
              style={{
                width: viewportMode === 'desktop' ? '100%' : viewportMode === 'tablet' ? '768px' : '375px',
                height: viewportMode === 'desktop' ? '72vh' : viewportMode === 'tablet' ? '65vh' : '70vh',
                minHeight: '480px',
                maxWidth: '100%',
              }}
            >
              <iframe
                key={iframeKey}
                src={project.liveUrl}
                title={`${project.title} Live Application`}
                className="w-full h-full border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              />
            </div>
          </div>
        </motion.div>

        {/* Focus Clock Dedicated GitHub README Card */}
        {isFocusClock && project.readme && (
          <div className="w-full bg-[var(--color-card-bg)] border-[1.5px] border-[var(--color-border)] rounded-[16px] p-6 md:p-8 shadow-xs mb-8">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)] mb-6">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--color-text)]">
                <FileText size={15} className="text-[var(--color-orange)]" />
                <span>README.md</span>
                <span className="text-[var(--color-muted)] font-normal">({project.readme.branch})</span>
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--color-orange)] hover:underline flex items-center gap-1 font-bold"
              >
                <span>{project.readme.repoName} ↗</span>
              </a>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-2xl font-bold font-display text-[var(--color-headline)] mb-1">Focus Clock</h4>
                <p className="text-xs text-[var(--color-muted)] font-mono">{project.readme.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.readme.sections.map((sec, secIdx) => (
                  <div key={secIdx} className="bg-[var(--color-surface-tint)] p-4 rounded-[12px] border border-[var(--color-border)]">
                    <h5 className="font-mono text-xs font-bold text-[var(--color-text)] mb-3 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[var(--color-orange)]" />
                      {sec.title}
                    </h5>
                    <ul className="space-y-2">
                      {sec.points.map((pt, ptIdx) => {
                        const parts = pt.split('**:');
                        const boldPart = parts[0]?.replace('**', '');
                        const restPart = parts[1] || '';
                        return (
                          <li key={ptIdx} className="text-xs text-[var(--color-text)] leading-relaxed">
                            <strong className="font-bold text-[var(--color-headline)]">{boldPart}:</strong>
                            {restPart}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Build Command Box */}
              <div className="bg-[#171717] p-4 rounded-[10px] text-white font-mono text-xs border border-gray-800">
                <div className="flex items-center gap-2 mb-2 text-gray-400 pb-2 border-b border-gray-800 text-[10px]">
                  <Terminal size={12} className="text-[var(--color-orange)]" />
                  <span>Build From Source</span>
                </div>
                <pre className="overflow-x-auto text-[11px] text-green-400 whitespace-pre leading-relaxed">
                  {project.readme.buildSnippet}
                </pre>
              </div>
            </div>
          </div>
        )}

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
