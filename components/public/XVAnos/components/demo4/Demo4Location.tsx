'use client'

import Image from 'next/image'
import { MapPin, Car, Navigation } from 'lucide-react'
import { Reveal } from './Demo4Reveal'
import { Divider } from './Demo4Divider'
import { EVENT } from './events'

export function Location() {
  return (
    <section id="location" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-primary">
            Dónde nos vemos
          </p>
          <h2 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
            Ubicación
          </h2>
          <Divider className="my-7" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-xl shadow-black/5 md:grid-cols-2">
            <div className="relative min-h-[280px]">
              <Image
                src="/images/venue.png"
                alt={`Recinto ${EVENT.venue.name}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-foreground">
                    {EVENT.venue.name}
                  </h3>
                  <p className="mt-1 text-sm font-light leading-relaxed text-muted-foreground">
                    {EVENT.venue.address}
                    <br />
                    {EVENT.venue.city}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-rose/25 text-foreground">
                  <Car className="size-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Estacionamiento</h4>
                  <p className="mt-1 text-sm font-light leading-relaxed text-muted-foreground">
                    {EVENT.venue.parking}
                  </p>
                </div>
              </div>

              <a
                href={EVENT.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <Navigation className="size-4 transition-transform group-hover:-rotate-12" />
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
