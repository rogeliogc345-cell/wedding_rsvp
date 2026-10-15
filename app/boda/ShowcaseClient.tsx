'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Flower2, Leaf, Sparkles } from 'lucide-react'
import Link from 'next/link'

type WeddingDemo = {
  id: string
  title: string
  description: string
  demoUrl: string
  tags: string[]
}

const BODA_DEMOS: WeddingDemo[] = [
  {
    id: 'demo1',
    title: 'Jardín eterno',
    description: 'Una invitación romántica con cuenta regresiva, itinerario y detalles para celebrar juntos.',
    demoUrl: '/boda/demo1',
    tags: ['Romántico', 'Jardín', 'Clásico'],
  },
  {
    id: 'demo2',
    title: 'Luz de verano',
    description: 'Una propuesta fresca para compartir los detalles de un día inolvidable.',
    demoUrl: '/boda/demo2',
    tags: ['Luminoso', 'Natural'],
  },
  {
    id: 'demo3',
    title: 'Brisa marina',
    description: 'Un diseño sereno inspirado en celebraciones junto al mar.',
    demoUrl: '/boda/demo3',
    tags: ['Costero', 'Sereno'],
  },
  {
    id: 'demo4',
    title: 'Votos al atardecer',
    description: 'Una invitación íntima con tonos cálidos y un aire contemporáneo.',
    demoUrl: '/boda/demo4',
    tags: ['Moderno', 'Íntimo'],
  },
]

function WeddingDemoCard({ demo }: { demo: WeddingDemo }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <article className="group flex flex-col items-center gap-7 border border-[#d9dfd4] bg-white p-6 shadow-[0_12px_40px_rgba(37,55,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(37,55,42,0.12)] sm:p-8">
      <div className="relative h-[470px] w-[234px] shrink-0 rounded-[30px] border-[9px] border-[#263b2f] bg-[#263b2f] p-0 shadow-[0_18px_45px_rgba(26,43,31,0.2)]">
        <div className="absolute left-1/2 top-0 z-20 h-[17px] w-[76px] -translate-x-1/2 rounded-b-xl bg-[#263b2f]" />
        <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-[#f2f0e8]">
          {!isLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#f2f0e8] text-xs tracking-[0.12em] text-[#637365]">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#c9d2c5] border-t-[#526c56]" />
              CARGANDO DISEÑO
            </div>
          )}
          <iframe
            src={demo.demoUrl}
            title={`Vista previa: ${demo.title}`}
            className="absolute left-0 top-0 h-[812px] w-[375px] origin-top-left scale-[0.576] border-0"
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-center text-center">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-[#6d806d]">
          <Flower2 aria-hidden="true" className="h-3.5 w-3.5" />
          Invitación de boda
        </div>
        <h2 className="font-serif text-2xl text-[#263b2f]">{demo.title}</h2>
        <p className="mt-3 max-w-xs text-sm leading-6 text-[#697369]">{demo.description}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {demo.tags.map((tag) => (
            <span key={tag} className="border border-[#d9dfd4] px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-[#526c56]">
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={demo.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-11 items-center gap-2 border border-[#526c56] px-5 text-xs font-medium uppercase tracking-[0.14em] text-[#344c39] transition-colors hover:bg-[#344c39] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#526c56]"
        >
          Ver invitación
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

export default function ShowcaseClient() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f4ee] text-[#263b2f]">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 text-white sm:px-10 lg:px-16">
        <Link href="/" className="font-serif text-lg tracking-wide" aria-label="Volver al inicio">
          Casa de invitaciones
        </Link>
        <a href="#disenos" className="border border-white/60 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-[#263b2f]">
          Ver diseños
        </a>
      </header>

      <section
        aria-label="Mesa de boda decorada con flores blancas, follaje y velas"
        className="relative flex min-h-[640px] items-end bg-[url('/boda/boda_5.jpeg')] bg-fixed bg-cover bg-center sm:min-h-[720px]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#18271e]/75 via-[#18271e]/15 to-[#18271e]/25" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-36 text-white sm:px-10 sm:pb-24 lg:px-16">
          <p className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/85">
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            Colección de bodas
          </p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            El comienzo de algo hermoso.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
            Invitaciones digitales hechas para contar su historia y reunir a las personas que más quieren.
          </p>
          <a href="#disenos" className="mt-8 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-75">
            Explorar diseños
            <ArrowDown aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section id="disenos" className="mx-auto max-w-[1440px] scroll-mt-8 px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mb-12 flex flex-col items-start justify-between gap-5 border-b border-[#d9dfd4] pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#6d806d]">
              <Leaf aria-hidden="true" className="h-3.5 w-3.5" />
              Diseños para celebrar
            </p>
            <h2 className="font-serif text-3xl text-[#263b2f] sm:text-4xl">Encuentra su invitación</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#697369]">
            Cada diseño se adapta a su fecha, sus nombres y los detalles de su celebración.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {BODA_DEMOS.map((demo) => (
            <WeddingDemoCard key={demo.id} demo={demo} />
          ))}
        </div>
      </section>

      <section className="bg-[#263b2f] px-6 py-20 text-center text-white sm:py-24">
        <Flower2 aria-hidden="true" className="mx-auto mb-5 h-6 w-6 text-[#c5d0b9]" />
        <h2 className="font-serif text-3xl sm:text-4xl">¿Listos para invitar?</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/70">
          Hagamos una invitación tan especial como el día que están planeando.
        </p>
        <Link href="/" className="mt-8 inline-flex min-h-11 items-center gap-2 bg-[#e8e9df] px-6 text-xs font-medium uppercase tracking-[0.16em] text-[#263b2f] transition-colors hover:bg-white">
          Comenzar ahora
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </section>
    </main>
  )
}