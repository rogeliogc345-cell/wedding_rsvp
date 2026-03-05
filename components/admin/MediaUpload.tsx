"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Image as ImageIcon, Music, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function MediaUpload({ customerId }: { customerId: string }) {
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'audio') {
        try {
            setUploading(true);
            const file = e.target.files?.[0];
            if (!file) return;

            // 1. Generate a unique file path
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${customerId}/${fileName}`;

            // 2. Upload to Supabase Storage
            const supabase = createClient();
            const { error: uploadError } = await supabase.storage
                .from('wedding-media')
                .upload(filePath, file);

            console.log(uploadError);

            if (uploadError) throw uploadError;

            // 3. Get the Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('wedding-media')
                .getPublicUrl(filePath);

            // 4. Save the "receipt" in the media table
            const { error: dbError } = await supabase
                .from('media')
                .insert([{
                    customer_id: customerId,
                    file_url: publicUrl,
                    file_type: type
                }]);

            if (dbError) throw dbError;

            router.refresh();
        } catch (error: any) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="space-y-6 border p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
                {/* Photo Upload */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg">
                    <ImageIcon className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="text-sm mb-4">Add Couple Photos</p>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUpload(e, 'image')}
                        disabled={uploading}
                        className="hidden"
                        id="photo-upload"
                    />
                    <Button asChild variant="outline">
                        <label htmlFor="photo-upload">
                            {uploading ? "Uploading..." : "Select Image"}
                        </label>
                    </Button>
                </div>

                {/* Music Upload */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg">
                    <Music className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="text-sm mb-4">Add Background Music</p>
                    <Input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => handleUpload(e, 'audio')}
                        disabled={uploading}
                        className="hidden"
                        id="music-upload"
                    />
                    <Button asChild variant="outline">
                        <label htmlFor="music-upload">Select MP3</label>
                    </Button>
                </div>
            </div>
        </div>
    );
}