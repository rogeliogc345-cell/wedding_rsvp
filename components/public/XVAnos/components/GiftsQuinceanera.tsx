"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Gift, ExternalLink, Copy, Check, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type RegistryType = "store" | "bank";
type Registry = {
  id: string;
  name: string;
  type: RegistryType;
  url?: string;
};

type BankInfoKey = "bank" | "holder" | "account" | "clabe";
type BankInfo = Record<BankInfoKey, string>;

type BankField = {
  label: string;
  key: BankInfoKey;
  copyable: boolean;
};

// Constants
const ANIMATION_DELAY = 0.1;
const COPY_SUCCESS_DURATION = 2000;

const REGISTRY_TYPE_LABELS: Record<RegistryType, string> = {
  store: "Mesa de regalos",
  bank: "Transferencia bancaria",
};

const BANK_FIELDS: BankField[] = [
  { label: "Banco", key: "bank", copyable: false },
  { label: "Titular", key: "holder", copyable: false },
  { label: "Cuenta", key: "account", copyable: true },
  { label: "CLABE", key: "clabe", copyable: true },
];

const DEFAULT_BANK_INFO: BankInfo = {
  bank: "BBVA México",
  holder: "Juan Pérez García",
  account: "0123456789012345",
  clabe: "012345678901234567",
};

const DEFAULT_REGISTRIES: Registry[] = [
  {
    id: "liverpool",
    name: "Liverpool",
    type: "store",
    url: "https://mesaderegalos.liverpool.com.mx/...",
  },
  {
    id: "palacio",
    name: "Palacio de Hierro",
    type: "store",
    url: "https://www.elpalaciodehierro.com/...",
  },
  {
    id: "bank",
    name: "Sobre de efectivo",
    type: "bank",
  },
];

// Helper component for registry icon
function RegistryIcon({ type }: { type: RegistryType }) {
  const IconComponent = type === "store" ? ExternalLink : Gift;
  return (
    <IconComponent className="w-5 h-5 text-rose-600" />
  );
}

// Helper component for bank field row
function BankFieldRow({
  field,
  value,
  isCopied,
  onCopy,
}: {
  field: BankField;
  value: string;
  isCopied: boolean;
  onCopy: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {field.label}
        </p>
        <p
          className={cn(
            "font-semibold text-gray-900",
            field.copyable && "font-mono text-sm"
          )}
        >
          {value}
        </p>
      </div>
      {field.copyable && (
        <button
          onClick={() => onCopy(value)}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          aria-label={`Copy ${field.label}`}
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400" />
          )}
        </button>
      )}
    </div>
  );
}

export function GiftRegistryMinimal() {
  const [showBankModal, setShowBankModal] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), COPY_SUCCESS_DURATION);
  }, []);

  const handleRegistryClick = useCallback((registry: Registry) => {
    if (registry.type === "bank") {
      setShowBankModal(true);
    } else if (registry.url) {
      window.open(registry.url, "_blank");
    }
  }, []);

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <Gift className="w-16 h-16 text-rose-400 mx-auto" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
              Quieres regalarme algo?
            </h2>
            <div className="w-20 h-1 bg-rose-300 mx-auto mb-6" />
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Te dejamos algunas sugerencias, pero{" "}
              <span className="text-rose-600 font-medium">
                tu presencia es el mejor regalo de todos
              </span>
            </p>
          </motion.div>

          {/* Registry Cards */}
          <div className="space-y-4 max-w-2xl mx-auto">
            {DEFAULT_REGISTRIES.map((registry, index) => (
              <motion.button
                key={registry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * ANIMATION_DELAY }}
                onClick={() => handleRegistryClick(registry)}
                className="w-full group"
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-rose-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <RegistryIcon type={registry.type} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {registry.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {REGISTRY_TYPE_LABELS[registry.type]}
                        </p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                      <ChevronRight className="w-4 h-4 text-rose-600 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Bank Modal */}
      <Dialog open={showBankModal} onOpenChange={setShowBankModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              Datos Bancarios
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {BANK_FIELDS.map((field) => (
              <BankFieldRow
                key={field.key}
                field={field}
                value={DEFAULT_BANK_INFO[field.key]}
                isCopied={copiedField === field.key}
                onCopy={(value) => copyToClipboard(value, field.key)}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}