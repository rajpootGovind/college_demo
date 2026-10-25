import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-teal text-white hover:bg-teal-dark active:bg-teal-dark',
        ink: 'bg-ink text-ivory hover:bg-ink-soft active:bg-ink-deep',
        outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-ivory',
        outlineLight:
          'border border-white/35 text-white hover:border-white hover:bg-white hover:text-ink',
        light: 'bg-ivory text-ink hover:bg-white',
        gold: 'bg-gold text-ink hover:bg-gold-dark',
        ghost: 'text-ink hover:bg-ink/5',
        link: 'h-auto rounded-none p-0 text-teal underline-offset-4 hover:underline',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
      },
      size: {
        default: 'h-12 px-6 text-sm',
        sm: 'h-10 px-4 text-[13px]',
        lg: 'h-14 px-8 text-[15px]',
        icon: 'h-10 w-10',
        none: 'h-auto p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }
