import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBars,
  FaBell,
  FaBookOpen,
  FaCalendarAlt,
  FaChevronRight,
  FaCog,
  FaComments,
  FaDownload,
  FaEnvelope,
  FaFileAlt,
  FaFilter,
  FaGraduationCap,
  FaHome,
  FaPlus,
  FaRegCircle,
  FaSearch,
  FaSignOutAlt,
  FaTasks,
} from 'react-icons/fa'
import { facultyNavMain, facultyNavSupport, type FacultyNavItem } from './gradebookData'

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

type ResourceCategory = 'All' | 'Slides' | 'Rubrics' | 'Worksheets' | 'Templates' | 'Policies'

type ResourceItem = {
  id: string
  title: string
  category: Exclude<ResourceCategory, 'All'>
  course: string
  updated: string
  size: string
  note: string
  fileName?: string
}

const categoryFilters: ResourceCategory[] = ['All', 'Slides', 'Rubrics', 'Worksheets', 'Templates', 'Policies']

const initialResources: ResourceItem[] = [
  {
    id: 'res-01',
    title: 'Systems Analysis Week 8 Lecture Deck',
    category: 'Slides',
    course: 'BSIS 3A',
    updated: 'Updated today',
    size: '12 MB',
    note: 'Capstone checkpoint framing and stakeholder mapping deck.',
  },
  {
    id: 'res-02',
    title: 'Checkpoint Evaluation Rubric',
    category: 'Rubrics',
    course: 'BSIS 3A',
    updated: 'Yesterday',
    size: '420 KB',
    note: 'Shared rubric for checkpoint panel scoring and feedback notes.',
  },
  {
    id: 'res-03',
    title: 'Reflection Journal Worksheet',
    category: 'Worksheets',
    course: 'BSED 2B',
    updated: '2 days ago',
    size: '860 KB',
    note: 'Printable worksheet with guided prompts for learner reflection.',
  },
  {
    id: 'res-04',
    title: 'Consultation Tracking Template',
    category: 'Templates',
    course: 'Faculty-wide',
    updated: 'This week',
    size: '190 KB',
    note: 'Faculty advising tracker for consultations and follow-up notes.',
  },
  {
    id: 'res-05',
    title: 'Assessment Week Supervision Memo',
    category: 'Policies',
    course: 'Faculty-wide',
    updated: 'This week',
    size: '310 KB',
    note: 'Coverage, room rotation, and relief protocol for exam week.',
  },
  {
    id: 'res-06',
    title: 'Food Service Lab Checklist',
    category: 'Worksheets',
    course: 'BSHM 1C',
    updated: '3 days ago',
    size: '540 KB',
    note: 'Pre-lab setup and safety compliance checklist for kitchen sessions.',
  },
]

const resourceMetrics = [
  { value: '24', label: 'Active files' },
  { value: '07', label: 'Shared this week' },
  { value: '04', label: 'Class templates' },
  { value: '03', label: 'Policy memos' },
]

function formatFileSize(file: File) {
  if (file.size >= 1024 * 1024) {
    return `${(file.size / (1024 * 1024)).toFixed(1)} MB`
  }

  return `${Math.max(1, Math.round(file.size / 1024))} KB`
}

