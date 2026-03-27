import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBars,
  FaBell,
  FaBookOpen,
  FaCalendarAlt,
  FaComments,
  FaChevronDown,
  FaChevronRight,
  FaCog,
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
import { facultyNavMain, facultyNavSupport, gradebookSections, type FacultyNavItem } from './gradebookData'
import {
  assessmentTypes,
  loadAssessmentRecords,
  quarterOptions,
  saveAssessmentRecords,
  type AssessmentRecord,
  type AssessmentSectionSchedule,
  type AssessmentType,
  type Quarter,
} from './assessmentsData'

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

const libraryPageSize = 4
const allSectionsValue = 'all-sections'
const defaultScheduleTime = '08:00'

function createSectionScheduleMap(sectionIds: string[]) {
  return Object.fromEntries(
    sectionIds.map((sectionId) => [sectionId, { date: '', time: defaultScheduleTime }]),
  )
}

export default function FacultyAssessments() {
  const [activeType, setActiveType] = useState<AssessmentType>('Quiz')
  const [assessments, setAssessments] = useState<AssessmentRecord[]>(() => loadAssessmentRecords())
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    sectionIds: [allSectionsValue],
    sectionSchedules: createSectionScheduleMap(gradebookSections.map((section) => section.id)),
    quarter: '2nd Quarter' as Quarter,
    points: '',
  })

  const effectiveSectionIds = formData.sectionIds.includes(allSectionsValue)
    ? gradebookSections.map((section) => section.id)
    : formData.sectionIds

  const filteredAssessments = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return assessments.filter((assessment) => {
      const matchesType = assessment.type === activeType
      const matchesSearch =
        !query ||
        `${assessment.title} ${assessment.quarter} ${assessment.points} ${assessment.dueDate}`
          .toLowerCase()
          .includes(query)
      const matchesDate = !dateFilter || assessment.dueDate === dateFilter
      return matchesType && matchesSearch && matchesDate
    })
  }, [activeType, assessments, dateFilter, searchTerm])

  const totalPages = Math.max(1, Math.ceil(filteredAssessments.length / libraryPageSize))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedAssessments = filteredAssessments.slice((safePage - 1) * libraryPageSize, safePage * libraryPageSize)

  useEffect(() => {
    setCurrentPage(1)
  }, [activeType, dateFilter, searchTerm])

  useEffect(() => {
    saveAssessmentRecords(assessments)
  }, [assessments])

  const resetModal = () => {
    setFormData({
      title: '',
      sectionIds: [allSectionsValue],
      sectionSchedules: createSectionScheduleMap(gradebookSections.map((section) => section.id)),
      quarter: '2nd Quarter',
      points: '',
    })
    setIsModalOpen(false)
    setIsSectionMenuOpen(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSectionToggle = (value: string) => {
    setFormData((current) => {
      if (value === allSectionsValue) {
        return {
          ...current,
          sectionIds: [allSectionsValue],
          sectionSchedules: {
            ...createSectionScheduleMap(gradebookSections.map((section) => section.id)),
            ...current.sectionSchedules,
          },
        }
      }

      const withoutAll = current.sectionIds.filter((item) => item !== allSectionsValue)
      const nextSectionIds = withoutAll.includes(value)
        ? withoutAll.filter((item) => item !== value)
        : [...withoutAll, value]

      return {
        ...current,
        sectionIds: nextSectionIds.length > 0 ? nextSectionIds : [allSectionsValue],
        sectionSchedules: {
          ...current.sectionSchedules,
          [value]: current.sectionSchedules[value] ?? { date: '', time: defaultScheduleTime },
        },
      }
    })
  }

  const handleScheduleChange = (sectionId: string, field: 'date' | 'time', value: string) => {
    setFormData((current) => ({
      ...current,
      sectionSchedules: {
        ...current.sectionSchedules,
        [sectionId]: {
          ...(current.sectionSchedules[sectionId] ?? { date: '', time: defaultScheduleTime }),
          [field]: value,
        },
      },
    }))
  }

  const getSectionSummary = (assessment: AssessmentRecord) => {
    const sectionIds = assessment.sectionIds ?? [assessment.sectionId]
    if (sectionIds.includes(allSectionsValue)) {
      return 'All Sections'
    }

    const sectionCodes = sectionIds
      .map((sectionId) => gradebookSections.find((item) => item.id === sectionId)?.code)
      .filter(Boolean) as string[]

    if (sectionCodes.length <= 2) {
      return sectionCodes.join(', ')
    }

    return `${sectionCodes.slice(0, 2).join(', ')} +${sectionCodes.length - 2}`
  }

  const selectedSectionSummary = useMemo(() => {
    if (formData.sectionIds.includes(allSectionsValue)) {
      return 'All Sections'
    }

    const sectionCodes = formData.sectionIds
      .map((sectionId) => gradebookSections.find((item) => item.id === sectionId)?.code)
      .filter(Boolean) as string[]

    if (sectionCodes.length === 0) {
      return 'Select sections'
    }

    if (sectionCodes.length <= 2) {
      return sectionCodes.join(', ')
    }

    return `${sectionCodes.slice(0, 2).join(', ')} +${sectionCodes.length - 2}`
  }, [formData.sectionIds])

  const handleAddAssessment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTitle = formData.title.trim()
    if (!trimmedTitle || !formData.points.trim()) {
      return
    }

    const normalizedSectionIds = formData.sectionIds.includes(allSectionsValue)
      ? [allSectionsValue]
      : formData.sectionIds

    const sectionSchedules: AssessmentSectionSchedule[] = effectiveSectionIds.map((sectionId) => ({
      sectionId,
      date: formData.sectionSchedules[sectionId]?.date ?? '',
      time: formData.sectionSchedules[sectionId]?.time ?? '',
    }))

    if (sectionSchedules.some((schedule) => !schedule.date || !schedule.time)) {
      return
    }

    const primarySchedule = [...sectionSchedules].sort((left, right) =>
      `${left.date}T${left.time}`.localeCompare(`${right.date}T${right.time}`),
    )[0]

    const nextAssessment: AssessmentRecord = {
      id: `asm-${String(assessments.length + 1).padStart(2, '0')}`,
      title: trimmedTitle,
      type: activeType,
      sectionId: normalizedSectionIds[0] ?? allSectionsValue,
      sectionIds: normalizedSectionIds,
      sectionSchedules,
      quarter: formData.quarter,
      points: formData.points,
      dueDate: primarySchedule?.date ?? '',
    }

    setAssessments((current) => [nextAssessment, ...current])
    resetModal()
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
            <h1>Assessments</h1>
          </div>

          <div className="faculty-dashboard__topbar-strip" aria-label="Assessment workspace context">
            <strong>Faculty authoring</strong>
            <span>Create graded items by section and quarter</span>
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
          <section className="faculty-dashboard__hero faculty-gradebook__hero">
            <div className="faculty-dashboard__hero-copy">
              <span className="faculty-dashboard__eyebrow">Assessment Builder</span>
              <h2>Prepare quizzes, performance tasks, written works, and quarter exams from one authoring board.</h2>
              <p>Build the assessment list first, then open the gradebook to encode student scores against the items you have already prepared.</p>
            </div>

            <div className="faculty-dashboard__hero-callout">
              <div>
                <span>Current setup</span>
                <strong>{assessments.length} total assessment items</strong>
              </div>
              <p>Use the tabs below to switch category and keep each quarter&apos;s graded items organized by class.</p>
            </div>
          </section>

          <section className="faculty-dashboard__panel faculty-assessments">
            <div className="faculty-dashboard__panel-head">
              <h3>Assessment Workspace</h3>
              <Link to="/faculty/gradebook">Open gradebook</Link>
            </div>

            <div className="faculty-assessments__tabs">
              {assessmentTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={type === activeType ? 'is-active' : undefined}
                  onClick={() => setActiveType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="faculty-assessments__workspace">
              <div className="faculty-assessments__library faculty-assessments__library--full">
                <div className="faculty-assessments__toolbar">
                  <label className="faculty-assessments__search">
                    <FaSearch />
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder={`Search ${activeType.toLowerCase()} title`}
                    />
                  </label>

                  <input
                    className="faculty-assessments__date-filter"
                    type="date"
                    value={dateFilter}
                    onChange={(event) => setDateFilter(event.target.value)}
                  />

                  <button type="button" className="faculty-assessments__add-button" onClick={() => setIsModalOpen(true)}>
                    <FaPlus />
                    Add {activeType}
                  </button>
                </div>

                <div className="faculty-assessments__list">
                  <div className="faculty-assessments__list-head">
                    <h4>{activeType} Library</h4>
                    <span>{filteredAssessments.length} items</span>
                  </div>

                  <div className="faculty-assessments__records">
                    {paginatedAssessments.map((assessment) => {
                      return (
                        <Link
                          key={assessment.id}
                          className="faculty-assessments__record"
                          to={`/faculty/assessments/${assessment.id}`}
                        >
                          <div>
                            <strong>{assessment.title}</strong>
                            <span>{getSectionSummary(assessment)} | {assessment.quarter}</span>
                          </div>
                          <div>
                            <strong>{assessment.points} pts</strong>
                            <span>Due {assessment.dueDate}</span>
                          </div>
                        </Link>
                      )
                    })}

                    {paginatedAssessments.length === 0 ? (
                      <div className="faculty-assessments__empty">
                        <strong>No items found</strong>
                        <span>Adjust the search or date filter to see more assessment items.</span>
                      </div>
                    ) : null}
                  </div>

                  <div className="faculty-assessments__pagination">
                    <span>
                      Showing {paginatedAssessments.length === 0 ? 0 : (safePage - 1) * libraryPageSize + 1}-
                      {Math.min(safePage * libraryPageSize, filteredAssessments.length)} of {filteredAssessments.length}
                    </span>
                    <div className="faculty-assessments__pagination-actions">
                      <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={safePage === 1}>
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, index) => index + 1)
                        .slice(Math.max(0, safePage - 2), Math.max(0, safePage - 2) + 3)
                        .map((page) => (
                          <button
                            key={page}
                            type="button"
                            className={page === safePage ? 'is-active' : undefined}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        ))}
                      <button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={safePage === totalPages}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {isModalOpen ? (
        <div className="users-reference__modal-backdrop users-reference__modal-backdrop--premium" role="presentation" onClick={resetModal}>
          <div className="users-reference__modal faculty-assessments__modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="dashboard-reference__panel-header">
              <div>
                <h2>Add {activeType}</h2>
                <p className="users-reference__subcopy">Create the assessment item here before encoding scores in the gradebook.</p>
              </div>
              <button type="button" className="users-reference__modal-close" onClick={resetModal}>
                Close
              </button>
            </div>

            <form className="faculty-assessments__modal-form" onSubmit={handleAddAssessment}>
              <label>
                Title
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder={activeType === 'Quiz' ? 'Quiz 3 - Use Case Mapping' : activeType === 'Performance Task' ? 'Prototype Presentation' : activeType === 'Written Work' ? 'Reflection Journal 04' : 'Midterm Examination'}
                />
              </label>

              <div className="faculty-assessments__section-picker">
                <div className="faculty-assessments__section-picker-head">
                  <strong>Sections taking this {activeType.toLowerCase()}</strong>
                  <span>Select one, many, or assign it to all sections.</span>
                </div>

                <div className="faculty-assessments__section-select">
                  <button
                    type="button"
                    className={`faculty-assessments__section-trigger${isSectionMenuOpen ? ' is-open' : ''}`}
                    onClick={() => setIsSectionMenuOpen((current) => !current)}
                  >
                    <span>{selectedSectionSummary}</span>
                    <FaChevronDown />
                  </button>

                  {isSectionMenuOpen ? (
                    <div className="faculty-assessments__section-options">
                      <label className="faculty-assessments__section-option">
                        <input
                          type="checkbox"
                          checked={formData.sectionIds.includes(allSectionsValue)}
                          onChange={() => handleSectionToggle(allSectionsValue)}
                        />
                        <div>
                          <strong>All Sections</strong>
                          <span>Make this assessment available to every class you handle.</span>
                        </div>
                      </label>

                      {gradebookSections.map((section) => (
                        <label key={section.id} className="faculty-assessments__section-option">
                          <input
                            type="checkbox"
                            checked={formData.sectionIds.includes(section.id) && !formData.sectionIds.includes(allSectionsValue)}
                            onChange={() => handleSectionToggle(section.id)}
                          />
                          <div>
                            <strong>{section.code}</strong>
                            <span>{section.title}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="faculty-assessments__schedule-panel">
                <div className="faculty-assessments__section-picker-head">
                  <strong>Assessment schedule per section</strong>
                  <span>Set the date and time for each selected section.</span>
                </div>

                <div className="faculty-assessments__schedule-list">
                  {effectiveSectionIds.map((sectionId) => {
                    const section = gradebookSections.find((item) => item.id === sectionId)
                    const schedule = formData.sectionSchedules[sectionId] ?? { date: '', time: defaultScheduleTime }

                    return (
                      <div key={sectionId} className="faculty-assessments__schedule-item">
                        <div className="faculty-assessments__schedule-copy">
                          <strong>{section?.code ?? sectionId}</strong>
                          <span>{section?.title ?? 'Selected section'}</span>
                        </div>

                        <div className="faculty-assessments__schedule-fields">
                          <label>
                            Date
                            <input
                              type="date"
                              value={schedule.date}
                              onChange={(event) => handleScheduleChange(sectionId, 'date', event.target.value)}
                            />
                          </label>
                          <label>
                            Time
                            <input
                              type="time"
                              value={schedule.time}
                              onChange={(event) => handleScheduleChange(sectionId, 'time', event.target.value)}
                            />
                          </label>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="faculty-assessments__modal-grid">
                <label>
                  Quarter
                  <select name="quarter" value={formData.quarter} onChange={handleInputChange}>
                    {quarterOptions.map((quarter) => (
                      <option key={quarter} value={quarter}>
                        {quarter}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Points
                  <input name="points" value={formData.points} onChange={handleInputChange} placeholder="50" />
                </label>
              </div>
              <div className="users-reference__modal-actions">
                <button type="button" className="users-reference__filter" onClick={resetModal}>
                  Cancel
                </button>
                <button type="submit" className="dashboard-reference__soft-button users-reference__add">
                  <FaPlus />
                  Save {activeType}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  )
}
