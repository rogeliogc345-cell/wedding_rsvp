"use client"

import { useState, useEffect } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Check } from "lucide-react"
import { updateGuestAction, UpdateGuestState } from "@/app/(admin)/actions"

const initialState: UpdateGuestState = {
  error: null,
  success: false,
}

export function GuestTicketsEditor({
  guestId,
  customerId,
  initialTicketsAllowed,
}: {
  guestId: string
  customerId: string
  initialTicketsAllowed: number
}) {
  const [ticketsAllowed, setTicketsAllowed] = useState(String(initialTicketsAllowed))
  const [state, formAction, isPending] = useActionState(updateGuestAction, initialState)
  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    if (state.success) {
      setShowSaved(true)
      const timer = window.setTimeout(() => setShowSaved(false), 2000)
      return () => window.clearTimeout(timer)
    }
  }, [state.success])

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Input
          name="ticketsAllowed"
          type="number"
          min={1}
          value={ticketsAllowed}
          onChange={(event) => setTicketsAllowed(event.target.value)}
          disabled={isPending}
          className="w-24"
        />
        <input type="hidden" name="guestId" value={guestId} />
        <input type="hidden" name="customerId" value={customerId} />
        <Button type="submit" size="sm" disabled={isPending || !ticketsAllowed}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando
            </>
          ) : showSaved ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Guardado
            </>
          ) : (
            "Guardar"
          )}
        </Button>
      </div>
      {state.error ? <p className="text-xs text-destructive">{state.error}</p> : null}
    </form>
  )
}
