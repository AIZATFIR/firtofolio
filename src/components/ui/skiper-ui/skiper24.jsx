import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";

export const ACCENT_PALETTES = [
  { id: "amber", name: "Amber Flame", color: "#ff6f1e", glow: "rgba(255, 111, 30, 0.4)" },
  { id: "cyan", name: "Electric Cyan", color: "#00d2ff", glow: "rgba(0, 210, 255, 0.4)" },
  { id: "emerald", name: "Emerald Mint", color: "#10b981", glow: "rgba(16, 185, 129, 0.4)" },
  { id: "violet", name: "Cyber Violet", color: "#a855f7", glow: "rgba(168, 85, 247, 0.4)" },
  { id: "crimson", name: "Crimson Rose", color: "#f43f5e", glow: "rgba(244, 63, 94, 0.4)" },
  { id: "gold", name: "Solar Gold", color: "#eab308", glow: "rgba(234, 179, 8, 0.4)" },
  { id: "lime", name: "Neon Lime", color: "#84cc16", glow: "rgba(132, 204, 22, 0.4)" },
  { id: "indigo", name: "Deep Indigo", color: "#6366f1", glow: "rgba(99, 102, 241, 0.4)" },
  { id: "coral", name: "Coral Peach", color: "#fb7185", glow: "rgba(251, 113, 133, 0.4)" },
];

/**
 * Skiper24 - Dynamic Accent Color Palette Switcher (@skiper-ui/skiper24)
 */
export function Skiper24({ className = "" }) {
  const [selectedId, setSelectedId] = useState("amber");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("zafir-accent-color") || "amber";
    const found = ACCENT_PALETTES.find((p) => p.id === saved) || ACCENT_PALETTES[0];
    applyPalette(found);
  }, []);

  const applyPalette = (palette) => {
    setSelectedId(palette.id);
    document.documentElement.style.setProperty("--color-orange", palette.color);
    document.documentElement.style.setProperty("--color-orange-glow", palette.glow);
    localStorage.setItem("zafir-accent-color", palette.id);
  };

  const currentPalette = ACCENT_PALETTES.find((p) => p.id === selectedId) || ACCENT_PALETTES[0];

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex items-center justify-center w-7 h-7 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)] shadow-xs transition-colors cursor-pointer select-none"
        title="Change Accent Theme Palette (@skiper-ui/skiper24)"
        aria-label="Palette Picker"
      >
        <span
          className="w-3.5 h-3.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: currentPalette.color,
            boxShadow: `0 0 10px ${currentPalette.color}`,
          }}
        />
      </motion.button>

      {/* Palette Pop-over Swatches */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 6 }}
              transition={{ type: "spring", damping: 24, stiffness: 380 }}
              className="absolute right-0 top-full mt-2.5 z-50 p-2.5 rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-2xl flex items-center gap-1.5 backdrop-blur-2xl"
            >
              {ACCENT_PALETTES.map((p) => {
                const isSelected = selectedId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      applyPalette(p);
                      setIsOpen(false);
                    }}
                    className="relative w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-125 cursor-pointer shadow-xs"
                    style={{ backgroundColor: p.color }}
                    title={p.name}
                  >
                    {isSelected && <Check size={12} className="text-white drop-shadow-md stroke-[3]" />}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Skiper24;
