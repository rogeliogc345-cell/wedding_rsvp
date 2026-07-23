import { Countdown } from "@/components/public/XVAnos/components/demo4/Dem4Countdown";
import { DressCode } from "@/components/public/XVAnos/components/demo4/Demo4Dresscode";
import { Footer } from "@/components/public/XVAnos/components/demo4/Demo4Footer";
import { Gallery } from "@/components/public/XVAnos/components/demo4/Demo4Gallery";
import { GiftSection } from "@/components/public/XVAnos/components/demo4/Demo4GiftSection";
import { Hero } from "@/components/public/XVAnos/components/demo4/Demo4Hero";
import { Itinerary } from "@/components/public/XVAnos/components/demo4/Demo4Itinerary";
import { Navbar } from "@/components/public/XVAnos/components/demo4/Demo4Navbar";
import { Parents } from "@/components/public/XVAnos/components/demo4/Demo4Parents";
import { RSVP } from "@/components/public/XVAnos/components/demo4/Demo4RSVP";
import { ScrollProgress } from "@/components/public/XVAnos/components/demo4/Demo4ScrollProgress";
// import { Story } from "@/components/public/XVAnos/components/demo4/Demo4Story";
import { Location } from "@/components/public/XVAnos/components/demo4/Demo4Location";


export default function Playground() {
  return (
    <div >

      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        {/* <Story /> */}
        <Itinerary />
        <DressCode />
        <Gallery />
        <Parents />
        <Location />
        <GiftSection />
        <RSVP />
      </main>
      <Footer />


    </div>
  )
}



