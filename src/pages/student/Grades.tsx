import StudentShell from './StudentShell'
import { studentGrades } from './studentData'

export default function StudentGrades() {
  return (
    <StudentShell activePath="/student/grades" title="My Grades" subtitle="Review your quarter breakdown by subject without entering the faculty grading workspace.">
      <section className="student-portal__panel">
        <div className="student-portal__panel-head">
          <h3>Quarter Standing</h3>
          <span className="student-portal__muted">2nd Quarter</span>
        </div>
        <div className="student-grades__table">
          <div className="student-grades__head">
            <span>Subject</span>
            <span>Quizzes</span>
            <span>Performance Task</span>
            <span>Written Work</span>
            <span>Exam</span>
            <span>Final</span>
            <span>Remark</span>
          </div>
          {studentGrades.map((grade) => (
            <article key={grade.subjectId} className="student-grades__row">
              <span>{grade.subject}</span>
              <span>{grade.quizzes}</span>
              <span>{grade.performanceTask}</span>
              <span>{grade.writtenWork}</span>
              <span>{grade.exam}</span>
              <span>{grade.final}</span>
              <span className={`student-grades__remark student-grades__remark--${grade.remark.toLowerCase()}`}>{grade.remark}</span>
            </article>
          ))}
        </div>
      </section>
    </StudentShell>
  )
}
