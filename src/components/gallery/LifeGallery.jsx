import React from 'react';
import { Film, ArrowUpRight } from 'lucide-react';
import InstagramIcon from '../InstagramIcon';
import { useLanguage } from '../../utils/useLanguage';

export default function LifeGallery() {
  const { lang } = useLanguage();
  const instagramUrl = "https://www.instagram.com/zafirre/";

  const emptyFrames = [
    {
      id: "frame-01",
      code: "FRAME 01 // 35MM",
      status: lang === 'id' ? "DRAFT" : "INCUBATING",
      desc: lang === 'id' ? "Arsip visual studio" : "Studio visual archive",
    },
    {
      id: "frame-02",
      code: "FRAME 02 // LAB",
      status: lang === 'id' ? "STUDI" : "STUDY",
      desc: lang === 'id' ? "Eksperimen offline" : "Offline field study",
    },
    {
      id: "frame-03",
      code: "FRAME 03 // ARCHIVE",
      status: lang === 'id' ? "ROLL 01" : "ROLL 01",
      desc: lang === 'id' ? "Fragmen memori" : "Memory fragments",
    },
    {
      id: "frame-04",
      code: "FRAME 04 // FIELD",
      status: lang === 'id' ? "PROSES" : "PROCESS",
      desc: lang === 'id' ? "Dokumentasi proyek" : "Project build logs",
    },
  ];

  return (
    <section className="gallery-section py-20 sm:py-24 border-b border-[var(--color-border)]" id="gallery">
      <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs text-[var(--color-orange)] uppercase tracking-wider font-bold block mb-1">
              04 // {lang === 'id' ? 'GALERI' : 'GALLERY'}
            </span>
            <h2 className="display-headline text-4xl sm:text-6xl font-bold">
              {lang === 'id' ? 'fragmen' : 'fragments'}
            </h2>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn text-xs font-mono font-bold flex items-center gap-2 self-start md:self-auto"
          >
            <InstagramIcon size={14} className="text-[var(--color-orange)]" />
            <span>@zafirre ON INSTAGRAM ↗</span>
          </a>
        </div>

        {/* Instagram Hub Banner */}
        <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 sm:p-8 mb-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px] shrink-0">
              <div className="w-full h-full rounded-full bg-[var(--color-card-bg)] flex items-center justify-center font-display font-black text-lg text-[var(--color-headline)]">
                Z
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--color-headline)]">
                  Aizat Fahim
                </h3>
                <span className="font-mono text-xs font-bold text-[var(--color-orange)]">
                  @zafirre
                </span>
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-[var(--color-muted)] mt-0.5">
                {lang === 'id'
                  ? 'Fragmen hidup, eksperimen personal & jepretan spontan.'
                  : 'Personal experiments, studio fragments & captures.'}
              </p>
            </div>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--color-orange)] hover:underline decoration-dotted"
          >
            <span>instagram.com/zafirre</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Visual Frames Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {emptyFrames.map((frame) => (
            <a
              key={frame.id}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-[18px] border border-[var(--color-border)] bg-[var(--color-card-bg)]/60 hover:bg-[var(--color-card-bg)] hover:border-[var(--color-orange)] p-4 sm:p-5 transition-all duration-300 shadow-xs"
            >
              {/* Negative Film Frame Box */}
              <div className="aspect-[4/3] rounded-[14px] bg-[var(--color-surface-tint)] border border-[var(--color-border)] flex flex-col items-center justify-center p-4 text-center mb-3 relative overflow-hidden group-hover:border-[var(--color-orange)]/40 transition-colors">
                <Film size={20} className="text-[var(--color-muted)] group-hover:text-[var(--color-orange)] transition-colors mb-1.5 opacity-50" />
                <span className="font-mono text-[10px] font-bold text-[var(--color-muted)] tracking-widest uppercase">
                  [ {frame.status} ]
                </span>
                <span className="font-mono text-[9px] text-[var(--color-muted)] opacity-60 mt-1 max-w-[130px]">
                  {frame.desc}
                </span>

                <div className="absolute top-2.5 right-2.5 opacity-40 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={12} className="text-[var(--color-orange)]" />
                </div>
              </div>

              {/* Card Meta */}
              <div className="flex items-center justify-between font-mono text-[10px] text-[var(--color-muted)]">
                <span>{frame.code}</span>
                <span className="group-hover:text-[var(--color-orange)] transition-colors font-bold">
                  {lang === 'id' ? 'BUKA ↗' : 'OPEN ↗'}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
