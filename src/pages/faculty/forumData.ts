export type ForumTone = 'notice' | 'discussion' | 'update'

export type ForumPost = {
  id: string
  author: string
  role: string
  initials: string
  joined: string
  posts: number
  thanks: number
  time: string
  subject: string
  body: string
  thankedBy?: string[]
  badge?: string
}

export type ForumThread = {
  id: string
  title: string
  starter: string
  channel: string
  lastPost: string
  replies: number
  views: number
  rating: string
  tone: ForumTone
  excerpt: string
  posts: ForumPost[]
}

const FORUM_THREADS_STORAGE_KEY = 'nalaka-faculty-forum-threads'

export const forumThreads: ForumThread[] = [
  {
    id: 'midterm-coverage-reminders',
    title: 'Midterm coverage reminders and supervision adjustments',
    starter: 'Academic Affairs Office',
    channel: 'Department faculty',
    lastPost: 'Mar 27, 2026 · 6:18 PM',
    replies: 12,
    views: 148,
    rating: 'Pinned',
    tone: 'notice',
    excerpt: 'Supervision updates and room assignments are still being finalized.',
    posts: [
      {
        id: 'post-001',
        author: 'Academic Affairs Office',
        role: 'Administrative Office',
        initials: 'AA',
        joined: 'Jan 2019',
        posts: 214,
        thanks: 37,
        time: 'Mar 27, 2026 · 3:10 PM',
        subject: 'Midterm supervision memo',
        body:
          'Please review the updated supervision blocks for midterm week. Room assignments for the lecture halls have changed, and affected faculty should confirm their revised coverage before 5:00 PM today.',
        thankedBy: ['Registrar Unit', 'Guidance Office', 'Systems Faculty'],
        badge: 'Thread starter',
      },
      {
        id: 'post-002',
        author: 'Michael Reyes',
        role: 'Systems and Education Faculty',
        initials: 'MR',
        joined: 'Jun 2021',
        posts: 84,
        thanks: 19,
        time: 'Mar 27, 2026 · 4:42 PM',
        subject: 'BSIS morning block clarification',
        body:
          'Confirming receipt. For BSIS 3A, I can cover the original 7:30 AM slot, but I need the final room assignment for the 9:00 AM supervision handoff before I brief the students.',
        thankedBy: ['Academic Affairs Office', 'Department Chair'],
      },
      {
        id: 'post-003',
        author: 'Campus Operations',
        role: 'Operations Team',
        initials: 'CO',
        joined: 'Aug 2020',
        posts: 126,
        thanks: 24,
        time: 'Mar 27, 2026 · 6:18 PM',
        subject: 'Updated rooms attached',
        body:
          'Lecture Hall B is now assigned to the second supervision block. Annex rooms remain unchanged. Final signage will be posted before the campus closes tonight.',
        thankedBy: ['Michael Reyes', 'College Secretary', 'Faculty Affairs'],
      },
    ],
  },
  {
    id: 'bsis-rubric-clarifications',
    title: 'BSIS 3A capstone rubric clarifications for checkpoint week',
    starter: 'Michael Reyes',
    channel: 'Systems Analysis',
    lastPost: 'Mar 27, 2026 · 4:42 PM',
    replies: 8,
    views: 64,
    rating: 'Active',
    tone: 'discussion',
    excerpt: 'Checkpoint rubric notes for adviser consultation and scoring alignment.',
    posts: [
      {
        id: 'post-004',
        author: 'Michael Reyes',
        role: 'Systems and Education Faculty',
        initials: 'MR',
        joined: 'Jun 2021',
        posts: 84,
        thanks: 19,
        time: 'Mar 27, 2026 · 1:26 PM',
        subject: 'Rubric reference for checkpoint week',
        body:
          'Sharing the working rubric for the BSIS 3A checkpoint presentations. Please use the revised criteria for problem framing, stakeholder mapping, and solution feasibility so our scoring stays aligned across panels.',
        badge: 'Thread starter',
      },
      {
        id: 'post-005',
        author: 'Faculty Mentor Group',
        role: 'Program Faculty',
        initials: 'FM',
        joined: 'Sep 2018',
        posts: 59,
        thanks: 11,
        time: 'Mar 27, 2026 · 2:14 PM',
        subject: 'Need weighting confirmation',
        body:
          'Can we confirm if stakeholder documentation stays at 15% for checkpoint week, or if we are moving that weight to presentation clarity? A few advisers are already briefing students this afternoon.',
        thankedBy: ['Michael Reyes'],
      },
    ],
  },
  {
    id: 'room-swap-thursday',
    title: 'Room swap for Thursday teaching blocks',
    starter: 'Campus Operations',
    channel: 'Facilities and scheduling',
    lastPost: 'Mar 27, 2026 · 2:06 PM',
    replies: 5,
    views: 51,
    rating: 'Update',
    tone: 'update',
    excerpt: 'Temporary room changes for classes affected by maintenance in the main wing.',
    posts: [
      {
        id: 'post-006',
        author: 'Campus Operations',
        role: 'Operations Team',
        initials: 'CO',
        joined: 'Aug 2020',
        posts: 126,
        thanks: 24,
        time: 'Mar 27, 2026 · 10:03 AM',
        subject: 'Thursday room swap advisory',
        body:
          'Main Wing rooms 401 to 404 will be unavailable on Thursday due to electrical work. Affected classes have been transferred to the Annex building and the updated room list is included in the attached memo.',
        badge: 'Thread starter',
      },
    ],
  },
  {
    id: 'assessment-week-consultations',
    title: 'Assessment week forum for learner consultation requests',
    starter: 'Guidance Office',
    channel: 'Faculty support',
    lastPost: 'Mar 26, 2026 · 7:34 PM',
    replies: 16,
    views: 179,
    rating: 'Open',
    tone: 'discussion',
    excerpt: 'Consultation scheduling and learner concerns have the highest thread activity today.',
    posts: [
      {
        id: 'post-007',
        author: 'Guidance Office',
        role: 'Student Support Unit',
        initials: 'GO',
        joined: 'Feb 2017',
        posts: 172,
        thanks: 43,
        time: 'Mar 26, 2026 · 9:15 AM',
        subject: 'Consultation requests tracker',
        body:
          'Please post learner consultation requests here if you need guidance support during assessment week. Include section, concern category, and your preferred consultation window so we can group endorsements properly.',
        badge: 'Thread starter',
      },
    ],
  },
  {
    id: 'friday-colloquium-attendance',
    title: 'Friday colloquium attendance and substitute coverage',
    starter: 'College Secretary',
    channel: 'Faculty operations',
    lastPost: 'Mar 26, 2026 · 11:12 AM',
    replies: 4,
    views: 38,
    rating: 'Notice',
    tone: 'notice',
    excerpt: 'Attendance confirmation and relief coverage for Friday’s colloquium program.',
    posts: [
      {
        id: 'post-008',
        author: 'College Secretary',
        role: 'College Office',
        initials: 'CS',
        joined: 'May 2018',
        posts: 101,
        thanks: 28,
        time: 'Mar 26, 2026 · 8:40 AM',
        subject: 'Colloquium attendance sheet',
        body:
          'Please confirm attendance and indicate if you need substitute classroom coverage during the colloquium. Final attendance sheets will be submitted to the dean by noon tomorrow.',
        badge: 'Thread starter',
      },
    ],
  },
]

export function loadForumThreads(): ForumThread[] {
  if (typeof window === 'undefined') {
    return forumThreads
  }

  const stored = window.localStorage.getItem(FORUM_THREADS_STORAGE_KEY)
  if (!stored) {
    return forumThreads
  }

  try {
    const parsed = JSON.parse(stored) as ForumThread[]
    return Array.isArray(parsed) && parsed.length ? parsed : forumThreads
  } catch {
    return forumThreads
  }
}

export function saveForumThreads(threads: ForumThread[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(FORUM_THREADS_STORAGE_KEY, JSON.stringify(threads))
}

export function createForumThreadId(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `thread-${Date.now()}`
  )
}
