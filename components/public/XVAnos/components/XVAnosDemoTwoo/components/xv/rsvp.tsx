"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, Send, Heart } from "lucide-react"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Loader2 } from "lucide-react"
import { findGuestByPasscode, confirmRSVPAction, FormState } from "@/app/(admin)/actions"

export function RSVPDemo2({ customerId }: { customerId?: string }) {
  const [attendance, setAttendance] = useState<string>("")
  const initialState: FormState = { step: "search", guest: null, error: null }

  const [searchState, searchAction, isSearching] = useActionState(findGuestByPasscode, initialState)
  const [confirmState, confirmAction, isConfirming] = useActionState(confirmRSVPAction, initialState)

  const finalStep = confirmState.step === 'thanks' ? 'thanks' : searchState.step;
  const finalGuest = confirmState.guest ?? searchState.guest;

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-black">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(180,230,70,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(180,230,70,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm tracking-[0.3em] text-xvgreen-text mb-4">CONFIRMA TU ASISTENCIA</h2>
          <p className="text-4xl md:text-5xl font-serif text-white mb-4">RSVP</p>
          <p className="text-muted-foreground">Por favor confirma antes del 1 de Junio</p>
        </motion.div>

        {finalStep === "search" && (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            action={searchAction}
            className="bg-black  rounded-2xl p-8 md:p-12"
          >
            <FieldGroup>
              <div className="grid md:grid-cols-2 gap-6 text-white">
                <Field>
                  <FieldLabel htmlFor="name">Nombre Completo</FieldLabel>
                  <Input id="name" name="name" placeholder="Tu nombre" className="bg-black focus:border-primary" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="passcode">Código de Acceso</FieldLabel>
                  <Input
                    id="passcode"
                    name="passcode"
                    placeholder="E.g. XV123"
                    required
                    className="focus:border-primary uppercase font-mono tracking-widest"
                    onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                  />
                </Field>
              </div>

              {searchState.error ? (
                <div className="mt-4 text-sm text-destructive">{searchState.error}</div>
              ) : null}
            </FieldGroup>

            <input type="hidden" name="customerId" value={customerId ?? ""} />

            <Button type="submit" size="lg" className="w-full mt-8 bg-xvgreen-text text-black hover:bg-primary/90 transition-all" disabled={isSearching}>
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Buscando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Buscar Invitación
                </>
              )}
            </Button>
          </motion.form>
        )}

        {finalStep === "confirm" && searchState.guest && (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            action={confirmAction}
            className="bg-black rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-xl text-white mb-4">Hola {searchState.guest.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">Por favor confirma cuántos asistirán (máximo {searchState.guest.tickets_allowed}).</p>

            <FieldGroup>
              <Field>
                <FieldLabel>Asistirán</FieldLabel>
                <select name="tickets_confirmed" defaultValue={String(searchState.guest.tickets_allowed)} className="w-full p-2 rounded bg-white text-black">
                  {Array.from({ length: searchState.guest.tickets_allowed + 1 }, (_, i) => (
                    <option key={i} value={i}>
                      {i === 0 ? "No asistiré" : `${i} ${i === 1 ? "persona" : "personas"}`}
                    </option>
                  ))}
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email (opcional)</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="tu@email.com" />
              </Field>

              <Field>
                <FieldLabel htmlFor="message">Mensaje (opcional)</FieldLabel>
                <Textarea id="message" name="message" rows={4} className="resize-none" />
              </Field>
            </FieldGroup>

            <input type="hidden" name="guestId" value={searchState.guest.id} />

            <Button type="submit" size="lg" className="w-full mt-8 bg-xvgreen-text text-black hover:bg-primary/90 transition-all" disabled={isConfirming}>
              {isConfirming ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Confirmar RSVP
                </>
              )}
            </Button>
          </motion.form>
        )}

        {finalStep === "thanks" && finalGuest?.tickets_confirmed && Number(finalGuest.tickets_confirmed) > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black border border-xvgreen-text/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-xvgreen-text/5 blur-2xl" />
            <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-xvgreen-text/5 blur-2xl" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-xvgreen-text/10 border-2 border-xvgreen-text/30 flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-xvgreen-text" />
              </motion.div>

              <h3 className="text-2xl font-serif font-bold text-white mb-2">¡Confirmado! Gracias, {finalGuest?.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">Tu asistencia ha sido registrada correctamente. Nos vemos pronto.</p>

              <div className="max-w-xl mx-auto text-left bg-white/5 rounded-lg p-4 mb-6 border border-white/5">
                <dl className="grid grid-cols-1 gap-2 text-sm text-white">
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Asistirán</dt>
                    <dd className="font-semibold text-xvgreen-text">{finalGuest?.tickets_confirmed} {Number(finalGuest?.tickets_confirmed) === 1 ? 'persona' : 'personas'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Reservadas</dt>
                    <dd className="text-white">{finalGuest?.tickets_allowed}</dd>
                  </div>
                  {finalGuest?.email ? (
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Email</dt>
                      <dd className="text-white">{finalGuest?.email}</dd>
                    </div>
                  ) : null}
                  {finalGuest?.message ? (
                    <div className="border-t border-white/5 pt-2 mt-2">
                      <dt className="font-medium text-muted-foreground mb-1">Mensaje</dt>
                      <dd className="text-sm text-white/90 italic">"{finalGuest?.message}"</dd>
                    </div>
                  ) : null}
                </dl>
              </div>

              <div className="flex items-center justify-center gap-2 text-xvgreen-text">
                <Heart className="w-5 h-5 fill-xvgreen-text" />
                <span className="font-serif text-white">Con cariño, Valentina</span>
                <Heart className="w-5 h-5 fill-xvgreen-text" />
              </div>
            </div>
          </motion.div>
        )}

        {finalStep === "thanks" && (!finalGuest || Number(finalGuest.tickets_confirmed) === 0) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black border border-xvgreen-text/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-xvgreen-text/5 blur-2xl" />
            <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-xvgreen-text/5 blur-2xl" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-xvgreen-text/10 border-2 border-xvgreen-text/30 flex items-center justify-center mx-auto mb-6"
              >
                <Heart className="w-10 h-10 text-xvgreen-text fill-xvgreen-text/20" />
              </motion.div>

              <h3 className="text-2xl font-serif font-bold text-white mb-2">Gracias por avisarnos, {finalGuest?.name ?? ''}</h3>
              <p className="text-sm text-muted-foreground mb-6">Lamentamos que no puedas asistir. Tu respuesta fue guardada correctamente.</p>

              <div className="max-w-xl mx-auto text-left bg-white/5 rounded-lg p-4 mb-6 border border-white/5">
                <dl className="grid grid-cols-1 gap-2 text-sm text-white">
                  {finalGuest?.email ? (
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Email registrado</dt>
                      <dd className="text-white">{finalGuest.email}</dd>
                    </div>
                  ) : null}
                  {finalGuest?.message ? (
                    <div className={`${finalGuest.email ? 'border-t border-white/5 pt-2 mt-2' : ''}`}>
                      <dt className="font-medium text-muted-foreground mb-1">Mensaje</dt>
                      <dd className="text-sm text-white/90 italic">"{finalGuest.message}"</dd>
                    </div>
                  ) : null}
                </dl>
              </div>

              <div className="flex items-center justify-center gap-2 text-xvgreen-text">
                <span className="font-serif text-white">Gracias por tu tiempo</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
