'use client'
import { Customer, WeddingEvent } from "@/types/database";
import { RSVPForm } from "../public/RSVPForm";
import { useRef, useState } from "react";
import { HeartHandshake, Music4 } from "lucide-react"

interface MediaItem {
  id: string;
  file_url: string;
  file_type: "image" | "audio";
  is_hero: boolean;
}


interface Props {
  customer: Customer;
  events: WeddingEvent[];
  media: MediaItem[];
}

export default function XVTemplate({ customer, events, media }: Props) {
  const { primary_color, font_family } = customer.template_config;
  const template = customer.template ?? customer.template_id ?? "classic";

  // Filter media by type
  const photos = media?.filter((m: any) => m.file_type === 'image');
  const song = media?.find((m: any) => m.file_type === 'audio');
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  // Dynamic theme settings based on selected template
  let bgClass = "bg-stone-50 text-stone-900";
  let buttonClass = "bg-gradient-to-br from-rose-200/40 to-pink-300/30 border-white/40 text-gray-800";
  let rsvpBgClass = "bg-stone-100";
  let rsvpTextClass = "text-stone-500 mb-10";
  let primaryColorOverride = primary_color;

  if (template === "clasicBlue") {
    bgClass = "bg-[#0a1628] text-slate-100";
    buttonClass = "bg-gradient-to-br from-blue-900/40 to-sky-700/30 border-blue-500/40 text-white";
    rsvpBgClass = "bg-[#10223b]";
    rsvpTextClass = "text-slate-400 mb-10";
    if (!primaryColorOverride || primaryColorOverride === "#7c3aed") {
      primaryColorOverride = "#38bdf8"; // Sky Blue
    }
  } else if (template === "modern") {
    bgClass = "bg-zinc-950 text-zinc-50";
    buttonClass = "bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700 text-zinc-100";
    rsvpBgClass = "bg-zinc-900";
    rsvpTextClass = "text-zinc-400 mb-10";
    if (!primaryColorOverride || primaryColorOverride === "#7c3aed") {
      primaryColorOverride = "#10b981"; // Emerald Green
    }
  }

  console.log(photos);
  console.log(song);

  return (
    <main style={{ fontFamily: font_family }} className={`min-h-screen ${bgClass}`}>

      {/* 🎧 Audio Player Elegante */}
      {song && (
        <>
          {/* Audio oculto */}
          <audio ref={audioRef} src={song.file_url} loop />

          {/* Botón flotante */}
          <button
            onClick={toggleMusic}
            className={`
              fixed bottom-6 right-6 z-50
              w-16 h-16 rounded-full
              backdrop-blur-lg
              shadow-xl
              flex items-center justify-center
              transition-all duration-300
              hover:scale-110 hover:shadow-2xl
              ${buttonClass}
            `}
          >
            {isPlaying ? (
              <Music4 className="w-6 h-6" />
            ) : (
              <HeartHandshake className="w-6 h-6 ml-1" />
            )}
          </button>

          {/* Animación romántica */}
          {isPlaying && (
            <div className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-rose-300/30 animate-ping z-40"></div>
          )}
        </>
      )}

      {/* Hero Gallery */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
        {photos?.map((photo: any) => (
          <img
            key={photo.id}
            src={photo.file_url}
            className="w-full h-[400px] object-cover rounded-md"
            alt="XV photo"
          />
        ))}
      </section>

      <section className="h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-6xl mb-4 font-serif" style={{ color: primaryColorOverride }}>
          {customer.couple_name}
        </h1>
        <p className="text-xl uppercase tracking-widest text-muted-foreground">Mis XV Años</p>
      </section>

      <section className="max-w-2xl mx-auto py-20 px-4">
        <h2 className="text-3xl mb-8 text-center">Eventos</h2>
        {events.map((event) => (
          <div key={event.id} className="mb-8 border-l-2 pl-6" style={{ borderColor: primaryColorOverride }}>
            <h3 className="font-bold text-xl">{event.event_name}</h3>
            <p>{event.event_date} @ {event.event_time}</p>
            <p className="opacity-80">{event.location_name}</p>
          </div>
        ))}
      </section>

      {/* 5. RSVP Section */}
      <section className={`py-24 px-6 ${rsvpBgClass}`}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-serif italic mb-4">Confirma tu asistencia!</h2>
          <p className={rsvpTextClass}>
            Déjanos saber si puedes acompañarnos llenado el RSVP.
          </p>

          {/* Pass the customer ID so the RSVP links to this specific wedding */}
          <RSVPForm customerId={customer.id} />
        </div>
      </section>
    </main>
  );
}