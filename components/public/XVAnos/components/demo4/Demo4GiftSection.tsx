'use client'

import { Gift, ShoppingBag, CreditCard, ScrollText } from 'lucide-react'
import { Reveal } from './Demo4Reveal'
import { Divider } from './Demo4Divider'

const OPTIONS = [
  {
    icon: ShoppingBag,
    title: 'Amazon Wishlist',
    description: 'Explora la lista de deseos de Isabella.',
    href: '#',
  },
  {
    icon: CreditCard,
    title: 'Transferencia',
    description: 'Datos bancarios para tu obsequio.',
    href: '#',
  },
  {
    icon: ScrollText,
    title: 'Mesa de Regalos',
    description: 'Registro disponible en tienda.',
    href: '#',
  },
]

export function GiftSection() {
  return (
    <section
      id="gifts"
      className="relative overflow-hidden bg-secondary/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="glass overflow-hidden rounded-[2rem] p-8 text-center shadow-xl shadow-black/5 sm:p-12">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Gift className="size-7" />
            </div>
            <h2 className="font-serif text-4xl text-foreground sm:text-5xl">
              Mesa de Regalos
            </h2>
            <Divider className="my-6" />
            <p className="mx-auto max-w-lg text-sm font-light leading-relaxed text-muted-foreground">
              Tu presencia es nuestro mejor regalo. Si deseas tener un detalle
              con Isabella, aquí te compartimos algunas opciones con todo cariño.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {OPTIONS.map((opt) => {
                const Icon = opt.icon
                return (
                  <a
                    key={opt.title}
                    href={opt.href}
                    className="group flex flex-col items-center rounded-2xl border border-border/70 bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                  >
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-serif text-lg text-foreground">
                      {opt.title}
                    </h3>
                    <p className="mt-1 text-xs font-light text-muted-foreground">
                      {opt.description}
                    </p>
                  </a>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
