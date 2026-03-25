'use client'
import XVHeroComponent from '@/components/public/XVAnos/components/HeroComponent'
import React, { Suspense, useRef, useState } from 'react'
import AboutMe from './AboutMeQuinceañera'
import ItineraryQuinceanera from '@/components/public/XVAnos/components/ItineraryQuinceanera';
import { EventLocations as EventLocationQuinceanera } from '@/components/public/XVAnos/components/LocationQuinceanera';
import { Photo, PhotoGalleryQuinceañera } from '@/components/public/XVAnos/components/photoGallery';
import { Clock, Music, Utensils, Camera, Sparkles, Music4, HeartHandshake } from "lucide-react";
import { GiftRegistryMinimal } from '@/components/public/XVAnos/components/GiftsQuinceanera';
import { GiftRegistryQuinceanera } from '@/components/public/XVAnos/components/GiftQuienceanera1';
import FooterQuinceanera from '@/components/public/XVAnos/components/Header';
import { RSVPForm } from '@/components/public/RSVPForm';
import { Customer } from '@/types/database';



type EventItem={
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
  customer:Customer;
  events:EventItem[];
  media:  MediaItem[];

}




const eventos: EventItem[] =  [
           {
      time: "6:00 PM",
      title: "Recepción",
      description: "Bienvenida de los invitados",
      icon: <Clock size={30} />
    },
    {
      time: "7:00 PM",
      title: "Primer Baile",
      description: "Vals con la Quinceañera",
      icon: <Music size={30} />
    },
    {
      time: "8:00 PM",
      title: "Cena",
      description: "Servicio de alimentos",
      icon: <Utensils size={30} />
    },
    {
      time: "9:00 PM",
      title: "Sesión de Fotos",
      description: "Momentos especiales",
      icon: <Camera size={30} />
    }
        ]



const photos:Photo[] = [
  {
    id: "1",
    src: "/XVAnos_1.png",
    alt: "Foto de la quinceañera con su familia y amigos",
    aspectRatio: 4 / 3,

  
  },
  
  {
    id: "2",
    src: "/XVAnos_2.png",
    alt: "Foto de la quinceañera con su vestido de gala",
    aspectRatio: 4 / 3,
  },
  {
    id: "3",
    src: "/XVAnos_3.png",
    alt: "Foto de la quinceañera con sus amigas",
    aspectRatio: 4 / 3,
  },
  {
    id: "4",
    src: "/XVAnos_4.png",
    alt: "Foto de la quinceañera con su familia",
    aspectRatio: 4 / 3,
  },
  {
    id: "5",
    src: "/XVAnos_5.jpg",
    alt: "Foto de la quinceañera con su vestido de gala",
    aspectRatio: 5 / 4,
  }
]




const XVAnosClassic = ({customer, events, media}: XVAnosClassicProps) => {

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


    
      <XVHeroComponent />
      <AboutMe
      
          name='Fernanda'
          description='Soy una joven soñadora que está comenzando una nueva etapa llena de ilusiones, aprendizajes y momentos inolvidables. Hoy celebro mis quince años con el corazón lleno de gratitud, rodeada de las personas que más amo.

Disfruto los pequeños detalles de la vida, las sonrisas sinceras y cada instante que se convierte en un hermoso recuerdo. Este día marca el inicio de nuevos sueños, metas y aventuras que estoy lista para vivir con alegría y determinación.

Gracias por ser parte de este momento tan especial en mi vida. 💖'
    image='/XVAnos_4.png'
      
      />

      <ItineraryQuinceanera events={eventos} />
      
      <EventLocationQuinceanera />     
      <PhotoGalleryQuinceañera photos={photos}/>

      <GiftRegistryQuinceanera/>

      <Suspense>
        <RSVPForm customerId={customer.id}/>
      </Suspense>

      <FooterQuinceanera/>



 


    </div>
  )
}

export default XVAnosClassic
