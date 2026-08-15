import { Database, GitBranch, Layers, Server } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, Stagger, StaggerItem } from '@/components/reveal'
import { CountUp } from '@/components/count-up'
import { STATS } from '@/lib/data'

const KNOWLEDGE = ['Python', 'SQL', 'PostgreSQL', 'Snowflake', 'Docker']

const EXPERIENCE_AREAS = [
  { icon: Database, label: 'Bases de datos relacionales' },
  { icon: GitBranch, label: 'ETL' },
  { icon: Layers, label: 'Arquitecturas escalables' },
  { icon: Server, label: 'APIs & Cloud Computing' },
]

export function About() {
  return (
    <section id="sobre-mi" className="border-t-2 border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="00"
          title="Sobre mí"
          subtitle="Ingeniero de Datos en formación con especialización en Ciencia de Datos."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="h-full border-2 border-foreground bg-card p-8 shadow-hard md:p-10">
              <p className="text-pretty text-xl leading-relaxed md:text-2xl">
                Diseño y construyo sistemas de datos de extremo a extremo: desde la ingesta y
                transformación hasta el modelado analítico y el despliegue en la nube. Mi objetivo
                es construir{' '}
                <span className="bg-accent px-1 font-semibold text-accent-foreground">pipelines de datos</span>{' '}
                confiables para analítica moderna.
              </p>

              <div className="mt-10">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Conocimientos</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {KNOWLEDGE.map((k) => (
                    <span key={k} className="border-2 border-border px-3 py-1.5 font-mono text-sm">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5">
            {EXPERIENCE_AREAS.map((area) => (
              <StaggerItem key={area.label}>
                <div className="group flex h-full flex-col justify-between border-2 border-border bg-background p-6 transition-colors hover:border-foreground hover:bg-card">
                  <area.icon className="size-7 text-accent" />
                  <p className="mt-8 text-lg font-semibold leading-tight">{area.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Stagger className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="border-2 border-border bg-card p-6">
                <p className="text-4xl font-bold tracking-tight text-accent md:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
