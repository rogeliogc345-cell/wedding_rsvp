'use client'

import React from 'react'
import PhoneMockup from './PhoneMockup'
import { ExternalLink } from 'lucide-react'

export interface DemoInfo {
  id: string
  title: string
  description: string
  demoUrl: string
  tags: string[]
  accentColor: string
}

interface DemoCardProps {
  demo: DemoInfo
}

const DemoCard = ({ demo }: DemoCardProps) => {
  return (
    <div className="demo-card">
      {/* Phone preview */}
      <div className="demo-card__preview">
        <PhoneMockup src={demo.demoUrl} title={demo.title} />
      </div>

      {/* Info */}
      <div className="demo-card__info">
        <h3 className="demo-card__title">{demo.title}</h3>
        <p className="demo-card__description">{demo.description}</p>

        {/* Tags */}
        <div className="demo-card__tags">
          {demo.tags.map((tag) => (
            <span
              key={tag}
              className="demo-card__tag"
              style={{ borderColor: demo.accentColor, color: demo.accentColor }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={demo.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="demo-card__cta"
          style={{ background: demo.accentColor }}
        >
          Ver Demo Completa
          <ExternalLink className="demo-card__cta-icon" />
        </a>
      </div>
    </div>
  )
}

export default DemoCard
