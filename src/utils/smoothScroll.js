/**
 * Heavy Weighted Smooth Inertia Scrolling Engine (Lenis)
 * Tuned specifically for a tactile, weighted, 'velvety resistance' scroll feel.
 */
import Lenis from 'lenis';

let lenisInstance = null;

export function initSmoothScroll() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'smooth';
    return null;
  }

  lenisInstance = new Lenis({
    duration: 1.6, // Weighted, deliberate deceleration
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious exponential glide
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.85, // Adds subtle resistance to mouse wheel
    touchMultiplier: 1.2,
    infinite: false
  });

  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Expose global scrollTo helper
  window.scrollToSection = (targetSelector) => {
    const target = document.querySelector(targetSelector);
    if (target && lenisInstance) {
      lenisInstance.scrollTo(target, {
        offset: -40,
        duration: 2.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}
