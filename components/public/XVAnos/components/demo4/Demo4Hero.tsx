'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
// import { FloatingParticles } from './Demo4Floatingparticles'
import { Divider } from './Demo4Divider'
import { EVENT } from './events'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/images/XVAnos_5.jpg"
          alt="Isabella en su celebración de XV Años"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </motion.div>

      {/* <FloatingParticles count={22} /> */}

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4 text-sm font-light uppercase tracking-[0.4em] text-background/90 text-shadow-soft"
        >
          Con la bendición de Dios
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35 }}
          className="font-serif text-5xl leading-none tracking-tight text-background text-shadow-soft sm:text-7xl md:text-8xl"
        >
          Mis XV Años
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-6 font-serif text-3xl italic text-primary text-shadow-soft sm:text-5xl"
        >
          {EVENT.name}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.75 }}
        >
          <Divider className="my-7" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-base font-light uppercase tracking-[0.3em] text-background/90 text-shadow-soft sm:text-lg"
        >
          {EVENT.dateLabel}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => scrollTo('#rsvp')}
            className="group w-full rounded-full bg-primary px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-lg shadow-black/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl sm:w-auto"
          >
            Confirmar asistencia
          </button>
          <button
            onClick={() => scrollTo('#itinerary')}
            className="w-full rounded-full border border-background/60 bg-background/10 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-background backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:bg-background/20 sm:w-auto"
          >
            Ver itinerario
          </button>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollTo('#countdown')}
        style={{ opacity }}
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-background/80"
        aria-label="Desplazarse hacia abajo"
      >
        <ChevronDown className="size-7" />
      </motion.button>
    </section>
  )
}
