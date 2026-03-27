import StudentShell from './StudentShell'
import { studentCalendarEvents } from './studentData'

export default function StudentCalendar() {
  return (
    <StudentShell activePath="/student/calendar" title="Calendar" subtitle="View upcoming classes, assessments, consultations, and school events from one read-only calendar lane.">
      <section className="student-portal__panel">
        <div className="student-portal__panel-head">
          <h3>Upcoming Events</h3>
          <span className="student-portal__muted">View only</span>
        </div>
        <div className="student-calendar__list">
          {studentCalendarEvents.map((event) => (
            <article key={event.id} className="student-calendar__item">
              <div>
                <strong>{event.title}</strong>
                <span>{event.type}</span>
              </div>
              <div>
                <strong>{event.date}</strong>
                <span>{event.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </StudentShell>
  )
}
