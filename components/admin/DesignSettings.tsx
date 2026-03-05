"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DesignSettings({ customer }: { customer: any }) {

    // Initialize state with existing JSONB data or defaults
    const [config, setConfig] = useState(customer.template_config || {
        primary_color: "#000000",
        font_family: "serif"
    });

    async function handleSave() {
        const supabase = createClient();
        const { error } = await supabase
            .from("customers")
            .update({ template_config: config })
            .eq("id", customer.id);

        if (error) {
            toast.error("Error", { description: error.message });
        } else {
            toast.success("Success", { description: "Design updated!" });
        }
    }

    return (
        <div className="space-y-6 border p-6 rounded-lg">
            <div className="space-y-2">
                <Label>Primary Brand Color</Label>
                <div className="flex gap-4">
                    <Input
                        type="color"
                        className="w-20 h-10"
                        value={config.primary_color}
                        onChange={(e) => setConfig({ ...config, primary_color: e.target.value })}
                    />
                    <Input
                        value={config.primary_color}
                        onChange={(e) => setConfig({ ...config, primary_color: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Font Style</Label>
                <select
                    className="w-full border p-2 rounded"
                    value={config.font_family}
                    onChange={(e) => setConfig({ ...config, font_family: e.target.value })}
                >
                    <option value="serif">Classic Serif</option>
                    <option value="sans">Modern Sans</option>
                    <option value="mono">Elegant Mono</option>
                </select>
            </div>

            <Button onClick={handleSave}>Save Design</Button>
        </div>
    );
}