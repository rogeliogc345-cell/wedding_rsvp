"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  Landmark,
  MailOpen,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Heart,
  DollarSign
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Interface definitions
export interface BankDetails {
  bankName: string;
  holder: string;
  clabe: string;
  accountNumber?: string;
  whatsappMessage?: string; // Optional custom message for whatsapp notification
}

export interface RegistryStore {
  name: string;
  url: string;
  logoType?: "liverpool" | "palacio" | "amazon" | "other";
}

interface MesaDeRegalosProps {
  bankDetails?: BankDetails;
  registryStores?: RegistryStore[];
  hasEnvelopeShower?: boolean;
  theme?: "classic" | "classicBlue" | "modern";
  primaryColor?: string; // Custom color (hex, oklch, hsl, etc.) to override the theme default
  festejadaName?: string; // Optional: name of the quinceañera or couple
}

// Default values for showcase/fallbacks
const DEFAULT_BANK_DETAILS: BankDetails = {
  bankName: "BBVA México",
  holder: "Sagia Mahanaim Díaz Aguilar",
  clabe: "012345678901234567",
  accountNumber: "0123 4567 8901",
};

const DEFAULT_REGISTRY_STORES: RegistryStore[] = [
  {
    name: "Liverpool",
    url: "https://mesaderegalos.liverpool.com.mx/",
    logoType: "liverpool"
  },
  {
    name: "Amazon",
    url: "https://www.amazon.com.mx/baby-reg/",
    logoType: "amazon"
  }
];

