import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

/**
 * Skiper26 - Animated Sliding & View-Transition Theme Toggle (@skiper-ui/skiper26)
 * 
 * Features:
 * - Ultra-smooth circular clip-path transition on theme change (relaxed 650ms easing)
 * - Tactile spring-animated Sun/Moon toggle pill
 * - Smooth CSS token transitions to prevent choppy flickers
 */
export function Skiper26({ className = "" }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("zafir-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = (e) => {
    const nextTheme = theme === "light" ? "dark" : "light";

    // If View Transition API is supported, run circular expanding transition
    if (document.startViewTransition && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e?.clientX || rect.left + rect.width / 2;
      const y = e?.clientY || rect.top + rect.height / 2;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        setTheme(nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("zafir-theme", nextTheme);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 650,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      setTheme(nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("zafir-theme", nextTheme);
    }
  };

  if (!mounted) return null;

  return (
    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      onClick={toggleTheme}
      className={`relative flex items-center justify-between p-1 w-14 h-7 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)] shadow-xs transition-colors cursor-pointer select-none ${className}`}
      title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode (@skiper-ui/skiper26)`}
      aria-label="Toggle Theme"
    >
      {/* Sliding Active Pill with Smooth Relaxed Spring */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.8,
        }}
        className={`absolute w-5 h-5 rounded-full bg-[var(--color-surface-tint)] border border-[var(--color-orange)]/40 flex items-center justify-center shadow-xs ${
          theme === "dark" ? "right-1" : "left-1"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "light" ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Sun size={12} className="text-[var(--color-orange)]" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Moon size={12} className="text-[var(--color-orange)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Static Sun & Moon icons on background */}
      <div className="w-full flex items-center justify-between px-1 pointer-events-none opacity-40">
        <Sun size={10} className="text-[var(--color-muted)]" />
        <Moon size={10} className="text-[var(--color-muted)]" />
      </div>
    </motion.button>
  );
}

export default Skiper26;
