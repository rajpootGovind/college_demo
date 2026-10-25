import { AlertTriangle, Loader2, SearchX } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'

export function LoadingState({
  label = 'Loading…',
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('flex items-center justify-center gap-3 py-16 text-sm text-slate', className)}
    >
      <Loader2 className="size-4 animate-spin text-teal" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

export function ErrorState({
  title = 'Something went wrong',
  description,
  actionLabel,
  onAction,
  className,
}: {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-start gap-4 border border-destructive/20 bg-destructive/[0.04] p-6',
        className,
      )}
    >
      <AlertTriangle className="size-5 text-destructive" aria-hidden="true" />
      <div>
        <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
        {description && <p className="mt-1 text-sm leading-relaxed text-slate">{description}</p>}
      </div>
      {actionLabel && onAction && (
        <Button type="button" variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className,
}: {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 border border-line bg-white px-6 py-16 text-center',
        className,
      )}
    >
      <SearchX className="size-6 text-slate-soft" aria-hidden="true" />
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="max-w-sm text-sm leading-relaxed text-slate">{description}</p>}
      {actionLabel && onAction && (
        <Button type="button" variant="ghost" size="sm" onClick={onAction} className="mt-1 underline">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
