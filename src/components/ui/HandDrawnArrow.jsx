import React from 'react';

/**
 * HandDrawnArrow Component
 * Superr Style Reference: Thin 1.5px Charcoal stroke curved arrow connecting
 * handwritten Marker Orange script captions to labeled objects.
 */
export default function HandDrawnArrow({
  direction = 'down-right', // 'down-right', 'down-left', 'up-right', 'curled'
  className = '',
}) {
  return (
    <svg
      width="64"
      height="48"
      viewBox="0 0 64 48"
      fill="none"
      className={`hand-drawn-arrow pointer-events-none select-none ${className}`}
    >
      {direction === 'down-right' && (
        <path
          d="M8 8 C 24 6, 44 14, 48 36 M 38 32 L 49 38 L 54 28"
          stroke="var(--color-charcoal, #171717)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {direction === 'down-left' && (
        <path
          d="M56 8 C 40 6, 20 14, 16 36 M 26 32 L 15 38 L 10 28"
          stroke="var(--color-charcoal, #171717)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {direction === 'curled' && (
        <path
          d="M10 12 C 35 4, 52 20, 36 34 C 28 40, 20 32, 28 24 C 36 16, 50 28, 54 40 M 46 36 L 55 42 L 58 32"
          stroke="var(--color-charcoal, #171717)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
