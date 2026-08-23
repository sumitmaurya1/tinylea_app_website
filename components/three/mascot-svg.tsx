import { cn } from '@/lib/utils'

/**
 * The TinyLearn buddy, drawn in the app's outlined-duotone style.
 * Doubles as (a) the <Suspense> fallback for the 3D canvas, (b) the permanent
 * mascot on low-power devices / reduced motion, and (c) an SSR-safe LCP element.
 * CSS-only motion, so it costs nothing on the main thread.
 */
export function MascotSvg({
  className,
  animated = true,
  /** Scopes the gradient ids. Must differ when two mascots share a page —
      SVG url(#id) resolves to the first match in the document. */
  idSuffix = 'a',
  title = 'The TinyLearn buddy — a friendly red character waving hello',
}: {
  className?: string
  animated?: boolean
  idSuffix?: string
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 320 380"
      role="img"
      aria-label={title}
      className={cn('h-full w-full', animated && 'motion-safe:animate-bob', className)}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={`buddyBody-${idSuffix}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2604E" />
          <stop offset="100%" stopColor="#E12E1E" />
        </linearGradient>
        <radialGradient id={`buddyGlow-${idSuffix}`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FFD24A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFD24A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft halo */}
      <ellipse cx="160" cy="200" rx="150" ry="150" fill={`url(#buddyGlow-${idSuffix})`} />

      {/* ground shadow */}
      <ellipse cx="160" cy="352" rx="88" ry="15" fill="#2A2320" opacity="0.12" />

      {/* antenna + spinning star */}
      <path d="M160 152 L160 96" stroke="#2A2320" strokeWidth="9" strokeLinecap="round" />
      <g
        className={animated ? 'motion-safe:animate-[spin_7s_linear_infinite]' : undefined}
        style={{ transformOrigin: '160px 72px' }}
      >
        <path
          d="M160 44 L171 65 L194 68 L177 84 L181 107 L160 96 L139 107 L143 84 L126 68 L149 65 Z"
          fill="#FFD24A"
          stroke="#2A2320"
          strokeWidth="8"
          strokeLinejoin="round"
        />
      </g>

      {/* feet */}
      <ellipse cx="126" cy="332" rx="32" ry="17" fill="#E12E1E" stroke="#2A2320" strokeWidth="8" />
      <ellipse cx="194" cy="332" rx="32" ry="17" fill="#E12E1E" stroke="#2A2320" strokeWidth="8" />

      {/* left arm */}
      <path d="M72 232 C46 220 40 258 62 272" stroke="#2A2320" strokeWidth="30" strokeLinecap="round" fill="none" />
      <path d="M72 232 C46 220 40 258 62 272" stroke="#E12E1E" strokeWidth="17" strokeLinecap="round" fill="none" />

      {/* right arm — the wave */}
      <g
        className={animated ? 'motion-safe:animate-[wave_2.4s_ease-in-out_infinite]' : undefined}
        style={{ transformOrigin: '246px 236px' }}
      >
        <path d="M248 232 C276 216 288 246 274 266" stroke="#2A2320" strokeWidth="30" strokeLinecap="round" fill="none" />
        <path d="M248 232 C276 216 288 246 274 266" stroke="#E12E1E" strokeWidth="17" strokeLinecap="round" fill="none" />
      </g>

      {/* squircle body */}
      <rect
        x="62"
        y="152"
        width="196"
        height="176"
        rx="62"
        fill={`url(#buddyBody-${idSuffix})`}
        stroke="#2A2320"
        strokeWidth="9"
      />

      {/* cheeks */}
      <ellipse cx="100" cy="258" rx="17" ry="11" fill="#F9BFD6" opacity="0.95" />
      <ellipse cx="220" cy="258" rx="17" ry="11" fill="#F9BFD6" opacity="0.95" />

      {/* eyes */}
      <g className={animated ? 'motion-safe:animate-[blink_5.5s_ease-in-out_infinite]' : undefined} style={{ transformOrigin: '160px 216px' }}>
        <circle cx="128" cy="216" r="31" fill="#FFFFFF" stroke="#2A2320" strokeWidth="8" />
        <circle cx="192" cy="216" r="31" fill="#FFFFFF" stroke="#2A2320" strokeWidth="8" />
        <circle cx="133" cy="221" r="13" fill="#2A2320" />
        <circle cx="197" cy="221" r="13" fill="#2A2320" />
        <circle cx="124" cy="209" r="6" fill="#FFFFFF" />
        <circle cx="188" cy="209" r="6" fill="#FFFFFF" />
      </g>

      {/* smile */}
      <path
        d="M136 272 Q160 296 184 272"
        stroke="#2A2320"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
