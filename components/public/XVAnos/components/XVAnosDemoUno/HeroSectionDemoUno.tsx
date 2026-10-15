"use client"

import { useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

function formatEventDate(eventDate?: string) {
    if (!eventDate) return "Próximamente"

    const normalizedDate = eventDate.split("T")[0]
    const dateParts = normalizedDate.match(/^(\d{4})[-/](\d{2})[-/](\d{2})$/)

    if (!dateParts) return eventDate

    const [, year, month, day] = dateParts
    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day))

    if (Number.isNaN(parsedDate.getTime())) return eventDate

    const monthName = parsedDate.toLocaleDateString("es-ES", { month: "long" })
    const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1)

    return `${parsedDate.getDate()} de ${formattedMonth}, ${parsedDate.getFullYear()}`
}

export function HeroSectionDemoUno({ name, eventDate }: { name?: string; eventDate?: string }) {
    const [isMuted, setIsMuted] = useState(true)
    const shouldReduceMotion = useReducedMotion()
    const formattedDate = formatEventDate(eventDate)
    const contentVariants = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: shouldReduceMotion ? 0 : 0.7, ease: "easeOut" as const },
        },
    }

    return (
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[url('/classic_xv/Classic_1.jpeg')] bg-cover bg-center px-4 py-24">
            {/* Floating sparkles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-2 w-2 rounded-full bg-gold"
                        style={{
                            left: `${(i * 37 + 11) % 100}%`,
                            top: `${(i * 61 + 9) % 90}%`,
                        }}
                        animate={shouldReduceMotion ? { opacity: 0.35 } : { opacity: [0.15, 0.8, 0.15], scale: [0.7, 1.15, 0.7] }}
                        transition={{ duration: 2.4, delay: (i % 7) * 0.22, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
                    />
                ))}
            </div>

            {/* Sound toggle button */}
            <motion.button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-card/80 text-primary shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.2 }}
            >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>

            {/* Main content */}
            <motion.div
                className="relative z-10 flex flex-col items-center"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.16, delayChildren: 0.1 }}
            >
                {/* Circular photo frame with gold border */}
                <motion.div className="relative" variants={{
                    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.92, y: shouldReduceMotion ? 0 : 12 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" } },
                }}>
                    {/* Outer gold ring */}
                    <div className="absolute -inset-3 rounded-full gold-border opacity-80" />
                    {/* Inner gold ring */}
                    <div className="absolute -inset-1 rounded-full gold-border" />
                    {/* Photo container */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gold shadow-2xl">
                        <Image
                            src="/classic_xv/Classic_1.jpeg"
                            alt="Quinceañera Valentina"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Event type */}
                <motion.p variants={contentVariants} className="mt-10 text-center font-parisienneSans text-4xl uppercase tracking-[0.2em] text-muted-foreground sm:text-5xl md:text-6xl md:tracking-[0.3em]">
                    Mis XV Años.
                </motion.p>

                {/* Name */}
                <motion.h1
                    variants={contentVariants}
                    className="mt-2 max-w-full break-words text-center font-savoir text-6xl text-primary sm:text-7xl md:text-9xl"
                // style={{ fontFamily: 'var(--font-great-vibes)' }}

                >
                    {name}
                </motion.h1>

                {/* Decorative line */}
                <motion.div variants={contentVariants} className="mt-4 flex items-center gap-4">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                    <div className="w-2 h-2 rotate-45 bg-gold" />
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                </motion.div>

                {/* Date teaser */}
                <motion.p variants={contentVariants} className="mt-6 text-sm tracking-widest text-muted-foreground">
                    {formattedDate}
                </motion.p>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, 6, 0] }}
                transition={shouldReduceMotion ? { duration: 0 } : { opacity: { duration: 0.6, delay: 1 }, y: { duration: 1.8, delay: 1, repeat: Infinity, ease: "easeInOut" } }}
            >
                <span className="text-xs text-muted-foreground tracking-wider">Desliza</span>
                <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
                    <div className="w-1.5 h-3 rounded-full bg-primary/50" />
                </div>
            </motion.div>
        </section>
    )
}
