import React from 'react';

/**
 * Sticker Characters Component
 * Superr Reference: Flat illustrated characters in Sky Blue, Bubblegum Pink, Sprout Green
 * with 2px dark outlines, rotated 5-15° at random.
 */

export function LightningSticker({ rotation = 'rotate-[8deg]', className = '' }) {
  return (
    <div className={`inline-block select-none ${rotation} ${className}`}>
      <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
        <path
          d="M18 2 L4 22 H16 L12 40 L28 18 H16 L22 2 Z"
          fill="var(--color-sky-sticker, #3b82f6)"
          stroke="var(--color-charcoal, #171717)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function HeartEyesSticker({ rotation = 'rotate-[-10deg]', className = '' }) {
  return (
    <div className={`inline-block select-none ${rotation} ${className}`}>
      <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
        <path
          d="M20 33 C 20 33, 4 22, 4 12 C 4 6, 9 2, 14 2 C 18 2, 20 6, 20 6 C 20 6, 22 2, 26 2 C 31 2, 36 6, 36 12 C 36 22, 20 33, 20 33 Z"
          fill="var(--color-bubblegum-sticker, #ff66cf)"
          stroke="var(--color-charcoal, #171717)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Little eyes */}
        <circle cx="14" cy="12" r="2" fill="var(--color-charcoal, #171717)" />
        <circle cx="26" cy="12" r="2" fill="var(--color-charcoal, #171717)" />
      </svg>
    </div>
  );
}

export function BearSticker({ rotation = 'rotate-[12deg]', className = '' }) {
  return (
    <div className={`inline-block select-none ${rotation} ${className}`}>
      <svg width="42" height="38" viewBox="0 0 42 38" fill="none">
        {/* Ears */}
        <circle cx="10" cy="10" r="7" fill="var(--color-bubblegum-sticker, #ff66cf)" stroke="var(--color-charcoal, #171717)" strokeWidth="2" />
        <circle cx="32" cy="10" r="7" fill="var(--color-bubblegum-sticker, #ff66cf)" stroke="var(--color-charcoal, #171717)" strokeWidth="2" />
        {/* Head */}
        <circle cx="21" cy="22" r="14" fill="var(--color-dew-drop, #f7efe9)" stroke="var(--color-charcoal, #171717)" strokeWidth="2" />
        {/* Eyes & Snout */}
        <circle cx="16" cy="20" r="1.5" fill="var(--color-charcoal, #171717)" />
        <circle cx="26" cy="20" r="1.5" fill="var(--color-charcoal, #171717)" />
        <ellipse cx="21" cy="25" rx="3.5" ry="2.5" fill="var(--color-bubblegum-sticker, #ff66cf)" stroke="var(--color-charcoal, #171717)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function SproutSparkleSticker({ rotation = 'rotate-[-8deg]', className = '' }) {
  return (
    <div className={`inline-block select-none ${rotation} ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path
          d="M17 2 C 17 10, 24 17, 32 17 C 24 17, 17 24, 17 32 C 17 24, 10 17, 2 17 C 10 17, 17 10, 17 2 Z"
          fill="var(--color-sprout-sticker, #22c55e)"
          stroke="var(--color-charcoal, #171717)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
