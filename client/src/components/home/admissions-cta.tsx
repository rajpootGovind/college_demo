import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { institution } from '../../config/institution'
import { photo } from '../../config/images'
import { ImageWithFallback } from '../shared/image-with-fallback'
import { PageContainer } from '../shared/page-container'

export function AdmissionsCTA() {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <ImageWithFallback
        src={photo('graduationCaps', 2000)}
        alt="Graduates throwing caps into the air at the end of a school year"
        sizes="100vw"
        className="absolute inset-0 h-full w-full"
        imgClassName="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,25,40,0.95)_0%,rgba(13,25,40,0.86)_45%,rgba(13,25,40,0.35)_100%)]"
      />

      <PageContainer className="relative py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            <p className="eyebrow-inverse">
              Admissions {institution.announcement.academicYear}
            </p>
          </div>

          <h2 className="mt-5 font-display text-[2.2rem] font-semibold leading-[1.05] tracking-[-0.02em] text-ivory sm:text-[3rem] lg:text-[3.4rem]">
            Your child’s next chapter
            <br />
            <span className="text-gold">starts here.</span>
          </h2>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ivory/70">
            Begin with a conversation. Tell us about your child, visit the campus, and meet the
            people who will teach them.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/admissions#enquiry"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 text-sm font-semibold text-ink transition-colors hover:bg-gold-dark"
            >
              Begin Admission Enquiry
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              to="/admissions#process"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 px-7 text-sm font-semibold text-ivory transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              View Admission Process
            </Link>
          </div>

          <p className="mt-5 flex items-start gap-2 text-[11px] leading-relaxed text-ivory/45">
            <span
              className="mt-1.5 inline-block size-1 shrink-0 rounded-full bg-gold"
              aria-hidden="true"
            />
            {institution.admissions.enquiryNote}
          </p>
        </div>
      </PageContainer>
    </section>
  )
}
