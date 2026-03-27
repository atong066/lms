import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import {
  FaBars,
  FaBell,
  FaBookOpen,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaComments,
  FaEnvelope,
  FaEye,
  FaFileAlt,
  FaGraduationCap,
  FaHome,
  FaPlus,
  FaRegCircle,
  FaSignOutAlt,
  FaTasks,
} from 'react-icons/fa'
import { facultyNavMain, facultyNavSupport, gradebookSections, type FacultyNavItem } from './gradebookData'
import { loadAssessmentRecords, type AssessmentQuestion } from './assessmentsData'

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

type QuestionDraft = {
  prompt: string
  choiceA: string
  choiceB: string
  choiceC: string
  choiceD: string
  answerKey: string
}

const emptyDraft: QuestionDraft = {
  prompt: '',
  choiceA: '',
  choiceB: '',
  choiceC: '',
  choiceD: '',
  answerKey: '',
}

const mathJaxConfig = {
  loader: { load: ['input/tex', 'output/chtml'] },
  tex: {
    inlineMath: [
      ['\\(', '\\)'],
      ['$', '$'],
    ],
    displayMath: [
      ['\\[', '\\]'],
      ['$$', '$$'],
    ],
  },
  chtml: {
    scale: 1,
  },
}

function MathText({ value, inline = false }: { value: string; inline?: boolean }) {
  return (
    <MathJax dynamic inline={inline} className={inline ? 'faculty-assessment-detail__math-inline' : 'faculty-assessment-detail__math-block'}>
      {value}
    </MathJax>
  )
}

