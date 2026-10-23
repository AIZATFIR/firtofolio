import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Global SmoothScrollProvider
 * Provides luxurious, velvety smooth inertia scrolling with Lenis.
 */
export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = 'smooth';
      return undefined;
    }

    // Weighted, velvety smooth inertia scroll
    const lenis = new Lenis({
      duration: 1.6, // Weighted, deliberate deceleration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious glide
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Resize observer to ensure Lenis always tracks page dimensions accurately
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
