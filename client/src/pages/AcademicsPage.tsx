import { ArrowRight, BookOpen, FlaskConical, GraduationCap, Library } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DemoNote } from '../components/shared/demo-note'
import { ImageWithFallback } from '../components/shared/image-with-fallback'
import { PageContainer, Section } from '../components/shared/page-container'
import { PageCTA } from '../components/shared/page-cta'
import { PageHero } from '../components/shared/page-hero'
import { Reveal } from '../components/shared/reveal'
import { SectionHeading } from '../components/shared/section-heading'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { institution } from '../config/institution'
import { photo } from '../config/images'
import { usePageMeta } from '../lib/seo'

const framework = [
  {
    value: 'curriculum',
    label: 'Curriculum',
    title: 'CBSE structure, taught with context.',
    body: 'The CBSE syllabus gives us a clear sequence of knowledge and skills. How that sequence is taught is a school decision — and we choose depth, discussion and application over speed.',
    points: [
      'Subject specialists teach their own discipline from Grade VI onwards.',
      'Units are planned backwards from what learners should be able to do.',
      'Interdisciplinary projects run alongside subject teaching each term.',
      'Hindi and Sanskrit are offered with support for new learners.',
    ],
  },
  {
    value: 'assessment',
    label: 'Assessment',
    title: 'Fewer surprises, more useful feedback.',
    body: 'Assessment should tell a learner what to do next. We use short, frequent checks rather than a single high-stakes test at the end of a term.',
    points: [
      'Fortnightly formative checks in core subjects from Grade VI.',
      'Written progress summaries shared before every parent conference.',
      'No ranking of children or public display of marks.',
      'Board examination preparation begins in Grade IX with full transparency.',
    ],
  },
  {
    value: 'support',
    label: 'Learning support',
    title: 'Support built into the timetable.',
    body: 'Learning support is a normal part of school, not a separate track. Our team works with teachers to adapt materials and with learners to build specific skills.',
    points: [
      'Individual education plans where a need is identified.',
      'In-class support and small-group clinics during school hours.',
      'English language support for new arrivals.',
      'Counselling and wellbeing access without a referral queue.',
    ],
  },
  {
    value: 'digital',
    label: 'Digital learning',
    title: 'Devices as tools, not as the lesson.',
    body: 'Technology is used where it genuinely improves the work: research, modelling, making and feedback. It does not replace handwriting, reading on paper or conversation.',
    points: [
      'One-to-one devices from Grade VI, stored on campus.',
      'A digital citizenship curriculum from Grade IV.',
      'No personal phones during the school day.',
      'Coding, robotics and design in the innovation studio.',
    ],
  },
]

const resources = [
  {
    icon: Library,
    title: 'Library & research',
    description:
      '14,000 volumes, a research desk staffed each afternoon, and a student-curated display shelf.',
  },
  {
    icon: FlaskConical,
    title: 'Laboratories',
    description:
      'Separate physics, chemistry and biology laboratories with technicians present at every practical.',
  },
  {
    icon: GraduationCap,
    title: 'University guidance',
    description:
      'A dedicated guidance office working with every Grade XI and XII learner from the first term.',
  },
]

