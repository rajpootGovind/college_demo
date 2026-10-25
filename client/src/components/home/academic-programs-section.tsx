import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { institution } from '../../config/institution'
import { ImageWithFallback } from '../shared/image-with-fallback'
import { PageContainer, Section } from '../shared/page-container'
import { Reveal } from '../shared/reveal'
import { SectionHeading } from '../shared/section-heading'

export function AcademicProgramsSection() {
  return (
    <Section className="bg-ivory">
      <PageContainer>
        <SectionHeading
          index="01"
          eyebrow="Academic stages"
          title="Four stages. One continuous journey."
          description={
            <>
              Each stage has its own rhythm, teachers and spaces — designed so learners are
              stretched without being rushed.{' '}
              <Link
                to="/academics"
                className="font-medium text-teal underline decoration-teal/30 underline-offset-4 hover:decoration-teal"
              >
                See the full academic programme
              </Link>
              .
            </>
          }
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {institution.content.programs.map((program, index) => (
            <Reveal key={program.slug} delay={index * 0.06}>
              <Link
                to={`/academics/${program.slug}`}
                className="group relative block overflow-hidden bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                <ImageWithFallback
                  src={program.image.src}
                  alt={program.image.alt}
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 92vw"
                  className="aspect-[4/5] w-full"
                  imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/5 transition-colors duration-300 group-hover:from-ink"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-ink/20 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-label text-ivory/80 backdrop-blur-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[9px] font-semibold uppercase tracking-label text-gold">
                    {program.stage}
                  </p>
                  <h3 className="mt-2 font-display text-[1.35rem] font-semibold leading-tight text-ivory">
                    {program.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-ivory/65">{program.grades}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-3">
                    <span className="text-[10px] uppercase tracking-label text-ivory/60">
                      Explore stage
                    </span>
                    <ArrowUpRight
                      className="size-4 text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate">
            Unsure where your child would begin? Our admissions team will help you place them.
          </p>
          <Link to="/admissions" className="link-arrow shrink-0">
            Talk to admissions
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </PageContainer>
    </Section>
  )
}
