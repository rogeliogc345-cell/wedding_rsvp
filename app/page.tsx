"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Smartphone, Music2, PanelsRightBottom } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-800 selection:text-white">
      <header
        className="relative overflow-hidden bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/xv/fondo_demo1_hero.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/65 to-black/55 -z-10"></div>
        <div className="absolute inset-0 bg-neutral-900/5 -z-0"></div>

        <motion.nav
          className="relative z-10 flex justify-between items-center px-6 md:px-10 py-6 max-w-7xl mx-auto border-b border-black/10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="text-2xl font-parisienneSerif tracking-tight italic">XVBoda</div>
          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.25em] text-neutral-800">
            <Link href="#features" className="hover:text-black transition">Tu invitación</Link>
            <Link href="/xv" className="hover:text-black transition">Ver colección</Link>
          </div>
        </motion.nav>

        <motion.section
          className="relative z-10 flex items-center justify-center text-center px-5 pt-16 md:pt-24 pb-24 md:pb-32"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
        >
          <motion.div
            className="w-full max-w-5xl mx-auto border border-black/20 bg-white/30 px-5 py-12 md:px-16 md:py-16 backdrop-blur-[2px]"
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 justify-center mb-7 opacity-90">
              <span className="h-px w-10 bg-neutral-800" />
              <span className="uppercase tracking-[0.35em] text-[11px] text-neutral-900">Bodas · XV años</span>
              <span className="h-px w-10 bg-neutral-800" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-parisienneSerif mb-6 leading-[0.95] text-neutral-900 drop-shadow-[0_6px_20px_rgba(255,255,255,0.8)]">
              El comienzo de algo <span className="italic">inolvidable</span>
            </h1>

            <p className="text-base md:text-lg text-neutral-800 mb-10 max-w-2xl mx-auto leading-relaxed">
              Invitaciones digitales diseñadas para celebrar tu gran día con belleza, emoción y todos los detalles que tus invitados necesitan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-neutral-900 text-white hover:bg-neutral-800 px-8 py-4 rounded-full text-base shadow-2xl shadow-neutral-900/25">
                  Diseñar mi invitación <ArrowRight className="ml-2" />
                </Button>
              </Link>

              <Link href="/xv">
                <Button variant="outline" className="px-8 py-4 rounded-full text-base border-neutral-700 text-neutral-800 hover:bg-neutral-800 hover:text-white">
                  Explorar diseños
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Decorative cinematic glow */}
          <div className="pointer-events-none absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[80%] h-72 bg-gradient-to-t from-transparent via-white/40 to-transparent blur-3xl opacity-60 rounded-full" />
        </motion.section>
      </header>

      {/* --- FEATURE GRID --- */}
      <motion.section
        id="features"
        className="py-24 bg-neutral-900"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-14 text-white">
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-neutral-400">Todo lo que imaginas</p>
            <h2 className="text-4xl md:text-5xl font-parisienneSerif leading-tight">Un recuerdo que empieza desde la invitación.</h2>
          </div>
          <motion.div
            className="grid md:grid-cols-3 gap-px bg-neutral-700 border border-neutral-700"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >

            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-neutral-800" />}
              title="RSVP Seguro"
              description="Confirmaciones con códigos únicos y privacidad para tus invitados."
            />

            <FeatureCard
              icon={<Smartphone className="w-8 h-8 text-neutral-800" />}
              title="Mobile First"
              description="Experiencias adaptadas a dispositivos, con navegación simple y elegante."
            />

            <FeatureCard
              icon={<PanelsRightBottom className="w-8 h-8 text-neutral-800" />}
              title="Galería de recuerdos"
              description="Comparte fotos y videos con un diseño limpio que realza tus momentos."
            />

            <FeatureCard
              icon={<Music2 className="w-8 h-8 text-neutral-800" />}
              title="Música de ambiente"
              description="Incluye tu canción favorita; reproduce automáticamente para crear ambiente."
            />

            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-neutral-800" />}
              title="Detalles personalizados"
              description="Tipografías, paletas y toques dorados para una identidad única."
            />

            <FeatureCard
              icon={<ArrowRight className="w-8 h-8 text-neutral-800" />}
              title="Fácil de enviar"
              description="Compartir invitaciones por link o QR en segundos."
            />

          </motion.div>
        </div>
      </motion.section>

      {/* --- FOOTER --- */}
      <motion.footer
        className="py-20 text-center text-neutral-400 border-t border-neutral-700 bg-neutral-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <p className="font-parisienneSerif italic text-2xl text-white mb-4">XVBoda</p>
        <p className="text-xs uppercase tracking-widest">&copy; 2026 Creado con Amor — Inspirando recuerdos</p>
      </motion.footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      className="flex flex-col items-start bg-white p-6 md:p-7"
      variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <div className="mb-4 p-3 bg-neutral-100 rounded-lg inline-flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-parisienneSerif text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
