import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * Magnet Component from React Bits
 * Magnetically pulls elements toward cursor position when within active range.
 */
export default function Magnet({
  children,
  padding = 60,
  disabled = false,
  magnetStrength = 2.5,
  activeTransition = { type: 'spring', damping: 15, stiffness: 150, mass: 0.1 },
  inactiveTransition = { type: 'spring', damping: 12, stiffness: 120, mass: 0.2 },
  wrapperClassName = '',
  innerClassName = '',
  ...props
}) {
  const [isActive, setIsActive] = useState(false);
  const magnetRef = useRef(null);

  const x = useSpring(0, isActive ? activeTransition : inactiveTransition);
  const y = useSpring(0, isActive ? activeTransition : inactiveTransition);

  useEffect(() => {
    if (disabled) {
      x.set(0);
      y.set(0);
      return;
    }

    const handleMouseMove = (e) => {
      if (!magnetRef.current) return;
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true);
        const offsetX = (e.clientX - centerX) / magnetStrength;
        const offsetY = (e.clientY - centerY) / magnetStrength;
        x.set(offsetX);
        y.set(offsetY);
      } else {
        setIsActive(false);
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, disabled, magnetStrength, x, y]);

  return (
    <div ref={magnetRef} className={`magnet-wrapper inline-block ${wrapperClassName}`} {...props}>
      <motion.div style={{ x, y }} className={innerClassName}>
        {children}
      </motion.div>
    </div>
  );
}
