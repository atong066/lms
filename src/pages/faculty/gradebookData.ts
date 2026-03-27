export type FacultyNavItem = {
  label: string
  to: string
  icon: 'home' | 'classes' | 'gradebook' | 'assessments' | 'forum' | 'resources' | 'calendar' | 'settings'
  active?: boolean
}

export type GradebookSection = {
  id: string
  code: string
  title: string
  subject: string
  block: string
  students: number
  quarter: string
  pending: number
}

export type GradebookStudent = {
  id: string
  name: string
  sectionId: string
  section: string
  average: string
  status: 'Passing' | 'Needs Review' | 'Incomplete'
}

export const facultyNavMain: FacultyNavItem[] = [
  { icon: 'home', label: 'Overview', to: '/faculty/dashboard' },
  { icon: 'classes', label: 'My Classes', to: '/faculty/classes' },
  { icon: 'gradebook', label: 'Gradebook', to: '/faculty/gradebook', active: true },
  { icon: 'assessments', label: 'Assessments', to: '/faculty/assessments' },
]

export const facultyNavSupport: FacultyNavItem[] = [
  { icon: 'forum', label: 'Forum', to: '/faculty/forum' },
  { icon: 'resources', label: 'Resources', to: '/faculty/resources' },
  { icon: 'calendar', label: 'Calendar', to: '/faculty/calendar' },
  { icon: 'settings', label: 'Settings', to: '/faculty/settings' },
]

export const gradebookSections: GradebookSection[] = [
  {
    id: 'bsis-3a-sad',
    code: 'BSIS 3A',
    title: 'Systems Analysis and Design',
    subject: 'Subject: Systems Analysis and Design',
    block: 'Mon / Wed / Fri · 07:30 AM - 09:00 AM',
    students: 50,
    quarter: '2nd Quarter',
    pending: 18,
  },
  {
    id: 'bsed-2b-ael',
    code: 'BSED 2B',
    title: 'Assessment in Learning',
    subject: 'Subject: Assessment in Learning',
    block: 'Mon / Thu · 01:00 PM - 02:30 PM',
    students: 32,
    quarter: '2nd Quarter',
    pending: 14,
  },
  {
    id: 'bshm-1c-fso',
    code: 'BSHM 1C',
    title: 'Food Service Operations',
    subject: 'Subject: Food Service Operations',
    block: 'Tue / Thu · 09:30 AM - 11:00 AM',
    students: 29,
    quarter: '2nd Quarter',
    pending: 8,
  },
  {
    id: 'bsis-2b-dbm',
    code: 'BSIS 2B',
    title: 'Database Management',
    subject: 'Subject: Database Management',
    block: 'Tue / Fri · 10:00 AM - 11:30 AM',
    students: 34,
    quarter: '2nd Quarter',
    pending: 11,
  },
  {
    id: 'bsis-4a-spm',
    code: 'BSIS 4A',
    title: 'Systems Project Management',
    subject: 'Subject: Systems Project Management',
    block: 'Wed / Fri · 03:00 PM - 04:30 PM',
    students: 27,
    quarter: '2nd Quarter',
    pending: 7,
  },
  {
    id: 'bsed-3c-edt',
    code: 'BSED 3C',
    title: 'Educational Technology',
    subject: 'Subject: Educational Technology',
    block: 'Tue / Thu · 07:30 AM - 09:00 AM',
    students: 31,
    quarter: '2nd Quarter',
    pending: 10,
  },
  {
    id: 'bsed-1a-cfd',
    code: 'BSED 1A',
    title: 'Child and Adolescent Development',
    subject: 'Subject: Child and Adolescent Development',
    block: 'Mon / Wed · 10:30 AM - 12:00 PM',
    students: 36,
    quarter: '2nd Quarter',
    pending: 15,
  },
  {
    id: 'bshm-2a-fbm',
    code: 'BSHM 2A',
    title: 'Food and Beverage Management',
    subject: 'Subject: Food and Beverage Management',
    block: 'Mon / Thu · 02:30 PM - 04:00 PM',
    students: 30,
    quarter: '2nd Quarter',
    pending: 9,
  },
  {
    id: 'bapsy-2a-dev',
    code: 'BAPSY 2A',
    title: 'Developmental Psychology',
    subject: 'Subject: Developmental Psychology',
    block: 'Tue / Thu · 01:00 PM - 02:30 PM',
    students: 33,
    quarter: '2nd Quarter',
    pending: 12,
  },
  {
    id: 'bsa-3b-tax',
    code: 'BSA 3B',
    title: 'Taxation Fundamentals',
    subject: 'Subject: Taxation Fundamentals',
    block: 'Sat · 08:00 AM - 11:00 AM',
    students: 26,
    quarter: '2nd Quarter',
    pending: 6,
  },
]

