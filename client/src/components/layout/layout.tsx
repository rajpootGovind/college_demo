import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        window.requestAnimationFrame(() =>
          target.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        )
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
