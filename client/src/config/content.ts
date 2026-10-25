import type {
  AchievementGroup,
  Faq,
  Facility,
  Highlight,
  Milestone,
  Person,
  Program,
  StudentLifeItem,
  Testimonial,
  ValueProp,
} from '../types'
import { photo } from './images'

export const highlights: Highlight[] = [
  {
    title: 'Learning-first campus',
    description:
      'Classrooms, libraries and studios arranged around how children actually concentrate, collaborate and create.',
    icon: 'compass',
  },
  {
    title: 'Experienced educators',
    description:
      'Subject specialists and pastoral mentors who stay with a cohort long enough to know each learner.',
    icon: 'users',
  },
  {
    title: 'Purpose-built spaces',
    description:
      'Science laboratories, a maker studio, a 400-seat auditorium and a full athletics programme on one campus.',
    icon: 'sparkles',
  },
  {
    title: 'Whole-child development',
    description:
      'Academic rigour balanced with sport, the arts, service and a structured wellbeing programme.',
    icon: 'heart',
  },
]

export const programs: Program[] = [
  {
    slug: 'primary-school',
    name: 'Primary School',
    stage: 'Foundation Years',
    grades: 'Nursery – Grade V',
    ages: 'Ages 3–10',
    summary:
      'A warm, play-rich beginning where reading fluency, number sense and confidence grow together.',
    intro:
      'The Primary years at Aurevia are deliberately unhurried. Children learn through story, structured play, exploration and conversation, with two adults in every early-years room. Our aim is not to rush children through a syllabus, but to build the language, numeracy and self-belief they will rely on for the next twelve years.',
    highlights: [
      'Maximum 22 learners per class with a teacher and co-teacher',
      'Daily reading and reflection time built into the timetable',
      'Outdoor learning in the campus garden and nature trail',
      'No formal examinations before Grade III',
    ],
    subjects: [
      'English Language & Literature',
      'Mathematics',
      'Environmental Studies',
      'Hindi',
      'Art, Music & Movement',
      'Physical Education',
    ],
    approach: [
      {
        title: 'Language through immersion',
        description:
          'Phonics, read-alouds and guided writing are timetabled every day, supported by a dedicated reading specialist.',
      },
      {
        title: 'Mathematics with materials',
        description:
          'Children work with concrete materials before symbols, building number sense rather than memorising procedures.',
      },
      {
        title: 'Learning to be a learner',
        description:
          'Short, structured projects introduce planning, collaboration and the habit of asking better questions.',
      },
    ],
    image: {
      src: photo('juniorLearning', 1400),
      alt: 'Young learners writing in workbooks at a shared table in a bright primary classroom',
    },
  },
  {
    slug: 'middle-school',
    name: 'Middle School',
    stage: 'Exploration Years',
    grades: 'Grades VI – VIII',
    ages: 'Ages 11–13',
    summary:
      'Subject depth, research habits and the first real taste of independence and self-direction.',
    intro:
      'Middle School is where curiosity either narrows or widens. We use these three years to widen it: learners rotate through science, design, coding, debate and the arts while a pastoral mentor keeps a close watch on confidence and belonging. Study skills are taught explicitly, not assumed.',
    highlights: [
      'Interdisciplinary projects each term',
      'Introduction to coding, robotics and design thinking',
      'Inter-house debate, quiz and athletics competitions',
      'Structured study-skills and digital-citizenship programme',
    ],
    subjects: [
      'English',
      'Mathematics',
      'Science',
      'Social Science',
      'Hindi / Sanskrit',
      'Computer Science & Design',
      'Art, Music & Drama',
    ],
    approach: [
      {
        title: 'Enquiry before answers',
        description:
          'Units begin with a question, not a chapter. Learners gather evidence, test ideas and present a position.',
      },
      {
        title: 'A mentor for every cohort',
        description:
          'Each class has a pastoral mentor who reviews progress across subjects and stays in regular contact with families.',
      },
      {
        title: 'Digital fluency with judgement',
        description:
          'A one-to-one device programme is paired with an explicit curriculum on research, privacy and responsible use.',
      },
    ],
    image: {
      src: photo('studentStudy', 1400),
      alt: 'Middle school learner working on a laptop during a lesson',
    },
  },
  {
    slug: 'secondary-school',
    name: 'Secondary School',
    stage: 'Consolidation Years',
    grades: 'Grades IX – X',
    ages: 'Ages 14–15',
    summary:
      'Focused board examination preparation that does not narrow curiosity or squeeze out the arts.',
    intro:
      'Grades IX and X carry real academic weight. Our approach pairs steady, transparent preparation for CBSE examinations with a deliberate protection of the things that keep adolescents well: sport, creative work, friendship and sleep. Progress is tracked continuously and shared with families honestly.',
    highlights: [
      'CBSE-aligned curriculum with fortnightly formative checks',
      'Small-group clinics for every core subject',
      'Subject-choice counselling ahead of Grade XI',
      'Continued sport, arts and service commitments',
    ],
    subjects: [
      'English',
      'Mathematics (Standard / Basic)',
      'Science',
      'Social Science',
      'Hindi / Sanskrit',
      'Information Technology',
      'Art & Physical Education',
    ],
    approach: [
      {
        title: 'Transparent assessment',
        description:
          'Families receive a clear picture of where a learner stands and what specific next step will help.',
      },
      {
        title: 'Support without stigma',
        description:
          'Subject clinics and supervised study are scheduled within the school day, so support is normal rather than remedial.',
      },
      {
        title: 'Choices made early',
        description:
          'Stream counselling begins in Grade IX with aptitude conversations, university pathways and parent sessions.',
      },
    ],
    image: {
      src: photo('scienceLab', 1400),
      alt: 'Glassware arranged on a laboratory bench during a secondary school science practical',
    },
  },
  {
    slug: 'senior-secondary',
    name: 'Senior Secondary',
    stage: 'Specialisation Years',
    grades: 'Grades XI – XII',
    ages: 'Ages 16–18',
    summary:
      'Three streams, one promise: a rigorous academic pathway shaped around the learner’s ambitions.',
    intro:
      'Senior Secondary is a partnership. Learners choose from Science, Commerce and Humanities streams, then build a profile — subject combinations, research projects, internships, sport and leadership — that reflects where they actually want to go. Our university guidance team works with every student from the first term of Grade XI.',
    highlights: [
      'Science, Commerce and Humanities streams',
      'Independent research project in Grade XII',
      'University and career counselling from term one',
      'Internships and mentoring with partner organisations',
    ],
    subjects: [
      'Physics, Chemistry, Biology / Mathematics',
      'Accountancy, Business Studies, Economics',
      'History, Political Science, Psychology',
      'English & elective languages',
      'Computer Science / Informatics Practices',
      'Physical Education & Fine Arts',
    ],
    approach: [
      {
        title: 'Depth over coaching',
        description:
          'Conceptual teaching is the priority. We avoid turning Grades XI and XII into a test-prep treadmill.',
      },
      {
        title: 'A mentor for the journey',
        description:
          'Each learner has a faculty mentor for academic planning, applications and the pressures that come with both.',
      },
      {
        title: 'Evidence of learning',
        description:
          'Capstone projects, laboratory investigations and presentations give students a body of work beyond marks.',
      },
    ],
    image: {
      src: photo('studentsOutdoor', 1400),
      alt: 'Group of senior students sitting together on campus steps in daylight',
    },
  },
]

