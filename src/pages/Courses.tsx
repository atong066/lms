import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBell,
  FaBookOpen,
  FaCalendarAlt,
  FaChartLine,
  FaClipboardList,
  FaCog,
  FaEnvelope,
  FaFileAlt,
  FaFilter,
  FaGraduationCap,
  FaHome,
  FaPlus,
  FaRegCircle,
  FaSearch,
  FaSignOutAlt,
  FaUserCheck,
  FaUserClock,
  FaUserGraduate,
  FaUsers,
} from 'react-icons/fa'

type CourseRecord = {
  id: string
  code: string
  title: string
  instructor: string
  program: string
  units: string
  status: 'Open' | 'Draft' | 'Archived'
}

type CourseStatus = CourseRecord['status']

const COURSES_PER_PAGE = 10

const navItems = [
  { icon: FaHome, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: FaUserGraduate, label: 'Students', to: '/admin/students' },
  { icon: FaBookOpen, label: 'Courses', to: '/admin/courses', active: true },
  { icon: FaUsers, label: 'Admissions', to: '/admin/admissions' },
  { icon: FaUserCheck, label: 'Employees', to: '/admin/employees' },
  { icon: FaUserClock, label: 'Leave', to: '/admin/leave' },
  { icon: FaChartLine, label: 'Payroll', to: '/admin/payroll' },
  { icon: FaFileAlt, label: 'Documents', to: '/admin/documents' },
  { icon: FaFileAlt, label: 'Reports', to: '/admin/reports' },
  { icon: FaCalendarAlt, label: 'Calendar', to: '/admin/calendar' },
  { icon: FaCog, label: 'Settings', to: '/admin/settings' },
]

const subjectRoots = ['IS', 'ACC', 'PSY', 'EDU', 'HM', 'COM']
const courseNames = [
  'Database Management',
  'Financial Reporting',
  'Developmental Psychology',
  'Curriculum Design',
  'Food Service Systems',
  'Media Writing',
  'Network Fundamentals',
  'Organizational Behavior',
]
const instructors = ['Dr. Ramos', 'Prof. Cruz', 'Ms. Lee', 'Mr. Tan', 'Dr. Santos', 'Prof. Flores']
const programs = [
  'BS Information Systems',
  'BS Accountancy',
  'BS Psychology',
  'BS Education',
  'BS Hospitality Management',
  'BA Communication',
]
const courseStatuses: CourseStatus[] = ['Open', 'Draft', 'Archived']

function createInitialCourses(): CourseRecord[] {
  return Array.from({ length: 36 }, (_, index) => ({
    id: String(index + 1),
    code: `${subjectRoots[index % subjectRoots.length]}-${100 + index}`,
    title: courseNames[index % courseNames.length],
    instructor: instructors[index % instructors.length],
    program: programs[index % programs.length],
    units: `${3 + (index % 2)}`,
    status: courseStatuses[index % courseStatuses.length],
  }))
}

const initialCourses = createInitialCourses()

