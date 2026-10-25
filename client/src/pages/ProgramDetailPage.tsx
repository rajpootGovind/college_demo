import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ImageWithFallback } from '../components/shared/image-with-fallback'
import { PageContainer, Section } from '../components/shared/page-container'
import { PageCTA } from '../components/shared/page-cta'
import { PageHero } from '../components/shared/page-hero'
import { Reveal } from '../components/shared/reveal'
import { SectionHeading } from '../components/shared/section-heading'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { institution } from '../config/institution'
import { usePageMeta } from '../lib/seo'
import NotFoundPage from './NotFoundPage'

export default function ProgramDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { programs } = institution.content
  const index = programs.findIndex((item) => item.slug === slug)
  const program = programs[index]

  usePageMeta({
    title: program ? `${program.name} (${program.grades})` : 'Stage not found',
    description:
      program?.summary ??
      'The academic stage you were looking for could not be found. Browse all stages at Aurevia International School.',
    path: `/academics/${slug ?? ''}`,
    image: program?.image.src,
    noIndex: !program,
  })

  if (!program) {
    return <NotFoundPage />
  }

  const previous = programs[(index - 1 + programs.length) % programs.length]
  const next = programs[(index + 1) % programs.length]

  return (
    <>
      <PageHero
        eyebrow={program.stage}
        title={program.name}
        description={program.summary}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Academics', to: '/academics' },
          { label: program.name },
        ]}
        aside={
          <div className="space-y-4">
            <dl className="space-y-3">
              {[
                { label: 'Grades', value: program.grades },
                { label: 'Ages', value: program.ages },
                { label: 'Curriculum', value: 'CBSE-aligned (demo)' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3"
                >
                  <dt className="text-[10px] uppercase tracking-label text-ivory/40">
                    {item.label}
                  </dt>
                  <dd className="text-right text-[13px] font-medium text-ivory/85">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <Button asChild variant="gold" className="w-full">
              <Link
                to={`/admissions?program=${encodeURIComponent(
                  `${program.name} (${program.grades})`,
                )}#enquiry`}
              >
                Enquire for this stage
              </Link>
            </Button>
          </div>
        }
      />

      <Section className="bg-white">
        <PageContainer>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <span className="eyebrow">The approach</span>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.4rem]">
                What {program.name.toLowerCase()} looks like here.
              </h2>
              <p className="mt-5 text-[15px] leading-[1.85] text-slate">{program.intro}</p>

              <div className="mt-8">
                <h3 className="text-[10px] font-semibold uppercase tracking-label text-slate-soft">
                  What stands out
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {program.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-slate">
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-teal-soft text-teal">
                        <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Reveal className="lg:col-span-5">
              <ImageWithFallback
                src={program.image.src}
                alt={program.image.alt}
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="aspect-[4/5] w-full"
              />
              <p className="mt-3 border-t border-line pt-3 text-[10px] uppercase tracking-label text-slate-soft">
                {program.stage} · {program.grades}
              </p>
            </Reveal>
          </div>
        </PageContainer>
      </Section>

      <Section className="border-y border-line bg-ivory">
        <PageContainer>
          <SectionHeading
            eyebrow="Subjects"
            title="What learners study."
            description="The subject list below is indicative for this demonstration. A real school would publish its confirmed curriculum and option blocks here."
          />

          <div className="mt-10 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            {program.subjects.map((subject, itemIndex) => (
              <div
                key={subject}
                className="flex items-baseline gap-4 border-t border-line py-4"
              >
                <span className="font-display text-[10px] tracking-[0.2em] text-slate-soft">
                  {String(itemIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium text-ink">{subject}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-slate-soft">
            Elective availability varies by cohort size and timetable. Subject counselling is part
            of the admission process.
          </p>
        </PageContainer>
      </Section>

      <Section className="bg-white">
        <PageContainer>
          <SectionHeading
            eyebrow="How we teach"
            title={`Three commitments in ${program.name.toLowerCase()}.`}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            {program.approach.map((item, approachIndex) => (
              <Reveal
                key={item.title}
                delay={approachIndex * 0.05}
                className="border-t border-ink/15 pt-6"
              >
                <Badge variant="navy">{String(approachIndex + 1).padStart(2, '0')}</Badge>
                <h3 className="mt-4 font-display text-[17px] font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </PageContainer>
      </Section>

      <div className="bg-white">
        <PageContainer className="pb-16">
          <div className="flex flex-col justify-between gap-6 border-t border-line pt-6 sm:flex-row sm:items-center">
            <Link to={`/academics/${previous.slug}`} className="group flex items-center gap-3">
              <ArrowLeft className="size-4 text-teal transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              <span>
                <span className="block text-[10px] uppercase tracking-label text-slate-soft">
                  Previous stage
                </span>
                <span className="mt-0.5 block text-sm font-medium text-ink group-hover:text-teal">
                  {previous.name}
                </span>
              </span>
            </Link>
            <Link
              to={`/academics/${next.slug}`}
              className="group flex items-center gap-3 text-right sm:justify-end"
            >
              <span>
                <span className="block text-[10px] uppercase tracking-label text-slate-soft">
                  Next stage
                </span>
                <span className="mt-0.5 block text-sm font-medium text-ink group-hover:text-teal">
                  {next.name}
                </span>
              </span>
              <ArrowRight className="size-4 text-teal transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </PageContainer>
      </div>

      <PageCTA
        title={`Considering ${program.name.toLowerCase()} for your child?`}
        description={`Admissions for ${institution.announcement.academicYear} are open, subject to seat availability. Start with a short enquiry and we will guide you through the stage-specific process.`}
        secondary={{ label: 'See the admission process', to: '/admissions#process' }}
      />
    </>
  )
}
