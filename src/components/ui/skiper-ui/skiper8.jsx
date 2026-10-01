"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Skiper8 - Official Skiper UI Pro Words Preloader
 * High-contrast white glow, snappy cadence, and Dennis Snellenberg SVG curve curtain
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
    y: 12,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.15, ease: [0.76, 0, 0.24, 1] },
  },
};

export const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: "calc(-100vh - 400px)",
    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
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

  // Word Cycling Logic with rhythmic pacing
  useEffect(() => {
    if (index === words.length - 1) {
      const exitTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 700);
      return () => clearTimeout(exitTimer);
    }

    let delay = 360;
    if (index === 0) {
      delay = 600; // Opening ";"
    } else if (index === 1) {
      delay = 700; // AIZATFIR
    } else if (index === 2) {
      delay = 400; // Hi
    } else if (index >= 3 && index <= 9) {
      delay = 340; // Projects
    } else if (index >= 10) {
      delay = 900; // Final "Turning problems into Manfaat"
    }

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [index, words.length, onComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 400} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={`fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-[#0d0e10] text-white select-none pointer-events-auto ${className}`}
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            key={index}
            variants={opacity}
            initial="initial"
            animate="enter"
            exit="exit"
            className="z-10 flex items-center justify-center font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white px-6 text-center drop-shadow-[0_0_24px_rgba(255,255,255,0.7)]"
          >
            <span className="mr-3 sm:mr-4 h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-white shrink-0 inline-block shadow-[0_0_14px_#ffffff,0_0_28px_#ffffff]" />
            <span>{words[index]}</span>
          </motion.p>

          <svg className="pointer-events-none absolute top-0 h-[calc(100%+400px)] w-full fill-[#0d0e10]">
            <motion.path variants={curve} initial="initial" exit="exit" />
          </svg>
        </>
      )}
    </motion.div>
  );
}

/**
 * High-performance animated headline text
 */
export function Skiper8Text({ text, className = "" }) {
  if (!text) return null;

  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap items-baseline justify-center max-w-full gap-x-[0.25em] gap-y-[0.1em] text-center ${className}`}>
      {words.map((word, wordIdx) => (
        <motion.span
          key={wordIdx}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: wordIdx * 0.06,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="inline-block whitespace-nowrap will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default Skiper8;
