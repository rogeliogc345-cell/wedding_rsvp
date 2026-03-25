import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
// We will create these components next
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import XVAnosClassic from "@/components/templates/XVAnos/XVAnos_classic";


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

    // 2. Logic to pick the template
    const TemplateMap: Record<string, any> = {
        classic: ClassicTemplate,
        modern: ModernTemplate,
    };

    const SelectedTemplate = TemplateMap[customer.template_id] || ClassicTemplate;

    // 3. Render the template with the data
    // return <SelectedTemplate customer={customer} events={customer.events} media={customer.media} />;
    return <XVAnosClassic customer={customer} events={customer.events} media={customer.media} />;
}