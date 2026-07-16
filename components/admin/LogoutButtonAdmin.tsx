"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";

export function LogoutButtonAdmin() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);

        const supabase = createClient();
        const { error } = await supabase.auth.signOut();

        if (!error) {
            router.replace("/admin/login");
            router.refresh();
        } else {
            console.error("Error logging out:", error.message);
        }

        setIsLoading(false);
    };

    return (
        <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            disabled={isLoading}
            className="text-stone-500 hover:text-red-600 gap-2"
        >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            {isLoading ? "Cerrando sesión..." : "Cerrar Sesión"}
        </Button>
    );
}