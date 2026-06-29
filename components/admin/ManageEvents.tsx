"use client";

import { useActionState } from "react";
import { addEventAction, deleteEventAction, type EventActionState } from "@/app/(admin)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, CalendarPlus, AlertCircle, Loader2 } from "lucide-react";
import { useTransition } from "react";

const initialState: EventActionState = {
    error: null,
    success: false,
};

export function ManageEvents({ customerId, initialEvents }: { customerId: string, initialEvents: any[] }) {
    const [state, formAction, isPending] = useActionState(
        (prevState: EventActionState, formData: FormData) => addEventAction(customerId, prevState, formData),
        initialState
    );
    const [deleteTransition, startDeleteTransition] = useTransition();

    const handleDelete = (eventId: string) => {
        startDeleteTransition(async () => {
            await deleteEventAction(customerId, eventId);
        });
    };

    return (
        <div className="space-y-8">
            {/* 1. Add Event Form */}
            <form action={formAction} className="grid grid-cols-2 gap-4 border p-4 rounded-lg bg-slate-50">
                <Input 
                    placeholder="Event (e.g. Ceremony)" 
                    name="event_name"
                    required
                    disabled={isPending}
                />
                <Input 
                    placeholder="Location" 
                    name="location_name"
                    required
                    disabled={isPending}
                />
                <Input 
                    type="date" 
                    name="event_date"
                    required
                    disabled={isPending}
                />
                <Input 
                    type="time" 
                    name="event_time"
                    required
                    disabled={isPending}
                />
                {state.error && (
                    <div className="col-span-2 flex items-center gap-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        {state.error}
                    </div>
                )}
                {state.success && (
                    <div className="col-span-2 text-sm text-green-600">
                        Event added successfully!
                    </div>
                )}
                <Button 
                    type="submit"
                    className="col-span-2" 
                    disabled={isPending}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
                        </>
                    ) : (
                        <>
                            <CalendarPlus className="mr-2 h-4 w-4" /> Add Event to Schedule
                        </>
                    )}
                </Button>
            </form>

            {/* 2. List of Existing Events */}
            <div className="space-y-4">
                {initialEvents?.map((event) => (
                    <div key={event.id} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                            <p className="font-bold">{event.event_name}</p>
                            <p className="text-sm text-muted-foreground">{event.event_date} at {event.event_time} — {event.location_name}</p>
                        </div>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(event.id)}
                            disabled={deleteTransition}
                        >
                            {deleteTransition ? (
                                <Loader2 className="h-4 w-4 text-destructive animate-spin" />
                            ) : (
                                <Trash2 className="h-4 w-4 text-destructive" />
                            )}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}