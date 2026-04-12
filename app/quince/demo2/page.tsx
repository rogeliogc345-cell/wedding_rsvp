import { CountdownDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/countdown";
import { DressCodeDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/dress-code";
import { EventDetailsDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/event-details";
import { FooterDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/footer";
import { GalleryDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/gallery";
import { HeroDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/hero";
import { RSVPDemo2 } from "@/components/public/XVAnos/components/XVAnosDemoTwoo/components/xv/rsvp";



export default function XVPageDemo2() {
  return (
    <main className="min-h-screen theme-xvGreen">
      <HeroDemo2 />
      <CountdownDemo2 />
      <EventDetailsDemo2 />
      <GalleryDemo2 />
      <DressCodeDemo2 />
      <RSVPDemo2 />
      <FooterDemo2 />
    </main>
  )
}
