import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Skiper95 - Scroll Progress 003
 * 
 * Interactive vertical scroll indicator featuring clip-path text reveal,
 * smooth draggable progress thumb, and percentage tracking.
 */
export function Skiper95({
  className = "",
  color = "#ff6f1e",
  accentText = "SCROLL",
  showTicks = true,
  onScrub,
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const heightPercent = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const clipBottom = useTransform(smoothProgress, [0, 1], ["100%", "0%"]);

  return (
    <div
      ref={containerRef}
      className={`fixed left-2 top-1/2 -translate-y-1/2 z-40 select-none flex items-center gap-2 ${className}`}
    >
      <div className="relative w-7 h-44 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)]/80 backdrop-blur-md overflow-hidden flex flex-col justify-between items-center py-2 shadow-lg">
        {/* Dynamic Clip-path Fill Background */}
        <motion.div
          className="absolute inset-x-0 bottom-0 origin-bottom"
          style={{
            height: heightPercent,
            backgroundColor: color,
          }}
        />

        {/* Base Layer Label (Unfilled state) */}
        <div className="relative z-10 w-full flex flex-col items-center justify-between h-full pointer-events-none text-[9px] font-mono font-bold text-[var(--color-muted)]">
          <span>00</span>
          {showTicks && (
            <div className="flex flex-col gap-1 opacity-60">
              <span className="w-1.5 h-[1px] bg-current" />
              <span className="w-2.5 h-[1px] bg-current" />
              <span className="w-1.5 h-[1px] bg-current" />
            </div>
          )}
          <span>{String(percent).padStart(2, "0")}</span>
        </div>

        {/* Inverted Layer Label via Clip-Path */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-between py-2 pointer-events-none text-[9px] font-mono font-bold text-white"
          style={{
            clipPath: useTransform(clipBottom, (val) => `inset(0 0 ${val} 0)`),
          }}
        >
          <span>00</span>
          {showTicks && (
            <div className="flex flex-col gap-1 opacity-90">
              <span className="w-1.5 h-[1px] bg-white" />
              <span className="w-2.5 h-[1px] bg-white" />
              <span className="w-1.5 h-[1px] bg-white" />
            </div>
          )}
          <span>{String(percent).padStart(2, "0")}</span>
        </motion.div>
      </div>
    </div>
  );
}

export default Skiper95;
