import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  FaBars,
  FaBell,
  FaBookOpen,
  FaCalendarAlt,
  FaCheck,
  FaChevronLeft,
  FaChevronDown,
  FaChevronRight,
  FaCog,
  FaComments,
  FaEnvelope,
  FaFileAlt,
  FaGraduationCap,
  FaHome,
  FaPlus,
  FaRegCircle,
  FaSearch,
  FaSignOutAlt,
  FaTasks,
} from 'react-icons/fa'
import {
  facultyNavMain,
  facultyNavSupport,
  gradebookSections,
  gradebookStudents,
  type FacultyNavItem,
  type GradebookStudent,
} from './gradebookData'

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

type AssessmentEntry = {
  title: string
  score: string
}

type StudentScores = {
  quarter: '1st Quarter' | '2nd Quarter' | '3rd Quarter' | '4th Quarter'
  quizzes: AssessmentEntry[]
  performanceTasks: AssessmentEntry[]
  writtenWorks: AssessmentEntry[]
  quarterExams: Record<'1st Quarter' | '2nd Quarter' | '3rd Quarter' | '4th Quarter', string>
}

const defaultScores: StudentScores = {
  quarter: '2nd Quarter',
  quizzes: [{ title: '', score: '' }],
  performanceTasks: [{ title: '', score: '' }],
  writtenWorks: [{ title: '', score: '' }],
  quarterExams: {
    '1st Quarter': '',
    '2nd Quarter': '',
    '3rd Quarter': '',
    '4th Quarter': '',
  },
}

type ScoreTab = 'quizzes' | 'performance' | 'written' | 'exams'
const quarterOptions = [
  { value: '1st Quarter', note: 'Opening grading period' },
  { value: '2nd Quarter', note: 'Midyear assessment cycle' },
  { value: '3rd Quarter', note: 'Term progression review' },
  { value: '4th Quarter', note: 'Final grading period' },
] as const

