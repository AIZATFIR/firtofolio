import React, { useState } from 'react';
import { ExternalLink, Monitor, Tablet, Smartphone, RotateCcw, FileText, Sparkles, Terminal } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { ContainerScroll } from './ui/container-scroll-animation';
import HandDrawnArrow from './ui/HandDrawnArrow';
import NameLabelSticker from './ui/NameLabelSticker';
import { LightningSticker, HeartEyesSticker, SproutSparkleSticker } from './ui/StickerCluster';

export default function ProjectScene({ project, index }) {
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop', 'tablet', 'mobile'
  const [iframeKey, setIframeKey] = useState(0);

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  const isFocusClock = project.id === 'focus-clock';

  return (
    <section className="project-scene relative py-20 border-b border-[var(--color-border)]" id={`project-${project.id}`}>
      {/* Container Scroll Presentation */}
      <ContainerScroll
        titleComponent={
          <div className="relative">
            {/* Handwritten script caption with curved arrow */}
            <div className="flex items-center gap-3 mb-2">
              <span className="font-handwritten text-2xl text-[var(--color-marker-orange)]">
                {isFocusClock ? 'flagship primary project' : `project 0${index + 1} notebook`}
              </span>
              <HandDrawnArrow direction="down-right" className="-mb-4" />
            </div>

            {/* Display Headline */}
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-[var(--color-charcoal)] uppercase tracking-wider block mb-1">
                  0{index + 1} / {project.category}
                </span>
                <h2 className="display-headline">
                  {project.title.toLowerCase()}
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn"
                >
                  <span>try live</span>
                  <ExternalLink size={15} />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn"
                >
                  <GithubIcon size={15} />
                  <span>code</span>
                </a>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-[var(--color-cocoa-ink)] mt-4 max-w-2xl font-serif italic">
              "{project.tagline}"
            </p>
          </div>
        }
      >
        {/* Project Card Interior / Live Application Embed */}
        <div className="relative w-full h-full flex flex-col bg-white">
          {/* Browser Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--color-cream-paper)] border-b border-[var(--color-charcoal)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-charcoal)]" />
              <span className="w-2.5 h-2.5 rounded-full border border-[var(--color-charcoal)] bg-white" />
              <span className="w-2.5 h-2.5 rounded-full border border-[var(--color-charcoal)] bg-[var(--color-marker-orange)]" />
              <span className="ml-3 text-xs font-mono text-[var(--color-charcoal)] truncate max-w-xs md:max-w-md">
                {project.liveUrl}
              </span>
            </div>

            {/* Viewport Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                  viewportMode === 'desktop' ? 'bg-[var(--color-charcoal)] text-white' : 'text-gray-600 hover:text-black'
                }`}
                title="Desktop Viewport"
              >
                <Monitor size={13} />
              </button>
              <button
                onClick={() => setViewportMode('tablet')}
                className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                  viewportMode === 'tablet' ? 'bg-[var(--color-charcoal)] text-white' : 'text-gray-600 hover:text-black'
                }`}
                title="Tablet Viewport"
              >
                <Tablet size={13} />
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                  viewportMode === 'mobile' ? 'bg-[var(--color-charcoal)] text-white' : 'text-gray-600 hover:text-black'
                }`}
                title="Mobile Viewport"
              >
                <Smartphone size={13} />
              </button>
              <button
                onClick={handleReload}
                className="p-1 text-gray-500 hover:text-black transition-colors"
                title="Reload"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* Iframe Viewport Frame */}
          <div className="flex-1 bg-[var(--color-dew-drop)] p-2 md:p-4 flex justify-center items-center overflow-hidden">
            <div
              className="transition-all duration-300 ease-out rounded-[10px] overflow-hidden border border-[var(--color-charcoal)] bg-white shadow-xs"
              style={{
                width: viewportMode === 'desktop' ? '100%' : viewportMode === 'tablet' ? '768px' : '375px',
                height: viewportMode === 'desktop' ? '540px' : viewportMode === 'tablet' ? '500px' : '560px',
                maxWidth: '100%',
              }}
            >
              <iframe
                key={iframeKey}
                src={project.liveUrl}
                title={`${project.title} Live Web App`}
                className="w-full h-full border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              />
            </div>
          </div>
        </div>
      </ContainerScroll>

      {/* Narrative & Details (Below the Container Scroll) */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 mt-10">
        {/* Dedicated GitHub README Card for Focus Clock */}
        {isFocusClock && project.readme && (
          <div className="mb-12 bg-white border-[1.5px] border-[var(--color-charcoal)] rounded-[16px] p-6 md:p-8 shadow-xs relative">
            {/* Laminated Sticker Tag */}
            <div className="absolute -top-5 right-6 hidden sm:block rotate-[6deg]">
              <NameLabelSticker name="Focus Clock" category="Ultradian Flow" year="2026" />
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
                <h4 className="text-xl font-bold font-mono text-[var(--color-charcoal)] mb-1">Focus Clock</h4>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-[12px] bg-[var(--color-cream-paper)] border border-[var(--color-charcoal)] shadow-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-marker-orange)] block mb-1">01 / Problem</span>
            <p className="text-xs text-[var(--color-cocoa-ink)] leading-relaxed">{project.caseStudy.problem}</p>
          </div>
          <div className="p-4 rounded-[12px] bg-[var(--color-cream-paper)] border border-[var(--color-charcoal)] shadow-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-marker-orange)] block mb-1">02 / Approach</span>
            <p className="text-xs text-[var(--color-cocoa-ink)] leading-relaxed">{project.caseStudy.approach}</p>
          </div>
          <div className="p-4 rounded-[12px] bg-[var(--color-cream-paper)] border border-[var(--color-charcoal)] shadow-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-marker-orange)] block mb-1">03 / Architecture</span>
            <p className="text-xs text-[var(--color-cocoa-ink)] leading-relaxed">{project.caseStudy.architecture}</p>
          </div>
          <div className="p-4 rounded-[12px] bg-[var(--color-cream-paper)] border border-[var(--color-charcoal)] shadow-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-marker-orange)] block mb-1">04 / Result</span>
            <p className="text-xs text-[var(--color-cocoa-ink)] leading-relaxed">{project.caseStudy.result}</p>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-mono text-xs text-gray-500 mr-2">Tech:</span>
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
