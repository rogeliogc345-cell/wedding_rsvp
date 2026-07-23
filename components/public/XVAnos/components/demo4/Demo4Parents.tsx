'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Reveal } from './Demo4Reveal'
import { Divider } from './Demo4Divider'

type Group = {
  role: string
  names: string[]
}

const GROUPS: Group[] = [
  {
    role: 'Padres',
    names: ['Carlos Martínez', 'Adriana Reyes de Martínez'],
  },
  {
    role: 'Padrinos',
    names: ['Roberto Guzmán', 'Lucía Fernández'],
  },
  {
    role: 'Abuelos',
    names: ['Jorge Martínez', 'Elena Vargas', 'Manuel Reyes', 'Carmen Solís'],
  },
]

export function Parents() {
  return (
    <section
      id="parents"
      className="relative overflow-hidden bg-secondary/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-primary">
            Con amor y gratitud
          </p>
          <h2 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
            Nuestros Anfitriones
          </h2>
          <Divider className="my-7" />
          <p className="mx-auto max-w-lg text-sm font-light leading-relaxed text-muted-foreground">
            Gracias a quienes han guiado cada paso de Isabella con amor
            incondicional.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {GROUPS.map((group, i) => (
            <Reveal key={group.role} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="flex h-full flex-col items-center rounded-[1.75rem] border border-border/70 bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Heart className="size-5" />
                </div>
                <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  {group.role}
                </h3>
                <div className="mt-4 space-y-2">
                  {group.names.map((name) => (
                    <p
                      key={name}
                      className="font-serif text-lg leading-snug text-foreground"
                    >
                      {name}
                    </p>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
