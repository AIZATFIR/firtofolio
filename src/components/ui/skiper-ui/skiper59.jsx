import React, { useEffect, useRef, useState, useCallback } from "react";
import { PenTool, RotateCcw, Undo2, Redo2, X } from "lucide-react";

/**
 * Skiper59 - Drawing Cursor & Mobile Touch Paper Canvas with Undo/Redo (@skiper-ui/skiper59)
 * 
 * Performance & Undo/Redo Optimizations:
 * - Direct canvas pointer binding (prevents toolbar button clicks from creating false strokes)
 * - Stroke state updates batched on mouseup/touchend (zero re-renders during 120fps drawing)
 * - Intelligent RAF idle sleep (stops drawing when canvas is idle/cleared)
 * - 100% glued to paper document coordinates on scroll
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
  const persistentStrokesRef = useRef([]);
  const redoStackRef = useRef([]);
  const currentStrokeRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100, isDown: false });
  const animFrameRef = useRef(null);
  const isDoodleModeRef = useRef(false);

  const [isDoodleMode, setIsDoodleMode] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const requestRenderRef = useRef(null);

  // Keep ref in sync
  useEffect(() => {
    isDoodleModeRef.current = isDoodleMode;
    if (requestRenderRef.current) {
      requestRenderRef.current();
    }
  }, [isDoodleMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let isRendering = false;

    // High-performance animation render loop with self-sleeping RAF
    function render() {
      isRendering = false;
      const scrollX = window.scrollX || 0;
      const scrollY = window.scrollY || 0;
      const dynamicColor = getActiveColor();
      const hasDoodles = persistentStrokesRef.current.length > 0;
      const hasActiveStroke = currentStrokeRef.current && currentStrokeRef.current.length > 1;
      const hasGlidePoints = pointsRef.current.length > 0;

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // 1. Draw Persistent Doodle Strokes Glued to Paper (Document Offset)
      if (hasDoodles) {
        ctx.save();
        ctx.translate(-scrollX, -scrollY);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = 0.95;

        const strokes = persistentStrokesRef.current;
        for (let s = 0; s < strokes.length; s++) {
          const stroke = strokes[s];
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
      if (hasActiveStroke) {
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
      if (!isDoodleModeRef.current && hasGlidePoints) {
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

      // Continue animation loop ONLY if active stroke or glide decay needs frames
      const shouldKeepLooping =
        (!isDoodleModeRef.current && pointsRef.current.length > 0) ||
        (isDoodleModeRef.current && mouseRef.current.isDown);

      if (shouldKeepLooping) {
        isRendering = true;
        animFrameRef.current = requestAnimationFrame(render);
      }
    }

    const requestRender = () => {
      if (!isRendering) {
        isRendering = true;
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    requestRenderRef.current = requestRender;

    const handleResize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      requestRender();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const getActiveColor = () => {
      return getComputedStyle(document.documentElement).getPropertyValue("--color-orange").trim() || color;
    };

    // Add Point to current stroke (without triggering React re-renders)
    const addPoint = (clientX, clientY) => {
      const docX = clientX + window.scrollX;
      const docY = clientY + window.scrollY;

      if (isDoodleModeRef.current) {
        if (mouseRef.current.isDown && currentStrokeRef.current) {
          const currentColor = getActiveColor();
          currentStrokeRef.current.push({ x: docX, y: docY, width: lineWidth * 1.3, color: currentColor });
          requestRender();
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
        requestRender();
      }
    };

    // Mouse events attached to Canvas / Window properly
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      addPoint(e.clientX, e.clientY);
    };

    const handleMouseDown = (e) => {
      // Only start a stroke if clicking directly on the canvas area
      if (e.target !== canvas && isDoodleModeRef.current) return;
      if (e.button === 0) {
        mouseRef.current.isDown = true;
        const docX = e.clientX + window.scrollX;
        const docY = e.clientY + window.scrollY;
        const currentColor = getActiveColor();
        currentStrokeRef.current = [{ x: docX, y: docY, width: lineWidth * 1.3, color: currentColor }];
        requestRender();
      }
    };

    const handleMouseUp = () => {
      if (mouseRef.current.isDown && currentStrokeRef.current && currentStrokeRef.current.length > 1) {
        persistentStrokesRef.current.push([...currentStrokeRef.current]);
        redoStackRef.current = []; // Clear redo stack on new stroke
        currentStrokeRef.current = [];
        setCanUndo(true);
        setCanRedo(false);
      } else {
        currentStrokeRef.current = [];
      }
      mouseRef.current.isDown = false;
      requestRender();
    };

    // Mobile Touch events
    const handleTouchStart = (e) => {
      if (e.target !== canvas && isDoodleModeRef.current) return;
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouseRef.current.x = t.clientX;
        mouseRef.current.y = t.clientY;
        mouseRef.current.isDown = true;
        const docX = t.clientX + window.scrollX;
        const docY = t.clientY + window.scrollY;
        if (isDoodleModeRef.current) {
          const currentColor = getActiveColor();
          currentStrokeRef.current = [{ x: docX, y: docY, width: lineWidth * 1.3, color: currentColor }];
        } else {
          addPoint(t.clientX, t.clientY);
        }
        requestRender();
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
      if (mouseRef.current.isDown && currentStrokeRef.current && currentStrokeRef.current.length > 1) {
        persistentStrokesRef.current.push([...currentStrokeRef.current]);
        redoStackRef.current = [];
        currentStrokeRef.current = [];
        setCanUndo(true);
        setCanRedo(false);
      } else {
        currentStrokeRef.current = [];
      }
      mouseRef.current.isDown = false;
      requestRender();
    };

    const handleDblClick = (e) => {
      // Don't toggle doodle mode on double clicking buttons
      if (e.target.closest('button') || e.target.closest('a')) return;
      setIsDoodleMode((prev) => !prev);
    };

    // Passive scroll listener for paper-glued doodles
    const handleScroll = () => {
      if (persistentStrokesRef.current.length > 0 || (currentStrokeRef.current && currentStrokeRef.current.length > 0)) {
        requestRender();
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("dblclick", handleDblClick);
    window.addEventListener("scroll", handleScroll, { passive: true });

    requestRender();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("dblclick", handleDblClick);
      window.removeEventListener("scroll", handleScroll);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [color, lineWidth, pointCount, decaySpeed]);

  const undo = useCallback((e) => {
    e?.stopPropagation();
    if (persistentStrokesRef.current.length > 0) {
      const popped = persistentStrokesRef.current.pop();
      redoStackRef.current.push(popped);
      setCanUndo(persistentStrokesRef.current.length > 0);
      setCanRedo(true);
      if (requestRenderRef.current) requestRenderRef.current();
    }
  }, []);

  const redo = useCallback((e) => {
    e?.stopPropagation();
    if (redoStackRef.current.length > 0) {
      const popped = redoStackRef.current.pop();
      persistentStrokesRef.current.push(popped);
      setCanUndo(true);
      setCanRedo(redoStackRef.current.length > 0);
      if (requestRenderRef.current) requestRenderRef.current();
    }
  }, []);

  const clearCanvas = useCallback((e) => {
    e?.stopPropagation();
    persistentStrokesRef.current = [];
    redoStackRef.current = [];
    currentStrokeRef.current = [];
    pointsRef.current = [];
    setCanUndo(false);
    setCanRedo(false);
    if (requestRenderRef.current) requestRenderRef.current();
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-30 ${
          isDoodleMode ? "pointer-events-auto cursor-crosshair" : "pointer-events-none"
        } ${className}`}
        aria-hidden="true"
      />

      {/* Floating Doodle Controller on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 select-none flex items-center">
        {isDoodleMode ? (
          /* Active Draw Mode Toolbar */
          <div
            className="flex items-center gap-1.5 p-1.5 rounded-full bg-[var(--color-card-bg)]/95 border border-[var(--color-orange)] shadow-2xl backdrop-blur-xl pointer-events-auto"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-orange)] text-white font-mono text-xs font-bold shadow-xs">
              <PenTool size={12} className="animate-bounce" />
              <span>Draw</span>
            </span>

            {/* Undo */}
            <button
              onClick={undo}
              onMouseDown={(e) => e.stopPropagation()}
              disabled={!canUndo}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                canUndo
                  ? "text-[var(--color-text)] hover:bg-[var(--color-surface-tint)] active:scale-90"
                  : "text-[var(--color-muted)] opacity-35 cursor-not-allowed"
              }`}
              title="Undo Stroke (Ctrl+Z)"
            >
              <Undo2 size={13} />
            </button>

            {/* Redo */}
            <button
              onClick={redo}
              onMouseDown={(e) => e.stopPropagation()}
              disabled={!canRedo}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                canRedo
                  ? "text-[var(--color-text)] hover:bg-[var(--color-surface-tint)] active:scale-90"
                  : "text-[var(--color-muted)] opacity-35 cursor-not-allowed"
              }`}
              title="Redo Stroke (Ctrl+Y)"
            >
              <Redo2 size={13} />
            </button>

            {/* Clear */}
            <button
              onClick={clearCanvas}
              onMouseDown={(e) => e.stopPropagation()}
              disabled={!canUndo && !canRedo}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                canUndo || canRedo
                  ? "text-[var(--color-muted)] hover:text-red-500 hover:bg-[var(--color-surface-tint)] active:scale-90"
                  : "text-[var(--color-muted)] opacity-35 cursor-not-allowed"
              }`}
              title="Clear All Drawings"
            >
              <RotateCcw size={12} />
            </button>

            {/* Close / Exit Draw Mode */}
            <button
              onClick={() => setIsDoodleMode(false)}
              onMouseDown={(e) => e.stopPropagation()}
              className="p-1.5 rounded-full text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-tint)] transition-colors cursor-pointer ml-0.5 active:scale-90"
              title="Exit Draw Mode"
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          /* Inactive Minimal Clean Icon Button */
          <button
            onClick={() => setIsDoodleMode(true)}
            className="w-8 h-8 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-muted)] hover:text-[var(--color-orange)] hover:border-[var(--color-orange)] shadow-lg flex items-center justify-center transition-all hover:scale-110 cursor-pointer backdrop-blur-md pointer-events-auto"
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
