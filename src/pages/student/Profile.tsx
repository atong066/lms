import StudentShell from './StudentShell'
import { studentProfile } from './studentData'

export default function StudentProfile() {
  return (
    <StudentShell activePath="/student/profile" title="Profile" subtitle="Review your academic identity, contact details, and guardian information in one place.">
      <section className="student-profile__grid">
        <article className="student-profile__hero">
          <div className="student-profile__avatar">AR</div>
          <div>
            <h2>{studentProfile.name}</h2>
            <p>{studentProfile.program}</p>
            <div className="student-profile__chips">
              <span>{studentProfile.yearLevel}</span>
              <span>{studentProfile.section}</span>
              <span>ID {studentProfile.studentId}</span>
            </div>
          </div>
        </article>

        <section className="student-portal__panel">
          <div className="student-portal__panel-head">
            <h3>Student Information</h3>
          </div>
          <dl className="student-profile__details">
            <div><dt>Email</dt><dd>{studentProfile.email}</dd></div>
            <div><dt>Phone</dt><dd>{studentProfile.phone}</dd></div>
            <div><dt>Address</dt><dd>{studentProfile.address}</dd></div>
            <div><dt>Adviser</dt><dd>{studentProfile.adviser}</dd></div>
          </dl>
        </section>

        <section className="student-portal__panel">
          <div className="student-portal__panel-head">
            <h3>Guardian</h3>
          </div>
          <dl className="student-profile__details">
            <div><dt>Name</dt><dd>{studentProfile.guardian}</dd></div>
            <div><dt>Phone</dt><dd>{studentProfile.guardianPhone}</dd></div>
            <div><dt>Relationship</dt><dd>Mother</dd></div>
            <div><dt>Emergency contact</dt><dd>Active</dd></div>
          </dl>
        </section>
      </section>
    </StudentShell>
  )
}
