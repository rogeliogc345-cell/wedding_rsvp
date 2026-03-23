import XVHeroComponent from '@/components/public/XVAnos/components/HeroComponent'
import React, { Suspense } from 'react'
import AboutMe from './AboutMeQuinceañera'
import ItineraryQuinceanera from '@/components/public/XVAnos/components/ItineraryQuinceanera';
import { EventLocations as EventLocationQuinceanera } from '@/components/public/XVAnos/components/LocationQuinceanera';
import { Photo, PhotoGalleryQuinceañera } from '@/components/public/XVAnos/components/photoGallery';
import { Clock, Music, Utensils, Camera, Sparkles } from "lucide-react";
import { GiftRegistryMinimal } from '@/components/public/XVAnos/components/GiftsQuinceanera';
import { GiftRegistryQuinceanera } from '@/components/public/XVAnos/components/GiftQuienceanera1';
import FooterQuinceanera from '@/components/public/XVAnos/components/Header';
import { RSVPForm } from '@/components/public/RSVPForm';



type EventItem={
  time: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const events: EventItem[] =  [
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

const XVAnosClassic = () => {
  return (
    <div className='w-full  flex flex-col items-center justify-center'>
    
      <XVHeroComponent />
      <AboutMe
      
          name='Fernanda'
          description='Soy una joven soñadora que está comenzando una nueva etapa llena de ilusiones, aprendizajes y momentos inolvidables. Hoy celebro mis quince años con el corazón lleno de gratitud, rodeada de las personas que más amo.

Disfruto los pequeños detalles de la vida, las sonrisas sinceras y cada instante que se convierte en un hermoso recuerdo. Este día marca el inicio de nuevos sueños, metas y aventuras que estoy lista para vivir con alegría y determinación.

Gracias por ser parte de este momento tan especial en mi vida. 💖'
    image='/XVAnos_4.png'
      
      />

      <ItineraryQuinceanera events={events} />
      
      <EventLocationQuinceanera />     
      <PhotoGalleryQuinceañera photos={photos}/>

      <GiftRegistryQuinceanera/>

      <Suspense>
        <RSVPForm customerId='customer_id'/>
      </Suspense>

      <FooterQuinceanera/>



 


    </div>
  )
}

export default XVAnosClassic
