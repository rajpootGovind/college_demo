import { ArrowUpRight, Clock, Mail, MapPin, Phone, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ContactForm } from '../components/forms/contact-form'
import { DemoNote } from '../components/shared/demo-note'
import { PageContainer, Section } from '../components/shared/page-container'
import { PageCTA } from '../components/shared/page-cta'
import { PageHero } from '../components/shared/page-hero'
import { SectionHeading } from '../components/shared/section-heading'
import { institution } from '../config/institution'
import { usePageMeta } from '../lib/seo'

export default function ContactPage() {
  const { contact, identity } = institution

  usePageMeta({
    title: 'Contact Us',
    description:
      'Contact Aurevia International School in Sector 128, Noida. Office hours, directions, admissions phone numbers and a general enquiry form.',
    path: '/contact',
  })

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the right person."
        description="Whether you are exploring admission, planning a campus visit or asking about a specific programme, the office will route your message to the right team."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        aside={
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-label text-gold">
                Admissions
              </p>
              <a
                href={`tel:${contact.admissionsPhone}`}
                className="mt-1 block font-display text-lg font-medium text-ivory hover:text-gold"
              >
                {contact.admissionsPhoneDisplay}
              </a>
              <a
                href={`mailto:${contact.admissionsEmail}`}
                className="mt-0.5 block break-all text-[12px] text-ivory/60 hover:text-ivory"
              >
                {contact.admissionsEmail}
              </a>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-label text-gold">
                School office
              </p>
              <a
                href={`tel:${contact.phone}`}
                className="mt-1 block text-[13px] text-ivory/85 hover:text-gold"
              >
                {contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="mt-0.5 block break-all text-[12px] text-ivory/60 hover:text-ivory"
              >
                {contact.email}
              </a>
            </div>
          </div>
        }
      />

      <Section className="bg-white">
        <PageContainer>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  eyebrow="Visit & contact"
                  title="One campus, one gate, a real person at reception."
                />

                <dl className="mt-8 space-y-5 border-t border-line pt-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-label text-slate-soft">
                        Address
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink">
                        {contact.address.line1}
                        <br />
                        {contact.address.line2}, {contact.address.city}
                        <br />
                        {contact.address.region} {contact.address.postalCode},{' '}
                        {contact.address.country}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-label text-slate-soft">
                        Phone
                      </dt>
                      <dd className="mt-1 text-sm">
                        <a href={`tel:${contact.phone}`} className="text-ink hover:text-teal">
                          {contact.phoneDisplay}
                        </a>
                        <span className="block text-[12px] text-slate-soft">
                          Admissions: {contact.admissionsPhoneDisplay}
                        </span>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-label text-slate-soft">Email</dt>
                      <dd className="mt-1 break-all text-sm">
                        <a href={`mailto:${contact.email}`} className="text-ink hover:text-teal">
                          {contact.email}
                        </a>
                        <span className="mt-0.5 block text-[12px] text-slate-soft">
                          Admissions: {contact.admissionsEmail}
                        </span>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-label text-slate-soft">
                        Office hours
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink">
                        {contact.officeHours}
                        <span className="mt-0.5 block text-[12px] text-slate-soft">
                          Admissions: {contact.admissionsHours}
                        </span>
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="relative mt-8 overflow-hidden border border-line bg-ivory-deep">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-70"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, rgba(20,36,58,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,36,58,0.08) 1px, transparent 1px)',
                      backgroundSize: '34px 34px',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute left-[18%] top-0 h-full w-2 rotate-12 bg-white/60"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-[42%] h-2 w-full -rotate-6 bg-white/60"
                  />
                  <div className="relative flex h-52 flex-col items-center justify-center gap-2 text-center">
                    <span className="flex size-10 items-center justify-center rounded-full border border-gold/40 bg-white text-teal shadow-sm">
                      <MapPin className="size-4" aria-hidden="true" />
                    </span>
                    <p className="font-display text-sm font-semibold text-ink">
                      Sector 128, Noida
                    </p>
                    <p className="max-w-[15rem] text-[11px] leading-relaxed text-slate">
                      Map embed placeholder — no paid mapping API or key is used on this
                      demonstration site.
                    </p>
                    <a
                      href={contact.directionsUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-1 inline-flex items-center gap-1 border-b border-teal/40 pb-0.5 text-[11px] font-semibold text-teal hover:border-teal"
                    >
                      Open in Google Maps
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <DemoNote className="mt-5">
                  Address, phone numbers and email addresses are fictional demonstration
                  details. Replace them with the institution’s real contact information before
                  launch.
                </DemoNote>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border border-line bg-white p-6 shadow-panel sm:p-8">
                <div className="border-b border-line pb-5">
                  <p className="eyebrow">General enquiry</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-ink">
                    Send the office a message
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate">
                    For admission enquiries, use the{' '}
                    <Link
                      to="/admissions#enquiry"
                      className="font-medium text-teal underline underline-offset-2"
                    >
                      admission enquiry form
                    </Link>{' '}
                    so the right team receives it.
                  </p>
                </div>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 border border-line bg-ivory p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <Plus className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-ink">
                      Applying for {institution.announcement.academicYear}?
                    </p>
                    <p className="mt-1 text-[12px] text-slate">
                      Admission enquiries follow a separate process and are answered within two
                      working days.
                    </p>
                  </div>
                </div>
                <Link
                  to="/admissions#enquiry"
                  className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-ink px-5 text-[12px] font-semibold text-ivory transition-colors hover:bg-ink-soft"
                >
                  Admission enquiry
                </Link>
              </div>

              <p className="mt-5 text-[12px] leading-relaxed text-slate-soft">
                {identity.name} · {identity.locationLabel}. This website is a demonstration
                product for school and college websites.
              </p>
            </div>
          </div>
        </PageContainer>
      </Section>

      <PageCTA
        eyebrow="Campus visits"
        title="See the campus on a Saturday morning."
        description="Tours run every Saturday during the admission season, led by senior faculty. Tell us what you would like to see."
        primary={{ label: 'Request a campus visit', to: '/admissions#enquiry' }}
        secondary={{ label: 'Explore campus life', to: '/campus-life' }}
      />
    </>
  )
}
