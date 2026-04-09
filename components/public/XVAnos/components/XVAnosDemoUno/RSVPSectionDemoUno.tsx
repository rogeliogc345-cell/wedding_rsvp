"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Heart, Users, Utensils, MessageSquare } from "lucide-react"

export function RSVPSectionDemoUno() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        guests: "1",
        attending: "",
        dietaryRestrictions: "",
        message: "",
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the data to your backend
        console.log("RSVP submitted:", formData)
        setIsSubmitted(true)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    if (isSubmitted) {
        return (
            <section id="rsvp" className="py-20 px-4 bg-background">
                <div className="max-w-lg mx-auto text-center">
                    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-12 h-12 text-primary" />
                    </div>
                    <h2
                        className="text-5xl text-primary mb-4"
                        style={{ fontFamily: 'var(--font-great-vibes)' }}
                    >
                        ¡Gracias!
                    </h2>
                    <p className="text-muted-foreground">
                        Tu confirmación ha sido recibida. ¡Nos vemos en la fiesta!
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section id="rsvp" className="py-20 px-4 bg-background">
            <div className="max-w-2xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-12">
                    <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-5">
                        Confirma tu asistencia
                    </p>
                    <h2
                        className="text-5xl md:text-7xl text-primary font-wedding"

                    >
                        RSVP
                    </h2>
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                        <div className="w-2 h-2 rotate-45 bg-gold" />
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                    </div>
                    <p className="mt-6 text-muted-foreground max-w-md mx-auto">
                        Por favor confirma tu asistencia antes del 1 de Agosto de 2026
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 shadow-xl border border-border">
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
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="pl-12 py-6 rounded-xl border-border focus:border-primary"
                                    placeholder="Tu nombre"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="pl-12 py-6 rounded-xl border-border focus:border-primary"
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        {/* Attending */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-3">
                                ¿Asistirás?
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`
                  flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all
                  ${formData.attending === "yes" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
                `}>
                                    <input
                                        type="radio"
                                        name="attending"
                                        value="yes"
                                        checked={formData.attending === "yes"}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <Check className={`w-5 h-5 ${formData.attending === "yes" ? "text-primary" : "text-muted-foreground"}`} />
                                    <span className={formData.attending === "yes" ? "text-primary" : "text-muted-foreground"}>
                                        ¡Sí, asistiré!
                                    </span>
                                </label>
                                <label className={`
                  flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all
                  ${formData.attending === "no" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
                `}>
                                    <input
                                        type="radio"
                                        name="attending"
                                        value="no"
                                        checked={formData.attending === "no"}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <span className={formData.attending === "no" ? "text-primary" : "text-muted-foreground"}>
                                        No podré asistir
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Number of guests */}
                        {formData.attending === "yes" && (
                            <>
                                <div className="relative">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Número de Invitados
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                                        <select
                                            name="guests"
                                            value={formData.guests}
                                            onChange={handleChange}
                                            className="w-full pl-12 py-3 rounded-xl border border-border bg-background focus:border-primary focus:outline-none appearance-none"
                                        >
                                            <option value="1">1 persona</option>
                                            <option value="2">2 personas</option>
                                            <option value="3">3 personas</option>
                                            <option value="4">4 personas</option>
                                            <option value="5">5 personas</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Dietary restrictions */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Restricciones Alimenticias
                                    </label>
                                    <div className="relative">
                                        <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                                        <Input
                                            type="text"
                                            name="dietaryRestrictions"
                                            value={formData.dietaryRestrictions}
                                            onChange={handleChange}
                                            className="pl-12 py-6 rounded-xl border-border focus:border-primary"
                                            placeholder="Vegetariano, vegano, alergias..."
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Message */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Mensaje para la Quinceañera (opcional)
                            </label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-primary/50" />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:outline-none resize-none"
                                    placeholder="Escribe un mensaje especial..."
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <Button
                            type="submit"
                            className="w-full py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-lg font-medium"
                        >
                            Confirmar Asistencia
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    )
}
