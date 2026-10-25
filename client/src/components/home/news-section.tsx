import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { institution } from '../../config/institution'
import { formatDate, formatShortDate } from '../../lib/utils'
import { ImageWithFallback } from '../shared/image-with-fallback'
import { PageContainer, Section } from '../shared/page-container'
import { Reveal } from '../shared/reveal'
import { SectionHeading } from '../shared/section-heading'
import { Badge } from '../ui/badge'

export function NewsSection() {
  const posts = institution.content.news.filter((post) => post.featured).concat(
    institution.content.news.filter((post) => !post.featured),
  )
  const [featured, ...secondary] = posts.slice(0, 3)
  const events = institution.content.events.slice(0, 3)

  return (
    <Section className="bg-white">
      <PageContainer>
        <SectionHeading
          index="07"
          eyebrow="News & events"
          title="What’s happening on campus."
          description={
            <>
              Sample announcements, articles and events — the kind of updates a school can
              publish without a developer.{' '}
              <Link
                to="/news"
                className="font-medium text-teal underline decoration-teal/30 underline-offset-4 hover:decoration-teal"
              >
                Browse all updates
              </Link>
              .
            </>
          }
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <Link to={`/news/${featured.slug}`} className="group block">
              <div className="overflow-hidden">
                <ImageWithFallback
                  src={featured.image.src}
                  alt={featured.image.alt}
                  sizes="(min-width: 1024px) 55vw, 92vw"
                  className="aspect-[16/10] w-full"
                  imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-label text-slate-soft">
                <Badge variant="gold">{featured.category}</Badge>
                <span>{formatDate(featured.date)}</span>
                <span className="size-1 rounded-full bg-slate-soft/50" aria-hidden="true" />
                <span>{featured.readTime}</span>
              </div>
              <h3 className="mt-3 font-display text-[1.45rem] font-semibold leading-snug text-ink transition-colors group-hover:text-teal sm:text-[1.7rem]">
                {featured.title}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate">
                {featured.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-teal">
                Read article
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>

          <div className="lg:col-span-5">
            <div className="divide-y divide-line border-t border-line lg:border-t-0">
              {secondary.map((post, index) => (
                <Reveal key={post.slug} delay={0.05 + index * 0.05} className="py-5 first:pt-0">
                  <Link to={`/news/${post.slug}`} className="group flex gap-4">
                    <ImageWithFallback
                      src={post.image.src}
                      alt={post.image.alt}
                      sizes="112px"
                      className="size-[88px] shrink-0 sm:size-24"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-label text-slate-soft">
                        <span className="text-gold-dark">{post.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <h3 className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-teal">
                        {post.title}
                      </h3>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-slate">
                        Read more
                        <ArrowUpRight className="size-3" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 bg-ivory p-5">
              <h3 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-label text-ink">
                <CalendarDays className="size-3.5 text-teal" aria-hidden="true" />
                Upcoming events
              </h3>
              <ul className="mt-4 space-y-4">
                {events.map((event) => (
                  <li key={event.slug}>
                    <Link
                      to="/news#events"
                      className="group flex items-start gap-4 text-sm"
                    >
                      <span className="w-12 shrink-0 border-r border-ink/10 pr-3">
                        <span className="block font-display text-lg font-semibold leading-none text-ink">
                          {new Date(event.date).getDate()}
                        </span>
                        <span className="mt-1 block text-[9px] uppercase tracking-label text-slate-soft">
                          {new Date(event.date).toLocaleDateString('en-IN', { month: 'short' })}
                        </span>
                      </span>
                      <span className="flex-1">
                        <span className="block font-medium leading-snug text-ink transition-colors group-hover:text-teal">
                          {event.title}
                        </span>
                        <span className="mt-1 flex items-center gap-1 text-[11px] text-slate-soft">
                          <MapPin className="size-3" aria-hidden="true" />
                          {event.venue}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/news#events" className="link-arrow mt-5 text-xs">
                Full events calendar
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-label text-slate-soft/70">
              Sample content · {formatShortDate(posts[0].date)} onwards
            </p>
          </div>
        </div>
      </PageContainer>
    </Section>
  )
}
