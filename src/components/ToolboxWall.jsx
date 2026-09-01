import React, { useState } from 'react';
import { TOOLBOX } from '../data/portfolioData';
import { Terminal } from 'lucide-react';
import HandDrawnArrow from './ui/HandDrawnArrow';
import { LightningSticker, SproutSparkleSticker } from './ui/StickerCluster';

export default function ToolboxWall() {
  const [activeItem, setActiveItem] = useState(TOOLBOX[0]);

  return (
    <section className="toolbox-section py-24 border-b border-[var(--color-border)]" id="toolbox">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-handwritten text-2xl text-[var(--color-marker-orange)]">
                what i speak
              </span>
              <HandDrawnArrow direction="down-right" className="-mb-2" />
            </div>
            <h2 className="display-headline">
              toolbox wall
            </h2>
          </div>
          <p className="text-sm text-[var(--color-cocoa-ink)] max-w-sm font-serif">
            A technical index of languages, audio synthesis engines, and systems tooling I operate daily.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tool Card Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOOLBOX.map((tool, idx) => {
              const isSelected = activeItem.name === tool.name;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveItem(tool)}
                  onClick={() => setActiveItem(tool)}
                  className={`p-4 rounded-[12px] border-[1.5px] transition-all duration-150 cursor-pointer select-none ${
                    isSelected
                      ? 'border-[var(--color-charcoal)] bg-[var(--color-dew-drop)] shadow-xs translate-x-1'
                      : 'border-[var(--color-charcoal)] bg-[var(--color-cream-paper)] hover:bg-[var(--color-dew-drop)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display font-semibold text-base text-[var(--color-cocoa-ink)]">
                      {tool.name}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-charcoal)] px-2.5 py-0.5 rounded-[20px] bg-white border border-[var(--color-charcoal)]">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-cocoa-ink)] opacity-80 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Node Inspector (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-6 md:p-8 rounded-[16px] border-[1.5px] border-[var(--color-charcoal)] bg-white shadow-xs relative">
              <div className="absolute -top-4 right-4 rotate-[-6deg]">
                <SproutSparkleSticker />
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-charcoal)] mb-6">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--color-charcoal)]">
                  <Terminal size={14} className="text-[var(--color-marker-orange)]" />
                  <span>NOTEBOOK INDEX // {activeItem.name}</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-marker-orange)]" />
              </div>

              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Architecture Domain</span>
                  <h4 className="text-2xl font-bold font-display text-[var(--color-cocoa-ink)]">
                    {activeItem.name}
                  </h4>
                </div>

                <div className="bg-[var(--color-dew-drop)] p-4 rounded-[12px] border border-[var(--color-charcoal)]">
                  <span className="text-[10px] font-mono text-[var(--color-marker-orange)] font-bold uppercase block mb-1">
                    Primary Usage
                  </span>
                  <p className="text-sm font-handwritten text-xl font-bold text-[var(--color-cocoa-ink)]">
                    "{activeItem.annotation}"
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Engineering Scope</span>
                  <p className="text-xs text-[var(--color-cocoa-ink)] leading-relaxed font-sans">
                    {activeItem.description}
                  </p>
                </div>

                {/* SVG Notebook Doodle */}
                <div className="pt-4 border-t border-[var(--color-charcoal)]">
                  <svg className="w-full h-12 stroke-[var(--color-charcoal)] opacity-70" viewBox="0 0 300 40" fill="none">
                    <path d="M5 20 H60 L80 10 H140 L160 30 H220 L240 20 H295" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="5" cy="20" r="3" fill="var(--color-marker-orange)" />
                    <circle cx="140" cy="10" r="3" fill="var(--color-charcoal)" />
                    <circle cx="220" cy="30" r="3" fill="var(--color-charcoal)" />
                    <circle cx="295" cy="20" r="3" fill="var(--color-marker-orange)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
