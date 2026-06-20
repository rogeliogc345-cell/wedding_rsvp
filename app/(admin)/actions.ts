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



//----------------ACTIONS----------------//
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


        revalidatePath(`/invite/${prevState.guest?.customer_id}`); // Revalidate the invite page to reflect changes


        return {
            ...prevState,
            step: 'thanks',
            guest: prevState.guest ? { ...prevState.guest, tickets_confirmed, has_responded: true, attending: tickets_confirmed > 0, email, message, responded_at: new Date().toISOString() } : null,
            error: null,
        }




    } catch (error) {
        console.error("Error confirming RSVP:", error);
        return {
            ...prevState, error: "An unexpected error occurred while confirming RSVP. Please try again later."
        }

    }

}


export const callingHelloWorldAction = async (prevState: any, formData: FormData) => {
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

        return customers || [];
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
        template_id: formData.get("template_id")?.toString() ?? "classic",
        event_date: formData.get("event_date")?.toString() ?? "",
        category: formData.get("category")?.toString() ?? "wedding",
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

        const { error } = await supabase
            .from("customers")
            .insert([{ ...parsed.data, user_id: user.id }]);

        if (error) {
            console.error("Error creating customer:", error.message);
            return { error: error.message, success: false };
        }

        revalidatePath("/dashboard");
        return { error: null, success: true };
    } catch (err: any) {
        console.error("Exception in CreateCustomerEventAction:", err);
        return { error: err.message || "An unexpected error occurred.", success: false };
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
        event_date: formData.get("event_date")?.toString() ?? "",
        category: formData.get("category")?.toString() ?? "wedding",
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
        const { error } = await supabase
            .from("customers")
            .update(parsed.data)
            .eq("id", customerId);

        if (error) {
            console.error("Error updating customer:", error.message);
            return { error: error.message, success: false };
        }

        revalidatePath("/dashboard");
        revalidatePath(`/dashboard/edit/${customerId}`);
        return { error: null, success: true };
    } catch (err: any) {
        console.error("Exception in UpdateCustomerAction:", err);
        return { error: err.message || "An unexpected error occurred.", success: false };
    }
};