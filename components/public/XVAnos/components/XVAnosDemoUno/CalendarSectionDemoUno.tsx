"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Crown, Star } from "lucide-react"

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
        <section id="calendar" className="relative overflow-hidden bg-[#faf5f6] px-4 py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_1px_1px,rgba(190,95,130,0.16)_1px,transparent_0)] [background-size:14px_14px]" />
            <div className="relative z-10 mx-auto max-w-lg">
                {/* Section header */}
                <div className="text-center mb-12">
                    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-rose-700">
                        Marca la fecha
                    </p>
                    <Crown className="mx-auto mb-2 h-6 w-6 text-rose-400" strokeWidth={1.4} />
                    <h2
                        className="text-5xl text-stone-900 font-wedding md:text-7xl"

                    >
                        Save the Date
                    </h2>
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                        <div className="h-2 w-2 rotate-45 bg-rose-300" />
                        <div className="h-px w-16 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                    </div>
                </div>

                {/* Calendar */}
                <div className="overflow-hidden rounded-sm border-4 border-double border-rose-200 bg-[#fffdfd] shadow-md">
                    {/* Header */}
                    <div className="relative border-b border-rose-100 bg-rose-50 p-6 text-center">
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(190,95,130,0.12)_1px,transparent_0)] [background-size:14px_14px]" />
                        <div className="relative flex items-center justify-between">
                            <button
                                onClick={prevMonth}
                                aria-label="Mes anterior"
                                className="flex h-10 w-10 items-center justify-center rounded-sm border border-rose-200 bg-white/80 text-rose-800 transition-colors hover:bg-rose-100"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h3 className="text-2xl text-stone-900 font-wedding">
                                    {MONTHS[currentDate.getMonth()]}
                                </h3>
                                <p className="text-sm text-rose-700">{currentDate.getFullYear()}</p>
                            </div>
                            <button
                                onClick={nextMonth}
                                aria-label="Mes siguiente"
                                className="flex h-10 w-10 items-center justify-center rounded-sm border border-rose-200 bg-white/80 text-rose-800 transition-colors hover:bg-rose-100"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Days header */}
                    <div className="grid grid-cols-7 gap-1 p-4 pb-2">
                        {DAYS.map((day) => (
                            <div key={day} className="py-2 text-center text-sm font-medium text-rose-800">
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
                  relative flex aspect-square items-center justify-center rounded-sm text-sm
                  transition-all duration-300
                  ${day ? "cursor-pointer hover:bg-rose-50" : ""}
                  ${isEventDay(day || 0) ? "bg-rose-700 text-white shadow-sm" : "text-stone-800"}
                  ${isToday(day || 0) && !isEventDay(day || 0) ? "border border-rose-400" : ""}
                `}
                            >
                                {day}
                                {isEventDay(day || 0) && (
                                    <Star className="absolute -right-1 -top-1 h-4 w-4 fill-rose-300 text-rose-500" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Event info */}
                    <div className="border-t border-rose-100 p-6 pt-4 text-center">
                        <p className="text-sm text-muted-foreground">
                            ¡No olvides marcar el
                        </p>
                        <p
                            className="mt-1 text-2xl text-rose-800"
                            style={{ fontFamily: 'var(--font-great-vibes)' }}
                        >
                            15 de Agosto de 2026
                        </p>
                    </div>
                    <div aria-hidden="true" className="h-3 bg-[radial-gradient(ellipse_at_top,rgba(244,204,216,0.9)_0%,rgba(244,204,216,0.9)_50%,transparent_52%)] [background-size:24px_12px]" />
                </div>

                {/* Add to calendar button */}
                <div className="mt-8 text-center">
                    <button className="inline-flex items-center gap-2 rounded-sm border border-rose-300 bg-white px-8 py-3 text-rose-800 shadow-sm transition-colors hover:bg-rose-50">
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