export default function FacultyResources() {
  const [resourceItems, setResourceItems] = useState<ResourceItem[]>(initialResources)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<ResourceCategory>('All')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'Slides' as Exclude<ResourceCategory, 'All'>,
    course: 'BSIS 3A',
    note: '',
    file: null as File | null,
  })

  const filteredResources = useMemo(() => {
    const query = search.trim().toLowerCase()
    return resourceItems.filter((resource) => {
      const matchesFilter = activeFilter === 'All' || resource.category === activeFilter
      const matchesSearch =
        !query ||
        [resource.title, resource.course, resource.category, resource.note, resource.fileName ?? ''].some((value) =>
          value.toLowerCase().includes(query),
        )
      return matchesFilter && matchesSearch
    })
  }, [activeFilter, resourceItems, search])

  const handleUploadResource = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = uploadForm.title.trim()
    const note = uploadForm.note.trim()

    if (!title || !uploadForm.file) {
      return
    }

    const nextItem: ResourceItem = {
      id: `resource-${Date.now()}`,
      title,
      category: uploadForm.category,
      course: uploadForm.course,
      updated: 'Just now',
      size: formatFileSize(uploadForm.file),
      note: note || `Uploaded teaching file for ${uploadForm.course}.`,
      fileName: uploadForm.file.name,
    }

    setResourceItems((current) => [nextItem, ...current])
    setIsUploadModalOpen(false)
    setUploadForm({
      title: '',
      category: 'Slides',
      course: 'BSIS 3A',
      note: '',
      file: null,
    })
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
              <Link key={item.label} to={item.to}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="faculty-dashboard__nav-label faculty-dashboard__nav-label--secondary">Tools</div>
          {facultyNavSupport.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <Link key={item.label} to={item.to} className={item.label === 'Resources' ? 'is-active' : undefined}>
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
            <h1>Resources</h1>
          </div>

          <div className="faculty-dashboard__topbar-strip" aria-label="Resources context">
            <strong>Teaching materials</strong>
            <span>Slides, rubrics, worksheets, and shared faculty templates</span>
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
          <section className="faculty-dashboard__hero faculty-resources__hero">
            <div className="faculty-dashboard__hero-copy">
              <span className="faculty-dashboard__eyebrow">Teaching Library</span>
              <h2>Keep your class files, grading tools, and shared documents within easy reach.</h2>
              <p>Search materials by course or type, then open the right document without digging through separate folders.</p>
            </div>

            <div className="faculty-dashboard__hero-callout faculty-resources__hero-callout">
              <div>
                <span>Most used this week</span>
                <strong>Checkpoint Evaluation Rubric</strong>
              </div>
              <p>Shared scoring criteria for the BSIS 3A milestone review remains the most downloaded file.</p>
            </div>
          </section>

          <section className="faculty-dashboard__stats faculty-resources__stats" aria-label="Resource metrics">
            {resourceMetrics.map((item) => (
              <article key={item.label} className="faculty-dashboard__stat">
                <span>{item.value}</span>
                <strong>{item.label}</strong>
              </article>
            ))}
          </section>

          <section className="faculty-dashboard__panel faculty-resources__panel">
            <div className="faculty-dashboard__panel-head">
              <h3>Faculty Resource Library</h3>
              <div className="faculty-resources__head-actions">
                <span className="faculty-resources__count">{filteredResources.length} items</span>
                <button type="button" className="faculty-resources__upload-button" onClick={() => setIsUploadModalOpen(true)}>
                  <FaPlus />
                  Upload resource
                </button>
              </div>
            </div>

            <div className="faculty-resources__toolbar">
              <label className="faculty-resources__search">
                <FaSearch />
                <input
                  type="search"
                  placeholder="Search by title, course, or keyword"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>

              <div className="faculty-resources__filters" aria-label="Resource categories">
                {categoryFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={filter === activeFilter ? 'is-active' : undefined}
                    onClick={() => setActiveFilter(filter)}
                  >
                    <FaFilter />
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="faculty-resources__list">
              {filteredResources.map((resource) => (
                <article key={resource.id} className="faculty-resources__item">
                  <div className="faculty-resources__item-main">
                    <div className="faculty-resources__item-icon">
                      <FaFileAlt />
                    </div>
                    <div>
                      <strong>{resource.title}</strong>
                      <span>{resource.course} · {resource.category}</span>
                      <p>{resource.note}</p>
                      {resource.fileName ? <em className="faculty-resources__filename">{resource.fileName}</em> : null}
                    </div>
                  </div>

                  <div className="faculty-resources__item-meta">
                    <span>{resource.updated}</span>
                    <span>{resource.size}</span>
                    <button type="button">
                      <FaDownload />
                      Download
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {isUploadModalOpen ? (
          <div className="users-reference__modal-backdrop" role="presentation">
            <div className="users-reference__modal faculty-resources__modal" role="dialog" aria-modal="true" aria-labelledby="faculty-resources-upload-title">
              <div className="faculty-forum__modal-head">
                <div>
                  <span>Upload resource</span>
                  <h2 id="faculty-resources-upload-title">Add a new teaching file</h2>
                </div>
                <button type="button" className="users-reference__modal-close" onClick={() => setIsUploadModalOpen(false)}>
                  Close
                </button>
              </div>

              <form className="faculty-forum__modal-form" onSubmit={handleUploadResource}>
                <label>
                  Resource title
                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(event) => setUploadForm((current) => ({ ...current, title: event.target.value }))}
                    placeholder="Enter the title for this file"
                  />
                </label>

                <div className="faculty-forum__modal-grid">
                  <label>
                    Category
                    <select
                      value={uploadForm.category}
                      onChange={(event) =>
                        setUploadForm((current) => ({
                          ...current,
                          category: event.target.value as Exclude<ResourceCategory, 'All'>,
                        }))
                      }
                    >
                      <option value="Slides">Slides</option>
                      <option value="Rubrics">Rubrics</option>
                      <option value="Worksheets">Worksheets</option>
                      <option value="Templates">Templates</option>
                      <option value="Policies">Policies</option>
                    </select>
                  </label>

                  <label>
                    Course / audience
                    <select
                      value={uploadForm.course}
                      onChange={(event) => setUploadForm((current) => ({ ...current, course: event.target.value }))}
                    >
                      <option>BSIS 3A</option>
                      <option>BSED 2B</option>
                      <option>BSHM 1C</option>
                      <option>Faculty-wide</option>
                    </select>
                  </label>
                </div>

                <label>
                  File notes
                  <textarea
                    value={uploadForm.note}
                    onChange={(event) => setUploadForm((current) => ({ ...current, note: event.target.value }))}
                    placeholder="Add a short description or usage note."
                  />
                </label>

                <label>
                  Upload file
                  <input
                    type="file"
                    onChange={(event) =>
                      setUploadForm((current) => ({
                        ...current,
                        file: event.target.files?.[0] ?? null,
                      }))
                    }
                  />
                </label>

                <div className="users-reference__modal-actions">
                  <button type="button" className="users-reference__filter" onClick={() => setIsUploadModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="dashboard-reference__soft-button users-reference__add">
                    <FaPlus />
                    Upload resource
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  )
}
