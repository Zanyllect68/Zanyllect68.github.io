'use client'

import { SectionHeading } from '@/components/section-heading'
import { Stagger, StaggerItem } from '@/components/reveal'
import { TiltCard } from '@/components/tilt-card'
import { CERTIFICATIONS } from '@/lib/data'
import { Award } from 'lucide-react'

export function Certifications() {
  return (
    <section id="certificaciones" className="border-t-2 border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          title="Certificaciones"
          subtitle="Acreditaciones profesionales que respaldan mi conocimiento."
        />

        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <StaggerItem key={`${cert.name}-${i}`} y={32}>
              <TiltCard max={5}>
                <div className="flex h-full flex-col border-2 border-foreground bg-card p-6 shadow-hard-sm">
                  <div className="flex items-center justify-between">
                    <Award className="size-6 text-accent" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{cert.year}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold uppercase leading-tight tracking-tight">{cert.name}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accent">{cert.org}</p>
                  <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">{cert.description}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
