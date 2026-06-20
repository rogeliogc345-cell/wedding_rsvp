"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useForm, ControllerRenderProps, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, CustomerFormValues } from "@/lib/validation";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateCustomerEventAction, CreateCustomerState } from "@/app/(admin)/actions";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

// ── Submit button that knows about pending state ────────────────────────────
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating…
                </>
            ) : (
                "Create Invitation"
            )}
        </Button>
    );
}

// ── Slug generator ──────────────────────────────────────────────────────────
function toSlug(value: string): string {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // strip accents (á→a, é→e …)
        .replace(/[^a-z0-9\s-]/g, "")    // remove symbols
        .trim()
        .replace(/\s+/g, "-")            // spaces → hyphens
        .replace(/-+/g, "-");            // collapse consecutive hyphens
}

// ── Initial state ───────────────────────────────────────────────────────────
const initialState: CreateCustomerState = {
    error: null,
    success: false,
};

// ── Main form component ─────────────────────────────────────────────────────
export function AddCustomerForm() {
    const [state, formAction] = useActionState(CreateCustomerEventAction, initialState);

    const form = useForm<CustomerFormValues>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            couple_name: "",
            slug: "",
            template_id: "classic",
            event_date: "",
            category: "wedding",
        },
    });

    // Stable short UUID suffix – regenerated only after a successful submit
    const slugSuffix = useRef(crypto.randomUUID().slice(0, 6));

    // Track whether the user has manually edited the slug
    const slugManuallyEdited = useRef(false);

    // Watch couple_name to drive the auto-slug
    const coupleName = useWatch({ control: form.control, name: "couple_name" });

    useEffect(() => {
        if (!slugManuallyEdited.current) {
            const base = toSlug(coupleName ?? "");
            const slug = base ? `${base}-${slugSuffix.current}` : "";
            form.setValue("slug", slug, { shouldValidate: false });
        }
    }, [coupleName, form]);

    // Reset the form (and the manual-edit flag) on success
    useEffect(() => {
        if (state.success) {
            slugManuallyEdited.current = false;
            slugSuffix.current = crypto.randomUUID().slice(0, 6); // fresh suffix for next entry
            form.reset();
        }
    }, [state.success, form]);

    return (
        <Form {...form}>
            <form action={formAction} className="space-y-4">
                {/* ── Success banner ─────────────────────────────────────── */}
                {state.success && (
                    <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        Invitation created successfully!
                    </div>
                )}

                {/* ── Error banner ───────────────────────────────────────── */}
                {state.error && (
                    <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {state.error}
                    </div>
                )}

                {/* Hidden template_id */}
                <input type="hidden" name="template_id" value="classic" />

                {/* ── Couple name ────────────────────────────────────────── */}
                <FormField
                    control={form.control}
                    name="couple_name"
                    render={({ field }: { field: ControllerRenderProps<CustomerFormValues, "couple_name"> }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Alex & Sam" {...field} />
                            </FormControl>
                            <FormMessage />
                            {state.fieldErrors?.couple_name && (
                                <p className="text-xs text-red-600">{state.fieldErrors.couple_name[0]}</p>
                            )}
                        </FormItem>
                    )}
                />

                {/* ── Slug ───────────────────────────────────────────────── */}
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }: { field: ControllerRenderProps<CustomerFormValues, "slug"> }) => (
                        <FormItem>
                            <div className="flex items-center gap-2">
                                <FormLabel>Slug</FormLabel>
                                {!slugManuallyEdited.current && form.watch("slug") && (
                                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                        auto
                                    </span>
                                )}
                            </div>
                            <FormControl>
                                <Input
                                    placeholder="alex-and-sam"
                                    {...field}
                                    onChange={(e) => {
                                        slugManuallyEdited.current = true;
                                        field.onChange(e);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                            {state.fieldErrors?.slug && (
                                <p className="text-xs text-red-600">{state.fieldErrors.slug[0]}</p>
                            )}
                        </FormItem>
                    )}
                />

                {/* ── Category ───────────────────────────────────────────── */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }: { field: ControllerRenderProps<CustomerFormValues, "category"> }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <select
                                    {...field}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="wedding">Wedding</option>
                                    <option value="XV">XV</option>
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* ── Event date ─────────────────────────────────────────── */}
                <FormField
                    control={form.control}
                    name="event_date"
                    render={({ field }: { field: ControllerRenderProps<CustomerFormValues, "event_date"> }) => (
                        <FormItem>
                            <FormLabel>Event Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <SubmitButton />
            </form>
        </Form>
    );
}