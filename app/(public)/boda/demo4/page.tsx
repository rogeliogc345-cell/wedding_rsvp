'use client'

import { motion } from 'framer-motion'
import {
  ArrowDown,
  CalendarHeart,
  Clock3,
  Flower2,
  Heart,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { useEffect, useState } from 'react'

const weddingDate = new Date('2027-06-19T18:30:00')

const schedule = [
  {
    time: '16:30',
    title: 'Ceremonia',
    detail: 'Jardín de rosas y promesas bajo la luz del atardecer.',
  },
  {
    time: '18:00',
    title: 'Cóctel',
    detail: 'Brindis, flores frescas y música suave entre árboles.',
  },
  {
    time: '20:00',
    title: 'Cena',
    detail: 'Mesa de celebración con sabores, velas y un aire romántico.',
  },
  {
    time: '22:00',
    title: 'Velada',
    detail: 'Un baile lento para cerrar la noche más especial.',
  },
]

const gallery = ['/boda/boda_1.jpeg', '/boda/boda_5.jpeg', '/boda/boda_6.jpeg', '/boda/boda_7.jpeg']

function getTimeLeft() {
  const difference = weddingDate.getTime() - Date.now()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export default function Page() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const countdown = [
    { label: 'días', value: timeLeft.days },
    { label: 'horas', value: timeLeft.hours },
    { label: 'minutos', value: timeLeft.minutes },
    { label: 'segundos', value: timeLeft.seconds },
  ]

  return (
    <main className="bg-[#f8f3ef] text-[#2f2422]">
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(56,39,36,0.25), rgba(56,39,36,0.55)), url('/boda/boda_5.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(252,244,235,0.14),transparent_33%)]" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col px-6 pb-10 pt-8 sm:px-8">
          <header className="mb-14 flex items-center justify-between text-[#f4ece3]">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em]">
              <Flower2 className="h-4 w-4" />
              <span>Boda</span>
            </div>
            <a
              href="#invitacion"
              className="inline-flex items-center gap-2 border border-white/45 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm transition hover:bg-white/10"
            >
              Ver invitación
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-3 text-[#f6d9b4]">
              <span className="h-px w-10 bg-current" />
              <Heart className="h-4 w-4 fill-current" />
              <span className="h-px w-10 bg-current" />
            </div>

            <p className="mb-5 text-[10px] uppercase tracking-[0.45em] text-[#f6e8d7]">
              Nos casamos
            </p>
            <h1 className="font-serif text-5xl leading-none text-white sm:text-7xl lg:text-[7rem]">
              Amelia <span className="text-[#f4d5a1]">&</span> Mateo
            </h1>

            <div className="my-8 h-px w-20 bg-[#f4d5a1]" />

            <p className="max-w-2xl text-sm leading-7 text-[#f5eee7] sm:text-base">
              Te invitamos a celebrar el comienzo de nuestra historia con flores, música y un atardecer lleno de amor.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-[0.25em] text-[#f9efe7]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-4 py-2">
                <CalendarHeart className="h-3.5 w-3.5" />
                19 junio 2027
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-4 py-2">
                <MapPin className="h-3.5 w-3.5" />
                Hacienda del Sol
              </span>
            </div>

            <div className="mt-12 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {countdown.map((item) => (
                <div
                  key={item.label}
                  className="border border-white/35 bg-[#2f2c2a]/30 px-3 py-4 backdrop-blur-sm"
                >
                  <p className="font-serif text-3xl text-[#f7d8a0] sm:text-4xl">
                    {String(item.value).padStart(2, '0')}
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.22em] text-[#f8efe8]">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        id="invitacion"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-10"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[#b57863]">
              <Sparkles className="h-4 w-4" />
              Celebración especial
            </p>
            <h2 className="font-serif text-4xl leading-tight text-[#2f2422] sm:text-5xl">
              Con flores, música y todo nuestro amor, queremos compartir este día contigo.
            </h2>
            <div className="my-6 h-px w-20 bg-[#d6b49c]" />
            <p className="max-w-xl text-sm leading-8 text-[#655859] sm:text-base">
              Después de tantos caminos, nos encontramos en este momento perfecto para dar el siguiente paso.
              Te invitamos a ser parte de la ceremonia, la cena y la fiesta que celebraremos rodeados de las personas que más queremos.
            </p>
            <p className="mt-5 font-serif text-2xl italic text-[#a46b57]">Con mucho cariño, Amelia y Mateo</p>
          </div>

          <div className="rounded-[30px] border border-[#e7d7ca] bg-[#fffaf7] p-6 shadow-[0_18px_50px_rgba(96,66,50,0.08)] sm:p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#a57a62]">Fecha</p>
                <p className="mt-2 font-serif text-3xl text-[#2f2422]">19 de junio</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5e7dc] text-[#8d5c51]">
                <Flower2 className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3 rounded-2xl border border-[#f0e0d6] bg-[#fff] p-4">
                <CalendarHeart className="mt-0.5 h-5 w-5 text-[#a46b57]" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.26em] text-[#8a6b62]">Ceremonia</p>
                  <p className="mt-2 text-sm text-[#3b2c2a]">18:30 horas</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[#f0e0d6] bg-[#fff] p-4">
                <MapPin className="mt-0.5 h-5 w-5 text-[#a46b57]" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.26em] text-[#8a6b62]">Lugar</p>
                  <p className="mt-2 text-sm text-[#3b2c2a]">Hacienda del Sol, Valle de Guadalupe</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[#f0e0d6] bg-[#fff] p-4">
                <Clock3 className="mt-0.5 h-5 w-5 text-[#a46b57]" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.26em] text-[#8a6b62]">Dress code</p>
                  <p className="mt-2 text-sm text-[#3b2c2a]">Formal elegante en tonalidades suaves</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="bg-[#f3e7df] py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
          <div className="mb-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#ad7a67]">Programa</p>
            <h3 className="mt-4 font-serif text-4xl text-[#2f2422] sm:text-5xl">La noche que soñamos</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {schedule.map((event, index) => (
              <motion.div
                key={event.time}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: index * 0.08, ease: 'easeOut' }}
                className="rounded-[28px] border border-[#ead8cd] bg-[#fffaf8] p-6 shadow-[0_16px_40px_rgba(100,74,64,0.06)]"
              >
                <div className="mb-5 inline-flex items-center justify-center rounded-full bg-[#f6e9e1] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#8a5c4d]">
                  {event.time}
                </div>
                <h4 className="font-serif text-2xl text-[#2f2422]">{event.title}</h4>
                <p className="mt-4 text-sm leading-7 text-[#604c4b]">{event.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="mb-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.32em] text-[#ad7a67]">Galería</p>
          <h3 className="mt-4 font-serif text-4xl text-[#2f2422] sm:text-5xl">Momentos que ya forman parte de nuestra historia</h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {gallery.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
              className="overflow-hidden rounded-[30px] border border-[#ead8cd] bg-[#f8f1ee] shadow-[0_16px_40px_rgba(100,74,64,0.08)]"
            >
              <img src={image} alt="Detalle de la boda" className="h-80 w-full object-cover transition duration-700 hover:scale-105" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[#2f2422] px-6 py-20 text-[#f8efe8] sm:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-[32px] border border-[#7d5a50] bg-[#382d2a] p-8 lg:grid-cols-[1fr_auto] lg:p-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#f1d0a7]">Confirma tu asistencia</p>
            <h3 className="mt-4 font-serif text-4xl text-white sm:text-5xl">Nos gustaría celebrarlo contigo</h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#e9d8d2] sm:text-base">
              Tu presencia hará que este día sea aún más especial. Confirma antes del 15 de mayo para acompañarnos en esta nueva etapa.
            </p>
          </div>

          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-[#f7e7d8] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#342624] transition hover:bg-white"
          >
            Confirmar asistencia
          </a>
        </div>
      </section>

      <footer className="border-t border-[#e8d9d2] bg-[#f7efe9] px-6 py-8 text-center text-[#675451]">
        <p className="font-serif text-2xl italic text-[#2f2422]">Amelia & Mateo</p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.26em]">Con amor, te esperamos</p>
      </footer>
    </main>
  )
}

