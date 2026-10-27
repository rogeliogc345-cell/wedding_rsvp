"use client";

import { motion } from "framer-motion";
import {
  Bell,
  GlassWater,
  Heart,
  Music4,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const targetDate = new Date("2027-08-14T16:00:00");

function getTimeLeft() {
  const difference = targetDate.getTime() - Date.now();

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

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Page() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const countdownItems = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <div className="bg-[#f8f7ef] text-[#253d39]">
      <main
        className="relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-[#31514a] px-5 py-20"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(24,48,42,0.22), rgba(24,48,42,0.65)), url('/boda/boda_5.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,246,208,0.16),transparent_62%)]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 w-full max-w-4xl text-center text-white"
        >
          <p className="mb-8 text-xs uppercase tracking-[0.38em] text-[#f4e9bf]">
            Una tarde para recordar
          </p>
          <p className="font-serif text-5xl italic leading-tight sm:text-7xl">
            Valentina <span className="text-[#e7c973]">&</span> Santiago
          </p>
          <div className="mx-auto my-8 h-px w-20 bg-[#e7c973]" />
          <p className="text-sm uppercase tracking-[0.3em] text-white/90 sm:text-base">
            14 de agosto de 2027 · Valle de Bravo
          </p>
        </motion.div>
      </main>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="mx-auto -mt-10 w-full max-w-5xl px-5 pb-14 sm:px-0"
      >
        <div className="flex flex-wrap items-center justify-center gap-0 border border-[#d8c891] bg-[#2a433f]/90 px-1 py-3 text-white shadow-[0_18px_32px_rgba(28,39,37,0.12)] backdrop-blur-sm sm:px-2">
          {countdownItems.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center justify-center border-r border-white/10 last:border-r-0"
            >
              <div className="min-w-[92px] px-2 py-2 text-center sm:min-w-[120px] sm:px-4">
                <p className="font-serif text-2xl text-[#f4e9bf] sm:text-4xl">
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/75 sm:text-[10px]">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section {...reveal} className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.32em] text-[#9b7d35]">Nuestra historia</p>
          <h2 className="font-serif text-4xl leading-tight text-[#253d39] sm:text-5xl">
            Un encuentro que floreció bajo el sol
          </h2>
          <div className="h-px w-20 bg-[#c9a84f]" />
          <p className="text-base leading-8 text-[#61716b]">
            Lo que comenzó con una conversación tranquila se convirtió en nuestro lugar favorito:
            estar juntos. Entre viajes, sobremesas largas y planes compartidos, fuimos construyendo
            una historia que hoy queremos celebrar con las personas que más queremos.
          </p>
          <p className="text-base leading-8 text-[#61716b]">
            Nos hace mucha ilusión abrir este nuevo capítulo rodeados de ustedes. Preparen el
            corazón y los zapatos de baile: será una tarde llena de luz, abrazos y buenos recuerdos.
          </p>
        </div>
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.96 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -bottom-4 -left-4 h-full w-full border border-[#c9a84f]/60" />
          <img
            src="/boda/boda_6.jpeg"
            alt="Un momento especial de Valentina y Santiago"
            className="relative h-[420px] w-full object-cover sm:h-[540px]"
          />
        </motion.div>
      </motion.section>

      <motion.section {...reveal} className="bg-[#e9eee5] px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-[#9b7d35]">La celebración</p>
            <h2 className="mt-4 font-serif text-4xl text-[#253d39] sm:text-5xl">Nos vemos en Valle</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#61716b]">
              Un rincón entre el lago y las montañas será el escenario para nuestro día.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                type: "Ceremonia",
                name: "Jardín Los Sauces",
                detail: "14 de agosto · 16:00 h · Carretera Avándaro, Valle de Bravo",
                image: "/boda/boda_7.jpeg",
              },
              {
                type: "Recepción",
                name: "Casa del Lago",
                detail: "Cóctel de bienvenida a las 18:00 h · Avándaro, Estado de México",
                image: "/boda/boda_8.jpeg",
              },
            ].map((event, index) => (
              <motion.article
                key={event.type}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                className="grid bg-[#f8f7ef] sm:grid-cols-[0.9fr_1.1fr]"
              >
                <img src={event.image} alt={event.name} className="h-60 w-full object-cover sm:h-full" />
                <div className="flex flex-col justify-center p-7 sm:p-9">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#9b7d35]">{event.type}</p>
                  <h3 className="mt-3 font-serif text-3xl text-[#253d39]">{event.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#61716b]">{event.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#9b7d35]">Para su visita</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#253d39] sm:text-5xl">
              Un descanso cerca del lago
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#61716b]">
            Agosto es una temporada preciosa para visitar Valle de Bravo. Les recomendamos reservar
            con tiempo y consultar directamente la disponibilidad de cada hospedaje.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            {
              name: "Hotel Misión Grand",
              description: "Estadía rodeada de jardines, con espacios tranquilos para relajarse después de la fiesta.",
              image: "/boda/boda_8.jpeg",
            },
            {
              name: "Posada del Bosque",
              description: "Una opción acogedora entre árboles, a pocos minutos de los lugares de celebración.",
              image: "/boda/boda_9.jpeg",
            },
          ].map((hotel, index) => (
            <motion.article
              key={hotel.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              className="grid border border-[#d9dfd4] sm:grid-cols-[1fr_1.2fr]"
            >
              <img src={hotel.image} alt={hotel.name} className="h-56 w-full object-cover sm:h-full" />
              <div className="p-7">
                <h3 className="font-serif text-3xl text-[#253d39]">{hotel.name}</h3>
                <p className="mt-4 text-sm leading-7 text-[#61716b]">{hotel.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section {...reveal} className="bg-[#31514a] px-6 py-20 text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-[#e7c973]">Sábado 14 de agosto</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Así viviremos el día</h2>
          </div>
          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { time: "16:00", title: "Ceremonia", icon: Heart, description: "Unimos nuestras vidas junto al jardín." },
              { time: "18:00", title: "Cóctel", icon: GlassWater, description: "Un brindis para darles la bienvenida." },
              { time: "20:00", title: "Cena", icon: UtensilsCrossed, description: "Compartimos la mesa y la alegría." },
              { time: "22:00", title: "Primer baile", icon: Music4, description: "Inauguramos la pista juntos." },
              { time: "22:30", title: "Celebración", icon: Bell, description: "La noche es nuestra, ¡a bailar!" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="border-l border-white/25 py-5 pl-5 sm:min-h-48 lg:border-l-0 lg:border-t lg:pl-4 lg:pt-6"
                >
                  <Icon aria-hidden="true" className="h-5 w-5 text-[#e7c973]" />
                  <p className="mt-5 font-serif text-3xl text-[#f4e9bf]">{item.time}</p>
                  <h3 className="mt-2 text-sm font-medium">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/70">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#9b7d35]">Con nuestras familias</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#253d39] sm:text-5xl">
              El amor que nos trajo hasta aquí
            </h2>
            <p className="mt-6 text-base leading-8 text-[#61716b]">
              A nuestras familias, gracias por ser casa, consejo y alegría en cada etapa. Nos emociona
              celebrar este paso con ustedes y llevar todo su cariño con nosotros.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { names: "Claudia y Roberto Méndez", role: "Papás de Valentina", image: "/boda/boda_2.jpeg" },
              { names: "Patricia y Andrés Ríos", role: "Papás de Santiago", image: "/boda/boda_3.jpeg" },
            ].map((parent, index) => (
              <motion.article
                key={parent.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <img src={parent.image} alt="" className="h-72 w-full object-cover sm:h-80" />
                <h3 className="mt-5 font-serif text-2xl text-[#253d39]">{parent.names}</h3>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#9b7d35]">{parent.role}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} className="bg-[#e9eee5] px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-[#9b7d35]">Personas especiales</p>
            <h2 className="mt-4 font-serif text-4xl text-[#253d39] sm:text-5xl">Nuestros padrinos</h2>
          </div>
          <div className="mt-10 grid gap-px bg-[#cbd5c9] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { role: "Padrinos de velación", names: "Lucía y Miguel" },
              { role: "Padrinos de anillos", names: "Renata y Diego" },
              { role: "Padrinos de arras", names: "Camila y Fernando" },
              { role: "Padrinos de lazo", names: "Mariana y Pablo" },
            ].map((group, index) => (
              <motion.div
                key={group.role}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                className="bg-[#e9eee5] px-6 py-8 text-center"
              >
                <Heart aria-hidden="true" className="mx-auto h-5 w-5 text-[#9b7d35]" />
                <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#718078]">{group.role}</p>
                <h3 className="mt-2 font-serif text-2xl text-[#253d39]">{group.names}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-[#9b7d35]">Un detalle con cariño</p>
          <h2 className="mt-4 font-serif text-4xl text-[#253d39] sm:text-5xl">Su compañía es nuestro regalo</h2>
          <p className="mt-5 text-sm leading-7 text-[#61716b]">
            Si desean hacernos un obsequio, aquí compartimos algunas ideas para nuestro nuevo hogar.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="border border-[#d9dfd4] p-8"
          >
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#9b7d35]">Mesa de regalos</p>
            <h3 className="mt-4 font-serif text-3xl text-[#253d39]">Un hogar por estrenar</h3>
            <p className="mt-4 text-sm leading-7 text-[#61716b]">
              Estamos reuniendo piezas para llenar de historias nuestro primer hogar juntos.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Liverpool", "Amazon", "Palacio de Hierro"].map((store) => (
                <span key={store} className="border border-[#cbd5c9] px-3 py-2 text-xs text-[#526c56]">{store}</span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
            className="flex flex-col justify-center bg-[#f2f0df] p-8"
          >
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#9b7d35]">Luna de miel</p>
            <h3 className="mt-4 font-serif text-3xl text-[#253d39]">Nuestro próximo viaje</h3>
            <p className="mt-4 text-sm leading-7 text-[#61716b]">
              También pueden ayudarnos a hacer realidad una aventura inolvidable después de la boda.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-6 min-h-11 w-full rounded-none bg-[#31514a] text-xs uppercase tracking-[0.14em] text-white hover:bg-[#253d39]">
                  Ver datos para regalo
                </Button>
              </DialogTrigger>
              <DialogContent className="border-[#d9dfd4] bg-[#f8f7ef] sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-serif text-3xl text-[#253d39]">Regalo para el viaje</DialogTitle>
                  <DialogDescription className="text-[#61716b]">
                    Datos de ejemplo para esta invitación de demostración.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-3 space-y-3 border border-[#d9dfd4] bg-white p-5 text-sm text-[#52645e]">
                  <p><span className="font-medium text-[#253d39]">Banco:</span> BBVA</p>
                  <p><span className="font-medium text-[#253d39]">Titulares:</span> Valentina Méndez y Santiago Ríos</p>
                  <p><span className="font-medium text-[#253d39]">CLABE:</span> 000000000000000000</p>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </motion.section>

      <motion.footer {...reveal} className="bg-[#253d39] px-6 py-12 text-center text-white">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#e7c973]">Con mucho cariño</p>
        <h2 className="mt-4 font-serif text-4xl">Valentina & Santiago</h2>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/75">14 de agosto de 2027 · Valle de Bravo</p>
        <p className="mt-6 font-serif text-lg italic text-white/80">Gracias por ser parte de nuestra historia.</p>
      </motion.footer>
    </div>
  );
}
