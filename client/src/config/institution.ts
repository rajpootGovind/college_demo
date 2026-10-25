import type {
  AdmissionDate,
  AdmissionStep,
  Announcement,
  EligibilityRow,
  Faq,
  InstitutionMode,
  NavItem,
} from '../types'
import {
  achievements,
  faqs,
  facilities,
  highlights,
  leadership,
  milestones,
  programs,
  studentLife,
  testimonials,
  values,
  whyChoose,
} from './content'
import { photo } from './images'
import { events, news } from './news'

export interface InstitutionConfig {
  identity: {
    name: string
    shortName: string
    wordmark: string
    wordmarkSub: string
    tagline: string
    mode: InstitutionMode
    typeLabel: string
    curriculum: string
    established: string
    city: string
    locationLabel: string
  }
  demo: {
    isDemo: boolean
    label: string
    notice: string
    sampleDataNote: string
  }
  contact: {
    address: {
      line1: string
      line2: string
      city: string
      region: string
      postalCode: string
      country: string
    }
    phone: string
    phoneDisplay: string
    admissionsPhone: string
    admissionsPhoneDisplay: string
    email: string
    admissionsEmail: string
    officeHours: string
    admissionsHours: string
    directionsUrl: string
  }
  socials: { label: string; href: string }[]
  navigation: NavItem[]
  labels: {
    program: string
    student: string
    guardian: string
  }
  hero: {
    eyebrow: string
    headlineLead: string
    headlineAccent: string
    supporting: string
    primaryCta: { label: string; to: string }
    secondaryCta: { label: string; to: string }
    image: { src: string; alt: string }
    stats: { value: string; label: string }[]
    statsNote: string
  }
  announcement: Announcement
  about: {
    eyebrow: string
    heading: string
    paragraphs: string[]
    vision: string
    mission: string
    approach: { title: string; description: string }[]
    imagePrimary: { src: string; alt: string; caption: string }
    imageSecondary: { src: string; alt: string }
    cta: { label: string; to: string }
  }
  admissions: {
    intro: string
    steps: AdmissionStep[]
    eligibility: EligibilityRow[]
    documents: string[]
    dates: AdmissionDate[]
    datesNote: string
    faqs: Faq[]
    enquiryNote: string
    cta: { label: string; to: string }
  }
  seo: {
    baseUrl: string
    titleTemplate: string
    description: string
    ogImage: string
  }
  content: {
    programs: typeof programs
    whyChoose: typeof whyChoose
    facilities: typeof facilities
    studentLife: typeof studentLife
    achievements: typeof achievements
    milestones: typeof milestones
    testimonials: typeof testimonials
    leadership: typeof leadership
    values: typeof values
    highlights: typeof highlights
    news: typeof news
    events: typeof events
    faqs: typeof faqs
  }
}

const siteNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  {
    label: 'Academics',
    to: '/academics',
    children: [
      ...programs.map((program) => ({
        label: program.name,
        to: `/academics/${program.slug}`,
        description: `${program.grades} · ${program.stage}`,
      })),
      {
        label: 'All academics',
        to: '/academics',
        description: 'Curriculum, faculty and learning resources',
      },
    ],
  },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Campus Life', to: '/campus-life' },
  { label: 'News & Events', to: '/news' },
  { label: 'Contact', to: '/contact' },
]

