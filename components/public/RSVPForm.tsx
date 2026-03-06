"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function RSVPForm({ customerId }: { customerId: string }) {
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        const supabase = createClient()


        e.preventDefault();
        console.log("Submitting RSVP for Customer ID:", customerId);
        const formData = new FormData(e.currentTarget);

        const { error } = await supabase.from('guests').insert([{
            customer_id: customerId,
            name: formData.get('name'),
            email: formData.get('email'),
            attending: formData.get('attending') === 'true',
            message: formData.get('message'),
        }]);

        if (!error) setSubmitted(true);
        console.log("Error: ", error);
    }

    if (submitted) return <p className="text-center text-green-600 font-bold">Thanks! Your RSVP has been sent.</p>;

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm">
            <Input name="name" placeholder="Your Name" required />
            <Input name="email" type="email" placeholder="Your Email" required />
            <select name="attending" className="w-full border p-2 rounded-md">
                <option value="true">I'm coming!</option>
                <option value="false">Sadly, I can't make it.</option>
            </select>
            <Textarea name="message" placeholder="Message for the couple (Optional)" />
            <Button type="submit" className="w-full">Send RSVP</Button>
        </form>
    );
}