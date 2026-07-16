"use client";

import { useState, KeyboardEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";

// ── helpers ──────────────────────────────────────────────────────────────────

type ColorPreferenceEntry = {
    name: string;
    color: string;
};

function parseColors(raw: unknown): ColorPreferenceEntry[] {
    if (!Array.isArray(raw)) return [];

    return raw
        .map((value) => {
            if (typeof value === "string") {
                const color = normalizeHex(value);
                return { name: getColorName(color), color };
            }

            if (typeof value === "object" && value !== null) {
                const candidate = value as Record<string, unknown>;
                const color = typeof candidate.color === "string"
                    ? normalizeHex(candidate.color)
                    : typeof candidate.hex === "string"
                        ? normalizeHex(candidate.hex)
                        : "";

                if (!color) return null;

                const name = typeof candidate.name === "string" && candidate.name.trim()
                    ? candidate.name.trim()
                    : getColorName(color);

                return { name, color };
            }

            return null;
        })
        .filter((entry): entry is ColorPreferenceEntry => entry !== null);
}

function normalizeHex(hex: string): string {
    const trimmed = hex.trim();
    if (!trimmed) return "#000000";

    const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;

    if (/^#[0-9a-fA-F]{3}$/.test(withHash)) {
        const expanded = withHash.slice(1).split("").map((char) => char + char).join("");
        return `#${expanded}`.toLowerCase();
    }

    if (/^#[0-9a-fA-F]{6}$/.test(withHash)) {
        return withHash.toLowerCase();
    }

    return "#000000";
}

function hexToRgb(hex: string): [number, number, number] {
    const normalized = normalizeHex(hex);
    const r = parseInt(normalized.slice(1, 3), 16);
    const g = parseInt(normalized.slice(3, 5), 16);
    const b = parseInt(normalized.slice(5, 7), 16);
    return [r, g, b];
}

function rgbToHsl(r: number, g: number, b: number) {
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

        switch (max) {
            case red:
                h = (green - blue) / delta + (green < blue ? 6 : 0);
                break;
            case green:
                h = (blue - red) / delta + 2;
                break;
            default:
                h = (red - green) / delta + 4;
                break;
        }

        h *= 60;
    }

    return { h, s, l };
}

function getColorName(hex: string): string {
    const normalized = normalizeHex(hex);
    const [r, g, b] = hexToRgb(normalized);
    const { h, s, l } = rgbToHsl(r, g, b);

    if (s < 0.14) {
        if (l > 0.9) return "White";
        if (l < 0.1) return "Black";
        return "Gray";
    }

    if (l > 0.9) return "White";
    if (l < 0.1) return "Black";

    if (h < 15 || h >= 345) return "Red";
    if (h < 45) return "Orange";
    if (h < 75) return "Amber";
    if (h < 105) return "Yellow";
    if (h < 165) return "Green";
    if (h < 195) return "Teal";
    if (h < 255) return "Blue";
    if (h < 285) return "Indigo";
    if (h < 330) return "Violet";
    return "Pink";
}

/** Returns black or white depending on luminance so text is always readable */
function contrastText(hex: string): string {
    const [r, g, b] = hexToRgb(hex);
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
    colors: ColorPreferenceEntry[];
    onChange: (colors: ColorPreferenceEntry[]) => void;
}) {
    const [draft, setDraft] = useState("#a78bfa"); // default purple as starting point

    function add() {
        const value = normalizeHex(draft);
        if (!value) return;

        const alreadyExists = colors.some((entry) => entry.color === value);
        if (!alreadyExists) {
            onChange([...colors, { name: getColorName(value), color: value }]);
            setDraft(value);
        }
    }

    function remove(color: string) {
        onChange(colors.filter((entry) => entry.color !== color));
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
                {colors.map((entry) => {
                    const normalized = normalizeHex(entry.color);
                    const displayName = entry.name || getColorName(normalized);

                    return (
                        <span
                            key={`${displayName}-${normalized}`}
                            className="inline-flex items-center gap-1.5 pl-1 pr-2 py-0.5 rounded-full text-xs font-medium shadow-sm border border-black/10"
                            style={{
                                backgroundColor: normalized,
                                color: contrastText(normalized),
                            }}
                        >
                            {/* Swatch circle */}
                            <span
                                className="w-4 h-4 rounded-full border border-black/20 flex-shrink-0"
                                style={{ backgroundColor: normalized }}
                            />
                            <span className="flex flex-col leading-none">
                                <span className="font-semibold">{displayName}</span>
                                <span className="text-[10px] opacity-80 uppercase tracking-wide font-mono">
                                    {normalized}
                                </span>
                            </span>
                            <button
                                type="button"
                                onClick={() => remove(normalized)}
                                className="ml-0.5 hover:opacity-60 transition-opacity"
                                aria-label={`Remove ${displayName}`}
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    );
                })}
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
                <div className="flex items-center gap-2">
                    <span
                        className="w-10 h-10 rounded-lg border border-black/10 flex-shrink-0 shadow-inner"
                        style={{ backgroundColor: draft }}
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{getColorName(draft)}</span>
                        <span className="text-[11px] text-muted-foreground uppercase tracking-wide font-mono">
                            {normalizeHex(draft)}
                        </span>
                    </div>
                </div>

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
    const [suggested, setSuggested] = useState<ColorPreferenceEntry[]>(parseColors(rawPrefs.suggested));
    const [forbidden, setForbidden] = useState<ColorPreferenceEntry[]>(parseColors(rawPrefs.forbidden));

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
                .update({
                    color_preferences: {
                        suggested: suggested.map((entry) => ({ name: entry.name, color: entry.color })),
                        forbidden: forbidden.map((entry) => ({ name: entry.name, color: entry.color })),
                    },
                })
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