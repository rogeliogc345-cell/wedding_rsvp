"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { useEffect } from "react";

interface WelcomeDialogProps {
  name: string;
  onOpen: () => void;
  show: boolean;
}

export function WelcomeDialog({ name, onOpen, show }: WelcomeDialogProps) {
  // Prevent scrolling when dialog is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-rose-50 backdrop-blur-md"
        >
          {/* Background overlay style */}
          <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-rose-100 to-pink-200" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative z-10 flex flex-col items-center justify-center p-8 md:p-12 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-sm md:max-w-md w-full mx-4 text-center border border-white"
          >
            <p className="text-rose-600 tracking-widest uppercase text-sm mb-4">
              Estás invitado a celebrar a
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-rose-800 mb-2">
              {name}
            </h2>
            <p className="text-rose-500/80 mb-10 tracking-[0.3em] uppercase text-xs">
              en mis Quince Años
            </p>

            <button
              onClick={onOpen}
              className="group relative px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-medium tracking-wide shadow-xl hover:shadow-rose-400/50 transition-all duration-300 hover:scale-[1.02] active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full skew-x-12 transition-transform duration-700 ease-in-out" />
              <span className="flex items-center gap-2 relative z-10">
                Abrir Invitación
                <PartyPopper className="w-5 h-5 flex-shrink-0" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
