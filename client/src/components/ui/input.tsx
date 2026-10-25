import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn('field-base h-12', className)} {...props} />
))
Input.displayName = 'Input'
