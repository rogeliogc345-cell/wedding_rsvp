'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from './Demo4Reveal'
import { Divider } from './Demo4Divider'
import { EVENT } from './events'

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Unit({ value, label }: { value: number; label: string }) {
  const display = value.toString().padStart(2, '0')
  return (
    <div className="glass flex flex-col items-center rounded-2xl px-3 py-5 sm:px-6 sm:py-8">
      <div className="relative h-12 w-full overflow-hidden sm:h-16">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center font-serif text-4xl tabular-nums text-foreground sm:text-6xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-xs">
        {label}
      </span>
    </div>
  )
}

interface Props {
  date?: string;
}


export function Countdown({ date }: Props) {
  const target = new Date(date ?? EVENT.date).getTime()
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(getTimeLeft(target))
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <section
      id="countdown"
      className="relative overflow-hidden bg-secondary/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-primary">
            Falta poco
          </p>
          <h2 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
            Cuenta Regresiva
          </h2>
          <Divider className="my-7" />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto grid max-w-2xl grid-cols-4 gap-3 sm:gap-5">
            {mounted ? (
              <>
                <Unit value={time.days} label="Días" />
                <Unit value={time.hours} label="Horas" />
                <Unit value={time.minutes} label="Minutos" />
                <Unit value={time.seconds} label="Segundos" />
              </>
            ) : (
              ['Días', 'Horas', 'Minutos', 'Segundos'].map((l) => (
                <Unit key={l} value={0} label={l} />
              ))
            )}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-10 max-w-md font-serif text-lg italic leading-relaxed text-muted-foreground">
            &ldquo;Cada segundo nos acerca a este momento tan especial.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  )
}