export default function FacultyAssessmentDetail() {
  const navigate = useNavigate()
  const { assessmentId } = useParams()

  const seededAssessment = useMemo(
    () => loadAssessmentRecords().find((item) => item.id === assessmentId) ?? null,
    [assessmentId],
  )

  const [questions, setQuestions] = useState<AssessmentQuestion[]>(seededAssessment?.questions ?? [])
  const [draft, setDraft] = useState<QuestionDraft>(emptyDraft)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(0)

  const section = gradebookSections.find((item) => item.id === seededAssessment?.sectionId)
  const selectedSectionIds = seededAssessment?.sectionIds ?? (seededAssessment ? [seededAssessment.sectionId] : [])
  const sectionCodes = selectedSectionIds
    .map((sectionId) => gradebookSections.find((item) => item.id === sectionId)?.code)
    .filter(Boolean) as string[]
  const sectionLabel = selectedSectionIds.includes('all-sections')
    ? 'All Sections'
    : sectionCodes.length > 2
      ? `${sectionCodes.slice(0, 2).join(', ')} +${sectionCodes.length - 2}`
      : sectionCodes.join(', ') || section?.code || 'Section'
  const sectionDescription =
    selectedSectionIds.includes('all-sections')
      ? 'Shared across all faculty sections'
      : selectedSectionIds.length > 1
        ? `${selectedSectionIds.length} sections selected for this assessment`
        : section?.title ?? 'Assessment item'
  const primarySchedule = seededAssessment?.sectionSchedules?.[0]

  if (!seededAssessment) {
    return (
      <main className="faculty-dashboard">
        <section className="faculty-dashboard__main faculty-assessment-detail__missing">
          <div className="faculty-dashboard__scroll">
            <section className="faculty-dashboard__panel faculty-assessment-detail__empty-state">
              <span className="faculty-dashboard__eyebrow">Assessment editor</span>
              <h2>That assessment record is not available.</h2>
              <p>Return to the library and open another item to continue building questions.</p>
              <Link to="/faculty/assessments" className="faculty-assessment-detail__back-link">
                <FaChevronLeft />
                Back to assessment library
              </Link>
            </section>
          </div>
        </section>
      </main>
    )
  }

  const handleDraftChange = (field: keyof QuestionDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  const handleAddQuestion = () => {
    const choices = [draft.choiceA, draft.choiceB, draft.choiceC, draft.choiceD].map((item) => item.trim())
    if (!draft.prompt.trim() || choices.some((item) => !item) || !draft.answerKey.trim()) {
      return
    }

    setQuestions((current) => [
      ...current,
      {
        id: `${seededAssessment.id}-q${current.length + 1}`,
        prompt: draft.prompt.trim(),
        choices,
        answerKey: draft.answerKey.trim(),
      },
    ])
    setDraft(emptyDraft)
  }

  const openPreview = () => {
    setPreviewIndex(0)
    setIsPreviewOpen(true)
  }

  const activePreviewQuestion = questions[previewIndex] ?? null

  return (
    <MathJaxContext version={3} config={mathJaxConfig}>
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
              <Link key={item.label} to={item.to} className={item.label === 'Assessments' ? 'is-active' : undefined}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="faculty-dashboard__nav-label faculty-dashboard__nav-label--secondary">Tools</div>
          {facultyNavSupport.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <Link key={item.label} to={item.to}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="faculty-dashboard__sidebar-note">
          <span>Question authoring</span>
          <strong>Refine prompts before publishing scores</strong>
          <p>Open each assessment item here to build the actual question set and verify the student-facing preview.</p>
        </div>

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
            <h1>Assessment Editor</h1>
          </div>

          <div className="faculty-dashboard__topbar-strip" aria-label="Assessment editor context">
            <strong>{seededAssessment.type}</strong>
            <span>{sectionLabel} · {seededAssessment.quarter}</span>
          </div>

          <div className="faculty-dashboard__topbar-actions">
            <button type="button" className="faculty-dashboard__date-chip">
              <FaCalendarAlt />
              April 2026
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
          <section className="faculty-dashboard__hero faculty-assessment-detail__hero">
            <div className="faculty-dashboard__hero-copy">
              <div className="faculty-assessment-detail__eyebrow-row">
                <button type="button" className="faculty-assessment-detail__crumb" onClick={() => navigate('/faculty/assessments')}>
                  <FaChevronLeft />
                  Back to library
                </button>
                <span className="faculty-dashboard__eyebrow">Question Workspace</span>
              </div>
              <h2>{seededAssessment.title}</h2>
              <p>Build the question set here, keep the answer key accurate, and use preview to check the learner-facing flow before class.</p>
            </div>

            <div className="faculty-assessment-detail__hero-actions">
              <button type="button" className="faculty-assessment-detail__preview-button" onClick={openPreview}>
                <FaEye />
                Actual preview
              </button>
            </div>
          </section>

          <section className="faculty-assessment-detail__meta-grid">
            <article className="faculty-dashboard__panel faculty-assessment-detail__meta-card">
              <span>Section</span>
              <strong>{sectionLabel}</strong>
              <p>{sectionDescription}</p>
            </article>
            <article className="faculty-dashboard__panel faculty-assessment-detail__meta-card">
              <span>Quarter</span>
              <strong>{seededAssessment.quarter}</strong>
              <p>{seededAssessment.type}</p>
            </article>
            <article className="faculty-dashboard__panel faculty-assessment-detail__meta-card">
              <span>Points</span>
              <strong>{seededAssessment.points} pts</strong>
              <p>{primarySchedule ? `${primarySchedule.date} · ${primarySchedule.time}` : `Due ${seededAssessment.dueDate}`}</p>
            </article>
            <article className="faculty-dashboard__panel faculty-assessment-detail__meta-card">
              <span>Questions</span>
              <strong>{questions.length}</strong>
              <p>Ready for preview</p>
            </article>
          </section>

          <section className="faculty-assessment-detail__workspace">
            <div className="faculty-dashboard__panel faculty-assessment-detail__composer">
              <div className="faculty-dashboard__panel-head">
                <h3>Add Question</h3>
                <span>{seededAssessment.type} builder</span>
              </div>

              <div className="faculty-assessment-detail__form">
                <label className="faculty-assessment-detail__span">
                  Question prompt
                  <textarea
                    value={draft.prompt}
                    onChange={(event) => handleDraftChange('prompt', event.target.value)}
                    placeholder="Enter the question prompt students will answer."
                  />
                  <span className="faculty-assessment-detail__math-note">
                    Use `\\( ... \\)` for inline math or `$$ ... $$` for display math.
                  </span>
                </label>

                <label>
                  Choice A
                  <input value={draft.choiceA} onChange={(event) => handleDraftChange('choiceA', event.target.value)} placeholder="First option" />
                </label>
                <label>
                  Choice B
                  <input value={draft.choiceB} onChange={(event) => handleDraftChange('choiceB', event.target.value)} placeholder="Second option" />
                </label>
                <label>
                  Choice C
                  <input value={draft.choiceC} onChange={(event) => handleDraftChange('choiceC', event.target.value)} placeholder="Third option" />
                </label>
                <label>
                  Choice D
                  <input value={draft.choiceD} onChange={(event) => handleDraftChange('choiceD', event.target.value)} placeholder="Fourth option" />
                </label>
                <label className="faculty-assessment-detail__span">
                  Answer key
                  <input
                    value={draft.answerKey}
                    onChange={(event) => handleDraftChange('answerKey', event.target.value)}
                    placeholder="Enter the exact correct answer"
                  />
                </label>
              </div>

              <div className="faculty-assessment-detail__composer-actions">
                <button type="button" className="faculty-assessment-detail__ghost-button" onClick={() => setDraft(emptyDraft)}>
                  Clear
                </button>
                <button type="button" className="faculty-assessment-detail__primary-button" onClick={handleAddQuestion}>
                  <FaPlus />
                  Add question
                </button>
              </div>
            </div>

            <div className="faculty-dashboard__panel faculty-assessment-detail__questions">
              <div className="faculty-dashboard__panel-head">
                <h3>Question List</h3>
                <button type="button" className="faculty-assessment-detail__preview-text" onClick={openPreview}>
                  Preview assessment
                </button>
              </div>

              <div className="faculty-assessment-detail__question-list">
                {questions.map((question, index) => (
                  <article key={question.id} className="faculty-assessment-detail__question-card">
                    <div className="faculty-assessment-detail__question-head">
                      <strong>Question {index + 1}</strong>
                      <span>
                        Answer key: <MathText value={question.answerKey} inline />
                      </span>
                    </div>
                    <div className="faculty-assessment-detail__question-copy">
                      <MathText value={question.prompt} />
                    </div>
                    <ul>
                      {question.choices.map((choice) => (
                        <li key={choice} className={choice === question.answerKey ? 'is-correct' : undefined}>
                          <MathText value={choice} />
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}

                {questions.length === 0 ? (
                  <div className="faculty-assessment-detail__empty">
                    <strong>No questions yet</strong>
                    <span>Start by adding the first question for this assessment record.</span>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </section>

      {isPreviewOpen ? (
        <div className="users-reference__modal-backdrop users-reference__modal-backdrop--premium" role="presentation" onClick={() => setIsPreviewOpen(false)}>
          <div
            className="users-reference__modal faculty-assessment-detail__preview-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="dashboard-reference__panel-header">
              <div>
                <h2>{seededAssessment.title}</h2>
                <p className="users-reference__subcopy">{seededAssessment.instructions ?? 'Student-facing quiz preview'}</p>
              </div>
              <button type="button" className="users-reference__modal-close" onClick={() => setIsPreviewOpen(false)}>
                Close
              </button>
            </div>

            <div className="faculty-assessment-detail__preview-sheet">
              <div className="faculty-assessment-detail__preview-meta">
                <span>{sectionLabel}</span>
                <span>{seededAssessment.quarter}</span>
              </div>

              {activePreviewQuestion ? (
                <div className="faculty-assessment-detail__preview-stepper">
                  <div className="faculty-assessment-detail__preview-progress">
                    <div>
                      <strong>Question {previewIndex + 1}</strong>
                      <span>of {questions.length}</span>
                    </div>
                    <div className="faculty-assessment-detail__preview-progress-bar" aria-hidden="true">
                      <span style={{ width: `${((previewIndex + 1) / questions.length) * 100}%` }} />
                    </div>
                  </div>

                  <article className="faculty-assessment-detail__preview-card">
                    <strong>Question {previewIndex + 1}</strong>
                    <div className="faculty-assessment-detail__question-copy">
                      <MathText value={activePreviewQuestion.prompt} />
                    </div>
                    <div className="faculty-assessment-detail__preview-choices">
                      {activePreviewQuestion.choices.map((choice) => (
                        <label key={choice}>
                          <input type="radio" name={activePreviewQuestion.id} disabled />
                          <span>
                            <MathText value={choice} inline />
                          </span>
                        </label>
                      ))}
                    </div>
                  </article>

                  <div className="faculty-assessment-detail__preview-footer">
                    <button
                      type="button"
                      className="faculty-assessment-detail__ghost-button"
                      onClick={() => setPreviewIndex((current) => Math.max(0, current - 1))}
                      disabled={previewIndex === 0}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="faculty-assessment-detail__primary-button"
                      onClick={() =>
                        setPreviewIndex((current) => Math.min(questions.length - 1, current + 1))
                      }
                      disabled={previewIndex === questions.length - 1}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <div className="faculty-assessment-detail__empty faculty-assessment-detail__empty--preview">
                  <strong>No preview available yet</strong>
                  <span>Add at least one question to see the student-facing preview.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </main>
    </MathJaxContext>
  )
}
