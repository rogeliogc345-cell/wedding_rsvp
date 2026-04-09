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
import { HeroSectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/HeroSectionDemoUno';
import { CountdownSectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/CountownSectionDemoUno';
import { AboutSectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/AboutSectionDemoUno';
import { ItinerarySectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/ItinerarySectionDemoUno';
import { LocationSectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/LocationSectionDemoUno';
import { GallerySectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/GallerySectionDemoUno';
import { CalendarSectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/CalendarSectionDemoUno';
import { HashtagSection } from '@/components/public/XVAnos/components/XVAnosDemoUno/HashTagSectionDemoUno';
import { RSVPSectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/RSVPSectionDemoUno';


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
    customer?: Customer;
    events?: EventItem[];
    media?: MediaItem[];

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




const XVAnosDemoUnoTemplate = ({ customer, events, media }: XVAnosClassicProps) => {

    // const { primary_color, font_family } = customer.template_config;
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
        <div>
            <HeroSectionDemoUno />
            <CountdownSectionDemoUno />
            <AboutSectionDemoUno />
            <ItinerarySectionDemoUno />
            <LocationSectionDemoUno />
            <RSVPSectionDemoUno />
            <GallerySectionDemoUno />
            <CalendarSectionDemoUno />
            <HashtagSection />
        </div>






    )
}

export default XVAnosDemoUnoTemplate
