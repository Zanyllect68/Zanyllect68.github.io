import { Mail, Phone } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/icons'
import { SOCIALS } from '@/lib/data'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-2 border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-tight">
              <span className="grid size-8 place-items-center border-2 border-foreground bg-accent text-accent-foreground">AG</span>
              <span>galeano.dev</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Data Engineer & AI Engineer. Construyendo el futuro con datos, código y arquitectura.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Contacto</h4>
            <ul className="mt-4 space-y-1">
              <li>
                <a href={`mailto:${SOCIALS.email}`} className="flex items-center gap-2 py-1.5 text-sm transition-colors hover:text-accent">
                  <Mail className="size-4 shrink-0 text-accent" />
                  {SOCIALS.email}
                </a>
              </li>
              <li className="flex items-center gap-2 py-1.5 text-sm">
                <Phone className="size-4 shrink-0 text-accent" />
                {SOCIALS.phone}
              </li>
              <li>
                <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-1.5 text-sm transition-colors hover:text-accent">
                  <GitHubIcon className="size-4 shrink-0 text-accent" />
                  @Zanyllect68
                </a>
              </li>
              <li>
                <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-1.5 text-sm transition-colors hover:text-accent">
                  <LinkedInIcon className="size-4 shrink-0 text-accent" />
                  Andres Felipe Galeano Tellez
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Navegación</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1">
              {[
                ['Inicio', '#inicio'],
                ['Sobre mí', '#sobre-mi'],
                ['Educación', '#educacion'],
                ['Experiencia', '#experiencia'],
                ['Proyectos', '#proyectos'],
                ['Blog', '#blog'],
                ['Contacto', '#contacto'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="block py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t-2 border-border pt-6 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
          &copy; {year} Andres Felipe Galeano Tellez. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
