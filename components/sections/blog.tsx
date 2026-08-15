'use client'

import { SectionHeading } from '@/components/section-heading'
import { Stagger } from '@/components/reveal'
import { FileText } from 'lucide-react'

export function Blog() {
  return (
    <section id="blog" className="border-t-2 border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          title="Blog"
          subtitle="Artículos técnicos sobre Data Engineering, Python, SQL, Machine Learning, Cloud y más."
        />

        <Stagger>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-border bg-card px-6 py-20 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-accent">
              <FileText className="size-3.5" /> Próximamente
            </span>
            <h3 className="mt-6 text-xl font-bold uppercase tracking-tight">
              Aún no hay artículos publicados
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Estoy escribiendo artículos sobre Data Engineering, Python e IA. Vuelve pronto.
            </p>
          </div>
        </Stagger>
      </div>
    </section>
  )
}
