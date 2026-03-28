import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBookOpen, FaCalendarAlt, FaChartLine, FaCog, FaDownload, FaFileAlt, FaFilter, FaGraduationCap, FaHome, FaPlus, FaSearch, FaSignOutAlt, FaUserCheck, FaUserClock, FaUserGraduate, FaUsers } from 'react-icons/fa'
import { AdminTopbar } from '../components/AdminTopbar'

type DocumentRecord = {
  id: string
  title: string
  owner: string
  area: string
  updated: string
  retention: string
  status: 'Filed' | 'Expiring' | 'Missing'
  note: string
}

type DocumentStatus = DocumentRecord['status']

const ITEMS_PER_PAGE = 10
const owners = ['Registrar Office', 'Human Resources', 'Admissions Desk', 'Payroll Unit', 'Faculty Affairs']
const titles = ['Transcript Archive', 'Employee 201 File', 'Admission Packet', 'Payroll Register', 'Appointment Contract', 'Medical Record']
const notes = [
  'Official record copy with current filing metadata.',
  'Core personnel file with active employment documents.',
  'Applicant packet prepared for intake and verification.',
  'Processed payroll archive for release reconciliation.',
  'Signed employment appointment and contract register.',
  'Confidential health and compliance record.',
]
const statuses: DocumentStatus[] = ['Filed', 'Expiring', 'Missing']
const navItems = [
  { icon: FaHome, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: FaUserGraduate, label: 'Students', to: '/admin/students' },
  { icon: FaBookOpen, label: 'Courses', to: '/admin/courses' },
  { icon: FaUsers, label: 'Admissions', to: '/admin/admissions' },
  { icon: FaUserCheck, label: 'Employees', to: '/admin/employees' },
  { icon: FaUserClock, label: 'Leave', to: '/admin/leave' },
  { icon: FaChartLine, label: 'Payroll', to: '/admin/payroll' },
  { icon: FaFileAlt, label: 'Documents', to: '/admin/documents', active: true },
  { icon: FaFileAlt, label: 'Reports', to: '/admin/reports' },
  { icon: FaCalendarAlt, label: 'Calendar', to: '/admin/calendar' },
  { icon: FaCog, label: 'Settings', to: '/admin/settings' },
]

const initialRecords: DocumentRecord[] = Array.from({ length: 22 }, (_, index) => ({
  id: String(index + 1),
  title: titles[index % titles.length],
  owner: owners[index % owners.length],
  area: index % 2 === 0 ? 'Registrar' : 'HR',
  updated: `2026-0${1 + (index % 6)}-0${1 + (index % 9)}`,
  retention: `${1 + (index % 5)} years`,
  status: statuses[index % statuses.length],
  note: notes[index % notes.length],
}))

