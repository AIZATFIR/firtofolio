import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Authentic Skiper8 / Dennis Snellenberg Words Preloader
 * 
 * Includes:
 * - Fluid AnimatePresence word fade & slide transitions
 * - Mathematical cubic-bezier [0.76, 0, 0.24, 1] SVG curve morph & slideUp
 * - Rich ambient studio lighting with warm radial aura for deep immersion
 * - Dynamic per-word pacing
 */
export function Skiper8({
  words = [
    { text: ";", duration: 750 },
    { text: "AIZATFIR", duration: 550 },
    { text: "AIZAT FAHIM FIRMANSYAH", duration: 700 },
    { text: "Hi", duration: 150 },
    { text: "Hello World", duration: 170 },
    { text: "Alooo", duration: 150 },
    { text: "^-^", duration: 150 },
    { text: "^-^  !", duration: 160 },
    { text: "Alooooo", duration: 170 },
    { text: "FOCUS CLOCK", duration: 240 },
    { text: "7AUDIO", duration: 240 },
    { text: "RYNC432", duration: 240 },
    { text: "QURABIC", duration: 240 },
    { text: "TERRA FLOW", duration: 240 },
    { text: "SOCIAL AFFINITY", duration: 240 },
    { text: "FITRAH LAUNCHER", duration: 240 },
    { text: "SADAR", duration: 240 },
    { text: "AIZATFIR", duration: 600 },
    { text: "AIZAT FAHIM FIRMANSYAH", duration: 750 },
    { text: "Building Solutions", duration: 850 },
    { text: 'Turning problems into "Manfaat"', duration: 1300 }
  ],
  onComplete,
  className = ""
}) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isActive, setIsActive] = useState(true);

  // Normalize words into objects
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

  // Lock scroll during preloader
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
      // Final word reached, trigger the curve exit
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

  // Famous Dennis Snellenberg Bezier Curve
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

  // Word fade & vertical drift variants
  const wordVariants = {
    initial: {
      opacity: 0,
      y: 18,
      filter: "blur(4px)"
    },
    enter: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.22, ease: [0.33, 1, 0.68, 1] }
    },
    exit: {
      opacity: 0,
      y: -18,
      filter: "blur(4px)",
      transition: { duration: 0.18, ease: [0.33, 1, 0.68, 1] }
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
          className={`fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-[#0c0c0e] text-[#ffffff] select-none ${className}`}
          style={{
            background: "radial-gradient(circle at 50% 50%, #17171c 0%, #0c0c0e 70%)"
          }}
        >
          {dimension.width > 0 && (
            <>
              {/* Center Stage Word Container */}
              <div className="z-10 flex items-center justify-center max-w-[92vw] px-4 text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={index}
                    variants={wordVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-none drop-shadow-[0_4px_24px_rgba(255,255,255,0.12)]"
                  >
                    {currentItem.text}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Dennis Snellenberg Mathematical SVG Curve Mask */}
              <svg className="pointer-events-none absolute top-0 h-[calc(100%+300px)] w-full fill-[#0c0c0e]">
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
 * Animated rolling text effect for titles and headlines.
 * Words wrap cleanly per line without character splitting or overflow.
 */
export function Skiper8Text({ text, className = "" }) {
  if (!text) return null;

  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap items-baseline justify-center max-w-full gap-x-[0.25em] gap-y-[0.1em] text-center ${className}`}>
      {words.map((word, wordIdx) => {
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
                    duration: 0.55,
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
