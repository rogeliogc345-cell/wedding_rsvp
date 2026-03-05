import { Customer, WeddingEvent } from "@/types/database";

interface Props {
    customer: Customer;
    events: WeddingEvent[];
}

export default function ModernTemplate({ customer, events }: Props) {
    const { primary_color, font_family } = customer.template_config;

    return (
        <main style={{ fontFamily: font_family }} className="min-h-screen bg-zinc-900 text-white">
            <section className="h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-6xl mb-4 font-light tracking-widest" style={{ color: primary_color }}>
                    {customer.couple_name}
                </h1>
                <p className="text-lg uppercase tracking-[0.4em] text-zinc-400">Are getting married</p>
            </section>

            <section className="max-w-2xl mx-auto py-20 px-4">
                <h2 className="text-3xl mb-8 text-center font-light">The Events</h2>
                {events.map((event) => (
                    <div key={event.id} className="mb-8 border-l pl-6" style={{ borderColor: primary_color }}>
                        <h3 className="font-semibold text-xl">{event.event_name}</h3>
                        <p className="text-zinc-300">{event.event_date} @ {event.event_time}</p>
                        <p className="text-zinc-500">{event.location_name}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}
