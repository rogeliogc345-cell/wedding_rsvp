'use client'
import XVHeroComponent from '@/components/public/XVAnos/components/HeroComponent'
import React, { Suspense, useRef, useState } from 'react'
import AboutMe from './AboutMeQuinceañera'
import ItineraryQuinceanera from '@/components/public/XVAnos/components/ItineraryQuinceanera';
import { EventLocations as EventLocationQuinceanera } from '@/components/public/XVAnos/components/LocationQuinceanera';
import { Photo, PhotoGalleryQuinceañera } from '@/components/public/XVAnos/components/photoGallery';
import { Clock, Music, Utensils, Camera, Sparkles, Music4, HeartHandshake, Flower } from "lucide-react";
import { GiftRegistryMinimal } from '@/components/public/XVAnos/components/GiftsQuinceanera';
import { GiftRegistryQuinceanera } from '@/components/public/XVAnos/components/GiftQuienceanera1';
import FooterQuinceanera from '@/components/public/XVAnos/components/Header';
import { RSVPForm } from '@/components/public/RSVPForm';
import { Customer } from '@/types/database';
import { WelcomeDialog } from '@/components/public/XVAnos/components/WelcomeDialog';
import HanniSobresDinero from '@/components/public/XVAnos/components/HanniSobresDinero';
import Image from 'next/image';


type EventItem = {
  time: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}



interface MediaItem {
  id: string;
  file_url: string;
  file_type: "image" | "audio";
  is_hero: boolean;
}



interface XVAnosClassicProps {
  customer: Customer;
  events: EventItem[];
  media: MediaItem[];

}




const eventos: EventItem[] = [
  {
    time: "3:30 PM",
    title: "Recepción",
    description: "Lugar de la recepción",
    icon: <Flower size={30} />
  },
  {
    time: "4:00 PM",
    title: "Ceremonia",
    description: "Dando Gracias a Dios por mi vida",
    icon: <Clock size={30} />
  },
  {
    time: "5:00 PM",
    title: "Cena",
    description: "Disfrutemos de una deliciosa cena.",
    icon: <Utensils size={30} />
  },

  {
    time: "6:00 PM",
    title: "Momentos Especiales",
    description: "Creando recuerdos inolvidables.",
    icon: <Camera size={30} />
  }
]



const photos: Photo[] = [
  {
    id: "1",
    src: "/hanni/hani2.jpeg",
    alt: "Foto de la quinceañera con su familia y amigos",
    aspectRatio: 4 / 3,


  },

  {
    id: "2",
    src: "/hanni/hani3.jpeg",
    alt: "Foto de la quinceañera con su vestido de gala",
    aspectRatio: 4 / 3,
  },
  {
    id: "3",
    src: "/hanni/hani8.jpeg",
    alt: "Foto de la quinceañera con sus amigas",
    aspectRatio: 4 / 3,
  },
  {
    id: "4",
    src: "/hanni/hani5.jpeg",
    alt: "Foto de la quinceañera con su familia",
    aspectRatio: 4 / 3,
  },
  {
    id: "5",
    src: "/hanni/hani6.jpeg",
    alt: "Foto de la quinceañera con su vestido de gala",
    aspectRatio: 5 / 4,
  },
  {
    id: "6",
    src: "/hanni/hani7.jpeg",
    alt: "Foto de la quinceañera con su vestido de gala",
    aspectRatio: 5 / 4,
  },

  {
    id: "8",
    src: "/hanni/hani20.jpeg",
    alt: "Foto de la quinceañera con su vestido de gala",
    aspectRatio: 5 / 4,

  },


]




const XVAnosClassic = ({ customer, events, media }: XVAnosClassicProps) => {

  const { primary_color, font_family } = customer.template_config;
  // Filter media by type
  // const photos = media?.filter((m: any) => m.file_type === 'image');
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
    <div className='w-full  flex flex-col items-center justify-center'>

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



      <XVHeroComponent name={customer.couple_name} />
      <AboutMe

        name={customer.couple_name}
        description='Mi nombre es Sagia Mahanaim Díaz Aguilar, y soy una persona que disfruta mucho los deportes, especialmente el tenis, el fútbol y el voleibol, que son mis favoritos, también  me gusta mucho la moda y amo pasar tiempo con mi familia, porque disfruto cada momento con ellos.

Sobre todo, soy una persona que ama a Dios y estoy muy agradecida con Él, por mi vida, por permitirme llegar a este momento tan especial y porque cada día deseo enamorarme más de Él y parecerme más a Él.

Gracias por acompañarme en este día tan importante para mí. 🤍'
        image='/hanni/hanni_rosa.png'

      />

      <ItineraryQuinceanera events={eventos} />

      <EventLocationQuinceanera />
      <PhotoGalleryQuinceañera photos={photos} />


      <HanniSobresDinero />
      <GiftRegistryQuinceanera />

      {/* <Suspense>
        <RSVPForm customerId={customer.id} />
      </Suspense> */}

      {/* <FooterQuinceanera quinceaneraName={customer.couple_name} eventDate={customer.event_date} /> */}



      {/* Confirmación — card style */}
      <section className="relative w-full py-20 px-4 bg-[url('/hanni/fondo_10.jpeg')] bg-cover bg-top">
        <div className="absolute inset-0 bg-white/10" />
        <div className="relative max-w-xl mx-auto flex flex-col items-center gap-8">
          <div className="text-center mb-4">
            <h2 className="font-savoir text-4xl md:text-5xl font-light text-gray-900 tracking-wide mb-3">

            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
          </div>
          <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-white/60">
            <Image
              src="/hanni/confirmacion.jpeg"
              alt="Confirmación de asistencia"
              width={1600}
              height={1200}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>


      {/* Hashtag — card style */}
      <section className="relative w-full py-20 px-4 bg-[url('/hanni/fondo_10.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-white/10" />
        <div className="relative max-w-xl mx-auto flex flex-col items-center gap-8">
          <div className="text-center mb-4">
            <h2 className="font-savoir text-4xl md:text-5xl font-light text-gray-900 tracking-wide mb-3">
              #HanniXV
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
          </div>
          <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-white/60">
            <Image
              src="/hanni/imagenes/hashtag.jpeg"
              alt="Hashtag de la quinceañera"
              width={1600}
              height={1200}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>








    </div>
  )
}

export default XVAnosClassic
