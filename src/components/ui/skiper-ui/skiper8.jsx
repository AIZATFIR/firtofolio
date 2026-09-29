import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Skiper8 - Atmospheric Words Preloader
 * Inspired by Dennis Snellenberg portfolio & Skiper UI
 * Supports dynamic per-word durations and rich website typography
 */
export function Skiper8({
  words = [
    { text: ";", duration: 900 },
    { text: "AIZATFIR", duration: 650 },
    { text: "AIZAT FAHIM FIRMANSYAH", duration: 850 },
    { text: "Hi", duration: 180 },
    { text: "Hello World", duration: 200 },
    { text: "Alooo", duration: 180 },
    { text: "^-^", duration: 180 },
    { text: "^-^  !", duration: 190 },
    { text: "Alooooo", duration: 200 },
    { text: "FOCUS CLOCK", duration: 300 },
    { text: "7AUDIO", duration: 300 },
    { text: "FITRAH LAUNCHER", duration: 300 },
    { text: "SADAR", duration: 300 },
    { text: "RYNC432", duration: 300 },
    { text: "QURABIC", duration: 300 },
    { text: "TERRA FLOW", duration: 300 },
    { text: "SOCIAL AFFINITY", duration: 300 },
    { text: "AIZATFIR", duration: 700 },
    { text: "AIZAT FAHIM FIRMANSYAH", duration: 900 },
    { text: "Building Solutions", duration: 1000 },
    { text: 'Turning problems into "Manfaat"', duration: 1600 }
  ],
  onComplete,
  className = ""
}) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isActive, setIsActive] = useState(true);

  // Normalize words into uniform objects
  const normalizedWords = words.map((item) =>
    typeof item === "string" ? { text: item, duration: 240 } : item
  );

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Per-word dynamic pacing
  useEffect(() => {
    if (!isActive) return;

    const currentWord = normalizedWords[index];
    const duration = currentWord?.duration || 260;

    if (index >= normalizedWords.length - 1) {
      // Final word finished, close preloader after its duration
      const exitTimer = setTimeout(() => {
        setIsActive(false);
        if (onComplete) onComplete();
      }, duration);
      return () => clearTimeout(exitTimer);
    }

    const nextTimer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, duration);

    return () => clearTimeout(nextTimer);
  }, [index, normalizedWords, isActive, onComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curveVariants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.25 }
    }
  };

  const slideUp = {
    initial: {
      top: 0
    },
    exit: {
      top: "-100vh",
      transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.15 }
    }
  };

  const currentItem = normalizedWords[index] || normalizedWords[0];

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className={`fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-[#0d0d0e] text-[#fdfbf9] select-none ${className}`}
        >
          {dimension.width > 0 && (
            <>
              {/* Dynamic Center Word with Web Typography & Glowing Accent */}
              <div className="z-10 flex flex-col items-center justify-center max-w-[90vw] px-4 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -14, scale: 1.02 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap text-center"
                  >
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff6f1e] shadow-[0_0_12px_#ff6f1e] shrink-0" />
                    <span className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-tight">
                      {currentItem.text}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {currentItem.sub && (
                  <span className="font-mono text-xs sm:text-sm tracking-widest text-[#ff6f1e] uppercase mt-3">
                    {currentItem.sub}
                  </span>
                )}
              </div>

              {/* Dennis Snellenberg Bottom SVG Curve Mask */}
              <svg className="pointer-events-none absolute top-0 h-[calc(100%+300px)] w-full fill-[#0d0d0e]">
                <motion.path
                  variants={curveVariants}
                  initial="initial"
                  exit="exit"
                />
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Animated rolling text effect for project titles and names.
 * Carefully engineered with word-level grouping to ensure responsive text wrapping
 * without overflowing or clipping on mobile/tablet viewports.
 */
export function Skiper8Text({ text, className = "" }) {
  if (!text) return null;

  // Split by words to preserve whole words on line wrapping
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap items-baseline justify-center max-w-full gap-x-[0.25em] gap-y-[0.1em] text-center ${className}`}>
      {words.map((word, wordIdx) => {
        // Calculate cumulative character offset for staggered animation
        const prevCharsCount = words
          .slice(0, wordIdx)
          .reduce((acc, w) => acc + w.length + 1, 0);

        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap overflow-hidden">
            {word.split("").map((char, charIdx) => {
              const totalIdx = prevCharsCount + charIdx;
              return (
                <motion.span
                  key={charIdx}
                  initial={{ y: "105%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-10px" }}
                  transition={{
                    duration: 0.5,
                    delay: totalIdx * 0.022,
                    ease: [0.33, 1, 0.68, 1]
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

export default Skiper8;
