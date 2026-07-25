export interface ColorPreferenceEntry {
    name: string;
    color: string;
}

export interface MediaItem {
    id: string;
    file_url: string;
    file_type: "image" | "audio";
    is_hero?: boolean;
}

export interface Customer {
    id: string;
    couple_name: string;
    event_date: string;
    slug: string;
    template_id: string;
    template_config: {
        primary_color: string;
        font_family: string;
        show_rsvp_form: boolean;
    };
    is_published: boolean;
    category: "wedding" | "XV";
    template?: "classic" | "clasicBlue" | "modern" | "demo4";
    about_me?: string | null;
    color_preferences?: {
        suggested: Array<string | ColorPreferenceEntry>;
        forbidden: Array<string | ColorPreferenceEntry>;
    };
    media?: MediaItem[];
    events?: WeddingEvent[];
}

export interface WeddingEvent {
    id: string;
    customer_id: string;
    event_name: string;
    event_date: string;
    event_time: string;
    location_name: string;
    icon?: string;
    address?: string | null;
    google_maps_url?: string | null;
}