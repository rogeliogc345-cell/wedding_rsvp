"use client"; // Forms must be Client Components

import { useForm, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, CustomerFormValues } from "@/lib/validation";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function AddCustomerForm() {
    const form = useForm<CustomerFormValues>({
        resolver: zodResolver(customerSchema),
        defaultValues: { couple_name: "", slug: "", template_id: "classic" },
    });

    async function onSubmit(values: CustomerFormValues) {
        const supabase = createClient();
        const { data, error } = await supabase
            .from("customers")
            .insert([{ ...values, user_id: (await supabase.auth.getUser()).data.user?.id }])
            .select();

        if (error) {
            console.error("Error creating customer:", error.message);
        } else {
            alert("Customer created successfully!");
            form.reset();

        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="couple_name"
                    render={({ field }: { field: ControllerRenderProps<CustomerFormValues, "couple_name"> }) => (
                        <FormItem>
                            <FormLabel>Couple's Names</FormLabel>
                            <FormControl><Input placeholder="Alex & Sam" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }: { field: ControllerRenderProps<CustomerFormValues, "slug"> }) => (
                        <FormItem>
                            <FormLabel>Couple's Names</FormLabel>
                            <FormControl><Input placeholder="Add the slug" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Create Invitation</Button>
            </form>
        </Form>
    );
}