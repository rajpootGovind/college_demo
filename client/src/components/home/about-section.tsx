import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { institution } from '../../config/institution'
import { ImageWithFallback } from '../shared/image-with-fallback'
import { PageContainer, Section } from '../shared/page-container'
import { Reveal } from '../shared/reveal'
import { SectionHeading } from '../shared/section-heading'

export function AboutSection() {
  const { about } = institution

  return (
    <Section className="bg-white">
      <PageContainer>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative lg:col-span-6">
            <ImageWithFallback
              src={about.imagePrimary.src}
              alt={about.imagePrimary.alt}
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="aspect-[4/5] w-full sm:aspect-[5/5]"
            />
            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="text-[10px] uppercase tracking-label text-slate-soft">
                {about.imagePrimary.caption}
              </p>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
            </div>

            <div className="absolute -bottom-12 -right-4 hidden w-40 border-[6px] border-white shadow-lift sm:block lg:w-48">
              <ImageWithFallback
                src={about.imageSecondary.src}
                alt={about.imageSecondary.alt}
                sizes="200px"
                className="aspect-square w-full"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:pl-4">
            <Reveal>
              <SectionHeading
                eyebrow={about.eyebrow}
                title={about.heading}
                titleClassName="lg:text-[2.6rem]"
              />
            </Reveal>

            <Reveal delay={0.05} className="mt-7 space-y-4">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-[1.8] text-slate">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.1} className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="border-l-2 border-gold pl-4">
                <h3 className="text-[10px] font-semibold uppercase tracking-label text-gold-dark">
                  Our vision
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate">{about.vision}</p>
              </div>
              <div className="border-l-2 border-teal/40 pl-4">
                <h3 className="text-[10px] font-semibold uppercase tracking-label text-teal">
                  Our mission
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate">{about.mission}</p>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-9">
              <Link to={about.cta.to} className="link-arrow">
                {about.cta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </PageContainer>
    </Section>
  )
}
