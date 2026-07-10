"use client"

import { useState, useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, Heart, Users, Utensils, MessageSquare, Loader2, Send } from "lucide-react"
import { findGuestByPasscode, confirmRSVPAction, FormState } from "@/app/(admin)/actions"

export function RSVPSectionDemoUno({ customerId }: { customerId?: string }) {
    const initialState: FormState = { step: "search", guest: null, error: null }

    const [searchState, searchAction, isSearching] = useActionState(findGuestByPasscode, initialState)
    const [confirmState, confirmAction, isConfirming] = useActionState(confirmRSVPAction, initialState)

    const finalStep = confirmState.step === 'thanks' ? 'thanks' : searchState.step;
    const finalGuest = confirmState.guest ?? searchState.guest;

    return (
        <section id="rsvp" className="py-20 px-4 bg-background">
            <div className="max-w-2xl mx-auto">
                {/* Section header (visible in Search and Confirm steps) */}
                {finalStep !== "thanks" && (
                    <div className="text-center mb-12">
                        <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-5">
                            Confirma tu asistencia
                        </p>
                        <h2 className="text-5xl md:text-7xl text-primary font-wedding">
                            RSVP
                        </h2>
                        <div className="mt-4 flex items-center justify-center gap-4">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                            <div className="w-2 h-2 rotate-45 bg-gold" />
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                        </div>
                        <p className="mt-6 text-muted-foreground max-w-md mx-auto">
                            Por favor confirma tu asistencia antes del evento.
                        </p>
                    </div>
                )}

                {/* STEP 1: SEARCH */}
                {finalStep === "search" && (
                    <form action={searchAction} className="bg-card rounded-3xl p-8 shadow-xl border border-border">
                        <input type="hidden" name="customerId" value={customerId ?? ""} />
                        
                        <div className="space-y-6">
                            {/* Name */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Nombre Completo
                                </label>
                                <div className="relative">
                                    <Heart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                                    <Input
                                        type="text"
                                        name="name"
                                        className="pl-12 py-6 rounded-xl border-border focus:border-primary"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                            </div>

                            {/* Passcode */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Código de Acceso
                                </label>
                                <div className="relative">
                                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <Input
                                        type="text"
                                        name="passcode"
                                        required
                                        className="pl-12 py-6 rounded-xl border-border focus:border-primary uppercase font-mono tracking-widest"
                                        placeholder="E.g. XV123"
                                        onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                                    />
                                </div>
                            </div>

                            {searchState.error && (
                                <p className="text-red-500 text-sm">{searchState.error}</p>
                            )}

                            {/* Submit button */}
                            <Button
                                type="submit"
                                disabled={isSearching}
                                className="w-full py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-lg font-medium"
                            >
                                {isSearching ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Buscando...
                                    </>
                                ) : (
                                    "Buscar Invitación"
                                )}
                            </Button>
                        </div>
                    </form>
                )}

                {/* STEP 2: CONFIRM */}
                {finalStep === "confirm" && searchState.guest && (
                    <form action={confirmAction} className="bg-card rounded-3xl p-8 shadow-xl border border-border">
                        <input type="hidden" name="guestId" value={searchState.guest.id} />
                        
                        <div className="space-y-6">
                            <h3 
                                className="text-4xl text-primary text-center mb-2"
                                style={{ fontFamily: 'var(--font-great-vibes)' }}
                            >
                                Hola, {searchState.guest.name}
                            </h3>
                            <p className="text-center text-muted-foreground text-sm mb-6">
                                Por favor confirma tu asistencia (máximo {searchState.guest.tickets_allowed} pases reservados).
                            </p>

                            {/* Number of guests */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    ¿Asistirás? / Número de Invitados
                                </label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                                    <select
                                        name="tickets_confirmed"
                                        defaultValue={String(searchState.guest.tickets_allowed)}
                                        className="w-full pl-12 py-3 rounded-xl border border-border bg-background focus:border-primary focus:outline-none appearance-none"
                                    >
                                        {Array.from({ length: searchState.guest.tickets_allowed + 1 }, (_, i) => (
                                            <option key={i} value={i}>
                                                {i === 0 ? "No podré asistir" : `${i} ${i === 1 ? "persona" : "personas"}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Correo Electrónico (opcional)
                                </label>
                                <div className="relative">
                                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <Input
                                        type="email"
                                        name="email"
                                        className="pl-12 py-6 rounded-xl border-border focus:border-primary"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Mensaje para la Quinceañera (opcional)
                                </label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-primary/50" />
                                    <Textarea
                                        name="message"
                                        rows={4}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:outline-none resize-none"
                                        placeholder="Escribe un mensaje especial..."
                                    />
                                </div>
                            </div>

                            {confirmState.error && (
                                <p className="text-red-500 text-sm">{confirmState.error}</p>
                            )}

                            {/* Submit button */}
                            <Button
                                type="submit"
                                disabled={isConfirming}
                                className="w-full py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-lg font-medium"
                            >
                                {isConfirming ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...
                                    </>
                                ) : (
                                    "Confirmar RSVP"
                                )}
                            </Button>
                        </div>
                    </form>
                )}

                {/* STEP 3: THANKS */}
                {finalStep === "thanks" && finalGuest && (
                    <div className="max-w-lg mx-auto">
                        {Number(finalGuest.tickets_confirmed) > 0 ? (
                            <div className="bg-card rounded-3xl p-8 shadow-xl border border-border text-center">
                                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Check className="w-12 h-12 text-primary" />
                                </div>
                                <h2 
                                    className="text-5xl text-primary mb-4"
                                    style={{ fontFamily: 'var(--font-great-vibes)' }}
                                >
                                    ¡Gracias!
                                </h2>
                                <p className="text-muted-foreground mb-8">
                                    Tu confirmación ha sido recibida, {finalGuest.name}. ¡Nos vemos en la fiesta!
                                </p>

                                <div className="bg-stone-50 rounded-2xl p-6 mb-8 border border-border text-left space-y-3 text-sm text-foreground">
                                    <div className="flex justify-between py-1 border-b border-border">
                                        <span className="text-muted-foreground font-medium">Asistirán:</span>
                                        <span className="font-semibold text-primary">
                                            {finalGuest.tickets_confirmed} {Number(finalGuest.tickets_confirmed) === 1 ? "persona" : "personas"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-border">
                                        <span className="text-muted-foreground font-medium">Lugares reservados:</span>
                                        <span>{finalGuest.tickets_allowed}</span>
                                    </div>
                                    {finalGuest.email && (
                                        <div className="flex justify-between py-1 border-b border-border">
                                            <span className="text-muted-foreground font-medium">Email:</span>
                                            <span>{finalGuest.email}</span>
                                        </div>
                                    )}
                                    {finalGuest.message && (
                                        <div className="pt-2">
                                            <span className="text-muted-foreground font-medium block mb-1">Tu mensaje:</span>
                                            <p className="text-foreground italic">"{finalGuest.message}"</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-center gap-2 text-primary">
                                    <Heart className="w-5 h-5 fill-primary" />
                                    <span className="font-serif">Con cariño, Valentina</span>
                                    <Heart className="w-5 h-5 fill-primary" />
                                </div>
                            </div>
                        ) : (
                            <div className="bg-card rounded-3xl p-8 shadow-xl border border-border text-center">
                                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Heart className="w-12 h-12 text-primary fill-primary/10" />
                                </div>
                                <h2 
                                    className="text-5xl text-primary mb-4"
                                    style={{ fontFamily: 'var(--font-great-vibes)' }}
                                >
                                    Gracias por avisarnos
                                </h2>
                                <p className="text-muted-foreground mb-8">
                                    Lamentamos que no puedas asistir, {finalGuest.name}. Tu respuesta fue guardada correctamente.
                                </p>
                                
                                {finalGuest.message && (
                                    <div className="bg-stone-50 rounded-2xl p-6 mb-8 border border-border text-left space-y-3 text-sm text-foreground">
                                        <span className="text-muted-foreground font-medium block mb-1">Tu mensaje:</span>
                                        <p className="text-foreground italic">"{finalGuest.message}"</p>
                                    </div>
                                )}

                                <div className="flex items-center justify-center gap-2 text-primary">
                                    <span className="font-serif">Gracias por tu tiempo</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
