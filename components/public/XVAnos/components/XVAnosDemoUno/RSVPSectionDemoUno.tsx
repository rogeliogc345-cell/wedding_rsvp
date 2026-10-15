"use client"

import { useState, useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, Heart, Users, MessageSquare, Loader2, Crown } from "lucide-react"
import { findGuestByPasscode, confirmRSVPAction, FormState } from "@/app/(admin)/actions"

export function RSVPSectionDemoUno({ customerId }: { customerId?: string }) {
    const initialState: FormState = { step: "search", guest: null, error: null }

    const [searchState, searchAction, isSearching] = useActionState(findGuestByPasscode, initialState)
    const [confirmState, confirmAction, isConfirming] = useActionState(confirmRSVPAction, initialState)

    const finalStep = confirmState.step === 'thanks' ? 'thanks' : searchState.step;
    const finalGuest = confirmState.guest ?? searchState.guest;

    return (
        <section id="rsvp" className="relative overflow-hidden bg-[#faf5f6] px-4 py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_1px_1px,rgba(190,95,130,0.16)_1px,transparent_0)] [background-size:14px_14px]" />
            <div className="relative z-10 mx-auto max-w-2xl">
                {/* Section header (visible in Search and Confirm steps) */}
                {finalStep !== "thanks" && (
                    <div className="text-center mb-12">
                        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-rose-700">
                            Confirma tu asistencia
                        </p>
                        <Crown className="mx-auto mb-2 h-7 w-7 text-rose-400" strokeWidth={1.4} />
                        <h2 className="text-5xl text-stone-900 font-wedding md:text-7xl">
                            RSVP
                        </h2>
                        <div className="mt-4 flex items-center justify-center gap-4">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                            <div className="h-2 w-2 rotate-45 bg-rose-300" />
                            <div className="h-px w-16 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                        </div>
                        <p className="mx-auto mt-6 max-w-md text-muted-foreground">
                            Por favor confirma tu asistencia antes del evento.
                        </p>
                    </div>
                )}

                {/* STEP 1: SEARCH */}
                {finalStep === "search" && (
                    <form action={searchAction} className="relative overflow-hidden rounded-sm border-4 border-double border-rose-200 bg-[#fffdfd] p-8 pb-10 shadow-md">
                        <input type="hidden" name="customerId" value={customerId ?? ""} />
                        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[radial-gradient(circle_at_1px_1px,rgba(190,95,130,0.14)_1px,transparent_0)] [background-size:14px_14px]" />
                        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-[radial-gradient(ellipse_at_top,rgba(244,204,216,0.9)_0%,rgba(244,204,216,0.9)_50%,transparent_52%)] [background-size:24px_12px]" />

                        <div className="relative z-10 space-y-6">
                            {/* Name */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Nombre Completo
                                </label>
                                <div className="relative">
                                    <Heart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
                                    <Input
                                        type="text"
                                        name="name"
                                        className="rounded-sm border-rose-200 bg-white/90 py-6 pl-12 focus-visible:ring-rose-300"
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
                                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <Input
                                        type="text"
                                        name="passcode"
                                        required
                                        className="rounded-sm border-rose-200 bg-white/90 py-6 pl-12 font-mono uppercase tracking-widest focus-visible:ring-rose-300"
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
                                className="w-full rounded-sm bg-rose-800 py-6 text-lg font-medium text-white hover:bg-rose-900"
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
                    <form action={confirmAction} className="relative overflow-hidden rounded-sm border-4 border-double border-rose-200 bg-[#fffdfd] p-8 pb-10 shadow-md">
                        <input type="hidden" name="guestId" value={searchState.guest.id} />
                        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[radial-gradient(circle_at_1px_1px,rgba(190,95,130,0.14)_1px,transparent_0)] [background-size:14px_14px]" />
                        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-[radial-gradient(ellipse_at_top,rgba(244,204,216,0.9)_0%,rgba(244,204,216,0.9)_50%,transparent_52%)] [background-size:24px_12px]" />

                        <div className="relative z-10 space-y-6">
                            <h3 
                                className="mb-2 text-center text-4xl text-stone-900"
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
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
                                    <select
                                        name="tickets_confirmed"
                                        defaultValue={String(searchState.guest.tickets_allowed)}
                                        className="w-full appearance-none rounded-sm border border-rose-200 bg-white py-3 pl-12 focus:border-rose-400 focus:outline-none"
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
                                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <Input
                                        type="email"
                                        name="email"
                                        className="rounded-sm border-rose-200 bg-white/90 py-6 pl-12 focus-visible:ring-rose-300"
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
                                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-rose-400" />
                                    <Textarea
                                        name="message"
                                        rows={4}
                                        className="w-full resize-none rounded-sm border border-rose-200 bg-white py-3 pl-12 pr-4 focus:border-rose-400 focus:outline-none"
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
                                className="w-full rounded-sm bg-rose-800 py-6 text-lg font-medium text-white hover:bg-rose-900"
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
                            <div className="relative overflow-hidden rounded-sm border-4 border-double border-rose-200 bg-[#fffdfd] p-8 text-center shadow-md">
                                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[radial-gradient(circle_at_1px_1px,rgba(190,95,130,0.14)_1px,transparent_0)] [background-size:14px_14px]" />
                                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-[radial-gradient(ellipse_at_top,rgba(244,204,216,0.9)_0%,rgba(244,204,216,0.9)_50%,transparent_52%)] [background-size:24px_12px]" />
                                <div className="relative z-10">
                                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-rose-200 bg-rose-50">
                                    <Check className="h-12 w-12 text-rose-700" />
                                </div>
                                <h2 
                                    className="mb-4 text-5xl text-stone-900"
                                    style={{ fontFamily: 'var(--font-great-vibes)' }}
                                >
                                    ¡Gracias!
                                </h2>
                                <p className="text-muted-foreground mb-8">
                                    Tu confirmación ha sido recibida, {finalGuest.name}. ¡Nos vemos en la fiesta!
                                </p>

                                <div className="mb-8 space-y-3 rounded-sm border border-rose-100 bg-rose-50/60 p-6 text-left text-sm text-foreground">
                                    <div className="flex justify-between border-b border-rose-200 py-1">
                                        <span className="text-muted-foreground font-medium">Asistirán:</span>
                                        <span className="font-semibold text-rose-800">
                                            {finalGuest.tickets_confirmed} {Number(finalGuest.tickets_confirmed) === 1 ? "persona" : "personas"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b border-rose-200 py-1">
                                        <span className="text-muted-foreground font-medium">Lugares reservados:</span>
                                        <span>{finalGuest.tickets_allowed}</span>
                                    </div>
                                    {finalGuest.email && (
                                        <div className="flex justify-between border-b border-rose-200 py-1">
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

                                <div className="flex items-center justify-center gap-2 text-rose-800">
                                    <Heart className="h-5 w-5 fill-rose-300 text-rose-600" />
                                    <span className="font-serif">Con cariño, Valentina</span>
                                    <Heart className="h-5 w-5 fill-rose-300 text-rose-600" />
                                </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative overflow-hidden rounded-sm border-4 border-double border-rose-200 bg-[#fffdfd] p-8 text-center shadow-md">
                                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[radial-gradient(circle_at_1px_1px,rgba(190,95,130,0.14)_1px,transparent_0)] [background-size:14px_14px]" />
                                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-[radial-gradient(ellipse_at_top,rgba(244,204,216,0.9)_0%,rgba(244,204,216,0.9)_50%,transparent_52%)] [background-size:24px_12px]" />
                                <div className="relative z-10">
                                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-rose-200 bg-rose-50">
                                    <Heart className="h-12 w-12 fill-rose-100 text-rose-600" />
                                </div>
                                <h2 
                                    className="mb-4 text-5xl text-stone-900"
                                    style={{ fontFamily: 'var(--font-great-vibes)' }}
                                >
                                    Gracias por avisarnos
                                </h2>
                                <p className="text-muted-foreground mb-8">
                                    Lamentamos que no puedas asistir, {finalGuest.name}. Tu respuesta fue guardada correctamente.
                                </p>
                                
                                {finalGuest.message && (
                                    <div className="mb-8 space-y-3 rounded-sm border border-rose-100 bg-rose-50/60 p-6 text-left text-sm text-foreground">
                                        <span className="text-muted-foreground font-medium block mb-1">Tu mensaje:</span>
                                        <p className="text-foreground italic">"{finalGuest.message}"</p>
                                    </div>
                                )}

                                <div className="flex items-center justify-center gap-2 text-rose-800">
                                    <span className="font-serif">Gracias por tu tiempo</span>
                                </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
