"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteMediaAction } from "@/app/(admin)/actions";
import { Button } from "@/components/ui/button";
import { Loader2, Music, Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface MediaItem {
    id: string;
    file_url: string;
    file_type: "image" | "audio";
}

export function MediaGallery({ media, customerId }: { media: MediaItem[]; customerId: string }) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    async function handleDelete(id: string, url: string) {
        setDeletingId(id);

        startTransition(async () => {
            const result = await deleteMediaAction(customerId, id, url);

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(result.message || "File removed successfully.");
                router.refresh();
            }

            setDeletingId(null);
        });
    }

    if (!media || media.length === 0) {
        return <p className="text-center text-muted-foreground py-10">No files uploaded yet.</p>;
    }

    const audioItems = media.filter((item) => item.file_type === "audio");
    const imageItems = media.filter((item) => item.file_type === "image");

    return (
        <div className="space-y-8 mt-8">
            {/* Audio Section */}
            {audioItems.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                        <Music className="h-5 w-5 text-purple-600" />
                        Background Songs / Audio Tracks
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        {audioItems.map((item, index) => {
                            const isDeleting = deletingId === item.id && isPending;

                            return (
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border rounded-xl bg-card shadow-sm"
                                >
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <div className="p-3 bg-purple-100 dark:bg-purple-950 text-purple-600 rounded-lg">
                                            <Music className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">Audio Track #{index + 1}</p>
                                            <p className="text-xs text-muted-foreground truncate max-w-xs sm:max-w-sm">
                                                {item.file_url.split("/").pop()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                        <audio controls src={item.file_url} className="h-9 w-48 sm:w-64" />
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(item.id, item.file_url)}
                                            disabled={isDeleting}
                                            className="flex items-center gap-1 shrink-0"
                                        >
                                            {isDeleting ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <Trash2 className="h-4 w-4" />
                                                    <span>Delete</span>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Images Section */}
            {imageItems.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                        <ImageIcon className="h-5 w-5 text-blue-600" />
                        Photo Gallery
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {imageItems.map((item) => {
                            const isDeleting = deletingId === item.id && isPending;

                            return (
                                <div key={item.id} className="relative group border rounded-xl overflow-hidden bg-card shadow-sm">
                                    <Image
                                        src={item.file_url}
                                        alt="Uploaded"
                                        width={400}
                                        height={160}
                                        className="h-36 w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(item.id, item.file_url)}
                                            disabled={isDeleting}
                                        >
                                            {isDeleting ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}