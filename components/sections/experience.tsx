import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { EXPERIENCE } from '@/lib/data'
import { Shield } from 'lucide-react'

export function Experience() {
  return (
    <section id="experiencia" className="border-t-2 border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          title="Experiencia"
          subtitle="Trayectoria profesional y logros destacados."
        />

        <Reveal>
          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <div key={`${exp.title}-${i}`} className="relative">
                <div className="flex flex-col gap-6 border-2 border-foreground bg-card p-6 shadow-hard md:flex-row md:p-8">
                  <div className="flex size-14 shrink-0 items-center justify-center border-2 border-foreground bg-accent text-accent-foreground md:size-16">
                    <Shield className="size-6 md:size-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold uppercase tracking-tight md:text-2xl">{exp.title}</h3>
                        <p className="mt-1 font-mono text-sm text-accent">{exp.org}</p>
                      </div>
                      <span className="shrink-0 border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>
                    <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{exp.description}</p>
                    {exp.tags && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="border-2 border-border bg-background px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
