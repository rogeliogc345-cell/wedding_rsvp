'use client'
import type { ReactNode } from 'react'
import { Customer } from '@/types/database';
import { HeroSectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/HeroSectionDemoUno';
import { CountdownSectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/CountownSectionDemoUno';
import { AboutSectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/AboutSectionDemoUno';
import { ItinerarySectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/ItinerarySectionDemoUno';
import { LocationSectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/LocationSectionDemoUno';
import { GallerySectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/GallerySectionDemoUno';
import { CalendarSectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/CalendarSectionDemoUno';
import { HashtagSection } from '@/components/public/XVAnos/components/XVAnosDemoUno/HashTagSectionDemoUno';
import { RSVPSectionDemoUno } from '@/components/public/XVAnos/components/XVAnosDemoUno/RSVPSectionDemoUno';
import { Photo } from '@/components/public/XVAnos/components/photoGallery';
import MesaDeRegalos from '@/components/public/MesaDeRegalos';


interface MediaItem {
    id: string;
    file_url: string;
    file_type: "image" | "audio";
    is_hero: boolean;
}

interface XVAnosDemoUnoTemplateProps {
    customer?: Customer & {
        events?: any[];
        media?: MediaItem[];
    };
}







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




const XVAnosDemoUnoTemplate = ({ customer }: XVAnosDemoUnoTemplateProps) => {

    // const { primary_color, font_family } = customer?.template_config;

    return (
        <div>   
            <HeroSectionDemoUno name={customer?.couple_name} eventDate={customer?.event_date} />
            <CountdownSectionDemoUno eventDate={customer?.event_date} />
            <AboutSectionDemoUno name={customer?.couple_name} about_me={customer?.about_me}/>
            <ItinerarySectionDemoUno events={customer?.events} />
            <LocationSectionDemoUno />
            <RSVPSectionDemoUno />
            <GallerySectionDemoUno />
            <MesaDeRegalos festejadaName={customer?.couple_name} />
            <CalendarSectionDemoUno />
            <HashtagSection />
        </div>






    )
}

export default XVAnosDemoUnoTemplate
