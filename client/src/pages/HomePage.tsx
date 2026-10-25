import { AboutSection } from '../components/home/about-section'
import { AcademicProgramsSection } from '../components/home/academic-programs-section'
import { AchievementsSection } from '../components/home/achievements-section'
import { AdmissionsCTA } from '../components/home/admissions-cta'
import { FacilitiesSection } from '../components/home/facilities-section'
import { HeroSection } from '../components/home/hero-section'
import { HighlightsSection } from '../components/home/highlights-section'
import { NewsSection } from '../components/home/news-section'
import { StudentLifeSection } from '../components/home/student-life-section'
import { TestimonialsSection } from '../components/home/testimonials-section'
import { WhyChooseSection } from '../components/home/why-choose-section'
import { institution } from '../config/institution'
import { usePageMeta } from '../lib/seo'

export default function HomePage() {
  usePageMeta({
    title: 'Where Curiosity Becomes Confidence',
    description: institution.seo.description,
    path: '/',
  })

  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <AboutSection />
      <AcademicProgramsSection />
      <WhyChooseSection />
      <FacilitiesSection />
      <StudentLifeSection />
      <AchievementsSection />
      <TestimonialsSection />
      <NewsSection />
      <AdmissionsCTA />
    </>
  )
}
