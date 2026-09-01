import React, { useRef, useEffect } from 'react';

/**
 * VariableProximity Component from React Bits
 * Interpolates font weight, scale, and letter-spacing based on cursor proximity.
 */
export default function VariableProximity({
  label,
  fromFontVariationSettings = "'wght' 300, 'opsz' 9",
  toFontVariationSettings = "'wght' 900, 'opsz' 40",
  containerRef,
  radius = 120,
  falloff = 'gaussian', // 'linear', 'exponential', 'gaussian'
  className = '',
  onClick,
  style,
  ...props
}) {
  const letterRefs = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      letterRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;

        const distance = Math.hypot(e.clientX - letterCenterX, e.clientY - letterCenterY);

        if (distance < radius) {
          let progress = 1 - distance / radius;
          if (falloff === 'exponential') progress = Math.pow(progress, 2);
          if (falloff === 'gaussian') progress = Math.exp(-Math.pow(distance / (radius / 2), 2));

          const weight = 300 + progress * 600;
          el.style.fontWeight = `${Math.round(weight)}`;
          el.style.transform = `scale(${1 + progress * 0.12}) translateY(${-progress * 4}px)`;
          el.style.color = progress > 0.4 ? 'var(--color-orange, #ff6f1e)' : '';
        } else {
          el.style.fontWeight = '';
          el.style.transform = '';
          el.style.color = '';
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [radius, falloff]);

  const words = label.split(' ');

  return (
    <span className={`variable-proximity-container inline-flex flex-wrap gap-x-[0.28em] ${className}`} style={style} onClick={onClick} {...props}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => {
            const index = words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) + charIndex;
            return (
              <span
                key={charIndex}
                ref={(el) => (letterRefs.current[index] = el)}
                className="inline-block transition-transform duration-100 ease-out select-none will-change-transform"
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
