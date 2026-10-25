import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumbs({
  items,
  variant = 'light',
  className,
}: {
  items: Crumb[]
  variant?: 'light' | 'dark'
  className?: string
}) {
  const isLight = variant === 'light'

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-label">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight
                  className={cn('size-3', isLight ? 'text-ivory/35' : 'text-slate-soft/60')}
                  aria-hidden="true"
                />
              )}
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className={cn(
                    'transition-colors',
                    isLight ? 'text-ivory/65 hover:text-ivory' : 'text-slate hover:text-teal',
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(isLight ? 'text-gold' : 'text-ink')}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
