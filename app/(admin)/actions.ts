"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { customerSchema } from "@/lib/validation";


//----------------TYPES----------------//

export type Guest = {
    id: string;
    name: string;
    passcode: string;
    tickets_allowed: number;
    tickets_confirmed: number;
    has_responded: boolean;
    attending: boolean;
    email: string | null;
    message: string | null;
    customer_id: string;
    responded_at?: string | null;
}

export type FormState = {
    step: 'search' | 'confirm' | 'thanks';
    guest: Guest | null;
    error: string | null;
}

export type UploadMediaState = {
    error: string | null;
    success: boolean;
    message?: string;
};

export type DeleteMediaState = {
    error: string | null;
    success: boolean;
    message?: string;
};


//----------------ACTIONS----------------//
export const uploadMediaAction = async (
    prevState: UploadMediaState,
    formData: FormData
): Promise<UploadMediaState> => {
    try {
        const customerId = formData.get("customerId")?.toString().trim();
        const file = formData.get("file");
        const fileType = formData.get("fileType")?.toString();

        if (!customerId || !fileType || !file || typeof file === "string") {
            return { error: "Please select a file to upload.", success: false };
        }

        const uploadFile = file as File;

        if (!uploadFile.name || uploadFile.size === 0) {
            return { error: "The selected file is empty.", success: false };
        }

        if (fileType !== "image" && fileType !== "audio") {
            return { error: "Unsupported file type.", success: false };
        }

        const fileExt = uploadFile.name.split(".").pop()?.toLowerCase() ?? "";
        const safeFileName = `${crypto.randomUUID()}${fileExt ? `.${fileExt}` : ""}`;
        const filePath = `${customerId}/${safeFileName}`;

        const supabase = await createClient();
        const { error: uploadError } = await supabase.storage
            .from("wedding-media")
            .upload(filePath, uploadFile, {
                cacheControl: "3600",
                upsert: false,
            });

        if (uploadError) {
            console.error("Error uploading media file:", uploadError);
            return {
                error: uploadError.message || "Unable to upload the file right now.",
                success: false,
            };
        }

        const { data: { publicUrl } } = supabase.storage
            .from("wedding-media")
            .getPublicUrl(filePath);

        const { error: dbError } = await supabase.from("media").insert([
            {
                customer_id: customerId,
                file_url: publicUrl,
                file_type: fileType,
            },
        ]);

        if (dbError) {
            console.error("Error saving media metadata:", dbError);
            return {
                error: dbError.message || "The file was uploaded but could not be saved.",
                success: false,
            };
        }

        revalidatePath(`/dashboard/edit/${customerId}`);

        return {
            error: null,
            success: true,
            message: `${fileType === "image" ? "Image" : "Audio"} uploaded successfully.`,
        };
    } catch (error: unknown) {
        console.error("Unexpected error uploading media:", error);
        const message = error instanceof Error ? error.message : "An unexpected error occurred while uploading the file.";
        return {
            error: message,
            success: false,
        };
    }
};

