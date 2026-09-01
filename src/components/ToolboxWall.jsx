import React, { useState } from 'react';
import { TOOLBOX } from '../data/portfolioData';
import SpotlightCard from './reactbits/SpotlightCard';
import DecryptedText from './reactbits/DecryptedText';
import { Cpu, Terminal, Sparkles, Layers } from 'lucide-react';

export default function ToolboxWall() {
  const [activeItem, setActiveItem] = useState(TOOLBOX[0]);

  return (
    <section className="toolbox-section py-24 border-b border-[var(--color-border)]" id="toolbox">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-orange)] uppercase tracking-widest mb-2">
              <Cpu size={14} />
              <span>Technical Infrastructure</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--color-charcoal)]">
              TOOLBOX
            </h2>
          </div>
          <p className="text-sm font-mono text-[var(--color-muted)] max-w-sm">
            Technologies I use to build systems, synthesize audio, and craft tactile web experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Tool Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOOLBOX.map((tool, idx) => {
              const isSelected = activeItem.name === tool.name;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveItem(tool)}
                  onClick={() => setActiveItem(tool)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                    isSelected
                      ? 'border-[var(--color-orange)] bg-[rgba(255,111,30,0.06)] shadow-sm'
                      : 'border-[var(--color-border)] bg-[var(--color-card-bg)] hover:border-gray-400'
                  }`}
                  data-cursor="view"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono font-bold text-sm text-[var(--color-charcoal)]">
                      {tool.name}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-orange)] px-2 py-0.5 rounded-full bg-[var(--color-dew)] border border-[var(--color-border)]">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-muted)] line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Tool Circuitry Annotation Inspector (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <SpotlightCard
              spotlightColor="rgba(255, 111, 30, 0.15)"
              borderColor="rgba(255, 111, 30, 0.5)"
              className="p-6 md:p-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--color-orange)] uppercase">
                  <Terminal size={14} />
                  <span>Circuit Node // {activeItem.name}</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase block mb-1">Architecture Domain</span>
                  <h4 className="text-2xl font-black text-[var(--color-charcoal)]">
                    <DecryptedText text={activeItem.name} speed={30} />
                  </h4>
                </div>

                <div className="bg-[var(--color-dew)] p-4 rounded-xl border border-[var(--color-border)]">
                  <span className="text-[10px] font-mono text-[var(--color-orange)] font-bold uppercase block mb-1">System Application</span>
                  <p className="text-sm font-mono text-[var(--color-charcoal)]">
                    "{activeItem.annotation}"
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase block mb-1">Engineering Description</span>
                  <p className="text-xs text-[var(--color-cocoa)] leading-relaxed">
                    {activeItem.description}
                  </p>
                </div>

                {/* SVG Circuit Schematic Doodle */}
                <div className="pt-4 border-t border-[var(--color-border)]">
                  <svg className="w-full h-16 stroke-[var(--color-charcoal)] opacity-60" viewBox="0 0 300 60" fill="none">
                    <path d="M10 30 H60 L80 15 H140 L160 45 H220 L240 30 H290" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="10" cy="30" r="4" fill="var(--color-orange)" />
                    <circle cx="140" cy="15" r="4" fill="var(--color-charcoal)" />
                    <circle cx="220" cy="45" r="4" fill="var(--color-charcoal)" />
                    <circle cx="290" cy="30" r="4" fill="var(--color-orange)" />
                  </svg>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
