import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Layout, ScrollToTop } from './components/layout/layout'
import { LoadingState } from './components/shared/states'
import { structuredData } from './lib/seo'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const AcademicsPage = lazy(() => import('./pages/AcademicsPage'))
const ProgramDetailPage = lazy(() => import('./pages/ProgramDetailPage'))
const AdmissionsPage = lazy(() => import('./pages/AdmissionsPage'))
const CampusLifePage = lazy(() => import('./pages/CampusLifePage'))
const NewsPage = lazy(() => import('./pages/NewsPage'))
const NewsArticlePage = lazy(() => import('./pages/NewsArticlePage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function StructuredData() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [])

  return null
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StructuredData />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ivory"
        >
          Skip to main content
        </a>
        <ScrollToTop />
        <Layout>
          <Suspense
            fallback={
              <div className="pt-44">
                <LoadingState label="Loading page…" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/academics" element={<AcademicsPage />} />
              <Route path="/academics/:slug" element={<ProgramDetailPage />} />
              <Route path="/admissions" element={<AdmissionsPage />} />
              <Route path="/campus-life" element={<CampusLifePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:slug" element={<NewsArticlePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
        <Toaster
          position="top-center"
          closeButton
          toastOptions={{
            style: {
              fontFamily: 'Inter, sans-serif',
              borderRadius: '4px',
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
