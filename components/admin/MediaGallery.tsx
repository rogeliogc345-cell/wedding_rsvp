"use client"

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Music, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
interface MediaItem {
    id: string;
    file_url: string;
    file_type: "image" | "audio"
}

export function MediaGallery({ media, customerId }: { media: MediaItem[], customerId: string }) {
    const router = useRouter();


    async function handleDelete(id: string, url: string) {

        const supabase = createClient();


        // 1. Extract the file path from the URL to delete from Storage
        // Example URL: .../wedding-media/customer-id/filename.jpg
        const filePath = url.split('wedding-media/')[1];



        // 2. Delete from Storage
        const { error: storageError } = await supabase.storage
            .from('wedding-media')
            .remove([filePath]);

        if (storageError) {
            toast("Storage Error", { description: storageError.message });
            return;
        }

        // 3. Delete from Database Table
        const { error: dbError } = await supabase
            .from('media')
            .delete()
            .eq('id', id);

        if (dbError) {
            toast("Database Error", { description: dbError.message },);
        } else {
            toast("Deleted", { description: "File removed successfully." });
            router.refresh();
        }
    }

    if (!media || media.length === 0) {
        return <p className="text-center text-muted-foreground py-10">No files uploaded yet.</p>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {media.map((item) => (
                <div key={item.id} className="relative group border rounded-lg overflow-hidden bg-white">
                    {item.file_type === 'image' ? (
                        <img
                            src={item.file_url}
                            alt="Uploaded"
                            className="h-32 w-full object-cover"
                        />
                    ) : (
                        <div className="h-32 w-full flex flex-col items-center justify-center bg-slate-50">
                            <Music className="h-8 w-8 text-blue-500" />
                            <span className="text-xs mt-2 font-medium">Audio Track</span>
                        </div>
                    )}

                    {/* Delete Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(item.id, item.file_url)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}