import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../utils/useLanguage';

const descriptions = {
  'github-hub': ['Kode, eksperimen, dan proyek yang saya kerjakan.', 'Code, experiments, and projects I work on.'],
  qurabic: ['Jelajahi akar kata dan makna bahasa Arab dalam Al-Qur’an.', 'Explore Arabic roots and meanings in the Quran.'],
  rync432: ['Putar musik bersama di beberapa perangkat.', 'Play music together across multiple devices.'],
  'focus-clock': ['Atur waktu fokus lewat jam analog interaktif.', 'Plan focused work with an interactive analog clock.'],
  'fitrah-launcher': ['Beranda sederhana untuk memakai perangkat lebih sadar.', 'A simpler home screen for more intentional device use.'],
  sadar: ['Catat kebiasaan dan luangkan waktu untuk refleksi.', 'Track habits and make time for reflection.'],
  '7audio': ['Dengarkan musik dalam ruang audio spasial.', 'Listen to music in a spatial soundstage.'],
  terraflow: ['Urai masalah menjadi langkah yang bisa dilakukan.', 'Turn a problem into steps you can take.'],
  'social-affinity': ['Lihat dan rawat lingkaran pertemananmu.', 'See and care for your circles of friends.'],
  valeska: ['Satu workspace untuk menjalankan dan memantau agent.', 'One workspace to run and monitor agents.'],
  'abrahamic-lore': ['Eksplorasi kisah dan tradisi Abrahamik.', 'Explore Abrahamic stories and traditions.'],
  'sekolah-php-admin': ['Antarmuka administrasi untuk kebutuhan sekolah.', 'An administration interface for schools.'],
};

export default function ProjectCard({ project }) {
  const { lang } = useLanguage();
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [revision, setRevision] = useState(0);
  const openButton = useRef(null);
  const closeButton = useRef(null);
  const wasActive = useRef(false);
  const isId = lang === 'id';
  const description = descriptions[project.id]?.[isId ? 0 : 1] || project.tagline?.[lang];
  const canEmbed = Boolean(project.liveUrl && !project.embedBlocked && !project.isGithubProfile);
  const close = () => { setActive(false); requestAnimationFrame(() => openButton.current?.focus()); };

  useEffect(() => {
    if (!active) {
      if (wasActive.current) openButton.current?.focus();
      wasActive.current = false;
      return;
    }
    wasActive.current = true;
    closeButton.current?.focus();
    const onKey = (event) => { if (event.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setActive(false);
    });
    const section = closeButton.current?.closest('section');
    if (section) observer.observe(section);
    return () => { window.removeEventListener('keydown', onKey); observer.disconnect(); };
  }, [active]);

  return (
    <section className={`work-entry${project.previewImage ? '' : ' work-entry-text'}`} id={`project-${project.id}`}>
      {project.previewImage && (
        <div className={`work-artwork${active ? ' work-artwork-live' : ''}`}>
          {active ? (
            <>
              <div className="work-live-bar">
                <span aria-live="polite">{loaded ? project.title : (isId ? 'Memuat situs…' : 'Loading website…')}</span>
                <div>
                  <button aria-label={isId ? 'Muat ulang preview' : 'Reload preview'} onClick={() => { setLoaded(false); setRevision(n => n + 1); }}><RotateCcw size={18} /></button>
                  <button ref={closeButton} onClick={close} aria-label={isId ? 'Tutup preview' : 'Close preview'}><X size={20} /></button>
                </div>
              </div>
              <iframe key={revision} src={project.liveUrl} title={`${project.title} live preview`} onLoad={() => setLoaded(true)} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" allow="fullscreen; encrypted-media" />
            </>
          ) : canEmbed ? (
            <button className="work-image-button" ref={openButton} onClick={() => { setLoaded(false); setActive(true); }} aria-label={`${isId ? 'Buka preview' : 'Preview'} ${project.title}`}>
              <img src={project.previewImage} alt={`${project.title} — ${isId ? 'tampilan situs' : 'website screenshot'}`} loading="lazy" decoding="async" width="1440" height="1080" />
              <span className="work-preview-action">{isId ? 'Coba langsung' : 'Try it'} <ArrowUpRight size={18} /></span>
            </button>
          ) : (
            <a className="work-image-button" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <img src={project.previewImage} alt={`${project.title} — website`} loading="lazy" decoding="async" width="1440" height="1080" />
              <span className="work-preview-action">{isId ? 'Buka situs' : 'Visit website'} <ArrowUpRight size={18} /></span>
            </a>
          )}
        </div>
      )}
      <div className="work-caption">
        <div className="work-description">
          <h3>{project.title === 'GITHUB // @AIZATFIR' ? 'GitHub' : project.title}</h3>
          <p>{description}</p>
        </div>
        <div className="work-links">
          {project.liveUrl && !project.isGithubProfile && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{isId ? 'Situs' : 'Website'} <ArrowUpRight size={16} /></a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} /></a>}
        </div>
      </div>
    </section>
  );
}
