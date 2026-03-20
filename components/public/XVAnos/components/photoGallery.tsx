"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Photo type
export type Photo = {
  id: string;
  src: string;
  alt: string;
  title?: string;
  aspectRatio: number; // width / height
};

interface PhotoGalleryProps {
  photos: Photo[];
}

export function PhotoGalleryQuinceañera({ photos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({});

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "unset";
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrevious();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown as any);
    return () => window.removeEventListener("keydown", handleKeyDown as any);
  }, [selectedIndex, goToNext, goToPrevious, closeLightbox]);

  return (
    <>
      {/* Gallery Section */}
      <section className="w-full py-16 md:py-24 lg:py-32">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-gray-900 dark:text-white mb-2">
            Momentos Especiales
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gray-900 dark:via-white to-transparent mx-auto" />
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 px-4 sm:px-6 lg:px-8">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="break-inside-avoid mb-6 group relative cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-500">
              {/* Loading skeleton */}
              {!imageLoadStates[photo.id] && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 animate-pulse" />
              )}
              
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={800 / photo.aspectRatio}
                className={cn(
                  "w-full h-auto transition-transform duration-500",
                  "group-hover:scale-105",
                  !imageLoadStates[photo.id] && "opacity-0"
                )}
                onLoad={() => {
                  setImageLoadStates(prev => ({ ...prev, [photo.id]: true }));
                }}
                quality={90}
                priority={index < 3}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Maximize2 
                    className="text-white drop-shadow-lg" 
                    size={36}
                    strokeWidth={2}
                  />
                </motion.div>
              </div>

              {/* Title overlay */}
              {photo.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-medium text-sm md:text-base tracking-wide">{photo.title}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/98 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all text-white border border-white/20 hover:border-white/40"
              aria-label="Close lightbox"
            >
              <X size={24} strokeWidth={2} />
            </motion.button>

            {/* Navigation buttons */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all text-white border border-white/20 hover:border-white/40"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} strokeWidth={2} />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all text-white border border-white/20 hover:border-white/40"
              aria-label="Next image"
            >
              <ChevronRight size={28} strokeWidth={2} />
            </motion.button>

            {/* Image counter */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 left-6 z-50 text-white text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full"
            >
              <span className="font-semibold">{selectedIndex + 1}</span>
              <span className="text-white/70">&nbsp;/&nbsp;</span>
              <span>{photos.length}</span>
            </motion.div>

            {/* Image container */}
            <div
              className="flex flex-col items-center justify-center h-full w-full p-4 md:p-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full max-w-5xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={photos[selectedIndex].src}
                    alt={photos[selectedIndex].alt}
                    width={1920}
                    height={1920 / photos[selectedIndex].aspectRatio}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
                    quality={95}
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Title in lightbox */}
              {photos[selectedIndex].title && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mt-8 text-center max-w-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-white text-xl md:text-2xl font-light tracking-wide">
                    {photos[selectedIndex].title}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}