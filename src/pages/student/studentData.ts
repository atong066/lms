import { forumThreads, type ForumThread, type ForumPost } from '../faculty/forumData'
import { initialAssessments, type AssessmentRecord } from '../faculty/assessmentsData'

export type StudentNavItem = {
  label: string
  to: string
  icon:
    | 'home'
    | 'subjects'
    | 'grades'
    | 'assessments'
    | 'schedule'
    | 'calendar'
    | 'forum'
    | 'profile'
    | 'settings'
}

export type StudentSubject = {
  id: string
  code: string
  title: string
  instructor: string
  room: string
  schedule: string
  units: number
  status: 'On track' | 'Needs attention' | 'Excellent'
}

export type StudentGradeRecord = {
  subjectId: string
  subject: string
  instructor: string
  quarter: string
  quizzes: number
  performanceTask: number
  writtenWork: number
  exam: number
  final: number
  remark: 'Passing' | 'Outstanding' | 'Monitor'
}

export type StudentScheduleItem = {
  id: string
  day: string
  start: string
  end: string
  subject: string
  room: string
  instructor: string
}

export type StudentCalendarEvent = {
  id: string
  date: string
  title: string
  type: 'Class' | 'Assessment' | 'Consultation' | 'School'
  detail: string
}

export type StudentAssessmentStatus = 'Open' | 'Upcoming' | 'Submitted'

export type StudentAssessmentView = AssessmentRecord & {
  status: StudentAssessmentStatus
  subject: string
  scheduleLabel: string
}

export type StudentAssessmentSubmission = {
  assessmentId: string
  answers: string[]
  submittedAt: string
  score: number
}

export type StudentProfile = {
  name: string
  studentId: string
  section: string
  program: string
  yearLevel: string
  email: string
  phone: string
  address: string
  guardian: string
  guardianPhone: string
  adviser: string
}

export const studentNavMain: StudentNavItem[] = [
  { icon: 'home', label: 'Dashboard', to: '/student/dashboard' },
  { icon: 'subjects', label: 'My Subjects', to: '/student/subjects' },
  { icon: 'grades', label: 'My Grades', to: '/student/grades' },
  { icon: 'assessments', label: 'Assessments', to: '/student/assessments' },
]

export const studentNavSupport: StudentNavItem[] = [
  { icon: 'schedule', label: 'My Schedule', to: '/student/schedule' },
  { icon: 'calendar', label: 'Calendar', to: '/student/calendar' },
  { icon: 'forum', label: 'Forum', to: '/student/forum' },
  { icon: 'profile', label: 'Profile', to: '/student/profile' },
  { icon: 'settings', label: 'Settings', to: '/student/settings' },
]

export const studentProfile: StudentProfile = {
  name: 'Ava Ramos',
  studentId: '2026-10418',
  section: 'BSIS 3A',
  program: 'Bachelor of Science in Information Systems',
  yearLevel: '3rd Year',
  email: 'ava.ramos@nalaka.edu',
  phone: '+63 917 880 1041',
  address: 'San Fernando, Pampanga, Philippines',
  guardian: 'Marissa Ramos',
  guardianPhone: '+63 917 550 2280',
  adviser: 'Michael Reyes',
}

export const studentSubjects: StudentSubject[] = [
  {
    id: 'bsis-3a-sad',
    code: 'IS 312',
    title: 'Systems Analysis and Design',
    instructor: 'Michael Reyes',
    room: 'Room 402',
    schedule: 'Mon / Wed / Fri · 07:30 AM - 09:00 AM',
    units: 3,
    status: 'Excellent',
  },
  {
    id: 'bsis-2b-dbm',
    code: 'IS 305',
    title: 'Database Management',
    instructor: 'Ariana Velasco',
    room: 'Lab 201',
    schedule: 'Tue / Fri · 10:00 AM - 11:30 AM',
    units: 3,
    status: 'On track',
  },
  {
    id: 'bsis-4a-spm',
    code: 'IS 330',
    title: 'Systems Project Management',
    instructor: 'Bryan Javier',
    room: 'Room 305',
    schedule: 'Wed / Fri · 03:00 PM - 04:30 PM',
    units: 3,
    status: 'On track',
  },
  {
    id: 'gened-ethics',
    code: 'GE 208',
    title: 'Ethics',
    instructor: 'Camila Dizon',
    room: 'Room 118',
    schedule: 'Thu · 01:00 PM - 04:00 PM',
    units: 3,
    status: 'Needs attention',
  },
]

