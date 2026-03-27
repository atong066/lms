import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBell, FaBookOpen, FaCalendarAlt, FaChartLine, FaCog, FaDownload, FaEnvelope, FaFileAlt, FaFilter, FaGraduationCap, FaHome, FaPlus, FaRegCircle, FaSearch, FaSignOutAlt, FaUserCheck, FaUserClock, FaUserGraduate, FaUsers } from 'react-icons/fa'

type ReportRecord = {
  id: string
  title: string
  owner: string
  frequency: string
  lastRun: string
  status: 'Ready' | 'Queued' | 'Draft'
  format: 'PDF' | 'XLSX' | 'CSV'
  description: string
}

type ReportFormat = 'PDF' | 'XLSX' | 'CSV'
type ReportStatus = ReportRecord['status']

const ITEMS_PER_PAGE = 10
const titles = ['Enrollment Summary', 'Faculty Load Report', 'Leave Utilization', 'Payroll Variance', 'Admissions Funnel', 'Document Compliance']
const owners = ['Registrar', 'HR', 'Payroll', 'Admissions']
const frequencies = ['Weekly', 'Monthly', 'Quarterly']
const formats: ReportFormat[] = ['PDF', 'XLSX', 'CSV']
const statuses: ReportStatus[] = ['Ready', 'Queued', 'Draft']
const descriptions = [
  'Student counts, intake movement, and enrollment clearance status.',
  'Assigned classes, units, and teaching hour allocation.',
  'Approved and pending leave movement across departments.',
  'Release totals, deductions, and variance versus plan.',
  'Applicant conversion by stage, strand, and review owner.',
  'Required personnel and academic file completeness.',
]

const navItems = [
  { icon: FaHome, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: FaUserGraduate, label: 'Students', to: '/admin/students' },
  { icon: FaBookOpen, label: 'Courses', to: '/admin/courses' },
  { icon: FaUsers, label: 'Admissions', to: '/admin/admissions' },
  { icon: FaUserCheck, label: 'Employees', to: '/admin/employees' },
  { icon: FaUserClock, label: 'Leave', to: '/admin/leave' },
  { icon: FaChartLine, label: 'Payroll', to: '/admin/payroll' },
  { icon: FaFileAlt, label: 'Documents', to: '/admin/documents' },
  { icon: FaFileAlt, label: 'Reports', to: '/admin/reports', active: true },
  { icon: FaCalendarAlt, label: 'Calendar', to: '/admin/calendar' },
  { icon: FaCog, label: 'Settings', to: '/admin/settings' },
]

const initialRecords: ReportRecord[] = Array.from({ length: 20 }, (_, index) => ({
  id: String(index + 1),
  title: titles[index % titles.length],
  owner: owners[index % owners.length],
  frequency: frequencies[index % frequencies.length],
  lastRun: `2026-0${1 + (index % 6)}-10`,
  status: statuses[index % statuses.length],
  format: formats[index % formats.length],
  description: descriptions[index % descriptions.length],
}))

