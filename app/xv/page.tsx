import { Metadata } from 'next'
import ShowcaseClient from './ShowcaseClient'

export const metadata: Metadata = {
  title: 'Invitaciones de XV Años | Catálogo de Diseños',
  description: 'Explora nuestra colección de invitaciones digitales para XV Años. Diseños elegantes, modernos y personalizables con música, galería de fotos y RSVP integrado.',
}

export default function XVShowcasePage() {
  return <ShowcaseClient />
}
