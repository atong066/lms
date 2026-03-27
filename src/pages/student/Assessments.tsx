import { Link } from 'react-router-dom'
import StudentShell from './StudentShell'
import { getStudentAssessments } from './studentData'

export default function StudentAssessments() {
  const assessments = getStudentAssessments()

  return (
    <StudentShell activePath="/student/assessments" title="Assessments" subtitle="Review open, upcoming, and submitted assessments. You can only take or review your own assessment status here.">
      <section className="student-portal__panel">
        <div className="student-portal__panel-head">
          <h3>Assessment Queue</h3>
          <span className="student-portal__muted">{assessments.length} items</span>
        </div>
        <div className="student-assessments__list">
          {assessments.map((assessment) => (
            <article key={assessment.id} className="student-assessments__item">
              <div>
                <strong>{assessment.title}</strong>
                <span>{assessment.type} · {assessment.subject} · {assessment.quarter}</span>
                <small>{assessment.scheduleLabel}</small>
              </div>
              <div className="student-assessments__actions">
                <em className={`student-dashboard__status student-dashboard__status--${assessment.status.toLowerCase()}`}>{assessment.status}</em>
                <Link to={`/student/assessments/${assessment.id}`} className="student-assessments__link">
                  {assessment.status === 'Submitted' ? 'View submission' : 'Take assessment'}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </StudentShell>
  )
}
