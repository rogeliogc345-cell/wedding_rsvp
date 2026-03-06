import { createClient } from "@/lib/supabase/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditCustomerForm } from "@/components/admin/EditCustomerForm";
// import { ManageEvents } from "@/components/admin/ManageEvents";
import { DesignSettings } from "@/components/admin/DesignSettings";
import { ManageEvents } from "@/components/admin/ManageEvents";
import { MediaUpload } from "@/components/admin/MediaUpload";
import { MediaGallery } from "@/components/admin/MediaGallery";
import { GuestList } from "@/components/admin/GuestListComponent";


export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    // Fetch the customer and their related events in one go

    const { id } = await params;
    const supabase = await createClient();
    const { data: customer } = await supabase
        .from("customers")
        .select("*, events(*), media(*)") // to look for media and events files of their respective tables.
        .eq("id", id)
        .single();

    console.log(customer.media)



    if (!customer) return <div>Customer not found.</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Invitation: {customer.couple_name}</h1>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">General Info</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="design">Design & Template</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="guests">Guest List</TabsTrigger>
                    <TabsTrigger value="example-2">Example 2</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-6">
                    <EditCustomerForm customer={customer} />
                </TabsContent>

                <TabsContent value="events" className="mt-6">
                    <ManageEvents customerId={customer.id} initialEvents={customer.events} />
                </TabsContent>

                <TabsContent value="design" className="mt-6">
                    <DesignSettings customer={customer} />
                </TabsContent>
                <TabsContent value="media" className="mt-6">
                    <MediaUpload customerId={customer.id} />

                    <MediaGallery media={customer.media} customerId={customer.id} />

                </TabsContent>
                <TabsContent value="guests" className="mt-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">RSVP Responses</h3>
                            {/* You could add an "Export to CSV" button here later! */}
                        </div>
                        <GuestList customerId={customer.id} />
                    </div>
                </TabsContent>


                <TabsContent value="example-2" className="mt-6">
                    <p>Example 2</p>
                </TabsContent>
            </Tabs>
        </div>
    );
}