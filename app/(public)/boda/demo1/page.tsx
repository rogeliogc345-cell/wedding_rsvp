"use client";

import { motion } from "framer-motion";
import {
  Bell,
  GlassWater,
  Heart,
  Music4,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const targetDate = new Date("2027-05-22T18:30:00");

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

export default function Page() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownItems = useMemo(
    () => [
      { label: "Días", value: timeLeft.days },
      { label: "Horas", value: timeLeft.hours },
      { label: "Minutos", value: timeLeft.minutes },
      { label: "Segundos", value: timeLeft.seconds },
    ],
    [timeLeft],
  );

  return (
    <div className="bg-[#f7f2ee] text-stone-800">
      <main
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-900"
        style={{
          backgroundImage: "linear-gradient(rgba(22, 17, 18, 0.45), rgba(22, 17, 18, 0.58)), url('/boda/boda_1.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 mx-4 max-w-5xl px-6 py-12 text-center text-white md:px-12"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mb-6 text-xs uppercase tracking-[0.45em] text-stone-200/90"
          >
            Te invitamos a celebrar
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-6 flex items-center justify-center gap-4 text-stone-100"
          >
            <span className="text-4xl font-light italic md:text-6xl">María</span>
            <span className="text-xl tracking-[0.7em] text-rose-200 md:text-2xl">&</span>
            <span className="text-4xl font-light italic md:text-6xl">Mateo</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mx-auto mb-10 h-px w-28 bg-gradient-to-r from-transparent via-white/80 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mb-10 text-base tracking-[0.5em] text-stone-200/90 uppercase md:text-lg"
          >
            22 de mayo de 2027
          </motion.p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {countdownItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.15)] backdrop-blur-sm"
              >
                <div className="text-3xl font-semibold tracking-tight text-rose-100 md:text-5xl">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-stone-200/80 md:text-xs">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-auto max-w-6xl px-6 py-20 md:px-10"
      >
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.5em] text-rose-400">About us</p>
            <h2 className="font-serif text-4xl text-stone-800 md:text-5xl">Nuestra historia empieza aquí</h2>

            <div className="h-px w-24 bg-gradient-to-r from-rose-300 via-rose-400 to-transparent" />

            <p className="text-lg leading-8 text-stone-600">
              Dos corazones, un mismo destino y un amor que creció entre risas, paseos, sueños y
              momentos inolvidables. Cada paso nos llevó a este instante tan especial, donde la
              alegría de compartir nuestra vida se convierte en el comienzo de una nueva aventura.
            </p>

            <p className="text-lg leading-8 text-stone-600">
              Con gratitud, emoción y mucho cariño, te invitamos a celebrar este día tan importante
              junto a nosotros. Queremos compartir con ustedes la belleza de este comienzo y la
              felicidad de caminar juntos hacia el futuro.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="overflow-hidden rounded-[2rem] shadow-[0_25px_70px_rgba(120,61,48,0.18)]"
          >
            <img
              src="/boda/boda_2.jpeg"
              alt="Pareja celebrando"
              className="h-[560px] w-full object-cover transition duration-700 hover:scale-105"
            />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="bg-[#f3e9e4] px-6 py-20 md:px-10"
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.5em] text-rose-500">Cuándo y dónde</p>
          <h2 className="mt-4 font-serif text-4xl text-stone-800 md:text-5xl">Celebración del día más especial</h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {[
            {
              type: "Fecha",
              name: "22 de mayo de 2027",
              detail: "Ceremonia a las 18:30 hrs",
              image: "/boda/boda_3.jpeg",
            },
            {
              type: "Ubicación",
              name: "Jardines del Sol",
              detail: "Av. Primavera 245, Ciudad de México",
              image: "/boda/boda_4.jpeg",
            },
          ].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white/70 shadow-[0_20px_45px_rgba(100,70,58,0.08)] backdrop-blur-sm"
            >
              <img src={item.image} alt={item.name} className="h-56 w-full object-cover" />

              <div className="p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-stone-500">{item.type}</p>
                <h3 className="mt-5 font-serif text-3xl text-stone-800">{item.name}</h3>
                <p className="mt-4 text-base leading-7 text-stone-600">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-auto max-w-6xl px-6 py-20 md:px-10"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.5em] text-rose-500">Hospedaje recomendado</p>
          <h2 className="mt-4 font-serif text-4xl text-stone-800 md:text-5xl">Dónde descansar durante la celebración</h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {[
            {
              name: "Hotel Villa del Alba",
              description: "Un hotel boutique con ambiente íntimo, piscina y servicio personalizado para invitados del evento.",
              price: "Desde $2,400 / noche",
              image: "/boda/boda_5.jpeg",
            },
            {
              name: "Gran Hotel Primavera",
              description: "Elegancia contemporánea, desayuno incluido y una ubicación ideal cerca del lugar de la ceremonia.",
              price: "Desde $2,900 / noche",
              image: "/boda/boda_6.jpeg",
            },
          ].map((hotel, index) => (
            <motion.div
              key={hotel.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white/80 shadow-[0_20px_45px_rgba(100,70,58,0.08)]"
            >
              <img src={hotel.image} alt={hotel.name} className="h-64 w-full object-cover" />

              <div className="p-8">
                <h3 className="font-serif text-3xl text-stone-800">{hotel.name}</h3>
                <p className="mt-4 text-base leading-7 text-stone-600">{hotel.description}</p>
                <div className="mt-6 inline-block rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700">
                  {hotel.price}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative overflow-hidden bg-[#f3eae4] px-4 py-20 md:px-8"
      >
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(circle, rgba(120,104,96,0.12) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-stone-500">Itinerario</p>
            <h2 className="mt-4 font-serif text-4xl text-stone-800 md:text-5xl">Programa del día</h2>
          </div>

          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-stone-300 via-stone-500 to-stone-300 md:block" />

            <div className="space-y-10">
              {[
                { time: "18.00 hs.", title: "Ceremonia", icon: Heart, description: "Llegada a la iglesia y inicio de la ceremonia.", side: "left" },
                { time: "20.00 hs.", title: "Cocktail", icon: GlassWater, description: "Brindis y bienvenida con cócteles para todos.", side: "right" },
                { time: "22.00 hs.", title: "Banquete", icon: UtensilsCrossed, description: "Cena, platillos y momentos mágicos con familia.", side: "left" },
                { time: "00.00 hs.", title: "Baile de novios y brindis", icon: Music4, description: "Nuestra primera canción y el brindis más especial.", side: "right" },
                { time: "00.30 hs.", title: "¡Que no pare la fiesta!", icon: Bell, description: "Música, baile y celebración hasta el final.", side: "left" },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.time + item.title}
                    initial={{ opacity: 0, x: item.side === "left" ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
                    className="relative flex items-center justify-center"
                  >
                    <div
                      className={`w-full max-w-md ${
                        item.side === "left" ? "md:mr-auto md:pr-16 md:text-right" : "md:ml-auto md:pl-16 md:text-left"
                      }`}
                    >
                      <p className="font-serif text-3xl leading-none text-stone-800 md:text-[2.5rem]">{item.time}</p>
                      <h3 className="mt-2 text-2xl leading-tight text-stone-800 md:text-[2.2rem]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-stone-600 md:text-base">{item.description}</p>
                    </div>

                    <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-stone-800 bg-[#f8f3f0] text-xl text-stone-700 shadow-[0_0_0_8px_rgba(255,255,255,0.35)]">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-auto max-w-6xl px-6 py-20 md:px-10"
      >
        <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6 rounded-[2rem] border border-stone-200 bg-white/70 p-8 shadow-[0_20px_50px_rgba(100,70,58,0.08)]">
            <p className="text-sm uppercase tracking-[0.45em] text-rose-500">Padres</p>
            <h2 className="font-serif text-4xl text-stone-800 md:text-5xl">Con el amor de nuestros padres</h2>
            <div className="h-px w-20 bg-gradient-to-r from-rose-300 via-rose-400 to-transparent" />
            <p className="text-lg leading-8 text-stone-600">
              Gracias por guiarnos, acompañarnos y enseñarnos a caminar siempre con amor, paciencia y entusiasmo.
              Su ejemplo nos llena de orgullo y nos acompaña en este nuevo capítulo.
            </p>
            <p className="text-lg leading-8 text-stone-600">
              Con su apoyo y bendición hoy celebramos este momento tan especial, rodeados del cariño que nos ha acompañado toda la vida.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                names: "Ana García & Luis García",
                role: "Padres de la novia",
              },
              {
                names: "Marta Ruiz & Carlos Ruiz",
                role: "Padres del novio",
              },
            ].map((parent, index) => (
              <motion.div
                key={parent.names}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="rounded-[1.75rem] border border-stone-200 bg-[#fffaf7] p-6 text-center shadow-[0_15px_35px_rgba(100,70,58,0.06)]"
              >
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-stone-200 text-3xl">
                  👨‍👩‍👧
                </div>
                <h3 className="font-serif text-3xl text-stone-800">{parent.names}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-stone-500">{parent.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="bg-[#f6efe9] px-6 py-20 md:px-10"
      >
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm uppercase tracking-[0.5em] text-rose-500">Padrinos</p>
          <h2 className="mt-4 font-serif text-4xl text-stone-800 md:text-5xl">Nuestros padrinos</h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
        </div>

        <div className="mx-auto mt-12 max-w-6xl overflow-hidden">
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { category: "Padrinos de la boda", people: ["Sofía Torres", "Daniel Castro", "Valeria Flores"] },
              { category: "Padrinos de la iglesia", people: ["María León", "Javier Soto", "Lucía Vega"] },
              { category: "Padrinos de la recepción", people: ["Cristina Ortega", "Mateo López", "Paula Ramos"] },
              { category: "Padrinos del brindis", people: ["Andrea Mendez", "Rodrigo Paredes", "Clara Sol"] },
              { category: "Padrinos de la fiesta", people: ["Fernanda Silva", "Tomás Rivas", "Mónica Cruz"] },
            ].map((group, index) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="min-w-[280px] snap-center rounded-[2rem] border border-stone-200 bg-white/80 p-6 shadow-[0_18px_40px_rgba(100,70,58,0.08)] md:min-w-[340px]"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-stone-500">{group.category}</p>
                <div className="mt-6 space-y-4">
                  {group.people.map((person) => (
                    <div key={person} className="flex items-center gap-3 rounded-full bg-[#fffaf6] px-4 py-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-stone-200 text-lg">✨</div>
                      <span className="font-medium text-stone-700">{person}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-auto max-w-6xl px-6 py-20 md:px-10"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.5em] text-rose-500">Gifts</p>
          <h2 className="mt-4 font-serif text-4xl text-stone-800 md:text-5xl">Tu presencia es el mejor regalo</h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-stone-200 bg-[#fffaf7] p-8 shadow-[0_20px_50px_rgba(100,70,58,0.08)]"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Cuenta bancaria</p>
            <h3 className="mt-6 font-serif text-3xl text-stone-800">Transferencia</h3>
            <p className="mt-4 text-base leading-7 text-stone-600">
              Si deseas apoyar nuestra nueva vida juntos, haz clic para ver los datos de la cuenta.
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="mt-6 w-full rounded-full border-rose-200 bg-rose-50 text-base font-medium text-rose-700 shadow-sm transition hover:bg-rose-100 hover:text-rose-800"
                >
                  Ver datos bancarios
                </Button>
              </DialogTrigger>

              <DialogContent className="rounded-[2rem] border border-stone-200 bg-[#fffaf7] p-6 sm:max-w-md">
                <DialogHeader className="text-left">
                  <DialogTitle className="font-serif text-3xl text-stone-800">Transferencia</DialogTitle>
                  <DialogDescription className="text-stone-600">
                    Datos para realizar el regalo con cariño.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-3 rounded-[1.5rem] border border-stone-200 bg-white p-5 text-sm text-stone-700">
                  <p><span className="font-semibold text-stone-800">Banco:</span> BBVA</p>
                  <p><span className="font-semibold text-stone-800">Titular:</span> María López & Mateo Ruiz</p>
                  <p><span className="font-semibold text-stone-800">CLABE:</span> 012345678901234567</p>
                  <p><span className="font-semibold text-stone-800">Número de cuenta:</span> 1234567890</p>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-stone-200 bg-white/80 p-8 shadow-[0_20px_50px_rgba(100,70,58,0.08)]"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Lista de regalos</p>
            <h3 className="mt-6 font-serif text-3xl text-stone-800">Tiendas recomendadas</h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { name: "Liverpool", tag: "Mesa de regalos" },
                { name: "Amazon", tag: "Lista de regalos" },
                { name: "El Palacio de Hierro", tag: "Regalo especial" },
              ].map((store) => (
                <div key={store.name} className="rounded-[1.5rem] bg-[#f8f1ee] p-5 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                    {store.name === "Liverpool" ? "🛍️" : store.name === "Amazon" ? "📦" : "🎁"}
                  </div>
                  <h4 className="mt-4 font-serif text-2xl text-stone-800">{store.name}</h4>
                  <p className="mt-2 text-sm text-stone-600">{store.tag}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="border-t border-stone-200 bg-[#f1e5df]"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 text-center md:flex-row md:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-stone-500">Nuestra historia</p>
            <h3 className="mt-3 font-serif text-3xl text-stone-800 md:text-4xl">María & Mateo</h3>
          </div>

          <div className="text-stone-600">
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500">22 de mayo de 2027</p>
            <p className="mt-2 text-lg italic text-stone-700">Gracias por acompañarnos en este momento tan especial</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
