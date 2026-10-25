import { DemoNote } from './demo-note'
import { PageContainer, Section } from './page-container'
import { PageHero } from './page-hero'

export interface PolicySection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function PolicyPage({
  eyebrow,
  title,
  description,
  path,
  lastUpdated,
  sections,
}: {
  eyebrow: string
  title: string
  description: string
  path: string
  lastUpdated: string
  sections: PolicySection[]
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: title }]}
        aside={
          <div className="text-[13px] text-ivory/70">
            <p className="text-[10px] uppercase tracking-label text-gold">Last updated</p>
            <p className="mt-1">{lastUpdated}</p>
            <p className="mt-4 text-[11px] leading-relaxed text-ivory/45">
              Sample policy content for a demonstration website. Have a qualified adviser review
              any policy before publishing it for a real institution.
            </p>
          </div>
        }
      />

      <Section className="bg-white">
        <PageContainer>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <nav aria-label="On this page" className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <p className="text-[10px] font-semibold uppercase tracking-label text-slate-soft">
                  On this page
                </p>
                <ol className="mt-4 space-y-2.5 border-l border-line pl-4">
                  {sections.map((section) => (
                    <li key={section.heading}>
                      <a
                        href={`${path}#${slugify(section.heading)}`}
                        className="text-[13px] leading-snug text-slate transition-colors hover:text-teal"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
                <DemoNote className="mt-6">
                  This is illustrative policy text for a fictional school website.
                </DemoNote>
              </div>
            </nav>

            <article className="lg:col-span-8">
              {sections.map((section) => {
                const id = slugify(section.heading)
                return (
                  <section key={section.heading} id={id} className="scroll-mt-32 border-t border-line py-8 first:border-t-0 first:pt-0">
                    <h2 className="font-display text-[1.35rem] font-semibold leading-snug text-ink">
                      {section.heading}
                    </h2>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="mt-3 text-[14px] leading-[1.8] text-slate">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-slate">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                )
              })}
            </article>
          </div>
        </PageContainer>
      </Section>
    </>
  )
}
