'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal } from './Demo4Reveal'
import { Divider } from './Demo4Divider'

interface MediaItem {
  id?: string
  file_url?: string
  file_type?: string
  src?: string
  alt?: string
}



interface Props {
  images?: (MediaItem | string)[]
}

export function Gallery({ images }: Props) {
  const [active, setActive] = useState<number | null>(null)

  const resolvedImages = (images && images.length > 0)
    ? images
      .filter((item) => typeof item === 'string' || item.file_type !== 'audio')
      .map((item, index) => {
        if (typeof item === 'string') {
          return { src: item, alt: `Foto ${index + 1}` }
        }
        return {
          src: item.file_url || item.src || '/placeholder.svg',
          alt: item.alt || `Foto ${index + 1}`,
        }
      })
    : []

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % resolvedImages.length)),
    [resolvedImages.length],
  )
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + resolvedImages.length) % resolvedImages.length)),
    [resolvedImages.length],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, close, next, prev])

  if (resolvedImages.length === 0) return null

  return (
    <section id="gallery" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-primary">
            Recuerdos
          </p>
          <h2 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
            Galería
          </h2>
          <Divider className="my-7" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="columns-2 gap-4 [column-fill:balance] lg:columns-3">
            {resolvedImages.map((img, i) => (
              <motion.button
                key={`${img.src}-${i}`}
                onClick={() => setActive(i)}
                whileHover={{ scale: 0.985 }}
                className="group relative mb-4 block w-full overflow-hidden rounded-2xl shadow-md shadow-black/5"
                aria-label={`Ver imagen: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={800}
                  loading="lazy"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.button>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {active !== null && resolvedImages[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Vista ampliada de la galería"
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X className="size-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-3 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
              aria-label="Anterior"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-3 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
              aria-label="Siguiente"
            >
              <ChevronRight className="size-6" />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[85vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={resolvedImages[active].src}
                alt={resolvedImages[active].alt}
                width={1000}
                height={1300}
                className="mx-auto max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
