import { Info } from 'lucide-react'
import { cn } from '../../lib/utils'
import { institution } from '../../config/institution'

export function DemoNote({
  children = institution.demo.sampleDataNote,
  variant = 'light',
  className,
}: {
  children?: React.ReactNode
  variant?: 'light' | 'dark'
  className?: string
}) {
  return (
    <p
      className={cn(
        'flex items-start gap-2 text-xs leading-relaxed',
        variant === 'dark' ? 'text-ivory/50' : 'text-slate-soft',
        className,
      )}
    >
      <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
