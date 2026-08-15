'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, CornerDownLeft, Mail, Moon, Search, Sun } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/icons'
import { NAV_LINKS, SOCIALS } from '@/lib/data'
import { useTheme } from '@/components/theme-toggle'

export function openCommandPalette() {
  window.dispatchEvent(new Event('open-command-palette'))
}

type Item = {
  label: string
  hint: string
  icon: React.ReactNode
  action: () => void
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-command-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-command-palette', onOpen)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) setQuery('')
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const items: Item[] = useMemo(() => {
    const nav = NAV_LINKS.map((l) => ({
      label: l.label,
      hint: 'Navegar',
      icon: <ArrowUpRight className="size-4" />,
      action: () => go(l.href),
    }))
    const actions: Item[] = [
      {
        label: theme === 'dark' ? 'Modo claro' : 'Modo oscuro',
        hint: 'Tema',
        icon: theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />,
        action: () => toggle(),
      },
      {
        label: 'GitHub',
        hint: 'Enlace',
        icon: <GitHubIcon className="size-4" />,
        action: () => window.open(SOCIALS.github, '_blank'),
      },
      {
        label: 'LinkedIn',
        hint: 'Enlace',
        icon: <LinkedInIcon className="size-4" />,
        action: () => window.open(SOCIALS.linkedin, '_blank'),
      },
      {
        label: 'Enviar correo',
        hint: 'Contacto',
        icon: <Mail className="size-4" />,
        action: () => window.open(`mailto:${SOCIALS.email}`),
      },
    ]
    return [...nav, ...actions]
  }, [theme, toggle])

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
          <motion.div
            role="dialog"
            aria-label="Paleta de comandos"
            className="relative w-full max-w-xl border-2 border-foreground bg-card shadow-hard"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 border-b-2 border-border px-4 py-3">
              <Search className="size-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar secciones o acciones..."
                className="w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">ESC</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <li className="px-3 py-6 text-center font-mono text-sm text-muted-foreground">Sin resultados</li>
              ) : (
                filtered.map((item, i) => (
                  <li key={`${item.label}-${i}`}>
                    <button
                      type="button"
                      onClick={item.action}
                      className="group flex w-full items-center justify-between gap-3 px-3 py-3 text-left transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </span>
                      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground">
                        {item.hint}
                        <CornerDownLeft className="size-3" />
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
