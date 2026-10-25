import { ArrowRight, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer } from '../components/shared/page-container'
import { Button } from '../components/ui/button'
import { institution } from '../config/institution'
import { usePageMeta } from '../lib/seo'

const suggestions = [
  { label: 'Academics', to: '/academics', description: 'Stages, subjects and teaching approach' },
  { label: 'Admissions', to: '/admissions', description: 'Process, dates and the enquiry form' },
  { label: 'Campus Life', to: '/campus-life', description: 'Facilities, sport and student life' },
  { label: 'Contact', to: '/contact', description: 'Speak to the school office' },
]

export default function NotFoundPage() {
  usePageMeta({
    title: 'Page not found',
    description: 'The page you were looking for could not be found at Aurevia International School.',
    path: '/404',
    noIndex: true,
  })

  return (
    <section className="bg-ivory pb-20 pt-36 sm:pt-40">
      <PageContainer>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <Compass className="size-4 text-teal" aria-hidden="true" />
              <p className="eyebrow">Error 404</p>
            </div>
            <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[3.6rem]">
              This page has stepped
              <br />
              out of the classroom.
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-slate">
              The address may have changed, or the link may be incomplete. Nothing is broken on
              your side — try one of the routes below.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link to="/">
                  Return to homepage
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/admissions#enquiry">Begin an admission enquiry</Link>
              </Button>
            </div>
            <p className="mt-8 text-xs text-slate-soft">
              Looking for something specific? Call{' '}
              <a
                href={`tel:${institution.contact.phone}`}
                className="text-teal underline underline-offset-2"
              >
                {institution.contact.phoneDisplay}
              </a>{' '}
              or email{' '}
              <a
                href={`mailto:${institution.contact.email}`}
                className="text-teal underline underline-offset-2"
              >
                {institution.contact.email}
              </a>
              .
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="border-t border-line pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-label text-slate-soft">
                Popular pages
              </p>
              <ul className="mt-4 divide-y divide-line">
                {suggestions.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="group flex items-center justify-between gap-6 py-4"
                    >
                      <span>
                        <span className="block font-display text-[15px] font-semibold text-ink transition-colors group-hover:text-teal">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate">{item.description}</span>
                      </span>
                      <ArrowRight
                        className="size-4 shrink-0 text-teal transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