export const deleteMediaAction = async (
    customerId: string,
    mediaId: string,
    mediaUrl: string
): Promise<DeleteMediaState> => {
    console.log('calling deleteMediaAction', { customerId, mediaId, mediaUrl });
    try {
        if (!customerId || !mediaId || !mediaUrl) {
            return { error: "Missing media selection.", success: false };
        }

        const supabase = await createClient();
        const storagePath = decodeURIComponent(new URL(mediaUrl).pathname)
            .replace(/^\/storage\/v1\/object\/public\/wedding-media\//, "");

        console.log("storagePath:", storagePath);

        if (!storagePath) {
            return { error: "Unable to determine the file path for deletion.", success: false };
        }

        // 1. Check if the file exists in the public bucket using a HEAD request
        let fileExists = false;
        try {
            const headRes = await fetch(mediaUrl, { method: "HEAD" });
            fileExists = headRes.status === 200;
            console.log(`HEAD check for ${mediaUrl}: status ${headRes.status}, exists: ${fileExists}`);
        } catch (fetchError) {
            console.warn("Failed to check file existence via HEAD request, assuming it might exist:", fetchError);
            // Default to true to attempt deletion anyway
            fileExists = true;
        }

        // 2. Only attempt to remove the file from storage if it exists in the bucket
        if (fileExists) {
            const { data, error: storageError } = await supabase.storage
                .from("wedding-media")
                .remove([storagePath]);

            console.log("Supabase storage remove response:", { data, storageError });

            if (storageError) {
                console.warn("Storage deletion error/warning:", storageError);
            }

            if (!data || data.length === 0) {
                console.warn("Storage file was not returned in remove response (may already be deleted or RLS restricted). Proceeding to delete DB record.");
            }
        } else {
            console.log("File is already missing from storage bucket. Proceeding to delete database record.");
        }

        // 3. Delete the record from the database
        const { error: dbError } = await supabase
            .from("media")
            .delete()
            .eq("id", mediaId);

        if (dbError) {
            console.error("Error deleting media record:", dbError);
            return {
                error: dbError.message || "The media record could not be deleted.",
                success: false,
            };
        }

        revalidatePath(`/dashboard/edit/${customerId}`);

        return {
            error: null,
            success: true,
            message: "File removed successfully.",
        };
    } catch (error: unknown) {
        console.error("Unexpected error deleting media:", error);
        const message = error instanceof Error ? error.message : "An unexpected error occurred while deleting the file.";
        return {
            error: message,
            success: false,
        };
    }
};

export const findGuestByPasscode = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    try {
        const passcode = formData.get("passcode")?.toString().toUpperCase().trim();
        const customerId = formData.get('customerId')?.toString();

        if (!passcode || !customerId) {
            return {
                ...prevState, error: "Passcode and Customer ID are required."
            }
        }

        const supabase = await createClient();
        const { data: guest, error } = await supabase
            .from("guests")
            .select("*")
            .eq("passcode", passcode)
            .eq("customer_id", customerId)
            .single();





        if (error || !guest) {
            return {
                ...prevState, error: "Codigo Invalido. Checa tu invitación y vuelve a intentarlo."
            }
        }



        if (guest.has_responded) {
            return {
                step: 'thanks',
                guest,
                error: null
            }
        }



        return {
            step: 'confirm',
            guest,
            error: null,
        }
    }

    catch (error) {
        console.error("Error finding guest:", error);
        return {
            ...prevState, error: "An unexpected error occurred. Please try again later."
        }

    }

}




export const confirmRSVPAction = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    console.log('calling RSVP')
    try {

        const guestId = formData.get("guestId")?.toString();
        const tickets_confirmed = parseInt(formData.get("tickets_confirmed") as string);
        const email = formData.get("email")?.toString() || null;
        const message = formData.get("message")?.toString() || null;

        if (!guestId) {
            return {
                ...prevState, error: "Guest ID is required."
            }
        }

        const supabase = await createClient();
        const { error } = await supabase
            .from("guests")
            .update({
                tickets_confirmed,
                has_responded: true,
                attending: tickets_confirmed > 0,
                email,
                message,
                responded_at: new Date().toISOString(),
            })
            .eq("id", guestId);

        console.log("RSVP confirmed:", { guestId, tickets_confirmed, email, message });

        if (error) {
            console.error("Error confirming RSVP:", error);
            return {
                ...prevState, error: "Failed to confirm RSVP. Please try again."
            }
        }

        // Fetch the updated guest record so we can return it to the client
        const { data: updatedGuest, error: fetchError } = await supabase
            .from("guests")
            .select("*")
            .eq("id", guestId)
            .single();

        if (fetchError || !updatedGuest) {
            console.error("Error fetching updated guest:", fetchError);
            // Still return thanks state but without guest details
            revalidatePath(`/invite/${prevState.guest?.customer_id}`);
            return {
                ...prevState,
                step: 'thanks',
                guest: null,
                error: null,
            }
        }

        // Revalidate invite page using the customer_id from the updated guest
        revalidatePath(`/invite/${updatedGuest.customer_id}`);

        return {
            ...prevState,
            step: 'thanks',
            guest: {
                ...updatedGuest,
            },
            error: null,
        }




    } catch (error) {
        console.error("Error confirming RSVP:", error);
        return {
            ...prevState, error: "An unexpected error occurred while confirming RSVP. Please try again later."
        }

    }

}


export const callingHelloWorldAction = async (prevState: unknown, formData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(formData);

    return { success: true, message: "saved correctly" }
}






//used in the admin guest list component 
export const getGuestsByCustomerId = async (customerId: string): Promise<Guest[]> => {
    try {
        const supabase = await createClient();
        const { data: guests, error } = await supabase
            .from("guests")
            .select("*")
            .eq("customer_id", customerId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching guests:", error);
            return [];
        }

        return guests || [];
    } catch (error) {
        console.error("Error in getGuestsByCustomerId:", error);
        return [];
    }
};

