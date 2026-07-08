"use client"

import { useState, useEffect } from "react"

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export function CountdownSectionDemoUno({ eventDate }: { eventDate?: string }) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        const defaultTargetDate = new Date("2026-08-15T18:00:00")
        const normalizedDate = eventDate?.split("T")[0]
        const dateParts = normalizedDate?.match(/^(\d{4})[-/](\d{2})[-/](\d{2})$/)

        const targetDate = dateParts
            ? new Date(Number(dateParts[1]), Number(dateParts[2]) - 1, Number(dateParts[3]), 18, 0, 0)
            : defaultTargetDate

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
    }, [eventDate])

    const timeUnits = [
        { value: timeLeft.days, label: "Días" },
        { value: timeLeft.hours, label: "Horas" },
        { value: timeLeft.minutes, label: "Minutos" },
        { value: timeLeft.seconds, label: "Segundos" },
    ]

    return (
        <section className="py-10 px-4   bg-[url('/xv/fondo_demo1_hero.png')] bg-cover bg-center bg-no-repeat bg-fixed">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4">
                    Faltan
                </p>

                <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap">
                    {timeUnits.map((unit) => (
                        <div key={unit.label} className="flex flex-col items-center">
                            <div className="relative">
                                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-card shadow-lg flex items-center justify-center border border-border">
                                    <span
                                        className="text-4xl md:text-6xl font-light text-primary font-wedding"
                                    // style={{ fontFamily: 'var(--font-great-vibes)' }}
                                    >
                                        {unit.value.toString().padStart(2, '0')}
                                    </span>
                                </div>
                                {/* Decorative corner */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-gold" />
                                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-gold" />
                            </div>
                            <span
                                className="mt-3 text-sm md:text-base text-muted-foreground tracking-wider"
                                style={{ fontFamily: 'var(--font-great-vibes)' }}
                            >
                                {unit.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Decorative divider */}
                <div className="mt-16 flex items-center justify-center gap-4 ">
                    <div className="w-24 h-px bg-gradient-to-r from-transparent to-gold/50" />
                    <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                    </svg>
                    <div className="w-24 h-px bg-gradient-to-l from-transparent to-gold/50" />
                </div>
            </div>
        </section>
    )
}