export default function Documents() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [records, setRecords] = useState<DocumentRecord[]>(initialRecords)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: titles[0],
    owner: owners[0],
    area: 'Registrar',
    updated: '',
    retention: '3 years',
    status: 'Filed' as DocumentStatus,
  })
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return records
    return records.filter((record) =>
      [record.title, record.owner, record.area, record.updated, record.retention, record.status, record.note].some((value) =>
        value.toLowerCase().includes(query),
      ),
    )
  }, [records, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const currentRows = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)
  const filedCount = records.filter((record) => record.status === 'Filed').length
  const expiringCount = records.filter((record) => record.status === 'Expiring').length
  const missingCount = records.filter((record) => record.status === 'Missing').length

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formData.updated.trim()) return
    const nextRecord: DocumentRecord = {
      id: String(records.length + 1),
      ...formData,
      note: notes[titles.indexOf(formData.title)] ?? 'Stored document record.',
    }
    setRecords((current) => [nextRecord, ...current])
    setFormData({ title: titles[0], owner: owners[0], area: 'Registrar', updated: '', retention: '3 years', status: 'Filed' })
    setSearch('')
    setPage(1)
    setIsModalOpen(false)
  }

  const handleDownload = (record: DocumentRecord) => {
    const fileContent = [
      `Document: ${record.title}`,
      `Owner: ${record.owner}`,
      `Area: ${record.area}`,
      `Updated: ${record.updated}`,
      `Retention: ${record.retention}`,
      `Status: ${record.status}`,
      '',
      record.note,
    ].join('\n')

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${record.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className={`dashboard-page dashboard-reference users-reference-page${isSidebarOpen ? ' is-sidebar-open' : ''}`}>
      <aside className="dashboard-reference__sidebar">
        <div className="dashboard-reference__brand"><span className="dashboard-reference__brand-icon"><FaGraduationCap /></span><div><strong>NALAKA LMS</strong><span>Registrar & HR</span></div></div>
        <div className="dashboard-reference__profile"><div className="dashboard-reference__avatar">JD</div><div className="dashboard-reference__profile-copy"><strong>John Doe</strong><span>Records Officer</span></div><em>3</em></div>
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
      <button type="button" className="dashboard-reference__sidebar-backdrop" aria-label="Close admin menu" onClick={() => setIsSidebarOpen(false)} />
      <section className="dashboard-reference__main">
        <AdminTopbar onMenuToggle={() => setIsSidebarOpen((current) => !current)} />
        <section className="dashboard-reference__content users-reference documents-reference">
          <section className="documents-reference__topbar">
            <div>
              <h1>Documents</h1>
              <p>Review record ownership, retention timing, and direct file access from one registry.</p>
            </div>
            <button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => setIsModalOpen(true)}><FaPlus />Add Record</button>
          </section>

          <section className="documents-reference__stats" aria-label="Documents summary">
            <article><span>Total records</span><strong>{records.length}</strong><small>Tracked registrar and HR files</small></article>
            <article><span>Filed</span><strong>{filedCount}</strong><small>Available in the repository</small></article>
            <article><span>Expiring</span><strong>{expiringCount}</strong><small>Retention review required</small></article>
            <article><span>Missing</span><strong>{missingCount}</strong><small>Awaiting upload or retrieval</small></article>
          </section>

          <section className="dashboard-reference__panel users-reference__panel documents-reference__panel">
            <div className="documents-reference__panel-top">
              <div className="documents-reference__panel-copy">
                <h2>Record Library</h2>
                <p>Search records, verify ownership, monitor retention windows, and download stored entries directly from the table.</p>
              </div>
              <div className="users-reference__toolbar documents-reference__toolbar">
                <label className="users-reference__search"><FaSearch /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Search records, owners, or areas" /></label>
                <button type="button" className="users-reference__filter"><FaFilter />Filters</button>
              </div>
            </div>

            <div className="users-reference__table documents-reference__table">
              <div className="users-reference__head users-reference__head--enhanced documents-reference__head">
                <span>Document</span>
                <span>Owner</span>
                <span>Area</span>
                <span>Updated</span>
                <span>Retention</span>
                <span>Status</span>
                <span>Action</span>
              </div>
              {currentRows.map((record) => (
                <article key={record.id} className="users-reference__row users-reference__row--enhanced documents-reference__row">
                  <div className="users-reference__name documents-reference__name">
                    <div className="dashboard-reference__avatar dashboard-reference__avatar--small">{record.title.slice(0, 2).toUpperCase()}</div>
                    <div>
                      <strong>{record.title}</strong>
                      <small>{record.note}</small>
                    </div>
                  </div>
                  <span>{record.owner}</span>
                  <span>{record.area}</span>
                  <span>{record.updated}</span>
                  <span>{record.retention}</span>
                  <span className={`users-reference__status documents-reference__status--${record.status.toLowerCase()}`}>{record.status}</span>
                  <button type="button" className="documents-reference__download" onClick={() => handleDownload(record)}><FaDownload /><span>Download</span></button>
                </article>
              ))}
            </div>
            <div className="users-reference__footer"><p>Showing {(safePage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} records</p><div className="dashboard-reference__pager users-reference__pager"><button type="button" onClick={() => setPage(Math.max(1, safePage - 1))} disabled={safePage === 1}>Previous</button><div>{Array.from({ length: totalPages }, (_, index) => index + 1).map((nextPage) => <button key={nextPage} type="button" className={nextPage === safePage ? 'is-active' : undefined} onClick={() => setPage(nextPage)}>{nextPage}</button>)}</div><button type="button" onClick={() => setPage(Math.min(totalPages, safePage + 1))} disabled={safePage === totalPages}>Next</button></div></div>
          </section>
        </section>
      </section>
      {isModalOpen ? <div className="users-reference__modal-backdrop" role="presentation" onClick={() => setIsModalOpen(false)}><div className="users-reference__modal" role="dialog" aria-modal="true" aria-labelledby="add-record-title" onClick={(event) => event.stopPropagation()}><div className="dashboard-reference__panel-header"><div><h2 id="add-record-title">Add Record</h2><p className="users-reference__subcopy">Create a new HR or registrar document record.</p></div><button type="button" className="users-reference__modal-close" onClick={() => setIsModalOpen(false)}>Close</button></div><form className="users-reference__form" onSubmit={handleAdd}><label>Title<select value={formData.title} onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))}>{titles.map((value) => <option key={value} value={value}>{value}</option>)}</select></label><label>Owner<select value={formData.owner} onChange={(event) => setFormData((current) => ({ ...current, owner: event.target.value }))}>{owners.map((value) => <option key={value} value={value}>{value}</option>)}</select></label><label>Area<select value={formData.area} onChange={(event) => setFormData((current) => ({ ...current, area: event.target.value }))}><option value="Registrar">Registrar</option><option value="HR">HR</option></select></label><label>Updated<input value={formData.updated} onChange={(event) => setFormData((current) => ({ ...current, updated: event.target.value }))} placeholder="2026-06-15" /></label><label>Retention<input value={formData.retention} onChange={(event) => setFormData((current) => ({ ...current, retention: event.target.value }))} placeholder="3 years" /></label><label>Status<select value={formData.status} onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value as DocumentStatus }))}>{statuses.map((value) => <option key={value} value={value}>{value}</option>)}</select></label><div className="users-reference__modal-actions"><button type="button" className="users-reference__filter" onClick={() => setIsModalOpen(false)}>Cancel</button><button type="submit" className="dashboard-reference__soft-button users-reference__add"><FaPlus />Save Record</button></div></form></div></div> : null}
    </main>
  )
}

