import React from 'react';
import { ESSAYS } from '../../data/writingData';
import { ArrowUpRight } from 'lucide-react';

export default function WritingSection() {
  return (
    <section className="writing-section py-24 border-b border-[var(--color-border)]" id="writing">
      <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-[var(--color-orange)] uppercase tracking-wider font-bold">
                03 / SUBSTACK & ESSAYS
              </span>
            </div>
            <h2 className="display-headline text-5xl sm:text-7xl font-bold">
              writing
            </h2>
          </div>
          <a
            href="https://substack.com/@aizatfir"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--color-orange)] hover:underline flex items-center gap-1 font-bold"
          >
            <span>substack.com/@aizatfir ↗</span>
          </a>
        </div>

        {/* Thought Stream List */}
        <div className="space-y-4">
          {ESSAYS.map((essay, idx) => (
            <a
              key={essay.id}
              href={essay.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 md:p-8 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-card-bg)] hover:border-[var(--color-orange)] transition-all duration-200 shadow-xs"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[var(--color-orange)]">
                    0{idx + 1};
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-headline)] group-hover:text-[var(--color-orange)] transition-colors">
                    {essay.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs text-[var(--color-muted)]">
                  <span>{essay.date}</span>
                  <span>• {essay.readingTime}</span>
                  <ArrowUpRight size={14} className="text-[var(--color-text)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <p className="text-sm md:text-base text-[var(--color-muted)] font-serif italic max-w-3xl pl-7">
                "{essay.excerpt}"
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
