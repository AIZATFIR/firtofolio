import React from 'react';
import { motion } from 'framer-motion';

/**
 * SplitText Component from React Bits
 * Splits text into animated characters or words with customizable spring physics & stagger.
 */
export default function SplitText({
  text = '',
  className = '',
  delay = 50,
  animationFrom = { opacity: 0, y: 40, rotateX: -40 },
  animationTo = { opacity: 1, y: 0, rotateX: 0 },
  easing = [0.16, 1, 0.3, 1], // easeOutExpo
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'left',
  onLetterAnimationComplete,
}) {
  const letters = text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: delay / 1000, delayChildren: 0.04 * i },
    }),
  };

  const letterVariants = {
    hidden: animationFrom,
    visible: {
      ...animationTo,
      transition: {
        duration: 0.65,
        ease: easing,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block overflow-hidden ${className}`}
      style={{ textAlign, display: 'inline-flex', flexWrap: 'wrap' }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: rootMargin }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block will-change-transform"
          onAnimationComplete={
            index === letters.length - 1 ? onLetterAnimationComplete : undefined
          }
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
