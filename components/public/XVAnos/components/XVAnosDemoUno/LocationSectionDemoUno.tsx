"use client"

import { MapPin, Clock, Calendar, Navigation, Crown } from "lucide-react"
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
                            className="group overflow-hidden rounded-sm border border-rose-200 bg-white p-2 shadow-md transition-shadow hover:shadow-lg"
                        >
                            <div className="overflow-hidden border border-rose-100">
                                {/* Map placeholder */}
                                <div className="relative flex h-40 items-center justify-center overflow-hidden bg-rose-50">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(190,95,130,0.18)_1px,transparent_0)] [background-size:14px_14px]" />
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-rose-200 bg-white/90 shadow-sm transition-transform group-hover:scale-105">
                                            <MapPin className="h-7 w-7 text-rose-700" />
                                        </div>
                                    </div>
                                    <div className="absolute left-[-2rem] top-4 h-32 w-32 rounded-full border border-rose-300/40" />
                                    <div className="absolute bottom-[-1rem] right-8 h-24 w-24 rounded-full border border-rose-300/40" />
                                </div>

                                {/* Content */}
                                <div className="border-t border-rose-100 px-6 py-7 text-center">
                                    <p className="mb-3 text-sm uppercase tracking-widest text-rose-700">
                                        {venue.type}
                                    </p>
                                    <Crown className="mx-auto mb-2 h-5 w-5 text-rose-400" strokeWidth={1.5} />
                                    <h3
                                        className="mb-4 text-5xl text-stone-900 font-wedding"

                                    >
                                        {venue.name}
                                    </h3>

                                    <div className="mb-6 space-y-3">
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                            <MapPin className="h-4 w-4 text-rose-600" />
                                            <span className="text-sm">{venue.address}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                            <Clock className="h-4 w-4 text-rose-600" />
                                            <span className="text-sm">{venue.time}</span>
                                        </div>
                                    </div>

                                    <Button
                                        asChild
                                        className="rounded-sm border border-rose-300 bg-white px-6 text-rose-800 hover:bg-rose-50"
                                    >
                                        <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer">
                                            <Navigation className="mr-2 h-4 w-4" />
                                            Cómo Llegar
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
