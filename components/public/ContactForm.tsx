"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  validateContactRequest,
  type ContactActionResult,
} from "@/app/contact-actions";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/contact-schema";

export default function ContactForm() {
  const [result, setResult] = useState<ContactActionResult | null>(null);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      celebration: "boda",
      email: "",
      eventDate: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setResult(null);

    try {
      const actionResult = await validateContactRequest(values);
      setResult(actionResult);

      if (actionResult.status === "invalid") {
        for (const field of ["celebration", "email", "eventDate"] as const) {
          const message = actionResult.fieldErrors[field];
          if (message) {
            form.setError(field, {
              type: "server",
              message,
            });
          }
        }
      }
    } catch {
      setResult({
        status: "invalid",
        message: "No fue posible validar el formulario. Inténtalo de nuevo.",
        fieldErrors: {},
      });
    }
  };

  const inputClassName =
    "mt-2 min-h-12 w-full rounded-sm border border-[#193a34]/25 bg-white px-4 text-sm text-[#193a34] outline-none transition focus:border-[#193a34] focus:ring-2 focus:ring-[#193a34]/15";

  return (
    <section
      id="contact"
      className="bg-white px-6 py-20 text-[#193a34] sm:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
        <div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#b54c39] sm:text-xs">
            Estamos para ayudarte
          </p>
          <h2
            id="contact-heading"
            className="font-[family-name:var(--font-playfair)] text-4xl leading-tight sm:text-5xl"
          >
            Hablemos de tu celebración.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[#52655d] sm:text-base">
            Cuéntanos qué estás organizando y cuándo será tu evento.
          </p>
        </div>

        <form
          className="space-y-5 border border-[#193a34]/15 bg-[#f4f0e6]/50 p-6 sm:p-8"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="celebration"
              className="text-sm font-medium text-[#193a34]"
            >
              Celebración
            </label>
            <select
              id="celebration"
              className={inputClassName}
              aria-invalid={Boolean(form.formState.errors.celebration)}
              aria-describedby={
                form.formState.errors.celebration
                  ? "celebration-error"
                  : undefined
              }
              {...form.register("celebration")}
            >
              <option value="boda">Boda</option>
              <option value="xv">XV</option>
            </select>
            {form.formState.errors.celebration && (
              <p id="celebration-error" className="mt-1 text-sm text-red-700">
                {form.formState.errors.celebration.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#193a34]"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              className={inputClassName}
              placeholder="tu@correo.com"
              aria-invalid={Boolean(form.formState.errors.email)}
              aria-describedby={
                form.formState.errors.email ? "email-error" : undefined
              }
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-700">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="eventDate"
              className="text-sm font-medium text-[#193a34]"
            >
              Fecha de evento
            </label>
            <input
              id="eventDate"
              type="date"
              className={inputClassName}
              aria-invalid={Boolean(form.formState.errors.eventDate)}
              aria-describedby={
                form.formState.errors.eventDate ? "eventDate-error" : undefined
              }
              {...form.register("eventDate")}
            />
            {form.formState.errors.eventDate && (
              <p id="eventDate-error" className="mt-1 text-sm text-red-700">
                {form.formState.errors.eventDate.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            aria-busy={form.formState.isSubmitting}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[#193a34] px-6 text-sm font-medium text-white transition-colors hover:bg-[#28564b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {form.formState.isSubmitting && (
              <span
                aria-hidden="true"
                className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
            )}
            contactar equipo
          </button>

          {result && (
            <p
              role={result.status === "validated" ? "status" : "alert"}
              className={`text-sm leading-6 ${
                result.status === "validated"
                  ? "text-[#52655d]"
                  : "text-red-700"
              }`}
            >
              {result.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
