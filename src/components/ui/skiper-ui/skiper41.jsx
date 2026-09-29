import React from "react";

/**
 * Skiper41 - Multi-layer Progressive Blur Overlay
 * Creates authentic optical falloff for smooth reading ergonomics
 */
export function Skiper41({
  position = "top",
  height = "90px",
  className = "",
  style = {}
}) {
  const isTop = position === "top";

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${
        isTop ? "top-0" : "bottom-0"
      } z-20 select-none overflow-hidden ${className}`}
      style={{
        height,
        maskImage: isTop
          ? "linear-gradient(to bottom, black 25%, transparent 100%)"
          : "linear-gradient(to top, black 25%, transparent 100%)",
        WebkitMaskImage: isTop
          ? "linear-gradient(to bottom, black 25%, transparent 100%)"
          : "linear-gradient(to top, black 25%, transparent 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export default Skiper41;
