'use client'

import React from 'react'
import DemoCard, { type DemoInfo } from '@/components/showcase/DemoCard'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import './showcase.css'

/**
 * Array de demos de XV Años.
 * Para añadir una nueva demo, simplemente agrega un nuevo objeto aquí.
 */
const XV_DEMOS: DemoInfo[] = [
  {
    id: 'classic',
    title: 'Classic Rosa',
    description: 'Diseño romántico con tonos rosados, galerías de fotos, itinerario elegante y efectos suaves.',
    demoUrl: '/quince/classic',
    tags: ['Elegante', 'Rosa', 'Clásico'],
    accentColor: '#f472b6',
  },
  {
    id: 'classicBlue',
    title: 'Classic Blue',
    description: 'Estilo sofisticado en tonos azules con efectos de brillo, countdown animado y dress code.',
    demoUrl: '/quince/classicBlue',
    tags: ['Azul', 'Sparkles', 'Sofisticado'],
    accentColor: '#38bdf8',
  },
  {
    id: 'modern',
    title: 'Modern Green',
    description: 'Diseño moderno y audaz con paleta verde esmeralda, tipografía contemporánea y galería dinámica.',
    demoUrl: '/quince/modern',
    tags: ['Moderno', 'Verde', 'Dark Mode'],
    accentColor: '#34d399',
  },
  {
    id: 'demo4',
    title: 'Elegante Gold',
    description: 'Invitación premium con barra de navegación, progreso de scroll, sección de padres y mesa de regalos.',
    demoUrl: '/quince/demo4',
    tags: ['Premium', 'Gold', 'Navbar'],
    accentColor: '#fbbf24',
  },
]

const ShowcaseClient = () => {
  return (
    <div className="xv-showcase">
      {/* Hero Section */}
      <section className="xv-showcase__hero">
        <div className="xv-showcase__badge">
          <Sparkles style={{ width: 14, height: 14 }} />
          Colección XV Años
        </div>
        <h1 className="xv-showcase__title">
          Invitaciones Digitales
        </h1>
        <p className="xv-showcase__subtitle">
          Explora nuestros diseños exclusivos. Cada invitación incluye música,
          galería de fotos, RSVP y personalización completa.
        </p>
      </section>

      {/* Demo Grid */}
      <section className="xv-showcase__grid">
        {XV_DEMOS.map((demo) => (
          <DemoCard key={demo.id} demo={demo} />
        ))}
      </section>

      {/* CTA Section */}
      <section className="xv-showcase__cta">
        <h2 className="xv-showcase__cta-title">
          ¿Te gustó algún diseño?
        </h2>
        <p className="xv-showcase__cta-text">
          Contáctanos y personalizamos tu invitación perfecta.
        </p>
        <Link href="/" className="xv-showcase__cta-button">
          Comenzar ahora
        </Link>
      </section>
    </div>
  )
}

export default ShowcaseClient
