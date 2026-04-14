"use client"

import { useState } from "react"
import { Crown, Send, Sparkles, Heart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function RSVPForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    guests: "1",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="confirmar" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#1a3a6e] to-[#0a1628]" />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-[#1a3a6e]/50 backdrop-blur-sm border border-[#FFD700]/30 rounded-3xl p-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#4169E1]/30 flex items-center justify-center">
                <Check className="w-10 h-10 text-[#FFD700]" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">¡Gracias!</h3>
              <p className="text-[#87CEEB] mb-6">
                Tu confirmación ha sido recibida. ¡Nos vemos en la fiesta!
              </p>
              <div className="flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-[#FFD700] animate-pulse" />
                <Sparkles className="w-5 h-5 text-[#87CEEB] animate-pulse" style={{ animationDelay: "0.5s" }} />
                <Heart className="w-5 h-5 text-[#FFD700] animate-pulse" style={{ animationDelay: "1s" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="confirmar" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#1a3a6e] to-[#0a1628]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 opacity-20">
        <Crown className="w-24 h-24 text-[#FFD700] animate-float" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-20">
        <Sparkles className="w-16 h-16 text-[#87CEEB] animate-float" style={{ animationDelay: "1s" }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#FFD700]" />
            <Send className="w-8 h-8 text-[#FFD700]" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#FFD700]" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Confirma tu Asistencia
          </h2>
          <p className="text-[#87CEEB]/70 text-lg max-w-md mx-auto">
            Tu presencia hará de esta noche algo inolvidable
          </p>
        </div>
        
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-[#1a3a6e]/30 backdrop-blur-sm border border-[#4169E1]/20 rounded-3xl p-8 md:p-10">
            <div className="space-y-6">
              <div>
                <label className="block text-[#87CEEB] mb-2 text-sm tracking-wide">
                  Nombre Completo
                </label>
                <Input
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#0d1f3c]/50 border-[#4169E1]/30 text-foreground placeholder:text-[#87CEEB]/40 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20 rounded-xl py-6"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[#87CEEB] mb-2 text-sm tracking-wide">
                  Número de Invitados
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-[#0d1f3c]/50 border border-[#4169E1]/30 text-foreground rounded-xl py-3 px-4 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num} className="bg-[#0d1f3c]">
                      {num} {num === 1 ? "persona" : "personas"}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-[#87CEEB] mb-2 text-sm tracking-wide">
                  Mensaje para la Quinceañera (opcional)
                </label>
                <Textarea
                  placeholder="Escribe un mensaje especial..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-[#0d1f3c]/50 border-[#4169E1]/30 text-foreground placeholder:text-[#87CEEB]/40 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20 rounded-xl min-h-[120px]"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#4169E1] to-[#1a3a6e] hover:from-[#3158c9] hover:to-[#153057] text-white py-6 rounded-xl font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(65,105,225,0.4)] flex items-center justify-center gap-3"
              >
                <Send className="w-5 h-5" />
                Confirmar Asistencia
                <Sparkles className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
