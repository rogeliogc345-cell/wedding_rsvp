"use client";

import { useActionState, useEffect, startTransition } from "react";
import { uploadMediaAction, type UploadMediaState } from "@/app/(admin)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle2, Image as ImageIcon, Loader2, Music, Upload } from "lucide-react";
import { toast } from "sonner";

const initialState: UploadMediaState = {
    error: null,
    success: false,
};

function compressImage(file: File, maxWidth = 1920, maxHeight = 1920, quality = 0.82): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

                // Only resize if the image exceeds the maximum dimensions
                if (width > maxWidth || height > maxHeight) {
                    if (width > height) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    } else {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Could not get canvas 2d context"));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error("Canvas compression returned null blob"));
                        }
                    },
                    "image/jpeg",
                    quality
                );
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
}

type UploadZoneProps = {
    title: string;
    description: string;
    accept: string;
    inputId: string;
    fileType: "image" | "audio";
    customerId: string;
    pending: boolean;
    state: UploadMediaState;
    action: (payload: FormData) => void;
};

function UploadZone({
    title,
    description,
    accept,
    inputId,
    fileType,
    customerId,
    pending,
    state,
    action,
}: UploadZoneProps) {
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.currentTarget;
        const file = input.files?.[0];

        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("customerId", customerId);
        formData.append("fileType", fileType);

        if (fileType === "image") {
            try {
                // Compress the image before uploading
                const compressedBlob = await compressImage(file);
                // Convert back to a file object to keep the name and correct content-type
                const compressedFile = new File([compressedBlob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                    type: "image/jpeg",
                    lastModified: Date.now(),
                });
                formData.append("file", compressedFile);
            } catch (err) {
                console.error("Client-side image compression failed. Falling back to raw file upload.", err);
                formData.append("file", file);
            }
        } else {
            formData.append("file", file);
        }

        startTransition(() => {
            action(formData);
        });
        input.value = "";
    };

    return (
        <div className="flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg text-center">
            {fileType === "image" ? (
                <ImageIcon className="h-8 w-8 mb-2 text-muted-foreground" />
            ) : (
                <Music className="h-8 w-8 mb-2 text-muted-foreground" />
            )}
            <p className="text-sm font-medium">{title}</p>
            <p className="text-sm text-muted-foreground mt-1 mb-4">{description}</p>

            <div className="w-full space-y-3">
                <Input
                    type="file"
                    accept={accept}
                    name="file"
                    id={inputId}
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={pending}
                />
                <Button asChild variant="outline" className="w-full" disabled={pending}>
                    <label htmlFor={inputId} className="flex cursor-pointer items-center justify-center">
                        {pending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="mr-2 h-4 w-4" />
                                {fileType === "image" ? "Select Image" : "Select MP3"}
                            </>
                        )}
                    </label>
                </Button>
            </div>

            {state.error ? (
                <div className="mt-3 flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {state.error}
                </div>
            ) : null}

            {state.success && state.message ? (
                <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    {state.message}
                </div>
            ) : null}
        </div>
    );
}

export function MediaUpload({ customerId }: { customerId: string }) {
    const [imageState, imageAction, imagePending] = useActionState(
        uploadMediaAction,
        initialState
    );
    const [audioState, audioAction, audioPending] = useActionState(
        uploadMediaAction,
        initialState
    );

    useEffect(() => {
        if (imageState.success && imageState.message) {
            toast.success(imageState.message);
        }

        if (imageState.error) {
            toast.error(imageState.error);
        }
    }, [imageState]);

    useEffect(() => {
        if (audioState.success && audioState.message) {
            toast.success(audioState.message);
        }

        if (audioState.error) {
            toast.error(audioState.error);
        }
    }, [audioState]);

    return (
        <div className="space-y-6 border p-6 rounded-lg">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <UploadZone
                    title="Add Couple Photos"
                    description="Upload JPG, PNG, WEBP, or other image files"
                    accept="image/*"
                    inputId="photo-upload"
                    fileType="image"
                    customerId={customerId}
                    pending={imagePending}
                    state={imageState}
                    action={imageAction}
                />

                <UploadZone
                    title="Add Background Music"
                    description="Upload MP3 or other audio files"
                    accept="audio/*"
                    inputId="music-upload"
                    fileType="audio"
                    customerId={customerId}
                    pending={audioPending}
                    state={audioState}
                    action={audioAction}
                />
            </div>
        </div>
    );
}