import React, { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Global SmoothScrollProvider
 * Provides weighted, inertial, cinematic 60fps smooth scrolling with Lenis.
 */
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    // Initialize heavy, cinematic Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.8, // heavier, slower, more intentional
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -9 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85, // prevents jarring jumps
      touchMultiplier: 1.2,
      infinite: false,
    });

    // RequestAnimationFrame Loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global Lenis expose
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
