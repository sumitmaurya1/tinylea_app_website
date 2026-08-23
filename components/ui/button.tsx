import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[transform,box-shadow,background-color,color] duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus)]/40',
  {
    variants: {
      variant: {
        /** The deep indigo pill — one per screen. */
        primary:
          'bg-[var(--brand-deep)] text-white shadow-cta hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(120,25,15,0.42)] dark:bg-[var(--brand)] dark:text-[#1d1512]',
        /** Soft lavender pill — the nav CTA and secondary actions. */
        secondary:
          'bg-[var(--tint)] text-[var(--ink)] hover:-translate-y-0.5 hover:bg-[var(--tint-deep)] hover:shadow-soft',
        outline:
          'border-2 border-[var(--ink)]/12 bg-[var(--surface)] text-[var(--ink)] hover:-translate-y-0.5 hover:border-[var(--brand)] hover:text-[var(--brand)]',
        sun: 'bg-[var(--sun)] text-[#2a2320] shadow-[0_14px_32px_rgba(255,210,74,0.42)] hover:-translate-y-0.5',
        ghost: 'text-[var(--ink)] hover:bg-[var(--tint)]',
        link: 'rounded-md text-[var(--brand)] underline underline-offset-4 hover:opacity-80',
      },
      size: {
        sm: 'h-10 px-5 text-xs',
        md: 'h-12 px-6 text-sm',
        lg: 'h-14 px-9 text-base',
        xl: 'h-16 px-11 text-lg',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { buttonVariants }
