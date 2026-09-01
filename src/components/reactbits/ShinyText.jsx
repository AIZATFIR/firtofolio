import React from 'react';

/**
 * ShinyText Component from React Bits
 * Sweeps a subtle linear specular highlight across typography.
 */
export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = '',
}) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`shiny-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(23,23,23,0.85) 0%, rgba(23,23,23,0.85) 40%, #ff6f1e 50%, rgba(23,23,23,0.85) 60%, rgba(23,23,23,0.85) 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        display: 'inline-block',
        animationDuration,
      }}
    >
      {text}
    </span>
  );
}
