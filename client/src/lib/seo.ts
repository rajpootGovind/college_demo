import { useEffect } from 'react'
import { institution } from '../config/institution'

const { seo } = institution

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value))
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

export interface PageMeta {
  title: string
  description: string
  path: string
  image?: string
  noIndex?: boolean
}

export function usePageMeta({ title, description, path, image, noIndex }: PageMeta) {
  useEffect(() => {
    const fullTitle = seo.titleTemplate.replace('%s', title)
    const url = new URL(path, seo.baseUrl).toString()
    const socialImage = image ?? seo.ogImage

    document.title = fullTitle
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: noIndex ? 'noindex, nofollow' : 'index, follow',
    })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: socialImage })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    })
    upsertLink('canonical', url)
  }, [title, description, path, image, noIndex])
}

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: institution.identity.name,
  description: seo.description,
  url: seo.baseUrl,
  slogan: institution.identity.tagline,
  foundingDate: institution.identity.established,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${institution.contact.address.line1}, ${institution.contact.address.line2}`,
    addressLocality: institution.contact.address.city,
    addressRegion: institution.contact.address.region,
    postalCode: institution.contact.address.postalCode,
    addressCountry: 'IN',
  },
  telephone: institution.contact.phone,
  email: institution.contact.email,
  areaServed: 'Noida, Uttar Pradesh',
}
