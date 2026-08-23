import * as React from 'react'
import { cn } from '@/lib/utils'

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Render as a different element — e.g. "article", "li", "aside". */
  as?: 'div' | 'article' | 'section' | 'li' | 'aside' | 'figure'
  /** Adds the hover lift + brand glow micro-interaction. */
  interactive?: boolean
  /** Opaque tint behind long body copy so text keeps AA contrast over glass. */
  solid?: boolean
}

export function GlassCard({
  as: Tag = 'div',
  interactive,
  solid,
  className,
  children,
  ...rest
}: GlassCardProps) {
  // Cast to a concrete intrinsic tag: the union of tags widens `children` to `never`
  // under JSX inference, and every tag we allow takes the same attribute set.
  const Comp = Tag as 'div'

  return (
    <Comp
      className={cn(
        'glass overflow-hidden',
        solid && 'glass-solid',
        interactive && 'glass-hover',
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  )
}
