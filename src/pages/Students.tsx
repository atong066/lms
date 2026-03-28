import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBookOpen,
  FaCalendarAlt,
  FaChartLine,
  FaCog,
  FaFileAlt,
  FaFilter,
  FaGraduationCap,
  FaHome,
  FaSearch,
  FaSignOutAlt,
  FaUserCheck,
  FaUserClock,
  FaUserGraduate,
  FaUsers,
} from 'react-icons/fa'
import { AdminTopbar } from '../components/AdminTopbar'

type StudentRecord = {
  id: string
  studentId: string
  name: string
  email: string
  program: string
  intake: string
  status: 'Enrolled' | 'Pending' | 'Hold'
}

type StudentStatus = StudentRecord['status']
type StudentFilter = 'All' | StudentStatus

const STUDENTS_PER_PAGE = 10

const navItems = [
  { icon: FaHome, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: FaUserGraduate, label: 'Students', to: '/admin/students', active: true },
  { icon: FaBookOpen, label: 'Courses', to: '/admin/courses' },
  { icon: FaUsers, label: 'Admissions', to: '/admin/admissions' },
  { icon: FaUserCheck, label: 'Employees', to: '/admin/employees' },
  { icon: FaUserClock, label: 'Leave', to: '/admin/leave' },
  { icon: FaChartLine, label: 'Payroll', to: '/admin/payroll' },
  { icon: FaFileAlt, label: 'Documents', to: '/admin/documents' },
  { icon: FaFileAlt, label: 'Reports', to: '/admin/reports' },
  { icon: FaCalendarAlt, label: 'Calendar', to: '/admin/calendar' },
  { icon: FaCog, label: 'Settings', to: '/admin/settings' },
]

const firstNames = [
  'Ava', 'Liam', 'Mia', 'Noah', 'Ella', 'Lucas', 'Chloe', 'Ethan', 'Sofia', 'Caleb',
  'Hannah', 'Joshua', 'Megan', 'Nathan', 'Zoe', 'Adrian', 'Claire', 'Marcus', 'Julia', 'David',
]

const lastNames = [
  'Rivera', 'Garcia', 'Santos', 'Nguyen', 'Tan', 'Mendoza', 'Lim', 'Reyes', 'Torres', 'Flores',
  'Lee', 'Castro', 'Hernandez', 'Cruz', 'Bautista', 'Ramos', 'Delos', 'Velasco', 'Sy', 'Ong',
]

const programs = [
  'BS Information Systems',
  'BS Accountancy',
  'BS Psychology',
  'BS Education',
  'BS Hospitality Management',
  'BA Communication',
]

const intakes = ['AY 2026 - Term 1', 'AY 2026 - Term 2', 'Summer Bridge']
const studentStatuses: StudentStatus[] = ['Enrolled', 'Pending', 'Hold']
const studentFilters: StudentFilter[] = ['All', 'Enrolled', 'Pending', 'Hold']

function createInitialStudents(): StudentRecord[] {
  return Array.from({ length: 50 }, (_, index) => {
    const firstName = firstNames[index % firstNames.length]
    const lastName = lastNames[(index * 2) % lastNames.length]
    return {
      id: String(index + 1),
      studentId: `STU-26-${String(index + 1).padStart(4, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName}.${lastName}${index + 1}`.toLowerCase() + '@nalaka.edu',
      program: programs[index % programs.length],
      intake: intakes[index % intakes.length],
      status: studentStatuses[index % studentStatuses.length],
    }
  })
}

const initialStudents = createInitialStudents()

