import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Monitor, Tablet, Smartphone, RotateCcw, FileText, Sparkles, Terminal } from 'lucide-react';
import GithubIcon from './GithubIcon';
import Magnet from './reactbits/Magnet';
import SpotlightCard from './reactbits/SpotlightCard';

export default function ProjectScene({ project, index }) {
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop', 'tablet', 'mobile'
  const [iframeKey, setIframeKey] = useState(0);

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <section className="project-scene relative min-h-screen py-24 border-b border-[var(--color-border)] flex flex-col justify-center" id={`project-${project.id}`}>
      {/* Background Section Index Number */}
      <div className="absolute top-12 left-6 md:left-12 pointer-events-none select-none">
        <span className="font-mono text-8xl md:text-[140px] font-black text-[var(--color-charcoal)] opacity-5 tracking-tighter">
          {project.number}
        </span>
      </div>

      <div className="max-w-[1240px] w-full mx-auto px-6 md:px-12 relative z-10">
        {/* Header Title Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-orange)] font-bold px-2.5 py-1 bg-[rgba(255,111,30,0.08)] rounded-full border border-[rgba(255,111,30,0.2)]">
                Project {project.number} / {project.category}
              </span>
              <span className="text-xs font-mono text-[var(--color-muted)]">• {project.year}</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-[var(--color-charcoal)]">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Magnet padding={30} magnetStrength={2}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="explore"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-orange)] text-white text-xs font-mono font-bold hover:bg-[#e05e15] transition-all shadow-sm"
              >
                <span>OPEN LIVE</span>
                <ExternalLink size={14} />
              </a>
            </Magnet>
            <Magnet padding={30} magnetStrength={2}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-charcoal)] text-xs font-mono font-bold hover:border-[var(--color-charcoal)] transition-all"
              >
                <GithubIcon size={14} />
                <span>GITHUB</span>
              </a>
            </Magnet>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-[var(--color-cocoa)] max-w-3xl mb-8 leading-relaxed font-serif italic">
          "{project.tagline}"
        </p>

        {/* Live Interactive Embed Frame */}
        <div className="live-embed-container mb-12">
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-charcoal)] text-[var(--color-cream)] rounded-t-2xl border-t border-x border-[var(--color-charcoal)]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
              <span className="ml-3 text-xs font-mono text-[var(--color-cream)] opacity-70 hidden sm:inline-block truncate max-w-xs md:max-w-md">
                {project.liveUrl}
              </span>
            </div>

            {/* Viewport Switchers */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewportMode === 'desktop' ? 'bg-[var(--color-orange)] text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Desktop View"
              >
                <Monitor size={14} />
              </button>
              <button
                onClick={() => setViewportMode('tablet')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewportMode === 'tablet' ? 'bg-[var(--color-orange)] text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Tablet View"
              >
                <Tablet size={14} />
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewportMode === 'mobile' ? 'bg-[var(--color-orange)] text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Mobile View"
              >
                <Smartphone size={14} />
              </button>
              <button
                onClick={handleReload}
                className="p-1.5 rounded text-gray-400 hover:text-white transition-colors ml-1"
                title="Reload Frame"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Iframe Viewport Wrapper */}
          <div className="bg-[var(--color-dew)] p-3 md:p-6 rounded-b-2xl border-b border-x border-[var(--color-border)] flex justify-center items-center overflow-hidden">
            <div
              className="transition-all duration-300 ease-out shadow-2xl rounded-xl overflow-hidden border border-[rgba(0,0,0,0.1)] bg-white"
              style={{
                width: viewportMode === 'desktop' ? '100%' : viewportMode === 'tablet' ? '768px' : '375px',
                height: viewportMode === 'desktop' ? '600px' : viewportMode === 'tablet' ? '540px' : '620px',
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
        {project.readme && (
          <div className="mb-12">
            <SpotlightCard
              spotlightColor="rgba(255, 111, 30, 0.12)"
              borderColor="rgba(255, 111, 30, 0.4)"
              className="p-6 md:p-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--color-charcoal)]">
                  <FileText size={15} className="text-[var(--color-orange)]" />
                  <span>README.md</span>
                  <span className="text-[var(--color-muted)] font-normal">({project.readme.branch})</span>
                </div>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--color-orange)] hover:underline flex items-center gap-1"
                >
                  <span>{project.readme.repoName} ↗</span>
                </a>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold font-mono text-[var(--color-charcoal)] mb-1">Focus Clock</h4>
                  <p className="text-xs text-[var(--color-muted)] font-mono">{project.readme.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.readme.sections.map((sec, secIdx) => (
                    <div key={secIdx} className="bg-[var(--color-dew)] p-4 rounded-xl border border-[var(--color-border)]">
                      <h5 className="font-mono text-xs font-bold text-[var(--color-charcoal)] mb-3 flex items-center gap-1.5">
                        <Sparkles size={13} className="text-[var(--color-orange)]" />
                        {sec.title}
                      </h5>
                      <ul className="space-y-2">
                        {sec.points.map((pt, ptIdx) => {
                          const parts = pt.split('**:');
                          const boldPart = parts[0]?.replace('**', '');
                          const restPart = parts[1] || '';
                          return (
                            <li key={ptIdx} className="text-xs text-[var(--color-charcoal)] leading-relaxed">
                              <strong className="font-bold text-[var(--color-cocoa)]">{boldPart}:</strong>
                              {restPart}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Shell Build Box */}
                <div className="bg-[var(--color-charcoal)] p-4 rounded-xl text-[var(--color-cream)] font-mono text-xs">
                  <div className="flex items-center gap-2 mb-2 text-gray-400 pb-2 border-b border-gray-700 text-[10px]">
                    <Terminal size={12} className="text-[var(--color-orange)]" />
                    <span>Build From Source</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] text-green-400 whitespace-pre leading-relaxed">
                    {project.readme.buildSnippet}
                  </pre>
                </div>
              </div>
            </SpotlightCard>
          </div>
        )}

        {/* 4-Stage Case Study Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)]">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-orange)] block mb-1">01 / Problem</span>
            <p className="text-xs text-[var(--color-cocoa)] leading-relaxed">{project.caseStudy.problem}</p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)]">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-orange)] block mb-1">02 / Approach</span>
            <p className="text-xs text-[var(--color-cocoa)] leading-relaxed">{project.caseStudy.approach}</p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)]">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-orange)] block mb-1">03 / Architecture</span>
            <p className="text-xs text-[var(--color-cocoa)] leading-relaxed">{project.caseStudy.architecture}</p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)]">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-orange)] block mb-1">04 / Result</span>
            <p className="text-xs text-[var(--color-cocoa)] leading-relaxed">{project.caseStudy.result}</p>
          </div>
        </div>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[var(--color-dew)] border border-[var(--color-border)] text-[var(--color-cocoa)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
