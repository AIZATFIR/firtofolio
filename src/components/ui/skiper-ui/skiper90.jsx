import React from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

/**
 * Skiper90 - Individual Tactile Expandable Stage Card (@skiper-ui/skiper90)
 */
export function Skiper90({
  stageNumber = "01",
  stageTitle = "Problem",
  content = "",
  ctaText = "Click to expand →",
  onClick,
  className = "",
}) {
  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-4.5 rounded-[16px] bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-all shadow-xs text-left group cursor-pointer relative overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between gap-1 mb-2">
        <span className="font-mono text-[11px] uppercase font-bold text-[var(--color-orange)] tracking-wider">
          {stageNumber} / {stageTitle}
        </span>
        <Maximize2 size={13} className="text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <p className="text-xs text-[var(--color-text)] leading-relaxed line-clamp-3 group-hover:text-[var(--color-headline)] transition-colors">
        {content}
      </p>

      <span className="font-mono text-[10px] text-[var(--color-orange)] font-semibold mt-2.5 inline-block opacity-80 group-hover:opacity-100">
        {ctaText}
      </span>
    </motion.button>
  );
}

export default Skiper90;
