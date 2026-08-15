'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { ArrowUp } from 'lucide-react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40, restDelta: 0.001 })

  return <motion.div className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-accent" style={{ scaleX }} aria-hidden />
}

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          aria-label="Volver arriba"
          className="fixed bottom-6 right-6 z-[60] grid size-12 place-items-center border-2 border-foreground bg-accent text-accent-foreground shadow-hard-sm transition-transform hover:-translate-y-1"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      const el = e.target as HTMLElement
      setActive(!!el.closest('a, button, [role="button"], input, textarea'))
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [enabled])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
      animate={{ x: pos.x - (active ? 18 : 6), y: pos.y - (active ? 18 : 6), width: active ? 36 : 12, height: active ? 36 : 12 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.3 }}
      style={{ mixBlendMode: 'difference' }}
      aria-hidden
    >
      <div className="size-full border-2 border-white" />
    </motion.div>
  )
}
