import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * CustomCursor Component from React Bits
 * Features smooth trailing physics, mode switches (VIEW, EXPLORE, MAGNETIC),
 * and automatic touch device detection to remain accessible and unobtrusive.
 */
export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default'); // 'default', 'view', 'explore', 'link'
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(-100, { damping: 28, stiffness: 350 });
  const cursorY = useSpring(-100, { damping: 28, stiffness: 350 });
  const scale = useSpring(1, { damping: 20, stiffness: 300 });

  useEffect(() => {
    // Check for touch / fine pointer
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (hasTouch && !isFinePointer) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Attach hover listeners for interactive elements
    const handleOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const mode = target.getAttribute('data-cursor');
        setCursorVariant(mode);
        if (mode === 'view') {
          setCursorText('VIEW');
          scale.set(3.2);
        } else if (mode === 'explore') {
          setCursorText('EXPLORE →');
          scale.set(3.6);
        } else if (mode === 'link') {
          setCursorText('');
          scale.set(0.6);
        }
      } else {
        const isClickable = e.target.closest('a, button, input, [role="button"]');
        if (isClickable) {
          setCursorVariant('link');
          setCursorText('');
          scale.set(1.4);
        } else {
          setCursorVariant('default');
          setCursorText('');
          scale.set(1);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleOver);
    };
  }, [isVisible, cursorX, cursorY, scale]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      className="custom-cursor-follower pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 select-none"
      style={{
        x: cursorX,
        y: cursorY,
        scale,
      }}
    >
      <div
        className={`rounded-full transition-colors duration-200 flex items-center justify-center text-center ${
          cursorVariant === 'view' || cursorVariant === 'explore'
            ? 'w-16 h-16 bg-[var(--color-charcoal,#171717)] text-[var(--color-cream,#fdfbf9)] shadow-lg'
            : cursorVariant === 'link'
            ? 'w-6 h-6 border-2 border-[var(--color-orange,#ff6f1e)] bg-[rgba(255,111,30,0.15)]'
            : 'w-3.5 h-3.5 bg-[var(--color-orange,#ff6f1e)]'
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono font-bold tracking-wider leading-none px-1">
            {cursorText}
          </span>
        )}
      </div>
    </motion.div>
  );
}
