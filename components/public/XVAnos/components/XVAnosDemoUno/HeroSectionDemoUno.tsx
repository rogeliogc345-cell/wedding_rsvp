"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import Image from "next/image"

export function HeroSectionDemoUno() {
    const [isMuted, setIsMuted] = useState(true)

    return (
        <section className="bg-[url('/hanni/fondo_moños.png')] bg-cover bg-center  relative min-h-screen flex flex-col items-center justify-center h-screen  ">
            {/* Floating sparkles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-gold rounded-full animate-sparkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Sound toggle button */}
            <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-primary hover:scale-105 transition-transform"
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center px-4 pt-16 pb-8 ">
                {/* Circular photo frame with gold border */}
                <div className="relative animate-float">
                    {/* Outer gold ring */}
                    <div className="absolute -inset-3 rounded-full gold-border opacity-80" />
                    {/* Inner gold ring */}
                    <div className="absolute -inset-1 rounded-full gold-border" />
                    {/* Photo container */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gold shadow-2xl">
                        <Image
                            src="/hanni/hani8.jpeg"
                            alt="Quinceañera Valentina"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>
                </div>

                {/* Event type */}
                <p className="mt-10 font-parisienneSans text-5xl md:text-6xl tracking-[0.3em] text-muted-foreground uppercase">
                    Mis XV Años
                </p>

                {/* Name */}
                <h1
                    className="font-savoir  mt-2 text-7xl md:text-9xl text-primary"
                // style={{ fontFamily: 'var(--font-great-vibes)' }}

                >
                    Valentina
                </h1>

                {/* Decorative line */}
                <div className="mt-4 flex items-center gap-4">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                    <div className="w-2 h-2 rotate-45 bg-gold" />
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                </div>

                {/* Date teaser */}
                <p className="mt-6 text-muted-foreground tracking-widest text-sm">
                    15 de Agosto, 2026
                </p>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                <span className="text-xs text-muted-foreground tracking-wider">Desliza</span>
                <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
                    <div className="w-1.5 h-3 rounded-full bg-primary/50" />
                </div>
            </div>
        </section>
    )
}
