'use client'

import * as React from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

export function StatCounter({
  value,
  suffix = '',
  label,
}: {
  value: number
  suffix?: string
  label: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced || !inView) {
      if (reduced) el.textContent = String(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = String(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [inView, reduced, value])

  return (
    <div ref={wrapRef} className="text-center">
      <p className="font-display text-3xl leading-none text-[var(--brand)] sm:text-4xl">
        <span ref={ref}>{reduced ? value : 0}</span>
        <span>{suffix}</span>
      </p>
      <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink-soft)]">{label}</p>
    </div>
  )
}
