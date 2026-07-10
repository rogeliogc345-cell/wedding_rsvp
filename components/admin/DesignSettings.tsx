"use client";

import { useState, KeyboardEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";

// ── helpers ──────────────────────────────────────────────────────────────────

function parseColors(raw: unknown): string[] {
    if (Array.isArray(raw)) return raw.filter((v) => typeof v === "string");
    return [];
}

/** Returns black or white depending on luminance so text is always readable */
function contrastText(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    // Perceived luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55 ? "#111111" : "#ffffff";
}

// ── Color Tag Input ───────────────────────────────────────────────────────────

function ColorTagInput({
    label,
    description,
    colors,
    onChange,
}: {
    label: string;
    description: string;
    colors: string[];
    onChange: (colors: string[]) => void;
}) {
    const [draft, setDraft] = useState("#a78bfa"); // default purple as starting point

    function add() {
        const value = draft.trim().toLowerCase();
        if (value && !colors.includes(value)) {
            onChange([...colors, value]);
        }
    }

    function remove(color: string) {
        onChange(colors.filter((c) => c !== color));
    }

    return (
        <div className="space-y-3">
            <div>
                <Label className="text-sm font-medium">{label}</Label>
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            </div>

            {/* Existing color swatches */}
            <div className="flex flex-wrap gap-2 min-h-[36px]">
                {colors.length === 0 && (
                    <span className="text-xs text-muted-foreground italic self-center">
                        No colors added yet.
                    </span>
                )}
                {colors.map((color) => (
                    <span
                        key={color}
                        className="inline-flex items-center gap-1.5 pl-1 pr-2 py-0.5 rounded-full text-xs font-mono font-medium shadow-sm border border-black/10"
                        style={{
                            backgroundColor: color,
                            color: contrastText(color),
                        }}
                    >
                        {/* Swatch circle */}
                        <span
                            className="w-4 h-4 rounded-full border border-black/20 flex-shrink-0"
                            style={{ backgroundColor: color }}
                        />
                        {color}
                        <button
                            type="button"
                            onClick={() => remove(color)}
                            className="ml-0.5 hover:opacity-60 transition-opacity"
                            aria-label={`Remove ${color}`}
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
            </div>

            {/* Picker row */}
            <div className="flex items-center gap-3">
                {/* Native color wheel */}
                <div className="relative flex-shrink-0">
                    <Input
                        type="color"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        className="w-12 h-12 p-1 rounded-xl cursor-pointer border-2 border-border"
                        title="Pick a color"
                    />
                </div>

                {/* Hex text field – stays in sync */}
                <Input
                    type="text"
                    value={draft}
                    onChange={(e) => {
                        const v = e.target.value;
                        // Allow typing; only sync the picker once it's a valid 7-char hex
                        setDraft(v);
                    }}
                    onBlur={(e) => {
                        // Normalize: ensure it starts with #
                        let v = e.target.value.trim();
                        if (!v.startsWith("#")) v = "#" + v;
                        if (/^#[0-9a-fA-F]{6}$/.test(v)) setDraft(v.toLowerCase());
                    }}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") { e.preventDefault(); add(); }
                    }}
                    placeholder="#a78bfa"
                    className="font-mono w-36"
                />

                {/* Preview swatch */}
                <span
                    className="w-10 h-10 rounded-lg border border-black/10 flex-shrink-0 shadow-inner"
                    style={{ backgroundColor: draft }}
                />

                <Button
                    type="button"
                    variant="outline"
                    onClick={add}
                    className="gap-1.5"
                >
                    <Plus className="w-4 h-4" />
                    Add
                </Button>
            </div>
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────

export function DesignSettings({ customer }: { customer: any }) {

    // template_config: primary color, font, etc.
    const [config, setConfig] = useState(
        customer.template_config || { primary_color: "#000000", font_family: "serif" }
    );

    // color_preferences: { suggested: string[], forbidden: string[] }
    const rawPrefs = customer.color_preferences ?? {};
    const [suggested, setSuggested] = useState<string[]>(parseColors(rawPrefs.suggested));
    const [forbidden, setForbidden] = useState<string[]>(parseColors(rawPrefs.forbidden));

    const [isSaving, setIsSaving] = useState(false);

    async function handleSave() {
        setIsSaving(true);
        const supabase = createClient();

        const [configResult, colorResult] = await Promise.all([
            supabase
                .from("customers")
                .update({ template_config: config })
                .eq("id", customer.id),
            supabase
                .from("customers")
                .update({ color_preferences: { suggested, forbidden } })
                .eq("id", customer.id),
        ]);

        setIsSaving(false);

        if (configResult.error || colorResult.error) {
            toast.error("Error", {
                description: configResult.error?.message ?? colorResult.error?.message,
            });
        } else {
            toast.success("Saved!", { description: "Design settings updated." });
        }
    }

    return (
        <div className="space-y-8 border p-6 rounded-lg">

            {/* ── Brand / Template Config ── */}
            <div className="space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Template Config
                </h3>

                <div className="space-y-2">
                    <Label>Primary Brand Color</Label>
                    <div className="flex items-center gap-3">
                        <Input
                            type="color"
                            className="w-12 h-12 p-1 rounded-xl cursor-pointer border-2 border-border"
                            value={config.primary_color}
                            onChange={(e) =>
                                setConfig({ ...config, primary_color: e.target.value })
                            }
                        />
                        <Input
                            value={config.primary_color}
                            onChange={(e) =>
                                setConfig({ ...config, primary_color: e.target.value })
                            }
                            className="font-mono w-36"
                        />
                        <span
                            className="w-10 h-10 rounded-lg border border-black/10 shadow-inner flex-shrink-0"
                            style={{ backgroundColor: config.primary_color }}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Font Style</Label>
                    <select
                        className="w-full border p-2 rounded"
                        value={config.font_family}
                        onChange={(e) =>
                            setConfig({ ...config, font_family: e.target.value })
                        }
                    >
                        <option value="serif">Classic Serif</option>
                        <option value="sans">Modern Sans</option>
                        <option value="mono">Elegant Mono</option>
                    </select>
                </div>
            </div>

            <hr />

            {/* ── Color Preferences ── */}
            <div className="space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Dress-Code Color Preferences
                </h3>

                <ColorTagInput
                    label="✅ Suggested Colors"
                    description="Colors guests are encouraged to wear. Pick a color and press Add."
                    colors={suggested}
                    onChange={setSuggested}
                />

                <ColorTagInput
                    label="🚫 Forbidden Colors"
                    description="Colors reserved for the quinceañera / couple. Pick a color and press Add."
                    colors={forbidden}
                    onChange={setForbidden}
                />
            </div>

            <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
                {isSaving ? "Saving…" : "Save Design"}
            </Button>
        </div>
    );
}