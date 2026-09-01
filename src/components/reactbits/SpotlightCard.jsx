import React, { useRef, useState } from 'react';

/**
 * SpotlightCard Component from React Bits
 * Illuminates card borders and surface with a subtle radial gradient tracking cursor position.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 111, 30, 0.12)', // Marker Orange glow
  borderColor = 'rgba(255, 111, 30, 0.35)',
  ...props
}) {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card relative rounded-[16px] border border-[var(--color-border)] bg-[var(--color-card-bg)] overflow-hidden p-8 transition-colors duration-300 ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle 320px at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[16px] opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          border: `1.5px solid ${borderColor}`,
          maskImage: `radial-gradient(circle 240px at ${position.x}px ${position.y}px, black, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle 240px at ${position.x}px ${position.y}px, black, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
