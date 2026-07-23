'use client'

import { useMemo } from 'react'

type Particle = {
  left: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export function FloatingParticles({ count = 18 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      size: 4 + Math.random() * 8,
      duration: 12 + Math.random() * 16,
      delay: Math.random() * -28,
      opacity: 0.25 + Math.random() * 0.45,
    }))
  }, [count])

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-10%] rounded-full bg-primary"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: '0 0 8px rgba(212, 175, 55, 0.6)',
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
