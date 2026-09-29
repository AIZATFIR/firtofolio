import React, { useEffect, useRef } from "react";

/**
 * Skiper59 - Drawing Cursor Effect
 * 
 * Creates a fluid, aesthetic trailing ink/drawing line behind the mouse cursor on HTML5 Canvas.
 * - Hardware accelerated with requestAnimationFrame
 * - Quadratic bezier spline smoothing
 * - Natural alpha/lifetime decay
 * - Non-intrusive pointer-events: none layer
 */
export function Skiper59({
  color = "#ff6f1e",
  lineWidth = 2.5,
  pointCount = 28,
  decaySpeed = 0.045,
  className = ""
}) {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100, isMoving: false });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const handleResize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isMoving: true,
      };

      // Add new point to trail
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 1,
        width: lineWidth,
      });

      if (pointsRef.current.length > pointCount) {
        pointsRef.current.shift();
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isMoving = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    // Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const points = pointsRef.current;

      // Update alpha decay
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].alpha -= decaySpeed;
        if (points[i].alpha <= 0) {
          points.splice(i, 1);
        }
      }

      // Draw smooth connected spline
      if (points.length > 2) {
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;

          ctx.beginPath();
          ctx.moveTo(points[i - 1].x, points[i - 1].y);
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);

          ctx.strokeStyle = color;
          ctx.globalAlpha = Math.max(0, points[i].alpha);
          ctx.lineWidth = points[i].width * (points[i].alpha * 0.8 + 0.2);
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }
      } else if (points.length === 2) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.strokeStyle = color;
        ctx.globalAlpha = Math.max(0, points[0].alpha);
        ctx.lineWidth = points[0].width;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [color, lineWidth, pointCount, decaySpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-30 ${className}`}
      aria-hidden="true"
    />
  );
}

export default Skiper59;
