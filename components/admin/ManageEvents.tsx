"use client";

import { useActionState } from "react";
import { addEventAction, deleteEventAction, type EventActionState } from "@/app/(admin)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, CalendarPlus, AlertCircle, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { getEventIcon } from "@/lib/icons";

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
            <form action={formAction} className="grid grid-cols-2 gap-4 border p-6 rounded-lg bg-slate-50">
                <div className="col-span-2">
                    <h4 className="text-md font-semibold text-slate-800 mb-2">Create New Event Activity</h4>
                </div>
                <Input 
                    placeholder="Event (e.g. Ceremony)" 
                    name="event_name"
                    required
                    disabled={isPending}
                />
                <Input 
                    placeholder="Location Name (e.g. Parroquia San José)" 
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
                <Input 
                    placeholder="Address (Optional)" 
                    name="address"
                    disabled={isPending}
                />
                <Input 
                    placeholder="Google Maps URL (Optional)" 
                    name="google_maps_url"
                    disabled={isPending}
                />
                
                <div className="col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Choose Event Icon</label>
                    <select
                        name="icon"
                        defaultValue="PartyPopper"
                        disabled={isPending}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="Church">Church / Misa / Ceremonia</option>
                        <option value="PartyPopper">PartyPopper / Fiesta / Recepción</option>
                        <option value="Music">Music / Baile / Vals</option>
                        <option value="Utensils">Utensils / Cena / Comida</option>
                        <option value="GlassWater">GlassWater / Brindis / Coctel</option>
                        <option value="Crown">Crown / Presentación / Corona</option>
                        <option value="Heart">Heart / Agradecimiento / Amor</option>
                        <option value="Camera">Camera / Sesión Fotográfica</option>
                        <option value="Sparkles">Sparkles / Momentos Especiales</option>
                        <option value="Ribbon">Ribbon / Moños / Agradecimientos</option>
                        <option value="Gift">Gift / Regalos / Sobres</option>
                    </select>
                </div>

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
                    className="col-span-2 mt-2" 
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
                <h4 className="text-md font-semibold text-slate-800">Event Schedule</h4>
                {initialEvents?.map((event) => {
                    const IconComponent = getEventIcon(event.icon);
                    return (
                        <div key={event.id} className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-100 rounded-lg text-slate-600 border border-slate-200">
                                    <IconComponent className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{event.event_name}</p>
                                    <p className="text-sm text-slate-600">{event.event_date} at {event.event_time} — {event.location_name}</p>
                                    {(event.address || event.google_maps_url) && (
                                        <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground mt-1">
                                            {event.address && <span>{event.address}</span>}
                                            {event.address && event.google_maps_url && <span className="text-slate-300">|</span>}
                                            {event.google_maps_url && (
                                                <a 
                                                    href={event.google_maps_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="text-primary hover:underline font-medium"
                                                >
                                                    View on Map
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
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
                    );
                })}
            </div>
        </div>
    );
}