export const whyChoose: ValueProp[] = [
  {
    title: 'Student-centred learning',
    description:
      'Small teaching groups, flexible support and a genuine attempt to teach each learner where they are.',
    icon: 'target',
  },
  {
    title: 'Faculty who stay',
    description:
      'Subject specialists with a long-term stake in the school, supported by ongoing professional development.',
    icon: 'users',
  },
  {
    title: 'Sport and movement, daily',
    description:
      'Every learner has timetabled physical activity, with competitive teams across athletics, football and cricket.',
    icon: 'trophy',
  },
  {
    title: 'Spaces built for making',
    description:
      'Science laboratories, a design and innovation studio, and a library that behaves like a workshop.',
    icon: 'flask',
  },
  {
    title: 'Guidance that starts early',
    description:
      'Career and university counselling begins in Grade IX — not in the final year of school.',
    icon: 'compass',
  },
  {
    title: 'A campus that feels safe',
    description:
      'Trained pastoral staff, a clear anti-bullying framework and a wellbeing centre families can talk to directly.',
    icon: 'shield',
  },
]

export const facilities: Facility[] = [
  {
    slug: 'smart-classrooms',
    title: 'Smart classrooms',
    tag: 'Learning',
    description:
      'Daylit rooms with flexible seating, interactive displays and acoustics designed for discussion rather than delivery.',
    image: {
      src: photo('classroom', 1200),
      alt: 'Learners seated in a modern, daylit secondary classroom',
    },
  },
  {
    slug: 'library',
    title: 'Library & reading commons',
    tag: 'Resources',
    description:
      'A 14,000-volume collection, quiet study zones, group discussion tables and a dedicated research desk.',
    image: {
      src: photo('libraryShelves', 1200),
      alt: 'Shelves lined with books along a bright library aisle',
    },
  },
  {
    slug: 'science-laboratories',
    title: 'Science laboratories',
    tag: 'Sciences',
    description:
      'Separate physics, chemistry and biology laboratories with laboratory technicians present at every practical.',
    image: {
      src: photo('scienceLab', 1200),
      alt: 'Laboratory glassware and equipment on a clean bench',
    },
  },
  {
    slug: 'innovation-lab',
    title: 'Innovation & maker studio',
    tag: 'Technology',
    description:
      'Robotics, 3D printing, electronics and a design workshop where projects move from sketch to prototype.',
    image: {
      src: photo('digitalLearning', 1200),
      alt: 'Learner wearing headphones while working on a computer in a digital studio',
    },
  },
  {
    slug: 'sports',
    title: 'Sports & athletics',
    tag: 'Wellbeing',
    description:
      'A 200-metre track, multipurpose courts, a cricket net facility and a strength and conditioning room.',
    image: {
      src: photo('trackSprint', 1200),
      alt: 'Athlete in starting position on a red running track',
    },
  },
  {
    slug: 'auditorium',
    title: 'Auditorium & performing arts',
    tag: 'Arts',
    description:
      'A 400-seat auditorium with rehearsal rooms, music practice space and a black-box drama studio.',
    image: {
      src: photo('auditorium', 1200),
      alt: 'Auditorium seating facing a lit stage and projection screen',
    },
  },
  {
    slug: 'wellbeing-centre',
    title: 'Wellbeing centre',
    tag: 'Support',
    description:
      'A calm, independently staffed space for counselling, health checks and quiet time away from the timetable.',
    image: {
      src: photo('studentsCollaborating', 1200),
      alt: 'Students in conversation with a mentor around a laptop',
    },
  },
]

