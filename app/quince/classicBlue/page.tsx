import React from 'react'
import { SparkleEffect } from './components/Demo3-sparkle-effect'
import { HeroSection } from './components/Demo3-hero-section'
import { CountdownTimer } from './components/Demo3-countdown-timer'
import { EventDetails } from './components/Demo3-event-details'
import { DressCode } from './components/Demo3-dress-code'
import { PhotoGallery } from './components/Demo3-photo-gallery'
import { RSVPForm } from './components/Demo3-rsvp-form'
import { Footer } from './components/Demo3-footer'

const XVClassicBlueTemplate = ({ customer }: { customer: any }) => {
    console.log("customer", customer);
    return (
        <main className='min-h-screen bg-background'>
            <SparkleEffect />
            <HeroSection name={customer.couple_name ?? 'Quinceañera'} />
            <CountdownTimer targetDate={customer.event_date} />
            <EventDetails events={customer.events} date={customer.event_date} />
            <DressCode customer_color_preferences={customer.color_preferences} />
            <PhotoGallery photos={customer.media} />
            <RSVPForm customerId={customer.id} />
            <Footer />
        </main>
    )
}

export default XVClassicBlueTemplate