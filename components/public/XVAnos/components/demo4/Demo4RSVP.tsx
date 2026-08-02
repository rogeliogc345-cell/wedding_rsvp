'use client'

import { useActionState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Heart, Loader2, KeyRound, Users, Mail, MessageSquare } from 'lucide-react'
import { findGuestByPasscode, confirmRSVPAction, FormState } from '@/app/(admin)/actions'
import { Reveal } from './Demo4Reveal'
import { Divider } from './Demo4Divider'

interface Props {
  customerId?: string
  name?: string
}

export function RSVP({ customerId, name: quinceaneraName }: Props) {
  const initialState: FormState = { step: 'search', guest: null, error: null }

  const [searchState, searchAction, isSearching] = useActionState(findGuestByPasscode, initialState)
  const [confirmState, confirmAction, isConfirming] = useActionState(confirmRSVPAction, initialState)

  const finalStep = confirmState.step === 'thanks' ? 'thanks' : searchState.step
  const finalGuest = confirmState.guest ?? searchState.guest

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
              {/* STEP 1: SEARCH BY PASSCODE */}
              {finalStep === 'search' && (
                <motion.form
                  key="search-form"
                  action={searchAction}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <input type="hidden" name="customerId" value={customerId ?? ''} />

                  <div>
                    <label htmlFor="passcode" className="mb-2 block text-sm font-medium text-foreground">
                      Código de Acceso
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary/60" />
                      <input
                        id="passcode"
                        name="passcode"
                        type="text"
                        required
                        placeholder="Ej. XV123"
                        onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                        className="w-full rounded-xl border border-border bg-card/70 py-3.5 pl-12 pr-4 text-sm font-mono tracking-widest uppercase text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Ingresa el código que viene en tu invitación.
                    </p>
                  </div>

                  {searchState.error && (
                    <p className="text-xs text-destructive">{searchState.error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSearching}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Buscando invitación...</span>
                      </>
                    ) : (
                      <span>Buscar Invitación</span>
                    )}
                  </button>
                </motion.form>
              )}

              {/* STEP 2: CONFIRM ATTENDANCE */}
              {finalStep === 'confirm' && searchState.guest && (
                <motion.form
                  key="confirm-form"
                  action={confirmAction}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <input type="hidden" name="guestId" value={searchState.guest.id} />

                  <div className="text-center">
                    <h3 className="font-serif text-3xl italic text-primary">
                      ¡Hola, {searchState.guest.name}!
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Tienes <span className="font-semibold text-foreground">{searchState.guest.tickets_allowed}</span> pases reservados.
                    </p>
                  </div>

                  {/* Tickets select */}
                  <div>
                    <label htmlFor="tickets_confirmed" className="mb-2 block text-sm font-medium text-foreground">
                      ¿Asistirás? / Número de Invitados
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary/60" />
                      <select
                        id="tickets_confirmed"
                        name="tickets_confirmed"
                        defaultValue={String(searchState.guest.tickets_allowed)}
                        className="w-full rounded-xl border border-border bg-card/70 py-3.5 pl-12 pr-4 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none"
                      >
                        {Array.from({ length: searchState.guest.tickets_allowed + 1 }, (_, i) => (
                          <option key={i} value={i}>
                            {i === 0 ? 'No podré asistir' : `${i} ${i === 1 ? 'persona' : 'personas'}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                      Correo Electrónico (opcional)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary/60" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="w-full rounded-xl border border-border bg-card/70 py-3.5 pl-12 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                      Mensaje para la Quinceañera (opcional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 size-5 text-primary/60" />
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        placeholder={`Escribe un mensaje especial${quinceaneraName ? ` para ${quinceaneraName}` : ''}...`}
                        className="w-full rounded-xl border border-border bg-card/70 py-3.5 pl-12 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                      />
                    </div>
                  </div>

                  {confirmState.error && (
                    <p className="text-xs text-destructive">{confirmState.error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isConfirming}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50"
                  >
                    {isConfirming ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Guardando...</span>
                      </>
                    ) : (
                      <span>Confirmar Asistencia</span>
                    )}
                  </button>
                </motion.form>
              )}

              {/* STEP 3: THANKS */}
              {finalStep === 'thanks' && finalGuest && (
                <motion.div
                  key="thanks-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground mb-6"
                  >
                    <Check className="size-10" strokeWidth={2.5} />
                  </motion.div>

                  {Number(finalGuest.tickets_confirmed) > 0 ? (
                    <>
                      <h3 className="font-serif text-4xl italic text-foreground">
                        ¡Gracias por confirmar!
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        Hemos recibido tu confirmación, <span className="font-semibold text-foreground">{finalGuest.name}</span>. ¡Estamos felices de celebrar contigo!
                      </p>

                      <div className="mt-6 w-full rounded-2xl border border-border bg-card/50 p-4 text-left text-xs space-y-2">
                        <div className="flex justify-between py-1 border-b border-border/50">
                          <span className="text-muted-foreground">Asistirán:</span>
                          <span className="font-semibold text-primary">
                            {finalGuest.tickets_confirmed} {Number(finalGuest.tickets_confirmed) === 1 ? 'persona' : 'personas'}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-border/50">
                          <span className="text-muted-foreground">Pases reservados:</span>
                          <span>{finalGuest.tickets_allowed}</span>
                        </div>
                        {finalGuest.email && (
                          <div className="flex justify-between py-1 border-b border-border/50">
                            <span className="text-muted-foreground">Email:</span>
                            <span>{finalGuest.email}</span>
                          </div>
                        )}
                        {finalGuest.message && (
                          <div className="pt-1">
                            <span className="text-muted-foreground block mb-0.5">Tu mensaje:</span>
                            <p className="italic text-foreground">"{finalGuest.message}"</p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-serif text-3xl italic text-foreground">
                        ¡Te extrañaremos!
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        Lamentamos que no puedas acompañarnos, <span className="font-semibold text-foreground">{finalGuest.name}</span>. Tu respuesta fue guardada correctamente.
                      </p>
                      {finalGuest.message && (
                        <div className="mt-6 w-full rounded-2xl border border-border bg-card/50 p-4 text-left text-xs">
                          <span className="text-muted-foreground block mb-0.5">Tu mensaje:</span>
                          <p className="italic text-foreground">"{finalGuest.message}"</p>
                        </div>
                      )}
                    </>
                  )}

                  <Heart className="mt-6 size-6 text-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