export const studentGrades: StudentGradeRecord[] = [
  {
    subjectId: 'bsis-3a-sad',
    subject: 'Systems Analysis and Design',
    instructor: 'Michael Reyes',
    quarter: '2nd Quarter',
    quizzes: 95,
    performanceTask: 94,
    writtenWork: 93,
    exam: 96,
    final: 95,
    remark: 'Outstanding',
  },
  {
    subjectId: 'bsis-2b-dbm',
    subject: 'Database Management',
    instructor: 'Ariana Velasco',
    quarter: '2nd Quarter',
    quizzes: 89,
    performanceTask: 91,
    writtenWork: 87,
    exam: 88,
    final: 89,
    remark: 'Passing',
  },
  {
    subjectId: 'bsis-4a-spm',
    subject: 'Systems Project Management',
    instructor: 'Bryan Javier',
    quarter: '2nd Quarter',
    quizzes: 86,
    performanceTask: 90,
    writtenWork: 88,
    exam: 84,
    final: 87,
    remark: 'Passing',
  },
  {
    subjectId: 'gened-ethics',
    subject: 'Ethics',
    instructor: 'Camila Dizon',
    quarter: '2nd Quarter',
    quizzes: 78,
    performanceTask: 81,
    writtenWork: 76,
    exam: 79,
    final: 79,
    remark: 'Monitor',
  },
]

export const studentSchedule: StudentScheduleItem[] = [
  { id: 'sched-1', day: 'Monday', start: '07:30 AM', end: '09:00 AM', subject: 'Systems Analysis and Design', room: 'Room 402', instructor: 'Michael Reyes' },
  { id: 'sched-2', day: 'Tuesday', start: '10:00 AM', end: '11:30 AM', subject: 'Database Management', room: 'Lab 201', instructor: 'Ariana Velasco' },
  { id: 'sched-3', day: 'Wednesday', start: '07:30 AM', end: '09:00 AM', subject: 'Systems Analysis and Design', room: 'Room 402', instructor: 'Michael Reyes' },
  { id: 'sched-4', day: 'Wednesday', start: '03:00 PM', end: '04:30 PM', subject: 'Systems Project Management', room: 'Room 305', instructor: 'Bryan Javier' },
  { id: 'sched-5', day: 'Thursday', start: '01:00 PM', end: '04:00 PM', subject: 'Ethics', room: 'Room 118', instructor: 'Camila Dizon' },
  { id: 'sched-6', day: 'Friday', start: '07:30 AM', end: '09:00 AM', subject: 'Systems Analysis and Design', room: 'Room 402', instructor: 'Michael Reyes' },
  { id: 'sched-7', day: 'Friday', start: '10:00 AM', end: '11:30 AM', subject: 'Database Management', room: 'Lab 201', instructor: 'Ariana Velasco' },
  { id: 'sched-8', day: 'Friday', start: '03:00 PM', end: '04:30 PM', subject: 'Systems Project Management', room: 'Room 305', instructor: 'Bryan Javier' },
]

export const studentCalendarEvents: StudentCalendarEvent[] = [
  { id: 'evt-1', date: '2026-04-12', title: 'Quiz 2 - Systems Review', type: 'Assessment', detail: 'Online quiz for Systems Analysis and Design' },
  { id: 'evt-2', date: '2026-04-15', title: 'Case Study 02 submission', type: 'Assessment', detail: 'Upload the systems proposal case study' },
  { id: 'evt-3', date: '2026-04-18', title: 'Student consultation window', type: 'Consultation', detail: 'Meet your adviser at the department hub' },
  { id: 'evt-4', date: '2026-04-22', title: 'Campus assembly', type: 'School', detail: 'General assembly at the gymnasium' },
  { id: 'evt-5', date: '2026-04-23', title: 'Systems Analysis class', type: 'Class', detail: 'Checkpoint discussion and rubric review' },
]

