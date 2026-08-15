'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export function LoadingScreen() {
  const [done, setDone] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 1200
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setCount(Math.round(p * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 250)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="w-[min(90vw,640px)] px-6">
            <div className="flex items-end justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span>Andres Galeano</span>
              <span>Cargando</span>
            </div>
            <div className="mt-4 h-[3px] w-full bg-border/30">
              <motion.div className="h-full bg-accent" initial={{ width: 0 }} animate={{ width: `${count}%` }} transition={{ ease: 'linear' }} />
            </div>
            <div className="mt-6 text-right font-mono text-6xl font-bold tabular-nums sm:text-8xl">
              {count}
              <span className="text-accent">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
