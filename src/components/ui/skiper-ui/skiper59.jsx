import React, { useEffect, useRef, useState } from "react";
import { PenTool, RotateCcw, Undo2, Redo2, X } from "lucide-react";

/**
 * Skiper59 - Drawing Cursor & Mobile Touch Paper Canvas with Undo/Redo (@skiper-ui/skiper59)
 * Features:
 * - Persistent ink glued 1:1 to paper document coordinates on scroll
 * - Undo / Redo / Clear / Exit mini toolbar
 * - Super-minimal floating pen icon when idle (no distracting text)
 * - Dynamic color synchronization with active palette token
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
  const redoStackRef = useRef([]); // Undo/Redo history stack
  const currentStrokeRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100, isDown: false });
  const animFrameRef = useRef(null);

  const [isDoodleMode, setIsDoodleMode] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

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

    const getActiveColor = () => {
      return getComputedStyle(document.documentElement).getPropertyValue("--color-orange").trim() || color;
    };

    const addPoint = (clientX, clientY) => {
      const docX = clientX + window.scrollX;
      const docY = clientY + window.scrollY;

      if (isDoodleMode) {
        if (mouseRef.current.isDown) {
          const currentColor = getActiveColor();
          currentStrokeRef.current.push({ x: docX, y: docY, width: lineWidth * 1.3, color: currentColor });
          setCanUndo(true);
        }
      } else {
        // Standard Glide Trail (Transient viewport ink)
        pointsRef.current.push({
          x: clientX,
          y: clientY,
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
        const docX = e.clientX + window.scrollX;
        const docY = e.clientY + window.scrollY;
        const currentColor = getActiveColor();
        currentStrokeRef.current = [{ x: docX, y: docY, width: lineWidth * 1.3, color: currentColor }];
      }
    };

    const handleMouseUp = () => {
      if (mouseRef.current.isDown && currentStrokeRef.current.length > 0) {
        persistentStrokesRef.current.push([...currentStrokeRef.current]);
        redoStackRef.current = []; // Clear redo on new stroke
        currentStrokeRef.current = [];
        setCanUndo(true);
        setCanRedo(false);
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
        const docX = t.clientX + window.scrollX;
        const docY = t.clientY + window.scrollY;
        if (isDoodleMode) {
          const currentColor = getActiveColor();
          currentStrokeRef.current = [{ x: docX, y: docY, width: lineWidth * 1.3, color: currentColor }];
          setCanUndo(true);
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
        redoStackRef.current = [];
        currentStrokeRef.current = [];
        setCanUndo(true);
        setCanRedo(false);
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

      const scrollX = window.scrollX || 0;
      const scrollY = window.scrollY || 0;
      const dynamicColor = getActiveColor();

      // 1. Draw Persistent Doodle Strokes Glued to Paper (Document Offset)
      if (persistentStrokesRef.current.length > 0) {
        ctx.save();
        ctx.translate(-scrollX, -scrollY);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = 0.95;

        for (const stroke of persistentStrokesRef.current) {
          if (stroke.length > 1) {
            ctx.beginPath();
            ctx.strokeStyle = stroke[0].color || dynamicColor;
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
        ctx.restore();
      }

      // Draw Current Active Stroke in Doodle Mode (Document Offset)
      if (currentStrokeRef.current.length > 1) {
        ctx.save();
        ctx.translate(-scrollX, -scrollY);
        ctx.strokeStyle = dynamicColor;
        ctx.lineWidth = lineWidth * 1.3;
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
        ctx.restore();
      }

      // 2. Draw Transient Glide Trail (Trail Mode in Viewport Coordinates)
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

            ctx.strokeStyle = dynamicColor;
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

  const undo = () => {
    if (persistentStrokesRef.current.length > 0) {
      const popped = persistentStrokesRef.current.pop();
      redoStackRef.current.push(popped);
      setCanUndo(persistentStrokesRef.current.length > 0);
      setCanRedo(true);
    }
  };

  const redo = () => {
    if (redoStackRef.current.length > 0) {
      const popped = redoStackRef.current.pop();
      persistentStrokesRef.current.push(popped);
      setCanUndo(true);
      setCanRedo(redoStackRef.current.length > 0);
    }
  };

  const clearCanvas = () => {
    persistentStrokesRef.current = [];
    redoStackRef.current = [];
    currentStrokeRef.current = [];
    pointsRef.current = [];
    setCanUndo(false);
    setCanRedo(false);
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

      {/* Floating Doodle Controller on Bottom Right for Clean Ergonomics */}
      <div className="fixed bottom-6 right-6 z-50 select-none flex items-center">
        {isDoodleMode ? (
          /* Active Draw Mode Toolbar */
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[var(--color-card-bg)]/95 border border-[var(--color-orange)] shadow-2xl backdrop-blur-xl">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-orange)] text-white font-mono text-xs font-bold shadow-xs">
              <PenTool size={12} className="animate-bounce" />
              <span>Draw</span>
            </span>

            {/* Undo */}
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                canUndo
                  ? "text-[var(--color-text)] hover:bg-[var(--color-surface-tint)]"
                  : "text-[var(--color-muted)] opacity-40 cursor-not-allowed"
              }`}
              title="Undo Stroke"
            >
              <Undo2 size={13} />
            </button>

            {/* Redo */}
            <button
              onClick={redo}
              disabled={!canRedo}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                canRedo
                  ? "text-[var(--color-text)] hover:bg-[var(--color-surface-tint)]"
                  : "text-[var(--color-muted)] opacity-40 cursor-not-allowed"
              }`}
              title="Redo Stroke"
            >
              <Redo2 size={13} />
            </button>

            {/* Clear */}
            <button
              onClick={clearCanvas}
              disabled={!canUndo && !canRedo}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                canUndo || canRedo
                  ? "text-[var(--color-muted)] hover:text-red-500 hover:bg-[var(--color-surface-tint)]"
                  : "text-[var(--color-muted)] opacity-40 cursor-not-allowed"
              }`}
              title="Clear Canvas"
            >
              <RotateCcw size={12} />
            </button>

            {/* Close / Exit Draw Mode */}
            <button
              onClick={() => setIsDoodleMode(false)}
              className="p-1.5 rounded-full text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-tint)] transition-colors cursor-pointer ml-0.5"
              title="Exit Draw Mode"
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          /* Inactive Minimal Clean Icon Button (No distracting text) */
          <button
            onClick={() => setIsDoodleMode(true)}
            className="w-8 h-8 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-muted)] hover:text-[var(--color-orange)] hover:border-[var(--color-orange)] shadow-lg flex items-center justify-center transition-all hover:scale-110 cursor-pointer backdrop-blur-md"
            title="Draw on page (or double-click screen)"
            aria-label="Toggle Draw Mode"
          >
            <PenTool size={13} />
          </button>
        )}
      </div>
    </>
  );
}

export default Skiper59;
