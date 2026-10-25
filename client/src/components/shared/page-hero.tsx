import { cn } from '../../lib/utils'
import { Breadcrumbs, type Crumb } from './breadcrumbs'
import { PageContainer } from './page-container'

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  breadcrumbs: Crumb[]
  aside?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  aside,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden bg-ink pb-14 pt-32 text-ivory sm:pb-16 sm:pt-36', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_85%_-10%,rgba(214,174,102,0.16),transparent_60%),radial-gradient(60%_90%_at_0%_110%,rgba(22,125,120,0.22),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-24 hidden select-none font-display text-[8rem] font-extrabold leading-none tracking-[0.08em] text-white/[0.035] lg:block"
      >
        AUREVIA
      </div>

      <PageContainer className="relative">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className={cn(aside ? 'lg:col-span-8' : 'lg:col-span-10')}>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
              <span className="eyebrow-inverse">{eyebrow}</span>
            </div>
            <h1 className="font-display text-[2.25rem] font-semibold leading-[1.04] tracking-[-0.02em] text-ivory sm:text-[3.25rem] lg:text-[3.75rem]">
              {title}
            </h1>
            {description && (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/70 sm:text-[17px]">
                {description}
              </p>
            )}
          </div>

          {aside && (
            <div className="border-t border-white/10 pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {aside}
            </div>
          )}
        </div>

        {children}
      </PageContainer>
    </section>
  )
}
