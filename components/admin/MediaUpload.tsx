"use client";

import { useActionState, useEffect } from "react";
import { uploadMediaAction, type UploadMediaState } from "@/app/(admin)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle2, Image as ImageIcon, Loader2, Music, Upload } from "lucide-react";
import { toast } from "sonner";

const initialState: UploadMediaState = {
    error: null,
    success: false,
};

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
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        event.currentTarget.form?.requestSubmit();
        event.currentTarget.value = "";
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

            <form action={action} className="w-full space-y-3">
                <input type="hidden" name="customerId" value={customerId} />
                <input type="hidden" name="fileType" value={fileType} />
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
            </form>

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