"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Church, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EventDetailsDemo2() {
  const events = [
    {
      icon: Church,
      title: "CEREMONIA",
      time: "5:00 PM",
      location: "Parroquia San José",
      address: "Av. Principal #123, Centro",
      mapUrl: "https://maps.google.com",
    },
    {
      icon: PartyPopper,
      title: "RECEPCIÓN",
      time: "7:00 PM",
      location: "Salón Imperial",
      address: "Blvd. Las Flores #456",
      mapUrl: "https://maps.google.com",
    },
  ]

  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm tracking-[0.3em] text-xvgreen-text mb-4">DETALLES</h2>
          <p className="text-4xl md:text-5xl font-serif text-white">El Gran Día</p>
        </motion.div>

        {/* Date banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-8 mb-16"
        >
          <div className="hidden md:block h-px flex-1 bg-border" />
          <div className="flex items-center gap-6 px-8 py-4 border border-primary/30 rounded-full">
            <Calendar className="w-5 h-5 text-primary text-xvgreen-text" />
            <span className="text-lg tracking-wider text-white">Sábado 21 de Junio, 2025</span>
          </div>
          <div className="hidden md:block h-px flex-1 bg-border" />
        </motion.div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative bg-black border border-border rounded-2xl p-8 md:p-12 overflow-hidden transition-all duration-500 hover:border-primary/50">
                {/* Background decoration */}
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 mb-6">
                    <event.icon className="w-7 h-7 text-primary text-xvgreen-text" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-6 text-white">{event.title}</h3>

                  {/* Details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary text-xvgreen-text" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-xvgreen-text mt-1" />
                      <div>
                        <p className="text-white font-medium">{event.location}</p>
                        <p className="text-sm">{event.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Map button */}
                  <Button

                    className="bg-black border-xvgreen-border text-xvgreen-text hover:bg-primary hover:text-primary-foreground transition-all"
                    onClick={() => window.open(event.mapUrl, "_blank")}
                  >
                    Ver en Mapa
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
