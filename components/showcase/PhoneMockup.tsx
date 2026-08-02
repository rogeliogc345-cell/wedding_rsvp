'use client'

import React, { useState } from 'react'

interface PhoneMockupProps {
  src: string
  title?: string
}

const PhoneMockup = ({ src, title }: PhoneMockupProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="phone-mockup" aria-label={title ? `Preview de ${title}` : 'Preview de invitación'}>
      {/* Phone frame */}
      <div className="phone-frame">
        {/* Notch */}
        <div className="phone-notch">
          <div className="phone-camera" />
        </div>

        {/* Screen */}
        <div className="phone-screen">
          {!isLoaded && (
            <div className="phone-loader">
              <div className="phone-loader-spinner" />
              <span>Cargando preview...</span>
            </div>
          )}
          <iframe
            src={src}
            title={title || 'Demo preview'}
            className={`phone-iframe ${isLoaded ? 'phone-iframe--loaded' : ''}`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

        {/* Home indicator */}
        <div className="phone-home-indicator">
          <div className="phone-home-bar" />
        </div>
      </div>
    </div>
  )
}

export default PhoneMockup
