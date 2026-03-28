import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBookOpen,
  FaCalendarAlt,
  FaChartLine,
  FaCog,
  FaFileAlt,
  FaFilter,
  FaGraduationCap,
  FaHome,
  FaPlus,
  FaSearch,
  FaSignOutAlt,
  FaUserCheck,
  FaUserClock,
  FaUserGraduate,
  FaUsers,
} from 'react-icons/fa'
import { AdminTopbar } from '../components/AdminTopbar'

type AdmissionRecord = {
  id: string
  applicationNo: string
  name: string
  program: string
  intake: string
  stage: string
  status: 'Qualified' | 'Review' | 'Pending'
}

type AdmissionStatus = AdmissionRecord['status']

const ITEMS_PER_PAGE = 10
const programs = ['BS Information Systems', 'BS Accountancy', 'BS Psychology', 'BS Education', 'BA Communication']
const intakes = ['AY 2026 - Term 1', 'AY 2026 - Term 2', 'Summer Bridge']
const stages = ['Credential Review', 'Interview', 'Final Evaluation', 'Ready for Enrollment']
const statuses: AdmissionStatus[] = ['Qualified', 'Review', 'Pending']

const navItems = [
  { icon: FaHome, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: FaUserGraduate, label: 'Students', to: '/admin/students' },
  { icon: FaBookOpen, label: 'Courses', to: '/admin/courses' },
  { icon: FaUsers, label: 'Admissions', to: '/admin/admissions', active: true },
  { icon: FaUserCheck, label: 'Employees', to: '/admin/employees' },
  { icon: FaUserClock, label: 'Leave', to: '/admin/leave' },
  { icon: FaChartLine, label: 'Payroll', to: '/admin/payroll' },
  { icon: FaFileAlt, label: 'Documents', to: '/admin/documents' },
  { icon: FaFileAlt, label: 'Reports', to: '/admin/reports' },
  { icon: FaCalendarAlt, label: 'Calendar', to: '/admin/calendar' },
  { icon: FaCog, label: 'Settings', to: '/admin/settings' },
]

const firstNames = ['Ava', 'Liam', 'Mia', 'Noah', 'Ella', 'Lucas', 'Chloe', 'Ethan', 'Sofia', 'Caleb']
const lastNames = ['Rivera', 'Garcia', 'Santos', 'Nguyen', 'Tan', 'Mendoza', 'Lim', 'Reyes', 'Torres', 'Flores']

const initialRecords: AdmissionRecord[] = Array.from({ length: 32 }, (_, index) => ({
  id: String(index + 1),
  applicationNo: `APP-26-${String(index + 1).padStart(4, '0')}`,
  name: `${firstNames[index % firstNames.length]} ${lastNames[(index * 2) % lastNames.length]}`,
  program: programs[index % programs.length],
  intake: intakes[index % intakes.length],
  stage: stages[index % stages.length],
  status: statuses[index % statuses.length],
}))

