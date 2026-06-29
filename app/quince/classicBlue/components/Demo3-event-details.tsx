"use client"

import { Calendar, Clock, MapPin, Church, PartyPopper, Crown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const eventCards = [
  {
    icon: Church,
    title: "Ceremonia Religiosa",
    time: "4:00 PM",
    location: "Parroquia Santa María",
    address: "Av. Principal #123, Centro",
    color: "from-[#4169E1] to-[#1a3a6e]",
  },
  {
    icon: PartyPopper,
    title: "Recepción",
    time: "7:00 PM",
    location: "Salón Crystal Palace",
    address: "Blvd. de los Sueños #456",
    color: "from-[#FFD700] to-[#B8860B]",
  },
]

export function EventDetails() {
  return (
    <section id="evento" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628]" />

      {/* Decorative line */}
      <div className="absolute left-1/2 top-0 w-px h-24 bg-gradient-to-b from-transparent via-[#FFD700] to-transparent" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#FFD700]" />
            <Crown className="w-8 h-8 text-[#FFD700]" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#FFD700]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Detalles del Evento
          </h2>
          <p className="text-[#87CEEB]/70 text-lg max-w-md mx-auto">
            Acompáñame en esta celebración especial
          </p>
        </div>

        {/* Date highlight */}
        <div className="flex flex-col items-center mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-[#4169E1]/20 blur-2xl rounded-full" />
            <div className="relative bg-[#1a3a6e]/50 backdrop-blur-sm border border-[#4169E1]/30 rounded-2xl px-12 py-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-[#FFD700]" />
                <span className="text-sm tracking-widest uppercase text-[#87CEEB]">Fecha</span>
              </div>
              <p className="text-4xl md:text-6xl font-bold text-foreground mb-2">15</p>
              <p className="text-2xl md:text-3xl text-[#FFD700] font-light tracking-wide">Noviembre 2025</p>
            </div>
          </div>
        </div>

        {/* Event cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {eventCards.map((event, index) => (
            <Card
              key={index}
              className="bg-[#1a3a6e]/30 backdrop-blur-sm border-[#4169E1]/20 overflow-hidden group hover:border-[#FFD700]/40 transition-all duration-500"
            >
              <div className={`h-2 bg-gradient-to-r ${event.color}`} />
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${event.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <event.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">{event.title}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[#87CEEB]">
                        <Clock className="w-5 h-5 text-[#FFD700]" />
                        <span className="text-lg">{event.time}</span>
                      </div>
                      <div className="flex items-start gap-3 text-[#87CEEB]/80">
                        <MapPin className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-white">{event.location}</p>
                          <p className="text-sm">{event.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
