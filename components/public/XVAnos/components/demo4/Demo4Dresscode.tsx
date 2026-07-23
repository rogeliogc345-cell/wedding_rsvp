'use client'

import { Shirt, Sparkles, Ban } from 'lucide-react'
import { Reveal } from './Demo4Reveal'
import { Divider } from './Demo4Divider'

export function DressCode() {
  return (
    <section id="dresscode" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-primary">
            Etiqueta
          </p>
          <h2 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
            Código de Vestimenta
          </h2>
          <Divider className="my-7" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass overflow-hidden rounded-[2rem] p-8 text-center shadow-xl shadow-black/5 sm:p-12">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Sparkles className="size-7" />
            </div>
            <h3 className="font-serif text-3xl text-foreground">
              Elegancia Formal
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
              Te pedimos vestir de gala para acompañar la elegancia de esta
              celebración tan especial.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-card/60 p-6">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-rose/25 text-foreground">
                  <Sparkles className="size-5" />
                </div>
                <h4 className="font-serif text-xl text-foreground">Damas</h4>
                <p className="mt-2 text-sm font-light text-muted-foreground">
                  Vestido largo de gala
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card/60 p-6">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/15 text-foreground">
                  <Shirt className="size-5" />
                </div>
                <h4 className="font-serif text-xl text-foreground">Caballeros</h4>
                <p className="mt-2 text-sm font-light text-muted-foreground">
                  Traje formal
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 rounded-full bg-secondary/60 px-5 py-3 text-sm text-secondary-foreground">
              <Ban className="size-4 shrink-0 text-primary" />
              <span className="font-light">
                Reservamos el color blanco para nuestra festejada.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
