import XVHeroComponent from '@/components/public/XVAnos/components/HeroComponent'
import React from 'react'
import AboutMe from './AboutMeQuinceañera'
import ItineraryQuinceanera from '@/components/public/XVAnos/components/ItineraryQuinceanera';
import { Photo, PhotoGalleryQuinceañera } from '@/components/public/XVAnos/components/photoGallery';



type EventItem={
  time: string;
  title: string;
  description?: string;
}

const events: EventItem[] =  [
          {
            time: "5:00 PM",
            title: "Recepción",
            description: "Bienvenida a los invitados",
          },
          {
            time: "6:00 PM",
            title: "Ceremonia",
            description: "Entrada de la quinceañera",
          },
          {
            time: "7:30 PM",
            title: "Cena",
            description: "Disfruta de una deliciosa cena",
          },
          {
            time: "9:00 PM",
            title: "Vals",
            description: "Baile principal",
          },
          {
            time: "10:00 PM",
            title: "Fiesta",
            description: "¡A bailar!",
          },
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
      
          name='Hanni'
          description='Soy una joven soñadora que está comenzando una nueva etapa llena de ilusiones, aprendizajes y momentos inolvidables. Hoy celebro mis quince años con el corazón lleno de gratitud, rodeada de las personas que más amo.

Disfruto los pequeños detalles de la vida, las sonrisas sinceras y cada instante que se convierte en un hermoso recuerdo. Este día marca el inicio de nuevos sueños, metas y aventuras que estoy lista para vivir con alegría y determinación.

Gracias por ser parte de este momento tan especial en mi vida. 💖'
    image='/XVAnos_4.png'
      
      />

      <ItineraryQuinceanera events={events} />
      

      <PhotoGalleryQuinceañera photos={photos}/>



 


    </div>
  )
}

export default XVAnosClassic
