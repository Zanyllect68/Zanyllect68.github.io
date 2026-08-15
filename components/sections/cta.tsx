'use client'

import { ArrowRight, Mail } from 'lucide-react'
import { SOCIALS } from '@/lib/data'
import { Magnetic } from '@/components/magnetic'
import { Reveal } from '@/components/reveal'

export function CTA() {
  return (
    <section id="contacto" className="border-t-2 border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative border-2 border-foreground bg-card p-8 shadow-hard md:p-16 lg:p-20">
            <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
            <div className="relative">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Contacto</span>
              <h2 className="mt-6 text-balance text-4xl font-bold uppercase leading-[0.9] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Construyamos
                <br />
                algo increíble.
              </h2>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Estoy abierto a colaboraciones, proyectos desafiantes y oportunidades donde pueda
                aportar mis habilidades en ingeniería de datos, arquitectura de software e
                inteligencia artificial.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Magnetic>
                  <a
                    href={`mailto:${SOCIALS.email}`}
                    className="group inline-flex items-center gap-2 border-2 border-foreground bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wide text-accent-foreground shadow-hard transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                  >
                    <Mail className="size-4" />
                    Contactarme
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
