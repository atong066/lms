import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBell, FaBookOpen, FaCalendarAlt, FaChartLine, FaCog, FaEnvelope, FaFileAlt, FaFilter, FaGraduationCap, FaHome, FaPlus, FaRegCircle, FaSearch, FaSignOutAlt, FaUserCheck, FaUserClock, FaUserGraduate, FaUsers } from 'react-icons/fa'

type LeaveRecord = {
  id: string
  employee: string
  department: string
  leaveType: string
  dates: string
  status: 'Approved' | 'Review' | 'Filed'
  reason: string
  dateFiled: string
  coverage: string
  approver: string
}

type LeaveStatus = LeaveRecord['status']
type LeaveRequestDetail = LeaveRecord
const ITEMS_PER_PAGE = 10
const departments = ['Registrar', 'Human Resources', 'Admissions', 'Payroll']
const leaveTypes = ['Vacation Leave', 'Sick Leave', 'Emergency Leave', 'Service Credit']
const statuses: LeaveStatus[] = ['Approved', 'Review', 'Filed']
const employeeNames = ['Jordan Cruz', 'Marina Santos', 'Alden Tan', 'Camille Lee', 'Victor Ramos', 'Isabel Ong']
const navItems = [
  { icon: FaHome, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: FaUserGraduate, label: 'Students', to: '/admin/students' },
  { icon: FaBookOpen, label: 'Courses', to: '/admin/courses' },
  { icon: FaUsers, label: 'Admissions', to: '/admin/admissions' },
  { icon: FaUserCheck, label: 'Employees', to: '/admin/employees' },
  { icon: FaUserClock, label: 'Leave', to: '/admin/leave', active: true },
  { icon: FaChartLine, label: 'Payroll', to: '/admin/payroll' },
  { icon: FaFileAlt, label: 'Documents', to: '/admin/documents' },
  { icon: FaFileAlt, label: 'Reports', to: '/admin/reports' },
  { icon: FaCalendarAlt, label: 'Calendar', to: '/admin/calendar' },
  { icon: FaCog, label: 'Settings', to: '/admin/settings' },
]
const initialRecords: LeaveRecord[] = Array.from({ length: 24 }, (_, index) => ({
  id: String(index + 1),
  employee: employeeNames[index % employeeNames.length],
  department: departments[index % departments.length],
  leaveType: leaveTypes[index % leaveTypes.length],
  dates: `Apr ${String(3 + index).padStart(2, '0')} - Apr ${String(4 + index).padStart(2, '0')}`,
  status: statuses[index % statuses.length],
  reason: 'Leave request awaiting review.',
  dateFiled: `2026-03-${String(10 + (index % 12)).padStart(2, '0')}`,
  coverage: `${departments[index % departments.length]} desk reassigned to backup support`,
  approver: statuses[index % statuses.length] === 'Approved' ? 'John Doe' : 'Pending HR review',
}))

