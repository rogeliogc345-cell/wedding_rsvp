"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButtonAdmin() {
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = await createClient();
        const { error } = await supabase.auth.signOut();

        if (!error) {
            // Clear local state and push to login
            router.push("/auth/login");
            router.refresh(); // Ensures the server knows the session is gone
        } else {
            console.error("Error logging out:", error.message);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-stone-500 hover:text-red-600 gap-2"
        >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
        </Button>
    );
}