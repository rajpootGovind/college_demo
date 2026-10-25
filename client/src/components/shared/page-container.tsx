import { cn } from '../../lib/utils'

export function PageContainer({
  children,
  className,
  as: Comp = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'header' | 'footer' | 'main' | 'article'
}) {
  return (
    <Comp className={cn('mx-auto w-full max-w-content px-5 sm:px-8 lg:px-10', className)}>
      {children}
    </Comp>
  )
}

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={cn('scroll-mt-28 py-16 sm:py-20 lg:py-24', className)}>
      {children}
    </section>
  )
}