export default function AcademicsPage() {
  usePageMeta({
    title: 'Academics',
    description:
      'Explore academic stages, curriculum approach, faculty and learning resources at Aurevia International School, Nursery to Grade XII.',
    path: '/academics',
    image: photo('scienceLab', 1200),
  })

  const { programs, leadership } = institution.content

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="A curriculum with depth — and room to breathe."
        description="From Nursery to Grade XII, our academic programme is sequenced carefully, taught by subject specialists and supported by a team that knows every learner by name."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Academics' }]}
        aside={
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-label text-gold">
              Stages at a glance
            </p>
            <ul className="mt-4 space-y-3">
              {programs.map((program) => (
                <li key={program.slug}>
                  <Link
                    to={`/academics/${program.slug}`}
                    className="group flex items-baseline justify-between gap-3 border-b border-white/10 pb-3 text-sm text-ivory/75 transition-colors hover:text-ivory"
                  >
                    <span>{program.name}</span>
                    <span className="shrink-0 text-[11px] text-ivory/45">{program.grades}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Section className="bg-white">
        <PageContainer>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Academic framework"
                title="What an Aurevia education is built on."
                description="Four decisions shape the academic experience here. Open each one to see how it works in practice."
              />
              <DemoNote className="mt-6">
                Curriculum notes describe a demonstration school. No real CBSE affiliation,
                approval or examination result is claimed.
              </DemoNote>
            </div>

            <Reveal className="lg:col-span-7" delay={0.05}>
              <Tabs defaultValue="curriculum">
                <TabsList aria-label="Academic framework">
                  {framework.map((item) => (
                    <TabsTrigger key={item.value} value={item.value}>
                      {item.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {framework.map((item) => (
                  <TabsContent key={item.value} value={item.value}>
                    <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate">
                      {item.body}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm text-slate">
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-gold"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                ))}
              </Tabs>
            </Reveal>
          </div>
        </PageContainer>
      </Section>

      <Section className="border-y border-line bg-ivory">
        <PageContainer>
          <SectionHeading
            index="01"
            eyebrow="Academic stages"
            title="Choose a stage to see the detail."
            description="Each stage page covers subjects, teaching approach and what a typical week looks like."
          />

          <div className="mt-10 space-y-0">
            {programs.map((program, index) => (
              <Reveal key={program.slug} delay={index * 0.04}>
                <article className="grid items-center gap-8 border-t border-line py-10 last:border-b lg:grid-cols-12 lg:gap-12 lg:py-12">
                  <div
                    className={
                      index % 2 === 0
                        ? 'lg:col-span-5'
                        : 'lg:col-span-5 lg:order-2'
                    }
                  >
                    <Link
                      to={`/academics/${program.slug}`}
                      className="group block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                    >
                      <ImageWithFallback
                        src={program.image.src}
                        alt={program.image.alt}
                        sizes="(min-width: 1024px) 38vw, 92vw"
                        className="aspect-[16/11] w-full"
                        imgClassName="transition-transform duration-[900ms] group-hover:scale-[1.03]"
                      />
                    </Link>
                  </div>

                  <div className={index % 2 === 0 ? 'lg:col-span-7' : 'lg:col-span-7 lg:order-1'}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="eyebrow">{program.stage}</span>
                      <span className="h-px w-6 bg-line" aria-hidden="true" />
                      <span className="text-[10px] uppercase tracking-label text-slate-soft">
                        {program.ages}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-[1.7rem] font-semibold tracking-[-0.01em] text-ink">
                      {program.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-teal">{program.grades}</p>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate">
                      {program.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {program.subjects.slice(0, 4).map((subject) => (
                        <Badge key={subject} variant="outline" className="normal-case tracking-normal">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    <Link to={`/academics/${program.slug}`} className="link-arrow mt-6">
                      Explore {program.name}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-white">
        <PageContainer>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                index="02"
                eyebrow="Faculty"
                title="Teachers who are here for the long term."
                description="Seventy per cent of our faculty have been with the school for more than three years — unusual in a young institution, and deliberate."
              />
              <div className="mt-6 space-y-4 text-[14px] leading-relaxed text-slate">
                <p>
                  Every teacher is a subject specialist, and every cohort has a faculty mentor
                  responsible for academic progress and pastoral care. Teachers observe one
                  another’s lessons twice a term and take part in a structured professional
                  development programme.
                </p>
                <p>
                  The leadership team below also teaches. No member of the academic leadership is
                  a full-time administrator.
                </p>
              </div>
              <Link to="/contact" className="link-arrow mt-6">
                Ask about faculty for a specific subject
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="divide-y divide-line border-y border-line">
                {leadership.slice(0, 4).map((person) => (
                  <div key={person.name} className="flex items-center gap-5 py-4">
                    <ImageWithFallback
                      src={person.image.src}
                      alt={person.image.alt}
                      sizes="72px"
                      className="size-16 shrink-0 sm:size-[72px]"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-[15px] font-semibold text-ink">
                        {person.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-teal">{person.role}</p>
                    </div>
                    <span className="hidden shrink-0 text-[10px] uppercase tracking-label text-slate-soft sm:block">
                      {person.focus}
                    </span>
                  </div>
                ))}
              </div>
              <Link to="/about#leadership" className="link-arrow mt-5 text-xs">
                Meet the full leadership team
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-ivory">
        <PageContainer>
          <SectionHeading
            index="03"
            eyebrow="Learning resources"
            title="Resources that get used, not just listed."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {resources.map((resource, index) => (
              <Reveal key={resource.title} delay={index * 0.05} className="border-t border-ink/15 pt-6">
                <resource.icon className="size-5 text-teal" aria-hidden="true" />
                <h3 className="mt-4 font-display text-[17px] font-semibold text-ink">
                  {resource.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate">{resource.description}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-slate">
              <BookOpen className="size-4 text-teal" aria-hidden="true" />
              Our full subject handbook is shared with families at the offer stage.
            </p>
            <Link to="/campus-life" className="link-arrow shrink-0">
              See the facilities
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </PageContainer>
      </Section>

      <PageCTA
        title="Questions about a specific stage or subject?"
        description="Our academic office answers subject questions directly — no need to wait for an open day."
        secondary={{ label: 'Contact the academic office', to: '/contact' }}
      />
    </>
  )
}
