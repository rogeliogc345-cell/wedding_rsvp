"use client"

import { Crown, Heart, Sparkles, Music, Gift, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0d1f3c] to-[#0a1628]" />
      
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Main content */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-[#87CEEB]" />
            <Crown className="w-10 h-10 text-[#FFD700]" />
            <Sparkles className="w-6 h-6 text-[#87CEEB]" />
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            ¡Te espero!
          </h3>
          <p className="text-[#87CEEB]/70 max-w-md mx-auto mb-8">
            Tu presencia es el mejor regalo que puedo recibir en este día tan especial
          </p>
          
          {/* Social links */}
          <div className="flex items-center justify-center gap-6 mb-10">
            <a
              href="#"
              className="p-3 rounded-full bg-[#1a3a6e]/50 border border-[#4169E1]/30 text-[#87CEEB] hover:text-[#FFD700] hover:border-[#FFD700]/50 transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-[#1a3a6e]/50 border border-[#4169E1]/30 text-[#87CEEB] hover:text-[#FFD700] hover:border-[#FFD700]/50 transition-all duration-300"
            >
              <Music className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-[#1a3a6e]/50 border border-[#4169E1]/30 text-[#87CEEB] hover:text-[#FFD700] hover:border-[#FFD700]/50 transition-all duration-300"
            >
              <Gift className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {/* Hashtag */}
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-3 rounded-full bg-[#4169E1]/20 border border-[#4169E1]/40">
            <span className="text-[#FFD700] tracking-wide">#MisXVValentina</span>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-[#87CEEB]/50">
          <p className="flex items-center gap-2">
            Hecho con <Heart className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" /> para un día inolvidable
          </p>
          <span className="hidden md:block">•</span>
          <p>XV Años de Valentina - 2025</p>
        </div>
      </div>
      
      {/* Floating decorations */}
      <div className="absolute bottom-10 left-10 opacity-10">
        <Crown className="w-32 h-32 text-[#FFD700]" />
      </div>
      <div className="absolute top-10 right-10 opacity-10">
        <Sparkles className="w-24 h-24 text-[#87CEEB]" />
      </div>
    </footer>
  )
}
