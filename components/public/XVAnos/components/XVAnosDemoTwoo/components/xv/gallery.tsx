"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

const photos = [
  { id: 1, src: "/images/XVAnos_1.png", alt: "Quinceañera photo 1", span: "col-span-2 row-span-2" },
  { id: 2, src: "/images/XVAnos_2.png", alt: "Quinceañera photo 2", span: "col-span-1 row-span-1" },
  { id: 3, src: "/images/XVAnos_3.png", alt: "Quinceañera photo 3", span: "col-span-1 row-span-1" },
  { id: 4, src: "/images/XVAnos_4.png", alt: "Quinceañera photo 4", span: "col-span-1 row-span-2" },
  { id: 5, src: "/images/XVAnos_5.jpg", alt: "Quinceañera photo 5", span: "col-span-2 row-span-1" },
  { id: 6, src: "/images/XVAnos_6.jpg", alt: "Quinceañera photo 6", span: "col-span-1 row-span-1" },
]

export function GalleryDemo2() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-black">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-black/[0.02]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm tracking-[0.3em] text-xvgreen-text mb-4">GALERÍA</h2>
          <p className="text-4xl md:text-5xl font-serif text-white">Momentos Especiales</p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${photo.span} relative group cursor-pointer overflow-hidden rounded-xl`}
              onClick={() => setSelectedImage(photo.src)}
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-xl transition-colors duration-300 z-20" />

              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative max-w-4xl max-h-[80vh] w-full aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={selectedImage}
                alt="Selected photo"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
