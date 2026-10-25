import { ArrowLeft, ArrowRight, Check, Clock, Copy } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { DemoNote } from '../components/shared/demo-note'
import { ImageWithFallback } from '../components/shared/image-with-fallback'
import { PageContainer, Section } from '../components/shared/page-container'
import { PageCTA } from '../components/shared/page-cta'
import { PageHero } from '../components/shared/page-hero'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { institution } from '../config/institution'
import { formatDate } from '../lib/utils'
import { usePageMeta } from '../lib/seo'
import NotFoundPage from './NotFoundPage'

export default function NewsArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { news } = institution.content
  const post = news.find((item) => item.slug === slug)
  const [copied, setCopied] = useState(false)

  usePageMeta({
    title: post?.title ?? 'Article not found',
    description: post?.excerpt ?? 'The article you were looking for could not be found.',
    path: `/news/${slug ?? ''}`,
    image: post?.image.src,
    noIndex: !post,
  })

  if (!post) {
    return <NotFoundPage />
  }

  const related = news.filter((item) => item.slug !== post.slug).slice(0, 2)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      toast.success('Article link copied')
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Could not copy the link. Please copy it from the address bar.')
    }
  }

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'News & Events', to: '/news' },
          { label: post.category },
        ]}
        aside={
          <dl className="space-y-3 text-sm">
            <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
              <dt className="text-[10px] uppercase tracking-label text-ivory/40">Published</dt>
              <dd className="text-[13px] text-ivory/85">{formatDate(post.date)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
              <dt className="text-[10px] uppercase tracking-label text-ivory/40">Reading time</dt>
              <dd className="flex items-center gap-1.5 text-[13px] text-ivory/85">
                <Clock className="size-3.5" aria-hidden="true" />
                {post.readTime}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[10px] uppercase tracking-label text-ivory/40">Category</dt>
              <dd>
                <Badge variant="inverse">{post.category}</Badge>
              </dd>
            </div>
          </dl>
        }
      />

      <Section className="bg-white">
        <PageContainer>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <article className="lg:col-span-8">
              <Link to="/news" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-slate transition-colors hover:text-teal">
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                All news & events
              </Link>

              <ImageWithFallback
                src={post.image.src}
                alt={post.image.alt}
                priority
                sizes="(min-width: 1024px) 62vw, 92vw"
                className="mt-5 aspect-[16/9] w-full"
              />
              <p className="mt-2 text-[10px] uppercase tracking-label text-slate-soft">
                Demo imagery · {post.category}
              </p>

              <div className="article-body mt-8">
                {post.body.map((block, index) => {
                  if (block.type === 'heading') {
                    return <h2 key={index}>{block.text}</h2>
                  }
                  if (block.type === 'list') {
                    return (
                      <ul key={index}>
                        {block.items?.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )
                  }
                  if (block.type === 'quote') {
                    return <blockquote key={index}>{block.text}</blockquote>
                  }
                  return <p key={index}>{block.text}</p>
                })}
              </div>

              <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-label text-slate-soft">
                    Published by
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink">
                    Aurevia communications · demonstration article
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={copyLink}>
                  {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                  {copied ? 'Link copied' : 'Copy article link'}
                </Button>
              </div>

              <DemoNote className="mt-6">
                This article is fictional sample content created for a website demonstration. It
                should be replaced with real institutional communications before launch.
              </DemoNote>
            </article>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <div className="border border-line bg-ivory p-6">
                  <p className="eyebrow">Admissions</p>
                  <h2 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
                    Considering {institution.identity.shortName} for {institution.announcement.academicYear}?
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate">
                    Begin with an enquiry, then join a campus morning to meet the faculty.
                  </p>
                  <Button asChild variant="default" size="sm" className="mt-4 w-full">
                    <Link to="/admissions#enquiry">
                      Begin an enquiry
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-8">
                  <p className="text-[10px] font-semibold uppercase tracking-label text-slate-soft">
                    More updates
                  </p>
                  <div className="mt-4 divide-y divide-line border-t border-line">
                    {related.map((item) => (
                      <Link key={item.slug} to={`/news/${item.slug}`} className="group flex gap-3 py-4">
                        <ImageWithFallback
                          src={item.image.src}
                          alt={item.image.alt}
                          sizes="80px"
                          className="size-16 shrink-0"
                        />
                        <div>
                          <p className="text-[9px] uppercase tracking-label text-gold-dark">
                            {item.category}
                          </p>
                          <h3 className="mt-1 font-display text-[13px] font-semibold leading-snug text-ink transition-colors group-hover:text-teal">
                            {item.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link to="/news" className="link-arrow mt-5 text-xs">
                    All updates
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </PageContainer>
      </Section>

      <PageCTA
        title="Come and see the school for yourself."
        description="Campus mornings include a tour, a faculty conversation and time for questions. Enquiries are open for the 2026–27 session."
        secondary={{ label: 'Contact the office', to: '/contact' }}
      />
    </>
  )
}
