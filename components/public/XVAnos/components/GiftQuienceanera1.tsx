"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Store, DollarSign, Mail, X, Copy, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Types
type GiftOption = {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  link?: string;
  color: string;
  gradient: string;
};

type BankDetails = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  swiftCode?: string;
  clabe?: string;
};

// Gift Registry Component
export function GiftRegistryQuinceanera() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const giftOptions: GiftOption[] = [
    {
      id: "liverpool",
      icon: <Store className="w-6 h-6" />,
      title: "Liverpool",
      subtitle: "Mesa de regalos",
      link: "https://mesaderegalos.liverpool.com.mx/milistaderegalos/...",
      color: "from-pink-500 to-rose-500",
      gradient: "bg-gradient-to-br from-pink-50 to-rose-50",
    },
    {
      id: "palacio",
      icon: <Gift className="w-6 h-6" />,
      title: "Palacio de Hierro",
      subtitle: "Mesa de regalos",
      link: "https://www.elpalaciodehierro.com/mesa-de-regalos/...",
      color: "from-pink-500 to-rose-500",
      gradient: "bg-gradient-to-br from-rose-50 to-pink-50",
    },
    {
      id: "cash",
      icon: <DollarSign className="w-6 h-6" />,
      title: "Sobre de efectivo",
      subtitle: "Transferencia bancaria",
      color: "from-pink-500 to-rose-500",
      gradient: "bg-gradient-to-br from-rose-50 to-pink-50",
    },
  ];

  const bankDetails: BankDetails = {
    bankName: "BBVA México",
    accountName: "Juan Pérez García",
    accountNumber: "0123 4567 8901 2345",
    clabe: "012345678901234567",
    swiftCode: "BCMRMXMMPYM",
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleOptionClick = (option: GiftOption) => {
    if (option.id === "cash") {
      setShowBankDetails(true);
    } else if (option.link) {
      window.open(option.link, "_blank");
    }
  };

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white py-24 px-24 overflow-hidden bg-black rounded-2xl
       mx-auto w-full max-w-7xl">
        {/* Decorative elements - subtle */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-100/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-100/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="font-light text-3xl md:text-5xl lg:text-6xl text-gray-900 mb-6 tracking-wide">
              Si quieres regalarme algo!
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-8" />
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Te dejamos algunas sugerencias.
              <br />
              <span className="text-rose-600 font-medium">Tu presencia es el mejor regalo de todos.</span>
            </p>
          </motion.div>

          {/* Decorative accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-16 origin-center"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
          </motion.div>

          {/* Gift Options Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {giftOptions.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleOptionClick(option)}
                className={cn(
                  "group relative bg-white rounded-xl px-6 py-4 shadow-md hover:shadow-lg",
                  "transition-all duration-300 hover:-translate-y-1",
                  "border border-gray-100 hover:border-rose-100"
                )}
              >
                {/* Subtle background on hover */}
                <div className={cn(
                  "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300",
                  option.gradient
                )} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={cn(
                    "w-14 h-14 mx-auto mb-6 rounded-lg flex items-center justify-center",
                    "bg-gradient-to-br transition-all duration-300",
                    option.color,
                    "text-white shadow-md group-hover:scale-105"
                  )}>
                    {option.icon}
                  </div>

                  {/* Text */}
                  <h3 className="font-medium text-lg text-gray-900 mb-2 group-hover:text-rose-700 transition-colors">
                    {option.title}
                  </h3>
                  {option.subtitle && (
                    <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors font-light">
                      {option.subtitle}
                    </p>
                  )}

                  {/* Arrow indicator */}
                  <div className="mt-6 flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center transition-colors group-hover:bg-rose-100"
                    >
                      <ChevronDown className="w-4 h-4 text-rose-500 rotate-[-90deg]" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Bank Details Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <button
              onClick={() => setShowBankDetails(true)}
              className="group inline-flex items-center gap-3 px-8 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-gray-200 hover:border-rose-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-105 transition-transform">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700 font-medium group-hover:text-rose-700 transition-colors">
                Ver datos bancarios
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Bank Details Modal */}
      <Dialog open={showBankDetails} onOpenChange={setShowBankDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gray-900 font-light tracking-wide">
              Datos Bancarios
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm font-light">
              Información para realizar tu transferencia
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-6">
            {/* Bank Name */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-medium">Banco</p>
              <p className="text-base font-medium text-gray-900">{bankDetails.bankName}</p>
            </div>

            {/* Account Name */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-medium">Titular</p>
              <p className="text-base font-medium text-gray-900">{bankDetails.accountName}</p>
            </div>

            {/* Account Number */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-medium">
                    Número de cuenta
                  </p>
                  <p className="text-sm font-mono font-medium text-gray-900">
                    {bankDetails.accountNumber}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.accountNumber.replace(/\s/g, ''), 'account')}
                  className="ml-2 hover:bg-rose-100"
                >
                  {copiedField === 'account' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            {/* CLABE */}
            {bankDetails.clabe && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-medium">
                      CLABE Interbancaria
                    </p>
                    <p className="text-sm font-mono font-medium text-gray-900">
                      {bankDetails.clabe}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(bankDetails.clabe!, 'clabe')}
                    className="ml-2 hover:bg-rose-100"
                  >
                    {copiedField === 'clabe' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* SWIFT */}
            {bankDetails.swiftCode && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-medium">
                      Código SWIFT
                    </p>
                    <p className="text-sm font-mono font-medium text-gray-900">
                      {bankDetails.swiftCode}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(bankDetails.swiftCode!, 'swift')}
                    className="ml-2 hover:bg-rose-100"
                  >
                    {copiedField === 'swift' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Note */}
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-rose-900 font-light">
                <strong>📝 Nota:</strong> Por favor envía tu comprobante por WhatsApp después de la transferencia.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}