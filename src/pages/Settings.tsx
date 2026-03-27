import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBell, FaBookOpen, FaCalendarAlt, FaChartLine, FaCog, FaEnvelope, FaFileAlt, FaGraduationCap, FaHome, FaLock, FaPlus, FaRegCircle, FaShieldAlt, FaSignOutAlt, FaUser, FaUserCheck, FaUserClock, FaUserGraduate, FaUsers } from 'react-icons/fa'

const navItems = [
  { icon: FaHome, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: FaUserGraduate, label: 'Students', to: '/admin/students' },
  { icon: FaBookOpen, label: 'Courses', to: '/admin/courses' },
  { icon: FaUsers, label: 'Admissions', to: '/admin/admissions' },
  { icon: FaUserCheck, label: 'Employees', to: '/admin/employees' },
  { icon: FaUserClock, label: 'Leave', to: '/admin/leave' },
  { icon: FaChartLine, label: 'Payroll', to: '/admin/payroll' },
  { icon: FaFileAlt, label: 'Documents', to: '/admin/documents' },
  { icon: FaFileAlt, label: 'Reports', to: '/admin/reports' },
  { icon: FaCalendarAlt, label: 'Calendar', to: '/admin/calendar' },
  { icon: FaCog, label: 'Settings', to: '/admin/settings', active: true },
]

type Signatory = {
  id: number
  name: string
  role: string
  scope: string
}

type SettingsTab = 'general' | 'profile' | 'account' | 'notifications' | 'security'

const settingsTabs: Array<{ id: SettingsTab; label: string; icon: typeof FaCog }> = [
  { id: 'general', label: 'General', icon: FaCog },
  { id: 'profile', label: 'Profile', icon: FaUser },
  { id: 'account', label: 'Account', icon: FaUserCheck },
  { id: 'notifications', label: 'Notifications', icon: FaBell },
  { id: 'security', label: 'Security', icon: FaShieldAlt },
]

