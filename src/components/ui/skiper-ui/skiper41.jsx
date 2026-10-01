import React from "react";

/**
 * Skiper41 - Optical Reading Falloff Mask (@skiper-ui/skiper41)
 * High-performance gradient mask for comfortable reading ergonomics with zero GPU blur lag.
 */
export function Skiper41({
  position = "top",
  height = "60px",
  className = "",
  style = {}
}) {
  const isTop = position === "top";

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 ${
        isTop ? "top-0" : "bottom-0"
      } z-20 select-none overflow-hidden ${className}`}
      style={{
        height,
        background: isTop
          ? "linear-gradient(to bottom, var(--color-bg) 0%, rgba(0,0,0,0) 100%)"
          : "linear-gradient(to top, var(--color-bg) 0%, rgba(0,0,0,0) 100%)",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export default Skiper41;
