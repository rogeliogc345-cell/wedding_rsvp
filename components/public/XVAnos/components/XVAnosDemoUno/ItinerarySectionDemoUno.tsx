"use client"

import { Church, PartyPopper, UtensilsCrossed, Music, Cake, Camera } from "lucide-react"
import { getEventIcon } from "@/lib/icons"


type EventItem = {
    event_name: string;
    event_date: string;
    event_time: string;
    icon?: React.ElementType;
    location_name: string;
    address?: string;
    google_maps_url?: string;
}

type ItinerarySectionDemoUnoProps = {
    events?: EventItem[] | { events: EventItem[] };
}

export function ItinerarySectionDemoUno({ events: eventsProp }: ItinerarySectionDemoUnoProps) {
    const itineraryEvents = Array.isArray(eventsProp) ? eventsProp : eventsProp?.events ?? [];

    const parseTimeToMinutes = (timeValue: string) => {
        const match = timeValue.trim().match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);

        if (!match) return 0;

        let hours = Number(match[1]);
        const minutes = Number(match[2] || 0);
        const meridiem = match[3]?.toLowerCase();

        if (meridiem === "pm" && hours < 12) hours += 12;
        if (meridiem === "am" && hours === 12) hours = 0;

        return hours * 60 + minutes;
    };

    const parseDateValue = (dateValue: string) => {
        const normalized = dateValue.trim();
        const dateMatch = normalized.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);

        if (dateMatch) {
            const [, year, month, day] = dateMatch;
            return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
        }

        const parsedDate = new Date(normalized);
        return Number.isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime();
    };

    const sortedEvents = [...itineraryEvents].sort((a, b) => {
        const dateComparison = parseDateValue(a.event_date) - parseDateValue(b.event_date);

        if (dateComparison !== 0) return dateComparison;

        return parseTimeToMinutes(a.event_time) - parseTimeToMinutes(b.event_time);
    });

    console.log("customer events", sortedEvents);
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

                    {sortedEvents.map((item, index) => {
                        const IconComponent = getEventIcon(typeof item.icon === 'string' ? item.icon : undefined);

                        return (
                            <div
                                key={item.event_name}
                                className={`relative flex items-center gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Content card */}
                                <div className={`flex-1 ml-20 md:ml-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                                    <div className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-shadow">
                                        <span
                                            className="text-2xl text-gold"

                                        >
                                            {item.event_time}
                                        </span>
                                        <h3 className="text-3xl font-semibold text-foreground mt-2 font-wedding ">
                                            {item.event_name}
                                        </h3>
                                        <p className="text-muted-foreground mt-1">
                                            {item.event_date} • {item.location_name}
                                        </p>
                                    </div>
                                </div>

                                {/* Icon circle */}
                                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-card border-4 border-gold shadow-lg flex items-center justify-center z-10">
                                    <IconComponent className="w-6 h-6 text-primary" />
                                </div>

                                {/* Empty space for alternating layout on desktop */}
                                <div className="hidden md:block flex-1" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
