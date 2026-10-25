import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { institution } from '../../config/institution'
import { PageContainer } from './page-container'

export function PageCTA({
  eyebrow = `Admissions ${institution.announcement.academicYear}`,
  title,
  description,
  primary = { label: 'Begin admission enquiry', to: '/admissions#enquiry' },
  secondary,
}: {
  eyebrow?: string
  title: React.ReactNode
  description: string
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-ivory sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_100%_at_100%_0%,rgba(214,174,102,0.18),transparent_60%)]"
      />
      <PageContainer className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <p className="eyebrow-inverse">{eyebrow}</p>
            </div>
            <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.02em] text-ivory sm:text-[2.5rem]">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/65 sm:text-[15px]">
              {description}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              to={primary.to}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink transition-colors hover:bg-gold-dark"
            >
              {primary.label}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            {secondary && (
              <Link
                to={secondary.to}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-semibold text-ivory transition-colors hover:border-white hover:bg-white hover:text-ink"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