export const studentLife = {
  intro:
    'School is not only what happens in a classroom. Sport, performance, service and friendship are where many learners discover what they are capable of.',
  quote:
    'The best moments in a school are rarely planned. They happen when a child finds an audience, a team or a reason to keep going.',
  quoteAttribution: 'Dr. Miriam Vaz, Head of School',
  items: [
    {
      slug: 'sport',
      title: 'Sport & fitness',
      description:
        'Daily activity for every learner, plus inter-house leagues and competitive teams in athletics, football, cricket and basketball.',
      image: {
        src: photo('trackSprint', 1200),
        alt: 'Sprinter leaving the starting blocks on a school athletics track',
        caption: 'Inter-house athletics meet',
      },
    },
    {
      slug: 'performing-arts',
      title: 'Cultural & performing arts',
      description:
        'Music, dance, theatre and annual productions staged in the Aurevia auditorium, with technical crews run by students.',
      image: {
        src: photo('seminar', 1200),
        alt: 'Students performing and presenting in a school auditorium',
        caption: 'Winter showcase rehearsal',
      },
    },
    {
      slug: 'clubs',
      title: 'Clubs & competitions',
      description:
        'Debate, robotics, model United Nations, creative writing and astronomy — most clubs are proposed and led by students.',
      image: {
        src: photo('studentsLaughing', 1200),
        alt: 'A group of students laughing together around a table on campus',
        caption: 'Robotics club build session',
      },
    },
    {
      slug: 'creative-arts',
      title: 'Creative arts',
      description:
        'Studio art, ceramics, digital illustration and photography, exhibited twice a year in the campus gallery corridor.',
      image: {
        src: photo('creativeArts', 1200),
        alt: 'Child with paint on their face smiling during an art activity',
        caption: 'Primary art immersion day',
      },
    },
    {
      slug: 'community',
      title: 'Community engagement',
      description:
        'Paired literacy programmes, neighbourhood clean-ups and fundraising led by the student council each term.',
      image: {
        src: photo('kidsBackpacks', 1200),
        alt: 'Children with colourful backpacks walking to school together',
        caption: 'Community reading partnership',
      },
    },
  ] satisfies StudentLifeItem[],
}

