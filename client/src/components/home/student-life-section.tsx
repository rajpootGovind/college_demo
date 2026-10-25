import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { institution } from '../../config/institution'
import { ImageWithFallback } from '../shared/image-with-fallback'
import { PageContainer, Section } from '../shared/page-container'
import { Reveal } from '../shared/reveal'
import { SectionHeading } from '../shared/section-heading'

export function StudentLifeSection() {
  const { studentLife } = institution.content
  const featured = studentLife.items.slice(0, 4)

  return (
    <Section className="bg-ivory">
      <PageContainer>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="04"
                eyebrow="Student life"
                title="Character is built between lessons."
                description={studentLife.intro}
              />

              <Reveal delay={0.08} className="mt-8 border-l-2 border-gold pl-5">
                <p className="font-display text-lg leading-snug text-ink">
                  “{studentLife.quote}”
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-label text-slate-soft">
                  {studentLife.quoteAttribution}
                </p>
              </Reveal>

              <Link to="/campus-life" className="link-arrow mt-8">
                Explore campus life
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {featured.map((item, index) => (
              <Reveal
                key={item.slug}
                delay={index * 0.06}
                className={index % 2 === 1 ? 'sm:mt-12' : undefined}
              >
                <Link to="/campus-life" className="group block">
                  <div className="overflow-hidden">
                    <ImageWithFallback
                      src={item.image.src}
                      alt={item.image.alt}
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw"
                      className={index === 0 || index === 3 ? 'aspect-[4/5]' : 'aspect-square'}
                      imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-base font-semibold text-ink transition-colors group-hover:text-teal">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[12px] leading-relaxed text-slate">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight
                      className="mt-1 size-4 shrink-0 text-teal transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </PageContainer>
    </Section>
  )
}
