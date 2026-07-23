'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Reveal } from './Demo4Reveal'
import { Divider } from './Demo4Divider'

export function Story() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section id="story" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <Reveal className="order-2 md:order-1">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-primary">
            La celebración
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
            Un sueño hecho realidad
          </h2>
          <Divider className="my-7 !justify-start" />
          <div className="space-y-5 text-pretty font-light leading-relaxed text-muted-foreground">
            <p>
              Hay momentos que la vida guarda con especial ternura. Hoy Isabella
              deja atrás la niñez para abrazar una nueva etapa llena de sueños,
              ilusiones y promesas.
            </p>
            <p>
              Sus XV Años son la celebración de una jovencita que ha llenado de
              luz cada día. Con el corazón agradecido, su familia te invita a ser
              parte de esta noche mágica, donde cada detalle ha sido pensado con
              amor.
            </p>
            <p className="font-serif text-lg italic text-foreground/80">
              Acompáñanos a celebrar la vida, la fe y el comienzo de un hermoso
              porvenir.
            </p>
          </div>
        </Reveal>

        <Reveal className="order-1 md:order-2" delay={0.15}>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/10">
              <motion.div style={{ y }} className="absolute inset-[-12%]">
                <Image
                  src="/images/XVAnos_4.png"
                  alt="Arreglo floral de rosas en tonos blush e ivory"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
            <div
              className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-primary/15 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="absolute -right-5 -top-5 -z-10 h-28 w-28 rounded-full bg-rose/30 blur-2xl"
              aria-hidden="true"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
