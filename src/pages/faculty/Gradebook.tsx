import { Link } from 'react-router-dom'
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
  FaSignOutAlt,
  FaTasks,
} from 'react-icons/fa'
import { facultyNavMain, facultyNavSupport, gradebookSections, type FacultyNavItem } from './gradebookData'

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

const gradeStats = [
  { value: '3', label: 'Sections tracked' },
  { value: '88', label: 'Learners graded' },
  { value: '33', label: 'Scores to encode' },
  { value: '2nd', label: 'Active quarter' },
]

export default function FacultyGradebook() {
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
              <Link key={item.label} to={item.to} className={item.label === 'Gradebook' ? 'is-active' : undefined}>
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
            <h1>Gradebook</h1>
          </div>

          <div className="faculty-dashboard__topbar-strip" aria-label="Current gradebook context">
            <strong>Section View</strong>
            <span>Open a section to encode quarter scores</span>
          </div>

          <div className="faculty-dashboard__topbar-actions">
            <button type="button" className="faculty-dashboard__date-chip">
              <FaCalendarAlt />
              April 2026
            </button>
            <div className="faculty-dashboard__chrome-group">
              <button type="button" className="has-badge">
                <FaBell />
                <span>3</span>
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
              <span className="faculty-dashboard__eyebrow">Section Gradebook</span>
              <h2>Choose a section and subject to open learner records for the current quarter.</h2>
              <p>Each section leads to a student list where you can open a learner modal and encode quiz, performance task, and written work scores.</p>
            </div>

            <div className="faculty-dashboard__hero-callout">
              <div>
                <span>Current quarter</span>
                <strong>2nd Quarter | Active encoding window</strong>
              </div>
              <p>Open a class below to start entering scores and assessment titles per learner.</p>
            </div>
          </section>

          <section className="faculty-dashboard__stats faculty-gradebook__stats" aria-label="Gradebook metrics">
            {gradeStats.map((item) => (
              <article key={item.label} className="faculty-dashboard__stat">
                <span>{item.value}</span>
                <strong>{item.label}</strong>
              </article>
            ))}
          </section>

          <section className="faculty-dashboard__panel faculty-gradebook__sections-panel">
            <div className="faculty-dashboard__panel-head">
              <h3>Sections and Subjects</h3>
              <a href="#">Active quarter only</a>
            </div>

            <div className="faculty-gradebook__sections">
              {gradebookSections.map((section) => (
                <Link key={section.id} to={`/faculty/gradebook/${section.id}`} className="faculty-gradebook__section-card">
                  <div className="faculty-gradebook__section-top">
                    <span className="faculty-classes__code">{section.code}</span>
                    <strong>{section.title}</strong>
                  </div>
                  <p>{section.subject}</p>
                  <div className="faculty-gradebook__section-meta">
                    <span>{section.block}</span>
                    <span>{section.students} learners</span>
                    <span>{section.pending} pending</span>
                  </div>
                  <div className="faculty-gradebook__section-footer">
                    <span>{section.quarter}</span>
                    <em>Open section</em>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
