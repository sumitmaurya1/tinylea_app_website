import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.75rem', lg: '2.5rem' },
      screens: { '2xl': '1220px' },
    },
    extend: {
      colors: {
        ink: { DEFAULT: 'var(--ink)', soft: 'var(--ink-soft)' },
        brand: {
          DEFAULT: 'var(--brand)',
          soft: 'var(--brand-soft)',
          deep: 'var(--brand-deep)',
        },
        tint: { DEFAULT: 'var(--tint)', deep: 'var(--tint-deep)' },
        sun: { DEFAULT: 'var(--sun)', soft: 'var(--sun-soft)' },
        mint: { DEFAULT: 'var(--mint)', soft: 'var(--mint-soft)' },
        blush: { DEFAULT: 'var(--blush)', soft: 'var(--blush-soft)' },
        sky: { DEFAULT: 'var(--sky)', soft: 'var(--sky-soft)' },
        surface: { DEFAULT: 'var(--surface)', 2: 'var(--surface-2)' },
        shell: 'var(--shell-bg)',
        glass: { DEFAULT: 'var(--glass-bg)', border: 'var(--glass-border)' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Trebuchet MS', 'system-ui', 'sans-serif'],
        // Baloo 2 sits in the body stack as the Devanagari fallback — Nunito has no देवनागरी.
        sans: ['var(--font-body)', 'var(--font-display)', 'system-ui', '-apple-system', 'sans-serif'],
        script: ['var(--font-script)', 'Segoe Script', 'cursive'],
      },
      fontSize: {
        // 14 / 16 / 18 / 20 / 24 / 32 / 44 / 64 / 88 scale
        xs: ['0.875rem', { lineHeight: '1.5' }],
        sm: ['1rem', { lineHeight: '1.5' }],
        base: ['1.0625rem', { lineHeight: '1.6' }],
        lg: ['1.25rem', { lineHeight: '1.55' }],
        xl: ['1.5rem', { lineHeight: '1.3' }],
        '2xl': ['2rem', { lineHeight: '1.15' }],
        '3xl': ['2.75rem', { lineHeight: '1.08' }],
        '4xl': ['3.75rem', { lineHeight: '1.03' }],
        '5xl': ['5rem', { lineHeight: '1' }],
      },
      borderRadius: {
        glass: '28px',
        tile: '32px',
        shell: '44px',
        blob: '40% 60% 55% 45% / 55% 45% 60% 40%',
      },
      boxShadow: {
        glass: 'var(--glass-shadow)',
        'glass-lift': '0 28px 62px rgba(59,40,137,0.18)',
        soft: '0 8px 22px rgba(43,31,99,0.14)',
        cta: '0 16px 36px rgba(43,31,99,0.32)',
      },
      backdropBlur: { glass: 'var(--glass-blur)' },
      keyframes: {
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) rotate(-3deg)' },
          '50%': { transform: 'translate3d(0,-16px,0) rotate(3deg)' },
        },
        twinkle: { '0%,100%': { opacity: '0.35', transform: 'scale(0.85)' }, '50%': { opacity: '1', transform: 'scale(1)' } },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'draw-line': { from: { strokeDashoffset: '260' }, to: { strokeDashoffset: '0' } },
      },
      animation: {
        bob: 'bob 4s ease-in-out infinite',
        drift: 'drift 9s ease-in-out infinite',
        twinkle: 'twinkle 2.6s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.25s ease-out',
        'accordion-up': 'accordion-up 0.25s ease-out',
        'draw-line': 'draw-line 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s both',
      },
      typography: null,
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
