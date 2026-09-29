"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Skiper8 - Official Skiper UI Pro Words Preloader
 * 100% faithful to Dennis Snellenberg / Skiper UI curved SVG morphing & synchronous exit
 */
const defaultWords = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "Hallo",
  "Guten Tag",
  "Hallo",
  "Welcome"
];

export const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.95,
    transition: { duration: 0.5, delay: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
  },
};

export const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: "calc(-100vh - 350px)",
    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.15 },
  },
};

export function Skiper8({
  words = defaultWords,
  onComplete,
  className = ""
}) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

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
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Word Cycling Logic
  useEffect(() => {
    if (index === words.length - 1) {
      const exitTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000);
      return () => clearTimeout(exitTimer);
    }

    const delay = index === 0 ? 800 : index < 3 ? 500 : index >= words.length - 4 ? 600 : 160;
    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [index, words.length, onComplete]);

  // Synchronized SVG curve morph paths
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.15 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={`fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-[#141516] text-white select-none pointer-events-auto ${className}`}
    >
      {dimension.width > 0 && (
        <>
          {/* Authentic Skiper8 Text with White Indicator Dot */}
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            exit="exit"
            className="z-10 flex items-center justify-center font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white px-6 text-center"
          >
            <span className="mr-3 sm:mr-4 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-white shrink-0 inline-block shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
            <span>{words[index]}</span>
          </motion.p>

          {/* Dennis Snellenberg Mathematical SVG Curve Mask */}
          <svg className="pointer-events-none absolute top-0 h-[calc(100%+300px)] w-full fill-[#141516]">
            <motion.path variants={curve} initial="initial" exit="exit" />
          </svg>
        </>
      )}
    </motion.div>
  );
}

/**
 * Animated rolling text effect for titles and headlines
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
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIdx) => {
              const totalIdx = prevCharsCount + charIdx;
              return (
                <motion.span
                  key={charIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: totalIdx * 0.02,
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
