"use client"

import { Church, PartyPopper, UtensilsCrossed, Music, Cake, Camera } from "lucide-react"

const itineraryItems = [
    {
        time: "5:00 PM",
        title: "Misa de Acción de Gracias",
        description: "Ceremonia religiosa en la Iglesia de San Pedro",
        icon: Church,
    },
    {
        time: "6:30 PM",
        title: "Recepción de Invitados",
        description: "Bienvenida y coctel en el salón",
        icon: PartyPopper,
    },
    {
        time: "7:00 PM",
        title: "Cena",
        description: "Disfruta de una deliciosa cena de gala",
        icon: UtensilsCrossed,
    },
    {
        time: "8:00 PM",
        title: "Vals & Ceremonias",
        description: "El vals de la quinceañera y ceremonias especiales",
        icon: Music,
    },
    {
        time: "9:00 PM",
        title: "Pastel & Brindis",
        description: "Partida de pastel y brindis con los invitados",
        icon: Cake,
    },
    {
        time: "10:00 PM",
        title: "Fiesta & Baile",
        description: "¡A bailar toda la noche!",
        icon: Camera,
    },
]

export function ItinerarySectionDemoUno() {
    return (
        <section id="itinerary" className="py-20 px-4  bg-[url('/hanni/fondo_moños.png')] bg-contains bg-top bg-fixed">
            <div className="max-w-4xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16">
                    <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-2">
                        Programa del
                    </p>
                    <h2
                        className="text-5xl md:text-8xl text-primary font-wedding"

                    >
                        Evento
                    </h2>
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                        <div className="w-2 h-2 rotate-45 bg-gold" />
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-primary to-gold" />

                    {itineraryItems.map((item, index) => (
                        <div
                            key={item.title}
                            className={`relative flex items-center gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Content card */}
                            <div className={`flex-1 ml-20 md:ml-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                                <div className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-shadow">
                                    <span
                                        className="text-2xl text-gold"

                                    >
                                        {item.time}
                                    </span>
                                    <h3 className="text-3xl font-semibold text-foreground mt-2 font-wedding ">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground mt-1">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Icon circle */}
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-card border-4 border-gold shadow-lg flex items-center justify-center z-10">
                                <item.icon className="w-6 h-6 text-primary" />
                            </div>

                            {/* Empty space for alternating layout on desktop */}
                            <div className="hidden md:block flex-1" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
