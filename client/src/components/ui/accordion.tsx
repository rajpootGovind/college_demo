import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Accordion = AccordionPrimitive.Root

export const AccordionItem = forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b border-line last:border-b-0', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex flex-1 items-start justify-between gap-6 py-5 text-left font-display text-[17px] font-semibold leading-6 text-ink transition-colors hover:text-teal [&[data-state=open]>svg]:rotate-45',
        className,
      )}
      {...props}
    >
      {children}
      <Plus
        className="mt-0.5 size-5 shrink-0 text-teal transition-transform duration-300"
        aria-hidden="true"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent = forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-6 pr-10 text-[15px] leading-relaxed text-slate', className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = 'AccordionContent'
