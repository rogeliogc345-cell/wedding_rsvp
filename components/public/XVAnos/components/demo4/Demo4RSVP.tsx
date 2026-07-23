'use client'

import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Heart } from 'lucide-react'
import { Reveal } from './Demo4Reveal'
import { Divider } from './Demo4Divider'
import { cn } from '@/lib/utils'

type Errors = Partial<Record<'name' | 'phone' | 'attending', string>>

export function RSVP() {
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('1')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const next: Errors = {}
    if (name.trim().length < 2) next.name = 'Por favor ingresa tu nombre.'
    if (phone.trim().length < 7) next.phone = 'Ingresa un teléfono válido.'
    if (attending === null) next.attending = 'Indícanos si podrás asistir.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  return (
    <section id="rsvp" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-primary">
            Te esperamos
          </p>
          <h2 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
            Confirma tu Asistencia
          </h2>
          <Divider className="my-7" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass overflow-hidden rounded-[2rem] p-8 shadow-xl shadow-black/5 sm:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  >
                    <Check className="size-10" strokeWidth={2.5} />
                  </motion.div>
                  <h3 className="mt-6 font-serif text-3xl text-foreground">
                    {attending === 'no' ? '¡Te extrañaremos!' : '¡Gracias!'}
                  </h3>
                  <p className="mt-3 max-w-sm font-light leading-relaxed text-muted-foreground">
                    {attending === 'no'
                      ? `Lamentamos que no puedas acompañarnos, ${name}. Guardaremos un lugar en el corazón.`
                      : `Tu confirmación fue recibida, ${name}. ¡Estamos felices de celebrar contigo!`}
                  </p>
                  <Heart className="mt-6 size-6 text-rose" />
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  className="space-y-5"
                  exit={{ opacity: 0 }}
                >
                  <Field label="Nombre completo" error={errors.name} htmlFor="name">
                    <input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      className={inputCls(!!errors.name)}
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Número de invitados" htmlFor="guests">
                      <select
                        id="guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className={inputCls(false)}
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'persona' : 'personas'}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Teléfono" error={errors.phone} htmlFor="phone">
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10 dígitos"
                        className={inputCls(!!errors.phone)}
                      />
                    </Field>
                  </div>

                  <Field label="Mensaje (opcional)" htmlFor="message">
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder="Déjale un mensaje a Isabella"
                      className={cn(inputCls(false), 'resize-none')}
                    />
                  </Field>

                  <fieldset>
                    <legend className="mb-2 text-sm font-medium text-foreground">
                      ¿Podrás asistir?
                    </legend>
                    <div className="grid grid-cols-2 gap-3">
                      {(['yes', 'no'] as const).map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAttending(val)}
                          className={cn(
                            'rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200',
                            attending === val
                              ? 'border-primary bg-primary text-primary-foreground shadow-md'
                              : 'border-border bg-card text-foreground hover:border-primary/50',
                          )}
                        >
                          {val === 'yes' ? 'Sí, asistiré' : 'No podré'}
                        </button>
                      ))}
                    </div>
                    {errors.attending && (
                      <p className="mt-2 text-xs text-destructive">
                        {errors.attending}
                      </p>
                    )}
                  </fieldset>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-full bg-primary px-8 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  >
                    Enviar confirmación
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  )
}

function inputCls(hasError: boolean) {
  return cn(
    'w-full rounded-xl border bg-card/70 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20',
    hasError ? 'border-destructive' : 'border-border',
  )
}
