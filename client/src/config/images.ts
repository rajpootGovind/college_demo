const UNSPLASH = 'https://images.unsplash.com'

/**
 * Demo photography is sourced from Unsplash (free to use under the Unsplash
 * License). These are intentionally isolated here so a client project can swap
 * in their own campus photography without touching component code.
 */
const photoIds = {
  campusHero: 'photo-1607237138185-eedd9c632b0b',
  campusLawn: 'photo-1592280771190-3e2e4d571952',
  campusClassic: 'photo-1562774053-701939374585',
  libraryCollaboration: 'photo-1523240795612-9a054b0db644',
  libraryAisle: 'photo-1427504494785-3a9ca7044f45',
  libraryShelves: 'photo-1498243691581-b145c3f54a5a',
  scienceLab: 'photo-1532094349884-543bc11b234d',
  juniorLearning: 'photo-1588072432836-e10032774350',
  classroom: 'photo-1571260899304-425eee4c7efc',
  classroomTeacher: 'photo-1577896851231-70ef18881754',
  juniorClass: 'photo-1509062522246-3755977927d7',
  studentsOutdoor: 'photo-1517486808906-6ca8b3f04846',
  studentsCollaborating: 'photo-1522202176988-66273c2fd55f',
  studentsLaughing: 'photo-1543269865-cbf427effbad',
  kidsBackpacks: 'photo-1594608661623-aa0bd3a69d98',
  graduationCaps: 'photo-1541339907198-e08756dedf3f',
  graduationWalk: 'photo-1523580494863-6f3031224c94',
  trackSprint: 'photo-1461896836934-ffe607ba8211',
  creativeArts: 'photo-1503454537195-1dcabb73ffb9',
  seminar: 'photo-1524178232363-1fb2b075b655',
  auditorium: 'photo-1606761568499-6d2451b23c66',
  lectureHall: 'photo-1541829070764-84a7d30dd3f3',
  digitalLearning: 'photo-1610484826967-09c5720778c7',
  studentStudy: 'photo-1541178735493-479c1a27ed24',
  deskStudy: 'photo-1525921429624-479b6a26d84d',
  books: 'photo-1497633762265-9d179a990aa6',
  loveToLearn: 'photo-1546410531-bb4caa6b424d',
  textBooks: 'photo-1503676260728-1c00da094a0b',
  emptyClassroom: 'photo-1580582932707-520aed937b7b',
  portraitHead: 'photo-1573497019940-1c28c88b4f3e',
  portraitDean: 'photo-1560250097-0b93528c311a',
  portraitPrimary: 'photo-1580489944761-15a19d654956',
  portraitSenior: 'photo-1507003211169-0a1dd7228f2d',
  portraitWellbeing: 'photo-1607746882042-944635dfe10e',
  portraitFaculty: 'photo-1472099645785-5658abf4ff4e',
  portraitFacultyTwo: 'photo-1507003211169-0a1dd7228f2d',
  portraitFacultyThree: 'photo-1580489944761-15a19d654956',
} as const

export type PhotoKey = keyof typeof photoIds

export function photo(key: PhotoKey, width = 1600): string {
  return `${UNSPLASH}/${photoIds[key]}?auto=format&fit=crop&w=${width}&q=80`
}

export function photoSrcSet(key: PhotoKey, widths: number[] = [640, 960, 1280, 1600]): string {
  return widths.map((width) => `${photo(key, width)} ${width}w`).join(', ')
}

export const photoCredit = 'Photography: Unsplash contributors · demo imagery'
