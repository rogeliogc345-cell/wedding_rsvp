"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, Send, Heart } from "lucide-react"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

export function RSVPDemo2() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attendance, setAttendance] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(180,230,70,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(180,230,70,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm tracking-[0.3em] text-primary mb-4">CONFIRMA TU ASISTENCIA</h2>
          <p className="text-4xl md:text-5xl font-serif text-foreground mb-4">RSVP</p>
          <p className="text-muted-foreground">Por favor confirma antes del 1 de Junio</p>
        </motion.div>

        {!isSubmitted ? (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl p-8 md:p-12"
          >
            <FieldGroup>
              <div className="grid md:grid-cols-2 gap-6">
                <Field>
                  <FieldLabel htmlFor="name">Nombre Completo</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="guests">Número de Invitados</FieldLabel>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="5"
                  placeholder="1"
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </Field>

              <Field>
                <FieldLabel>¿Asistirás?</FieldLabel>
                <RadioGroup
                  value={attendance}
                  onValueChange={setAttendance}
                  className="flex gap-6 pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" className="border-primary text-primary" />
                    <Label htmlFor="yes" className="text-foreground cursor-pointer">
                      {"¡Sí, ahí estaré!"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" className="border-border" />
                    <Label htmlFor="no" className="text-muted-foreground cursor-pointer">
                      No podré asistir
                    </Label>
                  </div>
                </RadioGroup>
              </Field>

              <Field>
                <FieldLabel htmlFor="message">Mensaje (opcional)</FieldLabel>
                <Textarea
                  id="message"
                  placeholder="Escribe un mensaje para la quinceañera..."
                  rows={4}
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </Field>
            </FieldGroup>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar Confirmación
            </Button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-primary/30 rounded-2xl p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-primary" />
            </motion.div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
              {"¡Gracias por confirmar!"}
            </h3>
            <p className="text-muted-foreground mb-6">
              Hemos recibido tu confirmación. ¡Nos vemos pronto!
            </p>
            <div className="flex items-center justify-center gap-2 text-primary">
              <Heart className="w-5 h-5 fill-primary" />
              <span className="font-serif">Con cariño, Valentina</span>
              <Heart className="w-5 h-5 fill-primary" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
