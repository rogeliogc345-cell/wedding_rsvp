import React from 'react'
import { SparkleEffect } from './components/Demo3-sparkle-effect'
import { HeroSection } from './components/Demo3-hero-section'
import { CountdownTimer } from './components/Demo3-countdown-timer'
import { EventDetails } from './components/Demo3-event-details'
import { DressCode } from './components/Demo3-dress-code'
import { PhotoGallery } from './components/Demo3-photo-gallery'
import { RSVPForm } from './components/Demo3-rsvp-form'
import { Footer } from './components/Demo3-footer'
import MesaDeRegalos from '@/components/public/MesaDeRegalos'

const XVClassicBlueTemplate = ({ customer }: { customer?: any }) => {
    const safeCustomer = customer ?? {}
    console.log("customer", safeCustomer);
    return (
        <main className='min-h-screen bg-background'>
            <SparkleEffect />
            <HeroSection name={safeCustomer.couple_name ?? 'Quinceañera'} />
            <CountdownTimer targetDate={safeCustomer.event_date} />
            <EventDetails events={safeCustomer.events} date={safeCustomer.event_date} />
            <DressCode customer_color_preferences={safeCustomer.color_preferences} />
            <PhotoGallery photos={safeCustomer.media} />
            <MesaDeRegalos theme="classicBlue" festejadaName={safeCustomer.couple_name} />
            <RSVPForm customerId={safeCustomer.id} />
            <Footer />
        </main>
    )
}

export default XVClassicBlueTemplate