"use client"

import { useState } from "react"
import Image from "next/image"
import { Crown, Camera, X, ChevronLeft, ChevronRight } from "lucide-react"

const photos = [
  {
    src: "/xv/XV_Anos_2.png",
    alt: "Vestido de quinceañera azul real",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/xv/XV_Anos_3.png",
    alt: "Decoración elegante",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/xv/XV_Anos_4.png",
    alt: "Corona dorada",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/xv/XV_Anos_5.png",
    alt: "Celebración mágica",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/xv/XV_Anos_6.png",
    alt: "Detalles florales",
    span: "col-span-1 row-span-1",
  },
]

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedPhoto(index)
  const closeLightbox = () => setSelectedPhoto(null)

  const goToPrevious = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1)
    }
  }

  const goToNext = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === photos.length - 1 ? 0 : selectedPhoto + 1)
    }
  }

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628]" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#FFD700]" />
            <Camera className="w-8 h-8 text-[#FFD700]" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#FFD700]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Galería de Sueños
          </h2>
          <p className="text-[#87CEEB]/70 text-lg max-w-md mx-auto">
            Un adelanto de los momentos mágicos que viviremos
          </p>
        </div>

        {/* Masonry-style gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`${photo.span} relative group cursor-pointer overflow-hidden rounded-2xl`}
              onClick={() => openLightbox(index)}
            >
              <div className="absolute inset-0 bg-[#4169E1]/0 group-hover:bg-[#4169E1]/30 transition-all duration-300 z-10" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFD700]/50 rounded-2xl transition-all duration-300 z-10" />
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <Crown className="w-10 h-10 text-[#FFD700]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto !== null && (
        <div className="fixed inset-0 z-50 bg-[#0a1628]/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-[#87CEEB] hover:text-[#FFD700] transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 text-[#87CEEB] hover:text-[#FFD700] transition-colors z-50"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 text-[#87CEEB] hover:text-[#FFD700] transition-colors z-50"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="relative w-full max-w-4xl aspect-[3/4] md:aspect-video">
            <Image
              src={photos[selectedPhoto].src}
              alt={photos[selectedPhoto].alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