export default function Courses() {
  const [courses, setCourses] = useState<CourseRecord[]>(initialCourses)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    instructor: instructors[0],
    program: programs[0],
    units: '3',
    status: 'Open' as CourseStatus,
  })
  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return courses

    return courses.filter((course) =>
      [course.code, course.title, course.instructor, course.program, course.status].some((value) =>
        value.toLowerCase().includes(query),
      ),
    )
  }, [courses, search])

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / COURSES_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginatedCourses = filteredCourses.slice((safePage - 1) * COURSES_PER_PAGE, safePage * COURSES_PER_PAGE)

  const openCount = courses.filter((course) => course.status === 'Open').length
  const draftCount = courses.filter((course) => course.status === 'Draft').length
  const archivedCount = courses.filter((course) => course.status === 'Archived').length

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleAddCourse = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const code = formData.code.trim()
    const title = formData.title.trim()
    if (!code || !title) return

    const nextCourse: CourseRecord = {
      id: String(courses.length + 1),
      code,
      title,
      instructor: formData.instructor,
      program: formData.program,
      units: formData.units,
      status: formData.status,
    }
    setCourses((current) => [nextCourse, ...current])

    setFormData({
      code: '',
      title: '',
      instructor: instructors[0],
      program: programs[0],
      units: '3',
      status: 'Open',
    })
    setSearch('')
    setPage(1)
    setIsModalOpen(false)
  }

  const goToPage = (nextPage: number) => {
    setPage(Math.max(1, Math.min(nextPage, totalPages)))
  }

  return (
    <main className="dashboard-page dashboard-reference users-reference-page">
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
            const content = (
              <>
                <Icon />
                <span>{item.label}</span>
              </>
            )

            return item.to === '#' ? (
              <a href="#" key={item.label} className={item.active ? 'is-active' : undefined}>
                {content}
              </a>
            ) : (
              <Link key={item.label} to={item.to} className={item.active ? 'is-active' : undefined}>
                {content}
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

      <section className="dashboard-reference__main">
        <header className="dashboard-reference__topbar">
          <div className="dashboard-reference__topbar-user">
            <div className="dashboard-reference__avatar dashboard-reference__avatar--small">JD</div>
            <strong>John Doe</strong>
          </div>

          <div className="dashboard-reference__topbar-actions">
            <button type="button" className="has-badge">
              <FaBell />
              <span>5</span>
            </button>
            <button type="button">
              <FaEnvelope />
            </button>
            <button type="button">
              <FaCog />
            </button>
            <button type="button">
              <FaRegCircle />
            </button>
            <button type="button">
              <FaBell />
            </button>
            <div className="dashboard-reference__avatar dashboard-reference__avatar--small">JD</div>
          </div>
        </header>

        <section className="dashboard-reference__content users-reference">
          <h1>Courses</h1>

          <section className="users-reference__stats" aria-label="Course summary">
            <article className="users-reference__stat">
              <FaBookOpen />
              <div>
                <strong>{courses.length}</strong>
                <span>Total courses</span>
              </div>
            </article>
            <article className="users-reference__stat">
              <FaUserCheck />
              <div>
                <strong>{openCount}</strong>
                <span>Open offerings</span>
              </div>
            </article>
            <article className="users-reference__stat">
              <FaClipboardList />
              <div>
                <strong>{draftCount}</strong>
                <span>Draft courses</span>
              </div>
            </article>
            <article className="users-reference__stat">
              <FaFileAlt />
              <div>
                <strong>{archivedCount}</strong>
                <span>Archived</span>
              </div>
            </article>
          </section>

          <section className="dashboard-reference__panel users-reference__panel">
            <div className="dashboard-reference__panel-header">
              <div>
                <h2>Course Catalog</h2>
                <p className="users-reference__subcopy">Create course offerings, assign instructors, and maintain the active catalog from one registrar view.</p>
              </div>
              <button
                type="button"
                className="dashboard-reference__soft-button users-reference__add"
                onClick={() => setIsModalOpen(true)}
              >
                <FaPlus />
                Add Course
              </button>
            </div>

            <div className="users-reference__toolbar">
              <label className="users-reference__search">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search by code, title, or instructor"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value)
                    setPage(1)
                  }}
                />
              </label>
              <button type="button" className="users-reference__filter">
                <FaFilter />
                Filters
              </button>
            </div>

            <div className="users-reference__table courses-reference__table">
              <div className="users-reference__head users-reference__head--enhanced courses-reference__head">
                <span>Course</span>
                <span>Code</span>
                <span>Instructor</span>
                <span>Program</span>
                <span>Units</span>
                <span>Status</span>
              </div>

              {paginatedCourses.map((course) => (
                <article key={course.id} className="users-reference__row users-reference__row--enhanced courses-reference__row">
                  <div className="users-reference__name">
                    <div className="dashboard-reference__avatar dashboard-reference__avatar--small">
                      {course.title.slice(0, 2).toUpperCase()}
                    </div>
                    <strong>{course.title}</strong>
                  </div>
                  <span>{course.code}</span>
                  <span>{course.instructor}</span>
                  <span>{course.program}</span>
                  <span>{course.units}</span>
                  <span className={`users-reference__status courses-reference__status--${course.status.toLowerCase()}`}>
                    {course.status}
                  </span>
                </article>
              ))}
            </div>

            <div className="users-reference__footer">
              <p>
                Showing {(safePage - 1) * COURSES_PER_PAGE + 1}-{Math.min(safePage * COURSES_PER_PAGE, filteredCourses.length)} of{' '}
                {filteredCourses.length} courses
              </p>
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
          </section>
        </section>
      </section>

      {isModalOpen ? (
        <div className="users-reference__modal-backdrop" role="presentation" onClick={() => setIsModalOpen(false)}>
          <div
            className="users-reference__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-course-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="dashboard-reference__panel-header">
              <div>
                <h2 id="add-course-title">Add Course</h2>
                <p className="users-reference__subcopy">Create a new course offering and place it into the catalog immediately.</p>
              </div>
              <button type="button" className="users-reference__modal-close" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>

            <form className="users-reference__form" onSubmit={handleAddCourse}>
              <label>
                Course code
                <input name="code" value={formData.code} onChange={handleInputChange} placeholder="IS-240" />
              </label>
              <label>
                Course title
                <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Systems Analysis" />
              </label>
              <label>
                Instructor
                <select name="instructor" value={formData.instructor} onChange={handleInputChange}>
                  {instructors.map((instructor) => (
                    <option key={instructor} value={instructor}>
                      {instructor}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Program
                <select name="program" value={formData.program} onChange={handleInputChange}>
                  {programs.map((program) => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Units
                <select name="units" value={formData.units} onChange={handleInputChange}>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </label>
              <label>
                Status
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  {courseStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <div className="users-reference__modal-actions">
                <button type="button" className="users-reference__filter" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="dashboard-reference__soft-button users-reference__add">
                  <FaPlus />
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  )
}