export default function Students() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [students] = useState<StudentRecord[]>(initialStudents)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState<StudentFilter>('All')
  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase()

    return students.filter((student) => {
      const matchesSearch =
        !query ||
        [student.studentId, student.name, student.email, student.program, student.intake, student.status].some((value) =>
          value.toLowerCase().includes(query),
        )

      const matchesFilter = activeFilter === 'All' || student.status === activeFilter
      return matchesSearch && matchesFilter
    })
  }, [activeFilter, search, students])

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginatedStudents = filteredStudents.slice((safePage - 1) * STUDENTS_PER_PAGE, safePage * STUDENTS_PER_PAGE)

  const enrolledCount = students.filter((student) => student.status === 'Enrolled').length
  const pendingCount = students.filter((student) => student.status === 'Pending').length
  const holdCount = students.filter((student) => student.status === 'Hold').length

  const goToPage = (nextPage: number) => {
    setPage(Math.max(1, Math.min(nextPage, totalPages)))
  }

  return (
    <main className={`dashboard-page dashboard-reference users-reference-page${isSidebarOpen ? ' is-sidebar-open' : ''}`}>
      <aside className="dashboard-reference__sidebar">
        <div className="dashboard-reference__brand">
          <span className="dashboard-reference__brand-icon">
            <FaGraduationCap />
          </span>
          <div>
            <strong>NALAKA LMS</strong>
            <span>Registrar</span>
          </div>
        </div>

        <div className="dashboard-reference__profile">
          <div className="dashboard-reference__avatar">JD</div>
          <div className="dashboard-reference__profile-copy">
            <strong>John Doe</strong>
            <span>Registrar</span>
          </div>
          <em>3</em>
        </div>

        <nav className="dashboard-reference__nav" aria-label="Dashboard navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.label} to={item.to} className={item.active ? 'is-active' : undefined}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <button type="button" className="dashboard-reference__logout">
          <span>
            <FaSignOutAlt />
            Logout
          </span>
          <span aria-hidden="true">{'>'}</span>
        </button>
      </aside>

      <button
        type="button"
        className="dashboard-reference__sidebar-backdrop"
        aria-label="Close admin menu"
        onClick={() => setIsSidebarOpen(false)}
      />

      <section className="dashboard-reference__main">
        <AdminTopbar onMenuToggle={() => setIsSidebarOpen((current) => !current)} />

        <section className="dashboard-reference__content users-reference students-reference">
          <h1>Students</h1>

          <section className="users-reference__stats students-reference__stats" aria-label="Student summary">
            <article className="users-reference__stat">
              <FaUsers />
              <div>
                <strong>{students.length}</strong>
                <span>Total students</span>
              </div>
            </article>
            <article className="users-reference__stat">
              <FaUserCheck />
              <div>
                <strong>{enrolledCount}</strong>
                <span>Enrolled</span>
              </div>
            </article>
            <article className="users-reference__stat">
              <FaUserClock />
              <div>
                <strong>{pendingCount}</strong>
                <span>Pending review</span>
              </div>
            </article>
            <article className="users-reference__stat">
              <FaUserGraduate />
              <div>
                <strong>{holdCount}</strong>
                <span>On hold</span>
              </div>
            </article>
          </section>

          <section className="dashboard-reference__panel users-reference__panel students-reference__panel">
            <div className="dashboard-reference__panel-header students-reference__panel-header">
              <div>
                <h2>Student Registry</h2>
                <p className="users-reference__subcopy">
                  Search by ID, refine by status, and review intake placement without losing context.
                </p>
              </div>
            </div>

            <div className="users-reference__toolbar students-reference__toolbar">
              <label className="users-reference__search">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search by ID, name, or email"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value)
                    setPage(1)
                  }}
                />
              </label>

              <div className="students-reference__filters" aria-label="Student status filters">
                {studentFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={filter === activeFilter ? 'is-active' : undefined}
                    onClick={() => {
                      setActiveFilter(filter)
                      setPage(1)
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <button type="button" className="users-reference__filter">
                <FaFilter />
                Registrar view
              </button>
            </div>

            <div className="students-reference__workspace">
              <div className="students-reference__table-head">
                <span>Showing {(safePage - 1) * STUDENTS_PER_PAGE + 1}-{Math.min(safePage * STUDENTS_PER_PAGE, filteredStudents.length)} of {filteredStudents.length}</span>
                <strong>{activeFilter === 'All' ? 'All statuses' : `${activeFilter} students`}</strong>
              </div>

              <div className="users-reference__table students-reference__table">
                <div className="users-reference__head students-reference__head students-reference__head--enhanced">
                  <span>Student</span>
                  <span>ID</span>
                  <span>Email</span>
                  <span>Program</span>
                  <span>Intake</span>
                  <span>Status</span>
                </div>

                {paginatedStudents.map((student) => (
                  <article key={student.id} className="users-reference__row students-reference__row students-reference__row--enhanced">
                    <div className="users-reference__name students-reference__name">
                      <div className="dashboard-reference__avatar dashboard-reference__avatar--small">
                        {student.name
                          .split(' ')
                          .slice(0, 2)
                          .map((value) => value[0])
                          .join('')
                          .toUpperCase()}
                      </div>
                      <div>
                        <strong>{student.name}</strong>
                        <small>{student.program}</small>
                      </div>
                    </div>
                    <span>{student.studentId}</span>
                    <span>{student.email}</span>
                    <span>{student.program}</span>
                    <span>{student.intake}</span>
                    <span className={`users-reference__status students-reference__status--${student.status.toLowerCase()}`}>
                      {student.status}
                    </span>
                  </article>
                ))}
              </div>

              <div className="users-reference__footer">
                <div className="dashboard-reference__pager users-reference__pager">
                  <button type="button" onClick={() => goToPage(safePage - 1)} disabled={safePage === 1}>
                    Previous
                  </button>
                  <div>
                    {Array.from({ length: totalPages }, (_, index) => {
                      const nextPage = index + 1
                      return (
                        <button
                          type="button"
                          key={nextPage}
                          className={nextPage === safePage ? 'is-active' : undefined}
                          onClick={() => goToPage(nextPage)}
                        >
                          {nextPage}
                        </button>
                      )
                    })}
                  </div>
                  <button type="button" onClick={() => goToPage(safePage + 1)} disabled={safePage === totalPages}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </main>
  )
}

