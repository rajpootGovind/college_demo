import { institution } from '../../config/institution'
import { DemoNote } from '../shared/demo-note'
import { PageContainer, Section } from '../shared/page-container'
import { Reveal } from '../shared/reveal'
import { SectionHeading } from '../shared/section-heading'
import { Badge } from '../ui/badge'

export function AchievementsSection() {
  return (
    <Section className="border-y border-line bg-white">
      <PageContainer>
        <SectionHeading
          index="05"
          eyebrow="Outcomes"
          title="Results matter. So does what surrounds them."
          description="An honest academic profile, published alongside the things a results table cannot show."
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-0">
          {institution.content.achievements.map((group, index) => (
            <Reveal
              key={group.title}
              delay={index * 0.06}
              className={
                index === 0
                  ? 'lg:pr-8'
                  : 'border-t border-line pt-8 lg:border-l lg:border-t-0 lg:px-8 lg:pt-0'
              }
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-[15px] font-semibold text-ink">{group.title}</h3>
                <Badge variant="demo">Sample</Badge>
              </div>

              <dl className="mt-6 space-y-5">
                {group.items.map((item) => (
                  <div key={item.label} className="flex items-baseline gap-4">
                    <dt className="sr-only">{item.label}</dt>
                    <dd className="w-24 shrink-0 font-display text-[1.9rem] font-semibold leading-none tracking-[-0.02em] text-teal">
                      {item.value}
                    </dd>
                    <dd className="text-[12px] leading-snug text-slate">{item.label}</dd>
                  </div>
                ))}
              </dl>

              <DemoNote className="mt-6">{group.note}</DemoNote>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="max-w-2xl text-sm leading-relaxed text-slate">
            We publish the cohort, not just the top rank — because a school’s results should be
            read in context.
          </p>
          <Badge variant="outline">Demonstration data only</Badge>
        </div>
      </PageContainer>
    </Section>
  )
}
