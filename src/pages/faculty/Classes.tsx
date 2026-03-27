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
import { gradebookSections } from './gradebookData'

const navItems = [
  { icon: FaHome, label: 'Overview', to: '/faculty/dashboard' },
  { icon: FaBookOpen, label: 'My Classes', to: '/faculty/classes', active: true },
  { icon: FaTasks, label: 'Gradebook', to: '/faculty/gradebook' },
  { icon: FaFileAlt, label: 'Assessments', to: '/faculty/assessments' },
]

const supportNavItems = [
  { icon: FaComments, label: 'Forum', to: '/faculty/forum' },
  { icon: FaFileAlt, label: 'Resources', to: '/faculty/resources' },
  { icon: FaCalendarAlt, label: 'Calendar', to: '/faculty/calendar' },
  { icon: FaCog, label: 'Settings', to: '/faculty/settings' },
]

const classDetails = {
  'bsis-3a-sad': { room: 'Room 402', progress: 'Week 8 of 18', nextTask: 'Capstone checkpoint review' },
  'bsed-2b-ael': { room: 'Room 215', progress: 'Week 8 of 18', nextTask: 'Reflection rubric finalization' },
  'bshm-1c-fso': { room: 'Lab Kitchen 1', progress: 'Week 7 of 18', nextTask: 'Lab safety walkthrough' },
} as const

const upcomingSessions = [
  { time: '07:30', title: 'Systems Analysis and Design', detail: 'Room 402 | attendance and warm-up prompt ready' },
  { time: '13:00', title: 'Assessment in Learning', detail: 'Room 215 | rubric notes to discuss' },
  { time: '09:30', title: 'Food Service Operations', detail: 'Tomorrow | materials checklist pending' },
]

const workload = [
  { label: 'Active classes', value: '03' },
  { label: 'Total learners', value: '88' },
  { label: 'Pending submissions', value: '27' },
  { label: 'Prepared materials', value: '12' },
]

export default function FacultyClasses() {
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
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.label} to={item.to} className={item.active ? 'is-active' : undefined}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="faculty-dashboard__nav-label faculty-dashboard__nav-label--secondary">Tools</div>
          {supportNavItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.label} to={item.to}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="faculty-dashboard__sidebar-note">
          <span>This week</span>
          <strong>Three active preparations running</strong>
          <p>Keep class materials, room changes, and learner follow-ups visible from one faculty class board.</p>
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
            <h1>My Classes</h1>
          </div>

          <div className="faculty-dashboard__topbar-strip" aria-label="Current class context">
            <strong>Semester View</strong>
            <span>Manage sections, schedules, and teaching progress</span>
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
          <section className="faculty-dashboard__hero faculty-classes__hero">
            <div className="faculty-dashboard__hero-copy">
              <span className="faculty-dashboard__eyebrow">Teaching Load</span>
              <h2>See sections, schedules, and class-ready work at a glance.</h2>
              <p>Keep teaching blocks, upcoming sessions, and prep priorities in one compact class view.</p>
            </div>

            <div className="faculty-dashboard__hero-callout">
              <div>
                <span>Next section</span>
                <strong>BSIS 3A | Systems Analysis and Design</strong>
              </div>
              <p>Attendance code, lecture slides, and capstone checkpoint materials are prepared for the 7:30 AM block.</p>
            </div>
          </section>

          <section className="faculty-dashboard__stats faculty-classes__stats" aria-label="Class workload metrics">
            {workload.map((item) => (
              <article key={item.label} className="faculty-dashboard__stat">
                <span>{item.value}</span>
                <strong>{item.label}</strong>
              </article>
            ))}
          </section>

          <section className="faculty-dashboard__grid faculty-classes__grid">
            <div className="faculty-dashboard__main-column">
              <section className="faculty-dashboard__panel">
                <div className="faculty-dashboard__panel-head">
                  <h3>Class Portfolio</h3>
                </div>

                <div className="faculty-classes__list">
                  {gradebookSections.map((item) => (
                    <Link key={item.id} to={`/faculty/classes/${item.id}`} className="faculty-classes__card">
                      <div className="faculty-classes__card-top">
                        <div>
                          <span className="faculty-classes__code">{item.code}</span>
                          <h4>{item.title}</h4>
                        </div>
                      </div>

                      <div className="faculty-classes__meta">
                        <span>{item.block}</span>
                        <span>{classDetails[item.id as keyof typeof classDetails]?.progress ?? item.quarter}</span>
                        <span>{classDetails[item.id as keyof typeof classDetails]?.room ?? 'Assigned room'}</span>
                      </div>

                      <div className="faculty-classes__footer">
                        <div>
                          <strong>{item.students} learners</strong>
                          <span>{classDetails[item.id as keyof typeof classDetails]?.progress ?? item.quarter}</span>
                        </div>
                        <div>
                          <strong>Next task</strong>
                          <span>{classDetails[item.id as keyof typeof classDetails]?.nextTask ?? 'Class review in progress'}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <div className="faculty-dashboard__side-column">
              <section className="faculty-dashboard__panel">
                <div className="faculty-dashboard__panel-head">
                  <h3>Upcoming Sessions</h3>
                  <a href="#">Open calendar</a>
                </div>

                <div className="faculty-dashboard__timeline">
                  {upcomingSessions.map((item) => (
                    <article key={`${item.time}-${item.title}`} className="faculty-dashboard__timeline-item">
                      <time>{item.time}</time>
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.detail}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="faculty-dashboard__panel faculty-dashboard__panel--spotlight">
                <div className="faculty-dashboard__spotlight-icon">
                  <FaBookOpen />
                </div>
                <strong>Preparation priority</strong>
                <p>Finalize the reflection rubric for `Assessment in Learning` before the 1:00 PM class block.</p>
                <button type="button" className="faculty-dashboard__primary">
                  <FaTasks />
                  Open class workspace
                </button>
              </section>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
