import { Metadata } from 'next'
import ShowcaseClient from './ShowcaseClient'

export const metadata: Metadata = {
  title: 'Invitaciones de Boda | Catálogo de Diseños',
  description: 'Explora nuestra colección de invitaciones digitales para boda y encuentra el diseño ideal para celebrar su historia.',
}

export default function BodaShowcasePage() {
  return <ShowcaseClient />
}