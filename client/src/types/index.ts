export type InstitutionMode = 'school' | 'college'

export type IconName =
  | 'compass'
  | 'users'
  | 'sparkles'
  | 'heart'
  | 'book'
  | 'flask'
  | 'trophy'
  | 'shield'
  | 'palette'
  | 'globe'
  | 'leaf'
  | 'lightbulb'
  | 'graduation'
  | 'target'
  | 'handshake'

export interface ImageAsset {
  src: string
  alt: string
  caption?: string
}

export interface NavItem {
  label: string
  to: string
  description?: string
  children?: NavItem[]
}

export interface Announcement {
  isOpen: boolean
  label: string
  detail: string
  academicYear: string
}

export interface Program {
  slug: string
  name: string
  stage: string
  grades: string
  ages: string
  summary: string
  intro: string
  highlights: string[]
  subjects: string[]
  approach: { title: string; description: string }[]
  image: ImageAsset
}

export interface Highlight {
  title: string
  description: string
  icon: IconName
}

export interface ValueProp {
  title: string
  description: string
  icon: IconName
}

export interface Facility {
  slug: string
  title: string
  description: string
  tag: string
  image: ImageAsset
}

export interface StudentLifeItem {
  slug: string
  title: string
  description: string
  image: ImageAsset
}

export interface AchievementGroup {
  title: string
  note: string
  items: { value: string; label: string }[]
}

export interface Milestone {
  year: string
  title: string
  description: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
}

export interface ArticleBlock {
  type: 'paragraph' | 'heading' | 'list' | 'quote'
  text?: string
  items?: string[]
}

export interface NewsPost {
  slug: string
  title: string
  category: string
  date: string
  excerpt: string
  readTime: string
  image: ImageAsset
  featured?: boolean
  body: ArticleBlock[]
}

export interface CampusEvent {
  slug: string
  title: string
  date: string
  time: string
  venue: string
  category: string
  description: string
  image: ImageAsset
}

export interface Person {
  name: string
  role: string
  bio: string
  focus: string
  image: ImageAsset
}

export interface Faq {
  question: string
  answer: string
}

export interface AdmissionStep {
  title: string
  description: string
}

export interface EligibilityRow {
  stage: string
  requirement: string
}

export interface AdmissionDate {
  label: string
  date: string
  note: string
}

/* ---------------------------------- API ---------------------------------- */

export interface EnquiryInput {
  guardianName: string
  studentName: string
  phone: string
  email?: string
  program: string
  academicYear: string
  message?: string
  consent: boolean
  website?: string
}

export interface ContactInput {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  consent: boolean
  website?: string
}

export interface EnquiryReceipt {
  id: string
  status: 'new' | 'duplicate'
  submittedAt: string
  persisted: boolean
  crm: {
    status: 'forwarded' | 'skipped' | 'failed'
    message: string
  }
  demo: boolean
}

export interface ApiSuccess<T> {
  success: true
  data: T
}

export interface ApiFailure {
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, string[]>
  }
}
