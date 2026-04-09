"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const MONTHS = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

const EVENT_DATE = new Date(2026, 7, 15) // August 15, 2026

export function CalendarSectionDemoUno() {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)) // Start at August 2026

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        return { firstDay, daysInMonth }
    }

    const { firstDay, daysInMonth } = getDaysInMonth(currentDate)

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const isEventDay = (day: number) => {
        return (
            currentDate.getMonth() === EVENT_DATE.getMonth() &&
            currentDate.getFullYear() === EVENT_DATE.getFullYear() &&
            day === EVENT_DATE.getDate()
        )
    }

    const isToday = (day: number) => {
        const today = new Date()
        return (
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear() &&
            day === today.getDate()
        )
    }

    const days = []
    for (let i = 0; i < firstDay; i++) {
        days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
    }

    return (
        <section id="calendar" className="py-20 px-4 bg-gradient-to-b from-blush to-background confetti-bg">
            <div className="max-w-lg mx-auto">
                {/* Section header */}
                <div className="text-center mb-12">
                    <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-2">
                        Marca la fecha
                    </p>
                    <h2
                        className="text-5xl md:text-7xl text-primary font-wedding"

                    >
                        Save the Date
                    </h2>
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                        <div className="w-2 h-2 rotate-45 bg-gold" />
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                    </div>
                </div>

                {/* Calendar */}
                <div className="bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-center">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={prevMonth}
                                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h3 className="text-2xl text-white font-light">
                                    {MONTHS[currentDate.getMonth()]}
                                </h3>
                                <p className="text-white/80 text-sm">{currentDate.getFullYear()}</p>
                            </div>
                            <button
                                onClick={nextMonth}
                                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Days header */}
                    <div className="grid grid-cols-7 gap-1 p-4 pb-2">
                        {DAYS.map((day) => (
                            <div key={day} className="text-center text-sm text-muted-foreground font-medium py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-1 p-4 pt-0">
                        {days.map((day, index) => (
                            <div
                                key={index}
                                className={`
                  relative aspect-square flex items-center justify-center text-sm rounded-full
                  transition-all duration-300
                  ${day ? "hover:bg-muted cursor-pointer" : ""}
                  ${isEventDay(day || 0) ? "bg-primary text-white scale-110 shadow-lg" : ""}
                  ${isToday(day || 0) && !isEventDay(day || 0) ? "border-2 border-gold" : ""}
                `}
                            >
                                {day}
                                {isEventDay(day || 0) && (
                                    <Star className="absolute -top-1 -right-1 w-4 h-4 text-gold fill-gold" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Event info */}
                    <div className="p-6 pt-2 text-center border-t border-border">
                        <p className="text-muted-foreground text-sm">
                            ¡No olvides marcar el
                        </p>
                        <p
                            className="text-2xl text-gold mt-1"
                            style={{ fontFamily: 'var(--font-great-vibes)' }}
                        >
                            15 de Agosto de 2026
                        </p>
                    </div>
                </div>

                {/* Add to calendar button */}
                <div className="mt-8 text-center">
                    <button className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-white rounded-full hover:bg-gold/90 transition-colors shadow-lg">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Agregar al Calendario
                    </button>
                </div>
            </div>
        </section>
    )
}
