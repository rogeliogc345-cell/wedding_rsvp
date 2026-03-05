"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCustomerSchema, CustomerFormValues } from "@/lib/validation";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function EditCustomerForm({ customer }: { customer: any }) {
    const router = useRouter();


    const form = useForm({
        resolver: zodResolver(editCustomerSchema),
        defaultValues: {
            couple_name: customer.couple_name,
            slug: customer.slug,
            is_published: customer.is_published,
        },
    });

    async function onSubmit(values: any) {
        const supabase = createClient();
        const { error } = await supabase
            .from("customers")
            .update(values)
            .eq("id", customer.id);

        if (error) {
            toast.error("Update Failed",);
        } else {
            toast.success("Customer profile updated!");
            router.refresh(); // Refreshes Server Component data
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border p-6 rounded-lg">
                <FormField
                    control={form.control}
                    name="couple_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Couple's Names</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL Slug</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormDescription>This will be: weddingapp.com/invite/{field.value}</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="is_published"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel>Publicly Visible</FormLabel>
                                <FormDescription>Enable this to make the invitation live.</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">Save Changes</Button>
            </form>
        </Form>
    );
}