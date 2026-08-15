'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ROLES } from '@/lib/data'

export function RotatingRoles() {
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[index]
    const speed = deleting ? 40 : 90

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (display.length < current.length) {
          setDisplay(current.slice(0, display.length + 1))
        } else {
          setTimeout(() => setDeleting(true), 1600)
        }
      } else {
        if (display.length > 0) {
          setDisplay(current.slice(0, display.length - 1))
        } else {
          setDeleting(false)
          setIndex((i) => (i + 1) % ROLES.length)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [display, deleting, index])

  return (
    <p className="font-mono text-xs uppercase tracking-wide text-accent sm:text-sm">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={display}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="inline-block"
        >
          {display}
          <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-accent align-middle" />
        </motion.span>
      </AnimatePresence>
    </p>
  )
}
