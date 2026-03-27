import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  FaBars,
  FaBell,
  FaBookOpen,
  FaCalendarAlt,
  FaChevronRight,
  FaCog,
  FaComments,
  FaEnvelope,
  FaFileAlt,
  FaGraduationCap,
  FaHome,
  FaRegCircle,
  FaSearch,
  FaSignOutAlt,
  FaTasks,
} from 'react-icons/fa'
import {
  facultyNavMain,
  facultyNavSupport,
  gradebookSections,
  gradebookStudents,
  type FacultyNavItem,
} from './gradebookData'

const iconMap = {
  home: FaHome,
  classes: FaBookOpen,
  gradebook: FaTasks,
  assessments: FaFileAlt,
  forum: FaComments,
  resources: FaFileAlt,
  calendar: FaCalendarAlt,
  settings: FaCog,
} satisfies Record<FacultyNavItem['icon'], typeof FaHome>

const studentsPerPage = 10

export default function FacultyClassSection() {
  const { sectionId } = useParams()
  const section = gradebookSections.find((item) => item.id === sectionId) ?? gradebookSections[0]
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    const roster = gradebookStudents.filter((item) => item.sectionId === section.id)

    if (!query) {
      return roster
    }

    return roster.filter((student) =>
      `${student.name} ${student.section} ${student.average} ${student.status}`.toLowerCase().includes(query),
    )
  }, [searchTerm, section.id])

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / studentsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedStudents = filteredStudents.slice((safePage - 1) * studentsPerPage, safePage * studentsPerPage)

  return (
    <main className="faculty-dashboard">
      <aside className="faculty-dashboard__sidebar">
        <div className="faculty-dashboard__brand">
          <div className="faculty-dashboard__brand-main">
            <span className="faculty-dashboard__brand-mark">
              <FaGraduationCap />
            </span>
            <div>
              <strong>NALAKA LMS</strong>
              <span>Faculty Workspace</span>
            </div>
          </div>
          <button type="button" className="faculty-dashboard__brand-toggle" aria-label="Open faculty menu">
            <FaBars />
          </button>
        </div>

        <div className="faculty-dashboard__profile">
          <div className="faculty-dashboard__avatar">MR</div>
          <div className="faculty-dashboard__profile-copy">
            <strong>Michael Reyes</strong>
            <span>Systems and Education Faculty</span>
          </div>
          <div className="faculty-dashboard__profile-meta">
            <span>Workspace health</span>
            <strong>Stable</strong>
          </div>
        </div>

        <nav className="faculty-dashboard__nav" aria-label="Faculty navigation">
          <div className="faculty-dashboard__nav-label">Workspace</div>
          {facultyNavMain.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <Link key={item.label} to={item.to} className={item.label === 'My Classes' ? 'is-active' : undefined}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="faculty-dashboard__nav-label faculty-dashboard__nav-label--secondary">Tools</div>
          {facultyNavSupport.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <Link key={item.label} to={item.to}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="faculty-dashboard__sidebar-note">
          <span>Class roster</span>
          <strong>{section.code} | {section.title}</strong>
          <p>Review the full section roster, search students quickly, and jump to grade encoding when needed.</p>
        </div>

        <button type="button" className="faculty-dashboard__logout">
          <span>
            <FaSignOutAlt />
            Sign out
          </span>
          <FaChevronRight />
        </button>
      </aside>

      <section className="faculty-dashboard__main">
        <header className="faculty-dashboard__topbar">
          <div className="faculty-dashboard__topbar-copy">
            <h1>{section.code} Class List</h1>
          </div>

          <div className="faculty-dashboard__topbar-strip" aria-label="Current class context">
            <strong>{section.quarter}</strong>
            <span>{section.subject}</span>
          </div>

          <div className="faculty-dashboard__topbar-actions">
            <button type="button" className="faculty-dashboard__date-chip">
              <FaCalendarAlt />
              April 2026
            </button>
            <div className="faculty-dashboard__chrome-group">
              <button type="button" className="has-badge">
                <FaBell />
                <span>2</span>
              </button>
              <button type="button">
                <FaEnvelope />
              </button>
              <button type="button">
                <FaRegCircle />
              </button>
            </div>
            <div className="faculty-dashboard__mini-profile">
              <div className="faculty-dashboard__avatar faculty-dashboard__avatar--small">MR</div>
              <div>
                <strong>Michael Reyes</strong>
                <span>Faculty</span>
              </div>
            </div>
          </div>
        </header>

        <div className="faculty-dashboard__scroll">
          <section className="faculty-dashboard__hero faculty-gradebook__hero">
            <div className="faculty-dashboard__hero-copy">
              <span className="faculty-dashboard__eyebrow">Class Roster</span>
              <h2>Open one class and keep every learner in view from a single section roster.</h2>
              <p>Search students, review their current standing, and move into grade encoding from the class you are actively teaching.</p>
            </div>

            <div className="faculty-dashboard__hero-callout">
              <div>
                <span>Current section</span>
                <strong>{section.students} learners | {section.pending} pending scores</strong>
              </div>
              <p>{section.block}</p>
            </div>
          </section>

          <section className="faculty-dashboard__panel faculty-gradebook__sections-panel faculty-gradebook__students-panel">
            <div className="faculty-dashboard__panel-head">
              <h3>Students in {section.code}</h3>
              <div className="faculty-gradebook__panel-links">
                <Link to="/faculty/classes">Back to classes</Link>
                <Link to={`/faculty/gradebook/${section.id}`}>Open gradebook</Link>
              </div>
            </div>

            <div className="faculty-gradebook__table-toolbar">
              <label className="faculty-gradebook__search">
                <FaSearch />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value)
                    setCurrentPage(1)
                  }}
                  placeholder="Search learner, status, or average"
                />
              </label>
              <div className="faculty-gradebook__table-meta">
                <span>{filteredStudents.length} matched learners</span>
                <strong>
                  Page {safePage} of {totalPages}
                </strong>
              </div>
            </div>

            <div className="faculty-gradebook__table">
              <div className="faculty-gradebook__head faculty-gradebook__head--students">
                <span>Learner</span>
                <span>Section</span>
                <span>Average</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              {paginatedStudents.map((student) => (
                <article key={student.id} className="faculty-gradebook__row faculty-gradebook__row--students">
                  <strong className="faculty-gradebook__student-name">{student.name}</strong>
                  <span>{student.section}</span>
                  <span>{student.average}</span>
                  <span className={`faculty-gradebook__status faculty-gradebook__status--${student.status.toLowerCase().replace(' ', '-')}`}>
                    {student.status}
                  </span>
                  <Link to={`/faculty/gradebook/${section.id}`} className="faculty-gradebook__record-button">
                    Open gradebook
                    <FaChevronRight />
                  </Link>
                </article>
              ))}

              {paginatedStudents.length === 0 ? (
                <div className="faculty-gradebook__empty-state">
                  <strong>No learners found</strong>
                  <span>Try a different search term to find a student in this class roster.</span>
                </div>
              ) : null}
            </div>

            <div className="faculty-gradebook__pagination">
              <span>
                Showing {paginatedStudents.length === 0 ? 0 : (safePage - 1) * studentsPerPage + 1}
                -
                {Math.min(safePage * studentsPerPage, filteredStudents.length)} of {filteredStudents.length}
              </span>
              <div className="faculty-gradebook__pagination-actions">
                <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={safePage === 1}>
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .slice(Math.max(0, safePage - 2), Math.max(0, safePage - 2) + 3)
                  .map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={page === safePage ? 'is-active' : undefined}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                <button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={safePage === totalPages}>
                  Next
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
