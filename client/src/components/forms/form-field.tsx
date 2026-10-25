import { cn } from '../../lib/utils'
import { Label } from '../ui/label'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  optional?: boolean
  className?: string
  children: React.ReactNode
}

export function FormField({
  id,
  label,
  error,
  hint,
  required,
  optional,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id}>
          {label}
          {required && (
            <span className="ml-1 text-teal" aria-hidden="true">
              *
            </span>
          )}
          {required && <span className="sr-only"> (required)</span>}
        </Label>
        {optional && (
          <span className="text-[10px] uppercase tracking-label text-slate-soft">Optional</span>
        )}
      </div>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-[11px] leading-relaxed text-slate-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium leading-relaxed text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function fieldDescribedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`
  if (hint) return `${id}-hint`
  return undefined
}
