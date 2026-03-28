import { useMemo, useState, type DragEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FaBookOpen, FaCalendarAlt, FaChartLine, FaCog, FaEdit, FaFileAlt, FaFilter, FaGraduationCap, FaHome, FaPlus, FaSearch, FaSignOutAlt, FaUserCheck, FaUserClock, FaUserGraduate, FaUsers } from 'react-icons/fa'
import { AdminTopbar } from '../components/AdminTopbar'

type EventType = 'Academic' | 'HR' | 'Registrar' | 'Campus'
type EventRecord = {
  id: string
  title: string
  date: string
  time: string
  venue: string
  type: EventType
}

type EventFormState = {
  title: string
  date: string
  time: string
  venue: string
  type: EventType
}

const defaultFormState: EventFormState = {
  title: '',
  date: '2026-06-01',
  time: '09:00',
  venue: '',
  type: 'Academic',
}

const initialEvents: EventRecord[] = [
  { id: '1', title: 'Freshmen Orientation', date: '2026-06-03', time: '08:00', venue: 'Main Auditorium', type: 'Academic' },
  { id: '2', title: 'Enrollment Clearance Review', date: '2026-06-08', time: '10:00', venue: 'Registrar Office', type: 'Registrar' },
  { id: '3', title: 'Employee Benefits Briefing', date: '2026-06-12', time: '14:00', venue: 'HR Conference Room', type: 'HR' },
  { id: '4', title: 'Faculty Onboarding', date: '2026-06-17', time: '09:00', venue: 'Innovation Hall', type: 'Campus' },
  { id: '5', title: 'Term 1 Class Opening', date: '2026-06-23', time: '07:30', venue: 'Campus Grounds', type: 'Academic' },
]

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
  { icon: FaCalendarAlt, label: 'Calendar', to: '/admin/calendar', active: true },
  { icon: FaCog, label: 'Settings', to: '/admin/settings' },
]

const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1)
const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const eventTypes: EventType[] = ['Academic', 'HR', 'Registrar', 'Campus']

const formatDisplayDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })

const formatDisplayTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  const normalizedHours = Number.isFinite(hours) ? hours : 0
  const normalizedMinutes = Number.isFinite(minutes) ? minutes : 0
  return new Date(2026, 5, 1, normalizedHours, normalizedMinutes).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

const compareEvents = (left: EventRecord, right: EventRecord) =>
  `${left.date}-${left.time}`.localeCompare(`${right.date}-${right.time}`)

