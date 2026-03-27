import { Link } from 'react-router-dom'
import {
  FaBars,
  FaBell,
  FaBookOpen,
  FaCalendarAlt,
  FaChartLine,
  FaChalkboardTeacher,
  FaChevronRight,
  FaCog,
  FaComments,
  FaEnvelope,
  FaFileAlt,
  FaGraduationCap,
  FaHome,
  FaLayerGroup,
  FaPlus,
  FaRegCircle,
  FaSignOutAlt,
  FaTasks,
} from 'react-icons/fa'

const navItems = [
  { icon: FaHome, label: 'Overview', to: '/faculty/dashboard', active: true },
  { icon: FaBookOpen, label: 'My Classes', to: '/faculty/classes' },
  { icon: FaTasks, label: 'Gradebook', to: '/faculty/gradebook' },
  { icon: FaFileAlt, label: 'Assessments', to: '/faculty/assessments' },
]

const supportNavItems = [
  { icon: FaComments, label: 'Forum', to: '/faculty/forum' },
  { icon: FaFileAlt, label: 'Resources', to: '/faculty/resources' },
  { icon: FaCalendarAlt, label: 'Calendar', to: '/faculty/calendar' },
  { icon: FaCog, label: 'Settings', to: '/faculty/settings' },
]

const statCards = [
  { value: '04', label: 'Teaching Blocks', detail: 'Across 3 preparations' },
  { value: '27', label: 'Submissions Waiting', detail: '13 high priority' },
  { value: '91%', label: 'Attendance Pulse', detail: 'Weekly class average' },
  { value: '06', label: 'Advisees To Check', detail: 'Guidance and follow-up' },
]

const daySchedule = [
  { time: '07:30', title: 'Systems Analysis and Design', meta: 'BSIS 3A | Room 402', state: 'Live in 8 mins' },
  { time: '10:00', title: 'Faculty Consultation Window', meta: 'Advising hub | 5 booked', state: 'Open block' },
  { time: '13:00', title: 'Assessment in Learning', meta: 'BSED 2B | Room 215', state: 'Materials ready' },
  { time: '15:30', title: 'Department Coordination', meta: 'College office | Agenda posted', state: 'Faculty meeting' },
]

const reviewQueue = [
  { title: 'Case Study 02', course: 'Systems Analysis', volume: '11 submissions', due: 'Today | 5:00 PM' },
  { title: 'Reflection Journal', course: 'Assessment in Learning', volume: '18 submissions', due: 'Tomorrow | 10:00 AM' },
  { title: 'Lab Worksheet', course: 'Food Service Operations', volume: '24 submissions', due: 'Friday | 4:00 PM' },
]

const classStream = [
  { label: 'BSIS 3A', event: 'Checkpoint deck uploaded', note: 'Capstone milestone 2 is now available to the section.' },
  { label: 'BSED 2B', event: 'Attendance needs confirmation', note: 'Three learners were marked late after the QR sync delay.' },
  { label: 'Faculty Office', event: 'Midterm memo released', note: 'Exam week supervision assignments were finalized this morning.' },
]

const learnersNeedingAttention = [
  { name: 'Ava Ramos', reason: 'Missing two attendance logs', course: 'Systems Analysis' },
  { name: 'Liam Cruz', reason: 'Late project draft submitted', course: 'Assessment in Learning' },
  { name: 'Mia Santos', reason: 'Requested consultation approval', course: 'Food Service Operations' },
]

const quickActions = [
  { icon: FaPlus, label: 'Post announcement' },
  { icon: FaComments, label: 'Message class' },
  { icon: FaFileAlt, label: 'Upload material' },
  { icon: FaChartLine, label: 'Open analytics' },
]

const preparationBoard = [
  { title: 'Next class deck', status: 'Ready', detail: 'Systems Analysis | slides and attendance code prepared' },
  { title: 'Assessment rubric', status: 'Needs edit', detail: 'Reflection Journal | update criteria before 1 PM' },
  { title: 'Advising notes', status: 'In review', detail: 'Probationary learners | guidance summary due Friday' },
]

