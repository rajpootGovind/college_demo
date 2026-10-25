import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { institution } from '../../config/institution'
import { ImageWithFallback } from '../shared/image-with-fallback'
import { PageContainer, Section } from '../shared/page-container'
import { Reveal } from '../shared/reveal'
import { SectionHeading } from '../shared/section-heading'

export function FacilitiesSection() {
  const featured = institution.content.facilities.slice(0, 6)

  return (
    <Section className="bg-white">
      <PageContainer>
        <SectionHeading
          index="03"
          eyebrow="Campus & facilities"
          title="Spaces that pull learners in."
          description="Built and maintained around one question: does this help a child concentrate, make, move or read?"
        />

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {featured.map((facility, index) => (
            <Reveal key={facility.slug} delay={index * 0.04}>
              <figure className="group">
                <div className="overflow-hidden">
                  <ImageWithFallback
                    src={facility.image.src}
                    alt={facility.image.alt}
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 92vw"
                    className="aspect-[4/3] w-full"
                    imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-4 flex gap-4 border-t border-line pt-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-semibold uppercase tracking-label text-gold-dark">
                        {facility.tag}
                      </span>
                      <span className="h-px w-4 bg-line" aria-hidden="true" />
                    </div>
                    <h3 className="mt-2 font-display text-[17px] font-semibold leading-snug text-ink transition-colors group-hover:text-teal">
                      {facility.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate">
                      {facility.description}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex border-t border-line pt-6">
          <Link to="/campus-life" className="link-arrow">
            Take a closer look at campus life
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </PageContainer>
    </Section>
  )
}
