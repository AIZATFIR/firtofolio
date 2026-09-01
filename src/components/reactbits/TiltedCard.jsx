import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * TiltedCard Component from React Bits
 * 3D Physics tilt card with dynamic glare, shadow depth, and tooltip overlay.
 */
export default function TiltedCard({
  imageSrc,
  altText = 'Tilted Card',
  captionText = '',
  containerHeight = '360px',
  containerWidth = '100%',
  imageHeight = '100%',
  imageWidth = '100%',
  scaleOnHover = 1.04,
  rotateAmplitude = 12,
  showMobileWarning = false,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  className = '',
  onClick,
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(0, { damping: 25, stiffness: 200 });
  const rotateY = useSpring(0, { damping: 25, stiffness: 200 });
  const scale = useSpring(1, { damping: 25, stiffness: 200 });
  const glareX = useSpring(50, { damping: 20, stiffness: 150 });
  const glareY = useSpring(50, { damping: 20, stiffness: 150 });

  function handleMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotX);
    rotateY.set(rotY);

    const gx = ((e.clientX - rect.left) / rect.width) * 100;
    const gy = ((e.clientY - rect.top) / rect.height) * 100;
    glareX.set(gx);
    glareY.set(gy);
  }

  function handleMouseEnter() {
    setIsHovered(true);
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    glareX.set(50);
    glareY.set(50);
  }

  return (
    <figure
      ref={ref}
      className={`tilted-card-container relative overflow-hidden rounded-[16px] border border-[var(--color-border)] cursor-pointer select-none ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className="tilted-card-inner w-full h-full relative"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-cover rounded-[14px]"
            loading="lazy"
          />
        )}

        {/* Dynamic Glare */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[14px] opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)`,
          }}
        />

        {/* Overlay Content / Badges */}
        {(displayOverlayContent || isHovered) && overlayContent && (
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 pointer-events-none">
            {overlayContent}
          </div>
        )}
      </motion.div>

      {showTooltip && captionText && (
        <figcaption className="sr-only">{captionText}</figcaption>
      )}
    </figure>
  );
}
