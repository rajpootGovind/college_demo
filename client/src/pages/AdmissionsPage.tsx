import { Check, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AdmissionEnquiryForm } from '../components/forms/admission-enquiry-form'
import { DemoNote } from '../components/shared/demo-note'
import { PageContainer, Section } from '../components/shared/page-container'
import { PageHero } from '../components/shared/page-hero'
import { Reveal } from '../components/shared/reveal'
import { SectionHeading } from '../components/shared/section-heading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { institution } from '../config/institution'
import { photo } from '../config/images'
import { usePageMeta } from '../lib/seo'

export default function AdmissionsPage() {
  const { admissions, contact, announcement } = institution

  usePageMeta({
    title: 'Admissions 2026–27',
    description:
      'Admission process, eligibility, key dates and the online enquiry form for Aurevia International School, Noida. Demonstration website with sample data.',
    path: '/admissions',
    image: photo('studentsOutdoor', 1200),
  })

  return (
    <>
      <PageHero
        eyebrow={`Admissions ${announcement.academicYear}`}
        title="Admission is a conversation, not a competition."
        description={admissions.intro}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Admissions' }]}
        aside={
          <div className="rounded-md border border-gold/25 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between gap-3">
              <Badge variant="inverse">
                <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
                {announcement.isOpen ? 'Enquiries open' : 'Enquiries closed'}
              </Badge>
              <span className="text-[10px] uppercase tracking-label text-ivory/40">
                {announcement.academicYear}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ivory/70">
              {announcement.detail}
            </p>
            <dl className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-[12px]">
              <div className="flex items-start gap-2 text-ivory/65">
                <Phone className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden="true" />
                <dt className="sr-only">Admissions phone</dt>
                <dd>
                  <a href={`tel:${contact.admissionsPhone}`} className="hover:text-ivory">
                    {contact.admissionsPhoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-2 text-ivory/65">
                <Mail className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden="true" />
                <dt className="sr-only">Admissions email</dt>
                <dd>
                  <a href={`mailto:${contact.admissionsEmail}`} className="break-all hover:text-ivory">
                    {contact.admissionsEmail}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-2 text-ivory/65">
                <Clock className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden="true" />
                <dt className="sr-only">Admissions hours</dt>
                <dd>{contact.admissionsHours}</dd>
              </div>
            </dl>
            <Button asChild variant="gold" className="mt-5 w-full">
              <Link to="/admissions#enquiry">Begin an enquiry</Link>
            </Button>
          </div>
        }
      />

      <Section id="process" className="bg-white">
        <PageContainer>
          <SectionHeading
            index="01"
            eyebrow="The process"
            title="Four steps, no mystery."
            description="Every applicant follows the same process. Timelines vary by grade and seat availability, and we will tell you where you stand at each stage."
          />

          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {admissions.steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05} className="relative border-t border-ink/15 pt-6">
                <span
                  aria-hidden="true"
                  className="font-display text-[2.4rem] font-semibold leading-none tracking-[-0.03em] text-gold/80"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-[17px] font-semibold leading-snug text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate">{step.description}</p>
              </Reveal>
            ))}
          </ol>

          <DemoNote className="mt-10">
            This admission process is sample content for a demonstration website. It does not
            describe a real school policy.
          </DemoNote>
        </PageContainer>
      </Section>

      <Section className="border-y border-line bg-ivory">
        <PageContainer>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                index="02"
                eyebrow="Eligibility"
                title="What each stage requires."
              />
              <dl className="mt-8 divide-y divide-line border-y border-line">
                {admissions.eligibility.map((row) => (
                  <div key={row.stage} className="grid gap-2 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                    <dt className="font-display text-[15px] font-semibold text-ink">{row.stage}</dt>
                    <dd className="text-[13px] leading-relaxed text-slate">{row.requirement}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10">
                <h3 className="text-[10px] font-semibold uppercase tracking-label text-slate-soft">
                  Documents to keep ready
                </h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {admissions.documents.map((document) => (
                    <li key={document} className="flex gap-2.5 text-[13px] leading-relaxed text-slate">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-teal" aria-hidden="true" />
                      {document}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[11px] text-slate-soft">
                  The admissions office will confirm the exact document list for your child’s
                  grade before the interaction.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-line bg-white p-6 sm:p-7">
                <SectionHeading
                  eyebrow="Key dates"
                  title={<span className="text-[1.5rem] sm:text-[1.65rem]">The 2026–27 calendar.</span>}
                />
                <ol className="mt-6 space-y-5">
                  {admissions.dates.map((date) => (
                    <li key={date.label} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-display text-[15px] font-semibold text-ink">
                          {date.label}
                        </span>
                        <span className="shrink-0 text-[12px] font-medium text-teal">
                          {date.date}
                        </span>
                      </div>
                      <p className="mt-1 text-[12px] text-slate">{date.note}</p>
                    </li>
                  ))}
                </ol>
                <DemoNote className="mt-5">{admissions.datesNote}</DemoNote>
              </div>

              <div className="mt-5 flex items-start gap-3 border border-line bg-ivory p-5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
                <div className="text-[12px] leading-relaxed text-slate">
                  <p className="font-medium text-ink">Campus visits</p>
                  <p className="mt-1">
                    {contact.address.line1}, {contact.address.line2},{' '}
                    {contact.address.city} {contact.address.postalCode}
                  </p>
                  <a
                    href={contact.directionsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-2 inline-block font-medium text-teal underline underline-offset-2"
                  >
                    Open directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-white">
        <PageContainer>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                index="03"
                eyebrow="Questions"
                title="The questions families actually ask."
                description="If your question is not here, write to the admissions office — we would rather answer it directly."
              />
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-[13px] text-slate">
                  {contact.admissionsHours}
                  <br />
                  <a
                    href={`tel:${contact.admissionsPhone}`}
                    className="mt-2 inline-block font-medium text-teal"
                  >
                    {contact.admissionsPhoneDisplay}
                  </a>
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Accordion type="single" collapsible defaultValue="faq-0" className="border-t border-line">
                {admissions.faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <DemoNote className="mt-5">
                Answers describe a demonstration school. Real admission policies, fees and
                affiliation details would be confirmed by the institution.
              </DemoNote>
            </div>
          </div>
        </PageContainer>
      </Section>

      <Section id="enquiry" className="border-t border-line bg-ivory">
        <PageContainer>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  index="04"
                  eyebrow="Admission enquiry"
                  title="Begin the conversation."
                  description="Share a few details about your child. Our admissions team will call you within two working days to talk through the right next step."
                />

                <dl className="mt-8 space-y-4 border-t border-line pt-6 text-sm">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-label text-slate-soft">
                        Admissions
                      </dt>
                      <dd className="mt-0.5">
                        <a href={`tel:${contact.admissionsPhone}`} className="text-ink hover:text-teal">
                          {contact.admissionsPhoneDisplay}
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-label text-slate-soft">Email</dt>
                      <dd className="mt-0.5">
                        <a
                          href={`mailto:${contact.admissionsEmail}`}
                          className="break-all text-ink hover:text-teal"
                        >
                          {contact.admissionsEmail}
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-label text-slate-soft">
                        Office hours
                      </dt>
                      <dd className="mt-0.5 text-ink">{contact.admissionsHours}</dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-8 border-l-2 border-gold pl-4">
                  <p className="text-[10px] font-semibold uppercase tracking-label text-gold-dark">
                    What happens after you submit
                  </p>
                  <ol className="mt-2 space-y-1 text-[13px] leading-relaxed text-slate">
                    <li>1. A call to understand your child’s grade and needs.</li>
                    <li>2. A campus morning invitation.</li>
                    <li>3. A learner interaction and written offer, where a seat is available.</li>
                  </ol>
                </div>

                <DemoNote className="mt-6">
                  Demonstration only. Enquiries submitted here are stored in the demo API and
                  are never sent to a real school or CRM.
                </DemoNote>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border border-line bg-white p-6 shadow-panel sm:p-8">
                <AdmissionEnquiryForm />
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>
    </>
  )
}
