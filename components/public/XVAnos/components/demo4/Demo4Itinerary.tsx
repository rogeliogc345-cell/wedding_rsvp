'use client'

import { motion } from 'framer-motion'
import {
  Church,
  GlassWater,
  Music,
  UtensilsCrossed,
  Cake,
  PartyPopper,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from './Demo4Reveal'
import { Divider } from './Demo4Divider'

type Event = {
  time: string
  title: string
  description: string
  icon: LucideIcon
}

const EVENTS: Event[] = [
  {
    time: '5:00 PM',
    title: 'Ceremonia',
    description: 'Misa de acción de gracias en la capilla del recinto.',
    icon: Church,
  },
  {
    time: '6:30 PM',
    title: 'Recepción',
    description: 'Bienvenida con cóctel de honor y música en vivo.',
    icon: GlassWater,
  },
  {
    time: '7:30 PM',
    title: 'Cena',
    description: 'Cena formal de tres tiempos servida en el salón principal.',
    icon: UtensilsCrossed,
  },
  {
    time: '9:00 PM',
    title: 'Vals',
    description: 'El tradicional vals de Isabella con su corte de honor.',
    icon: Music,
  },
  {
    time: '9:45 PM',
    title: 'Pastel',
    description: 'Brindis y corte del pastel para celebrar la noche.',
    icon: Cake,
  },
  {
    time: '10:15 PM',
    title: 'Baile',
    description: 'Abrimos la pista para bailar hasta el amanecer.',
    icon: PartyPopper,
  },
]

export function Itinerary() {
  return (
    <section
      id="itinerary"
      className="relative overflow-hidden bg-secondary/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-primary">
            El gran día
          </p>
          <h2 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
            Itinerario
          </h2>
          <Divider className="my-7" />
        </Reveal>

        <div className="relative mt-12">
          <span
            className="absolute left-6 top-2 h-full w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent sm:left-1/2"
            aria-hidden="true"
          />

          <ul className="space-y-8">
            {EVENTS.map((event, i) => {
              const Icon = event.icon
              const isLeft = i % 2 === 0
              return (
                <li key={event.title} className="relative">
                  <Reveal delay={i * 0.05}>
                    <div
                      className={`flex items-start gap-5 sm:w-1/2 ${
                        isLeft
                          ? 'sm:ml-0 sm:pr-10 sm:text-right'
                          : 'sm:ml-auto sm:flex-row-reverse sm:pl-10 sm:text-left'
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.12, rotate: 6 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-card text-primary shadow-md"
                      >
                        <Icon className="size-5" />
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -4 }}
                        className={`group flex-1 rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-shadow hover:shadow-lg ${
                          isLeft ? '' : ''
                        }`}
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                          {event.time}
                        </span>
                        <h3 className="mt-1 font-serif text-2xl text-foreground">
                          {event.title}
                        </h3>
                        <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                          {event.description}
                        </p>
                      </motion.div>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
