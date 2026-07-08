"use client"

import { useCallback, useMemo, useState } from "react"
import Image from "next/image"
import { Crown, Camera, X, ChevronLeft, ChevronRight } from "lucide-react"

type GalleryPhoto = {
  src?: string
  file_url?: string
  alt?: string
  span?: string
}

const fallbackImages: GalleryPhoto[] = [
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

const DEFAULT_FALLBACK_SRC = fallbackImages[0]?.src ?? "/xv/XV_Anos_2.png"

export function PhotoGallery({ photos }: { photos?: GalleryPhoto[] }) {
  const normalizedPhotos = useMemo(() => {
    const providedPhotos = (photos ?? []).filter(Boolean)

    if (providedPhotos.length > 0) {
      return providedPhotos.map((photo) => ({
        src: photo.src ?? photo.file_url,
        alt: photo.alt ?? "Foto de la galería",
        span: photo.span ?? "col-span-1 row-span-1",
      }))
    }

    return fallbackImages
  }, [photos])

  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const openLightbox = useCallback((index: number) => setSelectedPhoto(index), [])
  const closeLightbox = useCallback(() => setSelectedPhoto(null), [])
  const handleImageError = useCallback((index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }, [])

  const goToPrevious = useCallback(() => {
    if (selectedPhoto === null || normalizedPhotos.length === 0) return

    setSelectedPhoto(selectedPhoto === 0 ? normalizedPhotos.length - 1 : selectedPhoto - 1)
  }, [normalizedPhotos.length, selectedPhoto])

  const goToNext = useCallback(() => {
    if (selectedPhoto === null || normalizedPhotos.length === 0) return

    setSelectedPhoto(selectedPhoto === normalizedPhotos.length - 1 ? 0 : selectedPhoto + 1)
  }, [normalizedPhotos.length, selectedPhoto])

  const currentPhoto = selectedPhoto !== null ? normalizedPhotos[selectedPhoto] : null
  const hasPhotos = normalizedPhotos.length > 0

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

        {hasPhotos ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {normalizedPhotos.map((photo, index) => {
              const resolvedSrc = imageErrors[index]
                ? DEFAULT_FALLBACK_SRC
                : (photo.src ?? DEFAULT_FALLBACK_SRC)

              return (
                <button
                  key={`${resolvedSrc}-${index}`}
                  type="button"
                  className={`${photo.span ?? "col-span-1 row-span-1"} relative group cursor-pointer overflow-hidden rounded-2xl aspect-square`}
                  onClick={() => openLightbox(index)}
                >
                  <div className="absolute inset-0 bg-[#4169E1]/0 group-hover:bg-[#4169E1]/30 transition-all duration-300 z-10" />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFD700]/50 rounded-2xl transition-all duration-300 z-10" />
                  <Image
                    src={resolvedSrc}
                    alt={photo.alt ?? `Foto ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={index < 2}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={() => handleImageError(index)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <Crown className="w-10 h-10 text-[#FFD700]" />
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-[#87CEEB]/70">
            Aún no hay fotos para mostrar en esta galería.
          </div>
        )}
      </div>

      {selectedPhoto !== null && currentPhoto && (
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
              src={imageErrors[selectedPhoto] ? DEFAULT_FALLBACK_SRC : (currentPhoto.src ?? DEFAULT_FALLBACK_SRC)}
              alt={currentPhoto.alt ?? "Foto de la galería"}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-contain"
              onError={() => handleImageError(selectedPhoto)}
            />
          </div>
        </div>
      )}
    </section>
  )
}