export const achievements: AchievementGroup[] = [
  {
    title: 'Senior school profile',
    note: 'Sample figures for demonstration — not an official CBSE result.',
    items: [
      { value: '96.4%', label: 'Average across best five subjects' },
      { value: '38%', label: 'Learners scoring above 90%' },
      { value: '100%', label: 'University applications supported' },
    ],
  },
  {
    title: 'Secondary school profile',
    note: 'Sample figures for demonstration — not an official CBSE result.',
    items: [
      { value: '100%', label: 'Cohort appeared and completed' },
      { value: '94.6%', label: 'School average aggregate' },
      { value: '1:8', label: 'Faculty-to-cohort mentoring ratio' },
    ],
  },
  {
    title: 'Learning beyond examinations',
    note: 'Illustrative participation data for this demo site.',
    items: [
      { value: '42', label: 'Clubs and societies running' },
      { value: '310', label: 'Community service hours pledged' },
      { value: '17', label: 'Inter-school platforms hosted' },
    ],
  },
]

export const milestones: Milestone[] = [
  {
    year: '2019',
    title: 'Aurevia opens its gates',
    description:
      'The school begins with Primary and Middle sections, one library and a promise to keep classes small.',
  },
  {
    year: '2022',
    title: 'Senior Secondary launched',
    description:
      'Science, Commerce and Humanities streams open, along with the university guidance office.',
  },
  {
    year: '2024',
    title: 'Innovation studio',
    description:
      'The maker studio and design workshop open, adding robotics, electronics and 3D prototyping to the timetable.',
  },
  {
    year: '2026',
    title: 'Campus expansion',
    description:
      'A new reading commons, wellbeing centre and extended athletics facilities complete the current campus.',
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      'What convinced us was not a brochure. It was the way the teachers talked about our daughter after just one visit — specific, honest, and clearly paying attention.',
    name: 'Ritika Sharma',
    role: 'Parent, Grade VII',
  },
  {
    quote:
      'The workload is serious, but nobody has told my son to drop music to manage it. That balance is the reason we chose Aurevia.',
    name: 'Sanjay Menon',
    role: 'Parent, Grade X',
  },
  {
    quote:
      'I arrived in Grade XI convinced I was bad at mathematics. My teacher spent a term proving me wrong, one afternoon at a time.',
    name: 'Aarav Gupta',
    role: 'Student, Grade XII',
  },
  {
    quote:
      'The university guidance started early and never felt like selling a destination. It felt like being helped to think clearly.',
    name: 'Nadia Rizvi',
    role: 'Parent, Grade XII',
  },
]

