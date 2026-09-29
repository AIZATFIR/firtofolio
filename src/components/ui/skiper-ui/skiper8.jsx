import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Authentic Skiper8 / Dennis Snellenberg Words Preloader
 * Features:
 * - Multi-stage cycling words
 * - Mathematical SVG curve morph exit (bezier ease [0.76, 0, 0.24, 1])
 * - Massive centered typography (pure & minimal, without dot clutter)
 * - Dynamic per-word pacing
 */
export function Skiper8({
  words = [
    { text: ";", duration: 800 },
    { text: "AIZATFIR", duration: 550 },
    { text: "AIZAT FAHIM FIRMANSYAH", duration: 750 },
    { text: "Hi", duration: 160 },
    { text: "Hello World", duration: 180 },
    { text: "Alooo", duration: 160 },
    { text: "^-^", duration: 160 },
    { text: "^-^  !", duration: 170 },
    { text: "Alooooo", duration: 180 },
    { text: "FOCUS CLOCK", duration: 250 },
    { text: "7AUDIO", duration: 250 },
    { text: "FITRAH LAUNCHER", duration: 250 },
    { text: "SADAR", duration: 250 },
    { text: "RYNC432", duration: 250 },
    { text: "QURABIC", duration: 250 },
    { text: "TERRA FLOW", duration: 250 },
    { text: "SOCIAL AFFINITY", duration: 250 },
    { text: "AIZATFIR", duration: 650 },
    { text: "AIZAT FAHIM FIRMANSYAH", duration: 800 },
    { text: "Building Solutions", duration: 900 },
    { text: 'Turning problems into "Manfaat"', duration: 1400 }
  ],
  onComplete,
  className = ""
}) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isActive, setIsActive] = useState(true);

  // Normalize words into uniform objects
  const normalizedWords = words.map((item) =>
    typeof item === "string" ? { text: item, duration: 220 } : item
  );

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll during preloader
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isActive]);

  // Per-word dynamic pacing
  useEffect(() => {
    if (!isActive) return;

    const currentWord = normalizedWords[index];
    const duration = currentWord?.duration || 240;

    if (index >= normalizedWords.length - 1) {
      // Final word finished, trigger exit curve
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

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curveVariants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  const slideUp = {
    initial: {
      top: 0
    },
    exit: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
  };

  const opacity = {
    initial: {
      opacity: 0
    },
    enter: {
      opacity: 1,
      transition: { duration: 0.2, delay: 0.05 }
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
          className={`fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-[#141516] text-[#ffffff] select-none ${className}`}
        >
          {dimension.width > 0 && (
            <>
              {/* Massive Centered Text (Clean, Bold, Without Dot) */}
              <motion.div
                variants={opacity}
                initial="initial"
                animate="enter"
                className="z-10 flex items-center justify-center max-w-[92vw] px-4 text-center"
              >
                <p className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-none">
                  {currentItem.text}
                </p>
              </motion.div>

              {/* Dennis Snellenberg Bottom SVG Curve Mask */}
              <svg className="pointer-events-none absolute top-0 h-[calc(100%+300px)] w-full fill-[#141516]">
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
