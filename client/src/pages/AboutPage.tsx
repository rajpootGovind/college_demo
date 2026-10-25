import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
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

const facts = [
  { label: 'Established', value: institution.identity.established },
  { label: 'Curriculum', value: 'CBSE · Nursery to Grade XII' },
  { label: 'Location', value: 'Sector 128, Noida' },
  { label: 'Campus', value: '12 acres · one site' },
]

export default function AboutPage() {
  const { about, content } = institution
  const { values, leadership, milestones } = content

  usePageMeta({
    title: 'About Us',
    description:
      'The story, philosophy and people behind Aurevia International School in Noida — a fictional institution created for website demonstrations.',
    path: '/about',
    image: photo('libraryCollaboration', 1200),
  })

  return (
    <>
      <PageHero
        eyebrow="About Aurevia"
        title="A school built with intention, not imitation."
        description="Aurevia is a demonstration institution created to show how a premium Indian school can present its story, its people and its standards online."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
        aside={
          <dl className="space-y-3">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0">
                <dt className="text-[10px] uppercase tracking-label text-ivory/40">{fact.label}</dt>
                <dd className="text-right text-[13px] font-medium text-ivory/85">{fact.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <Section className="bg-white">
        <PageContainer>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <ImageWithFallback
                src={photo('campusClassic', 1200)}
                alt="Aurevia campus building and lawns in daylight"
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="aspect-[4/5] w-full"
              />
              <div className="mt-3 flex items-center justify-between gap-4 border-t border-line pt-3">
                <p className="text-[10px] uppercase tracking-label text-slate-soft">
                  The campus at Sector 128, Noida
                </p>
                <Badge variant="outline">Demo imagery</Badge>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Our story"
                title="Small classes, serious teaching, and room to be a child."
              />
              <div className="mt-6 space-y-4">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[15px] leading-[1.85] text-slate">
                    {paragraph}
                  </p>
                ))}
                <p className="text-[15px] leading-[1.85] text-slate">
                  The school was founded on a simple observation: parents are rarely short of
                  information about a school, but they are often short of honesty. We have tried to
                  build a place that answers questions directly, publishes its results in context,
                  and tells a family what they need to hear rather than what sounds best.
                </p>
              </div>

              <div className="mt-8 grid gap-6 border-t border-line pt-7 sm:grid-cols-2">
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-label text-gold-dark">
                    Our vision
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{about.vision}</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-label text-teal">
                    Our mission
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{about.mission}</p>
                </div>
              </div>

              <DemoNote className="mt-8">
                Aurevia International School is fictional. This page demonstrates the structure and
                tone of a school story page — it is not a real institution.
              </DemoNote>
            </div>
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-ivory">
        <PageContainer>
          <SectionHeading
            index="01"
            eyebrow="What we value"
            title="Five expectations, held equally."
            description="Values only matter if they change decisions. These are written to be usable in a staff meeting, not just on a wall."
          />
          <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.04} className="border-t border-ink/15 pt-5">
                <span className="font-display text-[11px] font-semibold tracking-[0.2em] text-gold-dark">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate">{value.description}</p>
              </Reveal>
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-ink">
        <PageContainer>
          <SectionHeading
            inverse
            index="02"
            eyebrow="How we teach"
            title="A method families can actually see."
            description="Teaching approach is not a secret. These are the four commitments we hold ourselves to in every section of the school."
          />
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {about.approach.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05} className="border-t border-white/12 pt-6">
                <h3 className="font-display text-[17px] font-semibold text-ivory">{item.title}</h3>
                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ivory/60">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section id="leadership" className="bg-white">
        <PageContainer>
          <SectionHeading
            index="03"
            eyebrow="Leadership & faculty"
            title="The people accountable for your child’s year."
            description="A named leadership team, a mentor for every cohort, and subject specialists who teach their own classes."
          />
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person, index) => (
              <Reveal key={person.name} delay={index * 0.04}>
                <ImageWithFallback
                  src={person.image.src}
                  alt={person.image.alt}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="aspect-[4/5] w-full"
                />
                <div className="mt-4 border-t border-line pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-[17px] font-semibold text-ink">
                        {person.name}
                      </h3>
                      <p className="mt-1 text-xs text-teal">{person.role}</p>
                    </div>
                    <Badge variant="navy">{person.focus}</Badge>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-slate">{person.bio}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.2} className="flex items-end">
              <div className="w-full border border-line bg-ivory p-6">
                <p className="font-display text-lg font-medium leading-snug text-ink">
                  Want to meet the faculty before you apply?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  Campus mornings include a conversation with the Head of Section and the teachers
                  your child would work with.
                </p>
                <Link to="/admissions#enquiry" className="link-arrow mt-5">
                  Book a campus visit
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-ivory">
        <PageContainer>
          <SectionHeading
            index="04"
            eyebrow="Milestones"
            title="A short institutional history."
            description="Aurevia is a young school. The timeline is deliberately modest — and labelled as sample content."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, index) => (
              <Reveal key={milestone.year} delay={index * 0.05}>
                <div className="border-t-2 border-gold pt-5">
                  <p className="font-display text-2xl font-semibold text-ink">{milestone.year}</p>
                  <h3 className="mt-4 font-display text-[15px] font-semibold text-ink">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate">
                    {milestone.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-white">
        <PageContainer>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Campus overview"
                title="One site. Everything within a walk."
                description="Classrooms, laboratories, library, studios and playing fields sit on a single 12-acre campus, so the school day is not spent in transit."
              />
              <Link to="/campus-life" className="link-arrow mt-6">
                Explore campus life
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
              {[
                { src: photo('libraryShelves', 800), alt: 'Library shelves at Aurevia' },
                { src: photo('auditorium', 800), alt: 'Aurevia auditorium seating' },
                { src: photo('trackSprint', 800), alt: 'Athletics track at Aurevia' },
              ].map((image) => (
                <ImageWithFallback
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  sizes="(min-width: 1024px) 18vw, 30vw"
                  className="aspect-[3/4] w-full"
                />
              ))}
            </div>
          </div>
        </PageContainer>
      </Section>

      <PageCTA
        title="See whether the school feels right in person."
        description="A campus morning is the quickest way to judge a school. Meet the faculty, walk the corridors and ask the awkward questions."
        secondary={{ label: 'Contact the office', to: '/contact' }}
      />
    </>
  )
}
