"use client";

import { useActionState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, Ticket, Lock } from "lucide-react";

// Import actions from separate file
import { findGuestByPasscode, confirmRSVPAction, type FormState, type Guest } from "@/app/(admin)/actions";


// ==================== SCHEMAS ====================

const passcodeSchema = z.object({
  passcode: z.string()
    .min(1, "Passcode is required")
    .transform(val => val.toUpperCase().trim()),
});

const rsvpSchema = z.object({
  tickets_confirmed: z.coerce.number().min(0),
  email: z.string().email("Valid email required"),
  message: z.string().optional(),
});

type PasscodeFormData = z.infer<typeof passcodeSchema>;
type RSVPFormData = z.infer<typeof rsvpSchema>;

// ==================== COMPONENTS ====================

const PasscodeForm = ({ customerId, state, action, isPending }: {
  customerId: string;
  state: any;
  action: (payload: FormData) => void;
  isPending: boolean;
}) => {
  const [passcode, setPasscode] = useState("");

  return (
    <form action={action} className="space-y-8 py-2 px-2">
      <input type="hidden" name="customerId" value={customerId} />

      <div className="flex justify-center mb-2">
        <div className="p-3 bg-stone-50 rounded-full">
          <Lock className="w-6 h-6 text-stone-400" />
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-xl font-serif">Ingresa tu codigo de Ingreso</h3>
        <p className="text-sm text-stone-400">Compartido en tu invitación</p>
      </div>

      <div>
        <Input
          name="passcode"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value.toUpperCase())}
          placeholder="e.g. WEDXYZ"
          className="text-center text-lg tracking-widest uppercase font-mono"
          autoComplete="off"
          disabled={isPending}
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-lg"
        disabled={isPending || !passcode.trim()}
      >
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Buscar Invitación"
        )}
      </Button>
    </form>
  );
}

const RSVPConfirmForm = ({
  guest,
  state,
  action,
  isPending,
  onBack
}: {
  guest: Guest;
  state: any;
  action: (payload: FormData) => void;
  isPending: boolean;
  onBack: () => void;
}) => {
  const [ticketsConfirmed, setTicketsConfirmed] = useState(guest.tickets_allowed);
  const [email, setEmail] = useState(guest.email || "");
  const [message, setMessage] = useState(guest.message || "");

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="guestId" value={guest.id} />

      <div className="space-y-1">
        <h3 className="text-2xl font-serif italic pb-2">{guest.name}</h3>
        <div className="flex items-center gap-2 text-stone-500 text-sm">
          <Ticket className="w-4 h-4" />
          <span>{guest.tickets_allowed} Lugares reservados para ti</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">¿Cuántos invitados asistirán?</label>
        <select
          name="tickets_confirmed"
          value={ticketsConfirmed}
          onChange={(e) => setTicketsConfirmed(parseInt(e.target.value))}
          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {[...Array(guest.tickets_allowed + 1)].map((_, i) => (
            <option key={i} value={i}>
              {i === 0 ? "No asistiremos (0)" : `${i} invitado${i > 1 ? 's' : ''}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Email address</label>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={isPending}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Mensaje (opcional)</label>
        <Textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje.."
          className="min-h-[100px]"
          disabled={isPending}
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12"
        disabled={isPending || !email.trim()}
      >
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Confirmar RSVP"
        )}
      </Button>

      <button
        type="button"
        onClick={onBack}
        disabled={isPending}
        className="w-full text-xs text-stone-400 hover:underline disabled:opacity-50"
      >
        Not you? Enter a different code
      </button>
    </form>
  );
}

// ==================== MAIN COMPONENT ====================

export function RSVPForm({ customerId }: { customerId: string }) {
  const [formKey, setFormKey] = useState(0);

  return (
    <RSVPFormInner
      key={formKey}
      customerId={customerId}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}

function RSVPFormInner({
  customerId,
  onReset
}: {
  customerId: string;
  onReset: () => void;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasAutoFetched = useRef(false);

  const [searchState, searchAction, searchPending] = useActionState(
    findGuestByPasscode,
    { step: 'search' as const, guest: null, error: null }
  );

  const [confirmState, confirmAction, confirmPending] = useActionState(
    confirmRSVPAction,
    { step: 'confirm' as const, guest: null, error: null }
  );

  // Determine current state
  const currentState = confirmState.step !== 'confirm' ? confirmState : searchState;
  const { step, guest, error } = currentState;
  const isPending = searchPending || confirmPending;

  // Magic link auto-fetch
  useEffect(() => {
    const code = searchParams.get("code");
    if (code && !hasAutoFetched.current) {
      hasAutoFetched.current = true;
      const formData = new FormData();
      formData.append("passcode", code);
      formData.append("customerId", customerId);
      searchAction(formData);
    }
  }, [searchParams, customerId, searchAction]);

  const handleBack = () => {
    // Clear the code parameter from URL so it doesn't auto-fetch again
    if (searchParams.has("code")) {
      router.replace(window.location.pathname, { scroll: false });
    }
    onReset();
  };

  // ==================== RENDER ====================

  if (step === 'thanks') {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-stone-100 animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-serif mb-2">Gracias!</h3>
          <p className="text-stone-500">
            Tu respuesta ha sido enviada. No podemos esperar para celebrar!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {step === 'search' ? (
        <div className="p-6 bg-white rounded-2xl shadow-md border border-stone-50">
          <PasscodeForm
            customerId={customerId}
            state={searchState}
            action={searchAction}
            isPending={searchPending}
          />
          {error && (
            <p className="text-red-500 text-xs text-center mt-4">{error}</p>
          )}
        </div>
      ) : guest ? (
        <div className="p-6 bg-white rounded-2xl shadow-md border-t-4 border-t-stone-800">
          <RSVPConfirmForm
            guest={guest}
            state={confirmState}
            action={confirmAction}
            isPending={confirmPending}
            onBack={handleBack}
          />
          {error && (
            <p className="text-red-500 text-xs text-center mt-4">{error}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}