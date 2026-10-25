import { PolicyPage, type PolicySection } from '../components/shared/policy-page'
import { usePageMeta } from '../lib/seo'

const sections: PolicySection[] = [
  {
    heading: 'About this notice',
    paragraphs: [
      'This privacy notice explains how a school website built on this demonstration platform would handle personal information submitted through enquiry forms. Aurevia International School is a fictional institution; no real school collects or processes data through this demo.',
    ],
  },
  {
    heading: 'Information we collect',
    paragraphs: [
      'We collect only the information you choose to provide through the admission enquiry or general contact forms.',
    ],
    bullets: [
      'Parent or guardian name, student name and preferred class or stage.',
      'Phone number, and an email address if you provide one.',
      'Academic year of interest, your message, and your consent to be contacted.',
      'Basic technical information such as the time of submission and the page that referred you, used for security and spam prevention.',
    ],
  },
  {
    heading: 'How we use your information',
    bullets: [
      'To respond to your enquiry and arrange a campus visit or learner interaction.',
      'To keep an admissions record for the academic year you enquired about.',
      'To meet legal, safeguarding and record-keeping obligations where applicable.',
      'To detect and prevent spam, duplicate or automated submissions.',
    ],
  },
  {
    heading: 'Consent and lawful processing',
    paragraphs: [
      'Enquiry forms ask for explicit consent before submission. You can withdraw consent at any time by contacting the school office, after which we will stop using your details for admissions follow-up, subject to any legal record-keeping requirements.',
    ],
  },
  {
    heading: 'Sharing and the admissions CRM',
    paragraphs: [
      'This demonstration does not send enquiry data to a real CRM. In a live deployment, enquiry details would be forwarded to the institution’s admissions CRM and its authorised staff only, under a documented data-processing agreement.',
      'We do not sell personal information, and we do not use enquiry details for advertising.',
    ],
  },
  {
    heading: 'Retention',
    paragraphs: [
      'Demonstration enquiries are retained only for the purpose of testing the demo and are cleared periodically. A live institution would publish its own retention periods for applicant and student records.',
    ],
  },
  {
    heading: 'Security',
    paragraphs: [
      'Enquiries are validated on the client and again on the server, submitted over HTTPS, stored in an access-controlled database, and rate-limited to reduce automated abuse. No system is perfectly secure; please avoid sending sensitive medical or financial information through a general web form.',
    ],
  },
  {
    heading: 'Cookies and local storage',
    paragraphs: [
      'This website sets no advertising cookies and runs no third-party marketing trackers. Fonts and demonstration photography are loaded from third-party content delivery networks, which will receive standard request information such as your IP address.',
    ],
  },
  {
    heading: "Children's information",
    paragraphs: [
      'Enquiries are intended to be submitted by a parent, guardian or adult acting on a student’s behalf. We do not create accounts for children or knowingly collect information directly from children through this site.',
    ],
  },
  {
    heading: 'Your rights and contact',
    paragraphs: [
      'You may request access to, correction of, or deletion of the information you submitted, and you may ask us to stop contacting you. For this demonstration, contact the school office at hello@aurevia.school. A real institution would also publish the name and contact details of its grievance officer.',
    ],
  },
]

export default function PrivacyPage() {
  usePageMeta({
    title: 'Privacy Policy',
    description:
      'How enquiry information would be collected, used and protected on a school website built with this demonstration platform.',
    path: '/privacy',
    noIndex: true,
  })

  return (
    <PolicyPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="How enquiry information is collected, used and protected — written as sample policy content for a demonstration school website."
      path="/privacy"
      lastUpdated="1 October 2026"
      sections={sections}
    />
  )
}
