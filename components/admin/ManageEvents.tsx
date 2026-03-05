"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, CalendarPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export function ManageEvents({ customerId, initialEvents }: { customerId: string, initialEvents: any[] }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [newEvent, setNewEvent] = useState({
        event_name: "",
        event_date: "",
        event_time: "",
        location_name: ""
    });

    async function addEvent() {
        const supabase = createClient();
        setLoading(true);
        const { error } = await supabase
            .from("events")
            .insert([{ ...newEvent, customer_id: customerId }]);

        if (!error) {
            setNewEvent({ event_name: "", event_date: "", event_time: "", location_name: "" });
            router.refresh(); // To show the new event in the list
        }
        setLoading(false);
    }

    async function deleteEvent(id: string) {
        const supabase = createClient();
        const { error } = await supabase.from("events").delete().eq("id", id);
        if (!error) router.refresh();
    }

    return (
        <div className="space-y-8">
            {/* 1. Add Event Form */}
            <div className="grid grid-cols-2 gap-4 border p-4 rounded-lg bg-slate-50">
                <Input placeholder="Event (e.g. Ceremony)" value={newEvent.event_name} onChange={e => setNewEvent({ ...newEvent, event_name: e.target.value })} />
                <Input placeholder="Location" value={newEvent.location_name} onChange={e => setNewEvent({ ...newEvent, location_name: e.target.value })} />
                <Input type="date" value={newEvent.event_date} onChange={e => setNewEvent({ ...newEvent, event_date: e.target.value })} />
                <Input type="time" value={newEvent.event_time} onChange={e => setNewEvent({ ...newEvent, event_time: e.target.value })} />
                <Button className="col-span-2" onClick={addEvent} disabled={loading}>
                    <CalendarPlus className="mr-2 h-4 w-4" /> Add Event to Schedule
                </Button>
            </div>

            {/* 2. List of Existing Events */}
            <div className="space-y-4">
                {initialEvents?.map((event) => (
                    <div key={event.id} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                            <p className="font-bold">{event.event_name}</p>
                            <p className="text-sm text-muted-foreground">{event.event_date} at {event.event_time} — {event.location_name}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => deleteEvent(event.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}