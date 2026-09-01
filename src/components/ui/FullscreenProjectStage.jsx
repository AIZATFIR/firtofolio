import React, { useState } from 'react';
import { ExternalLink, Monitor, Tablet, Smartphone, RotateCcw, FileText, Sparkles, Terminal } from 'lucide-react';
import GithubIcon from '../GithubIcon';
import HandDrawnArrow from './HandDrawnArrow';
import NameLabelSticker from './NameLabelSticker';

export default function FullscreenProjectStage({ project, index }) {
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop', 'tablet', 'mobile'
  const [iframeKey, setIframeKey] = useState(0);

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  const isFocusClock = project.id === 'focus-clock';

  return (
    <section
      className="fullscreen-project-stage relative min-h-screen py-16 border-b border-[var(--color-border)] flex flex-col justify-center"
      id={`project-${project.id}`}
    >
      {/* Background Big Index */}
      <div className="absolute top-8 left-6 md:left-12 pointer-events-none select-none z-0">
        <span className="font-mono text-7xl md:text-9xl font-black text-[var(--color-charcoal)] opacity-5">
          0{index + 1};
        </span>
      </div>

      <div className="w-[96vw] max-w-[1600px] mx-auto px-2 md:px-6 relative z-10">
        {/* Project Header Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-handwritten text-2xl text-[var(--color-marker-orange)]">
                {isFocusClock ? 'flagship primary project' : `project 0${index + 1}`}
              </span>
              <HandDrawnArrow direction="down-right" className="-mb-2" />
            </div>

            <div className="flex items-baseline gap-4 flex-wrap">
              <span className="font-mono text-xs text-[var(--color-charcoal)] uppercase tracking-wider font-bold">
                0{index + 1} / {project.category}
              </span>
              <span className="text-xs font-mono text-gray-500">• {project.year}</span>
            </div>

            <h2 className="display-headline text-4xl sm:text-6xl md:text-7xl font-bold mt-1">
              {project.title.toLowerCase()}
            </h2>
            <p className="text-base md:text-lg text-[var(--color-cocoa-ink)] font-serif italic mt-2 max-w-3xl">
              "{project.tagline}"
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn text-xs md:text-sm font-bold"
            >
              <span>try live</span>
              <ExternalLink size={14} />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn text-xs md:text-sm font-bold"
            >
              <GithubIcon size={14} />
              <span>github</span>
            </a>
          </div>
        </div>

        {/* FULLSCREEN PROJECT PREVIEW CONTAINER (95vw Wide) */}
        <div className="w-full border-[1.5px] border-[var(--color-charcoal)] rounded-[20px] bg-white overflow-hidden shadow-lg mb-8">
          {/* Browser Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-cream-paper)] border-b border-[var(--color-charcoal)]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--color-charcoal)]" />
              <span className="w-3 h-3 rounded-full border border-[var(--color-charcoal)] bg-white" />
              <span className="w-3 h-3 rounded-full bg-[var(--color-marker-orange)]" />
              <span className="ml-3 text-xs font-mono text-[var(--color-charcoal)] truncate max-w-xs md:max-w-md hidden sm:inline-block">
                {project.liveUrl}
              </span>
            </div>

            {/* Viewport Mode Switchers */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-[16px] text-xs font-mono font-medium transition-all ${
                  viewportMode === 'desktop'
                    ? 'bg-[var(--color-charcoal)] text-white'
                    : 'text-gray-600 hover:text-black border border-transparent hover:border-gray-300'
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
                    ? 'bg-[var(--color-charcoal)] text-white'
                    : 'text-gray-600 hover:text-black border border-transparent hover:border-gray-300'
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
                    ? 'bg-[var(--color-charcoal)] text-white'
                    : 'text-gray-600 hover:text-black border border-transparent hover:border-gray-300'
                }`}
                title="Mobile View"
              >
                <Smartphone size={13} />
                <span className="hidden md:inline">Mobile</span>
              </button>
              <button
                onClick={handleReload}
                className="p-1.5 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100"
                title="Reload Live App"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* Iframe Frame (75vh Height) */}
          <div className="bg-[var(--color-dew-drop)] p-2 md:p-6 flex justify-center items-center overflow-hidden">
            <div
              className="transition-all duration-300 ease-out rounded-[12px] overflow-hidden border border-[var(--color-charcoal)] bg-white shadow-md"
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
        </div>

        {/* Focus Clock Dedicated GitHub README Card */}
        {isFocusClock && project.readme && (
          <div className="w-full bg-white border-[1.5px] border-[var(--color-charcoal)] rounded-[16px] p-6 md:p-8 shadow-xs mb-8 relative">
            <div className="absolute -top-5 right-6 hidden sm:block rotate-[5deg]">
              <NameLabelSticker name="Focus Clock" category="AI & Rhythms" year="2026" />
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-charcoal)] mb-6">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--color-charcoal)]">
                <FileText size={15} className="text-[var(--color-marker-orange)]" />
                <span>README.md</span>
                <span className="text-gray-500 font-normal">({project.readme.branch})</span>
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--color-marker-orange)] hover:underline flex items-center gap-1 font-bold"
              >
                <span>{project.readme.repoName} ↗</span>
              </a>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-2xl font-bold font-display text-[var(--color-cocoa-ink)] mb-1">Focus Clock</h4>
                <p className="text-xs text-[var(--color-cocoa-ink)] font-mono">{project.readme.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.readme.sections.map((sec, secIdx) => (
                  <div key={secIdx} className="bg-[var(--color-dew-drop)] p-4 rounded-[12px] border border-[var(--color-charcoal)]">
                    <h5 className="font-mono text-xs font-bold text-[var(--color-charcoal)] mb-3 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[var(--color-marker-orange)]" />
                      {sec.title}
                    </h5>
                    <ul className="space-y-2">
                      {sec.points.map((pt, ptIdx) => {
                        const parts = pt.split('**:');
                        const boldPart = parts[0]?.replace('**', '');
                        const restPart = parts[1] || '';
                        return (
                          <li key={ptIdx} className="text-xs text-[var(--color-charcoal)] leading-relaxed">
                            <strong className="font-bold text-[var(--color-cocoa-ink)]">{boldPart}:</strong>
                            {restPart}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Build Command Box */}
              <div className="bg-[var(--color-charcoal)] p-4 rounded-[10px] text-[var(--color-cream-paper)] font-mono text-xs">
                <div className="flex items-center gap-2 mb-2 text-gray-400 pb-2 border-b border-gray-700 text-[10px]">
                  <Terminal size={12} className="text-[var(--color-marker-orange)]" />
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
          <div className="p-4 rounded-[12px] bg-white border border-[var(--color-charcoal)] shadow-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-marker-orange)] block mb-1">01 / Problem</span>
            <p className="text-xs text-[var(--color-cocoa-ink)] leading-relaxed">{project.caseStudy.problem}</p>
          </div>
          <div className="p-4 rounded-[12px] bg-white border border-[var(--color-charcoal)] shadow-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-marker-orange)] block mb-1">02 / Approach</span>
            <p className="text-xs text-[var(--color-cocoa-ink)] leading-relaxed">{project.caseStudy.approach}</p>
          </div>
          <div className="p-4 rounded-[12px] bg-white border border-[var(--color-charcoal)] shadow-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-marker-orange)] block mb-1">03 / Architecture</span>
            <p className="text-xs text-[var(--color-cocoa-ink)] leading-relaxed">{project.caseStudy.architecture}</p>
          </div>
          <div className="p-4 rounded-[12px] bg-white border border-[var(--color-charcoal)] shadow-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-marker-orange)] block mb-1">04 / Result</span>
            <p className="text-xs text-[var(--color-cocoa-ink)] leading-relaxed">{project.caseStudy.result}</p>
          </div>
        </div>

        {/* Technologies Tags */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-mono text-xs text-gray-500 mr-2">Stack:</span>
          {project.technologies.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="px-3 py-1 rounded-[20px] text-xs font-mono bg-[var(--color-dew-drop)] border border-[var(--color-charcoal)] text-[var(--color-charcoal)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
