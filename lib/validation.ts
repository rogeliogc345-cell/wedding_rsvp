import * as z from "zod";

// XV-specific template options — Wedding templates will be added later
export const XV_TEMPLATES = ["classic", "clasicBlue", "modern"] as const;
export type XVTemplate = typeof XV_TEMPLATES[number];

export const customerSchema = z.object({
    couple_name: z.string().min(2, "Names must be at least 2 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slugs can only contain lowercase letters, numbers, and hyphens"),
    template: z.enum(XV_TEMPLATES),
    event_date: z.string().optional(),
    category: z.enum(["wedding", "XV"]),
});

export const editCustomerSchema = z.object({
    couple_name: z.string().min(2, "Names must be at least 2 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slugs can only contain lowercase letters, numbers, and hyphens"),
    is_published: z.boolean(),
    template: z.enum(XV_TEMPLATES),
    event_date: z.string().optional(),
    category: z.enum(["wedding", "XV"]),
});


export type CustomerFormValues = z.infer<typeof customerSchema>;