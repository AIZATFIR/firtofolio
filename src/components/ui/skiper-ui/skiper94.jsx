import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Skiper94 - Scroll Progress 002
 * 
 * Vertical scroll progress indicator with smooth spring physics,
 * animated percentage counter, and clip-path color inversion.
 */
export function Skiper94({
  className = "",
  color = "#ff6f1e",
  showPercentage = true,
  position = "left" // 'left' | 'right'
}) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const heightTransform = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 z-40 select-none flex items-center ${
        position === "left" ? "left-3" : "right-3"
      } ${className}`}
    >
      <div className="relative flex flex-col items-center">
        {/* Track */}
        <div className="relative w-1.5 h-36 sm:h-48 rounded-full bg-[var(--color-border)]/40 overflow-hidden backdrop-blur-xs">
          {/* Animated Fill Bar with Clip Path */}
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full"
            style={{
              height: heightTransform,
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}80`,
            }}
          />
        </div>

        {/* Percentage Counter Indicator */}
        {showPercentage && (
          <div className="mt-2 font-mono text-[10px] font-bold text-[var(--color-headline)] tracking-wider">
            <span>{String(percent).padStart(2, "0")}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Skiper94;