const studentAssessmentStorageKey = 'nalaka-student-assessment-submissions'
const studentForumStorageKey = 'nalaka-student-forum-threads'

export function loadStudentSubmissions(): StudentAssessmentSubmission[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = window.localStorage.getItem(studentAssessmentStorageKey)
    if (!stored) return []
    const parsed = JSON.parse(stored) as StudentAssessmentSubmission[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveStudentSubmissions(submissions: StudentAssessmentSubmission[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(studentAssessmentStorageKey, JSON.stringify(submissions))
}

export function getStudentAssessments(): StudentAssessmentView[] {
  const submissions = loadStudentSubmissions()

  return initialAssessments
    .filter((assessment) => assessment.sectionIds?.includes('bsis-3a-sad') || assessment.sectionId === 'bsis-3a-sad')
    .map((assessment) => {
      const submission = submissions.find((item) => item.assessmentId === assessment.id)
      const schedule = assessment.sectionSchedules?.find((item) => item.sectionId === 'bsis-3a-sad')
      const dueTime = schedule?.time ? `${assessment.dueDate}T${schedule.time}:00` : `${assessment.dueDate}T23:59:00`
      const isUpcoming = new Date(dueTime).getTime() > new Date('2026-04-10T07:00:00').getTime()

      return {
        ...assessment,
        status: submission ? 'Submitted' : isUpcoming ? 'Open' : 'Upcoming',
        subject: 'Systems Analysis and Design',
        scheduleLabel: schedule?.time ? `${assessment.dueDate} · ${schedule.time}` : assessment.dueDate,
      }
    })
}

function createStudentPost(author: string, body: string): ForumPost {
  return {
    id: `student-post-${Date.now()}`,
    author,
    role: 'Student',
    initials: author
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
    joined: 'Jun 2024',
    posts: 18,
    thanks: 6,
    time: 'Mar 27, 2026 · 8:20 PM',
    subject: 'Student reply',
    body,
    thankedBy: [],
  }
}

export function loadStudentForumThreads(): ForumThread[] {
  if (typeof window === 'undefined') return forumThreads

  try {
    const stored = window.localStorage.getItem(studentForumStorageKey)
    if (!stored) return forumThreads
    const parsed = JSON.parse(stored) as ForumThread[]
    return Array.isArray(parsed) && parsed.length ? parsed : forumThreads
  } catch {
    return forumThreads
  }
}

export function saveStudentForumThreads(threads: ForumThread[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(studentForumStorageKey, JSON.stringify(threads))
}

export function addStudentForumReply(threadId: string, body: string) {
  const threads = loadStudentForumThreads()
  const updated = threads.map((thread) =>
    thread.id === threadId
      ? {
          ...thread,
          replies: thread.replies + 1,
          views: thread.views + 1,
          lastPost: 'Mar 27, 2026 · 8:20 PM',
          posts: [...thread.posts, createStudentPost(studentProfile.name, body)],
        }
      : thread,
  )

  saveStudentForumThreads(updated)
  return updated
}

export function createStudentThread(title: string, channel: string, body: string) {
  const threads = loadStudentForumThreads()
  const id =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `student-thread-${Date.now()}`

  const newThread: ForumThread = {
    id,
    title,
    starter: studentProfile.name,
    channel,
    lastPost: 'Mar 27, 2026 · 8:20 PM',
    replies: 0,
    views: 1,
    rating: 'Open',
    tone: 'discussion',
    excerpt: body,
    posts: [
      {
        ...createStudentPost(studentProfile.name, body),
        subject: title,
        badge: 'Thread starter',
      },
    ],
  }

  const updated = [newThread, ...threads]
  saveStudentForumThreads(updated)
  return newThread
}
