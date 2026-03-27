import StudentShell from './StudentShell'
import { studentSubjects } from './studentData'

export default function StudentSubjects() {
  return (
    <StudentShell activePath="/student/subjects" title="My Subjects" subtitle="View your enrolled classes, instructors, schedule blocks, and current standing.">
      <section className="student-subjects__grid">
        {studentSubjects.map((subject) => (
          <article key={subject.id} className="student-subjects__card">
            <div className="student-subjects__head">
              <div>
                <span>{subject.code}</span>
                <h3>{subject.title}</h3>
              </div>
              <em className={`student-subjects__status student-subjects__status--${subject.status.toLowerCase().replace(/\s+/g, '-')}`}>{subject.status}</em>
            </div>
            <dl className="student-subjects__meta">
              <div><dt>Instructor</dt><dd>{subject.instructor}</dd></div>
              <div><dt>Schedule</dt><dd>{subject.schedule}</dd></div>
              <div><dt>Room</dt><dd>{subject.room}</dd></div>
              <div><dt>Units</dt><dd>{subject.units}</dd></div>
            </dl>
          </article>
        ))}
      </section>
    </StudentShell>
  )
}