export const getCustomers = async () => {
    try {
        const supabase = await createClient();
        const { data: customers, error } = await supabase
            .from("customers")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching customers:", error);
            return null;
        }

        return (customers || []).map(c => ({ ...c, template: c.template_id }));
    } catch (error) {
        console.error("Error in getCustomers:", error);
        return null;
    }
};

export type AddGuestState = {
    error: string | null;
    success: boolean;
    guestName?: string;
};

export type UpdateGuestState = {
    error: string | null;
    success: boolean;
};

export const updateGuestAction = async (prevState: UpdateGuestState, formData: FormData): Promise<UpdateGuestState> => {
    try {
        const guestId = formData.get("guestId")?.toString();
        const customerId = formData.get("customerId")?.toString();
        const ticketsAllowed = parseInt(formData.get("ticketsAllowed")?.toString() || "1", 10);

        if (!guestId || !customerId) {
            return { error: "Guest ID and customer ID are required.", success: false };
        }

        if (Number.isNaN(ticketsAllowed) || ticketsAllowed < 1) {
            return { error: "Tickets allowed must be at least 1.", success: false };
        }

        const supabase = await createClient();
        const { error } = await supabase
            .from("guests")
            .update({ tickets_allowed: ticketsAllowed })
            .eq("id", guestId);

        if (error) {
            console.error("Error updating guest tickets_allowed:", error);
            return { error: "Unable to update guest tickets.", success: false };
        }

        revalidatePath(`/dashboard/edit/${customerId}`);

        return { error: null, success: true };
    } catch (err) {
        console.error("Exception in updateGuestAction:", err);
        return { error: "An unexpected error occurred. Please try again.", success: false };
    }
};

export const addGuestAction = async (prevState: AddGuestState, formData: FormData): Promise<AddGuestState> => {
    try {
        const customerId = formData.get("customerId")?.toString();
        const name = formData.get("name")?.toString();
        const ticketsAllowed = parseInt(formData.get("ticketsAllowed")?.toString() || "2", 10);
        const passcode = formData.get("passcode")?.toString()?.toUpperCase();

        if (!customerId || !name || !passcode) {
            return { error: "Missing required fields.", success: false };
        }

        const supabase = await createClient();
        const { error } = await supabase.from("guests").insert([
            {
                customer_id: customerId,
                name,
                tickets_allowed: ticketsAllowed,
                passcode,
                has_responded: false,
                attending: false,
            },
        ]);

        if (error) {
            console.error("Error adding guest:", error);
            return { error: "That passcode or name might already be in use.", success: false };
        }

        revalidatePath(`/dashboard/edit/${customerId}`);

        return { error: null, success: true, guestName: name };

    } catch (err) {
        console.error("Exception in addGuestAction:", err);
        return { error: "An unexpected error occurred. Please try again.", success: false };
    }
};

export type CreateCustomerState = {
    error: string | null;
    success: boolean;
    fieldErrors?: Partial<Record<string, string[]>>;
};

export const CreateCustomerEventAction = async (
    prevState: CreateCustomerState,
    formData: FormData
): Promise<CreateCustomerState> => {
    const raw = {
        couple_name: formData.get("couple_name")?.toString() ?? "",
        slug: formData.get("slug")?.toString() ?? "",
        template: formData.get("template")?.toString() ?? "classic",
        event_date: formData.get("event_date")?.toString() ?? "",
        category: formData.get("category")?.toString() ?? "wedding",
        about_me: formData.get("about_me")?.toString() ?? "",
    };

    const parsed = customerSchema.safeParse(raw);

    if (!parsed.success) {
        return {
            error: "Please fix the errors below.",
            success: false,
            fieldErrors: parsed.error.flatten().fieldErrors,
        };
    }

    try {
        const supabase = await createClient();
        const user = (await supabase.auth.getUser()).data.user;

        if (!user) {
            return { error: "User not authenticated.", success: false };
        }

        const { template, ...dataToInsert } = parsed.data;

        const { error } = await supabase
            .from("customers")
            .insert([{ ...dataToInsert, template_id: template, user_id: user.id }]);

        if (error) {
            console.error("Error creating customer:", error.message);
            return { error: error.message, success: false };
        }

        revalidatePath("/dashboard");
        return { error: null, success: true };
    } catch (err: unknown) {
        console.error("Exception in CreateCustomerEventAction:", err);
        const message = err instanceof Error ? err.message : "An unexpected error occurred.";
        return { error: message, success: false };
    }
};

