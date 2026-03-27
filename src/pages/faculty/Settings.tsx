import { useState } from 'react'
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
  FaShieldAlt,
  FaSignOutAlt,
  FaTasks,
  FaUser,
} from 'react-icons/fa'
import { facultyNavMain, facultyNavSupport, type FacultyNavItem } from './gradebookData'

type FacultySettingsTab = 'profile' | 'classroom' | 'notifications' | 'security'

const settingsTabs: Array<{ id: FacultySettingsTab; label: string; icon: typeof FaCog }> = [
  { id: 'profile', label: 'Profile', icon: FaUser },
  { id: 'classroom', label: 'Classroom', icon: FaBookOpen },
  { id: 'notifications', label: 'Notifications', icon: FaBell },
  { id: 'security', label: 'Security', icon: FaShieldAlt },
]

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

export default function FacultySettings() {
  const [activeTab, setActiveTab] = useState<FacultySettingsTab>('profile')
  const [profile, setProfile] = useState({
    displayName: 'Michael Reyes',
    title: 'Systems and Education Faculty',
    mobileNumber: '+63 917 555 1022',
    officeLocation: 'Faculty Office',
  })
  const [classroom, setClassroom] = useState({
    defaultQuarter: '2nd Quarter',
    attendanceReminder: true,
    gradingView: 'Section-first',
    consultationMode: 'Calendar blocks',
  })
  const [notifications, setNotifications] = useState({
    newSubmissions: true,
    classReminders: true,
    forumReplies: true,
    policyUpdates: false,
  })
  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: '30 minutes',
  })

  const renderTabContent = () => {
    if (activeTab === 'profile') {
      return (
        <div className="settings-reference__section-card">
          <div className="settings-reference__section-header">
            <h2>Faculty Profile</h2>
            <p>Update the faculty identity shown across classes, gradebook, and forum spaces.</p>
          </div>
          <div className="settings-reference__form-grid">
            <label>
              Display name
              <input value={profile.displayName} onChange={(event) => setProfile((current) => ({ ...current, displayName: event.target.value }))} />
            </label>
            <label>
              Faculty title
              <input value={profile.title} onChange={(event) => setProfile((current) => ({ ...current, title: event.target.value }))} />
            </label>
            <label>
              Mobile number
              <input value={profile.mobileNumber} onChange={(event) => setProfile((current) => ({ ...current, mobileNumber: event.target.value }))} />
            </label>
            <label>
              Office location
              <input value={profile.officeLocation} onChange={(event) => setProfile((current) => ({ ...current, officeLocation: event.target.value }))} />
            </label>
          </div>
          <div className="settings-reference__footer">
            <button type="button" className="users-reference__filter">Cancel</button>
            <button type="button" className="dashboard-reference__soft-button users-reference__add">Save Changes</button>
          </div>
        </div>
      )
    }

    if (activeTab === 'classroom') {
      return (
        <div className="settings-reference__section-card">
          <div className="settings-reference__section-header">
            <h2>Classroom Preferences</h2>
            <p>Control the defaults used in your gradebook, class schedule, and learner workflows.</p>
          </div>
          <div className="settings-reference__form-grid">
            <label>
              Default quarter
              <select value={classroom.defaultQuarter} onChange={(event) => setClassroom((current) => ({ ...current, defaultQuarter: event.target.value }))}>
                <option>1st Quarter</option>
                <option>2nd Quarter</option>
                <option>3rd Quarter</option>
                <option>4th Quarter</option>
              </select>
            </label>
            <label>
              Grading view
              <select value={classroom.gradingView} onChange={(event) => setClassroom((current) => ({ ...current, gradingView: event.target.value }))}>
                <option>Section-first</option>
                <option>Subject-first</option>
              </select>
            </label>
            <label>
              Attendance reminder
              <select value={classroom.attendanceReminder ? 'Enabled' : 'Disabled'} onChange={(event) => setClassroom((current) => ({ ...current, attendanceReminder: event.target.value === 'Enabled' }))}>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </label>
            <label>
              Consultation mode
              <select value={classroom.consultationMode} onChange={(event) => setClassroom((current) => ({ ...current, consultationMode: event.target.value }))}>
                <option>Calendar blocks</option>
                <option>Forum requests</option>
                <option>Email only</option>
              </select>
            </label>
          </div>
          <div className="settings-reference__footer">
            <button type="button" className="users-reference__filter">Cancel</button>
            <button type="button" className="dashboard-reference__soft-button users-reference__add">Save Changes</button>
          </div>
        </div>
      )
    }

    if (activeTab === 'notifications') {
      return (
        <div className="settings-reference__section-card">
          <div className="settings-reference__section-header">
            <h2>Notification Settings</h2>
            <p>Choose which faculty alerts should surface while teaching, grading, or coordinating.</p>
          </div>
          <div className="settings-reference__toggle-list">
            {[
              ['New submissions', 'Notify you when learners submit assessments.', 'newSubmissions'],
              ['Class reminders', 'Show reminders before upcoming teaching blocks.', 'classReminders'],
              ['Forum replies', 'Alert you when someone responds to your threads.', 'forumReplies'],
              ['Policy updates', 'Show policy memos and faculty governance notices.', 'policyUpdates'],
            ].map(([title, copy, key]) => (
              <article key={key} className="settings-reference__toggle-item">
                <div>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
                <button
                  type="button"
                  className={notifications[key as keyof typeof notifications] ? 'is-on' : undefined}
                  onClick={() =>
                    setNotifications((current) => ({
                      ...current,
                      [key]: !current[key as keyof typeof current],
                    }))
                  }
                >
                  <span />
                </button>
              </article>
            ))}
          </div>
          <div className="settings-reference__footer">
            <button type="button" className="users-reference__filter">Cancel</button>
            <button type="button" className="dashboard-reference__soft-button users-reference__add">Save Changes</button>
          </div>
        </div>
      )
    }

    return (
      <div className="settings-reference__section-card">
        <div className="settings-reference__section-header">
          <h2>Security Settings</h2>
          <p>Review sign-in protection and session controls for the faculty workspace.</p>
        </div>
        <div className="settings-reference__security-grid">
          <div className="settings-reference__security-panel">
            <article className="settings-reference__toggle-item">
              <div>
                <strong>Two-factor authentication</strong>
                <p>Require a second verification step for your faculty account.</p>
              </div>
              <button type="button" className={security.twoFactor ? 'is-on' : undefined} onClick={() => setSecurity((current) => ({ ...current, twoFactor: !current.twoFactor }))}>
                <span />
              </button>
            </article>
            <article className="settings-reference__toggle-item">
              <div>
                <strong>Login alerts</strong>
                <p>Receive a notice when your account signs in on a new device.</p>
              </div>
              <button type="button" className={security.loginAlerts ? 'is-on' : undefined} onClick={() => setSecurity((current) => ({ ...current, loginAlerts: !current.loginAlerts }))}>
                <span />
              </button>
            </article>
            <label>
              Session timeout
              <select value={security.sessionTimeout} onChange={(event) => setSecurity((current) => ({ ...current, sessionTimeout: event.target.value }))}>
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
              </select>
            </label>
          </div>
        </div>
        <div className="settings-reference__footer">
          <button type="button" className="users-reference__filter">Cancel</button>
          <button type="button" className="dashboard-reference__soft-button users-reference__add">Save Changes</button>
        </div>
      </div>
    )
  }

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
              <Link key={item.label} to={item.to}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="faculty-dashboard__nav-label faculty-dashboard__nav-label--secondary">Tools</div>
          {facultyNavSupport.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <Link key={item.label} to={item.to} className={item.label === 'Settings' ? 'is-active' : undefined}>
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
            <h1>Settings</h1>
          </div>

          <div className="faculty-dashboard__topbar-strip" aria-label="Settings context">
            <strong>Faculty preferences</strong>
            <span>Classroom defaults, alerts, and profile settings</span>
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
          <section className="settings-reference faculty-settings-reference">
            <div className="settings-reference__tab-shell">
              <div className="settings-reference__tab-bar">
                {settingsTabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      className={activeTab === tab.id ? 'is-active' : undefined}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon />
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              <div className="settings-reference__tab-panel">{renderTabContent()}</div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
