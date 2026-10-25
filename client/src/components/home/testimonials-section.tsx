import { Quote } from 'lucide-react'
import { institution } from '../../config/institution'
import { DemoNote } from '../shared/demo-note'
import { PageContainer, Section } from '../shared/page-container'
import { Reveal } from '../shared/reveal'
import { SectionHeading } from '../shared/section-heading'

export function TestimonialsSection() {
  const [featured, ...rest] = institution.content.testimonials

  return (
    <Section className="bg-ivory">
      <PageContainer>
        <SectionHeading
          index="06"
          eyebrow="In their words"
          title="What families say when nobody is selling."
          description="A demonstration of how real parent and student voices could be presented on a school website."
        />

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <figure className="flex h-full flex-col justify-between border-t-2 border-gold bg-white p-7 sm:p-9">
              <Quote className="size-8 text-gold/60" aria-hidden="true" />
              <blockquote className="mt-6 font-display text-[1.35rem] font-medium leading-[1.45] text-ink sm:text-[1.6rem]">
                “{featured.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-5">
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-gold"
                >
                  {featured.name
                    .split(' ')
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join('')}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{featured.name}</span>
                  <span className="block text-xs text-slate">{featured.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="space-y-8 lg:col-span-5">
            {rest.slice(0, 2).map((testimonial, index) => (
              <Reveal
                key={testimonial.name}
                delay={0.08 + index * 0.05}
                className="border-t border-line pt-6"
              >
                <blockquote className="text-[15px] leading-relaxed text-slate">
                  “{testimonial.quote}”
                </blockquote>
                <p className="mt-4 text-[11px] uppercase tracking-label text-slate-soft">
                  {testimonial.name} · {testimonial.role}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.18}>
              <DemoNote>
                All quotations on this page are fictional sample testimonials created for this
                demonstration. They are not real parent or student endorsements.
              </DemoNote>
            </Reveal>
          </div>
        </div>
      </PageContainer>
    </Section>
  )
}
