"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCustomerSchema } from "@/lib/validation";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { UpdateCustomerAction, UpdateCustomerState } from "@/app/(admin)/actions";
import { Loader2, CheckCircle2, AlertCircle, ExternalLink, ArrowLeft } from "lucide-react";

// ── Submit button aware of pending state ────────────────────────────────────
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving…
                </>
            ) : (
                "Save Changes"
            )}
        </Button>
    );
}

// ── Initial state ───────────────────────────────────────────────────────────
const initialState: UpdateCustomerState = {
    error: null,
    success: false,
};

// ── Main form component ─────────────────────────────────────────────────────
export function EditCustomerForm({ customer }: { customer: any }) {
    // Bind the customer id so the action always knows which record to update
    const boundAction = UpdateCustomerAction.bind(null, customer.id);
    const [state, formAction] = useActionState(boundAction, initialState);

    const form = useForm({
        resolver: zodResolver(editCustomerSchema),
        defaultValues: {
            couple_name: customer.couple_name ?? "",
            slug: customer.slug ?? "",
            is_published: customer.is_published ?? false,
            event_date: customer.event_date ?? "",
            category: customer.category ?? "wedding",
        },
    });

    // Watch slug so the "View Invitation" link always reflects the current input
    const currentSlug = form.watch("slug");

    // Keep the is_published hidden input in sync with the Switch
    const isPublished = form.watch("is_published");

    // Clear success banner after a few seconds (optional nice touch)
    useEffect(() => {
        if (!state.success) return;
        const t = setTimeout(() => {
            // nothing needed; banner disappears once state changes on next action
        }, 4000);
        return () => clearTimeout(t);
    }, [state.success]);

    return (
        <Form {...form}>
            <form
                action={formAction}
                className="space-y-6 border p-6 rounded-lg"
            >
                {/* ── Success banner ─────────────────────────────────────── */}
                {state.success && (
                    <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        Customer profile updated!
                    </div>
                )}

                {/* ── Error banner ───────────────────────────────────────── */}
                {state.error && (
                    <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {state.error}
                    </div>
                )}

                {/* Hidden is_published to carry the Switch value into FormData */}
                <input type="hidden" name="is_published" value={String(isPublished)} />

                {/* ── Couple name ────────────────────────────────────────── */}
                <FormField
                    control={form.control}
                    name="couple_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Couple's Names</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL Slug</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This will be: weddingapp.com/invite/{field.value}
                            </FormDescription>
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
                    render={({ field }) => (
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
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* ── Publicly visible switch ────────────────────────────── */}
                <FormField
                    control={form.control}
                    name="is_published"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel>Publicly Visible</FormLabel>
                                <FormDescription>
                                    Enable this to make the invitation live.
                                </FormDescription>
                            </div>
                            <FormControl>
                                {/* Switch drives local state; hidden input carries value to server */}
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex flex-wrap items-center gap-3">
                    {/* ← Back to Dashboard */}
                    <Button variant="ghost" asChild className="text-muted-foreground">
                        <Link href="/dashboard">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Dashboard
                        </Link>
                    </Button>

                    <div className="ml-auto flex flex-wrap items-center gap-3">
                        <SubmitButton />

                        {/* View Invitation — only active when saved & published */}
                        {customer.is_published ? (
                            <Button variant="outline" asChild>
                                <Link
                                    href={`/invite/${currentSlug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    prefetch={false}
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View Invitation
                                </Link>
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                disabled
                                title='Enable "Publicly Visible" and save to activate this link'
                            >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Invitation
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </Form>
    );
}