import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Music, ListMusic, Volume2 } from "lucide-react";
import { ARCH_PLAYLIST } from "../../../data/playlistData";

/**
 * Skiper25 - Interactive Arch BGM Music Player & Toggle
 * 
 * Supports the entire Arch Bgm collection (27 tracks) with:
 * - Animated Equalizer waveform
 * - Next / Prev track navigation & auto-advance
 * - Expandable Arch Bgm playlist selector drawer/popover
 * - Smooth volume fade in/out
 */
export function Skiper25({
  playlist = ARCH_PLAYLIST,
  className = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  const currentTrack = playlist[currentIndex] || playlist[0];

  // Initialize and load track
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.src);
      audioRef.current.volume = 0.45;
    } else {
      const wasPlaying = isPlaying;
      audioRef.current.src = currentTrack.src;
      if (wasPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }

    const handleEnded = () => {
      // Auto advance to next song
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    };

    const audio = audioRef.current;
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, playlist]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Smooth Volume Fade In / Out Toggle
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
      }, 35);
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
            }, 35);
          })
          .catch((err) => {
            console.warn("Audio playback prevented:", err);
          });
      }
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    if (!isPlaying) {
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current?.play().catch(() => {});
      }, 50);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    if (!isPlaying) {
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current?.play().catch(() => {});
      }, 50);
    }
  };

  const selectTrack = (idx) => {
    setCurrentIndex(idx);
    setShowPlaylistModal(false);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 50);
  };

  const barVariants = [
    { playing: [4, 16, 6, 14, 4], duration: 0.55 },
    { playing: [14, 6, 18, 8, 12], duration: 0.45 },
    { playing: [6, 18, 8, 16, 6], duration: 0.6 },
    { playing: [16, 8, 14, 4, 14], duration: 0.48 },
  ];

  return (
    <div
      className={`relative inline-flex items-center gap-1 select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Music Pill Button */}
      <div className="flex items-center bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-full p-0.5 shadow-xs transition-colors duration-300">
        {/* Play/Pause Main Trigger */}
        <motion.button
          onClick={togglePlay}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer font-mono text-xs font-semibold ${
            isPlaying
              ? "bg-[var(--color-surface-tint)] text-[var(--color-orange)] border border-[var(--color-orange)]/40 shadow-[0_0_12px_rgba(255,111,30,0.12)]"
              : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
          }`}
          title={isPlaying ? "Pause Music" : "Play Arch BGM"}
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

          <span className="hidden sm:inline-block font-mono text-[11px] tracking-tight">
            {isPlaying ? "ARCH BGM" : "BGM"}
          </span>
        </motion.button>

        {/* Next Track Button */}
        <button
          onClick={handleNext}
          className="p-1.5 text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-tint)] rounded-full transition-colors cursor-pointer"
          title="Next Track"
          aria-label="Next Track"
        >
          <SkipForward size={13} />
        </button>

        {/* Playlist Selector Popover Trigger */}
        <button
          onClick={() => setShowPlaylistModal((prev) => !prev)}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            showPlaylistModal
              ? "text-[var(--color-orange)] bg-[var(--color-surface-tint)]"
              : "text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-tint)]"
          }`}
          title="Open Playlist (27 Tracks)"
          aria-label="Open Playlist"
        >
          <ListMusic size={13} />
        </button>
      </div>

      {/* Floating Track Info Tooltip on Hover */}
      <AnimatePresence>
        {isHovered && !showPlaylistModal && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full mt-2 right-0 z-50 whitespace-nowrap px-3 py-1.5 rounded-lg bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-xl flex items-center gap-2 pointer-events-none"
          >
            <Music size={12} className="text-[var(--color-orange)] animate-pulse" />
            <span className="font-mono text-[11px] font-medium text-[var(--color-text)] max-w-[200px] truncate">
              {currentTrack.artist} - {currentTrack.title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Playlist Selection Drawer / Popover */}
      <AnimatePresence>
        {showPlaylistModal && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="absolute top-full right-0 mt-2 w-72 sm:w-80 max-h-80 overflow-y-auto rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-2xl p-3 z-50 backdrop-blur-xl flex flex-col gap-1.5"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)] px-1">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[var(--color-orange)] uppercase tracking-wider">
                <Music size={13} />
                <span>Arch BGM ({playlist.length} Tracks)</span>
              </div>
              <button
                onClick={() => setShowPlaylistModal(false)}
                className="font-mono text-[10px] text-[var(--color-muted)] hover:text-[var(--color-text)] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Track List */}
            <div className="flex flex-col gap-1 overflow-y-auto pr-1">
              {playlist.map((track, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={track.id || idx}
                    onClick={() => selectTrack(idx)}
                    className={`flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer font-mono text-xs ${
                      isSelected
                        ? "bg-[var(--color-surface-tint)] text-[var(--color-orange)] font-bold border border-[var(--color-orange)]/30"
                        : "text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-tint)]"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="text-[10px] opacity-60 w-4 text-right shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="truncate">
                        <div className="truncate text-[11px] font-medium text-[var(--color-headline)]">
                          {track.title}
                        </div>
                        <div className="truncate text-[9px] opacity-70">
                          {track.artist}
                        </div>
                      </div>
                    </div>

                    {isSelected && isPlaying && (
                      <span className="flex items-center gap-[2px] h-3 shrink-0">
                        <span className="w-1 h-3 bg-[var(--color-orange)] rounded-full animate-bounce" />
                        <span className="w-1 h-2 bg-[var(--color-orange)] rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1 h-3 bg-[var(--color-orange)] rounded-full animate-bounce [animation-delay:0.4s]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Skiper25;
