'use client'
import type { ElementType } from 'react'
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


type EventItem = {
    event_name: string;
    event_date: string;
    event_time: string;
    location_name: string;
    address?: string;
    google_maps_url?: string;
    icon?: ElementType;
}



interface MediaItem {
    id: string;
    file_url: string;
    file_type: "image" | "audio";
    is_hero: boolean;
}

interface XVAnosDemoUnoTemplateProps {
    customer?: Customer & {
        events?: EventItem[];
        media?: MediaItem[];
    };
}









const XVAnosDemoUnoTemplate = ({ customer }: XVAnosDemoUnoTemplateProps) => {

    // const { primary_color, font_family } = customer?.template_config;

    return (
        <div>
            <HeroSectionDemoUno name={customer?.couple_name} eventDate={customer?.event_date} />
            <CountdownSectionDemoUno eventDate={customer?.event_date} />
            <AboutSectionDemoUno name={customer?.couple_name} />
            <ItinerarySectionDemoUno events={customer?.events} />
            {/* <LocationSectionDemoUno /> */}
            <RSVPSectionDemoUno />
            <GallerySectionDemoUno photos={customer?.media} />
            <CalendarSectionDemoUno />
            <HashtagSection />
        </div>






    )
}

export default XVAnosDemoUnoTemplate
