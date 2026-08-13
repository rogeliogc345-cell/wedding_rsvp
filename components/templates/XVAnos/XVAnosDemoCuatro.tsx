'use client'

import { Customer } from '@/types/database'
import { Countdown } from '@/components/public/XVAnos/components/demo4/Dem4Countdown'
import { DressCode } from '@/components/public/XVAnos/components/demo4/Demo4Dresscode'
import { Footer } from '@/components/public/XVAnos/components/demo4/Demo4Footer'
import { Gallery } from '@/components/public/XVAnos/components/demo4/Demo4Gallery'
import { GiftSection } from '@/components/public/XVAnos/components/demo4/Demo4GiftSection'
import { Hero } from '@/components/public/XVAnos/components/demo4/Demo4Hero'
import { Itinerary } from '@/components/public/XVAnos/components/demo4/Demo4Itinerary'
import { Navbar } from '@/components/public/XVAnos/components/demo4/Demo4Navbar'
import { Parents } from '@/components/public/XVAnos/components/demo4/Demo4Parents'
import { RSVP } from '@/components/public/XVAnos/components/demo4/Demo4RSVP'
import { ScrollProgress } from '@/components/public/XVAnos/components/demo4/Demo4ScrollProgress'
import { Location } from '@/components/public/XVAnos/components/demo4/Demo4Location'

interface XVAnosDemoCuatroProps {
  customer?: Customer
}

const XVAnosDemoCuatro = ({ customer }: XVAnosDemoCuatroProps) => {
  return (
    <div>
      <ScrollProgress />
      <Navbar name={customer?.couple_name} />
      <main>
        <Hero name={customer?.couple_name} date={customer?.event_date} />
        <Countdown date={customer?.event_date} />
        <Itinerary events={customer?.events} />
        <DressCode />
        <Gallery images={customer?.media} />
        <Parents />
        <Location />
        <GiftSection />
        <RSVP customerId={customer?.id} name={customer?.couple_name} />
      </main>
      <Footer />
    </div>
  )
}

export default XVAnosDemoCuatro
