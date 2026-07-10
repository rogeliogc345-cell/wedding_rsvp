"use client"

import { useState, useActionState } from "react"
import { Crown, Send, Sparkles, Heart, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { findGuestByPasscode, confirmRSVPAction, FormState } from "@/app/(admin)/actions"

export function RSVPForm({ customerId }: { customerId?: string }) {
  const initialState: FormState = { step: "search", guest: null, error: null }

  const [searchState, searchAction, isSearching] = useActionState(findGuestByPasscode, initialState)
  const [confirmState, confirmAction, isConfirming] = useActionState(confirmRSVPAction, initialState)

  const finalStep = confirmState.step === 'thanks' ? 'thanks' : searchState.step;
  const finalGuest = confirmState.guest ?? searchState.guest;

  return (
    <section id="confirmar" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#1a3a6e] to-[#0a1628]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 opacity-20">
        <Crown className="w-24 h-24 text-[#FFD700] animate-float" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-20">
        <Sparkles className="w-16 h-16 text-[#87CEEB] animate-float" style={{ animationDelay: "1s" }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header (Show for search and confirm steps) */}
        {finalStep !== "thanks" && (
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#FFD700]" />
              <Send className="w-8 h-8 text-[#FFD700]" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#FFD700]" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Confirma tu Asistencia
            </h2>
            <p className="text-[#87CEEB]/70 text-lg max-w-md mx-auto">
              Tu presencia hará de esta noche algo inolvidable
            </p>
          </div>
        )}

        <div className="max-w-xl mx-auto">
          {/* STEP 1: SEARCH */}
          {finalStep === "search" && (
            <form action={searchAction} className="bg-[#1a3a6e]/30 backdrop-blur-sm border border-[#4169E1]/20 rounded-3xl p-8 md:p-10">
              <input type="hidden" name="customerId" value={customerId ?? ""} />
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[#87CEEB] mb-2 text-sm tracking-wide">
                    Nombre Completo
                  </label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Tu nombre"
                    className="bg-[#0d1f3c]/50 border-[#4169E1]/30 text-white placeholder:text-[#87CEEB]/40 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20 rounded-xl py-6"
                  />
                </div>
                
                <div>
                  <label className="block text-[#87CEEB] mb-2 text-sm tracking-wide">
                    Código de Acceso
                  </label>
                  <Input
                    name="passcode"
                    type="text"
                    placeholder="E.g. XV123"
                    required
                    className="bg-[#0d1f3c]/50 border-[#4169E1]/30 text-white placeholder:text-[#87CEEB]/40 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20 rounded-xl py-6 uppercase font-mono tracking-widest"
                    onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                  />
                </div>

                {searchState.error && (
                  <p className="text-red-400 text-sm">{searchState.error}</p>
                )}
                
                <Button
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-gradient-to-r from-[#4169E1] to-[#1a3a6e] hover:from-[#3158c9] hover:to-[#153057] text-white py-6 rounded-xl font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(65,105,225,0.4)] flex items-center justify-center gap-3"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Buscando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Buscar Invitación
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* STEP 2: CONFIRM */}
          {finalStep === "confirm" && searchState.guest && (
            <form action={confirmAction} className="bg-[#1a3a6e]/30 backdrop-blur-sm border border-[#4169E1]/20 rounded-3xl p-8 md:p-10">
              <input type="hidden" name="guestId" value={searchState.guest.id} />
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Hola, {searchState.guest.name}</h3>
                <p className="text-sm text-[#87CEEB]/80">
                  Por favor confirma tu asistencia (máximo {searchState.guest.tickets_allowed} pases reservados).
                </p>

                <div>
                  <label className="block text-[#87CEEB] mb-2 text-sm tracking-wide">
                    ¿Asistirás? / Número de Invitados
                  </label>
                  <select
                    name="tickets_confirmed"
                    defaultValue={String(searchState.guest.tickets_allowed)}
                    className="w-full bg-[#0d1f3c]/50 border border-[#4169E1]/30 text-white rounded-xl py-3 px-4 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20 focus:outline-none"
                  >
                    {Array.from({ length: searchState.guest.tickets_allowed + 1 }, (_, i) => (
                      <option key={i} value={i} className="bg-[#0d1f3c] text-white">
                        {i === 0 ? "No podré asistir" : `${i} ${i === 1 ? "persona" : "personas"}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#87CEEB] mb-2 text-sm tracking-wide">
                    Email (opcional)
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="bg-[#0d1f3c]/50 border-[#4169E1]/30 text-white placeholder:text-[#87CEEB]/40 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20 rounded-xl py-6"
                  />
                </div>
                
                <div>
                  <label className="block text-[#87CEEB] mb-2 text-sm tracking-wide">
                    Mensaje para la Quinceañera (opcional)
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Escribe un mensaje especial..."
                    className="bg-[#0d1f3c]/50 border-[#4169E1]/30 text-white placeholder:text-[#87CEEB]/40 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20 rounded-xl min-h-[120px]"
                  />
                </div>

                {confirmState.error && (
                  <p className="text-red-400 text-sm">{confirmState.error}</p>
                )}
                
                <Button
                  type="submit"
                  disabled={isConfirming}
                  className="w-full bg-gradient-to-r from-[#4169E1] to-[#1a3a6e] hover:from-[#3158c9] hover:to-[#153057] text-white py-6 rounded-xl font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(65,105,225,0.4)] flex items-center justify-center gap-3"
                >
                  {isConfirming ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Confirmar RSVP
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* STEP 3: THANKS */}
          {finalStep === "thanks" && finalGuest && (
            <div className="max-w-md mx-auto text-center">
              {Number(finalGuest.tickets_confirmed) > 0 ? (
                <div className="bg-[#1a3a6e]/40 backdrop-blur-sm border border-[#4169E1]/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                  {/* Decorative background glow circles */}
                  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#4169E1]/10 blur-2xl" />
                  <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-[#FFD700]/5 blur-2xl" />

                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#4169E1] to-[#1a3a6e] border border-[#FFD700]/30 shadow-lg flex items-center justify-center">
                      <Check className="w-10 h-10 text-[#FFD700]" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">¡Confirmado!</h3>
                    <p className="text-[#87CEEB] mb-6">
                      Gracias, {finalGuest.name}. Tu asistencia ha sido registrada correctamente.
                    </p>

                    <div className="bg-[#0d1f3c]/50 rounded-xl p-4 mb-6 border border-[#4169E1]/20 text-left text-sm text-white">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#87CEEB]/70">Asistirán:</span>
                        <span className="font-semibold text-[#FFD700]">
                          {finalGuest.tickets_confirmed} {Number(finalGuest.tickets_confirmed) === 1 ? "persona" : "personas"}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#87CEEB]/70">Lugares reservados:</span>
                        <span>{finalGuest.tickets_allowed}</span>
                      </div>
                      {finalGuest.email && (
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-[#87CEEB]/70">Email:</span>
                          <span>{finalGuest.email}</span>
                        </div>
                      )}
                      {finalGuest.message && (
                        <div className="pt-2">
                          <span className="text-[#87CEEB]/70 block mb-1">Tu mensaje:</span>
                          <p className="text-white/90 italic">"{finalGuest.message}"</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5 text-[#FFD700] fill-[#FFD700]/20 animate-pulse" />
                      <Sparkles className="w-5 h-5 text-[#87CEEB] animate-pulse" style={{ animationDelay: "0.5s" }} />
                      <Heart className="w-5 h-5 text-[#FFD700] fill-[#FFD700]/20 animate-pulse" style={{ animationDelay: "1s" }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#1a3a6e]/40 backdrop-blur-sm border border-[#4169E1]/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                  {/* Decorative background glow circles */}
                  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#4169E1]/10 blur-2xl" />
                  <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-[#FFD700]/5 blur-2xl" />

                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#4169E1] to-[#1a3a6e] border border-[#FFD700]/30 shadow-lg flex items-center justify-center">
                      <Heart className="w-10 h-10 text-[#FFD700] fill-[#FFD700]/20" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Gracias por avisarnos</h3>
                    <p className="text-[#87CEEB] mb-6">
                      Lamentamos que no puedas asistir, {finalGuest.name}. Tu respuesta fue guardada correctamente.
                    </p>
                    
                    {finalGuest.message && (
                      <div className="bg-[#0d1f3c]/50 rounded-xl p-4 mb-6 border border-[#4169E1]/20 text-left text-sm text-white">
                        <span className="text-[#87CEEB]/70 block mb-1">Tu mensaje:</span>
                        <p className="text-white/90 italic">"{finalGuest.message}"</p>
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-2">
                      <span className="font-serif text-[#87CEEB]">Gracias por tu tiempo</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
