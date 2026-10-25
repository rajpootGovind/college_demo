import { PolicyPage, type PolicySection } from '../components/shared/policy-page'
import { usePageMeta } from '../lib/seo'

const sections: PolicySection[] = [
  {
    heading: 'About this website',
    paragraphs: [
      'Aurevia International School is a fictional institution created to demonstrate a premium school website. All names, programmes, results, testimonials, addresses and contact details on this site are sample content and do not describe a real school.',
      'By using this website you accept these terms. If you do not agree with them, please do not use the site.',
    ],
  },
  {
    heading: 'Permitted use',
    bullets: [
      'You may browse the site and submit demonstration enquiries for evaluation purposes.',
      'You may not attempt to disrupt the service, submit automated or bulk enquiries, or probe the API for vulnerabilities.',
      'You may not copy the site’s design or content for a live institution without replacing the demonstration content and imagery.',
    ],
  },
  {
    heading: 'Accuracy of information',
    paragraphs: [
      'Content is provided for demonstration only. Academic results, achievements, testimonials, faculty profiles and admission dates are illustrative and must not be treated as official records. A live school would be responsible for the accuracy of its published information.',
    ],
  },
  {
    heading: 'Admission enquiries',
    paragraphs: [
      'Submitting an enquiry does not create an application, reserve a seat or guarantee admission. Any admission decision would rest with the institution’s admissions committee under its published policy.',
    ],
  },
  {
    heading: 'Fees and payments',
    paragraphs: [
      'This demonstration site processes no payments and publishes no fee structure. A live deployment would need a secure, compliant payment process and a published fee policy.',
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      'Demo photography is sourced from Unsplash under the Unsplash License. Institution names, marks and written content in this demo are fictional and may be replaced for a client project. Third-party trademarks remain the property of their respective owners.',
    ],
  },
  {
    heading: 'Third-party links',
    paragraphs: [
      'Directions links open Google Maps, and social links lead to external platforms. Those services have their own terms and privacy practices, which we do not control.',
    ],
  },
  {
    heading: 'Limitation of liability',
    paragraphs: [
      'This site is provided on an “as is” basis for demonstration. To the extent permitted by law, the operators of this demo are not liable for any loss arising from reliance on sample content, service interruption, or the submission of information through the demonstration forms.',
    ],
  },
  {
    heading: 'Changes and governing law',
    paragraphs: [
      'These terms may be updated as the demonstration evolves; the date at the top of this page reflects the latest version. For a live Indian institution, the applicable governing law would ordinarily be Indian law, with jurisdiction in the courts of the institution’s registered location.',
    ],
  },
  {
    heading: 'Contact',
    paragraphs: [
      'Questions about this demonstration can be directed to hello@aurevia.school. For a real client project, replace this section with the institution’s official contact and grievance details.',
    ],
  },
]

export default function TermsPage() {
  usePageMeta({
    title: 'Terms & Conditions',
    description:
      'Sample terms of use for the Aurevia International School demonstration website.',
    path: '/terms',
    noIndex: true,
  })

  return (
    <PolicyPage
      eyebrow="Legal"
      title="Terms & Conditions"
      description="The terms that would govern use of a school website built on this demonstration platform — sample text only."
      path="/terms"
      lastUpdated="1 October 2026"
      sections={sections}
    />
  )
}
