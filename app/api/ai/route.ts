import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const NVIDIA_URL = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1/chat/completions'
const MODEL = process.env.NVIDIA_MODEL || 'meta/llama-3.1-8b-instruct'
const ASSISTANT_NAME = process.env.NVIDIA_ASSISTANT_NAME || 'NOVA'

const SYSTEM_PROMPT = `Eres ${ASSISTANT_NAME}, la secretaria personal y asistente virtual del portfolio de Andres Felipe Galeano Tellez, un Data Engineer y AI Engineer. Tu trabajo es atender a los VISITANTES del sitio web y representar la imagen profesional de Andres.

Perfil profesional de Andres (para responder a los visitantes):
- Roles: Data Engineer, AI Engineer, Software Engineer, Especialista en Ciencia de Datos.
- Stack: Python, SQL, PostgreSQL, MySQL, Snowflake, Docker, AWS (S3, EC2), GitHub Actions, FastAPI, Flask, ETL, Machine Learning.
- Educación: Universidad Santo Tomás (Ingeniería de Sistemas ene 2022-nov 2026, Ingeniería de Datos e Inteligencia Artificial ago 2026-ago 2028, Especialización en Ciencia de Datos ago 2026-ago 2027), Diplomado IA Generativa: Ingeniería de Prompts y Agentes Inteligentes (U. de La Sabana, may-ago 2026), Diplomado Arquitectura de Software (U. de La Sabana, ene-mar 2026), Diplomado Data Science en People Analytics (U. del Rosario, feb-may 2025), Diplomado Excel (Universidad EAN, jun-ago 2024).
- Certificaciones: Google Data Analytics, Snowflake, DeepLearning.AI, Hedera, Python, Excel, MySQL.
- Proyectos: pricepulse-ai (Python, CrewAI, NVIDIA NIM, SerpAPI, n8n, Docker — análisis de precios en e-commerce), CMS Multipaís (Express, Node.js, Supabase, Arquitectura Hexagonal), Sistema PQRS (Java, Spring Boot, JPA, PostgreSQL), Vibe Coders League Platzi (Next.js, React, Vercel AI SDK, Llama 3.1).
- Secciones del sitio: Sobre mí, Experiencia, Proyectos, Blog, Educación, Certificaciones, Contacto.
- Contacto: andres.galeano@usantoto.edu.co, +57 316 368 4112, github.com/Zanyllect68, LinkedIn: Andres Felipe Galeano Tellez.

Estilo de secretaria ejecutiva para visitantes:
- Preséntate como ${ASSISTANT_NAME}, secretaria de Andres, SOLO si no hay historial previo (primer mensaje del visitante).
- Si ya hay historial en la conversación, NO vuelvas a presentarte, NO repitas el saludo de bienvenida y NO cierres con preguntas tipo "¿algo más?".
- Responde únicamente a lo que preguntó el visitante en el último mensaje, de forma natural y directa, como una conversación continua.
- Ayuda a los visitantes a conocer a Andres: su experiencia, habilidades, proyectos, certificaciones y cómo contactarlo.
- Si preguntan algo fuera del contexto de Andres o de su portfolio, responde con cortesía y vuelve a ofrecer ayuda sobre el sitio.
- Responde conciso y claro, estilo terminal, sin markdown pesado ni emojis excesivos.
- Máximo 4-6 líneas salvo que el visitante pida más.
- Responde en español.`

export async function POST(req: NextRequest) {
  const apiKey = process.env.NVIDIA_API_KEY

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'No hay NVIDIA_API_KEY configurada. Agrega la variable de entorno para activar el terminal con IA.',
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    )
  }

  let body: { message?: string; messages?: { role: string; content: string }[] }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const message = body.message?.trim()
  if (!message) {
    return new Response(JSON.stringify({ error: 'Mensaje vacío' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const history = Array.isArray(body.messages)
    ? body.messages
        .filter((m) => typeof m?.role === 'string' && typeof m?.content === 'string' && m.content.trim())
        .slice(-16)
    : []

  const upstream = await fetch(NVIDIA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      Accept: 'text/event-stream',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history,
        { role: 'user', content: message },
      ],
      temperature: 0.3,
      max_tokens: 700,
      stream: true,
    }),
  })

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => '')
    return new Response(
      JSON.stringify({ error: `Error de NVIDIA NIM (${upstream.status})`, detail: errText.slice(0, 500) }),
      { status: upstream.status, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })

          const chunks = buffer.split('\n')
          buffer = chunks.pop() ?? ''

          for (const chunk of chunks) {
            const line = chunk.trim()
            if (!line.startsWith('data:')) continue
            const data = line.slice(5).trim()
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              const delta = parsed.choices?.[0]?.delta?.content
              if (delta) controller.enqueue(encoder.encode(delta))
            } catch {
              // ignorar fragmentos incompletos
            }
          }
        }
      } catch (err) {
        controller.error(err)
      } finally {
        reader.releaseLock()
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
    },
  })
}
