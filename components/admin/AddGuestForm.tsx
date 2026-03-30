"use client";

import { useState, useActionState, useEffect, useRef } from "react";
import { generatePasscode } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { addGuestAction, AddGuestState } from "@/app/(admin)/actions";

const initialState: AddGuestState = {
    error: null,
    success: false,
};

export function AddGuestForm({ customerId }: { customerId: string }) {
    const { toast } = useToast();
    const [passcode, setPasscode] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    // Initialize passcode on client to avoid hydration mismatch
    useEffect(() => {
        setPasscode(generatePasscode());
    }, []);

    const [state, formAction, isPending] = useActionState(addGuestAction, initialState);

    useEffect(() => {
        if (state.success && state.guestName) {
            toast({ title: "Guest Added", description: `${state.guestName} has been invited!` });
            setPasscode(generatePasscode());
            if (formRef.current) formRef.current.reset();

            // Reset the action state so subsequent adds work cleanly
            state.success = false;
            state.guestName = undefined;
        } else if (state.error) {
            toast({
                title: "Error",
                description: state.error,
                variant: "destructive"
            });
            state.error = null;
        }
    }, [state, toast]);

    const handleRefreshCode = () => {
        setPasscode(generatePasscode());
    };

    return (
        <form action={formAction} ref={formRef} className="p-4 border rounded-xl bg-white shadow-sm space-y-4">
            <input type="hidden" name="customerId" value={customerId} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Guest Name */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-500 uppercase">Guest/Family Name</label>
                    <Input
                        name="name"
                        placeholder="e.g. The Miller Family"
                        required
                        disabled={isPending}
                    />
                </div>

                {/* Tickets Allowed */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-500 uppercase">Seats Reserved</label>
                    <Input
                        name="ticketsAllowed"
                        type="number"
                        min={1}
                        max={20}
                        defaultValue={2}
                        required
                        disabled={isPending}
                    />
                </div>

                {/* Passcode with Refresh Button */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-500 uppercase">Unique Passcode</label>
                    <div className="flex gap-2">
                        <Input
                            name="passcode"
                            value={passcode}
                            className="font-mono font-bold uppercase tracking-widest text-blue-600"
                            readOnly
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={handleRefreshCode}
                            disabled={isPending}
                        >
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={isPending || !passcode}>
                {isPending ? "Adding..." : <><UserPlus className="mr-2 h-4 w-4" /> Add to Guest List</>}
            </Button>
        </form>
    );
}