import React from 'react';
import { EXPERIMENTS } from '../data/portfolioData';
import SpotlightCard from './reactbits/SpotlightCard';
import { FlaskConical, Sparkles, ArrowUpRight } from 'lucide-react';

export default function ExperimentsSketch() {
  return (
    <section className="experiments-section py-24 border-b border-[var(--color-border)]" id="experiments">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-orange)] uppercase tracking-widest mb-2">
              <FlaskConical size={14} />
              <span>Digital Sketchbook</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--color-charcoal)]">
              EXPERIMENTS
            </h2>
          </div>
          <p className="text-sm font-mono text-[var(--color-muted)] max-w-sm">
            Small experiments, audio algorithms, computer vision prototypes, and weird ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXPERIMENTS.map((exp, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor="rgba(255, 111, 30, 0.12)"
              borderColor="rgba(255, 111, 30, 0.35)"
              className="p-6 md:p-8"
              data-cursor="view"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-[var(--color-orange)] px-2.5 py-1 rounded-full bg-[rgba(255,111,30,0.08)] border border-[rgba(255,111,30,0.2)]">
                  {exp.tag}
                </span>
                <span className="font-mono text-xs text-[var(--color-muted)]">
                  {exp.category}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-charcoal)] mb-3 flex items-center justify-between">
                <span>{exp.title}</span>
                <ArrowUpRight size={18} className="text-[var(--color-muted)] group-hover:text-[var(--color-orange)] transition-colors" />
              </h3>

              <p className="text-xs text-[var(--color-cocoa)] leading-relaxed">
                {exp.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