export default function MesaDeRegalos({
  bankDetails = DEFAULT_BANK_DETAILS,
  registryStores = DEFAULT_REGISTRY_STORES,
  hasEnvelopeShower = true,
  theme = "classic",
  primaryColor: primaryColorProp,
  festejadaName,
}: MesaDeRegalosProps) {
  const [showBankModal, setShowBankModal] = useState(false);
  const [showEnvelopeModal, setShowEnvelopeModal] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Theme settings
  const isDark = theme === "modern" || theme === "classicBlue";

  let bgClass = "bg-stone-50/50 text-stone-900";
  let cardClass = "bg-white border-stone-200 text-stone-900 hover:shadow-xl hover:border-rose-200";
  let titleClass = "text-stone-900";
  let subtitleClass = "text-stone-600";
  // Default colors per theme — modern uses oklch(0.85 0.21 128) to match the theme-xv-green design system
  let primaryColor = primaryColorProp || (theme === "classic" ? "#db2777" : theme === "classicBlue" ? "#38bdf8" : "oklch(0.85 0.21 128)");

  if (theme === "classicBlue") {
    bgClass = "bg-[#0a1628]/40 text-slate-100";
    cardClass = "bg-[#10223b]/90 border-blue-500/20 text-slate-100 hover:shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:border-blue-400/40";
    titleClass = "text-white";
    subtitleClass = "text-slate-400";
  } else if (theme === "modern") {
    bgClass = "bg-black text-zinc-50";
    cardClass = "bg-black/50 border-zinc-800 text-zinc-50 hover:shadow-[0_0_15px_rgba(125,223,100,0.15)] hover:border-lime-400/40";
    titleClass = "text-zinc-50";
    subtitleClass = "text-zinc-400";
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section className={cn("relative py-24 px-6 md:px-12 w-full transition-colors duration-300", bgClass)}>
      {/* Decorative Blur Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-full mb-4 bg-muted/20 border border-muted-foreground/10">
            <Gift className="w-8 h-8" style={{ color: primaryColor }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-wide font-savoir mb-4" style={{ color: primaryColor }}>
            Mesa de Regalos
          </h2>
          <div className="h-[2px] w-24 mx-auto mb-6 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" style={{ color: primaryColor }} />
          <p className={cn("text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed", subtitleClass)}>
            Tu presencia es nuestro mayor regalo. Pero si deseas hacernos un detalle, te dejamos las siguientes opciones para facilitarte el proceso:
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

          {/* Card 1: Bank Transfer */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={cn("flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 shadow-sm cursor-pointer", cardClass)}
            onClick={() => setShowBankModal(true)}
          >
            <div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-rose-500/10 text-rose-500">
                <Landmark className="w-7 h-7" style={{ color: primaryColor }} />
              </div>
              <h3 className="text-xl font-medium mb-3">Transferencia</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Realiza una transferencia bancaria de forma rápida y segura desde tu aplicación de banca móvil.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between text-sm font-medium" style={{ color: primaryColor }}>
              <span>Ver datos bancarios</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Card 2: Lluvia de Sobres */}
          {hasEnvelopeShower && (
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={cn("flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 shadow-sm cursor-pointer", cardClass)}
              onClick={() => setShowEnvelopeModal(true)}
            >
              <div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-purple-500/10 text-purple-500">
                  <MailOpen className="w-7 h-7" style={{ color: primaryColor }} />
                </div>
                <h3 className="text-xl font-medium mb-3">Lluvia de Sobres</h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  Si prefieres obsequiarnos efectivo, contaremos con un cofre o urna especial en la recepción el día del evento.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between text-sm font-medium" style={{ color: primaryColor }}>
                <span>Saber más</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          )}

          {/* Card 3: Registry Stores (Liverpool/Amazon) */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={cn("flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 shadow-sm", cardClass)}
          >
            <div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-pink-500/10 text-pink-500">
                <Gift className="w-7 h-7" style={{ color: primaryColor }} />
              </div>
              <h3 className="text-xl font-medium mb-3">Mesa de Regalos</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-6">
                Hemos seleccionado algunas opciones en nuestras tiendas departamentales favoritas para que elijas tu obsequio.
              </p>

              {/* Store buttons */}
              <div className="space-y-3">
                {registryStores.map((store, i) => (
                  <a
                    key={i}
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-all border border-muted-foreground/10 text-sm font-medium group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                      {store.name}
                    </span>
                    <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs opacity-60">
              <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
              <span>¡Muchas gracias!</span>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Dialog for Bank Details */}
      <Dialog open={showBankModal} onOpenChange={setShowBankModal}>
        <DialogContent className={cn("max-w-md border", isDark ? "bg-[#0e1e33] border-blue-500/20 text-white" : "bg-white border-stone-200 text-stone-900")}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-light font-savoir tracking-wide" style={{ color: primaryColor }}>
              Datos de Transferencia
            </DialogTitle>
            <DialogDescription className={isDark ? "text-slate-400" : "text-stone-500"}>
              Información de la cuenta para realizar transferencias.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-6">

            {/* Bank Name */}
            <div className={cn("rounded-xl p-4 border flex items-center justify-between", isDark ? "bg-[#142844] border-blue-500/10" : "bg-stone-50 border-stone-100")}>
              <div>
                <p className="text-xs opacity-60 uppercase tracking-wider font-semibold mb-1">Banco</p>
                <p className="font-semibold text-base">{bankDetails.bankName}</p>
              </div>
              <Landmark className="w-5 h-5 opacity-40" />
            </div>

            {/* Holder Name */}
            <div className={cn("rounded-xl p-4 border", isDark ? "bg-[#142844] border-blue-500/10" : "bg-stone-50 border-stone-100")}>
              <p className="text-xs opacity-60 uppercase tracking-wider font-semibold mb-1">Titular</p>
              <p className="font-semibold text-base">{bankDetails.holder}</p>
            </div>

            {/* CLABE */}
            <div className={cn("rounded-xl p-4 border flex items-center justify-between gap-4", isDark ? "bg-[#142844] border-blue-500/10" : "bg-stone-50 border-stone-100")}>
              <div className="flex-1 min-w-0">
                <p className="text-xs opacity-60 uppercase tracking-wider font-semibold mb-1">CLABE Interbancaria</p>
                <p className="font-mono text-sm font-semibold tracking-wider truncate">{bankDetails.clabe}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(bankDetails.clabe, "clabe")}
                className="hover:bg-muted/50 p-2 h-9 w-9 shrink-0 rounded-lg transition-colors"
              >
                {copiedField === "clabe" ? (
                  <Check className="w-4 h-4 text-green-500 animate-pulse" />
                ) : (
                  <Copy className="w-4 h-4 opacity-70" />
                )}
              </Button>
            </div>

            {/* Account Number */}
            {bankDetails.accountNumber && (
              <div className={cn("rounded-xl p-4 border flex items-center justify-between gap-4", isDark ? "bg-[#142844] border-blue-500/10" : "bg-stone-50 border-stone-100")}>
                <div className="flex-1 min-w-0">
                  <p className="text-xs opacity-60 uppercase tracking-wider font-semibold mb-1">Número de Cuenta</p>
                  <p className="font-mono text-sm font-semibold tracking-wider truncate">{bankDetails.accountNumber}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.accountNumber!, "accountNumber")}
                  className="hover:bg-muted/50 p-2 h-9 w-9 shrink-0 rounded-lg transition-colors"
                >
                  {copiedField === "accountNumber" ? (
                    <Check className="w-4 h-4 text-green-500 animate-pulse" />
                  ) : (
                    <Copy className="w-4 h-4 opacity-70" />
                  )}
                </Button>
              </div>
            )}

            {/* Note/WhatsApp Alert */}
            <div className="rounded-xl p-4 border border-rose-200/30 bg-rose-500/5 text-sm flex gap-3">
              <span className="text-base select-none">📝</span>
              <p className="opacity-80">
                Una vez realizada la transferencia, te agradecemos nos compartas el comprobante para poder registrarlo y agradecerte.
              </p>
            </div>

          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog for Envelope Shower */}
      <Dialog open={showEnvelopeModal} onOpenChange={setShowEnvelopeModal}>
        <DialogContent className={cn("max-w-md border", isDark ? "bg-[#0e1e33] border-blue-500/20 text-white" : "bg-white border-stone-200 text-stone-900")}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-light font-savoir tracking-wide" style={{ color: primaryColor }}>
              Lluvia de Sobres
            </DialogTitle>
            <DialogDescription className={isDark ? "text-slate-400" : "text-stone-500"}>
              ¿Cómo funciona la lluvia de sobres?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-muted/10 border border-muted-foreground/10 text-center">
              <MailOpen className="w-16 h-16 mb-4 animate-bounce" style={{ color: primaryColor }} />
              <p className="text-sm opacity-90 leading-relaxed">
                Es una tradición donde los invitados depositan su obsequio en efectivo dentro de un sobre cerrado y lo colocan en una urna, cofre o buzón especial ubicado en la entrada de la recepción.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm uppercase tracking-wider">Detalles adicionales:</h4>
              <ul className="space-y-2 text-sm opacity-80 list-disc list-inside">
                <li>Los sobres se entregarán el mismo día del evento al ingresar al salón.</li>
                <li>Si no cuentas con sobre, normalmente encontrarás algunos en la mesa de recepción del evento.</li>
                <li>¡No olvides escribir tu nombre o familia en el sobre para saber quién nos lo obsequia!</li>
              </ul>
            </div>

            <div className="text-center text-xs opacity-60">
              Tu amor y buenos deseos son lo más valioso para {festejadaName || "la festejada"}.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
