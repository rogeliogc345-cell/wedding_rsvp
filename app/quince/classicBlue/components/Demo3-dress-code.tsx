"use client"

import { Crown, Shirt, Ban, Sparkles } from "lucide-react"





export function DressCode({ customer_color_preferences }: { customer_color_preferences: any }) {
  const { suggested = [], forbidden = [] } = customer_color_preferences ?? {}
  console.log("suggested", suggested)
  console.log("forbidden", forbidden)

  // Normalize colors to objects with { name, color }
  const allowedColors = (suggested || []).map((item: any) => {
    if (!item) return { name: 'Desconocido', color: '#777' }
    if (typeof item === 'string') return { name: item, color: item }
    return { name: item.name ?? item.color ?? 'Color', color: item.color ?? item.name }
  })

  const restrictedColors = (forbidden || []).map((item: any) => {
    if (!item) return { name: 'Reservado', color: '#ff0000' }
    if (typeof item === 'string') return { name: item, color: item }
    return { name: item.name ?? item.color ?? 'Reservado', color: item.color ?? item.name ?? '#ff0000' }
  })
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628]" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#FFD700]" />
            <Shirt className="w-8 h-8 text-[#FFD700]" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#FFD700]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Código de Vestimenta
          </h2>
          <p className="text-[#87CEEB]/70 text-lg max-w-md mx-auto">
            Elegancia formal para una noche mágica
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a3a6e]/30 backdrop-blur-sm border border-[#4169E1]/20 rounded-3xl p-8 md:p-12">
            {/* Formal attire badge */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#4169E1]/20 border border-[#4169E1]/40">
                <Crown className="w-5 h-5 text-[#FFD700]" />
                <span className="text-lg text-white tracking-wide">Etiqueta Formal</span>
                <Sparkles className="w-5 h-5 text-[#FFD700]" />
              </div>
            </div>

            {/* Allowed colors */}
            <div className="mb-10">
              <h3 className="text-xl text-[#87CEEB] mb-6 text-center font-light tracking-wide">
                Paleta de Colores Sugerida
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {allowedColors.map((item: any, index: number) => (
                  <div key={index} className="flex flex-col items-center gap-3 group">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-[#FFD700]/30 shadow-lg group-hover:scale-110 group-hover:border-[#FFD700]/60 transition-all duration-300"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-[#87CEEB]/80">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#4169E1]/40 to-transparent" />
            </div>

            {/* Restricted color */}
            <div>
              <h3 className="text-xl text-[#87CEEB] mb-6 text-center font-light tracking-wide">
                Color Reservado para la Quinceañera
              </h3>
              <div className="flex justify-center">
                <div className="flex flex-wrap justify-center gap-6">
                  {restrictedColors.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col items-center gap-3 group">
                      <div className="relative">
                        <div
                          className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-red-400/50 shadow-lg"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Ban className="w-12 h-12 text-red-400/80" />
                        </div>
                      </div>
                      <span className="text-sm text-red-400/80">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-center text-[#87CEEB]/60 text-sm mt-4">
                Por favor evitar este color, es exclusivo para la festejada
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
