import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { institution } from '../../config/institution'
import { photoCredit } from '../../config/images'
import { Logo } from '../shared/logo'
import { PageContainer } from '../shared/page-container'
import { SocialIcon } from '../shared/social-icon'

export function SiteFooter() {
  const year = new Date().getFullYear()
  const { contact, identity, content } = institution

  return (
    <footer className="bg-ink text-ivory">
      <PageContainer className="pb-8 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Link to="/" aria-label={`${identity.name} — home`} className="inline-block">
              <Logo variant="light" />
            </Link>
            <p className="mt-6 max-w-sm font-display text-[1.65rem] font-medium leading-[1.25] tracking-[-0.01em]">
              Discover Your Potential.
              <br />
              <span className="text-gold">Shape Your Future.</span>
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/55">
              A learning community in Noida for Nursery to Grade XII, built around small
              classes, strong teaching and a genuinely balanced education.
            </p>
            <div className="mt-7 flex items-center gap-2">
              {institution.socials.map((social) => {
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${identity.name} on ${social.label} (demo link)`}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                  >
                    <SocialIcon name={social.label} className="size-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4">
            <div>
              <h2 className="text-[10px] font-semibold uppercase tracking-label text-gold">
                Explore
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  { label: 'About Us', to: '/about' },
                  { label: 'Admissions', to: '/admissions' },
                  { label: 'Campus Life', to: '/campus-life' },
                  { label: 'News & Events', to: '/news' },
                  { label: 'Contact', to: '/contact' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-ivory/60 transition-colors hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[10px] font-semibold uppercase tracking-label text-gold">
                Academics
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {content.programs.map((program) => (
                  <li key={program.slug}>
                    <Link
                      to={`/academics/${program.slug}`}
                      className="text-ivory/60 transition-colors hover:text-ivory"
                    >
                      {program.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-[10px] font-semibold uppercase tracking-label text-gold">
                Visit
              </h2>
              <address className="mt-4 space-y-3 text-sm not-italic text-ivory/60">
                <p className="flex gap-2">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-ivory/35" aria-hidden="true" />
                  <span>
                    {contact.address.line1}, {contact.address.line2}
                    <br />
                    {contact.address.city}, {contact.address.region}{' '}
                    {contact.address.postalCode}
                  </span>
                </p>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 transition-colors hover:text-ivory"
                >
                  <Phone className="size-3.5 shrink-0 text-ivory/35" aria-hidden="true" />
                  {contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-ivory"
                >
                  <Mail className="size-3.5 shrink-0 text-ivory/35" aria-hidden="true" />
                  {contact.email}
                </a>
                <a
                  href={contact.directionsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-ivory/80 underline decoration-ivory/25 underline-offset-4 transition-colors hover:text-gold"
                >
                  Get directions
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </address>
            </div>
          </nav>

          <div className="lg:col-span-3">
            <div className="border border-white/12 bg-white/[0.03] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-label text-gold">
                {institution.announcement.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/65">
                Campus mornings run every Saturday. Enquiries are answered within two working
                days.
              </p>
              <Link
                to="/admissions#enquiry"
                className="mt-5 inline-flex items-center gap-1.5 border-b border-gold/50 pb-1 text-sm font-semibold text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                Begin an enquiry
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
              <p className="mt-5 text-xs text-ivory/40">{contact.admissionsHours}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-ivory/40">
            {institution.demo.notice} {photoCredit}.
          </p>
          <div className="mt-5 flex flex-col gap-3 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {identity.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link to="/privacy" className="transition-colors hover:text-ivory">
                Privacy Policy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-ivory">
                Terms &amp; Conditions
              </Link>
              <Link to="/contact" className="transition-colors hover:text-ivory">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </footer>
  )
}
