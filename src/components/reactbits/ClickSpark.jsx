import React, { useRef, useEffect } from 'react';

/**
 * ClickSpark Component from React Bits
 * Canvas-based particle spark bursting from click coordinates.
 */
export default function ClickSpark({
  sparkColor = '#ff6f1e', // Marker Orange
  sparkSize = 12,
  sparkRadius = 24,
  sparkCount = 8,
  duration = 450,
  extraScale = 1.3,
  children,
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = time - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        const currentDistance = spark.distance * ease * extraScale;
        const currentSize = spark.size * (1 - progress);

        const x = spark.x + Math.cos(spark.angle) * currentDistance;
        const y = spark.y + Math.sin(spark.angle) * currentDistance;

        ctx.save();
        ctx.fillStyle = spark.color;
        ctx.globalAlpha = 1 - progress;
        ctx.beginPath();
        ctx.arc(x, y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    const handleClick = (e) => {
      const startTime = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          angle,
          distance: sparkRadius + Math.random() * 16,
          size: (sparkSize / 2) + Math.random() * 3,
          color: sparkColor,
          startTime,
        });
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleClick);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, extraScale]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 select-none"
        style={{ width: '100vw', height: '100vh' }}
      />
      {children}
    </>
  );
}
