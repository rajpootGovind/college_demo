import { institution } from '../../config/institution'
import { iconMap } from '../../lib/icons'
import { PageContainer } from '../shared/page-container'
import { Reveal } from '../shared/reveal'

export function HighlightsSection() {
  return (
    <section className="border-b border-line bg-ivory">
      <PageContainer className="py-10 sm:py-12">
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {institution.content.highlights.map((highlight, index) => {
            const Icon = iconMap[highlight.icon]
            return (
              <Reveal
                key={highlight.title}
                delay={index * 0.05}
                className="border-t border-ink/15 pt-6"
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-teal" aria-hidden="true" />
                  <span className="font-display text-[10px] font-semibold tracking-[0.2em] text-slate-soft/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-[15px] font-semibold text-ink">
                  {highlight.title}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-slate">
                  {highlight.description}
                </p>
              </Reveal>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}
