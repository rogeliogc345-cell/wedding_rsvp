import * as z from "zod";

export const customerSchema = z.object({
    couple_name: z.string().min(2, "Names must be at least 2 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slugs can only contain lowercase letters, numbers, and hyphens"),
    template_id: z.string().optional(),
});

export const editCustomerSchema = z.object({
    couple_name: z.string().min(2, "Names must be at least 2 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slugs can only contain lowercase letters, numbers, and hyphens"),
    is_published: z.boolean(),
});


export type CustomerFormValues = z.infer<typeof customerSchema>;