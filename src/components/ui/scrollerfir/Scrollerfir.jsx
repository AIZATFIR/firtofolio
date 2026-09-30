import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';

/**
 * Scrollerfir - Proprietary 3D Perspective Scroll Canvas
 * 
 * Inspired by the authentic tactile scroll in Qurabic-Indo:
 * - Starts tilted backward (18° ~ 20°) in 3D perspective as it scrolls into view
 * - Smoothly straightens and scales up to 1.0 flat view at the viewport center
 * - Multi-layer progressive elevation shadow for tangible paper depth
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.titleComponent - Optional animated header content
 * @param {React.ReactNode} props.children - Card viewport / embed content
 * @param {number} [props.perspective=1000] - 3D Perspective depth in px
 * @param {number[]} [props.rotateRange=[20, 0]] - Initial and final tilt angle in degrees
 * @param {string} [props.className=""] - Additional container classes
 * @param {string} [props.cardClassName=""] - Additional card classes
 */
export function Scrollerfir({
  titleComponent,
  children,
  perspective = 1000,
  rotateRange = [20, 0],
  className = "",
  cardClassName = "",
}) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Tactile spring physics for silky-smooth response
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    mass: 0.15,
  });

  // Exact Qurabic-Indo 3D Tilt Progression:
  // 0.0 -> 0.5: Rotates from 20° tilt to 0° upright
  // 0.5 -> 1.0: Gentle exit tilt to -16°
  const rotateX = useTransform(smoothScroll, [0, 0.48, 0.52, 1], [rotateRange[0], 0, 0, -rotateRange[0] * 0.8]);
  const scale = useTransform(
    smoothScroll,
    [0, 0.48, 0.52, 1],
    isMobile ? [0.88, 1, 1, 0.92] : [1.03, 1, 1, 0.96]
  );
  const translateY = useTransform(smoothScroll, [0, 0.48, 0.52, 1], [60, 0, 0, -50]);
  const headerTranslate = useTransform(smoothScroll, [0, 0.5], [0, -30]);

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center relative p-2 md:p-8 ${className}`}
    >
      <div
        className="w-full relative"
        style={{
          perspective: `${perspective}px`,
          transformStyle: 'preserve-3d',
        }}
      >
        {titleComponent && (
          <ScrollerfirHeader translate={headerTranslate}>
            {titleComponent}
          </ScrollerfirHeader>
        )}

        <ScrollerfirCard
          rotateX={rotateX}
          scale={scale}
          translateY={translateY}
          className={cardClassName}
        >
          {children}
        </ScrollerfirCard>
      </div>
    </div>
  );
}

export function ScrollerfirHeader({ translate, children, className = "" }) {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className={`max-w-5xl mx-auto text-center px-4 mb-6 will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function ScrollerfirCard({
  rotateX,
  scale,
  translateY,
  children,
  className = "",
  style = {},
}) {
  return (
    <motion.div
      style={{
        rotateX,
        scale,
        translateY,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
        transformOrigin: '50% 50%',
        transformStyle: 'preserve-3d',
        ...style,
      }}
      className={`max-w-5xl mx-auto w-full p-2 md:p-6 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-[24px] md:rounded-[30px] shadow-2xl overflow-hidden will-change-transform ${className}`}
    >
      <div className="bg-[var(--color-surface-tint)] h-full w-full rounded-[16px] md:rounded-2xl overflow-hidden border border-[var(--color-border)] flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

export default Scrollerfir;
