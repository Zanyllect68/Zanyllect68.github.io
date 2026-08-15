'use client'

import { SectionHeading } from '@/components/section-heading'
import { Stagger, StaggerItem } from '@/components/reveal'
import { TiltCard } from '@/components/tilt-card'
import { PROJECTS } from '@/lib/data'
import { ExternalLink, FolderGit2 } from 'lucide-react'

export function Projects() {
  return (
    <section id="proyectos" className="border-t-2 border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          title="Proyectos"
          subtitle="Soluciones que he construido de principio a fin."
        />

        <Stagger className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {PROJECTS.map((project) => (
            <StaggerItem key={project.title} y={32}>
              <TiltCard max={4}>
                <div className="flex h-full flex-col border-2 border-foreground bg-card shadow-hard">
                  <div className="flex items-center justify-between border-b-2 border-border px-6 py-4">
                    <span className="font-mono text-xs text-accent">{project.index}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{project.period}</span>
                      <FolderGit2 className="size-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-6 py-6">
                    <h3 className="text-2xl font-bold uppercase tracking-tight">{project.title}</h3>
                    <p className="mt-3 flex-1 text-pretty leading-relaxed text-muted-foreground">{project.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="border-2 border-border bg-background px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 self-start border-2 border-foreground bg-accent px-5 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground shadow-hard-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                    >
                      <ExternalLink className="size-4" />
                      Ver repositorio
                    </a>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
