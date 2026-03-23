"use client";

import { useActionState, startTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, Ticket, Lock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

function PasscodeForm({
  customerId,
  onSubmit
}: {
  customerId: string;
  onSubmit: (data: PasscodeFormData) => void;
}) {
  const form = useForm<PasscodeFormData>({
    resolver: zodResolver(passcodeSchema) as any,
    defaultValues: {
      passcode: "",
    },
  });

  return (
    
      <Form {...form} >
     
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  py-2 px-2">
       
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-stone-50 rounded-full">
            <Lock className="w-6 h-6 text-stone-400" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-xl font-serif">Ingresa tu codigo de Ingreso</h3>
          <p className="text-sm text-stone-400">Compartido en tu invitación</p>
        </div>

        <FormField
          control={form.control}
          name="passcode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. WED-XYZ"
                  className="text-center text-lg tracking-widest uppercase font-mono"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12 text-lg"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Buscar Invitación"
          )}
        </Button>
      </form>
    </Form>

   
  );
}

function RSVPConfirmForm({
  guest,
  onSubmit,
  onBack
}: {
  guest: Guest;
  onSubmit: (data: RSVPFormData) => void;
  onBack: () => void;
}) {
  const form = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema) as any,
    defaultValues: {
      tickets_confirmed: guest.tickets_allowed,
      email: guest.email || "",
      message: guest.message || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-serif italic">Bienvenido {guest.name}</h3>
          <div className="flex items-center gap-2 text-stone-500 text-sm">
            <Ticket className="w-4 h-4" />
            <span>{guest.tickets_allowed} Lugares reservados para ti</span>
          </div>
        </div>

        <FormField
          control={form.control}
          name="tickets_confirmed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿Cuántos invitados asistirán?</FormLabel>
              <FormControl>
                <select
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {[...Array(guest.tickets_allowed + 1)].map((_, i) => (
                    <option key={i} value={i}>
                      {i === 0 ? "No asistiremos (0)" : `${i} invitados${i > 1 ? 's' : ''}`}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="your@email.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Escribe un  mensaje.."
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Confirmar RSVP"
          )}
        </Button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-xs text-stone-400 hover:underline"
        >
          Not you? Enter a different code
        </button>
      </form>
    </Form>
  );
}

// ==================== MAIN COMPONENT ====================

export function RSVPForm({ customerId }: { customerId: string }) {
  const searchParams = useSearchParams();

  const [searchState, searchAction] = useActionState(
    findGuestByPasscode,
    { step: 'search' as const, guest: null, error: null }
  );

  const [confirmState, confirmAction] = useActionState(
    confirmRSVPAction,
    { step: 'confirm' as const, guest: null, error: null }
  );

  // Determine current state
  const currentState = confirmState.step !== 'confirm' ? confirmState : searchState;
  const { step, guest, error } = currentState;

  // Magic link auto-fetch
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      const formData = new FormData();
      formData.append("passcode", code);
      formData.append("customerId", customerId);
      startTransition(() => {
        searchAction(formData);
      });
    }
  }, [searchParams, customerId]);

  // ==================== RENDER ====================

  if (step === 'thanks') {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-stone-100 animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-serif mb-2">Gracias!</h3>
          <p className="text-stone-500">
            Tu respuesta ha sido guaradada. No podemos esperar para celebrar!
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
            onSubmit={(data) => {
              const formData = new FormData();
              formData.append("passcode", data.passcode);
              formData.append("customerId", customerId);
              startTransition(() => {
                searchAction(formData);
              });
            }}
          />
          {error && (
            <p className="text-red-500 text-xs text-center mt-4">{error}</p>
          )}
        </div>
      ) : guest ? (
        <div className="p-6 bg-white rounded-2xl shadow-md border-t-4 border-t-stone-800">
          <RSVPConfirmForm
            guest={guest}
            onSubmit={(data) => {
              const formData = new FormData();
              formData.append("guestId", guest.id);
              formData.append("tickets_confirmed", data.tickets_confirmed.toString());
              formData.append("email", data.email);
              formData.append("message", data.message || "");
              startTransition(() => {
                confirmAction(formData);
              });
            }}
            onBack={() => {
              window.location.reload();
            }}
          />
          {error && (
            <p className="text-red-500 text-xs text-center mt-4">{error}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}