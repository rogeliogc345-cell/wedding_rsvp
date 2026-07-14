"use client"

import { motion } from "framer-motion"
import { Shirt, Ban } from "lucide-react"

export function DressCodeDemo2({ customer_color_preferences }: { customer_color_preferences: any }) {


  const colors = customer_color_preferences?.suggested || [];
  const avoidColors = customer_color_preferences?.forbidden || [];
  console.log('avoidColors', avoidColors);


  return (
    <section className="py-24 px-4 relative overflow-hidden bg-black">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm tracking-[0.3em] text-primary mb-4 text-xvgreen-text">CÓDIGO DE VESTIMENTA</h2>
          <p className="text-4xl md:text-5xl font-serif text-white">Formal Elegante</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Suggested colors */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shirt className="w-5 h-5 text-primary text-xvgreen-text" />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground text-white">Colores Sugeridos</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {colors.map((color: string, index: number) => (
                <motion.div
                  key={`${color}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:border-primary/30 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-full border border-border flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-muted-foreground font-mono">{color}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Colors to avoid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black  border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Ban className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Evitar Estos Colores</h3>
            </div>

            <p className="text-muted-foreground text-sm mb-6">
              Estos colores están reservados para la quinceañera y el cortejo.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {avoidColors.map((color: string, index: number) => (
                <motion.div
                  key={`${color}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-destructive/20 bg-destructive/5"
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-8 h-8 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                    <Ban className="absolute -top-1 -right-1 w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">{color}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground text-sm">
            {"¡Ven elegante y listo para celebrar!"}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
