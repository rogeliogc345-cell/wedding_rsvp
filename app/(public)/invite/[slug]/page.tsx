import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import WeddingTemplate from "@/components/templates/WeddingTemplate";
import XVClassicTemplate from "@/app/quince/classic/page";
import XVClassicBlueTemplate from "@/app/quince/classicBlue/page";
import XVModernTemplate from "@/app/quince/modern/page";






const TEMPLATE_MAP = {
    XV: {
        classic: XVClassicTemplate,
        classicBlue: XVClassicBlueTemplate,
        clasicBlue: XVClassicBlueTemplate,
        modern: XVModernTemplate,
    }
};






export default async function InvitationPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const supabase = await createClient();
    // 1. Fetch data for this specific slug
    const { data: customer, error } = await supabase
        .from("customers")
        .select("*, events(*), media(*)")
        .eq("slug", slug)
        .single();

    if (error) {
        throw new Error("Error fetching customer");
    }

    if (!customer || !customer.is_published) {
        notFound(); // Shows the 404 page
    }








    // 2. Logic to pick the template based on category







    if (customer.category === "XV") {
        const rawTemplate = customer.template ?? customer.template_id ?? "classic";
        const normalizedTemplate = rawTemplate === "classicBlue" ? "clasicBlue" : rawTemplate;
        const TemplateComponent = TEMPLATE_MAP.XV[normalizedTemplate as keyof typeof TEMPLATE_MAP.XV] ?? XVClassicTemplate;

        return <TemplateComponent />;
    }

    // Default to ModernTemplate for Wedding (and as a fallback)
    return <WeddingTemplate customer={customer} events={customer.events} />;
}