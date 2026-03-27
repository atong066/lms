import { Link } from 'react-router-dom'
import {
  FaBell,
  FaBookOpen,
  FaCalendarAlt,
  FaChartLine,
  FaChevronRight,
  FaCog,
  FaComments,
  FaFileAlt,
  FaGraduationCap,
  FaHome,
  FaRegCircle,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa'
import { studentNavMain, studentNavSupport, studentProfile, type StudentNavItem } from './studentData'
import type { ReactNode } from 'react'

type StudentShellProps = {
  activePath: string
  title: string
  subtitle: string
  children: ReactNode
}

function getIcon(icon: StudentNavItem['icon']) {
  switch (icon) {
    case 'home':
      return FaHome
    case 'subjects':
      return FaBookOpen
    case 'grades':
      return FaChartLine
    case 'assessments':
      return FaFileAlt
    case 'schedule':
      return FaCalendarAlt
    case 'calendar':
      return FaCalendarAlt
    case 'forum':
      return FaComments
    case 'profile':
      return FaUser
    case 'settings':
      return FaCog
  }
}

function renderNav(items: StudentNavItem[], activePath: string) {
  return items.map((item) => {
    const Icon = getIcon(item.icon)
    const isActive = activePath === item.to

    return (
      <Link key={item.label} to={item.to} className={isActive ? 'is-active' : undefined}>
        <Icon />
        <span>{item.label}</span>
      </Link>
    )
  })
}

export default function StudentShell({ activePath, title, subtitle, children }: StudentShellProps) {
  return (
    <main className="student-portal">
      <aside className="student-portal__sidebar">
        <div className="student-portal__brand">
          <span className="student-portal__brand-mark">
            <FaGraduationCap />
          </span>
          <div>
            <strong>NALAKA LMS</strong>
            <span>Student Portal</span>
          </div>
        </div>

        <div className="student-portal__profile">
          <div className="student-portal__avatar">AR</div>
          <div className="student-portal__profile-copy">
            <strong>{studentProfile.name}</strong>
            <span>{studentProfile.section}</span>
          </div>
        </div>

        <nav className="student-portal__nav" aria-label="Student navigation">
          <div className="student-portal__nav-label">Workspace</div>
          {renderNav(studentNavMain, activePath)}
          <div className="student-portal__nav-label student-portal__nav-label--secondary">Support</div>
          {renderNav(studentNavSupport, activePath)}

          <button type="button" className="student-portal__logout">
            <span>
              <FaSignOutAlt />
              Sign out
            </span>
            <FaChevronRight />
          </button>
        </nav>
      </aside>

      <section className="student-portal__main">
        <header className="student-portal__topbar">
          <div className="student-portal__topbar-copy">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          <div className="student-portal__topbar-actions">
            <button type="button" className="has-badge">
              <FaBell />
              <span>3</span>
            </button>
            <button type="button">
              <FaComments />
            </button>
            <button type="button">
              <FaRegCircle />
            </button>
            <div className="student-portal__topbar-user">
              <div className="student-portal__avatar student-portal__avatar--small">AR</div>
              <div>
                <strong>{studentProfile.name}</strong>
                <span>{studentProfile.program}</span>
              </div>
            </div>
          </div>
        </header>

        <section className="student-portal__content">{children}</section>
      </section>
    </main>
  )
}
