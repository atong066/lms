import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBookOpen, FaCalendarAlt, FaChartLine, FaCog, FaFileAlt, FaFilter, FaGraduationCap, FaHome, FaPlus, FaSearch, FaSignOutAlt, FaUserCheck, FaUserClock, FaUserGraduate, FaUsers } from 'react-icons/fa'
import { AdminTopbar } from '../components/AdminTopbar'

type PayrollRecord = {
  id: string
  cycle: string
  employees: string
  releaseDate: string
  payout: string
  status: 'Released' | 'Processing' | 'Queued'
  employeeItems: Array<{
    name: string
    role: string
    grossPay: string
    deductions: string
    netPay: string
    status: 'Released' | 'Pending' | 'Review'
  }>
}

type PayrollStatus = PayrollRecord['status']
type PayrollEmployee = { id: number; name: string; role: string; grossPay: string; deductions: string; netPay: string; status: 'Released' | 'Pending' | 'Review' }

const ITEMS_PER_PAGE = 10
const statuses: PayrollStatus[] = ['Released', 'Processing', 'Queued']
const cycles = ['1st Half - April', '2nd Half - April', '1st Half - May', '2nd Half - May', '1st Half - June']
const employeeNames = ['Isabel Ramos', 'Michael Lee', 'Sarah Cruz', 'Anthony Flores', 'Marina Santos', 'Kevin Dela Paz', 'Rhea Mendoza', 'Paolo Garcia']
const employeeRoles = ['Registrar Assistant', 'Faculty', 'HR Officer', 'Payroll Clerk', 'Admissions Coordinator']
const initialRecords: PayrollRecord[] = Array.from({ length: 18 }, (_, index) => ({
  id: String(index + 1),
  cycle: cycles[index % cycles.length],
  employees: `${32 + index} employees`,
  releaseDate: `2026-0${1 + (index % 6)}-15`,
  payout: `$${(38000 + index * 2100).toLocaleString()}`,
  status: statuses[index % statuses.length],
  employeeItems: [],
}))

const navItems = [
  { icon: FaHome, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: FaUserGraduate, label: 'Students', to: '/admin/students' },
  { icon: FaBookOpen, label: 'Courses', to: '/admin/courses' },
  { icon: FaUsers, label: 'Admissions', to: '/admin/admissions' },
  { icon: FaUserCheck, label: 'Employees', to: '/admin/employees' },
  { icon: FaUserClock, label: 'Leave', to: '/admin/leave' },
  { icon: FaChartLine, label: 'Payroll', to: '/admin/payroll', active: true },
  { icon: FaFileAlt, label: 'Documents', to: '/admin/documents' },
  { icon: FaFileAlt, label: 'Reports', to: '/admin/reports' },
  { icon: FaCalendarAlt, label: 'Calendar', to: '/admin/calendar' },
  { icon: FaCog, label: 'Settings', to: '/admin/settings' },
]

