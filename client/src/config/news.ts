import type { CampusEvent, NewsPost } from '../types'
import { photo } from './images'

export const news: NewsPost[] = [
  {
    slug: 'admissions-open-2026-27',
    title: 'Admissions for the 2026–27 session are now open',
    category: 'Admissions',
    date: '2026-10-12',
    excerpt:
      'Enquiries are open for Nursery to Grade IX and Grade XI. Campus mornings run every Saturday through November.',
    readTime: '3 min read',
    featured: true,
    image: {
      src: photo('campusHero', 1600),
      alt: 'The Aurevia campus building and front lawn on a clear morning',
    },
    body: [
      {
        type: 'paragraph',
        text: 'The admissions office has opened enquiries for the 2026–27 academic session. Families can begin with a short online enquiry, followed by a campus morning and an age-appropriate interaction for the learner.',
      },
      {
        type: 'heading',
        text: 'What families should expect',
      },
      {
        type: 'paragraph',
        text: 'Every enquiry is reviewed by the admissions team within two working days. You will receive a call to understand your child’s current school, grade and any learning support requirements before a visit is scheduled.',
      },
      {
        type: 'list',
        items: [
          'Nursery to Grade IX: enquiries open across all sections, subject to seat availability.',
          'Grade XI: Science, Commerce and Humanities streams with limited seats.',
          'Mid-year transfers are considered case by case, depending on a report review.',
        ],
      },
      {
        type: 'quote',
        text: 'An enquiry is a conversation, not a formality. It helps us understand whether Aurevia is the right place for your child.',
      },
      {
        type: 'heading',
        text: 'Campus mornings',
      },
      {
        type: 'paragraph',
        text: 'Campus mornings take place each Saturday from 9:30 am to 11:30 am, with a tour led by senior faculty and an open question-and-answer session with the Head of School. Visits are limited to thirty families to keep the morning unrushed.',
      },
      {
        type: 'paragraph',
        text: 'To request a visit, submit the admission enquiry form and mention your preferred Saturday in the message field. This article is sample content for a demonstration website; the institution is fictional.',
      },
    ],
  },
  {
    slug: 'urban-ecology-showcase',
    title: 'Grade VI learners present their first urban ecology showcase',
    category: 'Academics',
    date: '2026-09-28',
    excerpt:
      'Six weeks of fieldwork around the Noida campus ended in a student-led exhibition on water, shade and street ecology.',
    readTime: '4 min read',
    image: {
      src: photo('studentsOutdoor', 1200),
      alt: 'Students working together outdoors during a field study',
    },
    body: [
      {
        type: 'paragraph',
        text: 'Grade VI closed the first term with an exhibition of fieldwork completed across the campus and the surrounding neighbourhood. Groups studied shade cover, water run-off and the small species that share the school grounds.',
      },
      {
        type: 'heading',
        text: 'Fieldwork as a habit',
      },
      {
        type: 'paragraph',
        text: 'The unit began with a simple instruction: find something outside that nobody in the class can explain. From there, learners built observation logs, interviewed the campus facilities team and tested their assumptions with simple instruments.',
      },
      {
        type: 'list',
        items: [
          'Fourteen observation points mapped across the campus',
          'Soil permeability tested at three locations',
          'A shade-density map built with the design studio',
          'Recommendations submitted to the campus management team',
        ],
      },
      {
        type: 'paragraph',
        text: 'Two recommendations — additional seating in the east courtyard and a pollinator strip behind the kitchen garden — have been accepted for review by the facilities team.',
      },
    ],
  },
  {
    slug: 'inter-house-athletics-meet',
    title: 'Inter-house athletics meet returns to the Aurevia track',
    category: 'Campus Life',
    date: '2026-09-19',
    excerpt:
      'Three houses, 214 entries and a new school record in the 200-metre sprint marked this year’s athletics meet.',
    readTime: '3 min read',
    image: {
      src: photo('trackSprint', 1200),
      alt: 'Sprinters competing on the athletics track during a school sports meet',
    },
    body: [
      {
        type: 'paragraph',
        text: 'The annual inter-house athletics meet brought the whole school onto the track for two days of sprints, relays, jumps and throws. Participation was the headline: 214 entries across four year groups and three houses.',
      },
      {
        type: 'heading',
        text: 'A record, and a lot of first attempts',
      },
      {
        type: 'paragraph',
        text: 'A Grade X learner set a new school record in the 200-metre sprint, while more than forty learners took part in a track event for the first time. House points were awarded for participation as well as podium finishes.',
      },
      {
        type: 'quote',
        text: 'We do not want an athletics meet that only matters to the fastest twelve children in the school.',
      },
      {
        type: 'paragraph',
        text: 'The meet closed with a staff-versus-student relay, which the staff won narrowly and have been reminded of frequently since.',
      },
    ],
  },
  {
    slug: 'reading-commons-opens',
    title: 'The new reading commons opens beside the senior library',
    category: 'Campus',
    date: '2026-09-08',
    excerpt:
      'A quiet, daylit space for independent reading and small-group research is now open to Grades VI to XII.',
    readTime: '2 min read',
    image: {
      src: photo('libraryCollaboration', 1200),
      alt: 'Students reading and talking around tables in a library',
    },
    body: [
      {
        type: 'paragraph',
        text: 'The reading commons adds forty seats, low shelving and a small research desk to the senior library. It was designed after a term of consultation with the student council, who asked for fewer tables arranged in rows and more places to read without feeling watched.',
      },
      {
        type: 'heading',
        text: 'A room that behaves differently',
      },
      {
        type: 'paragraph',
        text: 'The space is deliberately split into three zones: silent reading along the windows, discussion tables at the centre, and a research corner staffed by a librarian each afternoon. Furniture can be moved by students, and the shelving is stocked with student requests.',
      },
      {
        type: 'list',
        items: [
          'Open from 7:45 am before school and until 4:30 pm after lessons',
          'Bookable by classes for research sessions',
          'Student-curated display shelf, refreshed each month',
        ],
      },
    ],
  },
  {
    slug: 'parent-teacher-conferences',
    title: 'What to expect at this term’s parent–teacher conferences',
    category: 'Announcements',
    date: '2026-09-01',
    excerpt:
      'Fifteen-minute conversations, a written progress summary and a clear next step for every learner.',
    readTime: '3 min read',
    image: {
      src: photo('seminar', 1200),
      alt: 'A teacher speaking with a group of parents in a school room',
    },
    body: [
      {
        type: 'paragraph',
        text: 'Parent–teacher conferences for the first term will be held across two evenings. Each family will meet the class mentor and subject teachers for fifteen-minute conversations, supported by a one-page progress summary.',
      },
      {
        type: 'heading',
        text: 'Preparing for the conversation',
      },
      {
        type: 'list',
        items: [
          'Read the progress summary before the meeting; it is shared two days in advance.',
          'Bring one specific question about learning, not just about marks.',
          'Ask what your child should do differently in the next six weeks.',
          'Flag any wellbeing concern you would prefer to raise privately with the mentor.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Families who cannot attend in person can request a video call. Requests should reach the section office at least three days before the scheduled evening.',
      },
    ],
  },
]

export const events: CampusEvent[] = [
  {
    slug: 'open-campus-morning-november',
    title: 'Open Campus Morning',
    date: '2026-11-07',
    time: '9:30 am – 11:30 am',
    venue: 'Aurevia Campus, Sector 128, Noida',
    category: 'Admissions',
    description:
      'A guided campus tour led by senior faculty, followed by an open conversation with the Head of School. Limited to thirty families.',
    image: {
      src: photo('campusLawn', 1000),
      alt: 'Sunlit campus building with wide lawns',
    },
  },
  {
    slug: 'science-makers-fair',
    title: 'Science & Makers Fair',
    date: '2026-11-21',
    time: '10:00 am – 2:00 pm',
    venue: 'Innovation Studio & Science Block',
    category: 'Academics',
    description:
      'Student-built prototypes, laboratory demonstrations and a live robotics challenge, open to families and partner schools.',
    image: {
      src: photo('scienceLab', 1000),
      alt: 'Laboratory equipment prepared for a science demonstration',
    },
  },
  {
    slug: 'winter-concert',
    title: 'Winter Concert: Voices of Aurevia',
    date: '2026-12-12',
    time: '5:00 pm – 7:00 pm',
    venue: 'Aurevia Auditorium',
    category: 'Campus Life',
    description:
      'The school choir, junior orchestra and drama ensemble present their end-of-term programme, with student-run stage and sound crews.',
    image: {
      src: photo('auditorium', 1000),
      alt: 'Auditorium stage prepared for a school concert',
    },
  },
]
