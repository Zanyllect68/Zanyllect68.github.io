'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (stored) {
      setTheme(stored)
      document.documentElement.classList.toggle('dark', stored === 'dark')
    }
  }, [])

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', next === 'dark')
      localStorage.setItem('theme', next)
      return next
    })
  }

  return { theme, toggle }
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
      className="grid size-11 place-items-center border-2 border-border bg-background transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
