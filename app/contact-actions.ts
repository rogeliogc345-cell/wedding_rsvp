"use server";

import {
  contactFormSchema,
  type ContactFormField,
} from "@/lib/contact-schema";

export type ContactActionResult =
  | {
      status: "validated";
      message: string;
    }
  | {
      status: "invalid";
      message: string;
      fieldErrors: Partial<Record<ContactFormField, string>>;
    };

export async function validateContactRequest(
  input: unknown,
): Promise<ContactActionResult> {
  const parsed = contactFormSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactFormField, string>> = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (
        field === "celebration" ||
        field === "email" ||
        field === "eventDate"
      ) {
        fieldErrors[field] ??= issue.message;
      }
    }

    return {
      status: "invalid",
      message: "Revisa los datos del formulario.",
      fieldErrors,
    };
  }

  return {
    status: "validated",
    message:
      "Los datos son válidos, pero todavía no se envían ni se almacenan. No se ha compartido tu información.",
  };
}
