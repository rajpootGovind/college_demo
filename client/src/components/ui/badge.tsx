import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase leading-none tracking-[0.14em]',
  {
    variants: {
      variant: {
        default: 'bg-teal-soft text-teal-dark',
        gold: 'bg-gold-soft text-gold-dark',
        navy: 'bg-ink/5 text-ink',
        inverse: 'bg-white/10 text-ivory backdrop-blur-sm',
        outline: 'border border-ink/15 text-slate',
        demo: 'bg-gold/15 text-gold-dark',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