export const leadership: Person[] = [
  {
    name: 'Dr. Miriam Vaz',
    role: 'Head of School',
    focus: 'Teaching & learning',
    bio: 'Eighteen years in school leadership across India and the Gulf. Her work focuses on keeping class sizes small enough for teachers to know every learner.',
    image: {
      src: photo('portraitHead', 800),
      alt: 'Portrait of Dr. Miriam Vaz, Head of School',
    },
  },
  {
    name: 'Adrian Fernandes',
    role: 'Director of Academics',
    focus: 'Curriculum',
    bio: 'A former CBSE examiner and physics teacher, Adrian leads curriculum design, assessment practice and faculty development.',
    image: {
      src: photo('portraitDean', 800),
      alt: 'Portrait of Adrian Fernandes, Director of Academics',
    },
  },
  {
    name: 'Rhea D’Souza',
    role: 'Head of Primary School',
    focus: 'Early years',
    bio: 'A primary practitioner with a specialism in early literacy, Rhea has designed the school’s reading and transition programmes.',
    image: {
      src: photo('portraitPrimary', 800),
      alt: 'Portrait of Rhea D’Souza, Head of Primary School',
    },
  },
  {
    name: 'Karan Bhatia',
    role: 'Head of Senior School',
    focus: 'University guidance',
    bio: 'Karan teaches economics and leads the careers office, working with every Grade XI and XII family on post-school pathways.',
    image: {
      src: photo('portraitSenior', 800),
      alt: 'Portrait of Karan Bhatia, Head of Senior School',
    },
  },
  {
    name: 'Sana Iqbal',
    role: 'Head of Student Wellbeing',
    focus: 'Pastoral care',
    bio: 'A counselling psychologist, Sana oversees the pastoral team, the wellbeing centre and the school’s anti-bullying framework.',
    image: {
      src: photo('portraitWellbeing', 800),
      alt: 'Portrait of Sana Iqbal, Head of Student Wellbeing',
    },
  },
]

export const values = [
  {
    title: 'Curiosity',
    description: 'We reward good questions as openly as correct answers.',
  },
  {
    title: 'Integrity',
    description: 'We tell families the truth about progress, even when it is inconvenient.',
  },
  {
    title: 'Belonging',
    description: 'Every learner should be known by name, and by more than their marks.',
  },
  {
    title: 'Courage',
    description: 'We make room to attempt difficult things and to recover from failure.',
  },
  {
    title: 'Stewardship',
    description: 'We take care of the campus, the community and one another.',
  },
]

export const faqs: Faq[] = [
  {
    question: 'Which curriculum does Aurevia follow?',
    answer:
      'Aurevia is designed around the CBSE curriculum from Nursery to Grade XII, with Science, Commerce and Humanities streams in the Senior Secondary years. This is a demonstration website: the school is fictional and holds no real affiliation.',
  },
  {
    question: 'When do admissions open for 2026–27?',
    answer:
      'Enquiries are accepted year-round. For the 2026–27 session, the enquiry window is open for Nursery to Grade IX and Grade XI, subject to seat availability in each grade.',
  },
  {
    question: 'Is there an entrance assessment?',
    answer:
      'Primary applicants attend a short, play-based interaction. From Grade VI onwards, learners complete a written assessment in English and Mathematics, followed by a conversation with the Head of Section. We do not coach for this assessment.',
  },
  {
    question: 'What documents are required?',
    answer:
      'A birth certificate, previous school reports, a transfer certificate (where applicable), immunisation records, proof of residence, and four passport-size photographs. The admissions office will confirm the exact list for your child’s grade.',
  },
  {
    question: 'Does submitting an enquiry confirm a seat?',
    answer:
      'No. An enquiry starts a conversation and adds your child to the admissions process. Seats are offered only after an interaction, document review and a written offer from the admissions committee.',
  },
  {
    question: 'How do you support new students joining mid-year?',
    answer:
      'Every new learner is paired with a buddy and a faculty mentor for the first term. The wellbeing team checks in during weeks two, six and twelve, and families receive a direct contact in the section office.',
  },
  {
    question: 'Is transport available across Noida?',
    answer:
      'Yes. GPS-tracked buses run on planned routes across Noida, Greater Noida and Indirapuram, with a trained attendant on every vehicle. Route feasibility is confirmed at the time of enrolment.',
  },
]
