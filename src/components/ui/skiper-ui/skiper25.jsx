import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";

/**
 * Skiper25 - Interactive Music Toggle Button with Animated Waveform
 * Inspired by Skiper UI @skiper-ui/skiper25
 */
export function Skiper25({
  audioSrc = "/audio/lyn-no-more-what-ifs.mp3",
  trackTitle = "Lyn - No More What Ifs",
  className = "",
  showTitle = true,
  autoPlay = false
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
    };
  }, [audioSrc]);

  // Smooth Volume Fade In / Out
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    if (isPlaying) {
      // Fade out and pause
      let vol = audio.volume;
      fadeIntervalRef.current = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.08;
          audio.volume = Math.max(0, vol);
        } else {
          clearInterval(fadeIntervalRef.current);
          audio.pause();
          audio.volume = 0.45;
          setIsPlaying(false);
        }
      }, 40);
    } else {
      // Start with low volume and fade in
      audio.volume = 0.05;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            let vol = 0.05;
            fadeIntervalRef.current = setInterval(() => {
              if (vol < 0.45) {
                vol += 0.06;
                audio.volume = Math.min(0.45, vol);
              } else {
                clearInterval(fadeIntervalRef.current);
                audio.volume = 0.45;
              }
            }, 40);
          })
          .catch((err) => {
            console.warn("Audio playback prevented by browser autoplay policy:", err);
          });
      }
    }
  };

  const barVariants = [
    { playing: [4, 16, 6, 14, 4], duration: 0.55 },
    { playing: [14, 6, 18, 8, 12], duration: 0.45 },
    { playing: [6, 18, 8, 16, 6], duration: 0.6 },
    { playing: [16, 8, 14, 4, 14], duration: 0.48 },
  ];

  return (
    <div
      className={`relative inline-flex items-center gap-2 select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        onClick={togglePlay}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.03 }}
        className={`flex items-center gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-full border transition-all duration-300 shadow-xs cursor-pointer font-mono text-xs font-semibold ${
          isPlaying
            ? "bg-[var(--color-surface-tint)] border-[var(--color-orange)] text-[var(--color-headline)] shadow-[0_0_12px_rgba(255,111,30,0.15)]"
            : "bg-[var(--color-card-bg)] border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-orange)]"
        }`}
        title={isPlaying ? "Pause Music" : "Play Theme Song"}
        aria-label={isPlaying ? "Pause Music" : "Play Theme Song"}
      >
        {/* Animated Equalizer Waveform Bars */}
        <div className="flex items-center gap-[2.5px] h-4 w-4 justify-center overflow-hidden">
          {barVariants.map((v, i) => (
            <motion.span
              key={i}
              className={`w-[2.5px] rounded-full transition-colors ${
                isPlaying ? "bg-[var(--color-orange)]" : "bg-[var(--color-muted)] opacity-60"
              }`}
              animate={
                isPlaying
                  ? {
                      height: v.playing,
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: v.duration,
                        ease: "easeInOut",
                      },
                    }
                  : { height: 3 }
              }
              style={{ minHeight: 3 }}
            />
          ))}
        </div>

        {/* Action Label / Track Name Pill */}
        <span className="hidden sm:inline-block font-mono text-[11px] tracking-tight">
          {isPlaying ? "BGM ON" : "BGM"}
        </span>
      </motion.button>

      {/* Floating Track Info Tooltip on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap px-3 py-1.5 rounded-lg bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-xl flex items-center gap-2 pointer-events-none"
          >
            <Music size={12} className="text-[var(--color-orange)] animate-pulse" />
            <span className="font-mono text-[11px] font-medium text-[var(--color-text)]">
              {trackTitle}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Skiper25;
