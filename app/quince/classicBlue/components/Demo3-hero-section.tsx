"use client"

import Image from "next/image"
import { Crown, Sparkles } from "lucide-react"

export function HeroSection({ name }: { name: string }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628]" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-30">
        <Crown className="w-16 h-16 text-[#FFD700] animate-float" style={{ animationDelay: "0s" }} />
      </div>
      <div className="absolute top-40 right-20 opacity-30">
        <Crown className="w-12 h-12 text-[#FFD700] animate-float" style={{ animationDelay: "1s" }} />
      </div>
      <div className="absolute bottom-40 left-20 opacity-30">
        <Sparkles className="w-10 h-10 text-[#87CEEB] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Text content */}
          <div className="text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a3a6e]/50 border border-[#4169E1]/30 mb-6">
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span className="text-sm tracking-widest uppercase text-[#87CEEB]">Invitación Especial</span>
            </div>

            <h2 className="text-xl md:text-2xl text-[#87CEEB] tracking-[0.3em] uppercase mb-4 font-light">
              Mis XV Años
            </h2>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-[#87CEEB] to-[#FFD700] bg-clip-text text-transparent leading-tight">
              {name}
            </h1>

            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFD700]" />
              <Crown className="w-8 h-8 text-[#FFD700]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFD700]" />
            </div>

            <p className="text-lg md:text-xl text-[#87CEEB]/80 leading-relaxed max-w-md mx-auto lg:mx-0">
              Te invito a celebrar conmigo una noche mágica donde los sueños se hacen realidad
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#evento"
                className="px-8 py-4 bg-[#4169E1] text-white rounded-full font-medium tracking-wide hover:bg-[#3158c9] transition-all duration-300 hover:shadow-[0_0_30px_rgba(65,105,225,0.5)] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Ver Invitación
              </a>
              <a
                href="#confirmar"
                className="px-8 py-4 border-2 border-[#FFD700] text-[#FFD700] rounded-full font-medium tracking-wide hover:bg-[#FFD700]/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Crown className="w-5 h-5" />
                Confirmar Asistencia
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#4169E1]/20 blur-3xl rounded-full" />
            <div className="relative w-[300px] h-[450px] md:w-[400px] md:h-[600px] rounded-t-full overflow-hidden border-4 border-[#FFD700]/30 shadow-[0_0_60px_rgba(65,105,225,0.3)]">
              <Image
                src="/XVAnos_2.png"
                alt="Vestido de quinceañera azul real"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
            </div>

            {/* Floating decorations around image */}
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center animate-float">
              <Crown className="w-6 h-6 text-[#FFD700]" />
            </div>
            <div className="absolute top-1/4 -left-6 w-10 h-10 rounded-full bg-[#4169E1]/30 flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
              <Sparkles className="w-5 h-5 text-[#87CEEB]" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs tracking-widest text-[#87CEEB]/60 uppercase">Descubre más</span>
        <div className="w-6 h-10 rounded-full border-2 border-[#87CEEB]/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-[#FFD700] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
