import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ExternalLink, 
  Monitor, 
  Tablet, 
  Smartphone, 
  RotateCcw, 
  X, 
  Maximize2, 
  Terminal, 
  Smartphone as MobileIcon, 
  Scroll, 
  BookOpen,
  Layers
} from 'lucide-react';
import GithubIcon from '../GithubIcon';
import { Skiper8Text } from '../ui/skiper8';
import CaseStudyModal from './CaseStudyModal';
import { useLanguage } from '../../utils/useLanguage';

export default function ProjectCard({ project }) {
  const { lang } = useLanguage();
  const [viewportMode, setViewportMode] = useState('desktop');
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [selectedStageIdx, setSelectedStageIdx] = useState(0);

  // 3D paper scroll / roll-up animation as card emerges into view
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0.55, 1]);

  const handleReload = () => {
    setIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  // Listen for Escape key to exit interactive mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isInteractive) {
        setIsInteractive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isInteractive]);

  const handleOpenCaseStudy = (stageIndex = 0) => {
    setSelectedStageIdx(stageIndex);
    setIsCaseStudyOpen(true);
  };

  // Bilingual text resolver helpers
  const currentTagline = typeof project.tagline === 'object'
    ? (project.tagline[lang] || project.tagline.id)
    : project.tagline;

  const getStageContent = (key) => {
    if (!project.caseStudy) return '';
    if (typeof project.caseStudy[key] === 'object') {
      return project.caseStudy[key][lang] || project.caseStudy[key].id || '';
    }
    if (project.caseStudy[lang]?.[key]) {
      return project.caseStudy[lang][key];
    }
    if (project.caseStudy.id?.[key]) {
      return project.caseStudy.id[key];
    }
    if (project.caseStudy.en?.[key]) {
      return project.caseStudy.en[key];
    }
    return project.caseStudy[key] || '';
  };

  return (
    <>
      <section
        className="project-scene relative min-h-screen py-16 sm:py-20 flex flex-col justify-center border-b border-[var(--color-border)] overflow-visible"
        id={`project-${project.id}`}
        style={{ perspective: 1300 }}
      >
        <div className="w-[96vw] max-w-[1600px] mx-auto px-2 md:px-6 relative z-10">
          {/* Project Header Info */}
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-8">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[var(--color-orange)] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--color-surface-tint)] border border-[var(--color-border)]">
                  {project.number} / {project.category}
                </span>
                <span className="font-mono text-xs text-[var(--color-muted)]">
                  {project.year}
                </span>
              </div>

              <h3 className="display-headline text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-headline)]">
                <Skiper8Text text={project.title} />
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-[var(--color-muted)] font-serif italic mt-1.5 max-w-3xl">
                "{currentTagline}"
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => handleOpenCaseStudy(0)}
                className="pill-btn text-xs md:text-sm font-bold bg-[var(--color-surface-tint)] border-[var(--color-border)] hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition-all cursor-pointer"
                title="Read Case Study"
              >
                <BookOpen size={13} className="text-[var(--color-orange)]" />
                <span>{lang === 'id' ? 'studi kasus' : 'case study'}</span>
              </button>

              {!project.isNativeApp && !project.isGithubProfile && project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn text-xs md:text-sm font-bold"
                >
                  <span>{lang === 'id' ? 'buka langsung' : 'open live'}</span>
                  <ExternalLink size={13} />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn text-xs md:text-sm font-bold"
                >
                  <GithubIcon size={14} />
                  <span>
                    {project.isGithubProfile
                      ? (lang === 'id' ? 'profil github' : 'github profile')
                      : lang === 'id'
                      ? (project.isNativeApp ? 'repositori & rilis' : 'kode')
                      : (project.isNativeApp ? 'repository & releases' : 'code')}
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* 3D IMMERSIVE PERSPECTIVE SHOWCASE CARD (SCROLLERFIR PATTERN) */}
          <div
            ref={cardRef}
            className="relative w-full group py-4 md:py-8"
            style={{
              perspective: '1400px',
            }}
          >
            <motion.div
              style={{
                rotateX,
                scale,
                translateY,
                opacity,
                transformOrigin: '50% 0%',
                transformPerspective: 1400,
              }}
              className="project-preview-shell w-full border border-[var(--color-border)] rounded-[24px] bg-[var(--color-card-bg)] overflow-hidden mb-8 relative shadow-2xl is-live"
            >
              {/* Top Glass Rim Specular Highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent z-30 pointer-events-none" />

              {/* Browser / Application Header Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[var(--color-bg)] border-b border-[var(--color-border)] relative z-20 select-none">
                <div className="flex items-center gap-3">
                  {/* Status Indicator Beads */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-orange)] shadow-[0_0_8px_var(--color-orange)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-text)] opacity-25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-text)] opacity-25" />
                  </div>

                  <div className="flex items-center gap-2 pl-2">
                    <Scroll size={13} className="text-[var(--color-orange)] hidden sm:inline-block opacity-80" />
                    <span className="text-xs font-mono text-[var(--color-headline)] font-bold truncate max-w-xs md:max-w-md">
                      {project.isGithubProfile
                        ? 'https://github.com/AIZATFIR'
                        : project.isNativeApp
                        ? `${project.isPrivateWorkspace ? 'PRIVATE WEB APP' : 'NATIVE OS'} // ${project.platform || 'CROSS-PLATFORM'}`
                        : project.liveUrl}
                    </span>
                  </div>
                </div>

                {/* Viewport Mode Switchers (for Web Apps & GitHub) / Architecture Badge (for Native Apps) */}
                {!project.isNativeApp ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewportMode('desktop')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-[16px] text-xs font-mono font-medium transition-all cursor-pointer ${
                        viewportMode === 'desktop'
                          ? 'bg-[var(--color-text)] text-[var(--color-bg)] font-bold'
                          : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                      }`}
                      title="Desktop View"
                    >
                      <Monitor size={13} />
                      <span className="hidden md:inline">Desktop</span>
                    </button>
                    <button
                      onClick={() => setViewportMode('tablet')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-[16px] text-xs font-mono font-medium transition-all cursor-pointer ${
                        viewportMode === 'tablet'
                          ? 'bg-[var(--color-text)] text-[var(--color-bg)] font-bold'
                          : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                      }`}
                      title="Tablet View"
                    >
                      <Tablet size={13} />
                      <span className="hidden md:inline">Tablet</span>
                    </button>
                    <button
                      onClick={() => setViewportMode('mobile')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-[16px] text-xs font-mono font-medium transition-all cursor-pointer ${
                        viewportMode === 'mobile'
                          ? 'bg-[var(--color-text)] text-[var(--color-bg)] font-bold'
                          : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                      }`}
                      title="Mobile View"
                    >
                      <Smartphone size={13} />
                      <span className="hidden md:inline">Mobile</span>
                    </button>
                    <button
                      onClick={handleReload}
                      className="p-1.5 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors rounded-full cursor-pointer"
                      title="Reload Live App"
                    >
                      <RotateCcw size={13} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[var(--color-orange)] font-bold px-3 py-1 rounded-full bg-[var(--color-surface-tint)] border border-[var(--color-border)]">
                      {project.isPrivateWorkspace
                        ? (lang === 'id' ? 'Workspace privat' : 'Private workspace')
                        : (lang === 'id' ? 'Arsitektur Native' : 'Native Architecture')}
                    </span>
                  </div>
                )}
              </div>

              {/* Viewport Container */}
              <div className="bg-[var(--color-surface-tint)] p-2 sm:p-4 md:p-6 flex justify-center items-center overflow-hidden relative">
                {!project.isNativeApp ? (
                  /* REAL LIVE WEB EMBED (Authentic GitHub Profile Embed & Interactive Web Apps) */
                  <div
                    className={`project-preview-window rounded-[16px] overflow-hidden border border-[var(--color-border)] ${project.isGithubProfile ? 'bg-[#0d1117]' : 'bg-white dark:bg-[#0d1117]'} shadow-2xl relative`}
                    style={{
                      width: viewportMode === 'desktop' ? '100%' : viewportMode === 'tablet' ? '768px' : '390px',
                      height: viewportMode === 'desktop' ? 'clamp(780px, 88vh, 960px)' : viewportMode === 'tablet' ? '820px' : '780px',
                      maxWidth: '100%',
                      contain: 'layout paint',
                    }}
                  >
                    {iframeLoading && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0d1117] text-[#e6edf3] font-mono text-xs gap-3 select-none">
                        <div className="w-8 h-8 rounded-full border-2 border-[#30363d] border-t-[var(--color-orange)] animate-spin" />
                        <span className="opacity-75 tracking-wider">
                          {lang === 'id' ? `Memuat live ${project.title}...` : `Loading live ${project.title}...`}
                        </span>
                      </div>
                    )}
                    <iframe
                      key={iframeKey}
                      src={project.liveUrl}
                      title={`${project.title} live preview`}
                      className="w-full h-full border-0"
                      loading={project.isGithubProfile ? 'eager' : 'lazy'}
                      onLoad={() => setIframeLoading(false)}
                      allow="autoplay; encrypted-media; fullscreen"
                      sandbox={project.isGithubProfile ? undefined : 'allow-scripts allow-same-origin allow-forms allow-popups allow-modals'}
                      style={{
                        pointerEvents: isInteractive ? 'auto' : 'none',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                      }}
                    />

                    {!isInteractive && (
                      <div
                        onClick={() => setIsInteractive(true)}
                        className="absolute inset-0 z-20 cursor-pointer bg-transparent group/hint flex items-end justify-center pb-8"
                        title={lang === 'id' ? 'Klik untuk interaksi langsung' : 'Click to interact'}
                      >
                        <div className="opacity-0 group-hover/hint:opacity-100 transition-all duration-200 transform translate-y-2 group-hover/hint:translate-y-0 px-5 py-2.5 rounded-full bg-[var(--color-card-bg)]/90 backdrop-blur-md border border-[var(--color-orange)] shadow-2xl text-xs font-mono font-bold text-[var(--color-text)] flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[var(--color-orange)] animate-ping" />
                          <span>
                            {project.isGithubProfile
                              ? (lang === 'id' ? 'Klik untuk interaksi langsung di halaman profil GitHub' : 'Click to interact with real live GitHub profile')
                              : (lang === 'id' ? 'Klik untuk interaksi langsung di dalam halaman' : 'Click to interact directly with live site')}
                          </span>
                        </div>
                      </div>
                    )}

                    {isInteractive && (
                      <button
                        onClick={() => setIsInteractive(false)}
                        className="absolute top-4 right-4 z-30 px-3.5 py-1.5 rounded-full bg-[var(--color-card-bg)] text-[var(--color-text)] border border-[var(--color-orange)] shadow-xl flex items-center gap-1.5 font-mono text-xs font-bold hover:bg-[var(--color-orange)] hover:text-white transition-all cursor-pointer select-none"
                        title={lang === 'id' ? 'Keluar mode interaktif (Esc)' : 'Exit interaction (Esc)'}
                      >
                        <X size={13} />
                        <span>{lang === 'id' ? 'Keluar Esc' : 'Exit Esc'}</span>
                      </button>
                    )}
                  </div>
                ) : (
                  /* 2. NATIVE APPLICATION HUB DECK (For Fitrah Launcher & Sadar) */
                  <div className="w-full max-w-4xl py-12 px-6 sm:px-10 rounded-[18px] bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-xl flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-surface-tint)] border border-[var(--color-border)] flex items-center justify-center mb-4 shadow-sm">
                      <MobileIcon size={28} className="text-[var(--color-orange)]" />
                    </div>

                    <h4 className="font-display text-2xl sm:text-4xl font-bold text-[var(--color-headline)] mb-2">
                      {project.title} — {project.isPrivateWorkspace
                        ? (lang === 'id' ? 'Web Workspace Privat' : 'Private Web Workspace')
                        : (lang === 'id' ? 'Ruang Kerja Native' : 'Native Workspace')}
                    </h4>

                    <p className="font-serif italic text-sm sm:text-base text-[var(--color-muted)] max-w-xl mb-6">
                      "{currentTagline}"
                    </p>

                    <div className="p-4 rounded-xl bg-[var(--color-surface-tint)] border border-[var(--color-border)] font-mono text-xs text-[var(--color-text)] mb-8 max-w-lg w-full flex items-center justify-between gap-3 shadow-inner">
                      <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-[var(--color-orange)] shrink-0" />
                        <span className="truncate">{project.platform}</span>
                      </div>
                      <span className="text-[var(--color-muted)] shrink-0">Open Source</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pill-btn text-xs sm:text-sm font-bold bg-[var(--color-text)] text-[var(--color-bg)] hover:bg-[var(--color-orange)] hover:text-white transition-all"
                      >
                        <GithubIcon size={14} />
                        <span>{lang === 'id' ? 'Buka Repositori GitHub' : 'View GitHub Repository'}</span>
                      </a>
                      <button
                        onClick={() => handleOpenCaseStudy(0)}
                        className="pill-btn text-xs sm:text-sm font-bold"
                      >
                        <BookOpen size={13} className="text-[var(--color-orange)]" />
                        <span>{lang === 'id' ? 'Baca Arsitektur' : 'Read Architecture'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* 4-Stage Clickable Case Study Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => handleOpenCaseStudy(0)}
              className="p-4 rounded-[14px] bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-all shadow-xs text-left group cursor-pointer relative"
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-orange)] block">
                  01 / {lang === 'id' ? 'Masalah' : 'Problem'}
                </span>
                <Maximize2 size={12} className="text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-[var(--color-text)] leading-relaxed line-clamp-3 group-hover:text-[var(--color-headline)] transition-colors">
                {getStageContent('problem')}
              </p>
              <span className="font-mono text-[10px] text-[var(--color-orange)] font-semibold mt-2 inline-block opacity-75 group-hover:opacity-100">
                {lang === 'id' ? 'Klik untuk rincian →' : 'Click to expand →'}
              </span>
            </button>

            <button
              onClick={() => handleOpenCaseStudy(1)}
              className="p-4 rounded-[14px] bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-all shadow-xs text-left group cursor-pointer relative"
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-orange)] block">
                  02 / {lang === 'id' ? 'Pendekatan' : 'Approach'}
                </span>
                <Maximize2 size={12} className="text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-[var(--color-text)] leading-relaxed line-clamp-3 group-hover:text-[var(--color-headline)] transition-colors">
                {getStageContent('approach')}
              </p>
              <span className="font-mono text-[10px] text-[var(--color-orange)] font-semibold mt-2 inline-block opacity-75 group-hover:opacity-100">
                {lang === 'id' ? 'Klik untuk rincian →' : 'Click to expand →'}
              </span>
            </button>

            <button
              onClick={() => handleOpenCaseStudy(2)}
              className="p-4 rounded-[14px] bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-all shadow-xs text-left group cursor-pointer relative"
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-orange)] block">
                  03 / {lang === 'id' ? 'Arsitektur' : 'Architecture'}
                </span>
                <Maximize2 size={12} className="text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-[var(--color-text)] leading-relaxed line-clamp-3 group-hover:text-[var(--color-headline)] transition-colors">
                {getStageContent('architecture')}
              </p>
              <span className="font-mono text-[10px] text-[var(--color-orange)] font-semibold mt-2 inline-block opacity-75 group-hover:opacity-100">
                {lang === 'id' ? 'Klik untuk rincian →' : 'Click to expand →'}
              </span>
            </button>

            <button
              onClick={() => handleOpenCaseStudy(3)}
              className="p-4 rounded-[14px] bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-all shadow-xs text-left group cursor-pointer relative"
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-orange)] block">
                  04 / {lang === 'id' ? 'Hasil' : 'Result'}
                </span>
                <Maximize2 size={12} className="text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-[var(--color-text)] leading-relaxed line-clamp-3 group-hover:text-[var(--color-headline)] transition-colors">
                {getStageContent('result')}
              </p>
              <span className="font-mono text-[10px] text-[var(--color-orange)] font-semibold mt-2 inline-block opacity-75 group-hover:opacity-100">
                {lang === 'id' ? 'Klik untuk rincian →' : 'Click to expand →'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Expanded Case Study Pop-up Card */}
      <CaseStudyModal
        project={project}
        isOpen={isCaseStudyOpen}
        initialStage={selectedStageIdx}
        onClose={() => setIsCaseStudyOpen(false)}
      />
    </>
  );
}
