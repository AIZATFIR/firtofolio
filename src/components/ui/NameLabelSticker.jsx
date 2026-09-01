import React from 'react';

/**
 * NameLabelSticker Component
 * Superr Reference: Laminated school name tag that sits on notebook covers.
 * White card, 1px Charcoal border, 8px corner radius, with handwritten field text.
 */
export default function NameLabelSticker({
  name = 'Focus Clock',
  category = 'AI & Rhythms',
  year = '2026',
  className = '',
}) {
  return (
    <div
      className={`bg-white border border-[var(--color-charcoal)] rounded-[8px] p-3 shadow-xs select-none max-w-[200px] ${className}`}
    >
      <div className="border-b border-[var(--color-charcoal)] pb-1 mb-1.5 flex justify-between items-baseline">
        <span className="font-mono text-[10px] text-gray-500 uppercase">PROJECT</span>
        <span className="font-handwritten text-base font-bold text-[var(--color-cocoa-ink)] leading-none truncate">
          {name}
        </span>
      </div>
      <div className="border-b border-[var(--color-charcoal)] pb-1 mb-1.5 flex justify-between items-baseline">
        <span className="font-mono text-[10px] text-gray-500 uppercase">DOMAIN</span>
        <span className="font-handwritten text-xs text-[var(--color-marker-orange)] leading-none truncate">
          {category}
        </span>
      </div>
      <div className="flex justify-between items-baseline">
        <span className="font-mono text-[10px] text-gray-500 uppercase">ROLL NO.</span>
        <span className="font-mono text-[10px] font-bold text-[var(--color-charcoal)]">
          #{year}
        </span>
      </div>
    </div>
  );
}
