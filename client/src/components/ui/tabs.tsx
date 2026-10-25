import * as TabsPrimitive from '@radix-ui/react-tabs'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Tabs = TabsPrimitive.Root

export const TabsList = forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1 border-b border-line pb-px',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = 'TabsList'

export const TabsTrigger = forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      '-mb-px border-b-2 border-transparent px-4 py-3 text-sm font-medium text-slate transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 data-[state=active]:border-teal data-[state=active]:font-semibold data-[state=active]:text-ink',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = 'TabsTrigger'

export const TabsContent = forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('mt-6 focus-visible:outline-none', className)}
    {...props}
  />
))
TabsContent.displayName = 'TabsContent'