export default function Payroll() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [records, setRecords] = useState<PayrollRecord[]>(initialRecords)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null)
  const [formData, setFormData] = useState({ cycle: cycles[0], employees: '35 employees', releaseDate: '', payout: '', status: 'Queued' as PayrollStatus })
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return records
    return records.filter((record) => [record.cycle, record.employees, record.releaseDate, record.payout, record.status].some((value) => value.toLowerCase().includes(query)))
  }, [records, search])
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const currentRows = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)
  const employeePayrollRows = useMemo<PayrollEmployee[]>(() => {
    if (!selectedRecord) return []

    if ('employeeItems' in selectedRecord && Array.isArray(selectedRecord.employeeItems) && selectedRecord.employeeItems.length > 0) {
      return selectedRecord.employeeItems.map((employee, index) => ({
        id: index + 1,
        ...employee,
      }))
    }

    return Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: employeeNames[index % employeeNames.length],
      role: employeeRoles[index % employeeRoles.length],
      grossPay: `$${(18200 + index * 1350).toLocaleString()}`,
      deductions: `$${(950 + index * 120).toLocaleString()}`,
      netPay: `$${(17250 + index * 1230).toLocaleString()}`,
      status: index % 3 === 0 ? 'Review' : index % 2 === 0 ? 'Pending' : 'Released',
    }))
  }, [selectedRecord])

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formData.releaseDate.trim() || !formData.payout.trim()) return
    const nextRecord: PayrollRecord = {
      id: String(records.length + 1),
      ...formData,
      employeeItems: [],
    }
    setRecords((current) => [nextRecord, ...current])
    setFormData({ cycle: cycles[0], employees: '35 employees', releaseDate: '', payout: '', status: 'Queued' })
    setSearch('')
    setPage(1)
    setIsModalOpen(false)
  }

  return (
    <main className={`dashboard-page dashboard-reference users-reference-page${isSidebarOpen ? ' is-sidebar-open' : ''}`}>
      <aside className="dashboard-reference__sidebar">
        <div className="dashboard-reference__brand"><span className="dashboard-reference__brand-icon"><FaGraduationCap /></span><div><strong>NALAKA LMS</strong><span>Registrar & HR</span></div></div>
        <div className="dashboard-reference__profile"><div className="dashboard-reference__avatar">JD</div><div className="dashboard-reference__profile-copy"><strong>John Doe</strong><span>HR Lead</span></div><em>3</em></div>
        <nav className="dashboard-reference__nav" aria-label="Portal navigation">{navItems.map((item) => { const Icon = item.icon; const content = <><Icon /><span>{item.label}</span></>; return item.to === '#' ? <a href="#" key={item.label} className={item.active ? 'is-active' : undefined}>{content}</a> : <Link key={item.label} to={item.to} className={item.active ? 'is-active' : undefined}>{content}</Link> })}</nav>
        <button type="button" className="dashboard-reference__logout"><span><FaSignOutAlt />Logout</span><span aria-hidden="true">{'>'}</span></button>
      </aside>
      <button type="button" className="dashboard-reference__sidebar-backdrop" aria-label="Close admin menu" onClick={() => setIsSidebarOpen(false)} />
      <section className="dashboard-reference__main">
        <AdminTopbar onMenuToggle={() => setIsSidebarOpen((current) => !current)} />
        <section className="dashboard-reference__content users-reference">
          <h1>Payroll</h1>
          <section className="users-reference__stats" aria-label="Payroll summary">
            <article className="users-reference__stat"><FaChartLine /><div><strong>{records.length}</strong><span>Total payroll batches</span></div></article>
            <article className="users-reference__stat"><FaUserCheck /><div><strong>{records.filter((r) => r.status === 'Released').length}</strong><span>Released</span></div></article>
            <article className="users-reference__stat"><FaUserClock /><div><strong>{records.filter((r) => r.status === 'Processing').length}</strong><span>Processing</span></div></article>
            <article className="users-reference__stat"><FaGraduationCap /><div><strong>{records.filter((r) => r.status === 'Queued').length}</strong><span>Queued</span></div></article>
          </section>
          <section className="dashboard-reference__panel users-reference__panel">
            <div className="dashboard-reference__panel-header"><div><h2>Payroll Runs</h2><p className="users-reference__subcopy">Monitor payroll cycles, payout totals, and release readiness across registrar and HR teams.</p></div><button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => setIsModalOpen(true)}><FaPlus />New Payroll Run</button></div>
            <div className="users-reference__toolbar"><label className="users-reference__search"><FaSearch /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Search by cycle or status" /></label><button type="button" className="users-reference__filter"><FaFilter />Filters</button></div>
            <div className="users-reference__table payroll-reference__table">
              <div className="users-reference__head users-reference__head--enhanced payroll-reference__head"><span>Cycle</span><span>Employees</span><span>Release Date</span><span>Payout</span><span>Status</span><span>Action</span></div>
              {currentRows.map((record) => <article key={record.id} className="users-reference__row users-reference__row--enhanced payroll-reference__row"><div className="users-reference__name"><div className="dashboard-reference__avatar dashboard-reference__avatar--small">{record.cycle.slice(0, 2).toUpperCase()}</div><strong>{record.cycle}</strong></div><span>{record.employees}</span><span>{record.releaseDate}</span><span>{record.payout}</span><span className={`users-reference__status payroll-reference__status--${record.status.toLowerCase()}`}>{record.status}</span><button type="button" className="employees-reference__view" onClick={() => setSelectedRecord(record)}>View</button></article>)}
            </div>
            <div className="users-reference__footer"><p>Showing {(safePage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} payroll runs</p><div className="dashboard-reference__pager users-reference__pager"><button type="button" onClick={() => setPage(Math.max(1, safePage - 1))} disabled={safePage === 1}>Previous</button><div>{Array.from({ length: totalPages }, (_, index) => index + 1).map((nextPage) => <button key={nextPage} type="button" className={nextPage === safePage ? 'is-active' : undefined} onClick={() => setPage(nextPage)}>{nextPage}</button>)}</div><button type="button" onClick={() => setPage(Math.min(totalPages, safePage + 1))} disabled={safePage === totalPages}>Next</button></div></div>
          </section>
        </section>
      </section>
      {isModalOpen ? <div className="users-reference__modal-backdrop" role="presentation" onClick={() => setIsModalOpen(false)}><div className="users-reference__modal" role="dialog" aria-modal="true" aria-labelledby="new-payroll-title" onClick={(event) => event.stopPropagation()}><div className="dashboard-reference__panel-header"><div><h2 id="new-payroll-title">New Payroll Run</h2><p className="users-reference__subcopy">Create a payroll batch and set its initial release status.</p></div><button type="button" className="users-reference__modal-close" onClick={() => setIsModalOpen(false)}>Close</button></div><form className="users-reference__form" onSubmit={handleAdd}><label>Cycle<select value={formData.cycle} onChange={(event) => setFormData((current) => ({ ...current, cycle: event.target.value }))}>{cycles.map((value) => <option key={value} value={value}>{value}</option>)}</select></label><label>Employees<input value={formData.employees} onChange={(event) => setFormData((current) => ({ ...current, employees: event.target.value }))} placeholder="42 employees" /></label><label>Release date<input value={formData.releaseDate} onChange={(event) => setFormData((current) => ({ ...current, releaseDate: event.target.value }))} placeholder="2026-06-15" /></label><label>Payout<input value={formData.payout} onChange={(event) => setFormData((current) => ({ ...current, payout: event.target.value }))} placeholder="$48,000" /></label><label>Status<select value={formData.status} onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value as PayrollStatus }))}>{statuses.map((value) => <option key={value} value={value}>{value}</option>)}</select></label><div className="users-reference__modal-actions"><button type="button" className="users-reference__filter" onClick={() => setIsModalOpen(false)}>Cancel</button><button type="submit" className="dashboard-reference__soft-button users-reference__add"><FaPlus />Save Payroll Run</button></div></form></div></div> : null}
      {selectedRecord ? <div className="users-reference__modal-backdrop users-reference__modal-backdrop--premium" role="presentation" onClick={() => setSelectedRecord(null)}><div className="users-reference__modal payroll-reference__details-modal" role="dialog" aria-modal="true" aria-labelledby="payroll-view-title" onClick={(event) => event.stopPropagation()}><div className="dashboard-reference__panel-header"><div><h2 id="payroll-view-title">{selectedRecord.cycle}</h2><p className="users-reference__subcopy">Employee payroll breakdown for this selected run.</p></div><button type="button" className="users-reference__modal-close" onClick={() => setSelectedRecord(null)}>Close</button></div><div className="payroll-reference__details-meta"><article><span>Total employees</span><strong>{selectedRecord.employees}</strong></article><article><span>Release date</span><strong>{selectedRecord.releaseDate}</strong></article><article><span>Payout</span><strong>{selectedRecord.payout}</strong></article><article><span>Status</span><strong>{selectedRecord.status}</strong></article></div><div className="payroll-reference__details-table"><div className="payroll-reference__details-head"><span>Employee</span><span>Role</span><span>Gross Pay</span><span>Deductions</span><span>Net Pay</span><span>Status</span></div><div className="payroll-reference__details-body">{employeePayrollRows.map((employee) => <article key={employee.id} className="payroll-reference__details-row"><div className="users-reference__name"><div className="dashboard-reference__avatar dashboard-reference__avatar--small">{employee.name.slice(0, 2).toUpperCase()}</div><strong>{employee.name}</strong></div><span>{employee.role}</span><span>{employee.grossPay}</span><span>{employee.deductions}</span><span>{employee.netPay}</span><span className={`users-reference__status payroll-reference__detail-status--${employee.status.toLowerCase()}`}>{employee.status}</span></article>)}</div></div></div></div> : null}
    </main>
  )
}

