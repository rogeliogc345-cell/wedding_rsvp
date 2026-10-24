"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Flower2, Sparkles, ShieldCheck, Smartphone, Music2, PanelsRightBottom } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-800 selection:text-white">
      <header className="relative overflow-hidden bg-[#f4f0e6] text-[#193a34]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,58,52,0.035)_1px,transparent_1px),linear-gradient(rgba(25,58,52,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />

        <motion.nav
          className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-b border-[#193a34]/20 px-5 py-5 sm:px-8 md:px-10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Link href="/" className="font-[family-name:var(--font-playfair)] text-xl font-semibold tracking-tight text-[#193a34] sm:text-2xl">
            XVBodaOnline
          </Link>
          <div className="hidden gap-8 text-[11px] uppercase tracking-[0.2em] text-[#49645c] md:flex">
            <Link href="#features" className="transition hover:text-[#b54c39]">Tu invitación</Link>
            <Link href="/xv" className="transition hover:text-[#b54c39]">Ver colección</Link>
          </div>
        </motion.nav>

        <motion.section
          className="relative z-10 flex items-center justify-center px-5 pb-16 pt-12 text-center sm:pb-20 sm:pt-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
        >
          <motion.div
            className="mx-auto w-full max-w-5xl px-1 py-6 sm:px-8 sm:py-8"
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-5 flex items-center justify-center gap-3 text-[#b54c39]">
              <Flower2 aria-hidden="true" className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-[0.28em] sm:text-xs">Invitaciones digitales · Bodas · XV años</span>
              <Flower2 aria-hidden="true" className="h-4 w-4" />
            </div>

            <div className="mx-auto mb-5 max-w-3xl border-y border-[#193a34]/70 py-3 sm:py-4">
              <p className="font-[family-name:var(--font-playfair)] text-4xl uppercase tracking-[0.12em] text-[#193a34] sm:text-6xl md:text-7xl">
                XVBodaOnline
              </p>
            </div>

            <h1 className="mx-auto mb-4 max-w-3xl font-[family-name:var(--font-syne)] text-2xl font-semibold uppercase leading-tight text-[#193a34] sm:text-3xl md:text-4xl">
              El comienzo de algo <span className="font-[family-name:var(--font-playfair)] font-normal italic normal-case text-[#b54c39]">inolvidable</span>
            </h1>

            <p className="mx-auto mb-7 max-w-2xl text-sm leading-7 text-[#52655d] sm:text-base md:text-lg">
              Invitaciones digitales diseñadas para celebrar tu gran día con belleza, emoción y todos los detalles que tus invitados necesitan.
            </p>

            <div className="mx-auto mb-9 flex max-w-md items-center justify-center gap-0">
              <InvitationPhone
                image="/boda/boda_7.jpeg"
                title="Invitación de boda"
                variant="back"
              />
              <InvitationPhone
                image="/XVAnos_2.png"
                title="Invitación de XV años"
                variant="front"
              />
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/boda">
                <Button className="min-h-12 rounded-sm bg-[#193a34] px-7 text-sm text-white shadow-lg shadow-[#193a34]/15 hover:bg-[#28564b]">
                  Explorar diseños de boda <ArrowRight className="ml-2" />
                </Button>
              </Link>

              <Link href="/xv">
                <Button variant="outline" className="min-h-12 rounded-sm border-[#193a34] px-7 text-sm text-[#193a34] hover:bg-[#193a34] hover:text-white">
                  Explorar diseños XV <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

        </motion.section>
      </header>

      <motion.section
        className="relative min-h-[460px] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/xv/fondo_demo1_hero.png')" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[#193a34]/75" />
        <motion.div
          className="relative z-10 flex min-h-[520px] items-center justify-center px-6 py-20 text-center text-white"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <div className="max-w-3xl">
            <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-[#f0d8a5]">Hay momentos que merecen quedarse para siempre</p>
            <blockquote className="font-[family-name:var(--font-playfair)] text-4xl leading-tight md:text-6xl">
              “Tu historia es única. Haz que cada invitado la sienta desde el primer instante.”
            </blockquote>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Diseñamos una invitación que no solo anuncia tu celebración: abre la puerta a la emoción, la ilusión y los recuerdos que están por comenzar.
            </p>
            <Link href="/xv" className="mt-10 inline-block">
              <Button className="rounded-sm bg-[#f4f0e6] px-8 py-4 text-sm text-[#193a34] shadow-xl shadow-black/20 hover:bg-white">
                Crear un momento inolvidable <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.section>

      {/* --- FEATURE GRID --- */}
      <motion.section
        id="features"
        className="bg-[#193a34] py-24"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 max-w-2xl text-white">
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#e4b887]">Todo lo que imaginas</p>
            <h2 className="font-playfair text-4xl leading-tight md:text-5xl">Un recuerdo que empieza desde la invitación.</h2>
          </div>
          <motion.div
            className="grid gap-px border border-[#45645b] bg-[#45645b] md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >

            <FeatureCard
              icon={<ShieldCheck className="h-8 w-8 text-[#b54c39]" />}
              title="RSVP Seguro"
              description="Confirmaciones con códigos únicos y privacidad para tus invitados."
            />

            <FeatureCard
              icon={<Smartphone className="h-8 w-8 text-[#b54c39]" />}
              title="Mobile First"
              description="Experiencias adaptadas a dispositivos, con navegación simple y elegante."
            />

            <FeatureCard
              icon={<PanelsRightBottom className="h-8 w-8 text-[#b54c39]" />}
              title="Galería de recuerdos"
              description="Comparte fotos y videos con un diseño limpio que realza tus momentos."
            />

            <FeatureCard
              icon={<Music2 className="h-8 w-8 text-[#b54c39]" />}
              title="Música de ambiente"
              description="Incluye tu canción favorita; reproduce automáticamente para crear ambiente."
            />

            <FeatureCard
              icon={<Sparkles className="h-8 w-8 text-[#b54c39]" />}
              title="Detalles personalizados" 
              description="Tipografías, paletas y toques dorados para una identidad única."
            />

            <FeatureCard
              icon={<ArrowRight className="h-8 w-8 text-[#b54c39]" />}
              title="Fácil de enviar"
              description="Compartir invitaciones por link o QR en segundos."
            />

          </motion.div>
        </div>
      </motion.section>

      {/* --- FOOTER --- */}
      <motion.footer
        className="border-t border-[#45645b] bg-[#142d28] py-20 text-center text-[#c0cec4]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <p className="mb-4 font-[family-name:var(--font-playfair)] text-2xl italic text-white">XVBodaOnline</p>
        <p className="text-xs uppercase tracking-widest">&copy; 2026 Creado con Amor — Inspirando recuerdos</p>
      </motion.footer>
    </div>
  );
}

function InvitationPhone({
  image,
  title,
  variant,
}: {
  image: string;
  title: string;
  variant: "back" | "front";
}) {
  const isFront = variant === "front";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotate: isFront ? 7 : -8 }}
      animate={{ opacity: 1, y: 0, rotate: isFront ? 5 : -7 }}
      transition={{ duration: 0.8, delay: isFront ? 0.5 : 0.35, ease: "easeOut" }}
      className={`relative h-[clamp(300px,82vw,420px)] w-[clamp(145px,40vw,210px)] shrink-0 rounded-[30px] border-[7px] border-[#18312d] bg-[#18312d] p-[4px] shadow-[0_22px_50px_rgba(25,58,52,0.24)] ${isFront ? "z-10" : "z-0"}`}
      aria-label={title}
    >
      <div className="absolute left-1/2 top-0 z-20 h-5 w-20 -translate-x-1/2 rounded-b-xl bg-[#18312d]" />
      <div className="relative h-full w-full overflow-hidden rounded-[21px] bg-white">
        <img
          src={image}
          alt={title}
          className={`h-full w-full object-cover ${isFront ? "object-[62%_center]" : "object-center"}`}
          loading="lazy"
        />
        {!isFront && (
          <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-[#102e35]/85 via-[#102e35]/20 to-transparent px-2 pb-9 text-center text-white">
            <p className="text-[7px] uppercase tracking-[0.24em] text-white/85">Nos casamos</p>
            <p className="mt-2 font-serif text-[19px] italic leading-none">Lucía & Sebastián</p>
            <p className="mt-3 text-[7px] uppercase tracking-[0.2em]">19 · 06 · 2027</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      className="flex flex-col items-start bg-[#f7f4eb] p-6 md:p-7"
      variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <div className="mb-4 inline-flex items-center justify-center rounded-md bg-[#f0e5d2] p-3">{icon}</div>
      <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-xl text-[#193a34]">{title}</h3>
      <p className="text-sm leading-relaxed text-[#52655d]">{description}</p>
    </motion.div>
  );
}