const initialSignatories: Signatory[] = [
  { id: 1, name: 'John Doe', role: 'Registrar', scope: 'Enrollment approvals' },
  { id: 2, name: 'Marina Santos', role: 'HR Manager', scope: 'Employee actions' },
  { id: 3, name: 'Victor Ramos', role: 'Payroll Officer', scope: 'Payroll release' },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account')
  const [signatories, setSignatories] = useState(initialSignatories)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', role: 'Registrar', scope: '' })
  const [accountSettings, setAccountSettings] = useState({
    currentEmail: 'admin@nalaka.edu',
    newEmail: '',
    currentPassword: '••••••••',
    newPassword: '',
    confirmPassword: '',
  })
  const [profileSettings, setProfileSettings] = useState({
    displayName: 'Virgilio Galicia',
    jobTitle: 'System Administrator',
    mobileNumber: '+63 917 555 1022',
    officeLocation: 'Registrar and HR Office',
  })
  const [generalSettings, setGeneralSettings] = useState({
    portalName: 'NALAKA LMS',
    schoolYear: 'AY 2026 - 2027',
    timezone: 'Asia/Singapore',
    payrollCycle: 'Bi-monthly',
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    payrollReminders: true,
    calendarDigest: false,
    policyUpdates: true,
  })
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: '30 minutes',
  })

  const hasPasswordChange = useMemo(
    () =>
      accountSettings.newPassword.trim().length > 0 ||
      accountSettings.confirmPassword.trim().length > 0,
    [accountSettings.confirmPassword, accountSettings.newPassword],
  )

  const handleAddSignatory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = formData.name.trim()
    const scope = formData.scope.trim()
    if (!name || !scope) return

    setSignatories((current) => [...current, { id: current.length + 1, name, role: formData.role, scope }])
    setFormData({ name: '', role: 'Registrar', scope: '' })
    setIsModalOpen(false)
  }

  const handleSave = (_section: 'general' | 'profile' | 'notifications' | 'security' | 'account' | 'all') => {
    return
  }

  const renderTabContent = () => {
    if (activeTab === 'general') {
      return (
        <div className="settings-reference__section-card">
          <div className="settings-reference__section-header">
            <h2>General Settings</h2>
            <p>Set the academic and HR defaults that shape the portal workspace.</p>
          </div>
          <div className="settings-reference__form-grid">
            <label>
              Portal name
              <input
                value={generalSettings.portalName}
                onChange={(event) => setGeneralSettings((current) => ({ ...current, portalName: event.target.value }))}
              />
            </label>
            <label>
              Active school year
              <input
                value={generalSettings.schoolYear}
                onChange={(event) => setGeneralSettings((current) => ({ ...current, schoolYear: event.target.value }))}
              />
            </label>
            <label>
              Timezone
              <input
                value={generalSettings.timezone}
                onChange={(event) => setGeneralSettings((current) => ({ ...current, timezone: event.target.value }))}
              />
            </label>
            <label>
              Payroll cycle
              <select
                value={generalSettings.payrollCycle}
                onChange={(event) => setGeneralSettings((current) => ({ ...current, payrollCycle: event.target.value }))}
              >
                <option>Bi-monthly</option>
                <option>Monthly</option>
                <option>Weekly</option>
              </select>
            </label>
          </div>
          <div className="settings-reference__footer">
            <button type="button" className="users-reference__filter">Cancel</button>
            <button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => void handleSave('general')}>Save Changes</button>
          </div>
        </div>
      )
    }

    if (activeTab === 'profile') {
      return (
        <div className="settings-reference__section-card">
          <div className="settings-reference__section-header">
            <h2>Profile Settings</h2>
            <p>Update the admin identity used across registrar and HR operations.</p>
          </div>
          <div className="settings-reference__form-grid">
            <label>
              Display name
              <input
                value={profileSettings.displayName}
                onChange={(event) => setProfileSettings((current) => ({ ...current, displayName: event.target.value }))}
              />
            </label>
            <label>
              Role title
              <input
                value={profileSettings.jobTitle}
                onChange={(event) => setProfileSettings((current) => ({ ...current, jobTitle: event.target.value }))}
              />
            </label>
            <label>
              Mobile number
              <input
                value={profileSettings.mobileNumber}
                onChange={(event) => setProfileSettings((current) => ({ ...current, mobileNumber: event.target.value }))}
              />
            </label>
            <label>
              Office location
              <input
                value={profileSettings.officeLocation}
                onChange={(event) => setProfileSettings((current) => ({ ...current, officeLocation: event.target.value }))}
              />
            </label>
          </div>
          <div className="settings-reference__footer">
            <button type="button" className="users-reference__filter">Cancel</button>
            <button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => void handleSave('profile')}>Save Changes</button>
          </div>
        </div>
      )
    }

    if (activeTab === 'notifications') {
      return (
        <div className="settings-reference__section-card">
          <div className="settings-reference__section-header">
            <h2>Notification Settings</h2>
            <p>Choose which alerts should surface for school operations and HR events.</p>
          </div>
          <div className="settings-reference__toggle-list">
            {[
              ['Email alerts', 'Receive approvals and workflow notifications by email.', 'emailAlerts'],
              ['Payroll reminders', 'Notify payroll staff before each release window.', 'payrollReminders'],
              ['Calendar digest', 'Send a weekly digest of upcoming campus events.', 'calendarDigest'],
              ['Policy updates', 'Notify admins when governance or policy rules change.', 'policyUpdates'],
            ].map(([title, copy, key]) => (
              <article key={key} className="settings-reference__toggle-item">
                <div>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
                <button
                  type="button"
                  className={notificationSettings[key as keyof typeof notificationSettings] ? 'is-on' : undefined}
                  onClick={() =>
                    setNotificationSettings((current) => ({
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
            <button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => void handleSave('notifications')}>Save Changes</button>
          </div>
        </div>
      )
    }

    if (activeTab === 'security') {
      return (
        <div className="settings-reference__section-card">
          <div className="settings-reference__section-header">
            <h2>Security Settings</h2>
            <p>Review access protection, session controls, and approval ownership.</p>
          </div>

          <div className="settings-reference__security-grid">
            <div className="settings-reference__security-panel">
              <article className="settings-reference__toggle-item">
                <div>
                  <strong>Two-factor authentication</strong>
                  <p>Require a second verification step for administrators.</p>
                </div>
                <button
                  type="button"
                  className={securitySettings.twoFactor ? 'is-on' : undefined}
                  onClick={() => setSecuritySettings((current) => ({ ...current, twoFactor: !current.twoFactor }))}
                >
                  <span />
                </button>
              </article>
              <article className="settings-reference__toggle-item">
                <div>
                  <strong>Login alerts</strong>
                  <p>Notify the primary admin when a new device signs in.</p>
                </div>
                <button
                  type="button"
                  className={securitySettings.loginAlerts ? 'is-on' : undefined}
                  onClick={() => setSecuritySettings((current) => ({ ...current, loginAlerts: !current.loginAlerts }))}
                >
                  <span />
                </button>
              </article>
              <label>
                Session timeout
                <select
                  value={securitySettings.sessionTimeout}
                  onChange={(event) => setSecuritySettings((current) => ({ ...current, sessionTimeout: event.target.value }))}
                >
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                </select>
              </label>
            </div>

            <div className="settings-reference__security-panel">
              <div className="settings-reference__section-head">
                <h3>Approval Signatories</h3>
                <button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => setIsModalOpen(true)}>
                  <FaPlus /> Add Signatory
                </button>
              </div>
              <div className="settings-reference__signatory-list">
                {signatories.map((signatory) => (
                  <article key={signatory.id} className="settings-reference__signatory-item">
                    <div className="dashboard-reference__avatar dashboard-reference__avatar--small">
                      {signatory.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <strong>{signatory.name}</strong>
                      <span>{signatory.role}</span>
                    </div>
                    <em>{signatory.scope}</em>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="settings-reference__footer">
            <button type="button" className="users-reference__filter">Cancel</button>
            <button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => void handleSave('security')}>Save Changes</button>
          </div>
        </div>
      )
    }

    return (
      <div className="settings-reference__section-card">
        <div className="settings-reference__section-header">
          <h2>Account Settings</h2>
          <p>Manage email credentials, password changes, and account-level controls.</p>
        </div>

        <div className="settings-reference__account-grid">
          <section className="settings-reference__account-section settings-reference__account-section--split">
            <div className="settings-reference__subsection">
              <h3>Email Address</h3>
              <label>
                Current email address
                <input
                  value={accountSettings.currentEmail}
                  onChange={(event) => setAccountSettings((current) => ({ ...current, currentEmail: event.target.value }))}
                />
              </label>
              <label className="settings-reference__inline-action">
                <span>New email address</span>
                <div>
                  <input
                    value={accountSettings.newEmail}
                    onChange={(event) => setAccountSettings((current) => ({ ...current, newEmail: event.target.value }))}
                    placeholder="name@nalaka.edu"
                  />
                  <button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => void handleSave('account')}>Save</button>
                </div>
              </label>
              <p className="settings-reference__note">Note: Enter your password to confirm an email change.</p>
            </div>

            <div className="settings-reference__subsection settings-reference__subsection--alert">
              <h3>Account Actions</h3>
              <button type="button" className="settings-reference__danger">
                <FaLock /> Deactivate Account
              </button>
              <p>Temporarily disable this account and preserve the current registrar and HR data.</p>
            </div>
          </section>

          <section className="settings-reference__account-section">
            <div className="settings-reference__subsection">
              <h3>Change Password</h3>
              <label>
                Current password
                <input
                  type="password"
                  value={accountSettings.currentPassword}
                  onChange={(event) => setAccountSettings((current) => ({ ...current, currentPassword: event.target.value }))}
                />
              </label>
              <label>
                New password
                <input
                  type="password"
                  value={accountSettings.newPassword}
                  onChange={(event) => setAccountSettings((current) => ({ ...current, newPassword: event.target.value }))}
                  placeholder="Enter a new password"
                />
              </label>
              <label>
                Confirm new password
                <input
                  type="password"
                  value={accountSettings.confirmPassword}
                  onChange={(event) => setAccountSettings((current) => ({ ...current, confirmPassword: event.target.value }))}
                  placeholder="Confirm new password"
                />
              </label>
              <p className="settings-reference__note">
                {hasPasswordChange ? 'Use at least 8 characters with a mix of letters and numbers.' : 'Password must be at least 8 characters long.'}
              </p>
              <div className="settings-reference__subaction">
                <button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => void handleSave('account')}>Save</button>
              </div>
            </div>
          </section>
        </div>

        <div className="settings-reference__footer">
          <button type="button" className="users-reference__filter">Cancel</button>
          <button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => void handleSave('all')}>Save Changes</button>
        </div>
      </div>
    )
  }

  return (
    <main className="dashboard-page dashboard-reference users-reference-page">
      <aside className="dashboard-reference__sidebar">
        <div className="dashboard-reference__brand"><span className="dashboard-reference__brand-icon"><FaGraduationCap /></span><div><strong>NALAKA LMS</strong><span>Registrar & HR</span></div></div>
        <div className="dashboard-reference__profile"><div className="dashboard-reference__avatar">JD</div><div className="dashboard-reference__profile-copy"><strong>John Doe</strong><span>System Admin</span></div><em>3</em></div>
        <nav className="dashboard-reference__nav" aria-label="Portal navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return <Link key={item.label} to={item.to} className={item.active ? 'is-active' : undefined}><Icon /><span>{item.label}</span></Link>
          })}
        </nav>
        <button type="button" className="dashboard-reference__logout"><span><FaSignOutAlt />Logout</span><span aria-hidden="true">{'>'}</span></button>
      </aside>

      <section className="dashboard-reference__main">
        <header className="dashboard-reference__topbar">
          <div className="dashboard-reference__topbar-copy">
            <strong>Settings</strong>
            <span>Manage and customize system settings</span>
          </div>
          <div className="dashboard-reference__topbar-actions">
            <button type="button" className="has-badge"><FaBell /><span>5</span></button>
            <button type="button"><FaEnvelope /></button>
            <button type="button"><FaCog /></button>
            <button type="button"><FaRegCircle /></button>
            <div className="dashboard-reference__avatar dashboard-reference__avatar--small">JD</div>
          </div>
        </header>

        <section className="dashboard-reference__content users-reference settings-reference">
          <section className="dashboard-reference__panel users-reference__panel settings-reference__panel">
            <div className="settings-reference__tabs" role="tablist" aria-label="Settings tabs">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon
                const isActive = tab.id === activeTab

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={isActive ? 'is-active' : undefined}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {renderTabContent()}
          </section>
        </section>
      </section>

      {isModalOpen ? (
        <div className="users-reference__modal-backdrop users-reference__modal-backdrop--premium" role="presentation" onClick={() => setIsModalOpen(false)}>
          <div className="users-reference__modal settings-reference__modal" role="dialog" aria-modal="true" aria-labelledby="add-signatory-title" onClick={(event) => event.stopPropagation()}>
            <div className="dashboard-reference__panel-header">
              <div><h2 id="add-signatory-title">Add Signatory</h2><p className="users-reference__subcopy">Create an approval signatory for registrar or HR workflows.</p></div>
              <button type="button" className="users-reference__modal-close" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>

            <form className="users-reference__form" onSubmit={handleAddSignatory}>
              <label>Full name<input value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} placeholder="Maria Clara" /></label>
              <label>Role<select value={formData.role} onChange={(event) => setFormData((current) => ({ ...current, role: event.target.value }))}><option value="Registrar">Registrar</option><option value="HR Manager">HR Manager</option><option value="Payroll Officer">Payroll Officer</option><option value="Admissions Head">Admissions Head</option></select></label>
              <label className="settings-reference__modal-span">Approval scope<input value={formData.scope} onChange={(event) => setFormData((current) => ({ ...current, scope: event.target.value }))} placeholder="Employee actions" /></label>
              <div className="users-reference__modal-actions">
                <button type="button" className="users-reference__filter" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="dashboard-reference__soft-button users-reference__add"><FaPlus />Save Signatory</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  )
}

