'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import * as React from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

/** Section-level scroll reveal. Children stagger at 40ms via <RevealItem>. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'span'
}) {
  const reduced = useReducedMotion()
  const M = motion[Tag] as typeof motion.div

  if (reduced) return <Tag className={className}>{children}</Tag>

  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.62, ease: EASE, delay }}
    >
      {children}
    </M>
  )
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export function RevealGroup({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol' | 'section'
}) {
  const reduced = useReducedMotion()
  const M = motion[Tag] as typeof motion.div

  if (reduced) return <Tag className={className}>{children}</Tag>

  return (
    <M
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
    >
      {children}
    </M>
  )
}

export function RevealItem({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const reduced = useReducedMotion()
  const M = motion[Tag] as typeof motion.div

  if (reduced) return <Tag className={className}>{children}</Tag>
  return (
    <M className={className} variants={itemVariants}>
      {children}
    </M>
  )
}
