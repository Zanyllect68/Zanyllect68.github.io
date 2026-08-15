'use client'

import { motion } from 'motion/react'
import { ArrowDown, ArrowRight, BookOpen, Download } from 'lucide-react'
import { Magnetic } from '@/components/magnetic'
import { HeroScene } from '@/components/hero-scene'
import { RotatingRoles } from '@/components/rotating-roles'
import { PipelineTerminal } from '@/components/pipeline-terminal'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function Hero() {
  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <HeroScene variant="background" />
      <div aria-hidden className="absolute inset-0 bg-background/70" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="visible" className="lg:col-span-7">
          <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 border-2 border-border bg-card px-3 py-1.5 font-mono text-xs uppercase tracking-widest">
            <span className="size-2 animate-pulse bg-accent" />
            Disponible para proyectos
          </motion.div>

          <motion.h1 variants={item} className="text-balance text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl xl:text-8xl">
            Andres Felipe
            <br />
            Galeano Tellez
          </motion.h1>

          <motion.div variants={item} className="mt-6">
            <RotatingRoles />
          </motion.div>

          <motion.p variants={item} className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Construyo pipelines de datos, arquitecturas escalables y soluciones inteligentes utilizando{' '}
            <span className="font-semibold text-foreground">Python</span>,{' '}
            <span className="font-semibold text-foreground">SQL</span>,{' '}
            <span className="font-semibold text-foreground">Cloud</span> y{' '}
            <span className="font-semibold text-foreground">Machine Learning</span>.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <button
                onClick={() => scrollTo('#proyectos')}
                className="group flex items-center gap-2 border-2 border-foreground bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-accent-foreground shadow-hard transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                Ver proyectos
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
            <button
              onClick={() => scrollTo('#blog')}
              className="flex items-center gap-2 border-2 border-border bg-card px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-secondary"
            >
              <BookOpen className="size-4" />
              Leer blog
            </button>
            <a
              href="/cv-andres-galeano.pdf"
              download
              className="flex items-center gap-2 border-2 border-border px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-secondary"
            >
              <Download className="size-4" />
              Descargar CV
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative flex h-full flex-col border-2 border-foreground bg-card shadow-hard">
            <div className="flex items-center justify-between border-b-2 border-border px-4 py-2 font-mono text-xs text-muted-foreground">
              <span>~/nueva-e-entrada</span>
              <span className="flex gap-1.5">
                <span className="size-2.5 border border-border" />
                <span className="size-2.5 border border-border" />
                <span className="size-2.5 bg-accent" />
              </span>
            </div>
            <PipelineTerminal />
            <div className="grid grid-cols-2 border-t-2 border-border font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:grid-cols-3">
              <span className="border-r-2 border-border px-3 py-2">NOVA AI</span>
              <span className="border-r-2 border-border px-3 py-2">Latencia: baja</span>
              <span className="px-3 py-2 text-accent">Status: OK</span>
            </div>
          </div>
        </motion.div>
      </div>

      <button
        onClick={() => scrollTo('#sobre-mi')}
        aria-label="Desplazar hacia abajo"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:flex"
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </button>
    </section>
  )
}
