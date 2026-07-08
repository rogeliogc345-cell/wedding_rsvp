import React from "react";
import {
  Church,
  PartyPopper,
  Music,
  Utensils,
  GlassWater,
  Crown,
  Heart,
  Camera,
  Sparkles,
  Ribbon,
  Gift,
} from "lucide-react";

export const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Church,
  PartyPopper,
  Music,
  Utensils,
  GlassWater,
  Crown,
  Heart,
  Camera,
  Sparkles,
  Ribbon,
  Gift,
};

export function getEventIcon(iconName?: string) {
  if (!iconName) return PartyPopper;
  
  // Normalize key
  const normalized = iconName.trim().toLowerCase();
  
  // Direct map check
  const keys = Object.keys(ICON_MAP);
  const matchedKey = keys.find(k => k.toLowerCase() === normalized);
  if (matchedKey) {
    return ICON_MAP[matchedKey];
  }
  
  // Fallbacks based on common keywords
  if (
    normalized.includes('church') || 
    normalized.includes('misa') || 
    normalized.includes('ceremonia') || 
    normalized.includes('ceremony') || 
    normalized.includes('religiosa') ||
    normalized.includes('templo') ||
    normalized.includes('parroquia')
  ) {
    return Church;
  }
  
  if (
    normalized.includes('party') || 
    normalized.includes('recepcion') || 
    normalized.includes('reception') || 
    normalized.includes('fiesta') || 
    normalized.includes('celebracion') ||
    normalized.includes('salon')
  ) {
    return PartyPopper;
  }
  
  if (
    normalized.includes('music') || 
    normalized.includes('dance') || 
    normalized.includes('baile') || 
    normalized.includes('vals') || 
    normalized.includes('dj') ||
    normalized.includes('pista')
  ) {
    return Music;
  }
  
  if (
    normalized.includes('food') || 
    normalized.includes('dinner') || 
    normalized.includes('cena') || 
    normalized.includes('comida') || 
    normalized.includes('banquete') ||
    normalized.includes('platillo')
  ) {
    return Utensils;
  }
  
  if (
    normalized.includes('toast') || 
    normalized.includes('brindis') || 
    normalized.includes('copa') || 
    normalized.includes('bebida') ||
    normalized.includes('coctel')
  ) {
    return GlassWater;
  }
  
  if (
    normalized.includes('crown') || 
    normalized.includes('corona') || 
    normalized.includes('quince') ||
    normalized.includes('presentacion')
  ) {
    return Crown;
  }

  if (
    normalized.includes('gift') || 
    normalized.includes('regalo') || 
    normalized.includes('sobres')
  ) {
    return Gift;
  }

  return PartyPopper;
}
