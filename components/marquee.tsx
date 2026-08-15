'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const PHRASES = [
  'Data Engineering',
  'Python',
  'SQL',
  'Machine Learning',
  'Cloud',
  'Docker',
  'Inteligencia Artificial',
  'ETL',
  'Snowflake',
]

export function Marquee({ reverse = false, className }: { reverse?: boolean; className?: string }) {
  const row = [...PHRASES, ...PHRASES]

  return (
    <div
      className={cn(
        'relative z-10 flex items-center overflow-hidden border-y-2 border-foreground bg-accent py-3',
        className,
      )}
      aria-hidden
    >
      <motion.div
        className="flex shrink-0 items-center whitespace-nowrap"
        animate={{ x: reverse ? ['0%', '50%'] : ['-50%', '0%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {row.map((phrase, i) => (
          <span key={i} className="flex items-center">
            <span className="px-4 font-mono text-sm font-bold uppercase tracking-widest text-accent-foreground">
              {phrase}
            </span>
            <span className="size-2.5 rotate-45 border-2 border-accent-foreground" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
