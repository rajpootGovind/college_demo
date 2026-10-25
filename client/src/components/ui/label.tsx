import * as LabelPrimitive from '@radix-ui/react-label'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Label = forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn('block text-[13px] font-medium leading-5 text-ink', className)}
    {...props}
  />
))
Label.displayName = 'Label'
