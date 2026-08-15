import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  index: string
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeading({ index, title, subtitle, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn('mb-12 md:mb-16', className)}>
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-border" />
        <span>Sección</span>
      </div>
      <h2 className="mt-4 text-balance text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  )
}
