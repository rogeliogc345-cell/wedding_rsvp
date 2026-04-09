"use client"

import { MapPin, Clock, Calendar, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

const venues = [
    {
        type: "Ceremonia Religiosa",
        name: "Iglesia de San Pedro",
        address: "Calle Principal #123, Centro Histórico",
        time: "5:00 PM",
        mapUrl: "https://maps.google.com/?q=Iglesia+San+Pedro",
    },
    {
        type: "Recepción",
        name: "Salón Royal Garden",
        address: "Av. Las Flores #456, Jardines del Valle",
        time: "6:30 PM",
        mapUrl: "https://maps.google.com/?q=Salon+Royal+Garden",
    },
]

export function LocationSectionDemoUno() {
    return (
        <section id="location" className="py-20 px-4 bg-blush">
            <div className="max-w-5xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16">
                    <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-2">
                        Te esperamos en
                    </p>
                    <h2
                        className="text-5xl md:text-8xl text-primary font-wedding"

                    >
                        Lugar y Fecha
                    </h2>
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                        <div className="w-2 h-2 rotate-45 bg-gold" />
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                    </div>
                </div>

                {/* Date banner */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-4 bg-card px-8 py-4 rounded-full shadow-lg border border-gold/30">
                        <Calendar className="w-6 h-6 text-gold" />
                        <span className="text-xl md:text-2xl font-light text-foreground">
                            Sábado, 15 de Agosto de 2026
                        </span>
                    </div>
                </div>

                {/* Venue cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {venues.map((venue) => (
                        <div
                            key={venue.name}
                            className="bg-card rounded-3xl overflow-hidden shadow-xl border border-border hover:shadow-2xl transition-all group"
                        >
                            {/* Map placeholder */}
                            <div className="relative h-48 bg-gradient-to-br from-rose-light to-blush flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-[url('/map-pattern.png')] opacity-20" />
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-card shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <MapPin className="w-8 h-8 text-primary" />
                                    </div>
                                </div>
                                {/* Decorative circles */}
                                <div className="absolute w-32 h-32 rounded-full border border-gold/20 top-4 -left-8" />
                                <div className="absolute w-24 h-24 rounded-full border border-primary/20 -bottom-4 right-8" />
                            </div>

                            {/* Content */}
                            <div className="p-6 text-center">
                                <p className="text-sm tracking-widest text-gold uppercase mb-2">
                                    {venue.type}
                                </p>
                                <h3
                                    className="text-5xl text-primary mb-4 font-wedding"

                                >
                                    {venue.name}
                                </h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                        <MapPin className="w-4 h-4 text-gold" />
                                        <span className="text-sm">{venue.address}</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                        <Clock className="w-4 h-4 text-gold" />
                                        <span className="text-sm">{venue.time}</span>
                                    </div>
                                </div>

                                <Button
                                    asChild
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
                                >
                                    <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer">
                                        <Navigation className="w-4 h-4 mr-2" />
                                        Cómo Llegar
                                    </a>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
