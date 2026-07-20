import { CountdownDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/countdown";
import { DressCodeDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/dress-code";
import { EventDetailsDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/event-details";
import { FooterDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/footer";
import { GalleryDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/gallery";
import { HeroDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/hero";
import { RSVPDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/rsvp";
import MesaDeRegalos from '@/components/public/MesaDeRegalos';



export default function XVModernTemplate({ customer }: { customer?: any }) {
  const safeCustomer = {
    couple_name: "",
    event_date: "",
    events: [],
    media: [],
    color_preferences: { suggested: [], forbidden: [] },
    ...(customer ?? {}),
  }

  const safeEvents = Array.isArray(safeCustomer.events) ? safeCustomer.events : []
  const safeMedia = Array.isArray(safeCustomer.media) ? safeCustomer.media : []
  const safeColorPreferences = safeCustomer.color_preferences ?? { suggested: [], forbidden: [] }

  return (
    <main className=" theme-xv-green">
      <HeroDemo2 name={safeCustomer.couple_name} eventDate={safeCustomer.event_date} />
      <CountdownDemo2 eventDate={safeCustomer.event_date} />
      <EventDetailsDemo2 events={safeEvents} date={safeCustomer.event_date} />
      <GalleryDemo2 media={safeMedia} customerId={safeCustomer.id} />
      <DressCodeDemo2 customer_color_preferences={safeColorPreferences} />
      <MesaDeRegalos theme="modern" festejadaName={safeCustomer.couple_name} />
      <RSVPDemo2 customerId={safeCustomer.id} />
      <FooterDemo2  />
    </main>
  )
}
