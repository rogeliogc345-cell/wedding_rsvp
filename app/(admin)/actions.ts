"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";


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
                ...prevState, error: "Invalid code. Please check your invitation or contact the couple."
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