import { type ReactNode, useEffect, useRef, useState } from 'react'
import { FaBars, FaBell, FaChevronDown, FaCog, FaEnvelope, FaRegCircle } from 'react-icons/fa'

type AdminTopbarProps = {
  onMenuToggle: () => void
  initials?: string
  name?: string
  role?: string
  leftContent?: ReactNode
}

export function AdminTopbar({
  onMenuToggle,
  initials = 'VG',
  name = 'Virgilio Galicia',
  role = 'Administrator',
  leftContent,
}: AdminTopbarProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isMessagesOpen, setIsMessagesOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const notificationsRef = useRef<HTMLDivElement | null>(null)
  const messagesRef = useRef<HTMLDivElement | null>(null)
  const profileMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (!notificationsRef.current?.contains(target)) {
        setIsNotificationsOpen(false)
      }

      if (!messagesRef.current?.contains(target)) {
        setIsMessagesOpen(false)
      }

      if (!profileMenuRef.current?.contains(target)) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="dashboard-reference__topbar">
      <button
        type="button"
        className="dashboard-reference__menu-trigger"
        aria-label="Toggle admin menu"
        onClick={onMenuToggle}
      >
        <FaBars />
      </button>

      {leftContent ?? (
        <div className="dashboard-reference__topbar-user">
          <div className="dashboard-reference__avatar dashboard-reference__avatar--small">{initials}</div>
          <strong>{name}</strong>
        </div>
      )}

      <div className="dashboard-reference__topbar-actions">
        <div className="dashboard-reference__utility-menu" ref={notificationsRef}>
          <button
            type="button"
            className={`has-badge${isNotificationsOpen ? ' is-active' : ''}`}
            aria-haspopup="dialog"
            aria-expanded={isNotificationsOpen}
            onClick={() => {
              setIsNotificationsOpen((current) => !current)
              setIsMessagesOpen(false)
              setIsProfileMenuOpen(false)
            }}
          >
            <FaBell />
            <span>4</span>
          </button>
          {isNotificationsOpen ? (
            <div className="dashboard-reference__utility-dropdown" role="dialog" aria-label="Notifications">
              <div className="dashboard-reference__utility-head">
                <div>
                  <span>Requests / Tickets</span>
                  <strong>Open requests</strong>
                </div>
                <em>3</em>
              </div>
              <div className="dashboard-reference__utility-list">
                <article>
                  <strong>COE request pending</strong>
                  <span>2 employees are waiting for document release.</span>
                  <small>5 min ago</small>
                </article>
                <article>
                  <strong>Payslip concern</strong>
                  <span>Finance flagged one payroll clarification request.</span>
                  <small>22 min ago</small>
                </article>
                <article>
                  <strong>Attendance correction</strong>
                  <span>3 check-in adjustments need HR review today.</span>
                  <small>48 min ago</small>
                </article>
              </div>
              <button
                type="button"
                className="dashboard-reference__utility-link dashboard-reference__utility-link--footer"
              >
                View all requests / tickets
              </button>
            </div>
          ) : null}
        </div>

        <div className="dashboard-reference__utility-menu" ref={messagesRef}>
          <button
            type="button"
            className={isMessagesOpen ? 'is-active' : undefined}
            aria-haspopup="dialog"
            aria-expanded={isMessagesOpen}
            onClick={() => {
              setIsMessagesOpen((current) => !current)
              setIsNotificationsOpen(false)
              setIsProfileMenuOpen(false)
            }}
          >
            <FaEnvelope />
          </button>
          {isMessagesOpen ? (
            <div
              className="dashboard-reference__utility-dropdown dashboard-reference__utility-dropdown--compact"
              role="dialog"
              aria-label="Messages"
            >
              <div className="dashboard-reference__utility-head">
                <div>
                  <span>Messages</span>
                  <strong>Inbox updates</strong>
                </div>
                <em>2</em>
              </div>
              <div className="dashboard-reference__utility-list">
                <article>
                  <strong>Registrar Office</strong>
                  <span>Please review the updated release memo.</span>
                  <small>11 min ago</small>
                </article>
                <article>
                  <strong>Finance Team</strong>
                  <span>Payroll sign-off is ready for approval.</span>
                  <small>34 min ago</small>
                </article>
              </div>
              <button
                type="button"
                className="dashboard-reference__utility-link dashboard-reference__utility-link--footer"
              >
                Open inbox
              </button>
            </div>
          ) : null}
        </div>

        <button type="button">
          <FaCog />
        </button>
        <button type="button">
          <FaRegCircle />
        </button>

        <div className="dashboard-reference__profile-menu" ref={profileMenuRef}>
          <button
            type="button"
            className={`dashboard-reference__profile-trigger${isProfileMenuOpen ? ' is-open' : ''}`}
            aria-haspopup="menu"
            aria-expanded={isProfileMenuOpen}
            onClick={() => {
              setIsProfileMenuOpen((current) => !current)
              setIsNotificationsOpen(false)
              setIsMessagesOpen(false)
            }}
          >
            <div className="dashboard-reference__avatar dashboard-reference__avatar--small">{initials}</div>
            <FaChevronDown />
          </button>

          {isProfileMenuOpen ? (
            <div className="dashboard-reference__profile-dropdown" role="menu" aria-label="Admin profile menu">
              <div className="dashboard-reference__profile-dropdown-head">
                <strong>{name}</strong>
                <span>{role}</span>
              </div>
              <button type="button" role="menuitem">
                Open profile
              </button>
              <button type="button" role="menuitem">
                Account settings
              </button>
              <button type="button" role="menuitem">
                Notification preferences
              </button>
              <button type="button" role="menuitem" className="is-danger">
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