export const gradebookStudents: GradebookStudent[] = [
  { id: 'stu-01', name: 'Ava Ramos', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '94', status: 'Passing' },
  { id: 'stu-02', name: 'Noah Garcia', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '88', status: 'Passing' },
  { id: 'stu-03', name: 'Chloe Lim', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '79', status: 'Needs Review' },
  { id: 'stu-04', name: 'Ethan Villanueva', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '91', status: 'Passing' },
  { id: 'stu-05', name: 'Sophia Navarro', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '85', status: 'Passing' },
  { id: 'stu-06', name: 'Lucas Fernandez', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '77', status: 'Needs Review' },
  { id: 'stu-07', name: 'Mia Bautista', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '82', status: 'Passing' },
  { id: 'stu-08', name: 'Nathan Delgado', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '--', status: 'Incomplete' },
  { id: 'stu-09', name: 'Isla Mendoza', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '89', status: 'Passing' },
  { id: 'stu-10', name: 'Daniel Soriano', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '83', status: 'Passing' },
  { id: 'stu-11', name: 'Amelia Torres', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '75', status: 'Needs Review' },
  { id: 'stu-12', name: 'Gabriel Aquino', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '90', status: 'Passing' },
  { id: 'stu-13', name: 'Harper Castillo', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '87', status: 'Passing' },
  { id: 'stu-14', name: 'Julian Robles', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '--', status: 'Incomplete' },
  { id: 'stu-15', name: 'Evelyn Padilla', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '92', status: 'Passing' },
  { id: 'stu-16', name: 'Mateo Dizon', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '81', status: 'Passing' },
  { id: 'stu-17', name: 'Abigail Salazar', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '78', status: 'Needs Review' },
  { id: 'stu-18', name: 'Elijah Pineda', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '86', status: 'Passing' },
  { id: 'stu-19', name: 'Scarlett David', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '93', status: 'Passing' },
  { id: 'stu-20', name: 'Isaac Mercado', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '80', status: 'Passing' },
  { id: 'stu-21', name: 'Victoria Evangelista', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '74', status: 'Needs Review' },
  { id: 'stu-22', name: 'Samuel Bernardo', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '88', status: 'Passing' },
  { id: 'stu-23', name: 'Lily Manalo', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '--', status: 'Incomplete' },
  { id: 'stu-24', name: 'David Alonzo', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '84', status: 'Passing' },
  { id: 'stu-25', name: 'Hannah Natividad', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '90', status: 'Passing' },
  { id: 'stu-26', name: 'Joseph Ramos', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '76', status: 'Needs Review' },
  { id: 'stu-27', name: 'Aria Santos', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '87', status: 'Passing' },
  { id: 'stu-28', name: 'Christopher Yumul', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '82', status: 'Passing' },
  { id: 'stu-29', name: 'Zoey Valdez', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '95', status: 'Passing' },
  { id: 'stu-30', name: 'Andrew Gamboa', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '79', status: 'Needs Review' },
  { id: 'stu-31', name: 'Penelope Magno', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '85', status: 'Passing' },
  { id: 'stu-32', name: 'Joshua Llorente', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '--', status: 'Incomplete' },
  { id: 'stu-33', name: 'Layla Esteban', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '91', status: 'Passing' },
  { id: 'stu-34', name: 'Sebastian Paras', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '83', status: 'Passing' },
  { id: 'stu-35', name: 'Nora Consunji', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '77', status: 'Needs Review' },
  { id: 'stu-36', name: 'Levi Coronel', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '88', status: 'Passing' },
  { id: 'stu-37', name: 'Claire Dominguez', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '86', status: 'Passing' },
  { id: 'stu-38', name: 'Aaron Feliciano', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '73', status: 'Needs Review' },
  { id: 'stu-39', name: 'Audrey Co', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '89', status: 'Passing' },
  { id: 'stu-40', name: 'Nathaniel Chua', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '84', status: 'Passing' },
  { id: 'stu-41', name: 'Elena Fuentes', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '--', status: 'Incomplete' },
  { id: 'stu-42', name: 'Miguel Cabrera', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '92', status: 'Passing' },
  { id: 'stu-43', name: 'Camila Sarmiento', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '81', status: 'Passing' },
  { id: 'stu-44', name: 'Adrian Villasis', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '78', status: 'Needs Review' },
  { id: 'stu-45', name: 'Bella Jocson', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '90', status: 'Passing' },
  { id: 'stu-46', name: 'Marco Nicolas', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '85', status: 'Passing' },
  { id: 'stu-47', name: 'Stella Abad', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '76', status: 'Needs Review' },
  { id: 'stu-48', name: 'Tristan Labra', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '87', status: 'Passing' },
  { id: 'stu-49', name: 'Naomi Pelayo', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '93', status: 'Passing' },
  { id: 'stu-50', name: 'Xavier Hilario', sectionId: 'bsis-3a-sad', section: 'BSIS 3A', average: '80', status: 'Passing' },
  { id: 'stu-51', name: 'Liam Cruz', sectionId: 'bsed-2b-ael', section: 'BSED 2B', average: '91', status: 'Passing' },
  { id: 'stu-52', name: 'Ella Tan', sectionId: 'bsed-2b-ael', section: 'BSED 2B', average: '76', status: 'Needs Review' },
  { id: 'stu-53', name: 'Julia Mendoza', sectionId: 'bsed-2b-ael', section: 'BSED 2B', average: '--', status: 'Incomplete' },
  { id: 'stu-54', name: 'Mia Santos', sectionId: 'bshm-1c-fso', section: 'BSHM 1C', average: '89', status: 'Passing' },
  { id: 'stu-55', name: 'Caleb Ong', sectionId: 'bshm-1c-fso', section: 'BSHM 1C', average: '84', status: 'Passing' },
  { id: 'stu-56', name: 'Grace Reyes', sectionId: 'bshm-1c-fso', section: 'BSHM 1C', average: '--', status: 'Incomplete' },
  { id: 'stu-57', name: 'Ariana Velasco', sectionId: 'bsis-2b-dbm', section: 'BSIS 2B', average: '90', status: 'Passing' },
  { id: 'stu-58', name: 'John Paulo Sy', sectionId: 'bsis-2b-dbm', section: 'BSIS 2B', average: '81', status: 'Passing' },
  { id: 'stu-59', name: 'Nicole Manansala', sectionId: 'bsis-2b-dbm', section: 'BSIS 2B', average: '74', status: 'Needs Review' },
  { id: 'stu-60', name: 'Bryan Javier', sectionId: 'bsis-4a-spm', section: 'BSIS 4A', average: '88', status: 'Passing' },
  { id: 'stu-61', name: 'Tricia Almeda', sectionId: 'bsis-4a-spm', section: 'BSIS 4A', average: '--', status: 'Incomplete' },
  { id: 'stu-62', name: 'Paolo Mercado', sectionId: 'bsed-3c-edt', section: 'BSED 3C', average: '92', status: 'Passing' },
  { id: 'stu-63', name: 'Kimberly Dela Pena', sectionId: 'bsed-3c-edt', section: 'BSED 3C', average: '79', status: 'Needs Review' },
  { id: 'stu-64', name: 'Francis Solis', sectionId: 'bsed-1a-cfd', section: 'BSED 1A', average: '86', status: 'Passing' },
  { id: 'stu-65', name: 'Mae Villareal', sectionId: 'bsed-1a-cfd', section: 'BSED 1A', average: '--', status: 'Incomplete' },
  { id: 'stu-66', name: 'Angela Roxas', sectionId: 'bshm-2a-fbm', section: 'BSHM 2A', average: '91', status: 'Passing' },
  { id: 'stu-67', name: 'Dylan Fajardo', sectionId: 'bshm-2a-fbm', section: 'BSHM 2A', average: '83', status: 'Passing' },
  { id: 'stu-68', name: 'Ivy Serrano', sectionId: 'bapsy-2a-dev', section: 'BAPSY 2A', average: '77', status: 'Needs Review' },
  { id: 'stu-69', name: 'Rafael Navarro', sectionId: 'bapsy-2a-dev', section: 'BAPSY 2A', average: '89', status: 'Passing' },
  { id: 'stu-70', name: 'Celine Punzalan', sectionId: 'bsa-3b-tax', section: 'BSA 3B', average: '93', status: 'Passing' },
  { id: 'stu-71', name: 'Mark Anthony Co', sectionId: 'bsa-3b-tax', section: 'BSA 3B', average: '80', status: 'Passing' },
]
