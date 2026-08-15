'use client'

import { SectionHeading } from '@/components/section-heading'
import { Stagger, StaggerItem } from '@/components/reveal'
import { TiltCard } from '@/components/tilt-card'
import { GITHUB } from '@/lib/data'
import { Star, Code2, GitCommit, ExternalLink } from 'lucide-react'
import { GitHubIcon } from '@/components/icons'

export function GithubSection() {
  return (
    <section id="github" className="border-t-2 border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          title="GitHub"
          subtitle="Contribuciones, actividad y código abierto."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Stagger className="lg:col-span-2">
            <StaggerItem>
              <div className="border-2 border-foreground bg-card shadow-hard">
                <div className="flex items-center justify-between border-b-2 border-border px-6 py-4">
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider">Repositorios Destacados</h3>
                  <a
                    href={`https://github.com/${GITHUB.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <GitHubIcon className="size-4" />
                    @{GITHUB.username}
                  </a>
                </div>
                <div className="grid grid-cols-1 divide-y-2 divide-border sm:grid-cols-2 sm:divide-y-0 sm:divide-x-2">
                  {GITHUB.repos.map((repo) => (
                    <div key={repo.name} className="flex flex-col p-6 transition-colors hover:bg-secondary">
                      <div className="flex items-start justify-between">
                        <Code2 className="size-5 text-accent" />
                        <span className="flex items-center gap-1 font-mono text-xs tabular-nums text-muted-foreground">
                          <Star className="size-3.5" />
                          {repo.stars}
                        </span>
                      </div>
                      <h4 className="mt-3 font-mono text-sm font-bold uppercase tracking-tight">{repo.name}</h4>
                      <p className="mt-1 flex-1 text-sm text-muted-foreground">{repo.desc}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-accent">{repo.lang}</span>
                        <ExternalLink className="size-3.5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </Stagger>

          <Stagger>
            <StaggerItem>
              <TiltCard max={4}>
                <div className="border-2 border-foreground bg-card p-6 shadow-hard-sm">
                  <h3 className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider">
                    <Code2 className="size-4 text-accent" />
                    Lenguajes
                  </h3>
                  <div className="mt-6 space-y-4">
                    {GITHUB.languages.map((lang) => (
                      <div key={lang.name}>
                        <div className="flex items-center justify-between font-mono text-sm">
                          <span>{lang.name}</span>
                          <span className="tabular-nums text-muted-foreground">{lang.pct}%</span>
                        </div>
                        <div className="mt-1.5 h-2 w-full border border-foreground bg-background">
                          <div className="h-full bg-accent" style={{ width: `${lang.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <a
                    href={`https://github.com/${GITHUB.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 border-2 border-foreground bg-accent px-5 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground shadow-hard-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                  >
                    <GitCommit className="size-4" />
                    Ver actividad
                  </a>
                </div>
              </TiltCard>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  )
}
