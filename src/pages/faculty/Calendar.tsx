import { useMemo, useState } from 'react'
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
  FaFilter,
  FaGraduationCap,
  FaHome,
  FaRegCircle,
  FaSearch,
  FaSignOutAlt,
  FaTasks,
} from 'react-icons/fa'
import { facultyNavMain, facultyNavSupport, type FacultyNavItem } from './gradebookData'

type EventType = 'Class' | 'Consultation' | 'Department' | 'Campus'
type EventRecord = {
  id: string
  title: string
  date: string
  time: string
  venue: string
  type: EventType
}

const initialEvents: EventRecord[] = [
  { id: '1', title: 'Systems Analysis and Design', date: '2026-06-03', time: '07:30', venue: 'Room 402', type: 'Class' },
  { id: '2', title: 'Faculty Consultation Window', date: '2026-06-08', time: '10:00', venue: 'Advising Hub', type: 'Consultation' },
  { id: '3', title: 'Department Coordination Meeting', date: '2026-06-12', time: '14:00', venue: 'College Office', type: 'Department' },
  { id: '4', title: 'Assessment Week Briefing', date: '2026-06-17', time: '09:00', venue: 'Innovation Hall', type: 'Campus' },
  { id: '5', title: 'Reflection Journal Review', date: '2026-06-23', time: '13:00', venue: 'Room 215', type: 'Class' },
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

const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1)

const formatDisplayDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })

const formatDisplayTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return new Date(2026, 5, 1, Number.isFinite(hours) ? hours : 0, Number.isFinite(minutes) ? minutes : 0).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

const compareEvents = (left: EventRecord, right: EventRecord) =>
  `${left.date}-${left.time}`.localeCompare(`${right.date}-${right.time}`)

export default function FacultyCalendar() {
  const [events] = useState<EventRecord[]>(initialEvents)
  const [search, setSearch] = useState('')

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase()
    const searchedEvents = !query
      ? events
      : events.filter((event) =>
          [event.title, event.date, event.time, event.venue, event.type].some((value) =>
            value.toLowerCase().includes(query),
          ),
        )

    return [...searchedEvents].sort(compareEvents)
  }, [events, search])

  const eventMap = useMemo(() => {
    const map = new Map<number, EventRecord[]>()
    ;[...events].sort(compareEvents).forEach((event) => {
      const day = Number(event.date.split('-')[2])
      const current = map.get(day) ?? []
      current.push(event)
      map.set(day, current)
    })
    return map
  }, [events])

  const stats = {
    total: events.length,
    classes: events.filter((event) => event.type === 'Class').length,
    consultation: events.filter((event) => event.type === 'Consultation').length,
    department: events.filter((event) => event.type === 'Department').length,
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
              <Link key={item.label} to={item.to} className={item.label === 'Calendar' ? 'is-active' : undefined}>
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
            <h1>Calendar</h1>
          </div>

          <div className="faculty-dashboard__topbar-strip" aria-label="Calendar context">
            <strong>Faculty schedule</strong>
            <span>Class meetings, consultations, and department coordination</span>
          </div>

          <div className="faculty-dashboard__topbar-actions">
            <button type="button" className="faculty-dashboard__date-chip">
              <FaCalendarAlt />
              June 2026
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
          <section className="users-reference">
            <section className="users-reference__stats" aria-label="Calendar summary">
              <article className="users-reference__stat"><FaCalendarAlt /><div><strong>{stats.total}</strong><span>Total events</span></div></article>
              <article className="users-reference__stat"><FaGraduationCap /><div><strong>{stats.classes}</strong><span>Class events</span></div></article>
              <article className="users-reference__stat"><FaComments /><div><strong>{stats.consultation}</strong><span>Consultations</span></div></article>
              <article className="users-reference__stat"><FaBookOpen /><div><strong>{stats.department}</strong><span>Department items</span></div></article>
            </section>

            <section className="dashboard-reference__panel users-reference__panel">
              <div className="dashboard-reference__panel-header">
                <div>
                  <h2>Faculty Schedule Board</h2>
                  <p className="users-reference__subcopy">View class meetings, consultations, and department events. Editing and dragging are disabled on the faculty calendar.</p>
                </div>
              </div>

              <div className="users-reference__toolbar">
                <label className="users-reference__search"><FaSearch /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by event, date, or venue" /></label>
                <button type="button" className="users-reference__filter"><FaFilter />June 2026</button>
              </div>

              <div className="calendar-reference__layout">
                <section className="calendar-reference__grid">
                  <div className="calendar-reference__weekdays">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label) => <span key={label}>{label}</span>)}
                  </div>
                  <div className="calendar-reference__days">
                    {calendarDays.map((day) => {
                      const dayEvents = eventMap.get(day) ?? []
                      return (
                        <article key={day} className="calendar-reference__day">
                          <strong>{day}</strong>
                          <div>
                            {dayEvents.slice(0, 2).map((eventRecord) => (
                              <div
                                key={eventRecord.id}
                                className={`calendar-reference__badge calendar-reference__badge--${eventRecord.type.toLowerCase()}`}
                              >
                                {eventRecord.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 ? <span className="calendar-reference__more">+{dayEvents.length - 2} more</span> : null}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </section>

                <section className="calendar-reference__agenda">
                  <div className="calendar-reference__agenda-header">
                    <div>
                      <h3>Upcoming Events</h3>
                      <p>Reference the upcoming schedule from one read-only faculty calendar.</p>
                    </div>
                  </div>
                  <div className="calendar-reference__agenda-list">
                    {filteredEvents.map((eventRecord) => (
                      <article key={eventRecord.id} className="calendar-reference__agenda-item">
                        <div>
                          <strong>{eventRecord.title}</strong>
                          <p>{eventRecord.venue}</p>
                        </div>
                        <div>
                          <span>{formatDisplayDate(eventRecord.date)}</span>
                          <em>{formatDisplayTime(eventRecord.time)}</em>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </section>
          </section>
        </div>
      </section>

    </main>
  )
}