export default function FacultyDashboard() {
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
            <h1>Faculty Dashboard</h1>
          </div>

          <div className="faculty-dashboard__topbar-strip" aria-label="Current teaching context">
            <strong>AY 2026 | Midterm Week</strong>
            <span>Review work and live class prep</span>
          </div>

          <div className="faculty-dashboard__topbar-actions">
            <button type="button" className="faculty-dashboard__date-chip">
              <FaCalendarAlt />
              April 2026
            </button>
            <div className="faculty-dashboard__chrome-group">
              <button type="button" className="has-badge">
                <FaBell />
                <span>4</span>
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
          <section className="faculty-dashboard__hero">
            <div className="faculty-dashboard__hero-copy">
              <span className="faculty-dashboard__eyebrow">Teaching Operations</span>
              <h2>Classes, grading, advising, and faculty coordination are lined up around today&apos;s rhythm.</h2>
              <p>Keep class flow visible, triage learner follow-ups faster, and move from review work to live instruction without losing context.</p>
            </div>

            <div className="faculty-dashboard__hero-callout">
              <div>
                <span>Next live block</span>
                <strong>07:30 AM | Systems Analysis and Design</strong>
              </div>
              <p>Slides, attendance code, and warm-up prompt are already staged for BSIS 3A.</p>
            </div>
          </section>

          <section className="faculty-dashboard__stats" aria-label="Faculty metrics">
            {statCards.map((card) => (
              <article key={card.label} className="faculty-dashboard__stat">
                <span>{card.value}</span>
                <strong>{card.label}</strong>
                <p>{card.detail}</p>
              </article>
            ))}
          </section>

          <section className="faculty-dashboard__grid">
            <div className="faculty-dashboard__main-column">
              <section className="faculty-dashboard__panel faculty-dashboard__panel--schedule">
                <div className="faculty-dashboard__panel-head">
                  <h3>Today&apos;s Flow</h3>
                  <a href="#">Open timetable</a>
                </div>

                <div className="faculty-dashboard__timeline">
                  {daySchedule.map((item) => (
                    <article key={`${item.time}-${item.title}`} className="faculty-dashboard__timeline-item">
                      <time>{item.time}</time>
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.meta}</span>
                      </div>
                      <em>{item.state}</em>
                    </article>
                  ))}
                </div>
              </section>

              <section className="faculty-dashboard__panel">
                <div className="faculty-dashboard__panel-head">
                  <h3>Class Stream</h3>
                  <a href="#">See all updates</a>
                </div>

                <div className="faculty-dashboard__stream">
                  {classStream.map((item) => (
                    <article key={item.event} className="faculty-dashboard__stream-item">
                      <div className="faculty-dashboard__stream-label">{item.label}</div>
                      <div>
                        <strong>{item.event}</strong>
                        <p>{item.note}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="faculty-dashboard__panel">
                <div className="faculty-dashboard__panel-head">
                  <h3>Preparation Board</h3>
                  <a href="#">Open workspace</a>
                </div>

                <div className="faculty-dashboard__prep-grid">
                  {preparationBoard.map((item) => (
                    <article key={item.title} className="faculty-dashboard__prep-card">
                      <div className="faculty-dashboard__prep-head">
                        <strong>{item.title}</strong>
                        <span>{item.status}</span>
                      </div>
                      <p>{item.detail}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <div className="faculty-dashboard__side-column">
              <section className="faculty-dashboard__panel">
                <div className="faculty-dashboard__panel-head">
                  <h3>Review Queue</h3>
                  <a href="#">Open gradebook</a>
                </div>

                <div className="faculty-dashboard__review-list">
                  {reviewQueue.map((item) => (
                    <article key={item.title} className="faculty-dashboard__review-item">
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.course}</span>
                      </div>
                      <div>
                        <strong>{item.volume}</strong>
                        <span>{item.due}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="faculty-dashboard__panel">
                <div className="faculty-dashboard__panel-head">
                  <h3>Quick Actions</h3>
                  <a href="#">Customize</a>
                </div>

                <div className="faculty-dashboard__actions">
                  {quickActions.map((action) => {
                    const Icon = action.icon

                    return (
                      <button type="button" key={action.label} className="faculty-dashboard__action">
                        <Icon />
                        <span>{action.label}</span>
                      </button>
                    )
                  })}
                </div>
              </section>

              <section className="faculty-dashboard__panel">
                <div className="faculty-dashboard__panel-head">
                  <h3>Learners Needing Attention</h3>
                  <a href="#">Open advisees</a>
                </div>

                <div className="faculty-dashboard__attention-list">
                  {learnersNeedingAttention.map((item) => (
                    <article key={item.name} className="faculty-dashboard__attention-item">
                      <div className="faculty-dashboard__avatar faculty-dashboard__avatar--small">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.course}</span>
                        <p>{item.reason}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="faculty-dashboard__panel faculty-dashboard__panel--spotlight">
                <div className="faculty-dashboard__spotlight-icon">
                  <FaLayerGroup />
                </div>
                <strong>Faculty coordination window at 3:30 PM</strong>
                <p>Bring your section updates, advising concerns, and exam-week requests to the department sync.</p>
                <button type="button" className="faculty-dashboard__primary">
                  <FaChalkboardTeacher />
                  Open faculty memo
                </button>
              </section>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
