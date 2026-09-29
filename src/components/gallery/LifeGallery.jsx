import React from 'react';
import { Camera, ArrowUpRight, Film, PlusCircle, Sparkles } from 'lucide-react';
import InstagramIcon from '../InstagramIcon';

export default function LifeGallery() {
  const instagramUrl = "https://www.instagram.com/zafirre/";

  // Explicit empty film frames representing current capture status
  const emptyFrames = [
    {
      id: "frame-01",
      code: "FRAME 01 // 35MM",
      status: "EMPTY / NO POST YET",
      desc: "Awaiting first published frame on @zafirre",
    },
    {
      id: "frame-02",
      code: "FRAME 02 // LAB",
      status: "STILL SHOOTING",
      desc: "Offline studio capture in incubation",
    },
    {
      id: "frame-03",
      code: "FRAME 03 // ARCHIVE",
      status: "BLANK ROLL",
      desc: "Developing memory fragments",
    },
    {
      id: "frame-04",
      code: "FRAME 04 // FIELD",
      status: "PENDING SYNC",
      desc: "Waiting for new upload",
    },
  ];

  return (
    <section className="gallery-section py-24 border-b border-[var(--color-border)]" id="gallery">
      <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-[var(--color-orange)] uppercase tracking-wider font-bold">
                04 / INSTAGRAM & LIFE FRAGMENTS
              </span>
            </div>
            <h2 className="display-headline text-5xl sm:text-7xl font-bold">
              gallery
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

        {/* Instagram Profile Hub Banner */}
        <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 md:p-8 mb-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Instagram Monogram Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px] shrink-0">
              <div className="w-full h-full rounded-full bg-[var(--color-card-bg)] flex items-center justify-center font-display font-black text-xl text-[var(--color-headline)]">
                Z
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-xl md:text-2xl text-[var(--color-headline)]">
                  Aizat Fahim
                </h3>
                <span className="font-mono text-xs font-bold text-[var(--color-orange)]">
                  @zafirre
                </span>
              </div>
              <p className="font-serif italic text-xs md:text-sm text-[var(--color-muted)] mt-0.5">
                Life fragments, personal experiments & spontaneous captures.
              </p>
            </div>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-orange)] hover:underline decoration-dotted"
          >
            <span>instagram.com/zafirre</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Visual Frame Grid (Honest Empty State) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {emptyFrames.map((frame, idx) => (
            <a
              key={frame.id}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-[18px] border border-[var(--color-border)] border-dashed bg-[var(--color-card-bg)]/60 hover:bg-[var(--color-card-bg)] hover:border-[var(--color-orange)] p-5 transition-all duration-300 shadow-xs"
            >
              {/* Negative Film Frame Box */}
              <div className="aspect-[4/3] rounded-[14px] bg-[var(--color-surface-tint)] border border-[var(--color-border)] border-dashed flex flex-col items-center justify-center p-4 text-center mb-4 relative overflow-hidden group-hover:border-[var(--color-orange)]/40 transition-colors">
                <Film size={22} className="text-[var(--color-muted)] group-hover:text-[var(--color-orange)] transition-colors mb-2 opacity-50" />
                <span className="font-mono text-[10px] font-bold text-[var(--color-muted)] tracking-widest uppercase">
                  [ {frame.status} ]
                </span>
                <span className="font-mono text-[9px] text-[var(--color-muted)] opacity-60 mt-1 max-w-[140px]">
                  {frame.desc}
                </span>

                {/* Micro Plus Cue */}
                <div className="absolute top-2.5 right-2.5 opacity-40 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={12} className="text-[var(--color-orange)]" />
                </div>
              </div>

              {/* Card Meta */}
              <div className="flex items-center justify-between font-mono text-[10px] text-[var(--color-muted)]">
                <span>{frame.code}</span>
                <span className="group-hover:text-[var(--color-orange)] transition-colors font-bold">
                  EMPTY ↗
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Honest Stream Notice */}
        <div className="mt-8 text-center py-4 px-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-tint)]/40 max-w-xl mx-auto">
          <p className="font-mono text-xs text-[var(--color-muted)]">
            <span className="font-bold text-[var(--color-headline)]">Live Sync Status:</span> Belum ada foto yang dipublikasikan di feed. Kunjungi profil Instagram untuk melihat stories terbaru di{' '}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-orange)] font-bold underline decoration-dotted hover:opacity-80"
            >
              @zafirre
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