export default function FacultyGradebookSection() {
  const studentsPerPage = 10
  const { sectionId } = useParams()
  const section = gradebookSections.find((item) => item.id === sectionId) ?? gradebookSections[0]
  const sectionStudents = useMemo(
    () => gradebookStudents.filter((item) => item.sectionId === section.id),
    [section.id],
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStudent, setSelectedStudent] = useState<GradebookStudent | null>(null)
  const [scores, setScores] = useState<StudentScores>(defaultScores)
  const [activeScoreTab, setActiveScoreTab] = useState<ScoreTab>('quizzes')
  const [isQuarterMenuOpen, setIsQuarterMenuOpen] = useState(false)
  const quarterMenuRef = useRef<HTMLDivElement | null>(null)
  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) {
      return sectionStudents
    }

    return sectionStudents.filter((student) =>
      `${student.name} ${student.section} ${student.average} ${student.status}`.toLowerCase().includes(query),
    )
  }, [searchTerm, sectionStudents])
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / studentsPerPage))
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * studentsPerPage
    return filteredStudents.slice(startIndex, startIndex + studentsPerPage)
  }, [currentPage, filteredStudents])
  const selectedStudentIndex = selectedStudent
    ? filteredStudents.findIndex((student) => student.id === selectedStudent.id)
    : -1
  const hasPreviousStudent = selectedStudentIndex > 0
  const hasNextStudent = selectedStudentIndex > -1 && selectedStudentIndex < filteredStudents.length - 1

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, section.id])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!quarterMenuRef.current?.contains(event.target as Node)) {
        setIsQuarterMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  useEffect(() => {
    if (!selectedStudent) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const tagName = target?.tagName
      const isTypingField =
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        tagName === 'SELECT' ||
        target?.isContentEditable

      if (isTypingField) {
        return
      }

      if (event.key === 'ArrowLeft' && hasPreviousStudent) {
        event.preventDefault()
        openPreviousStudent()
      }

      if (event.key === 'ArrowRight' && hasNextStudent) {
        event.preventDefault()
        openNextStudent()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedStudent, hasPreviousStudent, hasNextStudent, selectedStudentIndex, sectionStudents])

  const openStudentModal = (student: GradebookStudent) => {
    setSelectedStudent(student)
    setScores(defaultScores)
    setActiveScoreTab('quizzes')
    setIsQuarterMenuOpen(false)
  }

  const closeStudentModal = () => {
    setSelectedStudent(null)
    setScores(defaultScores)
    setActiveScoreTab('quizzes')
    setIsQuarterMenuOpen(false)
  }

  const openPreviousStudent = () => {
    if (!hasPreviousStudent) {
      return
    }

    const previousStudent = filteredStudents[selectedStudentIndex - 1]
    if (!previousStudent) {
      return
    }

    setSelectedStudent(previousStudent)
    setScores(defaultScores)
    setActiveScoreTab('quizzes')
    setIsQuarterMenuOpen(false)
  }

  const openNextStudent = () => {
    if (!hasNextStudent) {
      return
    }

    const nextStudent = filteredStudents[selectedStudentIndex + 1]
    if (!nextStudent) {
      return
    }

    setSelectedStudent(nextStudent)
    setScores(defaultScores)
    setActiveScoreTab('quizzes')
    setIsQuarterMenuOpen(false)
  }

  const handleSubmitScores = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    closeStudentModal()
  }

  const updateEntry = (
    category: 'quizzes' | 'performanceTasks' | 'writtenWorks',
    index: number,
    field: keyof AssessmentEntry,
    value: string,
  ) => {
    setScores((current) => ({
      ...current,
      [category]: current[category].map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [field]: value } : entry,
      ),
    }))
  }

  const addEntry = (category: 'quizzes' | 'performanceTasks' | 'writtenWorks') => {
    setScores((current) => ({
      ...current,
      [category]: [...current[category], { title: '', score: '' }],
    }))
  }

  return (
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
              <Link key={item.label} to={item.to} className={item.label === 'Gradebook' ? 'is-active' : undefined}>
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
            <h1>{section.code} Gradebook</h1>
          </div>

          <div className="faculty-dashboard__topbar-strip" aria-label="Current section context">
            <strong>{section.quarter}</strong>
            <span>{section.subject}</span>
          </div>

          <div className="faculty-dashboard__topbar-actions">
            <button type="button" className="faculty-dashboard__date-chip">
              <FaCalendarAlt />
              April 2026
            </button>
            <div className="faculty-dashboard__chrome-group">
              <button type="button" className="has-badge">
                <FaBell />
                <span>3</span>
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
          <section className="faculty-dashboard__hero faculty-gradebook__hero">
            <div className="faculty-dashboard__hero-copy">
              <span className="faculty-dashboard__eyebrow">Learner Records</span>
              <h2>Open a student record and encode quiz, performance task, and written work scores.</h2>
              <p>Select a learner below to open the grading modal, choose a quarter, and add assessment titles with scores for each category.</p>
            </div>

            <div className="faculty-dashboard__hero-callout">
              <div>
                <span>Section summary</span>
                <strong>{section.students} learners | {section.pending} pending scores</strong>
              </div>
              <p>{section.block}</p>
            </div>
          </section>

          <section className="faculty-dashboard__panel faculty-gradebook__sections-panel faculty-gradebook__students-panel">
            <div className="faculty-dashboard__panel-head">
              <h3>Students in {section.code}</h3>
              <Link to="/faculty/gradebook">Back to sections</Link>
            </div>

            <div className="faculty-gradebook__table-toolbar">
              <label className="faculty-gradebook__search">
                <FaSearch />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search learner, status, or average"
                />
              </label>
              <div className="faculty-gradebook__table-meta">
                <span>{filteredStudents.length} matched learners</span>
                <strong>
                  Page {currentPage} of {totalPages}
                </strong>
              </div>
            </div>

            <div className="faculty-gradebook__table">
              <div className="faculty-gradebook__head faculty-gradebook__head--students">
                <span>Learner</span>
                <span>Section</span>
                <span>Average</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              {paginatedStudents.map((student) => (
                <article key={student.id} className="faculty-gradebook__row faculty-gradebook__row--students">
                  <strong className="faculty-gradebook__student-name">{student.name}</strong>
                  <span>{student.section}</span>
                  <span>{student.average}</span>
                  <span className={`faculty-gradebook__status faculty-gradebook__status--${student.status.toLowerCase().replace(' ', '-')}`}>
                    {student.status}
                  </span>
                  <button type="button" className="faculty-gradebook__record-button" onClick={() => openStudentModal(student)}>
                    View record
                    <FaChevronRight />
                  </button>
                </article>
              ))}

              {paginatedStudents.length === 0 ? (
                <div className="faculty-gradebook__empty-state">
                  <strong>No learners found</strong>
                  <span>Try a different search term to find a student record.</span>
                </div>
              ) : null}
            </div>

            <div className="faculty-gradebook__pagination">
              <span>
                Showing {paginatedStudents.length === 0 ? 0 : (currentPage - 1) * studentsPerPage + 1}
                -
                {Math.min(currentPage * studentsPerPage, filteredStudents.length)} of {filteredStudents.length}
              </span>
              <div className="faculty-gradebook__pagination-actions">
                <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1}>
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .slice(Math.max(0, currentPage - 2), Math.max(0, currentPage - 2) + 3)
                  .map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={page === currentPage ? 'is-active' : undefined}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                <button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>

      {selectedStudent ? (
        <div className="users-reference__modal-backdrop users-reference__modal-backdrop--premium" role="presentation" onClick={closeStudentModal}>
          <div className="faculty-gradebook__modal-shell" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="faculty-gradebook__modal-arrow faculty-gradebook__modal-arrow--left"
              onClick={openPreviousStudent}
              disabled={!hasPreviousStudent}
              aria-label="Previous student"
            >
              <FaChevronLeft />
            </button>

            <div
              className="users-reference__modal faculty-gradebook__modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="gradebook-student-title"
            >
              <div className="faculty-gradebook__modal-head">
                <div className="faculty-gradebook__modal-title-block">
                  <span className="faculty-gradebook__modal-eyebrow">Student grading record</span>
                  <h2 id="gradebook-student-title">{selectedStudent.name}</h2>
                  <p className="users-reference__subcopy">Encode quiz, performance task, written work, and quarterly exam scores for the selected grading period.</p>
                  <div className="faculty-gradebook__modal-meta">
                    <span>{section.code}</span>
                    <span>{section.subject}</span>
                    <span>Current average {selectedStudent.average}</span>
                  </div>
                </div>
                <button type="button" className="users-reference__modal-close" onClick={closeStudentModal}>Close</button>
              </div>

              <form className="users-reference__form faculty-gradebook__form" onSubmit={handleSubmitScores}>
                <div className="faculty-gradebook__workspace">
                  <div className="faculty-gradebook__toolbar">
                    <div className="faculty-gradebook__form-span">
                      <span className="faculty-gradebook__field-label">Quarter</span>
                      <div className="faculty-gradebook__quarter-picker" ref={quarterMenuRef}>
                        <button
                          type="button"
                          className={`faculty-gradebook__quarter-trigger${isQuarterMenuOpen ? ' is-open' : ''}`}
                          onClick={() => setIsQuarterMenuOpen((current) => !current)}
                          aria-haspopup="listbox"
                          aria-expanded={isQuarterMenuOpen}
                        >
                          <span className="faculty-gradebook__quarter-copy">
                            <small>Selected quarter</small>
                            <strong>{scores.quarter}</strong>
                          </span>
                          <FaChevronDown />
                        </button>

                        {isQuarterMenuOpen ? (
                          <div className="faculty-gradebook__quarter-menu" role="listbox" aria-label="Quarter options">
                            <div className="faculty-gradebook__quarter-menu-head">
                              <span>Choose grading period</span>
                              <small>Scores in the exam tab follow this selection.</small>
                            </div>
                            {quarterOptions.map((quarterOption) => (
                              <button
                                key={quarterOption.value}
                                type="button"
                                className={scores.quarter === quarterOption.value ? 'is-active' : undefined}
                                onClick={() => {
                                  setScores((current) => ({ ...current, quarter: quarterOption.value }))
                                  setIsQuarterMenuOpen(false)
                                }}
                              >
                                <span className="faculty-gradebook__quarter-option-copy">
                                  <strong>{quarterOption.value}</strong>
                                  <small>{quarterOption.note}</small>
                                </span>
                                {scores.quarter === quarterOption.value ? (
                                  <span className="faculty-gradebook__quarter-check" aria-hidden="true">
                                    <FaCheck />
                                  </span>
                                ) : null}
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="faculty-gradebook__tabs" role="tablist" aria-label="Score categories">
                      <button type="button" className={activeScoreTab === 'quizzes' ? 'is-active' : undefined} onClick={() => setActiveScoreTab('quizzes')}>Quizzes</button>
                      <button type="button" className={activeScoreTab === 'performance' ? 'is-active' : undefined} onClick={() => setActiveScoreTab('performance')}>Performance Tasks</button>
                      <button type="button" className={activeScoreTab === 'written' ? 'is-active' : undefined} onClick={() => setActiveScoreTab('written')}>Written Works</button>
                      <button type="button" className={activeScoreTab === 'exams' ? 'is-active' : undefined} onClick={() => setActiveScoreTab('exams')}>Quarter Exams</button>
                    </div>
                  </div>

                  <div className="faculty-gradebook__canvas">
                    {activeScoreTab === 'quizzes' ? (
                      <div className="faculty-gradebook__score-group">
                        <div className="faculty-gradebook__score-head">
                          <div>
                            <h3>Quizzes</h3>
                            <p>Encode short formative checks and scored recitations for {scores.quarter.toLowerCase()}.</p>
                          </div>
                          <button type="button" className="faculty-gradebook__add-row" onClick={() => addEntry('quizzes')}>
                            <FaPlus />
                            Add quiz
                          </button>
                        </div>
                        {scores.quizzes.map((entry, index) => (
                          <div key={`quiz-${index}`} className="faculty-gradebook__entry-row">
                            <label>
                              Quiz title
                              <input
                                value={entry.title}
                                onChange={(event) => updateEntry('quizzes', index, 'title', event.target.value)}
                                placeholder="Quiz 2 - Systems Review"
                              />
                            </label>
                            <label>
                              Score
                              <input
                                value={entry.score}
                                onChange={(event) => updateEntry('quizzes', index, 'score', event.target.value)}
                                placeholder="18 / 20"
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {activeScoreTab === 'performance' ? (
                      <div className="faculty-gradebook__score-group">
                        <div className="faculty-gradebook__score-head">
                          <div>
                            <h3>Performance Tasks</h3>
                            <p>Record applied outputs, demonstrations, and project-based assessments.</p>
                          </div>
                          <button type="button" className="faculty-gradebook__add-row" onClick={() => addEntry('performanceTasks')}>
                            <FaPlus />
                            Add task
                          </button>
                        </div>
                        {scores.performanceTasks.map((entry, index) => (
                          <div key={`performance-${index}`} className="faculty-gradebook__entry-row">
                            <label>
                              Performance task title
                              <input
                                value={entry.title}
                                onChange={(event) => updateEntry('performanceTasks', index, 'title', event.target.value)}
                                placeholder="Case Study 02"
                              />
                            </label>
                            <label>
                              Score
                              <input
                                value={entry.score}
                                onChange={(event) => updateEntry('performanceTasks', index, 'score', event.target.value)}
                                placeholder="45 / 50"
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {activeScoreTab === 'written' ? (
                      <div className="faculty-gradebook__score-group">
                        <div className="faculty-gradebook__score-head">
                          <div>
                            <h3>Written Works</h3>
                            <p>Track notebooks, reflections, seatwork, and written mastery checks.</p>
                          </div>
                          <button type="button" className="faculty-gradebook__add-row" onClick={() => addEntry('writtenWorks')}>
                            <FaPlus />
                            Add written work
                          </button>
                        </div>
                        {scores.writtenWorks.map((entry, index) => (
                          <div key={`written-${index}`} className="faculty-gradebook__entry-row">
                            <label>
                              Written work title
                              <input
                                value={entry.title}
                                onChange={(event) => updateEntry('writtenWorks', index, 'title', event.target.value)}
                                placeholder="Reflection Journal"
                              />
                            </label>
                            <label>
                              Score
                              <input
                                value={entry.score}
                                onChange={(event) => updateEntry('writtenWorks', index, 'score', event.target.value)}
                                placeholder="23 / 25"
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {activeScoreTab === 'exams' ? (
                      <div className="faculty-gradebook__score-group">
                        <div className="faculty-gradebook__score-head">
                          <div>
                            <h3>Quarter Exam</h3>
                            <p>Record the major exam score for the active grading period only.</p>
                          </div>
                        </div>
                        <div className="faculty-gradebook__exam-grid">
                          <label key={scores.quarter}>
                            {scores.quarter} exam
                            <input
                              value={scores.quarterExams[scores.quarter]}
                              onChange={(event) =>
                                setScores((current) => ({
                                  ...current,
                                  quarterExams: {
                                    ...current.quarterExams,
                                    [scores.quarter]: event.target.value,
                                  },
                                }))
                              }
                              placeholder="50 / 60"
                            />
                          </label>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="users-reference__modal-actions faculty-gradebook__actions">
                    <button type="button" className="users-reference__filter" onClick={closeStudentModal}>Cancel</button>
                    <button type="submit" className="dashboard-reference__soft-button users-reference__add">Save Scores</button>
                  </div>
                </div>
              </form>
            </div>

            <button
              type="button"
              className="faculty-gradebook__modal-arrow faculty-gradebook__modal-arrow--right"
              onClick={openNextStudent}
              disabled={!hasNextStudent}
              aria-label="Next student"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      ) : null}
    </main>
  )
}
