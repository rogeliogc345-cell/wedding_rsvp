import { notFound } from "next/navigation";
import { getInvitationBySlug } from "@/app/(admin)/actions";
import WeddingTemplate from "@/components/templates/WeddingTemplate";
import XVClassicTemplate from "@/app/quince/classic/page";
import XVClassicBlueTemplate from "@/app/quince/classicBlue/page";
import XVModernTemplate from "@/app/quince/modern/page";
import XVDemo4Template from "@/app/quince/demo4/page";

import MusicPlayer from "@/components/public/XVAnos/MusicPlayer";

const TEMPLATE_MAP = {
    XV: {
        classic: XVClassicTemplate,
        classicBlue: XVClassicBlueTemplate,
        clasicBlue: XVClassicBlueTemplate,
        modern: XVModernTemplate,
        demo4: XVDemo4Template,
    }
};

export default async function InvitationPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    
    // Fetch data using the server action
    const customer = await getInvitationBySlug(slug);

    if (!customer || !customer.is_published) {
        notFound(); // Shows the 404 page
    }








    // 2. Logic to pick the template based on category







    if (customer.category === "XV") {
        const rawTemplate = customer.template ?? customer.template_id ?? "classic";
        const normalizedTemplate = rawTemplate === "classicBlue" ? "clasicBlue" : rawTemplate;
        const TemplateComponent = TEMPLATE_MAP.XV[normalizedTemplate as keyof typeof TEMPLATE_MAP.XV] ?? XVClassicTemplate;

        return (
            <>
                <TemplateComponent customer={customer} />
                <MusicPlayer customer={customer} />
            </>
        );
    }

    // Default to ModernTemplate for Wedding (and as a fallback)
    return <WeddingTemplate customer={customer} events={customer.events} />;
}