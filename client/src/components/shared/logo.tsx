import { cn } from '../../lib/utils'
import { institution } from '../../config/institution'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={cn('size-9 shrink-0', className)}
      fill="none"
    >
      <rect x="0.6" y="0.6" width="38.8" height="38.8" rx="2.4" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M20 6.5 31.2 33h-4.4L20 16.2 13.2 33H8.8L20 6.5Z" fill="#D6AE66" />
      <path d="M15.4 25.9h9.2l1.5 3.4H13.9l1.5-3.4Z" fill="currentColor" opacity="0.9" />
    </svg>
  )
}

interface LogoProps {
  variant?: 'dark' | 'light'
  compact?: boolean
  className?: string
}

export function Logo({ variant = 'dark', compact = false, className }: LogoProps) {
  const isLight = variant === 'light'

  return (
    <span className={cn('flex items-center gap-3', className)}>
      <LogoMark className={isLight ? 'text-ivory' : 'text-ink'} />
      <span className="flex flex-col">
        <span
          className={cn(
            'font-display text-[15px] font-extrabold leading-none tracking-[0.24em]',
            isLight ? 'text-ivory' : 'text-ink',
          )}
        >
          {institution.identity.wordmark}
        </span>
        {!compact && (
          <span
            className={cn(
              'mt-1.5 text-[8px] font-medium uppercase leading-none tracking-[0.28em]',
              isLight ? 'text-ivory/65' : 'text-slate',
            )}
          >
            {institution.identity.wordmarkSub}
          </span>
        )}
      </span>
    </span>
  )
}
