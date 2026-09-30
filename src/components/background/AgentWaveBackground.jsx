import React, { useRef, useEffect } from 'react';

/**
 * AgentWaveBackground Component
 * Custom generative flowing vector wave system on Cream Paper canvas.
 * Optimized with IntersectionObserver to sleep when out of viewport.
 */
export default function AgentWaveBackground({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId;
    let isVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // IntersectionObserver to pause loop when scrolled past Hero
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationId) {
          animationId = requestAnimationFrame(draw);
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(canvas);

    let step = 0;
    const lines = [
      { color: 'rgba(43, 26, 7, 0.08)', speed: 0.008, amplitude: 60, frequency: 0.002, offset: 0 },
      { color: 'rgba(255, 111, 30, 0.12)', speed: 0.012, amplitude: 85, frequency: 0.003, offset: Math.PI / 4 },
      { color: 'rgba(23, 23, 23, 0.06)', speed: 0.006, amplitude: 50, frequency: 0.0015, offset: Math.PI / 2 },
      { color: 'rgba(255, 111, 30, 0.07)', speed: 0.01, amplitude: 70, frequency: 0.0025, offset: Math.PI },
      { color: 'rgba(59, 130, 246, 0.05)', speed: 0.007, amplitude: 45, frequency: 0.002, offset: Math.PI * 1.5 },
    ];

    const draw = () => {
      if (!isVisible) {
        animationId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const mouseInfluence = (mouse.y - height / 2) * 0.15;
      step++;

      for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = index === 1 ? 2 : 1.2;

        const baseHeight = height * 0.55 + Math.sin(step * line.speed + line.offset) * 20 + mouseInfluence * (index * 0.2);

        for (let x = 0; x <= width; x += 18) {
          const dx = x - mouse.x;
          const dy = baseHeight - mouse.y;
          const dist = Math.hypot(dx, dy);
          const mouseDistort = Math.max(0, 1 - dist / 300) * 35;

          const y =
            baseHeight +
            Math.sin(x * line.frequency + step * line.speed + line.offset) * line.amplitude +
            Math.cos(x * 0.001 + step * line.speed * 0.5) * (line.amplitude * 0.5) +
            mouseDistort;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 select-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
