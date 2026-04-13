"use client"

import { motion } from "framer-motion"
import { Instagram, Music, Heart } from "lucide-react"

export function FooterDemo2() {
  return (
    <footer className="py-16 px-4 border-t border-border bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Large name */}
          <h2 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8">
            XV
          </h2>

          {/* Hashtag */}
          <p className="text-primary text-lg tracking-wider mb-8 text-xvgreen-text">#MisXVValentina</p>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full  flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Music className="w-5 h-5" />
            </a>
          </div>

          {/* Message */}
          <p className="text-muted-foreground text-sm mb-4">
            Tu presencia es el mejor regalo
          </p>

          {/* Made with love */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
            <span>Hecho con</span>
            <Heart className="w-3 h-3 text-primary fill-primary text-xvgreen-text" />
            <span>para Valentina</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
