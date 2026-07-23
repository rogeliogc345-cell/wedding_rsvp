import { cn } from '@/lib/utils'

export function Divider({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex items-center justify-center gap-3', className)}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60 sm:w-24" />
      <svg
        viewBox="0 0 24 24"
        className="size-4 text-primary"
        fill="currentColor"
      >
        <path d="M12 2c.4 3.1 1.9 4.6 5 5-3.1.4-4.6 1.9-5 5-.4-3.1-1.9-4.6-5-5 3.1-.4 4.6-1.9 5-5z" />
        <circle cx="12" cy="20" r="1.4" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60 sm:w-24" />
    </div>
  )
}
