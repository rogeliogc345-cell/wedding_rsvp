'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'Inicio', href: '#home' },
  { label: 'Cuenta Regresiva', href: '#countdown' },
  { label: 'Itinerario', href: '#itinerary' },
  { label: 'Galería', href: '#gallery' },
  { label: 'Confirmar', href: '#rsvp' },
]

export function Navbar({ name }: { name?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'glass py-3 shadow-[0_8px_30px_rgba(60,40,30,0.08)]' : 'bg-transparent py-5',
      )}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Navegación principal"
      >
        <button
          onClick={() => handleNav('#home')}
          className={cn(
            'font-serif text-xl tracking-wide transition-colors sm:text-2xl',
            scrolled ? 'text-foreground' : 'text-background text-shadow-soft',
          )}
        >
          {name}<span className="text-primary">.</span>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className={cn(
                  'group relative text-sm font-light tracking-wide transition-colors',
                  scrolled
                    ? 'text-foreground/80 hover:text-primary'
                    : 'text-background/90 text-shadow-soft hover:text-background',
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'flex size-10 items-center justify-center rounded-full transition-colors md:hidden',
            scrolled ? 'text-foreground' : 'text-background',
          )}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="glass mt-3 overflow-hidden md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="w-full py-2.5 text-left font-light tracking-wide text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
