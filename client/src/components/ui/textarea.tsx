import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 4, ...props }, ref) => (
    <textarea ref={ref} rows={rows} className={cn('field-base py-3', className)} {...props} />
  ),
)
Textarea.displayName = 'Textarea'
