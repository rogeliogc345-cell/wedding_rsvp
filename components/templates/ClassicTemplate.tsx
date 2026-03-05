import { Customer, WeddingEvent } from "@/types/database";

interface MediaItem {
    id: string;
    file_url: string;
    file_type: "image" | "audio";
    is_hero: boolean;
}


interface Props {
    customer: Customer;
    events: WeddingEvent[];
    media: MediaItem[];
}

export default function ClassicTemplate({ customer, events, media }: Props) {
    const { primary_color, font_family } = customer.template_config;
    // Filter media by type
    const photos = media?.filter((m: any) => m.file_type === 'image');
    const song = media?.find((m: any) => m.file_type === 'audio');
    console.log(photos);
    console.log(song);

    return (
        <main style={{ fontFamily: font_family }} className="min-h-screen bg-stone-50">

            {/* Audio Player (Autoplay is tricky in modern browsers, so we add a button) */}
            {song && (
                <audio src={song.file_url} controls className="fixed bottom-4 right-4 z-50 opacity-50 hover:opacity-100 transition" />
            )}

            {/* Hero Gallery */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                {photos?.map((photo: any) => (
                    <img
                        key={photo.id}
                        src={photo.file_url}
                        className="w-full h-[400px] object-cover rounded-md"
                        alt="Wedding photo"
                    />
                ))}
            </section>






            <section className="h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-6xl mb-4" style={{ color: primary_color }}>
                    {customer.couple_name}
                </h1>
                <p className="text-xl uppercase tracking-widest">Are getting married</p>
            </section>

            <section className="max-w-2xl mx-auto py-20 px-4">
                <h2 className="text-3xl mb-8 text-center">The Events</h2>
                {events.map((event) => (
                    <div key={event.id} className="mb-8 border-l-2 pl-6" style={{ borderColor: primary_color }}>
                        <h3 className="font-bold text-xl">{event.event_name}</h3>
                        <p>{event.event_date} @ {event.event_time}</p>
                        <p className="text-muted-foreground">{event.location_name}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}