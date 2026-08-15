'use client'

import { useEffect, useRef, useState } from 'react'
import { CERTIFICATIONS, EDUCATION, PROJECTS } from '@/lib/data'
import { useTheme } from '@/components/theme-toggle'

type Line = {
  id: number
  type: 'input' | 'output' | 'error'
  text: string
}

const PROMPT = 'andres@data-stack:~$'
const ASSISTANT_NAME = process.env.NEXT_PUBLIC_ASSISTANT_NAME || 'NOVA'

const LOCAL_SKILLS = [
  'Lenguajes: Python, SQL, Java, Bash',
  'Bases de datos: PostgreSQL, MySQL, Snowflake',
  'Data Engineering: ETL, Data Warehouse, SQL Analytics, Alembic',
  'Cloud & DevOps: AWS (S3, EC2), Docker, GitHub Actions',
  'Backend: FastAPI, Flask, REST APIs',
]

function fmtSkills() {
  return LOCAL_SKILLS.map((s) => `  ${s}`).join('\n')
}

function fmtProjects() {
  return PROJECTS.map((p) => `  ${p.index}. ${p.title}  [${p.stack.slice(0, 2).join(', ')}]`).join('\n')
}

function fmtEducation() {
  return EDUCATION.map((e) => `  - ${e.title} @ ${e.org} (${e.period})`).join('\n')
}

function fmtCerts() {
  return CERTIFICATIONS.map((c) => `  - ${c.name} — ${c.org} (${c.year})`).join('\n')
}

const HELP = [
  '  whoami         → quién soy',
  '  roles          → mis roles',
  '  skills         → tecnologías',
  '  projects       → proyectos',
  '  education      → educación',
  '  certifications → certificaciones',
  '  contact        → cómo contactarme',
  '  status         → estado del sistema',
  '  theme          → cambiar tema',
  '  clear          → limpiar terminal',
  '  help           → mostrar esto',
]

export function PipelineTerminal({ className = '' }: { className?: string }) {
  const [lines, setLines] = useState<Line[]>([
    { id: 0, type: 'output', text: `Bienvenido a ~/pipeline.blueprint` },
    { id: 1, type: 'output', text: `Hola, soy ${ASSISTANT_NAME}, la secretaria de Andres. Pregúntame lo que quieras sobre él o su trabajo.` },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [conversation, setConversation] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const [focused, setFocused] = useState(false)
  const idRef = useRef(2)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const { theme, toggle } = useTheme()

  const push = (type: Line['type'], text: string) => {
    setLines((prev) => [...prev, { id: idRef.current++, type, text }])
  }

  const updateLine = (id: number, text: string) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, text } : l)))
  }

  const aiRunning = useRef(false)

  const runAI = async (message: string) => {
    const thinkingId = idRef.current++
    setLines((prev) => [...prev, { id: thinkingId, type: 'output', text: `  ▌ ${ASSISTANT_NAME} está pensando...` }])

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, messages: conversation }),
      })

      if (!res.ok) {
        let detail = ''
        try {
          const err = await res.json()
          detail = err.error || ''
        } catch {
          detail = `HTTP ${res.status}`
        }
        updateLine(thinkingId, `  [ia] ${detail}`)
        return
      }

      const reader = res.body?.getReader()
      if (!reader) {
        updateLine(thinkingId, '  [ia] respuesta vacía')
        return
      }

      const decoder = new TextDecoder()
      let acc = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        updateLine(thinkingId, `  ▸ ${acc}`)
      }
      updateLine(thinkingId, `  ${acc}`)
      setConversation((prev) =>
        [...prev, { role: 'user', content: message }, { role: 'assistant', content: acc }].slice(-16),
      )
    } catch {
      updateLine(thinkingId, '  [ia] error de conexión con el servidor IA')
    }
  }

  const run = (raw: string) => {
    const cmd = raw.trim()
    push('input', raw)

    if (!cmd) return

    switch (cmd) {
      case 'help':
        push('output', HELP.join('\n'))
        push('output', '  Cualquier otra frase se envía a NVIDIA NIM (IA).')
        break
      case 'whoami':
        push('output', '  Andres Felipe Galeano Tellez')
        push('output', '  Data Engineer | AI Engineer | Software Engineer')
        push('output', '  Especialista en Ciencia de Datos')
        break
      case 'roles':
        push('output', '  - Data Engineer')
        push('output', '  - AI Engineer')
        push('output', '  - Software Engineer')
        break
      case 'skills':
        push('output', fmtSkills())
        break
      case 'projects':
        push('output', fmtProjects())
        break
      case 'education':
        push('output', fmtEducation())
        break
      case 'certifications':
        push('output', fmtCerts())
        break
      case 'contact':
        push('output', '  ✉ andres.galeano@usantoto.edu.co')
        push('output', '  ☎ +57 316 368 4112')
        push('output', '  https://github.com/Zanyllect68')
        push('output', '  https://linkedin.com/in/andres-felipe-galeano-tellez-a7285a250')
        break
      case 'status':
        push('output', '  system:    online')
        push('output', '  database:  PostgreSQL / Snowflake')
        push('output', '  cloud:     AWS (S3, EC2)')
        push('output', '  status:    OK')
        break
      case 'theme':
        toggle()
        push('output', `  tema cambiado a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`)
        break
      case 'clear':
        setLines([])
        break
      default:
        if (!aiRunning.current) {
          aiRunning.current = true
          runAI(cmd).finally(() => {
            aiRunning.current = false
          })
        } else {
          push('output', `  [${ASSISTANT_NAME}] espera a que termine la consulta anterior...`)
        }
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = input
      setInput('')
      setHistory((prev) => [...prev, value])
      setHistIdx(-1)
      run(value)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next)
      setInput(history[history.length - 1 - next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = histIdx - 1
      setHistIdx(next)
      setInput(next >= 0 ? (history[history.length - 1 - next] ?? '') : '')
    }
  }

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const focusTerminal = () => inputRef.current?.focus()

  return (
    <div
      className={`flex flex-1 flex-col bg-background font-mono text-[11px] leading-relaxed sm:text-xs ${className}`}
      onClick={focusTerminal}
    >
      <div
        ref={bodyRef}
        className="min-h-[16rem] max-h-[28rem] flex-1 overflow-y-auto p-3"
      >
        {lines.length === 0 ? null : (
          <div className="space-y-1">
            {lines.map((line) => (
              <div
                key={line.id}
                className={
                  line.type === 'input'
                    ? 'text-foreground'
                    : line.type === 'error'
                      ? 'text-destructive'
                      : 'whitespace-pre-wrap text-muted-foreground'
                }
              >
                {line.type === 'input' ? (
                  <>
                    <span className="text-accent">{PROMPT}</span> {line.text}
                  </>
                ) : (
                  line.text
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 border-t-2 border-border px-3 py-2">
        <span className="shrink-0 text-accent">{PROMPT}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label="Terminal interactiva — escribe un comando"
          spellCheck={false}
          autoComplete="off"
          className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
          placeholder={focused ? '' : 'escribe "help" ...'}
        />
      </div>
    </div>
  )
}
