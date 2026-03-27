export type AssessmentType = 'Quiz' | 'Performance Task' | 'Written Work' | 'Quarter Exam'
export type Quarter = '1st Quarter' | '2nd Quarter' | '3rd Quarter' | '4th Quarter'

export type AssessmentQuestion = {
  id: string
  prompt: string
  choices: string[]
  answerKey: string
}

export type AssessmentSectionSchedule = {
  sectionId: string
  date: string
  time: string
}

export type AssessmentRecord = {
  id: string
  title: string
  type: AssessmentType
  sectionId: string
  sectionIds?: string[]
  sectionSchedules?: AssessmentSectionSchedule[]
  quarter: Quarter
  points: string
  dueDate: string
  instructions?: string
  questions?: AssessmentQuestion[]
}

export const assessmentTypes: AssessmentType[] = ['Quiz', 'Performance Task', 'Written Work', 'Quarter Exam']
export const quarterOptions: Quarter[] = ['1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter']

export const initialAssessments: AssessmentRecord[] = [
  {
    id: 'asm-01',
    title: 'Quiz 2 - Systems Review',
    type: 'Quiz',
    sectionId: 'bsis-3a-sad',
    sectionIds: ['bsis-3a-sad'],
    sectionSchedules: [{ sectionId: 'bsis-3a-sad', date: '2026-04-12', time: '08:00' }],
    quarter: '2nd Quarter',
    points: '20',
    dueDate: '2026-04-12',
    instructions: 'Read each item carefully. Choose the best answer before submitting your response sheet.',
    questions: [
      {
        id: 'asm-01-q1',
        prompt: 'What is the primary purpose of a use case diagram?',
        choices: [
          'To model user interactions',
          'To design a database schema',
          'To track payroll flow',
          'To format a research paper',
        ],
        answerKey: 'To model user interactions',
      },
      {
        id: 'asm-01-q2',
        prompt: 'Which phase usually defines the system scope and core actors?',
        choices: ['Requirements analysis', 'Testing', 'Deployment', 'Maintenance'],
        answerKey: 'Requirements analysis',
      },
    ],
  },
  {
    id: 'asm-02',
    title: 'Case Study 02',
    type: 'Performance Task',
    sectionId: 'bsis-3a-sad',
    sectionIds: ['bsis-3a-sad'],
    sectionSchedules: [{ sectionId: 'bsis-3a-sad', date: '2026-04-15', time: '13:00' }],
    quarter: '2nd Quarter',
    points: '50',
    dueDate: '2026-04-15',
    instructions: 'Present a short systems proposal with annotated workflow diagrams.',
    questions: [],
  },
  {
    id: 'asm-03',
    title: 'Reflection Journal 04',
    type: 'Written Work',
    sectionId: 'bsed-2b-ael',
    sectionIds: ['bsed-2b-ael'],
    sectionSchedules: [{ sectionId: 'bsed-2b-ael', date: '2026-04-18', time: '10:00' }],
    quarter: '2nd Quarter',
    points: '25',
    dueDate: '2026-04-18',
    instructions: 'Write a structured reflection based on formative assessment practices discussed in class.',
    questions: [],
  },
  {
    id: 'asm-04',
    title: 'Midterm Examination',
    type: 'Quarter Exam',
    sectionId: 'bshm-1c-fso',
    sectionIds: ['bshm-1c-fso'],
    sectionSchedules: [{ sectionId: 'bshm-1c-fso', date: '2026-04-22', time: '09:30' }],
    quarter: '2nd Quarter',
    points: '60',
    dueDate: '2026-04-22',
    instructions: 'Answer all items. Use complete and concise responses where required.',
    questions: [],
  },
]

const assessmentsStorageKey = 'nalaka-faculty-assessments'

export function loadAssessmentRecords() {
  if (typeof window === 'undefined') {
    return initialAssessments
  }

  try {
    const stored = window.localStorage.getItem(assessmentsStorageKey)
    if (!stored) {
      return initialAssessments
    }

    const parsed = JSON.parse(stored) as AssessmentRecord[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialAssessments
  } catch {
    return initialAssessments
  }
}

export function saveAssessmentRecords(records: AssessmentRecord[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(assessmentsStorageKey, JSON.stringify(records))
}
