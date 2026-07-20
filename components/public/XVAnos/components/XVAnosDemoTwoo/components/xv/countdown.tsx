"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownDemo2({ eventDate }: { eventDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date(eventDate)

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: "DÍAS", value: timeLeft.days },
    { label: "HORAS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEG", value: timeLeft.seconds },
  ]

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-black">
      {/* Large background text */}
      <div className="absolute inset-0 flex items-top justify-center pointer-events-none ">
        <span className="text-[25vw] font-serif font-bold text-white/30 select-none">XV</span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm tracking-[0.3em] text-primary mb-4  text-xvgreen-text">CUENTA REGRESIVA</h2>
          <p className="text-4xl md:text-5xl font-serif text-foreground text-white">Faltan</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8  ">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative    border border-border border-white/30 rounded-lg p-6 md:p-8 overflow-hidden transition-all duration-300 hover:border-white/50">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 bg-black text-center">
                  <motion.span
                    key={unit.value}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="block text-5xl md:text-7xl font-serif font-bold text-foreground  mb-2 text-white "
                  >
                    {String(unit.value).padStart(2, "0")}
                  </motion.span>
                  <span className="text-xs tracking-[0.2em] text-muted-foreground text-white">{unit.label}</span>
                </div>

                {/* Corner accent */}
                <div className=" absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
                <div className=" absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
