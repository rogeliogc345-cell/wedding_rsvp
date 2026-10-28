"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check, Flower2, Sparkles, ShieldCheck, Smartphone, Music2, PanelsRightBottom } from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "@/components/public/ContactForm";

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
            <Link href="#precios" className="transition hover:text-[#b54c39]">Precios</Link>
            <Link href="#contact" className="transition hover:text-[#b54c39]">Contacto</Link>
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
                image="/boda/boda_1.jpeg"
                title="Invitación elegante de boda"
                variant="back"
              />
              <InvitationPhone
                image="/boda/boda_7.jpeg"
                title="Detalles de la boda"
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
        style={{ backgroundImage: "url('/boda/boda_5.jpeg')" }}
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

      <motion.section
        id="precios"
        className="relative overflow-hidden bg-[#f4f0e6] px-6 py-24 text-[#193a34] sm:py-28"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#b54c39]/15 sm:h-96 sm:w-96" />
        <div aria-hidden="true" className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-[#b54c39]/10 sm:h-72 sm:w-72" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-[#b54c39] sm:text-xs">
              <Sparkles aria-hidden="true" className="h-4 w-4" />
              Una invitación, todo lo que necesitas
            </p>
            <h2 className="max-w-2xl font-[family-name:var(--font-playfair)] text-4xl leading-tight sm:text-5xl md:text-6xl">
              Un gran día merece una invitación <span className="italic text-[#b54c39]">inolvidable.</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#52655d] sm:text-base">
              Comparte cada detalle de tu celebración con una experiencia digital elegante, personalizada y fácil de enviar.
            </p>

            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                "Confirmación RSVP segura",
                "Diseño adaptable a celulares",
                "Galería de fotos y recuerdos",
                "Música",
                "Detalles y estilo personalizados",
                "Envío por enlace o código QR",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-[#344c43]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#193a34] text-[#f4f0e6]">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md border border-[#193a34]/15 bg-white p-7 shadow-[0_24px_70px_rgba(25,58,52,0.12)] sm:p-10">
            <div className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center bg-[#b54c39] text-[#fffaf0]">
              <Flower2 aria-hidden="true" className="h-6 w-6" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#718078]">Paquete digital</p>
            <p className="mt-5 font-[family-name:var(--font-playfair)] text-2xl text-[#193a34]">Tu historia empieza aquí</p>
            <div className="mt-5 flex items-end gap-2">
              <span className="pb-2 text-sm text-[#52655d]">Desde</span>
              <span className="font-[family-name:var(--font-playfair)] text-6xl leading-none text-[#193a34] sm:text-7xl">$1,500</span>
              <span className="pb-2 text-xs uppercase tracking-[0.16em] text-[#718078]">MXN</span>
            </div>
            <p className="mt-4 border-t border-[#193a34]/10 pt-5 text-sm leading-6 text-[#52655d]">
              Todas las características esenciales para invitar, emocionar y mantener a tus invitados al tanto.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <Link href="/boda" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#193a34] px-5 text-sm text-white transition-colors hover:bg-[#28564b]">
                Ver diseños de boda <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link href="/xv" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#193a34]/25 px-5 text-sm text-[#193a34] transition-colors hover:bg-[#f4f0e6]">
                Ver diseños de XV <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-5 text-center text-[10px] uppercase tracking-[0.18em] text-[#718078]">
              Para celebrar a tu manera
            </p>
          </div>
        </div>
      </motion.section>

      <ContactForm />

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
