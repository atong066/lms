import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StudentShell from './StudentShell'
import { getStudentAssessments, loadStudentSubmissions, saveStudentSubmissions } from './studentData'

export default function StudentAssessmentTake() {
  const { assessmentId } = useParams()
  const navigate = useNavigate()
  const assessment = useMemo(() => getStudentAssessments().find((item) => item.id === assessmentId), [assessmentId])
  const existingSubmission = useMemo(
    () => loadStudentSubmissions().find((item) => item.assessmentId === assessmentId),
    [assessmentId],
  )
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>(
    () => existingSubmission?.answers ?? new Array(assessment?.questions?.length ?? 0).fill(''),
  )
  const [isSubmitted, setIsSubmitted] = useState(Boolean(existingSubmission))

  if (!assessment) {
    return (
      <StudentShell activePath="/student/assessments" title="Assessment" subtitle="Assessment not found.">
        <section className="student-portal__panel">
          <div className="student-portal__panel-head">
            <h3>Missing assessment</h3>
            <Link to="/student/assessments">Back to assessments</Link>
          </div>
        </section>
      </StudentShell>
    )
  }

  const questions = assessment.questions ?? []
  const currentQuestion = questions[step]

  const submitAssessment = () => {
    const score = questions.reduce((sum, question, index) => sum + (answers[index] === question.answerKey ? 1 : 0), 0)
    const submissions = loadStudentSubmissions().filter((item) => item.assessmentId !== assessment.id)
    submissions.push({
      assessmentId: assessment.id,
      answers,
      submittedAt: 'Mar 27, 2026 · 9:15 PM',
      score,
    })
    saveStudentSubmissions(submissions)
    setIsSubmitted(true)
  }

  return (
    <StudentShell activePath="/student/assessments" title={assessment.title} subtitle="Take the assessment in a focused student view. Editing, creation, and deletion are disabled here.">
      <section className="student-assessment-take__layout">
        <article className="student-assessment-take__hero">
          <span className="student-portal__eyebrow">{assessment.type}</span>
          <h2>{assessment.title}</h2>
          <p>{assessment.instructions ?? 'Answer each item carefully before submitting.'}</p>
          <div className="student-profile__chips">
            <span>{assessment.subject}</span>
            <span>{assessment.quarter}</span>
            <span>{assessment.points} points</span>
          </div>
        </article>

        {questions.length ? (
          <section className="student-portal__panel student-assessment-take__panel">
            <div className="student-portal__panel-head">
              <h3>Question {step + 1}</h3>
              <span className="student-portal__muted">{step + 1} of {questions.length}</span>
            </div>

            <div className="student-assessment-take__progress">
              <span style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
            </div>

            <article className="student-assessment-take__question">
              <strong>{currentQuestion.prompt}</strong>
              <div className="student-assessment-take__choices">
                {currentQuestion.choices.map((choice) => (
                  <button
                    type="button"
                    key={choice}
                    className={answers[step] === choice ? 'is-selected' : undefined}
                    disabled={isSubmitted}
                    onClick={() => {
                      setAnswers((current) => {
                        const next = [...current]
                        next[step] = choice
                        return next
                      })
                    }}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </article>

            <div className="student-assessment-take__footer">
              <button type="button" className="student-assessments__link is-secondary" disabled={step === 0} onClick={() => setStep((value) => value - 1)}>
                Previous
              </button>
              <div className="student-assessment-take__footer-actions">
                <button type="button" className="student-assessments__link is-secondary" onClick={() => navigate('/student/assessments')}>
                  Exit
                </button>
                {step === questions.length - 1 ? (
                  <button type="button" className="student-assessments__link" disabled={isSubmitted} onClick={submitAssessment}>
                    {isSubmitted ? 'Submitted' : 'Submit assessment'}
                  </button>
                ) : (
                  <button type="button" className="student-assessments__link" onClick={() => setStep((value) => value + 1)}>
                    Next
                  </button>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="student-portal__panel">
            <div className="student-portal__panel-head">
              <h3>Assessment details</h3>
              <Link to="/student/assessments">Back to list</Link>
            </div>
            <p className="student-portal__muted">This item does not have objective questions attached yet. Check the instructions and submission date only.</p>
          </section>
        )}
      </section>
    </StudentShell>
  )
}