export const institution: InstitutionConfig = {
  identity: {
    name: 'Aurevia International School',
    shortName: 'Aurevia',
    wordmark: 'AUREVIA',
    wordmarkSub: 'International School',
    tagline: 'Discover Your Potential. Shape Your Future.',
    mode: 'school',
    typeLabel: 'CBSE curriculum · Nursery to Grade XII',
    curriculum: 'CBSE',
    established: '2019',
    city: 'Noida, Uttar Pradesh',
    locationLabel: 'Sector 128, Noida',
  },
  demo: {
    isDemo: true,
    label: 'Demonstration website',
    notice:
      'This is a demonstration website for a fictional institution. Names, results, addresses, contact details and testimonials are sample content and do not describe a real school.',
    sampleDataNote: 'Illustrative demo data — not an official claim.',
  },
  contact: {
    address: {
      line1: 'Aurevia Campus, Plot 12',
      line2: 'Sector 128',
      city: 'Noida',
      region: 'Uttar Pradesh',
      postalCode: '201304',
      country: 'India',
    },
    phone: '+911204000000',
    phoneDisplay: '+91 120 400 0000',
    admissionsPhone: '+919810000000',
    admissionsPhoneDisplay: '+91 98100 00000',
    email: 'hello@aurevia.school',
    admissionsEmail: 'admissions@aurevia.school',
    officeHours: 'Monday – Friday, 8:30 am – 4:30 pm',
    admissionsHours: 'Monday – Saturday, 9:00 am – 4:00 pm',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Sector+128+Noida+Uttar+Pradesh',
  },
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'YouTube', href: 'https://www.youtube.com/' },
  ],
  navigation: siteNav,
  labels: {
    program: 'Class or stage of interest',
    student: 'Student name',
    guardian: 'Parent / guardian name',
  },
  hero: {
    eyebrow: 'A place to learn, lead & grow',
    headlineLead: 'Where Curiosity',
    headlineAccent: 'Becomes Confidence.',
    supporting:
      'A learning community that inspires young minds to explore their potential, build character, and prepare for a changing world.',
    primaryCta: { label: 'Explore Admissions', to: '/admissions' },
    secondaryCta: { label: 'Discover Our Campus', to: '/campus-life' },
    image: {
      src: photo('campusHero', 2000),
      alt: 'Red-brick Aurevia campus building with lawns and a walkway in morning light',
    },
    stats: [
      { value: 'Nursery–XII', label: 'CBSE curriculum' },
      { value: '1:14', label: 'Faculty–student ratio' },
      { value: '12 acres', label: 'Learning campus' },
      { value: '40+', label: 'Clubs & activities' },
    ],
    statsNote: 'Illustrative demo figures',
  },
  announcement: {
    isOpen: true,
    label: 'Admissions open · 2026–27',
    detail:
      'Enquiries are being accepted for Nursery to Grade IX and Grade XI, subject to seat availability.',
    academicYear: '2026–27',
  },
  about: {
    eyebrow: 'Our story',
    heading: 'A school built around the way children actually learn.',
    paragraphs: [
      'Aurevia began in 2019 with a small conviction: that a school can be academically serious without being joyless, and warm without being vague about standards.',
      'Today the campus serves learners from Nursery to Grade XII, with class sizes held deliberately small, teachers who stay, and a timetable that treats sport, art and quiet reading as essential rather than optional.',
      'We are an international school in outlook and a neighbourhood school in spirit. Families are partners in the work, not an audience for it.',
    ],
    vision:
      'To be a school where every learner leaves with the confidence to think for themselves and the character to use that confidence well.',
    mission:
      'To teach rigorously, know every learner personally, and build a community that treats curiosity, kindness and effort as ordinary expectations.',
    approach: [
      {
        title: 'Teaching that starts with the learner',
        description:
          'Concepts are introduced through questions and examples learners already recognise, then deepened with practice, feedback and reflection.',
      },
      {
        title: 'Small groups, close attention',
        description:
          'Class sizes are capped, and every cohort has a faculty mentor responsible for the whole child, not just the subject.',
      },
      {
        title: 'Balance as policy',
        description:
          'Sport, arts and service sit inside the timetable. When something matters, it gets time rather than a slogan.',
      },
      {
        title: 'Families kept informed',
        description:
          'Clear, regular communication about progress — including when things are not going well.',
      },
    ],
    imagePrimary: {
      src: photo('libraryCollaboration', 1400),
      alt: 'Students reading and discussing notes around a library table',
      caption: 'Senior library, Aurevia campus',
    },
    imageSecondary: {
      src: photo('juniorLearning', 900),
      alt: 'Primary learners working together at a table',
    },
    cta: { label: 'Discover our story', to: '/about' },
  },
  admissions: {
    intro:
      'Admission at Aurevia is a conversation, not a race for seats. We want to understand your child, answer your questions honestly, and help your family decide well — even if that decision is elsewhere.',
    steps: [
      {
        title: 'Begin an enquiry',
        description:
          'Share a few details about your child and the grade you are considering. Our admissions team responds within two working days.',
      },
      {
        title: 'Visit the campus',
        description:
          'Join a campus morning or book a private tour. You will meet the Head of Section and see classrooms in session.',
      },
      {
        title: 'Learner interaction',
        description:
          'A short, age-appropriate interaction for the child and a conversation with parents. For Grades VI–XII, a written assessment in English and Mathematics.',
      },
      {
        title: 'Offer and enrolment',
        description:
          'Successful applicants receive a written offer with a clear deadline. Enrolment is confirmed once documents and the admission fee are received.',
      },
    ],
    eligibility: [
      {
        stage: 'Nursery & Kindergarten',
        requirement: 'Child should be 3+ by 31 March of the entry year; no written assessment.',
      },
      {
        stage: 'Grades I – V',
        requirement:
          'Age-appropriate placement, previous school report (if any) and a play-based interaction.',
      },
      {
        stage: 'Grades VI – X',
        requirement:
          'Report cards from the last two years, transfer certificate and a written assessment in English and Mathematics.',
      },
      {
        stage: 'Grade XI',
        requirement:
          'Grade X statement of marks, stream eligibility review and a subject-counselling conversation.',
      },
    ],
    documents: [
      'Birth certificate (photocopy)',
      'Recent passport-size photographs (4)',
      'Report cards from the previous two academic years',
      'Transfer certificate from the current school, where applicable',
      'Immunisation record',
      'Aadhaar or passport copy of the learner (for records)',
      'Proof of residence (utility bill, rent agreement or passport)',
    ],
    dates: [
      { label: 'Enquiries open', date: 'Open now', note: 'Nursery – Grade IX and Grade XI' },
      { label: 'Campus mornings', date: 'Every Saturday', note: '9:30 am – 11:30 am, by appointment' },
      { label: 'Interaction window', date: 'Nov – Jan 2027', note: 'Scheduled after the campus visit' },
      { label: 'Offers released', date: 'From Feb 2027', note: 'Written offers, subject to seat availability' },
    ],
    datesNote:
      'Indicative dates for this demonstration. A live school would publish its own confirmed admission calendar.',
    faqs: faqs,
    enquiryNote:
      'Submitting an enquiry does not guarantee admission. It begins a conversation and adds your child to the admissions process.',
    cta: { label: 'Begin admission enquiry', to: '/admissions#enquiry' },
  },
  seo: {
    baseUrl: 'https://aurevia.school',
    titleTemplate: '%s | Aurevia International School',
    description:
      'Aurevia International School, Noida — a premium CBSE learning community for Nursery to Grade XII. Explore programmes, campus life and admissions for 2026–27.',
    ogImage: photo('campusHero', 1200),
  },
  content: {
    programs,
    whyChoose,
    facilities,
    studentLife,
    achievements,
    milestones,
    testimonials,
    leadership,
    values,
    highlights,
    news,
    events,
    faqs,
  },
}

export const ADMISSION_PROGRAM_OPTIONS = [
  ...programs.map((program) => `${program.name} (${program.grades})`),
  'Not sure yet — please advise',
]
