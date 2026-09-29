import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Signature Component (@componentry/signature)
 * Renders an authentic handwritten signature for "aizatfir"
 * Features:
 * - Animated cursive SVG path flourish
 * - Interactive redraw on click / hover
 * - Responsive scaling and color synchronization
 */
export function Signature({
  text = "aizatfir",
  className = "",
  color = "var(--color-orange)",
  size = "md", // "sm", "md", "lg"
  animate = true,
}) {
  const [key, setKey] = useState(0);

  const sizeStyles = {
    sm: "text-2xl h-9",
    md: "text-3xl sm:text-4xl h-12",
    lg: "text-4xl sm:text-5xl md:text-6xl h-16",
  };

  const handleReplay = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <motion.div
      key={key}
      whileHover={{ scale: 1.05, rotate: -3 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleReplay}
      className={`inline-flex items-center justify-center font-handwritten select-none cursor-pointer relative group ${sizeStyles[size] || sizeStyles.md} ${className}`}
      title="Authentic Signature (Click to replay stroke)"
      style={{
        transform: "rotate(-5deg)",
        transformOrigin: "center left",
      }}
    >
      {/* Dynamic Hand-Drawn Vector Flourish Underlay */}
      <svg
        className="absolute -bottom-2 -left-1 w-[115%] h-[24px] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
        viewBox="0 0 160 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M 5,16 Q 40,22 85,14 Q 130,7 155,18"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        />
        <motion.path
          d="M 125,12 Q 142,5 158,16"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
        />
      </svg>

      {/* Main Signature Text Cursive Render */}
      <motion.span
        initial={{ opacity: 0, y: 3, filter: "blur(2px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-bold tracking-normal italic relative z-10"
        style={{
          fontFamily: "'Caveat', 'Great Vibes', 'Alex Brush', cursive",
          color: color,
          textShadow: `0 0 16px ${color}33`,
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}

export default Signature;
