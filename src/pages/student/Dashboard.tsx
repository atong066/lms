import { Link } from 'react-router-dom'
import StudentShell from './StudentShell'
import { getStudentAssessments, studentGrades, studentSubjects, studentSchedule } from './studentData'

export default function StudentDashboard() {
  const assessments = getStudentAssessments()
  const nextAssessment = assessments.find((item) => item.status !== 'Submitted') ?? assessments[0]
  const average =
    Math.round(studentGrades.reduce((sum, item) => sum + item.final, 0) / Math.max(studentGrades.length, 1) * 10) / 10

  return (
    <StudentShell activePath="/student/dashboard" title="Student Dashboard" subtitle="Check what needs attention, what is due next, and how your term is moving.">
      <section className="student-dashboard__hero">
        <div>
          <span className="student-portal__eyebrow">Today</span>
          <h2>Keep your subjects, assessments, and schedule aligned from one student view.</h2>
          <p>Your portal is read-focused by default, with direct paths into grades, upcoming work, and schedule checks.</p>
        </div>
        <div className="student-dashboard__hero-callout">
          <span>Next assessment</span>
          <strong>{nextAssessment.title}</strong>
          <p>{nextAssessment.scheduleLabel}</p>
        </div>
      </section>

      <section className="student-dashboard__stats">
        <article className="student-dashboard__stat"><strong>{studentSubjects.length}</strong><span>Active subjects</span></article>
        <article className="student-dashboard__stat"><strong>{average}</strong><span>General average</span></article>
        <article className="student-dashboard__stat"><strong>{assessments.filter((item) => item.status === 'Open').length}</strong><span>Open assessments</span></article>
        <article className="student-dashboard__stat"><strong>{studentSchedule.filter((item) => item.day === 'Friday').length}</strong><span>Friday blocks</span></article>
      </section>

      <section className="student-dashboard__grid">
        <section className="student-portal__panel">
          <div className="student-portal__panel-head">
            <h3>My Subjects</h3>
            <Link to="/student/subjects">View all</Link>
          </div>
          <div className="student-dashboard__subject-list">
            {studentSubjects.slice(0, 4).map((subject) => (
              <article key={subject.id} className="student-dashboard__subject-item">
                <div>
                  <strong>{subject.title}</strong>
                  <span>{subject.code} · {subject.instructor}</span>
                </div>
                <em>{subject.status}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="student-portal__panel">
          <div className="student-portal__panel-head">
            <h3>Assessment Queue</h3>
            <Link to="/student/assessments">Open assessments</Link>
          </div>
          <div className="student-dashboard__assessment-list">
            {assessments.map((assessment) => (
              <article key={assessment.id} className="student-dashboard__assessment-item">
                <div>
                  <strong>{assessment.title}</strong>
                  <span>{assessment.subject} · {assessment.quarter}</span>
                </div>
                <div>
                  <em className={`student-dashboard__status student-dashboard__status--${assessment.status.toLowerCase()}`}>{assessment.status}</em>
                  <span>{assessment.scheduleLabel}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="student-portal__panel">
          <div className="student-portal__panel-head">
            <h3>My Grades</h3>
            <Link to="/student/grades">Grade details</Link>
          </div>
          <div className="student-dashboard__grade-list">
            {studentGrades.map((grade) => (
              <article key={grade.subjectId} className="student-dashboard__grade-item">
                <div>
                  <strong>{grade.subject}</strong>
                  <span>{grade.quarter}</span>
                </div>
                <div>
                  <strong>{grade.final}</strong>
                  <span>{grade.remark}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="student-portal__panel">
          <div className="student-portal__panel-head">
            <h3>Today&apos;s Schedule</h3>
            <Link to="/student/schedule">Full schedule</Link>
          </div>
          <div className="student-dashboard__schedule-list">
            {studentSchedule.slice(0, 4).map((item) => (
              <article key={item.id} className="student-dashboard__schedule-item">
                <time>{item.day}</time>
                <div>
                  <strong>{item.subject}</strong>
                  <span>{item.start} - {item.end} · {item.room}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </StudentShell>
  )
}
