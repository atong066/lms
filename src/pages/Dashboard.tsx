import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
  FaCog,
  FaComments,
  FaFileAlt,
  FaChartLine,
  FaGraduationCap,
  FaHome,
  FaSignOutAlt,
  FaTasks,
  FaUserCheck,
  FaUserClock,
  FaUserGraduate,
  FaUsers,
} from 'react-icons/fa'
import { AdminTopbar } from '../components/AdminTopbar'

const navItems = [
  { icon: FaHome, label: 'Dashboard', to: '/admin/dashboard', active: true },
  { icon: FaUserGraduate, label: 'Students', to: '/admin/students' },
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

const statCards = [
  { icon: FaUserGraduate, value: '412', label: 'Active Students', tone: 'blue' },
  { icon: FaBookOpen, value: '24', label: 'Published Courses', tone: 'teal' },
  { icon: FaUserCheck, value: '38', label: 'Employees On Duty', tone: 'orange' },
  { icon: FaClock, value: '7', label: 'Urgent Approvals', tone: 'violet' },
]

const operationsActivity = [
  { name: 'Admissions Team', action: 'qualified 14 applicants for', target: 'AY 2026 Intake', meta: 'Registrar office · 11:00 AM', ago: '12 min ago' },
  { name: 'HR Office', action: 'flagged a validation issue in', target: 'Payroll Closing Window', meta: '2 records pending · 9:30 AM', ago: '38 min ago' },
  { name: 'Student Affairs', action: 'posted an updated memo for', target: 'Midterm Exam Week', meta: 'Campus bulletin', ago: '1 hr ago' },
  { name: 'Records Unit', action: 'released a document batch in', target: 'Credential Verification', meta: '18 files processed · 8:00 AM', ago: '2 hrs ago' },
]

const scheduleBlocks = [
  { time: '8:00 AM', title: 'Enrollment verification run', room: 'Registrar Hub', status: 'In progress' },
  { time: '10:00 AM', title: 'Payroll validation window', room: 'HR Desk', status: 'Pending sign-off' },
  { time: '1:00 PM', title: 'Admissions interview block', room: 'Conference 2', status: 'Next session' },
  { time: '3:30 PM', title: 'Admin operations sync', room: 'Executive boardroom', status: 'Leadership meeting' },
]

const approvalQueue = [
  { area: 'Payroll', item: 'March compensation batch', due: 'Today, 5:00 PM', count: '11 items pending' },
  { area: 'Admissions', item: 'Credential review queue', due: 'Tomorrow', count: '18 applicants' },
  { area: 'Documents', item: 'Release authorization batch', due: 'Friday', count: '24 records' },
]

const quickActions = [
  { icon: FaComments, label: 'Post Announcement' },
  { icon: FaTasks, label: 'Open Reports' },
  { icon: FaUserCheck, label: 'Review Employees' },
  { icon: FaFileAlt, label: 'Release Documents' },
]

const prioritySignals = [
  { name: 'Ava Ramos', area: 'Student Registry', note: 'Missing enrollment credentials', state: 'Needs follow-up' },
  { name: 'Liam Cruz', area: 'Admissions', note: 'Submitted incomplete requirements', state: 'Review today' },
  { name: 'Mia Santos', area: 'Payroll', note: 'Awaiting bank account confirmation', state: 'Schedule reply' },
]

const weekFocus = [
  { title: 'Quarter closeout deadline', detail: 'Finalize registrar and HR closeout tasks before Thursday evening.' },
  { title: 'Compliance window', detail: 'Document release and payroll sign-off remain open until Friday.' },
]

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <main className={`dashboard-page dashboard-reference${isSidebarOpen ? ' is-sidebar-open' : ''}`}>
      <aside className="dashboard-reference__sidebar">
        <div className="dashboard-reference__brand">
          <span className="dashboard-reference__brand-icon">
            <FaGraduationCap />
          </span>
          <div>
            <strong>NALAKA LMS</strong>
            <span>Admin Console</span>
          </div>
        </div>

        <div className="dashboard-reference__profile">
          <div className="dashboard-reference__avatar">VG</div>
          <div className="dashboard-reference__profile-copy">
            <strong>Virgilio Galicia</strong>
            <span>Administrator</span>
          </div>
          <em>4</em>
        </div>

        <nav className="dashboard-reference__nav" aria-label="Admin navigation">
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

        <section className="dashboard-reference__content">
          <h1>Admin Dashboard</h1>

          <section className="dashboard-reference__stats" aria-label="Admin metrics">
            {statCards.map((card) => {
              const Icon = card.icon

              return (
                <article key={card.label} className={`dashboard-reference__stat dashboard-reference__stat--${card.tone}`}>
                  <div className="dashboard-reference__stat-icon">
                    <Icon />
                  </div>
                  <div>
                    <strong>{card.value}</strong>
                    <span>{card.label}</span>
                  </div>
                </article>
              )
            })}
          </section>

          <section className="dashboard-reference__grid">
            <div className="dashboard-reference__column-main">
              <section className="dashboard-reference__panel dashboard-reference__panel--activity">
                <div className="dashboard-reference__panel-header">
                  <h2>Operations Activity</h2>
                  <a href="#">View stream</a>
                </div>

                <div className="dashboard-reference__activity-list">
                  {operationsActivity.map((item) => (
                    <article key={`${item.name}-${item.target}`} className="dashboard-reference__activity-item">
                      <div className="dashboard-reference__avatar dashboard-reference__avatar--small">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="dashboard-reference__activity-copy">
                        <p>
                          <strong>{item.name}</strong> {item.action} <a href="#">{item.target}</a>
                        </p>
                        <span>{item.meta}</span>
                      </div>
                      <time>{item.ago}</time>
                    </article>
                  ))}
                </div>
              </section>

              <div className="dashboard-reference__lower-grid">
                <section className="dashboard-reference__panel">
                  <div className="dashboard-reference__panel-header">
                    <h2>Today&apos;s Operations</h2>
                    <a href="#">Open calendar</a>
                  </div>

                  <div className="dashboard-reference__activity-list">
                    {scheduleBlocks.map((item) => (
                      <article key={`${item.time}-${item.title}`} className="dashboard-reference__activity-item">
                        <div className="dashboard-reference__avatar dashboard-reference__avatar--small">{item.time.slice(0, 2)}</div>
                        <div className="dashboard-reference__activity-copy">
                          <p>
                            <strong>{item.title}</strong>
                          </p>
                          <span>{item.room}</span>
                        </div>
                        <time>{item.status}</time>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="dashboard-reference__panel">
                  <div className="dashboard-reference__panel-header">
                    <h2>Week Focus</h2>
                  </div>

                  {weekFocus.map((item) => (
                    <div key={item.title} className="dashboard-reference__announcement">
                      <div className="dashboard-reference__announcement-head">
                        <strong>{item.title}</strong>
                      </div>
                      <p>{item.detail}</p>
                    </div>
                  ))}

                  <button type="button" className="dashboard-reference__soft-button">
                    <FaComments />
                    Open admin memo
                  </button>
                </section>
              </div>
            </div>

            <div className="dashboard-reference__column-side">
              <section className="dashboard-reference__panel">
                <div className="dashboard-reference__panel-header">
                  <h2>Approval Queue</h2>
                  <a href="#">View all</a>
                </div>

                <div className="dashboard-reference__activity-list">
                  {approvalQueue.map((item) => (
                    <article key={`${item.area}-${item.item}`} className="dashboard-reference__activity-item">
                      <div className="dashboard-reference__avatar dashboard-reference__avatar--small">AQ</div>
                      <div className="dashboard-reference__activity-copy">
                        <p>
                          <strong>{item.item}</strong>
                        </p>
                        <span>{item.area} · {item.count}</span>
                      </div>
                      <time>{item.due}</time>
                    </article>
                  ))}
                </div>
              </section>

              <section className="dashboard-reference__panel">
                <div className="dashboard-reference__panel-header">
                  <h2>Quick Actions</h2>
                  <a href="#">Customize</a>
                </div>

                <div className="dashboard-reference__actions-grid">
                  {quickActions.map((action) => {
                    const Icon = action.icon
                    return (
                      <button type="button" key={action.label} className="dashboard-reference__action-tile">
                        <Icon />
                        <span>{action.label}</span>
                      </button>
                    )
                  })}
                </div>
              </section>

              <section className="dashboard-reference__panel">
                <div className="dashboard-reference__panel-header">
                  <h2>Priority Signals</h2>
                  <a href="#">Open registry</a>
                </div>

                <div className="dashboard-reference__announcement">
                  {prioritySignals.map((item) => (
                    <div key={item.name} className="dashboard-reference__announcement" style={{ marginTop: 0, paddingInline: 0, paddingTop: 0, border: 0 }}>
                      <div className="dashboard-reference__announcement-head">
                        <strong>{item.name}</strong>
                        <span>{item.state}</span>
                      </div>
                      <p>{item.area} · {item.note}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </section>
      </section>
    </main>
  )
}