export default function Calendar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [events, setEvents] = useState<EventRecord[]>(initialEvents)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEventId, setEditingEventId] = useState<string | null>(null)
  const [draggedEventId, setDraggedEventId] = useState<string | null>(null)
  const [dropDay, setDropDay] = useState<number | null>(null)
  const [formData, setFormData] = useState(defaultFormState)
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

  const openCreateModal = () => {
    setEditingEventId(null)
    setFormData(defaultFormState)
    setIsModalOpen(true)
  }

  const openEditModal = (eventRecord: EventRecord) => {
    setEditingEventId(eventRecord.id)
    setFormData({
      title: eventRecord.title,
      date: eventRecord.date,
      time: eventRecord.time,
      venue: eventRecord.venue,
      type: eventRecord.type,
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingEventId(null)
    setFormData(defaultFormState)
  }

  const updateEventDate = (eventId: string, date: string) => {
    setEvents((current) =>
      current.map((event) => (event.id === eventId ? { ...event, date } : event)),
    )
  }

  const handleSubmitEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = formData.title.trim()
    const venue = formData.venue.trim()
    if (!title || !venue) return

    if (editingEventId !== null) {
      setEvents((current) =>
        current.map((record) =>
          record.id === editingEventId
            ? { ...record, title, date: formData.date, time: formData.time, venue, type: formData.type }
            : record,
        ),
      )
    } else {
      const nextEvent: EventRecord = {
        id: String(events.length + 1),
        title,
        date: formData.date,
        time: formData.time,
        venue,
        type: formData.type,
      }
      setEvents((current) => [...current, nextEvent])
    }

    closeModal()
  }

  const handleDragStart = (eventId: string) => (dragEvent: DragEvent<HTMLElement>) => {
    dragEvent.dataTransfer.effectAllowed = 'move'
    dragEvent.dataTransfer.setData('text/plain', eventId)
    setDraggedEventId(eventId)
  }

  const handleDragEnd = () => {
    setDraggedEventId(null)
    setDropDay(null)
  }

  const handleDayDragOver = (day: number) => (dragEvent: DragEvent<HTMLElement>) => {
    dragEvent.preventDefault()
    dragEvent.dataTransfer.dropEffect = 'move'
    setDropDay(day)
  }

  const handleDayDrop = (day: number) => (dragEvent: DragEvent<HTMLElement>) => {
    dragEvent.preventDefault()
    const draggedId = dragEvent.dataTransfer.getData('text/plain') || dragEvent.dataTransfer.getData('eventId')
    if (!draggedId) return

    updateEventDate(draggedId, `2026-06-${String(day).padStart(2, '0')}`)
    setDraggedEventId(null)
    setDropDay(null)
  }

  const stats = {
    total: events.length,
    academic: events.filter((event) => event.type === 'Academic').length,
    hr: events.filter((event) => event.type === 'HR').length,
    registrar: events.filter((event) => event.type === 'Registrar').length,
  }

  return (
    <main className={`dashboard-page dashboard-reference users-reference-page${isSidebarOpen ? ' is-sidebar-open' : ''}`}>
      <aside className="dashboard-reference__sidebar">
        <div className="dashboard-reference__brand"><span className="dashboard-reference__brand-icon"><FaGraduationCap /></span><div><strong>NALAKA LMS</strong><span>Registrar & HR</span></div></div>
        <div className="dashboard-reference__profile"><div className="dashboard-reference__avatar">JD</div><div className="dashboard-reference__profile-copy"><strong>John Doe</strong><span>Operations</span></div><em>3</em></div>
        <nav className="dashboard-reference__nav" aria-label="Portal navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return <Link key={item.label} to={item.to} className={item.active ? 'is-active' : undefined}><Icon /><span>{item.label}</span></Link>
          })}
        </nav>
        <button type="button" className="dashboard-reference__logout"><span><FaSignOutAlt />Logout</span><span aria-hidden="true">{'>'}</span></button>
      </aside>

      <button type="button" className="dashboard-reference__sidebar-backdrop" aria-label="Close admin menu" onClick={() => setIsSidebarOpen(false)} />
      <section className="dashboard-reference__main">
        <AdminTopbar onMenuToggle={() => setIsSidebarOpen((current) => !current)} />

        <section className="dashboard-reference__content users-reference">
          <h1>Calendar</h1>

          <section className="users-reference__stats" aria-label="Calendar summary">
            <article className="users-reference__stat"><FaCalendarAlt /><div><strong>{stats.total}</strong><span>Total events</span></div></article>
            <article className="users-reference__stat"><FaGraduationCap /><div><strong>{stats.academic}</strong><span>Academic events</span></div></article>
            <article className="users-reference__stat"><FaUserCheck /><div><strong>{stats.hr}</strong><span>HR events</span></div></article>
            <article className="users-reference__stat"><FaBookOpen /><div><strong>{stats.registrar}</strong><span>Registrar events</span></div></article>
          </section>

          <section className="dashboard-reference__panel users-reference__panel">
            <div className="dashboard-reference__panel-header">
              <div>
                <h2>School Events Schedule</h2>
                <p className="users-reference__subcopy">Edit schedules in place or drag events to another date on the month view.</p>
              </div>
              <button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={openCreateModal}>
                <FaPlus /> Add Event
              </button>
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
                    const isDropTarget = dropDay === day
                    const weekdayLabel = weekdayLabels[(day - 1) % weekdayLabels.length]
                    return (
                      <article
                        key={day}
                        className={`calendar-reference__day${isDropTarget ? ' is-drop-target' : ''}`}
                        onDragOver={handleDayDragOver(day)}
                        onDragLeave={() => setDropDay((current) => (current === day ? null : current))}
                        onDrop={handleDayDrop(day)}
                      >
                        <strong>{day}</strong>
                        <span className="calendar-reference__day-label">{weekdayLabel}</span>
                        <div>
                          {dayEvents.slice(0, 2).map((eventRecord) => (
                            <button
                              key={eventRecord.id}
                              type="button"
                              draggable
                              className={`calendar-reference__badge calendar-reference__badge--${eventRecord.type.toLowerCase()}${draggedEventId === eventRecord.id ? ' is-dragging' : ''}`}
                              onClick={() => openEditModal(eventRecord)}
                              onDragStart={handleDragStart(eventRecord.id)}
                              onDragEnd={handleDragEnd}
                              title="Click to edit or drag to move"
                            >
                              {eventRecord.title}
                            </button>
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
                    <p>Open any item to revise details, or drag it into the calendar to reschedule.</p>
                  </div>
                </div>
                <div className="calendar-reference__agenda-list">
                  {filteredEvents.map((eventRecord) => (
                    <article
                      key={eventRecord.id}
                      className={`calendar-reference__agenda-item${draggedEventId === eventRecord.id ? ' is-dragging' : ''}`}
                      draggable
                      onDragStart={handleDragStart(eventRecord.id)}
                      onDragEnd={handleDragEnd}
                    >
                      <div>
                        <strong>{eventRecord.title}</strong>
                        <p>{eventRecord.venue}</p>
                      </div>
                      <div>
                        <span>{formatDisplayDate(eventRecord.date)}</span>
                        <em>{formatDisplayTime(eventRecord.time)}</em>
                        <button type="button" className="calendar-reference__edit" onClick={() => openEditModal(eventRecord)}>
                          <FaEdit /> Edit
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </section>
      </section>

      {isModalOpen ? (
        <div className="users-reference__modal-backdrop" role="presentation" onClick={closeModal}>
          <div className="users-reference__modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title" onClick={(event) => event.stopPropagation()}>
            <div className="dashboard-reference__panel-header">
              <div>
                <h2 id="event-modal-title">{editingEventId !== null ? 'Update School Event' : 'Add School Event'}</h2>
                <p className="users-reference__subcopy">Maintain academic, HR, and registrar schedules from one calendar.</p>
              </div>
              <button type="button" className="users-reference__modal-close" onClick={closeModal}>Close</button>
            </div>
            <form className="users-reference__form" onSubmit={handleSubmitEvent}>
              <label>Event title<input value={formData.title} onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))} placeholder="Faculty Orientation" /></label>
              <label>Date<input type="date" value={formData.date} onChange={(event) => setFormData((current) => ({ ...current, date: event.target.value }))} /></label>
              <label>Time<input type="time" value={formData.time} onChange={(event) => setFormData((current) => ({ ...current, time: event.target.value }))} /></label>
              <label>Venue<input value={formData.venue} onChange={(event) => setFormData((current) => ({ ...current, venue: event.target.value }))} placeholder="Main Hall" /></label>
              <label>Type<select value={formData.type} onChange={(event) => setFormData((current) => ({ ...current, type: event.target.value as EventType }))}>{eventTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
              <div className="users-reference__modal-actions">
                <button type="button" className="users-reference__filter" onClick={closeModal}>Cancel</button>
                <button type="submit" className="dashboard-reference__soft-button users-reference__add">
                  <FaPlus />{editingEventId !== null ? 'Save Changes' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  )
}

