"use client"

import React from "react"
import { Calendar, Clock, MapPin, Church, PartyPopper, Crown, Music, Utensils, GlassWater, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type Event = {
  icon?: any;
  color?: string;
  address: string | null
  event_date: string
  event_name: string
  event_time: string
  location_name: string
  google_maps_url: string | null
}

const COLORS = [
  "from-[#4169E1] to-[#1a3a6e]",
  "from-[#FFD700] to-[#B8860B]",
  "from-[#87CEEB] to-[#4169E1]"
]

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  church: Church,
  partypopper: PartyPopper,
  party: PartyPopper,
  music: Music,
  utensils: Utensils,
  food: Utensils,
  glasswater: GlassWater,
  drink: GlassWater,
  crown: Crown,
  heart: Heart,
  calendar: Calendar,
  clock: Clock,
  mappin: MapPin,
}

function renderIcon(iconName: any, className: string) {
  if (typeof iconName === 'function') {
    const IconComponent = iconName;
    return <IconComponent className={className} />;
  }

  if (React.isValidElement(iconName)) {
    return iconName;
  }

  // 1. Normalize and clean the string (lowercase, strip accents/diacritics, remove spaces/punctuation for key lookup)
  const rawString = typeof iconName === 'string' ? iconName : '';
  
  // Remove accents: "Recepción" -> "recepcion"
  const normalized = rawString
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  // Strip all non-alphanumeric chars for key lookup: "party-popper" -> "partypopper"
  const cleanLookupKey = normalized.replace(/[^a-z0-9]/g, "");

  // 2. Try exact lookup in the ICON_MAP
  const MappedIcon = ICON_MAP[cleanLookupKey];
  if (MappedIcon) {
    return <MappedIcon className={className} />;
  }

  // 3. Fallback to keyword matching within the normalized string
  if (
    normalized.includes('church') || 
    normalized.includes('misa') || 
    normalized.includes('ceremonia') || 
    normalized.includes('ceremony') || 
    normalized.includes('religiosa') ||
    normalized.includes('templo') ||
    normalized.includes('parroquia')
  ) {
    return <Church className={className} />;
  }
  
  if (
    normalized.includes('party') || 
    normalized.includes('recepcion') || 
    normalized.includes('reception') || 
    normalized.includes('fiesta') || 
    normalized.includes('celebracion') ||
    normalized.includes('salon')
  ) {
    return <PartyPopper className={className} />;
  }
  
  if (
    normalized.includes('music') || 
    normalized.includes('dance') || 
    normalized.includes('baile') || 
    normalized.includes('vals') || 
    normalized.includes('dj') ||
    normalized.includes('pista')
  ) {
    return <Music className={className} />;
  }
  
  if (
    normalized.includes('food') || 
    normalized.includes('dinner') || 
    normalized.includes('cena') || 
    normalized.includes('comida') || 
    normalized.includes('banquete') ||
    normalized.includes('platillo')
  ) {
    return <Utensils className={className} />;
  }
  
  if (
    normalized.includes('toast') || 
    normalized.includes('brindis') || 
    normalized.includes('copa') || 
    normalized.includes('bebida') ||
    normalized.includes('coctel')
  ) {
    return <GlassWater className={className} />;
  }
  
  if (
    normalized.includes('crown') || 
    normalized.includes('corona') || 
    normalized.includes('quince') ||
    normalized.includes('presentacion')
  ) {
    return <Crown className={className} />;
  }

  // Final fallback icon
  return <PartyPopper className={className} />;
}

export function EventDetails({ events }: { events: Event[] }) {
  console.log("events", events)

  const firstEventDate = events?.[0]?.event_date;
  let day = "15";
  let monthYear = "Noviembre 2025";
  
  if (firstEventDate) {
    try {
      const dateObj = new Date(firstEventDate + "T00:00:00");
      if (!isNaN(dateObj.getTime())) {
        day = dateObj.getDate().toString();
        const months = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        monthYear = `${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
      }
    } catch (e) {
      console.error(e);
    }
  }

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
              <p className="text-4xl md:text-6xl font-bold text-foreground mb-2">{day}</p>
              <p className="text-2xl md:text-3xl text-[#FFD700] font-light tracking-wide">{monthYear}</p>
            </div>
          </div>
        </div>

        {/* Event cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events?.map((event, index) => {
            const eventColor = event.color || COLORS[index % COLORS.length];
            const eventIcon = event.icon || event.event_name;
            
            return (
              <Card
                key={index}
                className="bg-[#1a3a6e]/30 backdrop-blur-sm border-[#4169E1]/20 overflow-hidden group hover:border-[#FFD700]/40 transition-all duration-500"
              >
                <div className={`h-2 bg-gradient-to-r ${eventColor}`} />
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${eventColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {renderIcon(eventIcon, "w-8 h-8 text-white")}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4">{event.event_name}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[#87CEEB]">
                          <Clock className="w-5 h-5 text-[#FFD700]" />
                          <span className="text-lg">{event.event_time}</span>
                        </div>
                        <div className="flex items-start gap-3 text-[#87CEEB]/80">
                          <MapPin className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-white">{event.location_name}</p>
                            <p className="text-sm">{event.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  )
}
