import { cn } from '@/lib/utils'

export function Stamp({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'pointer-events-none inline-flex rotate-[-6deg] select-none border-2 border-foreground bg-background px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-foreground shadow-hard-sm',
        className,
      )}
    >
      {text}
    </span>
  )
}
