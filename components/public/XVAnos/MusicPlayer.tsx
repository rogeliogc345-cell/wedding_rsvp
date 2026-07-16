"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, Music, Sparkles, Crown, Heart } from "lucide-react";
import { Customer } from "@/types/database";

interface MediaItem {
  id: string;
  file_url: string;
  file_type: "image" | "audio";
  is_hero: boolean;
}

interface MusicPlayerProps {
  customer: Customer & {
    media?: MediaItem[];
  };
}

interface FloatingNote {
  id: number;
  type: "music" | "crown" | "sparkles" | "heart";
  style: React.CSSProperties;
}

export default function MusicPlayer({ customer }: MusicPlayerProps) {
  const media = customer.media || [];
  const song = media.find((m) => m.file_type === "audio");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [notes, setNotes] = useState<FloatingNote[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-detect template theme
  const rawTemplate = customer.template ?? customer.template_id ?? "classic";
  const theme = rawTemplate === "classicBlue" ? "clasicBlue" : rawTemplate;

  // Retrieve opened state to avoid annoying returning users
  useEffect(() => {
    if (!song) return;
    const sessionKey = `invitation_opened_${customer.id}`;
    const wasOpened = sessionStorage.getItem(sessionKey);
    if (!wasOpened) {
      setShowWelcome(true);
    } else {
      setHasInteracted(true);
    }
  }, [customer.id, song]);

  // Handle play/pause commands
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn("Autoplay or play blocked by browser:", err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Generate floating musical notes while music is playing
  useEffect(() => {
    if (!isPlaying) {
      setNotes([]);
      return;
    }

    const interval = setInterval(() => {
      const id = Date.now();
      const randomX = Math.floor(Math.random() * 40) - 20; // -20px to 20px
      const randomRotation = Math.floor(Math.random() * 30) - 15; // -15deg to 15deg
      const randomScale = 0.6 + Math.random() * 0.6; // 0.6 to 1.2
      const randomDuration = 2 + Math.random() * 1.5; // 2s to 3.5s

      const noteTypes: ("music" | "crown" | "sparkles" | "heart")[] =
        customer.category === "XV"
          ? ["music", "crown", "sparkles", "heart"]
          : ["music", "heart", "sparkles"];
      const randomType = noteTypes[Math.floor(Math.random() * noteTypes.length)];

      setNotes((prev) => [
        ...prev.slice(-4), // keep last 4 notes max
        {
          id,
          type: randomType,
          style: {
            left: `calc(50% + ${randomX}px)`,
            transform: `scale(${randomScale}) rotate(${randomRotation}deg)`,
            animationDuration: `${randomDuration}s`,
          },
        },
      ]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!song) return null;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
  };

  const handleEnterInvitation = () => {
    setShowWelcome(false);
    sessionStorage.setItem(`invitation_opened_${customer.id}`, "true");
    setHasInteracted(true);

    // Short timeout to guarantee playback on click interaction
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error("Audio playback failed:", err);
            setIsPlaying(false);
          });
      }
    }, 100);
  };

  // Theme configuration for the single stop-and-play button player
  let themeStyles = {
    // Welcome dialog
    welcomeBg: "bg-rose-50/95 text-rose-950",
    welcomeGradient: "from-rose-100 to-pink-200",
    welcomeCard: "bg-white/80 border-white text-rose-900",
    welcomeBtn: "from-rose-400 to-pink-500 hover:shadow-rose-400/50 text-white",
    welcomeSubtitle: "text-rose-600",
    welcomeHeading: "text-rose-800",

    // Button colors
    floatBtn: "from-rose-100 to-pink-200/90 border-white text-rose-700 shadow-rose-400/30 shadow-[0_0_20px_rgba(244,63,94,0.25)] hover:shadow-[0_0_30px_rgba(244,63,94,0.45)]",
    pulseColor: "bg-rose-300/30",
    discCenter: "bg-pink-100 border-rose-300",
    needleColor: "bg-rose-400",
    iconColor: "text-rose-600",
    sparkles: "text-rose-400",
    noteColor: "text-rose-400/80",
  };

  if (theme === "clasicBlue") {
    themeStyles = {
      welcomeBg: "bg-slate-950/98 text-slate-100",
      welcomeGradient: "from-blue-950 to-slate-950",
      welcomeCard: "bg-slate-900/90 border-blue-500/20 text-white",
      welcomeBtn: "from-amber-400 to-amber-500 hover:shadow-amber-500/30 text-slate-950",
      welcomeSubtitle: "text-amber-400/80",
      welcomeHeading: "text-amber-300",

      floatBtn: "from-slate-900 to-blue-950/90 border-amber-400/30 text-amber-400 shadow-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_30px_rgba(245,158,11,0.45)]",
      pulseColor: "bg-amber-400/20",
      discCenter: "bg-amber-500/20 border-amber-400/50",
      needleColor: "bg-amber-400",
      iconColor: "text-amber-400",
      sparkles: "text-amber-300",
      noteColor: "text-amber-400/80",
    };
  } else if (theme === "modern") {
    themeStyles = {
      welcomeBg: "bg-zinc-950/98 text-zinc-100",
      welcomeGradient: "from-emerald-950/20 to-zinc-950",
      welcomeCard: "bg-zinc-900/90 border-zinc-800 text-white",
      welcomeBtn: "from-emerald-500 to-teal-600 hover:shadow-emerald-500/30 text-white",
      welcomeSubtitle: "text-emerald-400/80",
      welcomeHeading: "text-zinc-100",

      floatBtn: "from-zinc-900 to-zinc-950/90 border-emerald-500/30 text-emerald-400 shadow-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.45)]",
      pulseColor: "bg-emerald-500/20",
      discCenter: "bg-emerald-500/20 border-emerald-400/50",
      needleColor: "bg-emerald-400",
      iconColor: "text-emerald-400",
      sparkles: "text-emerald-400",
      noteColor: "text-emerald-400/80",
    };
  }

  return (
    <>
      {/* 🎵 Hidden Audio Engine */}
      <audio
        ref={audioRef}
        src={song.file_url}
        onEnded={() => setIsPlaying(false)}
        loop
      />

      {/* 🌟 Welcome / Invitation Opener Overlay (Autoplay Policy Bypass) */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`fixed inset-0 z-[100] flex items-center justify-center ${themeStyles.welcomeBg} backdrop-blur-md`}
          >
            {/* Ambient Background Glow */}
            <div className={`absolute inset-0 opacity-40 bg-gradient-to-br ${themeStyles.welcomeGradient}`} />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`relative z-10 flex flex-col items-center justify-center p-8 md:p-12 ${themeStyles.welcomeCard} backdrop-blur-xl rounded-3xl shadow-2xl max-w-sm md:max-w-md w-full mx-4 text-center border`}
            >
              <div className="absolute top-4 right-4 animate-pulse">
                <Sparkles className={`w-6 h-6 ${themeStyles.sparkles}`} />
              </div>

              <p className={`tracking-widest uppercase text-xs mb-4 font-semibold ${themeStyles.welcomeSubtitle}`}>
                Estás invitado a celebrar los
              </p>
              <h2 className={`text-4xl md:text-5xl font-light mb-2 font-serif tracking-wide ${themeStyles.welcomeHeading}`}>
                {customer.couple_name}
              </h2>
              <p className="mb-10 tracking-[0.3em] uppercase text-[10px] opacity-80">
                Mis Quince Años
              </p>

              <button
                onClick={handleEnterInvitation}
                className={`group relative px-8 py-4 bg-gradient-to-r ${themeStyles.welcomeBtn} rounded-full font-medium tracking-wide shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full skew-x-12 transition-transform duration-700 ease-in-out" />
                <span className="flex items-center gap-2 relative z-10">
                  Abrir Invitación
                  {customer.category === "XV" ? (
                    <Crown className="w-4 h-4 fill-current flex-shrink-0" />
                  ) : (
                    <Heart className="w-4 h-4 fill-current flex-shrink-0" />
                  )}
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎧 Tactile Floating Player widget */}
      {!showWelcome && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center justify-center">
          
          {/* Floating musical note elements rising up when playing */}
          <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
            {notes.map((note) => (
              <span
                key={note.id}
                style={note.style}
                className={`absolute bottom-full left-1/2 -translate-x-1/2 ${themeStyles.noteColor} animate-float-note`}
              >
                {note.type === "music" && <Music className="w-3.5 h-3.5" />}
                {note.type === "crown" && <Crown className="w-3 h-3" />}
                {note.type === "sparkles" && <Sparkles className="w-3 h-3" />}
                {note.type === "heart" && <Heart className="w-3.5 h-3.5 fill-current" />}
              </span>
            ))}
          </div>

          {/* Pulsing ring visual warning */}
          {!isPlaying && !hasInteracted && (
            <div className={`absolute -inset-2.5 rounded-full ${themeStyles.pulseColor} animate-gentle-pulse z-0`} />
          )}

          {/* Master Controller Button */}
          <button
            onClick={togglePlay}
            className={`relative z-10 w-[72px] h-[72px] rounded-full bg-gradient-to-br ${themeStyles.floatBtn} border-2 backdrop-blur-md flex items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95 group overflow-visible`}
            title={isPlaying ? "Detener música" : "Reproducir música"}
          >
            {/* Concentric Vinyl grooves simulating physical record */}
            <div
              className={`absolute inset-1.5 rounded-full bg-zinc-950 border border-zinc-900 shadow-[inset_0_0_12px_rgba(255,255,255,0.06),0_4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden transition-all duration-1000 ${
                isPlaying ? "animate-spin-vinyl" : ""
              }`}
            >
              {/* Grooved tracks */}
              <div className="absolute inset-1 rounded-full border border-zinc-900/40" />
              <div className="absolute inset-2.5 rounded-full border border-zinc-900/60" />
              <div className="absolute inset-4 rounded-full border border-zinc-900/80" />
              
              {/* Vinyl center sticker */}
              <div className={`w-6 h-6 rounded-full ${themeStyles.discCenter} flex items-center justify-center border border-zinc-950/70 z-10`}>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
              </div>
            </div>

            {/* Stylus needle arm that moves dynamically */}
            <div
              className="absolute top-1 right-2.5 w-[14px] h-[22px] origin-top-right transition-transform duration-700 ease-out z-20 pointer-events-none"
              style={{
                transform: isPlaying ? "rotate(18deg) translate(-1px, 1px)" : "rotate(0deg)",
              }}
            >
              {/* Stylus arm */}
              <div className={`w-[2px] h-3.5 ${themeStyles.needleColor} mx-auto rounded-full shadow-sm`} />
              {/* Stylus head */}
              <div className="w-[5px] h-[4px] bg-zinc-400 dark:bg-zinc-300 -mt-1 ml-0.5 rounded-[1px] shadow-sm" />
            </div>

            {/* Glowing Icon Overlay (Morphs Play/Stop) */}
            <div className={`relative z-30 w-8 h-8 rounded-full bg-white/95 dark:bg-zinc-900/95 shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${themeStyles.iconColor}`}>
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  <motion.div
                    key="play"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-0.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="playing"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    {/* Themed Icon (Crown/Heart) - Pulsing when playing */}
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
                      {customer.category === "XV" ? (
                        <Crown className="w-3.5 h-3.5 fill-current animate-pulse-slow" />
                      ) : (
                        <Heart className="w-3.5 h-3.5 fill-current animate-pulse-slow" />
                      )}
                    </div>

                    {/* Stop Icon (visible on hover) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                      <Square className="w-3 h-3 fill-current" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Tooltip on Hover */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900/90 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md border border-zinc-800 font-semibold tracking-wide z-30">
              {isPlaying ? "Detener Música" : "Escuchar Música"}
            </div>
          </button>
        </div>
      )}

      {/* Global CSS keyframes for floating notes, spinning vinyl, and pulses */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-vinyl {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-vinyl {
          animation: spin-vinyl 9s linear infinite;
        }

        @keyframes gentle-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.18);
            opacity: 0.55;
          }
        }
        .animate-gentle-pulse {
          animation: gentle-pulse 2.2s infinite ease-in-out;
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.16);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite ease-in-out;
        }

        @keyframes float-note {
          0% {
            transform: translateY(0) scale(0.6) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
          }
          85% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-80px) scale(1.2) rotate(20deg);
            opacity: 0;
          }
        }
        .animate-float-note {
          animation-name: float-note;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
        }
      ` }} />
    </>
  );
}