export default function Reports() {
  const [records, setRecords] = useState<ReportRecord[]>(initialRecords)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: titles[0],
    owner: owners[0],
    frequency: frequencies[0],
    lastRun: '',
    status: 'Draft' as ReportStatus,
    format: 'PDF' as ReportFormat,
  })
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return records

    return records.filter((record) =>
      [
        record.title,
        record.owner,
        record.frequency,
        record.lastRun,
        record.status,
        record.format,
        record.description,
      ].some((value) => value.toLowerCase().includes(query)),
    )
  }, [records, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const currentRows = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)
  const readyCount = records.filter((record) => record.status === 'Ready').length
  const queuedCount = records.filter((record) => record.status === 'Queued').length
  const draftCount = records.filter((record) => record.status === 'Draft').length

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formData.lastRun.trim()) return
    const nextRecord: ReportRecord = {
      id: String(records.length + 1),
      ...formData,
      description: descriptions[titles.indexOf(formData.title)] ?? 'Generated operational report.',
    }
    setRecords((current) => [nextRecord, ...current])
    setFormData({
      title: titles[0],
      owner: owners[0],
      frequency: frequencies[0],
      lastRun: '',
      status: 'Draft',
      format: 'PDF',
    })
    setSearch('')
    setPage(1)
    setIsModalOpen(false)
  }

  const handleDownload = (record: ReportRecord) => {
    const fileContent = [
      `Report: ${record.title}`,
      `Owner: ${record.owner}`,
      `Frequency: ${record.frequency}`,
      `Last Run: ${record.lastRun}`,
      `Status: ${record.status}`,
      `Format: ${record.format}`,
      '',
      record.description,
    ].join('\n')

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${record.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${record.format.toLowerCase()}`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="dashboard-page dashboard-reference users-reference-page">
      <aside className="dashboard-reference__sidebar">
        <div className="dashboard-reference__brand"><span className="dashboard-reference__brand-icon"><FaGraduationCap /></span><div><strong>NALAKA LMS</strong><span>Registrar & HR</span></div></div>
        <div className="dashboard-reference__profile"><div className="dashboard-reference__avatar">JD</div><div className="dashboard-reference__profile-copy"><strong>John Doe</strong><span>Operations</span></div><em>3</em></div>
        <nav className="dashboard-reference__nav" aria-label="Portal navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            const content = <><Icon /><span>{item.label}</span></>
            return item.to === '#'
              ? <a href="#" key={item.label} className={item.active ? 'is-active' : undefined}>{content}</a>
              : <Link key={item.label} to={item.to} className={item.active ? 'is-active' : undefined}>{content}</Link>
          })}
        </nav>
        <button type="button" className="dashboard-reference__logout"><span><FaSignOutAlt />Logout</span><span aria-hidden="true">{'>'}</span></button>
      </aside>

      <section className="dashboard-reference__main">
        <header className="dashboard-reference__topbar">
          <div className="dashboard-reference__topbar-user"><div className="dashboard-reference__avatar dashboard-reference__avatar--small">JD</div><strong>John Doe</strong></div>
          <div className="dashboard-reference__topbar-actions"><button type="button" className="has-badge"><FaBell /><span>5</span></button><button type="button"><FaEnvelope /></button><button type="button"><FaCog /></button><button type="button"><FaRegCircle /></button><div className="dashboard-reference__avatar dashboard-reference__avatar--small">JD</div></div>
        </header>

        <section className="dashboard-reference__content users-reference reports-reference">
          <section className="reports-reference__topbar">
            <div>
              <h1>Reports</h1>
              <p>Track recurring registrar and HR outputs, monitor readiness, and export completed files.</p>
            </div>
            <button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => setIsModalOpen(true)}>
              <FaPlus /> Create Report
            </button>
          </section>

          <section className="reports-reference__stats" aria-label="Reports summary">
            <article>
              <span>Total reports</span>
              <strong>{records.length}</strong>
              <small>Active reporting definitions</small>
            </article>
            <article>
              <span>Ready for export</span>
              <strong>{readyCount}</strong>
              <small>Latest generated files</small>
            </article>
            <article>
              <span>Queued</span>
              <strong>{queuedCount}</strong>
              <small>Waiting for scheduled run</small>
            </article>
            <article>
              <span>Drafts</span>
              <strong>{draftCount}</strong>
              <small>Not yet released</small>
            </article>
          </section>

          <section className="dashboard-reference__panel users-reference__panel reports-reference__panel">
            <div className="reports-reference__panel-top">
              <div className="reports-reference__panel-copy">
                <h2>Report Library</h2>
                <p>Search scheduled outputs, review the latest run, and download generated files directly from the registry.</p>
              </div>
              <div className="users-reference__toolbar reports-reference__toolbar">
                <label className="users-reference__search">
                  <FaSearch />
                  <input
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value)
                      setPage(1)
                    }}
                    placeholder="Search reports, owners, or formats"
                  />
                </label>
                <button type="button" className="users-reference__filter"><FaFilter />Filters</button>
              </div>
            </div>

            <div className="users-reference__table reports-reference__table">
              <div className="users-reference__head users-reference__head--enhanced reports-reference__head">
                <span>Report</span>
                <span>Owner</span>
                <span>Cadence</span>
                <span>Last Run</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              {currentRows.map((record) => (
                <article key={record.id} className="users-reference__row users-reference__row--enhanced reports-reference__row">
                  <div className="users-reference__name reports-reference__name">
                    <div className="dashboard-reference__avatar dashboard-reference__avatar--small">{record.title.slice(0, 2).toUpperCase()}</div>
                    <div>
                      <strong>{record.title}</strong>
                      <small>{record.description}</small>
                    </div>
                  </div>
                  <span>{record.owner}</span>
                  <span>{record.frequency} · {record.format}</span>
                  <span>{record.lastRun}</span>
                  <span className={`users-reference__status reports-reference__status--${record.status.toLowerCase()}`}>{record.status}</span>
                  <button type="button" className="reports-reference__download" onClick={() => handleDownload(record)}>
                    <FaDownload />
                    <span>Download</span>
                  </button>
                </article>
              ))}
            </div>

            <div className="users-reference__footer">
              <p>Showing {(safePage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} reports</p>
              <div className="dashboard-reference__pager users-reference__pager">
                <button type="button" onClick={() => setPage(Math.max(1, safePage - 1))} disabled={safePage === 1}>Previous</button>
                <div>{Array.from({ length: totalPages }, (_, index) => index + 1).map((nextPage) => <button key={nextPage} type="button" className={nextPage === safePage ? 'is-active' : undefined} onClick={() => setPage(nextPage)}>{nextPage}</button>)}</div>
                <button type="button" onClick={() => setPage(Math.min(totalPages, safePage + 1))} disabled={safePage === totalPages}>Next</button>
              </div>
            </div>
          </section>
        </section>
      </section>

      {isModalOpen ? (
        <div className="users-reference__modal-backdrop" role="presentation" onClick={() => setIsModalOpen(false)}>
          <div className="users-reference__modal" role="dialog" aria-modal="true" aria-labelledby="create-report-title" onClick={(event) => event.stopPropagation()}>
            <div className="dashboard-reference__panel-header">
              <div><h2 id="create-report-title">Create Report</h2><p className="users-reference__subcopy">Add a report definition for recurring registrar or HR monitoring.</p></div>
              <button type="button" className="users-reference__modal-close" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
            <form className="users-reference__form" onSubmit={handleAdd}>
              <label>Title<select value={formData.title} onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))}>{titles.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
              <label>Owner<select value={formData.owner} onChange={(event) => setFormData((current) => ({ ...current, owner: event.target.value }))}>{owners.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
              <label>Frequency<select value={formData.frequency} onChange={(event) => setFormData((current) => ({ ...current, frequency: event.target.value }))}>{frequencies.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
              <label>Last run<input value={formData.lastRun} onChange={(event) => setFormData((current) => ({ ...current, lastRun: event.target.value }))} placeholder="2026-06-15" /></label>
              <label>Format<select value={formData.format} onChange={(event) => setFormData((current) => ({ ...current, format: event.target.value as ReportFormat }))}>{formats.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
              <label>Status<select value={formData.status} onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value as ReportStatus }))}>{statuses.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
              <div className="users-reference__modal-actions">
                <button type="button" className="users-reference__filter" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="dashboard-reference__soft-button users-reference__add"><FaPlus />Save Report</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  )
}

