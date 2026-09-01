import React, { useState } from 'react';
import { ARTWORKS } from '../../data/artData';
import { Sparkles, Maximize2 } from 'lucide-react';

export default function ArtSection() {
  const [activeArt, setActiveArt] = useState(null);

  return (
    <section className="art-section py-24 border-b border-[var(--color-border)]" id="art">
      <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-[var(--color-orange)] uppercase tracking-wider font-bold">
                02 / VISUAL EXPERIMENTATION
              </span>
            </div>
            <h2 className="display-headline text-5xl sm:text-7xl font-bold">
              art & studies
            </h2>
          </div>
          <p className="text-sm font-serif italic text-[var(--color-muted)] max-w-sm">
            Visual experiments in GLSL shaders, procedural form, audio vector fields, and digital typography.
          </p>
        </div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTWORKS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveArt(item)}
              className="group cursor-pointer rounded-[16px] border border-[var(--color-border)] bg-[var(--color-card-bg)] p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-orange)]"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] rounded-[12px] bg-[var(--color-surface-tint)] overflow-hidden mb-4 border border-[var(--color-border)] flex items-center justify-center p-4">
                <div className="text-center space-y-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-orange)] block">
                    {item.medium}
                  </span>
                  <h4 className="font-display text-xl font-bold text-[var(--color-headline)]">
                    {item.title}
                  </h4>
                  <span className="font-mono text-xs text-[var(--color-muted)] block">
                    #{item.year}
                  </span>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--color-card-bg)] p-1.5 rounded-full border border-[var(--color-border)] shadow-xs">
                  <Maximize2 size={12} className="text-[var(--color-text)]" />
                </div>
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-[var(--color-muted)]">
                <span>0{idx + 1} // STUDY</span>
                <span className="text-[var(--color-text)] font-semibold">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Art Lightbox Modal */}
      {activeArt && (
        <div
          onClick={() => setActiveArt(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-[20px] p-6 md:p-8 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
              <span className="font-mono text-xs font-bold text-[var(--color-orange)]">
                {activeArt.medium}
              </span>
              <button
                onClick={() => setActiveArt(null)}
                className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-text)]"
              >
                [ CLOSE ✕ ]
              </button>
            </div>

            <div className="aspect-[4/3] bg-[var(--color-surface-tint)] rounded-[12px] border border-[var(--color-border)] flex items-center justify-center p-8 text-center">
              <div>
                <Sparkles size={24} className="text-[var(--color-orange)] mx-auto mb-3" />
                <h3 className="font-display text-3xl font-bold text-[var(--color-headline)] mb-2">
                  {activeArt.title}
                </h3>
                <p className="font-serif italic text-sm text-[var(--color-muted)]">
                  Generative shader & vector field experiment.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-xs text-[var(--color-muted)] pt-2">
              <span>{activeArt.year}</span>
              <span>AIZAT FIRMANSYAH (ZAFIR)</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
