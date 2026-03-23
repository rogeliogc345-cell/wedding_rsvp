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

export default function ClassicTemplate({ customer, events, media }: Props) {
    const { primary_color, font_family } = customer.template_config;
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

    console.log(photos);
    console.log(song);

    return (
        <main style={{ fontFamily: font_family }} className="min-h-screen bg-stone-50">

            {/* 🎧 Audio Player Elegante */}
      {song && (
        <>
          {/* Audio oculto */}
          <audio ref={audioRef} src={song.file_url} loop />

          {/* Botón flotante */}
          <button
            onClick={toggleMusic}
            className="
  fixed bottom-6 right-6 z-50
  w-16 h-16 rounded-full
  bg-gradient-to-br from-rose-200/40 to-pink-300/30
  backdrop-blur-lg
  border border-white/40
  shadow-xl
  flex items-center justify-center
  transition-all duration-300
  hover:scale-110 hover:shadow-2xl
"
            
            // "
            //   fixed bottom-6 right-6 z-50
            //   w-16 h-16 rounded-full
            //    backdrop-blur-lg
            //   border 
            //   shadow-xl
            //   flex items-center justify-center
            //   transition-all duration-100
            //   hover:scale-110 hover:bg-white/50 bg-rose-200/40 border-rose-300/40
            // "
          >
            {isPlaying ? (
                <>
                <Music4 className="w-6 h-6 text-gray-800" />
                 


                </>
              

            ) : (
              <HeartHandshake className="w-6 h-6 text-gray-800 ml-1" />
              
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
                        alt="Wedding photo"
                    />
                ))}
            </section>






            <section className="h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-6xl mb-4" style={{ color: primary_color }}>
                    {customer.couple_name}
                </h1>
                <p className="text-xl uppercase tracking-widest">Are getting married</p>
            </section>

            <section className="max-w-2xl mx-auto py-20 px-4">
                <h2 className="text-3xl mb-8 text-center">The Events</h2>
                {events.map((event) => (
                    <div key={event.id} className="mb-8 border-l-2 pl-6" style={{ borderColor: primary_color }}>
                        <h3 className="font-bold text-xl">{event.event_name}</h3>
                        <p>{event.event_date} @ {event.event_time}</p>
                        <p className="text-muted-foreground">{event.location_name}</p>
                    </div>
                ))}
            </section>



            {/* 5. RSVP Section */}
            <section className="bg-stone-100 py-24 px-6">
                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-4xl font-serif italic mb-4">Confirma tu asistencia!</h2>
                    <p className="text-stone-500 mb-10">
                        Déjanos saber si puedes acompañarnos llenado el RSVP.
                    </p>

                    {/* Pass the customer ID so the RSVP links to this specific wedding */}
                    <RSVPForm customerId={customer.id} />
                </div>
            </section>
        </main>
    );
}