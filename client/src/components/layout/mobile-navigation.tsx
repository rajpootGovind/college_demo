import { ChevronRight, Mail, Menu, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { institution } from '../../config/institution'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Logo } from '../shared/logo'
import { cn } from '../../lib/utils'

export function MobileNavigation({ transparent }: { transparent: boolean }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className={cn(
            'inline-flex size-11 items-center justify-center rounded-full border transition-colors lg:hidden',
            transparent
              ? 'border-white/25 text-ivory hover:bg-white/10'
              : 'border-ink/15 text-ink hover:bg-ink/5',
          )}
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </DialogTrigger>

      <DialogContent
        hideClose
        className="left-auto right-0 top-0 flex h-[100dvh] w-[88%] max-w-sm translate-x-0 translate-y-0 flex-col gap-0 overflow-y-auto rounded-none border-0 bg-ivory p-0 shadow-2xl"
      >
        <DialogTitle className="sr-only">Site navigation</DialogTitle>

        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Link to="/" onClick={() => setOpen(false)} aria-label={`${institution.identity.name} home`}>
            <Logo />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full border border-ink/15 px-3 py-2 text-[11px] font-semibold uppercase tracking-label text-slate transition-colors hover:bg-white"
          >
            Close
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 px-5 py-4">
          <ul className="divide-y divide-line">
            {institution.navigation.map((item) => {
              const isActive =
                item.to === '/'
                  ? location.pathname === '/'
                  : location.pathname === item.to ||
                    location.pathname.startsWith(`${item.to}/`)

              return (
                <li key={item.to} className="py-1">
                  <Link
                    to={item.to}
                    className={cn(
                      'flex items-center justify-between py-3 font-display text-[17px] font-semibold transition-colors',
                      isActive ? 'text-teal' : 'text-ink hover:text-teal',
                    )}
                  >
                    {item.label}
                    <ChevronRight className="size-4 text-slate-soft" aria-hidden="true" />
                  </Link>
                  {item.children && (
                    <ul className="mb-2 space-y-1 border-l border-line pl-4">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <Link
                            to={child.to}
                            className="block py-2 text-sm text-slate transition-colors hover:text-teal"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>

          <Button asChild variant="gold" className="mt-6 w-full">
            <Link to="/admissions#enquiry">Apply for Admission</Link>
          </Button>

          <div className="mt-8 space-y-3 border-t border-line pt-6 text-sm text-slate">
            <a
              href={`tel:${institution.contact.phone}`}
              className="flex items-center gap-3 transition-colors hover:text-teal"
            >
              <Phone className="size-4 text-teal" aria-hidden="true" />
              {institution.contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${institution.contact.email}`}
              className="flex items-center gap-3 transition-colors hover:text-teal"
            >
              <Mail className="size-4 text-teal" aria-hidden="true" />
              {institution.contact.email}
            </a>
            <p className="pt-2 text-xs leading-relaxed text-slate-soft">
              {institution.demo.label} · sample content
            </p>
          </div>
        </nav>
      </DialogContent>
    </Dialog>
  )
}
