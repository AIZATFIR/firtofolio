import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Smartphone } from 'lucide-react';
import GithubIcon from '../GithubIcon';
import { Skiper8Text } from '../ui/skiper8';
import { useLanguage } from '../../utils/useLanguage';

export default function ProjectCard({ project }) {
  const { lang } = useLanguage();
  const [iframeLoading, setIframeLoading] = useState(true);

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

  // Resolve the short project description for the active language.
  const currentTagline = typeof project.tagline === 'object'
    ? (project.tagline[lang] || project.tagline.id)
    : project.tagline;

  return (
    <section
        className="project-scene relative min-h-screen py-14 sm:py-16 flex flex-col justify-center border-b border-[var(--color-border)] overflow-visible"
        id={`project-${project.id}`}
        style={{ perspective: 1300 }}
      >
        <div className="w-[96vw] max-w-[1600px] mx-auto px-2 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
            <div className="max-w-4xl">
              <div className="font-mono text-xs text-[var(--color-muted)] mb-2 tracking-wide">
                {project.category}
              </div>

              <h3 className="display-headline text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-headline)]">
                <Skiper8Text text={project.title} />
              </h3>
              <p className="project-tagline text-base sm:text-lg md:text-xl text-[var(--color-muted)] mt-2 max-w-3xl">
                {currentTagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
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
              className="project-preview-shell w-full border border-[var(--color-border)] rounded-[20px] bg-[var(--color-card-bg)] overflow-hidden relative shadow-2xl is-live"
            >
              <div className="project-preview-stage flex justify-center items-center overflow-hidden relative">
                {!project.isNativeApp ? (
                  <div
                    className={`project-preview-window overflow-hidden ${project.isGithubProfile ? 'bg-[#0d1117]' : 'bg-white dark:bg-[#0d1117]'} relative`}
                    style={{
                      width: '100%',
                      height: 'clamp(520px, 80vh, 920px)',
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
                      src={project.liveUrl}
                      title={`${project.title} live preview`}
                      className="w-full h-full border-0"
                      data-lenis-prevent
                      scrolling="yes"
                      loading={project.isGithubProfile ? 'eager' : 'lazy'}
                      onLoad={() => setIframeLoading(false)}
                      allow="autoplay; encrypted-media; fullscreen"
                      sandbox={project.isGithubProfile ? undefined : 'allow-scripts allow-same-origin allow-forms allow-popups allow-modals'}
                      style={{
                        pointerEvents: 'auto',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                      }}
                    />

                  </div>
                ) : (
                  <div className="native-project-preview">
                    <Smartphone aria-hidden="true" size={22} />
                    <span>{project.platform}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
    </section>
  );
}
