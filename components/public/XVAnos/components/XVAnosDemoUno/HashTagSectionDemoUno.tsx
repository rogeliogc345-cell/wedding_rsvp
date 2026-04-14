"use client"

import { useState } from "react"
import { Instagram, Camera, Copy, Check } from "lucide-react"

export function HashtagSection() {
    const [copied, setCopied] = useState(false)
    const hashtag = "#MisXVValentina2026"

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hashtag)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section id="hashtag" className="py-20 px-4 bg-gradient-to-b from-background to-blush">
            <div className="max-w-2xl mx-auto text-center">
                {/* Section header */}
                <div className="mb-12">
                    <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-5">
                        Comparte tus fotos
                    </p>
                    <h2
                        className="text-5xl md:text-8xl text-primary font-wedding"

                    >
                        Hashtag Oficial
                    </h2>
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                        <div className="w-2 h-2 rotate-45 bg-gold" />
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                    </div>
                </div>

                {/* Hashtag card */}
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-primary/20 rounded-3xl blur-xl" />
                    <div className="relative bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border">
                        {/* Camera icon */}
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Camera className="w-10 h-10 text-primary" />
                        </div>

                        {/* Hashtag */}
                        <button
                            onClick={copyToClipboard}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/10 to-gold/10 rounded-2xl hover:from-primary/20 hover:to-gold/20 transition-all"
                        >
                            <span
                                className="text-3xl md:text-4xl text-primary font-wedding"

                            >
                                {hashtag}
                            </span>
                            {copied ? (
                                <Check className="w-6 h-6 text-green-500" />
                            ) : (
                                <Copy className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                            )}
                        </button>

                        {/* Copy feedback */}
                        <p className="mt-4 text-sm text-muted-foreground">
                            {copied ? "¡Copiado!" : "Toca para copiar"}
                        </p>

                        {/* Description */}
                        <p className="mt-8 text-muted-foreground leading-relaxed max-w-md mx-auto">
                            Usa este hashtag en todas tus fotos y videos del evento.
                            ¡Queremos ver la fiesta desde tu perspectiva!
                        </p>

                        {/* Social icons */}
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
}
