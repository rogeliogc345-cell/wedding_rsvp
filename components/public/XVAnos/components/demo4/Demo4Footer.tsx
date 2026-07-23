'use client'

import { Heart } from 'lucide-react'
import { Reveal } from './Demo4Reveal'
import { EVENT } from './events'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground py-20 text-background">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-primary">
            Con cariño
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Gracias por ser parte de este sueño
          </h2>
          <p className="mx-auto mt-5 max-w-md font-light leading-relaxed text-background/70">
            Tu presencia hará de esta noche un recuerdo eterno. Nos vemos muy
            pronto para celebrar juntos.
          </p>

          <div className="my-9 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60" />
            <Heart className="size-4 text-primary" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60" />
          </div>

          <p className="font-serif text-3xl italic text-primary">
            {EVENT.hashtag}
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href={EVENT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex size-11 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors hover:border-primary hover:text-primary"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={EVENT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex size-11 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors hover:border-primary hover:text-primary"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>

          <p className="mt-10 text-xs font-light tracking-wide text-background/50">
            {EVENT.fullName} · {EVENT.dateLabel}
          </p>
          <p className="mt-1 text-xs font-light tracking-wide text-background/40">
            © {new Date().getFullYear()} · Hecho con amor.
          </p>
        </Reveal>
      </div>
    </footer>
  )
}
