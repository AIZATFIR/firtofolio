import React from 'react';
import { EXPERIMENTS } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';
import HandDrawnArrow from './ui/HandDrawnArrow';
import { HeartEyesSticker, LightningSticker } from './ui/StickerCluster';

export default function ExperimentsSketch() {
  return (
    <section className="experiments-section py-24 border-b border-[var(--color-border)]" id="experiments">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-handwritten text-2xl text-[var(--color-marker-orange)]">
                little prototypes & questions
              </span>
              <HandDrawnArrow direction="down-right" className="-mb-2" />
            </div>
            <h2 className="display-headline">
              experiments
            </h2>
          </div>
          <p className="text-sm text-[var(--color-cocoa-ink)] max-w-sm font-serif">
            A digital laboratory of micro-tools, GLSL shaders, audio spatializers, and vision algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXPERIMENTS.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-[16px] border-[1.5px] border-[var(--color-charcoal)] bg-[var(--color-cream-paper)] shadow-xs transition-transform hover:-translate-y-1 relative"
            >
              {idx === 0 && (
                <div className="absolute -top-4 -right-2 rotate-[12deg]">
                  <LightningSticker />
                </div>
              )}
              {idx === 1 && (
                <div className="absolute -top-3 -right-2 rotate-[-10deg]">
                  <HeartEyesSticker />
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-[var(--color-charcoal)] px-3 py-1 rounded-[20px] bg-[var(--color-dew-drop)] border border-[var(--color-charcoal)]">
                  {exp.tag}
                </span>
                <span className="font-mono text-xs text-gray-500">
                  {exp.category}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[var(--color-cocoa-ink)] mb-3 flex items-center justify-between">
                <span>{exp.title}</span>
                <ArrowUpRight size={18} className="text-[var(--color-charcoal)]" />
              </h3>

              <p className="text-xs text-[var(--color-cocoa-ink)] opacity-90 leading-relaxed font-sans">
                {exp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
