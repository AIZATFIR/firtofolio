/**
 * Scroll Reveal & Slow Fade-Up Engine
 * Triggers graceful, unhurried bottom-up reveal animations as elements enter the viewport.
 */

export function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px', // Triggers when element is slightly above the bottom viewport edge
    threshold: 0.08
  };

  const revealElements = document.querySelectorAll('.reveal-slow, .reveal-cascade');

  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Unobserve once revealed for peak performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}
