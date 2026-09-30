import React, { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Global SmoothScrollProvider
 * Provides ultra-smooth, lightweight 60-120fps responsive scrolling with Lenis.
 */
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    // Highly responsive, non-sluggish Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.0, // snappy, natural tactile response
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.1,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
