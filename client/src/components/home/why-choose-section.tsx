import { institution } from '../../config/institution'
import { iconMap } from '../../lib/icons'
import { PageContainer, Section } from '../shared/page-container'
import { Reveal } from '../shared/reveal'
import { SectionHeading } from '../shared/section-heading'

export function WhyChooseSection() {
  return (
    <Section className="relative overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl"
      />
      <PageContainer className="relative">
        <SectionHeading
          inverse
          index="02"
          eyebrow="Why Aurevia"
          title="The details families notice after the first month."
          description="Not a list of promises — the practical choices that shape what a school day actually feels like here."
        />

        <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {institution.content.whyChoose.map((item, index) => {
            const Icon = iconMap[item.icon]
            return (
              <Reveal
                key={item.title}
                delay={index * 0.04}
                className="border-t border-white/12 pt-6"
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-gold" aria-hidden="true" />
                  <span className="font-display text-[10px] tracking-[0.2em] text-ivory/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[17px] font-semibold text-ivory">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ivory/60">
                  {item.description}
                </p>
              </Reveal>
            )
          })}
        </div>
      </PageContainer>
    </Section>
  )
}
