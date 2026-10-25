import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { institution } from '../../config/institution'
import { ImageWithFallback } from '../shared/image-with-fallback'
import { PageContainer } from '../shared/page-container'
import { Button } from '../ui/button'

export function HeroSection() {
  const { hero, announcement, identity } = institution

  return (
    <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-ink pb-0 pt-32 text-ivory sm:pt-36">
      <ImageWithFallback
        src={hero.image.src}
        alt={hero.image.alt}
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full"
        imgClassName="object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-hero-veil"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/80 to-transparent"
      />

      <PageContainer className="relative flex w-full flex-1 flex-col justify-end">
        <div className="max-w-3xl pb-12 pt-8 sm:pb-16">
          {announcement.isOpen && (
            <Link
              to="/admissions"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-label text-ivory/85 backdrop-blur transition-colors hover:border-gold/60 hover:text-ivory sm:text-[11px]"
            >
              <span className="relative flex size-1.5" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-soft-pulse rounded-full bg-gold" />
                <span className="relative inline-flex size-1.5 rounded-full bg-gold" />
              </span>
              {announcement.label}
              <ArrowUpRight className="size-3 text-gold transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}

          <div className="mt-7 flex items-center gap-3">
            <span className="h-px w-10 bg-gold/80" aria-hidden="true" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-[11px]">
              {hero.eyebrow}
            </p>
          </div>

          <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] text-shadow-hero sm:text-[3.6rem] lg:text-[4.4rem]">
            <span className="block text-ivory">{hero.headlineLead}</span>
            <span className="block text-gold">{hero.headlineAccent}</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ivory/75 sm:text-[17px]">
            {hero.supporting}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="gold" size="lg" className="group w-full sm:w-auto">
              <Link to={hero.primaryCta.to}>
                {hero.primaryCta.label}
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outlineLight"
              size="lg"
              className="w-full backdrop-blur-sm sm:w-auto"
            >
              <Link to={hero.secondaryCta.to}>{hero.secondaryCta.label}</Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-white/15">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-6 py-6 sm:grid-cols-4 sm:gap-0 sm:py-7">
            {hero.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={
                  index === 0
                    ? 'sm:px-0'
                    : 'sm:border-l sm:border-white/15 sm:pl-6 lg:pl-8'
                }
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-xl font-semibold tracking-[-0.01em] text-ivory sm:text-[1.6rem]">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[10px] uppercase leading-relaxed tracking-label text-ivory/50">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex items-center justify-between gap-4 border-t border-white/10 py-3">
            <p className="text-[9px] uppercase tracking-label text-ivory/35">
              {hero.statsNote}
            </p>
            <p className="hidden text-[10px] uppercase tracking-label text-ivory/40 sm:block">
              {identity.locationLabel} · Est. {identity.established}
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
