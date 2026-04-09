"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
    {
        src: "/hanni/hani1.jpeg",
        alt: "Foto de pre-XV 1",
    },
    {
        src: "/hanni/hani2.jpeg",
        alt: "Foto de pre-XV 2",
    },
    {
        src: "/hanni/hani3.jpeg",
        alt: "Foto de pre-XV 3",
    },
    {
        src: "/hanni/hani4.jpeg",
        alt: "Foto de pre-XV 4",
    },
    {
        src: "/hanni/hani5.jpeg",
        alt: "Foto de pre-XV 5",
    },
    {
        src: "/hanni/hani6.jpeg",
        alt: "Foto de pre-XV 6",
    },
]

export function GallerySectionDemoUno() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null)

    const openLightbox = (index: number) => setSelectedImage(index)
    const closeLightbox = () => setSelectedImage(null)
    const nextImage = () => setSelectedImage((prev) => (prev !== null ? (prev + 1) % galleryImages.length : 0))
    const prevImage = () => setSelectedImage((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : 0))

    return (
        <section id="gallery" className="py-20 px-4 bg-background">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16">
                    <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-2">
                        Momentos especiales
                    </p>
                    <h2
                        className="text-5xl md:text-8xl text-primary font-wedding"

                    >
                        Galería
                    </h2>
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                        <div className="w-2 h-2 rotate-45 bg-gold" />
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                    </div>
                </div>

                {/* Gallery grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => openLightbox(index)}
                            className="group relative aspect-square overflow-hidden rounded-2xl bg-muted cursor-pointer"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                <span className="text-white text-sm tracking-wider">Ver foto</span>
                            </div>
                            {/* Corner decorations */}
                            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    ))}
                </div>

                {/* Lightbox */}
                {selectedImage !== null && (
                    <div
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Image */}
                        <div
                            className="relative max-w-4xl max-h-[80vh] aspect-square"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={galleryImages[selectedImage].src}
                                alt={galleryImages[selectedImage].alt}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                            {selectedImage + 1} / {galleryImages.length}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
