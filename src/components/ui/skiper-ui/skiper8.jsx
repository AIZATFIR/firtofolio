import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const defaultWords = [
  "Hello",
  "AIZAT FAHIM FIRMANSYAH",
  "ZAFIR;",
  "Zephyr",
  "Focus Clock",
  "RYNC432",
  "Qurabic",
  "Welcome"
];

/**
 * Skiper8 - Words Preloader
 * Inspired by Dennis Snellenberg portfolio & Skiper UI
 */
export function Skiper8({
  words = defaultWords,
  onComplete,
  duration = 2400,
  className = ""
}) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (index === words.length - 1) return;

    const timeout = setTimeout(
      () => {
        setIndex((prev) => prev + 1);
      },
      index === 0 ? 800 : 220
    );

    return () => clearTimeout(timeout);
  }, [index, words.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false);
      if (onComplete) onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

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
      opacity: 0.85,
      transition: { duration: 0.2, delay: 0.1 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className={`fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-[#171717] text-[#fdfbf9] ${className}`}
        >
          {dimension.width > 0 && (
            <>
              {/* Cycling Word */}
              <motion.div
                variants={opacity}
                initial="initial"
                animate="enter"
                className="z-10 flex items-center gap-3"
              >
                <span className="h-3 w-3 rounded-full bg-[#ff6f1e]" />
                <p className="font-mono text-2xl font-bold tracking-tight text-white md:text-4xl">
                  {words[index]}
                </p>
              </motion.div>

              {/* Bottom SVG Curve */}
              <svg className="pointer-events-none absolute top-0 h-[calc(100%+300px)] w-full fill-[#171717]">
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
 * Animated rolling text effect for project titles and names
 */
export function Skiper8Text({ text, className = "" }) {
  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: i * 0.02,
            ease: [0.33, 1, 0.68, 1]
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default Skiper8;
