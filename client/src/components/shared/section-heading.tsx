import { cn } from '../../lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  index?: string
  title: React.ReactNode
  description?: React.ReactNode
  inverse?: boolean
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  id?: string
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  inverse = false,
  align = 'left',
  className,
  titleClassName,
  descriptionClassName,
  id,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between',
        align === 'center' && 'items-center text-center lg:flex-col lg:items-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {(eyebrow || index) && (
          <div
            className={cn(
              'mb-5 flex items-center gap-3',
              align === 'center' && 'justify-center',
            )}
          >
            {index && (
              <span
                className={cn(
                  'text-[11px] font-semibold tracking-[0.2em]',
                  inverse ? 'text-ivory/40' : 'text-slate-soft/80',
                )}
              >
                {index}
              </span>
            )}
            {index && (
              <span className={cn('h-px w-8', inverse ? 'bg-white/20' : 'bg-ink/15')} />
            )}
            {eyebrow && (
              <span className={inverse ? 'eyebrow-inverse' : 'eyebrow'}>{eyebrow}</span>
            )}
          </div>
        )}
        <Heading
          id={id}
          className={cn(
            'font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[2.5rem] lg:text-[2.75rem]',
            inverse ? 'text-ivory' : 'text-ink',
            titleClassName,
          )}
        >
          {title}
        </Heading>
      </div>
      {description && (
        <div
          className={cn(
            'max-w-md text-[15px] leading-relaxed lg:pb-1.5',
            inverse ? 'text-ivory/70' : 'text-slate',
            align === 'center' && 'mx-auto text-center',
            descriptionClassName,
          )}
        >
          {description}
        </div>
      )}
    </div>
  )
}
