"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare } from "lucide-react";

export function GuestList({ customerId }: { customerId: string }) {
    const [guests, setGuests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGuests() {
            const supabase = createClient()
            const { data: guests, error } = await supabase
                .from("guests")
                .select("*")
                .eq("customer_id", customerId)
                .order("created_at", { ascending: false });

            if (!error) setGuests(guests);
            setLoading(false);
        }
        fetchGuests();
    }, [customerId]);

    if (loading) return <p>Loading guest list...</p>;
    if (guests.length === 0) return <p className="text-muted-foreground text-center py-10 border rounded-lg">No RSVPs yet.</p>;

    return (
        <div className="rounded-md border bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Passcode</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {guests.map((guest) => (
                        <TableRow key={guest.id}>
                            <TableCell className="font-medium">{guest.name}</TableCell>
                            <TableCell>
                                <Badge variant={guest.attending ? "default" : "destructive"}>
                                    {guest.attending ? "Attending" : "Declined"}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-stone-500">
                                    <Mail className="h-3 w-3" />
                                    {guest.email}
                                </div>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate italic text-stone-400">
                                {guest.message || "-"}
                            </TableCell>
                            <TableCell className="font-mono font-bold uppercase tracking-widest text-blue-600">
                                {guest.passcode}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Summary Stat */}
            <div className="p-4 bg-stone-50 border-t text-sm font-medium">
                Total Confirmed Guests: {guests.filter(g => g.attending).length}
            </div>
        </div>
    );
}