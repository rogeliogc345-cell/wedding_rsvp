"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Anchor, ArrowDown, CalendarDays, Clock3, MapPin, Waves } from "lucide-react";

const weddingDate = new Date("2027-06-19T16:30:00");
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.85, ease: "easeOut" as const },
};

function getTimeLeft() {
  const difference = weddingDate.getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

const schedule = [
  { time: "16:30", title: "Ceremonia frente al mar", detail: "Promesas, brisa y un sí para siempre." },
  { time: "18:00", title: "Cóctel al atardecer", detail: "Un brindis con los pies en la arena." },
  { time: "20:00", title: "Cena junto a las olas", detail: "Sabores de la costa y sobremesa larga." },
  { time: "22:00", title: "A bailar descalzos", detail: "Que la noche y la música nos encuentren." },
];

export default function Page() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const countdown = [
    { label: "días", value: timeLeft.days },
    { label: "horas", value: timeLeft.hours },
    { label: "minutos", value: timeLeft.minutes },
    { label: "segundos", value: timeLeft.seconds },
  ];

  return (
    <main className="overflow-hidden bg-[#f8f6ef] text-[#183e49]">
      <section
        className="relative flex min-h-[100svh] items-center justify-center bg-fixed px-6 py-20 text-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(11,42,52,0.14) 0%, rgba(11,42,52,0.28) 45%, rgba(11,42,52,0.72) 100%), url('/boda/boda_7.jpeg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(7,33,43,0.2)_100%)]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-4xl"
        >
          <p className="mb-7 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.42em] text-[#f7e7c5] sm:text-xs">
            <Waves aria-hidden="true" className="h-4 w-4" />
            Una historia escrita por el mar
          </p>
          <p className="font-serif text-6xl font-light italic leading-none sm:text-8xl md:text-9xl">
            Lucía <span className="text-[#f1d39b]">&</span> Sebastián
          </p>
          <div className="mx-auto my-8 flex items-center justify-center gap-3 text-[#f1d39b]">
            <span className="h-px w-12 bg-current" />
            <Anchor aria-hidden="true" className="h-4 w-4" />
            <span className="h-px w-12 bg-current" />
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/90 sm:text-sm">
            19 de junio de 2027 <span className="mx-2 text-[#f1d39b]">·</span> Punta Mita, Nayarit
          </p>
          <p className="mx-auto mt-6 max-w-lg font-serif text-xl italic leading-8 text-white/90 sm:text-2xl">
            El mejor destino siempre será encontrarnos.
          </p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.45 } },
            }}
            className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {countdown.map((item) => (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="border border-white/35 bg-[#123b46]/30 px-4 py-4 backdrop-blur-sm"
              >
                <p className="font-serif text-4xl text-[#f7e7c5] sm:text-5xl">
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/80">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
          <a
            href="#invitacion"
            className="mt-12 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/85 transition hover:text-[#f7e7c5]"
          >
            Descubre nuestra invitación
            <ArrowDown aria-hidden="true" className="h-4 w-4" />
          </a>
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 text-[#f8f6ef]">
          <svg aria-hidden="true" className="block h-12 w-full sm:h-20" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,54 C180,100 320,14 520,52 C720,90 840,100 1040,56 C1220,16 1320,32 1440,64 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      <motion.section {...reveal} id="invitacion" className="px-6 py-20 text-center sm:py-28">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#ad8860]">Con el corazón lleno de alegría</p>
        <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-light leading-tight text-[#183e49] sm:text-6xl">
          Nos encantaría que fueras parte de este capítulo
        </h1>
        <div className="mx-auto my-7 h-px w-16 bg-[#c69d6c]" />
        <p className="mx-auto max-w-2xl text-sm leading-8 text-[#60797a] sm:text-base">
          Hay días que se quedan para siempre en la memoria. El nuestro tendrá sal en el aire,
          arena bajo los pies y la felicidad de celebrar rodeados de nuestra gente favorita.
          Guarda la fecha: queremos vivirlo contigo.
        </p>
        <p className="mt-8 font-serif text-2xl italic text-[#ad8860]">Con cariño, Lucía y Sebastián</p>
      </motion.section>

      <motion.section {...reveal} className="grid bg-[#e8efec] md:min-h-[580px] md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
          role="img"
          aria-label="Novios celebrando una boda junto al mar al atardecer"
          className="min-h-[360px] bg-cover bg-center md:min-h-full"
          style={{ backgroundImage: "url('/boda/boda_7.jpeg')" }}
        />
        <motion.div {...reveal} className="flex items-center px-8 py-16 sm:px-14 lg:px-20">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[#ad8860]">
              <Waves aria-hidden="true" className="h-4 w-4" />
              Nuestra celebración
            </p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl">
              Una tarde, la marea y un sí
            </h2>
            <p className="mt-6 text-sm leading-8 text-[#60797a]">
              Nos reuniremos en una playa escondida de la Riviera Nayarit para brindar por el amor,
              por los nuevos comienzos y por todos los caminos que nos trajeron hasta aquí. Ven con
              ganas de celebrar; nosotros ponemos el mar.
            </p>
            <div className="mt-8 flex items-center gap-4 border-t border-[#c8d7d1] pt-6">
              <CalendarDays aria-hidden="true" className="h-5 w-5 shrink-0 text-[#ad8860]" />
              <div>
                <p className="text-sm font-medium">Sábado, 19 de junio de 2027</p>
                <p className="mt-1 text-xs text-[#60797a]">Ceremonia a las 16:30 horas</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section {...reveal} className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#ad8860]">El plan perfecto</p>
            <h2 className="mt-4 font-serif text-4xl font-light sm:text-5xl">A la hora dorada</h2>
          </div>
          <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-[#d9cbb4] lg:block" />
            {schedule.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
                className="relative text-center"
              >
                <span className="relative mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#c69d6c] bg-[#f8f6ef]">
                  <span className="h-2 w-2 rounded-full bg-[#c69d6c]" />
                </span>
                <p className="mt-5 font-serif text-3xl text-[#ad8860]">{item.time}</p>
                <h3 className="mt-2 text-sm font-medium">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-[220px] text-xs leading-6 text-[#718585]">{item.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} className="relative overflow-hidden bg-[#183e49] px-6 py-20 text-center text-white sm:py-24">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -right-10 -top-14 h-52 w-52 rounded-full border border-white/10" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#f1d39b]">Nos vemos en la playa</p>
          <h2 className="mt-4 font-serif text-4xl font-light sm:text-5xl">Mar de sueños, Punta Mita</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70">
            Playa Escondida, Bahía de Banderas, Nayarit. Te recomendamos llegar con tiempo para
            disfrutar el atardecer y encontrar tu lugar junto al mar.
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col items-center justify-center gap-4 border-y border-white/15 py-5 text-sm sm:flex-row">
            <span className="flex items-center gap-2"><MapPin aria-hidden="true" className="h-4 w-4 text-[#f1d39b]" /> Punta Mita, Nayarit</span>
            <span className="hidden h-4 w-px bg-white/25 sm:block" />
            <span className="flex items-center gap-2"><Clock3 aria-hidden="true" className="h-4 w-4 text-[#f1d39b]" /> 16:30 h</span>
          </div>
          <p className="mt-7 text-xs uppercase tracking-[0.2em] text-white/70">
            Vestimenta <span className="mx-2 text-[#f1d39b]">·</span> Formal tropical
          </p>
          <p className="mt-2 text-xs leading-6 text-white/55">
            Lino, tonos claros y zapatos cómodos para la arena. Por favor, evita el blanco.
          </p>
          <a
            href="https://maps.google.com/?q=Punta+Mita+Nayarit"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2 border border-[#f1d39b]/70 px-6 text-[10px] uppercase tracking-[0.2em] text-[#f7e7c5] transition hover:bg-[#f1d39b] hover:text-[#183e49]"
          >
            Cómo llegar
            <MapPin aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </motion.section>

      <motion.section {...reveal} className="px-6 py-20 text-center sm:py-24">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#ad8860]">Tu presencia es nuestro mejor regalo</p>
        <h2 className="mt-4 font-serif text-4xl font-light sm:text-5xl">¿Brindamos juntos?</h2>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#60797a]">
          Confírmanos antes del 19 de mayo. Nos hace mucha ilusión saber que compartirás con nosotros.
        </p>
        <a
          href="mailto:hola@lucia-sebastian.com?subject=Confirmaci%C3%B3n%20de%20asistencia%20%E2%80%94%20Boda%20junto%20al%20mar&body=%C2%A1Hola%2C%20Luc%C3%ADa%20y%20Sebasti%C3%A1n!%0A%0ACon%20mucho%20gusto%20confirmo%20mi%20asistencia%20a%20su%20boda.%0A%0ANombre%3A%20%0AN%C3%BAmero%20de%20acompa%C3%B1antes%3A%20"
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#183e49] px-8 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-[#285d69] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ad8860]"
        >
          Confirmar asistencia
        </a>
        <p className="mt-4 text-[10px] text-[#819494]">RSVP · 19 de mayo de 2027</p>
      </motion.section>

      <motion.footer {...reveal} className="border-t border-[#e5e0d5] px-6 py-8 text-center">
        <p className="font-serif text-xl italic text-[#183e49]">Lucía & Sebastián</p>
        <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-[#819494]">
          Hasta que la marea nos reúna · 19.06.2027
        </p>
      </motion.footer>
    </main>
  );
}
