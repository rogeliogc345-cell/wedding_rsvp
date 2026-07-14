import { CountdownDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/countdown";
import { DressCodeDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/dress-code";
import { EventDetailsDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/event-details";
import { FooterDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/footer";
import { GalleryDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/gallery";
import { HeroDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/hero";
import { RSVPDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/rsvp";



export default function XVModernTemplate({ customer }: { customer: any }) {

  return (
    <main className="min-h-screen theme-xvGreen">
      <HeroDemo2 name={customer.couple_name} eventDate={customer.event_date} />
      <CountdownDemo2 eventDate={customer.event_date} />
      <EventDetailsDemo2 events={customer.events} date={customer.event_date} />
      <GalleryDemo2 media={customer.media} customerId={customer.id} />
      <DressCodeDemo2 customer_color_preferences={customer.color_preferences} />
      <RSVPDemo2 customerId={customer.id} />
      <FooterDemo2 />
    </main>
  )
}