export default function Admissions() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [records, setRecords] = useState<AdmissionRecord[]>(initialRecords)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    program: programs[0],
    intake: intakes[0],
    stage: stages[0],
    status: 'Pending' as AdmissionStatus,
  })
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return records
    return records.filter((record) =>
      [record.applicationNo, record.name, record.program, record.intake, record.stage, record.status].some((value) =>
        value.toLowerCase().includes(query),
      ),
    )
  }, [records, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const currentRows = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = formData.name.trim()
    if (!name) return
    const nextRecord: AdmissionRecord = {
      id: String(records.length + 1),
      applicationNo: `APP-26-${String(records.length + 1).padStart(4, '0')}`,
      name,
      program: formData.program,
      intake: formData.intake,
      stage: formData.stage,
      status: formData.status,
    }
    setRecords((current) => [nextRecord, ...current])
    setFormData({ name: '', program: programs[0], intake: intakes[0], stage: stages[0], status: 'Pending' })
    setSearch('')
    setPage(1)
    setIsModalOpen(false)
  }

  return (
    <main className={`dashboard-page dashboard-reference users-reference-page${isSidebarOpen ? ' is-sidebar-open' : ''}`}>
      <aside className="dashboard-reference__sidebar">
        <div className="dashboard-reference__brand">
          <span className="dashboard-reference__brand-icon"><FaGraduationCap /></span>
          <div><strong>NALAKA LMS</strong><span>Registrar & HR</span></div>
        </div>
        <div className="dashboard-reference__profile">
          <div className="dashboard-reference__avatar">JD</div>
          <div className="dashboard-reference__profile-copy"><strong>John Doe</strong><span>Registrar</span></div>
          <em>3</em>
        </div>
        <nav className="dashboard-reference__nav" aria-label="Portal navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            const content = <><Icon /><span>{item.label}</span></>
            return item.to === '#' ? (
              <a href="#" key={item.label} className={item.active ? 'is-active' : undefined}>{content}</a>
            ) : (
              <Link key={item.label} to={item.to} className={item.active ? 'is-active' : undefined}>{content}</Link>
            )
          })}
        </nav>
        <button type="button" className="dashboard-reference__logout"><span><FaSignOutAlt />Logout</span><span aria-hidden="true">{'>'}</span></button>
      </aside>

      <button
        type="button"
        className="dashboard-reference__sidebar-backdrop"
        aria-label="Close admin menu"
        onClick={() => setIsSidebarOpen(false)}
      />

      <section className="dashboard-reference__main">
        <AdminTopbar onMenuToggle={() => setIsSidebarOpen((current) => !current)} />

        <section className="dashboard-reference__content users-reference">
          <h1>Admissions</h1>
          <section className="users-reference__stats" aria-label="Admissions summary">
            <article className="users-reference__stat"><FaUsers /><div><strong>{records.length}</strong><span>Total applicants</span></div></article>
            <article className="users-reference__stat"><FaUserCheck /><div><strong>{records.filter((r) => r.status === 'Qualified').length}</strong><span>Qualified</span></div></article>
            <article className="users-reference__stat"><FaUserClock /><div><strong>{records.filter((r) => r.status === 'Review').length}</strong><span>For review</span></div></article>
            <article className="users-reference__stat"><FaGraduationCap /><div><strong>{records.filter((r) => r.stage === 'Ready for Enrollment').length}</strong><span>Ready for enrollment</span></div></article>
          </section>

          <section className="dashboard-reference__panel users-reference__panel">
            <div className="dashboard-reference__panel-header">
              <div>
                <h2>Admissions Pipeline</h2>
                <p className="users-reference__subcopy">Track applicants from document review through intake confirmation.</p>
              </div>
              <button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => setIsModalOpen(true)}>
                <FaPlus /> Add Applicant
              </button>
            </div>

            <div className="users-reference__toolbar">
              <label className="users-reference__search"><FaSearch /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Search by application no, name, or program" /></label>
              <button type="button" className="users-reference__filter"><FaFilter />Filters</button>
            </div>

            <div className="users-reference__table admissions-reference__table">
              <div className="users-reference__head users-reference__head--enhanced admissions-reference__head">
                <span>Applicant</span>
                <span>Application No</span>
                <span>Program</span>
                <span>Intake</span>
                <span>Stage</span>
                <span>Status</span>
              </div>
              {currentRows.map((record) => (
                <article key={record.id} className="users-reference__row users-reference__row--enhanced admissions-reference__row">
                  <div className="users-reference__name"><div className="dashboard-reference__avatar dashboard-reference__avatar--small">{record.name.slice(0, 2).toUpperCase()}</div><strong>{record.name}</strong></div>
                  <span>{record.applicationNo}</span>
                  <span>{record.program}</span>
                  <span>{record.intake}</span>
                  <span>{record.stage}</span>
                  <span className={`users-reference__status admissions-reference__status--${record.status.toLowerCase()}`}>{record.status}</span>
                </article>
              ))}
            </div>

            <div className="users-reference__footer">
              <p>Showing {(safePage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} applicants</p>
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
          <div className="users-reference__modal" role="dialog" aria-modal="true" aria-labelledby="add-applicant-title" onClick={(event) => event.stopPropagation()}>
            <div className="dashboard-reference__panel-header">
              <div><h2 id="add-applicant-title">Add Applicant</h2><p className="users-reference__subcopy">Create a new applicant record in the admissions queue.</p></div>
              <button type="button" className="users-reference__modal-close" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
            <form className="users-reference__form" onSubmit={handleAdd}>
              <label>Full name<input name="name" value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} placeholder="Ava Collins" /></label>
              <label>Program<select name="program" value={formData.program} onChange={(event) => setFormData((current) => ({ ...current, program: event.target.value }))}>{programs.map((program) => <option key={program} value={program}>{program}</option>)}</select></label>
              <label>Intake<select name="intake" value={formData.intake} onChange={(event) => setFormData((current) => ({ ...current, intake: event.target.value }))}>{intakes.map((intake) => <option key={intake} value={intake}>{intake}</option>)}</select></label>
              <label>Stage<select name="stage" value={formData.stage} onChange={(event) => setFormData((current) => ({ ...current, stage: event.target.value }))}>{stages.map((stage) => <option key={stage} value={stage}>{stage}</option>)}</select></label>
              <label>Status<select name="status" value={formData.status} onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value as AdmissionStatus }))}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
              <div className="users-reference__modal-actions">
                <button type="button" className="users-reference__filter" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="dashboard-reference__soft-button users-reference__add"><FaPlus />Save Applicant</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  )
}

