import React, { useEffect, useRef, useState } from "react";
import { PenTool, Trash2, X, RotateCcw } from "lucide-react";

/**
 * Skiper59 - Drawing Cursor & Mobile Touch Canvas
 * 
 * Features:
 * - Fluid quadratic bezier trailing ink on mouse and mobile touch
 * - Doodle Mode: Double-click anywhere (or click floating pen button) to toggle persistent drawing mode
 * - Reset / Clear canvas functionality
 * - Non-intrusive pointer-events: none during standard navigation
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
  const persistentStrokesRef = useRef([]); // Stores finished doodle lines in Paint Mode
  const currentStrokeRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100, isDown: false });
  const animFrameRef = useRef(null);

  const [isDoodleMode, setIsDoodleMode] = useState(false);
  const [hasDoodles, setHasDoodles] = useState(false);

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

    const addPoint = (x, y) => {
      if (isDoodleMode) {
        if (mouseRef.current.isDown) {
          currentStrokeRef.current.push({ x, y, width: lineWidth * 1.2 });
          setHasDoodles(true);
        }
      } else {
        // Standard Glide Trail
        pointsRef.current.push({
          x,
          y,
          alpha: 1,
          width: lineWidth,
        });

        if (pointsRef.current.length > pointCount) {
          pointsRef.current.shift();
        }
      }
    };

    // Mouse events
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      addPoint(e.clientX, e.clientY);
    };

    const handleMouseDown = (e) => {
      if (e.button === 0) {
        mouseRef.current.isDown = true;
        currentStrokeRef.current = [{ x: e.clientX, y: e.clientY, width: lineWidth * 1.2 }];
      }
    };

    const handleMouseUp = () => {
      if (mouseRef.current.isDown && currentStrokeRef.current.length > 0) {
        persistentStrokesRef.current.push([...currentStrokeRef.current]);
        currentStrokeRef.current = [];
      }
      mouseRef.current.isDown = false;
    };

    // Mobile Touch events
    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouseRef.current.x = t.clientX;
        mouseRef.current.y = t.clientY;
        mouseRef.current.isDown = true;
        if (isDoodleMode) {
          currentStrokeRef.current = [{ x: t.clientX, y: t.clientY, width: lineWidth * 1.2 }];
          setHasDoodles(true);
        } else {
          addPoint(t.clientX, t.clientY);
        }
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouseRef.current.x = t.clientX;
        mouseRef.current.y = t.clientY;
        addPoint(t.clientX, t.clientY);
      }
    };

    const handleTouchEnd = () => {
      if (mouseRef.current.isDown && currentStrokeRef.current.length > 0) {
        persistentStrokesRef.current.push([...currentStrokeRef.current]);
        currentStrokeRef.current = [];
      }
      mouseRef.current.isDown = false;
    };

    // Double-click toggle doodle mode
    const handleDblClick = () => {
      setIsDoodleMode((prev) => !prev);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("dblclick", handleDblClick);

    // Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // 1. Draw Persistent Doodle Strokes
      if (persistentStrokesRef.current.length > 0) {
        ctx.strokeStyle = color;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = 0.95;

        for (const stroke of persistentStrokesRef.current) {
          if (stroke.length > 1) {
            ctx.beginPath();
            ctx.lineWidth = stroke[0].width || lineWidth;
            ctx.moveTo(stroke[0].x, stroke[0].y);
            for (let i = 1; i < stroke.length - 1; i++) {
              const xc = (stroke[i].x + stroke[i + 1].x) / 2;
              const yc = (stroke[i].y + stroke[i + 1].y) / 2;
              ctx.quadraticCurveTo(stroke[i].x, stroke[i].y, xc, yc);
            }
            ctx.lineTo(stroke[stroke.length - 1].x, stroke[stroke.length - 1].y);
            ctx.stroke();
          }
        }
      }

      // Draw Current Active Stroke in Doodle Mode
      if (currentStrokeRef.current.length > 1) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth * 1.2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = 1;
        ctx.beginPath();
        const stroke = currentStrokeRef.current;
        ctx.moveTo(stroke[0].x, stroke[0].y);
        for (let i = 1; i < stroke.length - 1; i++) {
          const xc = (stroke[i].x + stroke[i + 1].x) / 2;
          const yc = (stroke[i].y + stroke[i + 1].y) / 2;
          ctx.quadraticCurveTo(stroke[i].x, stroke[i].y, xc, yc);
        }
        ctx.lineTo(stroke[stroke.length - 1].x, stroke[stroke.length - 1].y);
        ctx.stroke();
      }

      // 2. Draw Transient Glide Trail (Trail Mode)
      if (!isDoodleMode) {
        const points = pointsRef.current;

        // Alpha decay
        for (let i = points.length - 1; i >= 0; i--) {
          points[i].alpha -= decaySpeed;
          if (points[i].alpha <= 0) {
            points.splice(i, 1);
          }
        }

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
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("dblclick", handleDblClick);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [color, lineWidth, pointCount, decaySpeed, isDoodleMode]);

  const clearCanvas = () => {
    persistentStrokesRef.current = [];
    currentStrokeRef.current = [];
    pointsRef.current = [];
    setHasDoodles(false);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-30 ${
          isDoodleMode ? "pointer-events-auto cursor-crosshair" : "pointer-events-none"
        } ${className}`}
        aria-hidden="true"
      />

      {/* Floating Doodle Controller Badge on Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50 select-none flex items-center gap-2">
        <button
          onClick={() => setIsDoodleMode((prev) => !prev)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-lg font-mono text-xs font-bold transition-all cursor-pointer ${
            isDoodleMode
              ? "bg-[var(--color-orange)] text-white border-[var(--color-orange)] shadow-[0_0_16px_rgba(255,111,30,0.4)]"
              : "bg-[var(--color-card-bg)] text-[var(--color-muted)] hover:text-[var(--color-text)] border-[var(--color-border)] hover:border-[var(--color-orange)]"
          }`}
          title="Toggle Doodle Paint Mode (or Double-Click screen)"
        >
          <PenTool size={12} className={isDoodleMode ? "animate-bounce" : ""} />
          <span className="hidden sm:inline">
            {isDoodleMode ? "Doodle Mode: ON" : "Draw"}
          </span>
        </button>

        {/* Clear Canvas Button if there are drawings */}
        {(isDoodleMode || hasDoodles) && (
          <button
            onClick={clearCanvas}
            className="p-1.5 rounded-full bg-[var(--color-card-bg)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-red-500 hover:border-red-500 transition-colors shadow-xs cursor-pointer"
            title="Clear Drawing"
            aria-label="Clear Canvas"
          >
            <RotateCcw size={12} />
          </button>
        )}
      </div>
    </>
  );
}

export default Skiper59;
