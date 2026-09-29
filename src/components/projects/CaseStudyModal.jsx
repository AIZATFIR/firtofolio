import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, CheckCircle2, Layers, Compass, Target } from 'lucide-react';
import GithubIcon from '../GithubIcon';

export default function CaseStudyModal({ project, isOpen, initialStage = 0, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  const stages = [
    {
      num: '01',
      title: 'Problem & Friction',
      icon: Target,
      content: project.caseStudy.problem,
      badgeColor: 'text-rose-500 bg-rose-500/10 border-rose-500/20'
    },
    {
      num: '02',
      title: 'Approach & Philosophy',
      icon: Compass,
      content: project.caseStudy.approach,
      badgeColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      num: '03',
      title: 'Architecture & Engine',
      icon: Layers,
      content: project.caseStudy.architecture,
      badgeColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      num: '04',
      title: 'Result & Impact',
      icon: CheckCircle2,
      content: project.caseStudy.result,
      badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 md:p-10">
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Expanded Case Study Pop-up Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[24px] shadow-2xl p-6 sm:p-8 md:p-10 text-[var(--color-text)] select-text"
          >
            {/* Top Bar Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-[var(--color-orange)] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--color-surface-tint)] border border-[var(--color-border)]">
                    {project.number} / {project.category}
                  </span>
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {project.year}
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-headline)]">
                  {project.title}
                </h2>
                <p className="font-serif italic text-base sm:text-lg text-[var(--color-muted)] mt-1.5 max-w-2xl">
                  "{project.tagline}"
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-[var(--color-surface-tint)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-orange)] hover:text-white transition-colors cursor-pointer shrink-0"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Deep Dive Summary (if available) */}
            {project.deepDive?.summary && (
              <div className="my-6 p-4 sm:p-5 rounded-2xl bg-[var(--color-surface-tint)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--color-orange)] uppercase tracking-wider mb-2">
                  <Sparkles size={14} />
                  <span>Executive Overview</span>
                </div>
                <p className="text-sm sm:text-base text-[var(--color-text)] leading-relaxed">
                  {project.deepDive.summary}
                </p>
              </div>
            )}

            {/* 4-Stage Deep Architecture Grid (Large, Readable Typography) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-6">
              {stages.map((st, idx) => {
                const IconComponent = st.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md border ${st.badgeColor}`}>
                          {st.num} / {st.title}
                        </span>
                        <IconComponent size={16} className="text-[var(--color-muted)]" />
                      </div>

                      <p className="text-sm sm:text-base text-[var(--color-text)] leading-relaxed font-normal">
                        {st.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Key Engineering Highlights */}
            {project.deepDive?.highlights && (
              <div className="my-6">
                <h4 className="font-mono text-xs font-bold text-[var(--color-orange)] uppercase tracking-widest mb-3">
                  Key Technical Capabilities
                </h4>
                <ul className="space-y-2.5">
                  {project.deepDive.highlights.map((hl, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-text)] leading-relaxed p-2.5 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)]"
                    >
                      <span className="w-2 h-2 rounded-full bg-[var(--color-orange)] mt-1.5 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--color-border)] mt-8">
              <span className="font-mono text-xs text-[var(--color-muted)]">
                Press <kbd className="px-2 py-1 rounded bg-[var(--color-surface-tint)] border border-[var(--color-border)] font-semibold">Esc</kbd> or click outside to dismiss
              </span>

              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-btn text-xs sm:text-sm font-bold"
                  >
                    <span>Launch Live</span>
                    <ExternalLink size={13} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-btn text-xs sm:text-sm font-bold"
                  >
                    <GithubIcon size={14} />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
