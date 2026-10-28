import { z } from "zod";

export const contactFormSchema = z
  .object({
    celebration: z.enum(["boda", "xv"], {
      error: "Selecciona una celebración válida.",
    }),
    email: z
      .string()
      .trim()
      .min(1, "El correo electrónico es obligatorio.")
      .max(254, "El correo electrónico es demasiado largo.")
      .email("Ingresa un correo electrónico válido."),
    eventDate: z
      .string()
      .date("Ingresa una fecha válida.")
      .refine(
        (date) => date >= new Date().toISOString().slice(0, 10),
        "La fecha del evento no puede estar en el pasado.",
      ),
  })
  .strict();

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFormField = keyof ContactFormValues;
