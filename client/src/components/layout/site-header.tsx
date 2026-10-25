import { ChevronDown, Mail, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { institution } from '../../config/institution'
import { cn } from '../../lib/utils'
import { Logo } from '../shared/logo'
import { PageContainer } from '../shared/page-container'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { MobileNavigation } from './mobile-navigation'

export function SiteHeader() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const transparent = isHome && !scrolled
  const isActive = (to: string) =>
    to === '/'
      ? location.pathname === '/'
      : location.pathname === to || location.pathname.startsWith(`${to}/`)

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="hidden bg-ink text-ivory/70 md:block">
        <PageContainer className="flex h-9 items-center justify-between text-[11px] tracking-wide">
          <p className="flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-gold" aria-hidden="true" />
            {institution.demo.label} · sample content for sales demonstrations
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${institution.contact.admissionsPhone}`}
              className="flex items-center gap-1.5 transition-colors hover:text-ivory"
            >
              <Phone className="size-3" aria-hidden="true" />
              Admissions {institution.contact.admissionsPhoneDisplay}
            </a>
            <a
              href={`mailto:${institution.contact.admissionsEmail}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-ivory lg:flex"
            >
              <Mail className="size-3" aria-hidden="true" />
              {institution.contact.admissionsEmail}
            </a>
          </div>
        </PageContainer>
      </div>

      <div
        className={cn(
          'border-b transition-all duration-300',
          transparent
            ? 'border-white/10 bg-ink/25 backdrop-blur-sm'
            : 'border-line bg-ivory/95 shadow-[0_1px_0_rgba(20,36,58,0.04)] backdrop-blur-md',
        )}
      >
        <PageContainer className="flex h-[72px] items-center justify-between gap-4">
          <Link
            to="/"
            aria-label={`${institution.identity.name} — home`}
            className="rounded-xs"
          >
            <Logo variant={transparent ? 'light' : 'dark'} />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {institution.navigation.map((item) => {
              const active = isActive(item.to)
              const linkClasses = cn(
                'relative px-3 py-2 text-[13px] font-medium transition-colors',
                transparent
                  ? active
                    ? 'text-ivory'
                    : 'text-ivory/75 hover:text-ivory'
                  : active
                    ? 'text-ink'
                    : 'text-slate hover:text-ink',
              )

              return (
                <div key={item.to} className="flex items-center">
                  <Link
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    className={linkClasses}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300',
                        transparent ? 'bg-gold' : 'bg-teal',
                        active && 'scale-x-100',
                      )}
                    />
                  </Link>

                  {item.children && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          aria-label={`Show ${item.label} options`}
                          className={cn(
                            '-ml-2 rounded-full p-1.5 transition-colors',
                            transparent
                              ? 'text-ivory/70 hover:bg-white/10 hover:text-ivory'
                              : 'text-slate hover:bg-ink/5 hover:text-ink',
                          )}
                        >
                          <ChevronDown className="size-3.5" aria-hidden="true" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Academic stages</DropdownMenuLabel>
                        {item.children.map((child) => (
                          <DropdownMenuItem key={child.to} asChild>
                            <Link to={child.to} className="block">
                              <span className="block font-medium">{child.label}</span>
                              {child.description && (
                                <span className="mt-0.5 block text-xs text-slate-soft">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="gold"
              size="sm"
              className="hidden h-10 px-5 sm:inline-flex"
            >
              <Link to="/admissions#enquiry">Apply for Admission</Link>
            </Button>
            <MobileNavigation transparent={transparent} />
          </div>
        </PageContainer>
      </div>
    </header>
  )
}
