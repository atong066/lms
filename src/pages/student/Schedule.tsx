import StudentShell from './StudentShell'
import { studentSchedule } from './studentData'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export default function StudentSchedule() {
  return (
    <StudentShell activePath="/student/schedule" title="My Schedule" subtitle="Keep your weekly class blocks, rooms, and instructor assignments visible at a glance.">
      <section className="student-schedule__grid">
        {days.map((day) => (
          <article key={day} className="student-portal__panel student-schedule__column">
            <div className="student-portal__panel-head">
              <h3>{day}</h3>
            </div>
            <div className="student-schedule__list">
              {studentSchedule.filter((item) => item.day === day).map((item) => (
                <div key={item.id} className="student-schedule__item">
                  <strong>{item.subject}</strong>
                  <span>{item.start} - {item.end}</span>
                  <small>{item.room} · {item.instructor}</small>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </StudentShell>
  )
}