export default function Leave() {
  const [records, setRecords] = useState<LeaveRecord[]>(initialRecords)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<LeaveRequestDetail | null>(null)
  const [formData, setFormData] = useState({ employee: employeeNames[0], department: departments[0], leaveType: leaveTypes[0], dates: '', status: 'Filed' as LeaveStatus })
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return records
    return records.filter((record) => [record.employee, record.department, record.leaveType, record.dates, record.status].some((value) => value.toLowerCase().includes(query)))
  }, [records, search])
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const currentRows = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)
  const addRecord = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formData.dates.trim()) return
    const nextRecord: LeaveRecord = {
      id: String(records.length + 1),
      ...formData,
      reason: 'Leave request awaiting review.',
      dateFiled: '2026-03-25',
      coverage: `${formData.department} desk reassigned to backup support`,
      approver: 'Pending HR review',
    }
    setRecords((current) => [nextRecord, ...current])
    setFormData({ employee: employeeNames[0], department: departments[0], leaveType: leaveTypes[0], dates: '', status: 'Filed' })
    setSearch('')
    setPage(1)
    setIsModalOpen(false)
  }

  const openLeaveDetails = (record: LeaveRecord) => {
    setSelectedRecord(record)
  }

  const updateSelectedLeaveStatus = (status: LeaveStatus) => {
    if (!selectedRecord) return

    const updated: LeaveRecord = {
      ...selectedRecord,
      status,
      approver: status === 'Approved' ? 'John Doe' : status === 'Review' ? 'Pending HR review' : 'Request returned to employee',
    }
    setRecords((current) => current.map((record) => (record.id === updated.id ? updated : record)))
    setSelectedRecord(updated)
  }

  return (
    <main className="dashboard-page dashboard-reference users-reference-page">
      <aside className="dashboard-reference__sidebar">
        <div className="dashboard-reference__brand"><span className="dashboard-reference__brand-icon"><FaGraduationCap /></span><div><strong>NALAKA LMS</strong><span>Registrar & HR</span></div></div>
        <div className="dashboard-reference__profile"><div className="dashboard-reference__avatar">JD</div><div className="dashboard-reference__profile-copy"><strong>John Doe</strong><span>HR Lead</span></div><em>3</em></div>
        <nav className="dashboard-reference__nav" aria-label="Portal navigation">{navItems.map((item) => { const Icon = item.icon; const content = <><Icon /><span>{item.label}</span></>; return item.to === '#' ? <a href="#" key={item.label} className={item.active ? 'is-active' : undefined}>{content}</a> : <Link key={item.label} to={item.to} className={item.active ? 'is-active' : undefined}>{content}</Link> })}</nav>
        <button type="button" className="dashboard-reference__logout"><span><FaSignOutAlt />Logout</span><span aria-hidden="true">{'>'}</span></button>
      </aside>
      <section className="dashboard-reference__main">
        <header className="dashboard-reference__topbar"><div className="dashboard-reference__topbar-user"><div className="dashboard-reference__avatar dashboard-reference__avatar--small">JD</div><strong>John Doe</strong></div><div className="dashboard-reference__topbar-actions"><button type="button" className="has-badge"><FaBell /><span>5</span></button><button type="button"><FaEnvelope /></button><button type="button"><FaCog /></button><button type="button"><FaRegCircle /></button><div className="dashboard-reference__avatar dashboard-reference__avatar--small">JD</div></div></header>
        <section className="dashboard-reference__content users-reference">
          <h1>Leave Management</h1>
          <section className="users-reference__stats" aria-label="Leave summary">
            <article className="users-reference__stat"><FaUsers /><div><strong>{records.length}</strong><span>Total requests</span></div></article>
            <article className="users-reference__stat"><FaUserCheck /><div><strong>{records.filter((r) => r.status === 'Approved').length}</strong><span>Approved</span></div></article>
            <article className="users-reference__stat"><FaUserClock /><div><strong>{records.filter((r) => r.status === 'Review').length}</strong><span>For review</span></div></article>
            <article className="users-reference__stat"><FaGraduationCap /><div><strong>{records.filter((r) => r.status === 'Filed').length}</strong><span>Filed</span></div></article>
          </section>
          <section className="dashboard-reference__panel users-reference__panel">
            <div className="dashboard-reference__panel-header"><div><h2>Leave Requests</h2><p className="users-reference__subcopy">Track employee leave filings, department coverage, and approval status.</p></div><button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => setIsModalOpen(true)}><FaPlus />File Leave</button></div>
            <div className="users-reference__toolbar"><label className="users-reference__search"><FaSearch /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Search by employee, department, or leave type" /></label><button type="button" className="users-reference__filter"><FaFilter />Filters</button></div>
            <div className="users-reference__table leave-reference__table">
              <div className="users-reference__head users-reference__head--enhanced leave-reference__head"><span>Employee</span><span>Department</span><span>Leave Type</span><span>Dates</span><span>Status</span><span>Action</span></div>
              {currentRows.map((record) => <article key={record.id} className="users-reference__row users-reference__row--enhanced leave-reference__row"><div className="users-reference__name"><div className="dashboard-reference__avatar dashboard-reference__avatar--small">{record.employee.slice(0, 2).toUpperCase()}</div><strong>{record.employee}</strong></div><span>{record.department}</span><span>{record.leaveType}</span><span>{record.dates}</span><span className={`users-reference__status leave-reference__status--${record.status.toLowerCase()}`}>{record.status}</span><button type="button" className="employees-reference__view" onClick={() => openLeaveDetails(record)}>View</button></article>)}
            </div>
            <div className="users-reference__footer"><p>Showing {(safePage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} leave requests</p><div className="dashboard-reference__pager users-reference__pager"><button type="button" onClick={() => setPage(Math.max(1, safePage - 1))} disabled={safePage === 1}>Previous</button><div>{Array.from({ length: totalPages }, (_, index) => index + 1).map((nextPage) => <button key={nextPage} type="button" className={nextPage === safePage ? 'is-active' : undefined} onClick={() => setPage(nextPage)}>{nextPage}</button>)}</div><button type="button" onClick={() => setPage(Math.min(totalPages, safePage + 1))} disabled={safePage === totalPages}>Next</button></div></div>
          </section>
        </section>
      </section>
      {isModalOpen ? <div className="users-reference__modal-backdrop" role="presentation" onClick={() => setIsModalOpen(false)}><div className="users-reference__modal" role="dialog" aria-modal="true" aria-labelledby="file-leave-title" onClick={(event) => event.stopPropagation()}><div className="dashboard-reference__panel-header"><div><h2 id="file-leave-title">File Leave</h2><p className="users-reference__subcopy">Create a leave record for HR review and approval routing.</p></div><button type="button" className="users-reference__modal-close" onClick={() => setIsModalOpen(false)}>Close</button></div><form className="users-reference__form" onSubmit={addRecord}><label>Employee<select value={formData.employee} onChange={(event) => setFormData((current) => ({ ...current, employee: event.target.value }))}>{employeeNames.map((value) => <option key={value} value={value}>{value}</option>)}</select></label><label>Department<select value={formData.department} onChange={(event) => setFormData((current) => ({ ...current, department: event.target.value }))}>{departments.map((value) => <option key={value} value={value}>{value}</option>)}</select></label><label>Leave type<select value={formData.leaveType} onChange={(event) => setFormData((current) => ({ ...current, leaveType: event.target.value }))}>{leaveTypes.map((value) => <option key={value} value={value}>{value}</option>)}</select></label><label>Dates<input value={formData.dates} onChange={(event) => setFormData((current) => ({ ...current, dates: event.target.value }))} placeholder="Apr 15 - Apr 17" /></label><label>Status<select value={formData.status} onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value as LeaveStatus }))}>{statuses.map((value) => <option key={value} value={value}>{value}</option>)}</select></label><div className="users-reference__modal-actions"><button type="button" className="users-reference__filter" onClick={() => setIsModalOpen(false)}>Cancel</button><button type="submit" className="dashboard-reference__soft-button users-reference__add"><FaPlus />Save Leave</button></div></form></div></div> : null}
      {selectedRecord ? <div className="users-reference__modal-backdrop users-reference__modal-backdrop--premium" role="presentation" onClick={() => setSelectedRecord(null)}><div className="users-reference__modal leave-reference__details-modal" role="dialog" aria-modal="true" aria-labelledby="leave-details-title" onClick={(event) => event.stopPropagation()}><div className="dashboard-reference__panel-header"><div><h2 id="leave-details-title">{selectedRecord.employee}</h2><p className="users-reference__subcopy">Review the leave request details before final approval or return.</p></div><button type="button" className="users-reference__modal-close" onClick={() => setSelectedRecord(null)}>Close</button></div><div className="leave-reference__details-grid"><article><span>Department</span><strong>{selectedRecord.department}</strong></article><article><span>Leave Type</span><strong>{selectedRecord.leaveType}</strong></article><article><span>Requested Dates</span><strong>{selectedRecord.dates}</strong></article><article><span>Date Filed</span><strong>{selectedRecord.dateFiled}</strong></article><article><span>Approver</span><strong>{selectedRecord.approver}</strong></article><article><span>Status</span><strong>{selectedRecord.status}</strong></article></div><div className="leave-reference__details-body"><section><h3>Reason</h3><p>{selectedRecord.reason}</p></section><section><h3>Coverage Plan</h3><p>{selectedRecord.coverage}</p></section></div><div className="leave-reference__details-actions"><button type="button" className="users-reference__filter" onClick={() => updateSelectedLeaveStatus('Filed')}>Decline</button><button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => updateSelectedLeaveStatus('Approved')}>Approve</button></div></div></div> : null}
    </main>
  )
}

