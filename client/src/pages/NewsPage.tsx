import { ArrowRight, CalendarDays, Clock, MapPin } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DemoNote } from '../components/shared/demo-note'
import { EmptyState } from '../components/shared/states'
import { ImageWithFallback } from '../components/shared/image-with-fallback'
import { PageContainer, Section } from '../components/shared/page-container'
import { PageHero } from '../components/shared/page-hero'
import { PageCTA } from '../components/shared/page-cta'
import { Reveal } from '../components/shared/reveal'
import { SectionHeading } from '../components/shared/section-heading'
import { Badge } from '../components/ui/badge'
import { institution } from '../config/institution'
import { photo } from '../config/images'
import { formatDate, formatShortDate } from '../lib/utils'
import { usePageMeta } from '../lib/seo'

export default function NewsPage() {
  usePageMeta({
    title: 'News & Events',
    description:
      'Sample announcements, articles and upcoming events from Aurevia International School — demonstration content for a school website.',
    path: '/news',
    image: photo('campusLawn', 1200),
  })

  const { news, events } = institution.content
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(news.map((post) => post.category)))],
    [news],
  )
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = news.filter((post) => {
    const matchesCategory = category === 'All' || post.category === category
    const search = query.trim().toLowerCase()
    const matchesQuery =
      search.length === 0 ||
      post.title.toLowerCase().includes(search) ||
      post.excerpt.toLowerCase().includes(search) ||
      post.category.toLowerCase().includes(search)
    return matchesCategory && matchesQuery
  })

  const nextEvent = [...events].sort((a, b) => a.date.localeCompare(b.date))[0]

  return (
    <>
      <PageHero
        eyebrow="News & events"
        title="What’s happening on campus."
        description="Announcements, articles and open events — the everyday communication a school runs on, presented as it would appear on a live site."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'News & Events' }]}
        aside={
          nextEvent && (
            <div className="rounded-md border border-white/15 bg-white/[0.04] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-label text-gold">
                Next event
              </p>
              <p className="mt-3 font-display text-lg font-semibold leading-snug text-ivory">
                {nextEvent.title}
              </p>
              <p className="mt-2 flex items-center gap-2 text-[12px] text-ivory/60">
                <CalendarDays className="size-3.5 text-gold" aria-hidden="true" />
                {formatDate(nextEvent.date)} · {nextEvent.time}
              </p>
              <p className="mt-1.5 flex items-start gap-2 text-[12px] text-ivory/60">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden="true" />
                {nextEvent.venue}
              </p>
              <Link
                to="/news#events"
                className="mt-4 inline-flex items-center gap-1.5 border-b border-gold/50 pb-1 text-[12px] font-semibold text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                View event details
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          )
        }
      />

      <Section className="bg-white">
        <PageContainer>
          <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Newsroom</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-semibold tracking-[-0.01em] text-ink">
                All updates
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div>
                <label htmlFor="news-search" className="sr-only">
                  Search news
                </label>
                <input
                  id="news-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search updates"
                  className="field-base h-11 w-full sm:w-56"
                />
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter news by category">
                {categories.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={category === option}
                    onClick={() => setCategory(option)}
                    className={
                      category === option
                        ? 'rounded-full bg-ink px-3.5 py-2 text-[10px] font-semibold uppercase tracking-label text-ivory'
                        : 'rounded-full border border-ink/15 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-label text-slate transition-colors hover:border-ink/35 hover:text-ink'
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-4 text-[11px] uppercase tracking-label text-slate-soft" aria-live="polite">
            Showing {filtered.length} of {news.length} updates
          </p>

          {filtered.length === 0 ? (
            <EmptyState
              className="mt-8"
              title="No updates match that search"
              description="Try a different keyword or clear the category filter."
              actionLabel="Clear filters"
              onAction={() => {
                setCategory('All')
                setQuery('')
              }}
            />
          ) : (
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.04}>
                  <article className="group h-full">
                    <Link to={`/news/${post.slug}`} className="block">
                      <div className="overflow-hidden">
                        <ImageWithFallback
                          src={post.image.src}
                          alt={post.image.alt}
                          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 92vw"
                          className="aspect-[16/10] w-full"
                          imgClassName="transition-transform duration-[900ms] group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-2.5 text-[10px] uppercase tracking-label text-slate-soft">
                        <Badge variant="gold">{post.category}</Badge>
                        <span>{formatShortDate(post.date)}</span>
                        <span className="size-1 rounded-full bg-slate-soft/50" aria-hidden="true" />
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" aria-hidden="true" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="mt-2.5 font-display text-[1.15rem] font-semibold leading-snug text-ink transition-colors group-hover:text-teal">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-slate">{post.excerpt}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-label text-teal">
                        Read article
                        <ArrowRight
                          className="size-3.5 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          <DemoNote className="mt-10">
            All news articles and events are sample content written for this demonstration
            website. They are not real institutional announcements.
          </DemoNote>
        </PageContainer>
      </Section>

      <Section id="events" className="border-y border-line bg-ivory">
        <PageContainer>
          <SectionHeading
            index="01"
            eyebrow="Upcoming events"
            title="Open mornings and campus events."
            description="Events are listed with time, venue and a short description so families can plan a visit without calling the office."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-6">
            {[...events]
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((event, index) => (
                <Reveal key={event.slug} delay={index * 0.05}>
                  <article className="flex h-full flex-col border border-line bg-white">
                    <div className="relative">
                      <ImageWithFallback
                        src={event.image.src}
                        alt={event.image.alt}
                        sizes="(min-width: 1024px) 31vw, 92vw"
                        className="aspect-[16/9] w-full"
                      />
                      <div className="absolute left-4 top-4 bg-ivory px-3 py-2 text-center">
                        <span className="block font-display text-xl font-semibold leading-none text-ink">
                          {new Date(event.date).getDate()}
                        </span>
                        <span className="mt-1 block text-[9px] uppercase tracking-label text-slate-soft">
                          {new Date(event.date).toLocaleDateString('en-IN', { month: 'short' })}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <Badge variant="outline">{event.category}</Badge>
                      <h3 className="mt-3 font-display text-[17px] font-semibold leading-snug text-ink">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-slate">
                        {event.description}
                      </p>
                      <dl className="mt-4 space-y-1.5 border-t border-line pt-4 text-[12px] text-slate">
                        <div className="flex items-center gap-2">
                          <Clock className="size-3.5 text-teal" aria-hidden="true" />
                          <dt className="sr-only">Time</dt>
                          <dd>{event.time}</dd>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="mt-0.5 size-3.5 shrink-0 text-teal" aria-hidden="true" />
                          <dt className="sr-only">Venue</dt>
                          <dd>{event.venue}</dd>
                        </div>
                      </dl>
                      <Link
                        to="/admissions#enquiry"
                        className="link-arrow mt-5 text-xs"
                      >
                        Register your interest
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
          </div>
        </PageContainer>
      </Section>

      <PageCTA
        title="Prefer to visit on a quiet morning?"
        description="Private campus tours can be arranged on weekdays. Tell us what you would like to see and we will plan the visit around it."
        secondary={{ label: 'Contact the office', to: '/contact' }}
      />
    </>
  )
}
