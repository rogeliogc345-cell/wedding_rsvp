import { Customer, WeddingEvent } from "@/types/database";

interface Props {
    customer: Customer;
    events: WeddingEvent[];
}

export default function WeddingTemplate({ customer, events }: Props) {
    const { primary_color, font_family } = customer.template_config;
    const template = customer.template ?? customer.template_id ?? "classic";

    let bgClass = "bg-zinc-900 text-zinc-50";
    let borderClass = "border-zinc-700";
    let primaryColorOverride = primary_color;

    if (template === "clasicBlue") {
        bgClass = "bg-[#0a1628] text-slate-100";
        borderClass = "border-blue-500/40";
        if (!primaryColorOverride || primaryColorOverride === "#7c3aed") {
            primaryColorOverride = "#38bdf8"; // Sky Blue
        }
    } else if (template === "classic") {
        bgClass = "bg-stone-50 text-stone-900";
        borderClass = "border-stone-300";
        if (!primaryColorOverride || primaryColorOverride === "#7c3aed") {
            primaryColorOverride = "#db2777"; // Rose/Classic color
        }
    }

    return (
        <main style={{ fontFamily: font_family }} className={`min-h-screen ${bgClass}`}>
            <section className="h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-6xl mb-4 font-light tracking-widest font-serif" style={{ color: primaryColorOverride }}>
                    {customer.couple_name}
                </h1>
                <p className="text-lg uppercase tracking-[0.4em] opacity-80">Are getting married</p>
            </section>

            <section className="max-w-2xl mx-auto py-20 px-4">
                <h2 className="text-3xl mb-8 text-center font-light">The Events</h2>
                {events.map((event) => (
                    <div key={event.id} className="mb-8 border-l pl-6" style={{ borderColor: primaryColorOverride }}>
                        <h3 className="font-semibold text-xl">{event.event_name}</h3>
                        <p className="opacity-80">{event.event_date} @ {event.event_time}</p>
                        <p className="opacity-60">{event.location_name}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}
