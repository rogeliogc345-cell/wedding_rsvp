"use client";

import { motion } from "framer-motion";
import { Heart, Mail, Phone, MapPin, Calendar, Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  quinceaneraName?: string;
  eventDate?: string;
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    instagram?: string;
    whatsapp?: string;
  };
}

export default function FooterQuinceanera({
  quinceaneraName = "Fernanda",
  eventDate = "20 de Diciembre, 2026",
  email = "info@example.com",
  phone = "+1 (555) 123-4567",
  location = "Salón de Eventos",
  socialLinks = {},
}: FooterProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl opacity-50" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <p className="text-sm font-light tracking-widest uppercase text-white">
                  {quinceaneraName}
                </p>
                <p className="text-xs text-rose-300 font-light">XV Años</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Celebrando el inicio de una nueva etapa llena de sueños e ilusiones.
            </p>
          </motion.div>

          {/* Event Information */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">
              Evento
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Fecha</p>
                  <p className="text-sm text-gray-300 font-light">{eventDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Ubicación</p>
                  <p className="text-sm text-gray-300 font-light">{location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">
              Contacto
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-gray-400 hover:text-rose-400 transition-colors group"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-light group-hover:underline">{email}</span>
              </a>
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-gray-400 hover:text-rose-400 transition-colors group"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-light group-hover:underline">{phone}</span>
              </a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">
              Sígueme
            </h3>
            <div className="flex gap-3">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 rounded-full transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </a>
              )}
              {socialLinks.whatsapp && (
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-green-500 rounded-full transition-all duration-300 group"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent mb-8 origin-center"
        />

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 font-light"
        >
          <div className="flex items-center justify-center gap-1">
            <span>© {currentYear}</span>
            <Heart className="w-3 h-3 text-rose-400" fill="currentColor" />
            <span>Diseñado con amor para los XV Años de {quinceaneraName}</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-rose-400 transition-colors">
              Privacidad
            </Link>
            <Link href="/terms" className="hover:text-rose-400 transition-colors">
              Términos
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
