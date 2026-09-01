import React from 'react';
import { GALLERY_ITEMS } from '../../data/galleryData';
import { Camera } from 'lucide-react';

export default function LifeGallery() {
  return (
    <section className="gallery-section py-24 border-b border-[var(--color-border)]" id="gallery">
      <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-[var(--color-orange)] uppercase tracking-wider font-bold">
                04 / LIFE & FRAGMENTS
              </span>
            </div>
            <h2 className="display-headline text-5xl sm:text-7xl font-bold">
              gallery
            </h2>
          </div>
          <p className="text-sm font-serif italic text-[var(--color-muted)] max-w-sm">
            Snapshots of studio experiments, hardware oscillators, notebooks, and light studies.
          </p>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-card-bg)] p-4 shadow-xs overflow-hidden"
            >
              <div className="aspect-[4/3] rounded-[12px] bg-[var(--color-surface-tint)] border border-[var(--color-border)] flex items-center justify-center p-4 text-center mb-3">
                <div>
                  <Camera size={18} className="text-[var(--color-orange)] mx-auto mb-2 opacity-70" />
                  <h4 className="font-display font-bold text-base text-[var(--color-headline)]">
                    {item.title}
                  </h4>
                  <span className="font-mono text-xs text-[var(--color-muted)] block mt-1">
                    {item.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between font-mono text-[11px] text-[var(--color-muted)]">
                <span>FRAGMENT #{idx + 1}</span>
                <span>{item.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
