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
    template?: "classic" | "clasicBlue" | "modern";
}

export interface WeddingEvent {
    id: string;
    customer_id: string;
    event_name: string;
    event_date: string;
    event_time: string;
    location_name: string;
}