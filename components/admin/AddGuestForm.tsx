"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { generatePasscode } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export function AddGuestForm({ customerId }: { customerId: string }) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    // State for the new guest
    const [guest, setGuest] = useState({
        name: "",
        tickets_allowed: 2,
        passcode: generatePasscode(), // Initialize with a random code
    });

    const handleRefreshCode = () => {
        setGuest({ ...guest, passcode: generatePasscode() });
    };

    async function handleSubmit(e: React.FormEvent) {
        const supabase = createClient();



        e.preventDefault();
        if (!guest.name) return;

        setLoading(true);
        const { error } = await supabase.from("guests").insert([
            {
                customer_id: customerId,
                name: guest.name,
                tickets_allowed: guest.tickets_allowed,
                passcode: guest.passcode.toUpperCase(),
            },
        ]);

        if (error) {
            toast({
                title: "Error",
                description: "That passcode or name might already be in use.",
                variant: "destructive"
            });
        } else {
            toast({ title: "Guest Added", description: `${guest.name} has been invited!` });
            // Reset form with a fresh passcode for the next guest
            setGuest({ name: "", tickets_allowed: 2, passcode: generatePasscode() });
            router.refresh();
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-xl bg-white shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Guest Name */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-500 uppercase">Guest/Family Name</label>
                    <Input
                        placeholder="e.g. The Miller Family"
                        value={guest.name}
                        onChange={(e) => setGuest({ ...guest, name: e.target.value })}
                        required
                    />
                </div>

                {/* Tickets Allowed */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-500 uppercase">Seats Reserved</label>
                    <Input
                        type="number"
                        min={1}
                        max={20}
                        value={guest.tickets_allowed}
                        onChange={(e) => setGuest({ ...guest, tickets_allowed: parseInt(e.target.value) })}
                    />
                </div>

                {/* Passcode with Refresh Button */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-500 uppercase">Unique Passcode</label>
                    <div className="flex gap-2">
                        <Input
                            value={guest.passcode}
                            className="font-mono font-bold uppercase tracking-widest text-blue-600"
                            readOnly
                        />
                        <Button type="button" variant="outline" size="icon" onClick={handleRefreshCode}>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : <><UserPlus className="mr-2 h-4 w-4" /> Add to Guest List</>}
            </Button>
        </form>
    );
}