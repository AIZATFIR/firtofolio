import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, Compass, Target, BookOpen, Globe } from 'lucide-react';
import GithubIcon from '../GithubIcon';

export default function CaseStudyModal({ project, isOpen, initialStage = 0, onClose }) {
  const [lang, setLang] = useState('id'); // 'id' or 'en'
  const [activeStage, setActiveStage] = useState(initialStage);

  useEffect(() => {
    setActiveStage(initialStage);
  }, [initialStage, isOpen]);

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

  // Bilingual text resolver
  const getProblem = () => (typeof project.caseStudy.problem === 'object' ? project.caseStudy.problem[lang] : project.caseStudy.id?.problem || project.caseStudy.en?.problem || project.caseStudy.problem);
  const getApproach = () => (typeof project.caseStudy.approach === 'object' ? project.caseStudy.approach[lang] : project.caseStudy.id?.approach || project.caseStudy.en?.approach || project.caseStudy.approach);
  const getArchitecture = () => (typeof project.caseStudy.architecture === 'object' ? project.caseStudy.architecture[lang] : project.caseStudy.id?.architecture || project.caseStudy.en?.architecture || project.caseStudy.architecture);
  const getResult = () => (typeof project.caseStudy.result === 'object' ? project.caseStudy.result[lang] : project.caseStudy.id?.result || project.caseStudy.en?.result || project.caseStudy.result);

  const getSummary = () => {
    if (!project.deepDive?.summary) return null;
    if (typeof project.deepDive.summary === 'object') return project.deepDive.summary[lang];
    if (project.deepDive[lang]?.summary) return project.deepDive[lang].summary;
    return project.deepDive.summary;
  };

  const getHighlights = () => {
    if (!project.deepDive?.highlights) {
      if (project.deepDive?.[lang]?.highlights) return project.deepDive[lang].highlights;
      return [];
    }
    if (Array.isArray(project.deepDive.highlights)) return project.deepDive.highlights;
    if (project.deepDive.highlights[lang]) return project.deepDive.highlights[lang];
    return [];
  };

  const stages = [
    {
      idx: 0,
      num: '01',
      title: lang === 'id' ? 'Masalah' : 'Problem',
      fullTitle: lang === 'id' ? '01 // Masalah & Latar Belakang' : '01 // Problem & Friction',
      icon: Target,
      content: getProblem(),
    },
    {
      idx: 1,
      num: '02',
      title: lang === 'id' ? 'Pendekatan' : 'Approach',
      fullTitle: lang === 'id' ? '02 // Pendekatan & Solusi' : '02 // Approach & Philosophy',
      icon: Compass,
      content: getApproach(),
    },
    {
      idx: 2,
      num: '03',
      title: lang === 'id' ? 'Arsitektur' : 'Architecture',
      fullTitle: lang === 'id' ? '03 // Arsitektur & Teknologi' : '03 // Architecture & Engine',
      icon: Layers,
      content: getArchitecture(),
    },
    {
      idx: 3,
      num: '04',
      title: lang === 'id' ? 'Hasil' : 'Result',
      fullTitle: lang === 'id' ? '04 // Hasil & Manfaat' : '04 // Result & Impact',
      icon: CheckCircle2,
      content: getResult(),
    }
  ];

  const currentStageObj = stages[activeStage] || stages[0];
  const CurrentIcon = currentStageObj.icon;

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
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Expanded Case Study Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[24px] shadow-2xl p-6 sm:p-8 md:p-10 text-[var(--color-text)] select-text"
          >
            {/* Top Bar Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
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

              {/* Controls: Language Toggle + Close Button */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Language Switcher */}
                <div className="flex items-center rounded-full bg-[var(--color-surface-tint)] border border-[var(--color-border)] p-1">
                  <button
                    onClick={() => setLang('id')}
                    className={`px-3 py-1 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
                      lang === 'id'
                        ? 'bg-[var(--color-orange)] text-white shadow-xs'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    ID
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
                      lang === 'en'
                        ? 'bg-[var(--color-orange)] text-white shadow-xs'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    EN
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-[var(--color-surface-tint)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-orange)] hover:text-white transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Stage Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-6">
              {stages.map((st) => {
                const isActive = activeStage === st.idx;
                return (
                  <button
                    key={st.idx}
                    onClick={() => setActiveStage(st.idx)}
                    className={`py-2.5 px-3 rounded-xl border text-left transition-all cursor-pointer font-mono text-xs ${
                      isActive
                        ? 'bg-[var(--color-surface-tint)] text-[var(--color-orange)] border-[var(--color-orange)] font-bold shadow-xs'
                        : 'bg-[var(--color-card-bg)] text-[var(--color-muted)] border-[var(--color-border)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    <span className="block opacity-75 font-mono text-[10px]">{st.num}</span>
                    <span className="font-bold">{st.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Focused Individual Stage Display Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-sm my-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-surface-tint)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-orange)]">
                  <CurrentIcon size={18} />
                </div>
                <h3 className="font-mono text-sm sm:text-base font-bold text-[var(--color-headline)] uppercase tracking-wider">
                  {currentStageObj.fullTitle}
                </h3>
              </div>

              <p className="text-base sm:text-lg text-[var(--color-text)] leading-relaxed font-normal">
                {currentStageObj.content}
              </p>
            </div>

            {/* Deep Dive Summary */}
            {getSummary() && (
              <div className="my-6 p-5 sm:p-6 rounded-2xl bg-[var(--color-surface-tint)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--color-orange)] uppercase tracking-wider mb-2">
                  <BookOpen size={14} />
                  <span>{lang === 'id' ? 'Ringkasan Inti' : 'Core Summary'}</span>
                </div>
                <p className="text-sm sm:text-base text-[var(--color-text)] leading-relaxed">
                  {getSummary()}
                </p>
              </div>
            )}

            {/* Key Technical Capabilities */}
            {getHighlights().length > 0 && (
              <div className="my-6">
                <h4 className="font-mono text-xs font-bold text-[var(--color-orange)] uppercase tracking-widest mb-3">
                  {lang === 'id' ? 'Kapabilitas Teknis Utama' : 'Key Technical Capabilities'}
                </h4>
                <ul className="space-y-2.5">
                  {getHighlights().map((hl, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-text)] leading-relaxed p-3.5 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-orange)] mt-2 shrink-0" />
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
                    <span>{lang === 'id' ? 'Buka Langsung' : 'Launch Live'}</span>
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
                    <span>{lang === 'id' ? 'Repositori' : 'Repository'}</span>
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