// ── Edit / update customer ──────────────────────────────────────────────────
export type UpdateCustomerState = {
    error: string | null;
    success: boolean;
    fieldErrors?: Partial<Record<string, string[]>>;
};

export const UpdateCustomerAction = async (
    customerId: string,
    prevState: UpdateCustomerState,
    formData: FormData
): Promise<UpdateCustomerState> => {
    const raw = {
        couple_name: formData.get("couple_name")?.toString() ?? "",
        slug: formData.get("slug")?.toString() ?? "",
        is_published: formData.get("is_published") === "true",
        template: formData.get("template")?.toString() ?? "classic",
        event_date: formData.get("event_date")?.toString() ?? "",
        category: formData.get("category")?.toString() ?? "wedding",
        about_me: formData.get("about_me")?.toString() ?? "",
    };

    const { editCustomerSchema } = await import("@/lib/validation");
    const parsed = editCustomerSchema.safeParse(raw);

    if (!parsed.success) {
        return {
            error: "Please fix the errors below.",
            success: false,
            fieldErrors: parsed.error.flatten().fieldErrors,
        };
    }

    try {
        const supabase = await createClient();
        const { template, ...dataToUpdate } = parsed.data;

        const { error } = await supabase
            .from("customers")
            .update({ ...dataToUpdate, template_id: template })
            .eq("id", customerId);

        if (error) {
            console.error("Error updating customer:", error.message);
            return { error: error.message, success: false };
        }

        revalidatePath("/dashboard");
        revalidatePath(`/dashboard/edit/${customerId}`);
        return { error: null, success: true };
    } catch (err: unknown) {
        console.error("Exception in UpdateCustomerAction:", err);
        const message = err instanceof Error ? err.message : "An unexpected error occurred.";
        return { error: message, success: false };
    }
};

// ── Event Management ────────────────────────────────────────────────────────
export type EventActionState = {
    error: string | null;
    success: boolean;
};

export const addEventAction = async (
    customerId: string,
    prevState: EventActionState,
    formData: FormData
): Promise<EventActionState> => {
    try {
        const event_name = formData.get("event_name")?.toString();
        const event_date = formData.get("event_date")?.toString();
        const event_time = formData.get("event_time")?.toString();
        const location_name = formData.get("location_name")?.toString();
        const icon = formData.get("icon")?.toString() || "PartyPopper";
        const address = formData.get("address")?.toString() || null;
        const google_maps_url = formData.get("google_maps_url")?.toString() || null;

        if (!event_name || !event_date || !event_time || !location_name) {
            return { error: "All fields are required.", success: false };
        }

        const supabase = await createClient();
        const { error } = await supabase
            .from("events")
            .insert([{
                event_name,
                event_date,
                event_time,
                location_name,
                customer_id: customerId,
                icon,
                address,
                google_maps_url
            }]);

        if (error) {
            console.error("Error adding event:", error);
            return { error: "Failed to add event. Please try again.", success: false };
        }

        revalidatePath(`/dashboard/edit/${customerId}`);
        return { error: null, success: true };
    } catch (err: unknown) {
        console.error("Exception in addEventAction:", err);
        return { error: "An unexpected error occurred. Please try again.", success: false };
    }
};

export const deleteEventAction = async (
    customerId: string,
    eventId: string
): Promise<EventActionState> => {
    try {
        const supabase = await createClient();
        const { error } = await supabase
            .from("events")
            .delete()
            .eq("id", eventId);

        if (error) {
            console.error("Error deleting event:", error);
            return { error: "Failed to delete event. Please try again.", success: false };
        }

        revalidatePath(`/dashboard/edit/${customerId}`);
        return { error: null, success: true };
    } catch (err: unknown) {
        console.error("Exception in deleteEventAction:", err);
        return { error: "An unexpected error occurred. Please try again.", success: false };
    }
};

export const getInvitationBySlug = async (slug: string) => {
    try {
        const supabase = await createClient();
        const { data: customer, error } = await supabase
            .from("customers")
            .select("*, events(*), media(*)")
            .eq("slug", slug)
            .single();

        if (error) {
            console.error("Error fetching invitation by slug:", error);
            return null;
        }

        return customer;
    } catch (error) {
        console.error("Unexpected error in getInvitationBySlug:", error);
        return null;
    }
};