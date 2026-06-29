"use client"

import { useEffect, useState } from "react"
import { Crown, Sparkles } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-11-15T16:00:00")

    const timer = setInterval(() => {
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
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Minutos" },
    { value: timeLeft.seconds, label: "Segundos" },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#1a3a6e] to-[#0a1628]" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-1/4 opacity-20">
        <Crown className="w-20 h-20 text-[#FFD700] animate-float" />
      </div>
      <div className="absolute bottom-10 right-1/4 opacity-20">
        <Sparkles className="w-16 h-16 text-[#87CEEB] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-[#87CEEB] mb-4 tracking-wide">
            Cuenta Regresiva
          </h2>
          <p className="text-[#FFD700] text-xl">Para el gran día</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {timeUnits.map((unit, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-[#4169E1]/30 blur-xl rounded-2xl group-hover:bg-[#4169E1]/40 transition-all duration-300" />
              <div className="relative bg-[#1a3a6e]/50 backdrop-blur-sm border border-[#4169E1]/30 rounded-2xl p-6 md:p-8 min-w-[100px] md:min-w-[140px] text-center group-hover:border-[#FFD700]/40 transition-all duration-300">
                <div className="text-4xl md:text-6xl font-bold text-foreground mb-2 tabular-nums">
                  {unit.value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm md:text-base text-[#87CEEB] tracking-widest uppercase">
                  {unit.label}
                </div>
                {/* Decorative corner */}
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#FFD700]/40" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#FFD700]/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
