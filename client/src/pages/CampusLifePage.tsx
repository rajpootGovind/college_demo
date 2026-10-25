import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CampusGallery } from '../components/campus/gallery'
import { DemoNote } from '../components/shared/demo-note'
import { ImageWithFallback } from '../components/shared/image-with-fallback'
import { PageContainer, Section } from '../components/shared/page-container'
import { PageCTA } from '../components/shared/page-cta'
import { PageHero } from '../components/shared/page-hero'
import { Reveal } from '../components/shared/reveal'
import { SectionHeading } from '../components/shared/section-heading'
import { Badge } from '../components/ui/badge'
import { institution } from '../config/institution'
import { photo } from '../config/images'
import { usePageMeta } from '../lib/seo'

const safetyCommitments = [
  {
    title: 'A named adult for every learner',
    description:
      'Every cohort has a faculty mentor and a section coordinator. Families have a direct contact, not a general office number.',
  },
  {
    title: 'One secure entrance, supervised access',
    description:
      'Visitors sign in at reception, staff wear identification, and campus access is controlled during school hours.',
  },
  {
    title: 'A published anti-bullying process',
    description:
      'Concerns are logged, reviewed within a defined window, and followed up with both families. Records are kept centrally.',
  },
  {
    title: 'Counselling without a queue',
    description:
      'The wellbeing centre is staffed by a counselling psychologist and a school nurse, with same-day access where needed.',
  },
]

export default function CampusLifePage() {
  usePageMeta({
    title: 'Campus Life',
    description:
      'Explore the Aurevia campus: classrooms, library, laboratories, sport, performing arts, clubs and student wellbeing support.',
    path: '/campus-life',
    image: photo('studentsLaughing', 1200),
  })

  const { facilities, studentLife } = institution.content

  return (
    <>
      <PageHero
        eyebrow="Campus life"
        title="A campus that behaves like a community."
        description="Sport, performance, service and friendship are where many learners discover what they are capable of. This is how those parts of the week are built."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Campus Life' }]}
        aside={
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
            {[
              { value: '12', label: 'Acre single campus' },
              { value: '40+', label: 'Clubs & societies' },
              { value: '200m', label: 'Athletics track' },
              { value: '400', label: 'Seat auditorium' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold text-gold">{stat.value}</dd>
                <dd className="mt-1 text-[10px] uppercase leading-relaxed tracking-label text-ivory/45">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      <Section id="gallery" className="bg-white">
        <PageContainer>
          <SectionHeading
            index="01"
            eyebrow="Gallery"
            title="Look around before you visit."
            description="Filter by what you care about, then open any image for a closer look. On touch devices, tap a photograph to expand it."
          />
          <div className="mt-10">
            <CampusGallery />
          </div>
        </PageContainer>
      </Section>

      <Section className="border-y border-line bg-ivory">
        <PageContainer>
          <SectionHeading
            index="02"
            eyebrow="Beyond the timetable"
            title="Five programmes, timetabled properly."
            description="Co-curricular work is scheduled during the school day so that learners do not have to choose between a club and their homework."
          />

          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {studentLife.items.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.04}>
                <figure className="group">
                  <div className="overflow-hidden">
                    <ImageWithFallback
                      src={item.image.src}
                      alt={item.image.alt}
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 92vw"
                      className="aspect-[4/3] w-full"
                      imgClassName="transition-transform duration-[900ms] group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="mt-4 border-t border-line pt-4">
                    <h3 className="font-display text-[17px] font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate">
                      {item.description}
                    </p>
                    {item.image.caption && (
                      <p className="mt-2 text-[10px] uppercase tracking-label text-slate-soft">
                        {item.image.caption}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            ))}

            <Reveal delay={0.2} className="flex items-end">
              <div className="w-full border border-line bg-white p-6">
                <p className="font-display text-lg font-medium leading-snug text-ink">
                  Student-led, not staff-performed.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  Most clubs are proposed by learners, run by a student committee and supported by
                  a faculty advisor. The student council holds a real budget.
                </p>
                <Link to="/admissions#enquiry" className="link-arrow mt-5">
                  Ask about a specific activity
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-white">
        <PageContainer>
          <SectionHeading
            index="03"
            eyebrow="Facilities"
            title="Everything within a walk."
            description="Classrooms, laboratories, studios, library and playing fields sit on a single site, so time is spent learning rather than travelling."
          />

          <div className="mt-10 grid gap-x-10 border-t border-line sm:grid-cols-2">
            {facilities.map((facility, index) => (
              <Reveal
                key={facility.slug}
                delay={index * 0.03}
                className="flex gap-4 border-b border-line py-5"
              >
                <ImageWithFallback
                  src={facility.image.src}
                  alt={facility.image.alt}
                  sizes="96px"
                  className="size-20 shrink-0 sm:size-24"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-[15px] font-semibold text-ink">
                      {facility.title}
                    </h3>
                    <Badge variant="outline">{facility.tag}</Badge>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate">
                    {facility.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-ink">
        <PageContainer>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <ImageWithFallback
                src={photo('studentsCollaborating', 1200)}
                alt="Students talking with a mentor in the campus wellbeing space"
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="aspect-[4/5] w-full"
              />
            </div>

            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-4 text-gold" aria-hidden="true" />
                <p className="eyebrow-inverse">Safety & wellbeing</p>
              </div>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-ivory sm:text-[2.4rem]">
                A child who feels safe is a child who can learn.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/60">
                Pastoral care is not an add-on at Aurevia. It is a team, a timetable and a set of
                processes with names attached to them.
              </p>

              <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {safetyCommitments.map((item) => (
                  <li key={item.title} className="border-t border-white/12 pt-5">
                    <div className="flex items-center gap-2">
                      <Check className="size-3.5 text-gold" aria-hidden="true" />
                      <h3 className="font-display text-[14px] font-semibold text-ivory">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-ivory/55">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>

              <DemoNote variant="dark" className="mt-7">
                Safety statements describe a demonstration school policy. Verify all safeguarding
                arrangements with a real institution before relying on them.
              </DemoNote>
            </div>
          </div>
        </PageContainer>
      </Section>

      <PageCTA
        title="Walk the campus before you decide."
        description="Campus mornings run every Saturday during the admission season. Bring your questions — including the difficult ones."
        secondary={{ label: 'Contact the office', to: '/contact' }}
      />
    </>
  )
}
