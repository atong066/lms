import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBell,
  FaBookOpen,
  FaCalendarAlt,
  FaChartLine,
  FaCog,
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
  FaUserCheck,
  FaUserClock,
  FaUserGraduate,
  FaUsers,
} from 'react-icons/fa'

type EmployeeRecord = {
  id: string
  employeeId: string
  name: string
  position: string
  department: string
  employmentType: string
  status: 'Active' | 'Probationary' | 'On Leave'
}

type EmployeeStatus = EmployeeRecord['status']
type EmployeeTab = 'Profile' | 'Attendance' | 'Teaching Load' | 'Payroll' | 'Files'
type EmployeeCreateStep = 1 | 2 | 3

const ITEMS_PER_PAGE = 10
const positions = ['Registrar Assistant', 'HR Officer', 'Guidance Coordinator', 'Admissions Specialist', 'Payroll Clerk', 'Faculty Affairs Staff']
const departments = ['Registrar', 'Human Resources', 'Admissions', 'Payroll', 'Faculty Affairs']
const employmentTypes = ['Full-time', 'Contract', 'Part-time']
const statuses: EmployeeStatus[] = ['Active', 'Probationary', 'On Leave']
const detailTabs: EmployeeTab[] = ['Profile', 'Attendance', 'Teaching Load', 'Payroll', 'Files']
const createSteps: Array<{ id: EmployeeCreateStep; label: string; title: string }> = [
  { id: 1, label: 'Personal', title: 'Personal Data' },
  { id: 2, label: 'Employment', title: 'Employment Details' },
  { id: 3, label: 'Review', title: 'Review and Submit' },
]

const navItems = [
  { icon: FaHome, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: FaUserGraduate, label: 'Students', to: '/admin/students' },
  { icon: FaBookOpen, label: 'Courses', to: '/admin/courses' },
  { icon: FaUsers, label: 'Admissions', to: '/admin/admissions' },
  { icon: FaUserCheck, label: 'Employees', to: '/admin/employees', active: true },
  { icon: FaUserClock, label: 'Leave', to: '/admin/leave' },
  { icon: FaChartLine, label: 'Payroll', to: '/admin/payroll' },
  { icon: FaFileAlt, label: 'Documents', to: '/admin/documents' },
  { icon: FaFileAlt, label: 'Reports', to: '/admin/reports' },
  { icon: FaCalendarAlt, label: 'Calendar', to: '/admin/calendar' },
  { icon: FaCog, label: 'Settings', to: '/admin/settings' },
]

const firstNames = ['Isabel', 'Jordan', 'Marina', 'Leo', 'Samantha', 'Alden', 'Camille', 'Victor']
const lastNames = ['Ramos', 'Cruz', 'Dela Cruz', 'Tan', 'Garcia', 'Lee', 'Ong', 'Santos']

const initialRecords: EmployeeRecord[] = Array.from({ length: 28 }, (_, index) => ({
  id: String(index + 1),
  employeeId: `EMP-26-${String(index + 1).padStart(4, '0')}`,
  name: `${firstNames[index % firstNames.length]} ${lastNames[(index * 2) % lastNames.length]}`,
  position: positions[index % positions.length],
  department: departments[index % departments.length],
  employmentType: employmentTypes[index % employmentTypes.length],
  status: statuses[index % statuses.length],
}))

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(amount)
}

export default function Employees() {
  const [records, setRecords] = useState<EmployeeRecord[]>(initialRecords)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [createStep, setCreateStep] = useState<EmployeeCreateStep>(1)
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRecord | null>(null)
  const [activeTab, setActiveTab] = useState<EmployeeTab>('Profile')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    civilStatus: 'Single',
    position: positions[0],
    department: departments[0],
    employmentType: employmentTypes[0],
    dateJoined: '',
    status: 'Active' as EmployeeStatus,
  })
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return records
    return records.filter((record) =>
      [record.employeeId, record.name, record.position, record.department, record.employmentType, record.status].some((value) =>
        value.toLowerCase().includes(query),
      ),
    )
  }, [records, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const currentRows = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)

  const employeeDetails = useMemo(() => {
    if (!selectedEmployee) return null

    const employeeSeed = Number.parseInt(selectedEmployee.employeeId.split('-').at(-1) ?? '1', 10)
    const baseSalary = 24000 + employeeSeed * 850
    const allowances = 2500 + employeeSeed * 110
    const deductions = 850
    const attendanceRate = 88 + (employeeSeed % 10)

    return {
      profile: [
        ['Employee ID', selectedEmployee.employeeId],
        ['Status', selectedEmployee.status],
        ['Department', selectedEmployee.department],
        ['Role', selectedEmployee.position],
        ['Date Joined', `Jan ${10 + (employeeSeed % 14)}, 2024`],
        ['Phone', `+63 917 55${String(100 + employeeSeed).slice(-3)} ${String(2000 + employeeSeed).slice(-4)}`],
        ['Date of Birth', `Dec ${10 + (employeeSeed % 10)}, 199${employeeSeed % 10}`],
        ['Address', 'San Fernando, Pampanga, Philippines'],
      ],
      attendance: [
        ['Attendance Rate', `${attendanceRate}%`],
        ['Present Days', `${19 + (employeeSeed % 4)} / 22 days`],
        ['Late Incidents', `${employeeSeed % 3}`],
        ['Approved Leaves', `${1 + (employeeSeed % 2)} records`],
        ['Daily Time Record', 'Submitted and verified'],
        ['Last Attendance Sync', 'March 24, 2026'],
      ],
      attendanceTable: [
        ['Mon, Apr 1', 'Present', '9:01 AM', '5:03 PM', '--', '--'],
        ['Tue, Apr 2', 'Present', '9:02 AM', '5:03 PM', '10 min', '--'],
        ['Wed, Apr 3', 'Present', '9:01 AM', '5:03 PM', '--', '1h'],
        ['Thu, Apr 4', 'Absent', '--', '--', '--', '--'],
        ['Mon, Apr 8', 'Absent', '9:02 AM', '--', '15 min', '--'],
        ['Tue, Apr 9', 'Late', '9:04 AM', '5:30 PM', '--', '--'],
        ['Wed, Apr 10', 'Present', '9:02 AM', '6:02 PM', '2h', '55 min'],
      ],
      teachingLoad: [
        ['Current Assignment', selectedEmployee.department === 'Faculty Affairs' ? '3 active class sections' : 'Administrative workload focus'],
        ['Weekly Hours', `${34 + (employeeSeed % 6)} hrs`],
        ['Advisory / Support', selectedEmployee.department === 'Admissions' ? 'Admissions desk support' : 'Internal operations support'],
        ['Term Note', selectedEmployee.status === 'On Leave' ? 'Coverage reassigned this term' : 'Schedule confirmed for current term'],
        ['Lead Area', selectedEmployee.department],
        ['Room / Station', `Office ${2 + (employeeSeed % 6)}B`],
      ],
      teachingLoadTable: [
        ['EDU 101', 'Foundations of Learning', '3', '54 hrs', 'MWF 8:00-9:00', 'Room 204', '42'],
        ['EDU 214', 'Assessment Design', '3', '54 hrs', 'TTH 10:00-11:30', 'Room 308', '38'],
        ['EDU 320', 'Curriculum Planning', '2', '36 hrs', 'F 1:00-4:00', 'Room 116', '31'],
      ],
      payroll: [
        ['Basic Salary', formatCurrency(baseSalary)],
        ['Overtime Pay', formatCurrency(0)],
        ['Deductions', formatCurrency(deductions)],
        ['Bonuses', formatCurrency(allowances)],
        ['Net Pay', formatCurrency(baseSalary + allowances - deductions)],
        ['Bank Name', 'Land Bank of the Philippines'],
        ['Account Number', '**** **** 20987'],
        ['Release Cycle', 'Monthly payroll'],
      ],
      payrollBreakdown: [
        ['Basic Salary', formatCurrency(baseSalary), 'earning'],
        ['Overtime Pay', formatCurrency(0), 'earning'],
        ['Bonuses', formatCurrency(allowances), 'earning'],
        ['Deductions', formatCurrency(deductions), 'deduction'],
        ['Net Pay', formatCurrency(baseSalary + allowances - deductions), 'net'],
      ] as Array<[string, string, string]>,
      files: [
        ['201 File', 'Updated March 2026'],
        ['Contract / Appointment', selectedEmployee.employmentType === 'Contract' ? 'Contract agreement on file' : 'Appointment papers on file'],
        ['Government IDs', 'SSS, PhilHealth, Pag-IBIG verified'],
        ['Recent Upload', selectedEmployee.status === 'Probationary' ? 'Evaluation checklist pending signature' : 'No pending document requests'],
        ['Performance File', 'Latest review attached'],
        ['Clearances', 'All compliance records complete'],
      ],
      fileInventory: [
        ['201 File', 'PDF', 'Updated March 2026', '2.4 MB', 'Complete'],
        ['Contract / Appointment', 'PDF', selectedEmployee.employmentType === 'Contract' ? 'Contract agreement on file' : 'Appointment papers on file', '1.8 MB', 'Complete'],
        ['Government IDs', 'ZIP', 'SSS, PhilHealth, Pag-IBIG verified', '4.1 MB', 'Verified'],
        ['Recent Upload', 'PDF', selectedEmployee.status === 'Probationary' ? 'Evaluation checklist pending signature' : 'No pending document requests', '1.2 MB', selectedEmployee.status === 'Probationary' ? 'Pending' : 'Complete'],
        ['Performance File', 'PDF', 'Latest review attached', '1.6 MB', 'Archived'],
        ['Clearances', 'PDF', 'All compliance records complete', '900 KB', 'Complete'],
        ['Medical Clearance', 'PDF', 'Annual medical fit-to-work certificate', '780 KB', 'Verified'],
        ['Training Certificates', 'ZIP', 'Compiled 2025 seminars and workshops', '5.3 MB', 'Archived'],
        ['Leave Documentation', 'PDF', 'Approved leave attachments and endorsements', '1.1 MB', 'Complete'],
        ['NDA and Policy Forms', 'PDF', 'Signed confidentiality and policy acknowledgements', '650 KB', 'Complete'],
        ['Tax Forms', 'PDF', 'Latest BIR payroll attachments', '1.4 MB', 'Verified'],
        ['Equipment Accountability', 'PDF', 'Assigned assets and accountability forms', '720 KB', 'Complete'],
      ] as Array<[string, string, string, string, string]>,
      activity: [
        ['Payroll processed total released', '2 hours ago'],
        ['Role information updated', '1 month ago'],
        ['Employee profile created', '2 years ago'],
      ],
    }
  }, [selectedEmployee])

  const activeDetailRows =
    !employeeDetails ? [] :
    activeTab === 'Profile' ? employeeDetails.profile :
    activeTab === 'Attendance' ? employeeDetails.attendance :
    activeTab === 'Teaching Load' ? employeeDetails.teachingLoad :
    activeTab === 'Payroll' ? employeeDetails.payroll :
    employeeDetails.files

  const profileLeftRows = activeTab === 'Profile' ? activeDetailRows : []
  const profilePayrollRows = employeeDetails?.payroll.slice(0, 5) ?? []
  const profilePayrollInfoRows = employeeDetails?.payroll.slice(5) ?? []

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = formData.name.trim()
    if (!name) return

    const nextRecord: EmployeeRecord = {
      id: String(records.length + 1),
      employeeId: `EMP-26-${String(records.length + 1).padStart(4, '0')}`,
      name,
      position: formData.position,
      department: formData.department,
      employmentType: formData.employmentType,
      status: formData.status,
    }
    setRecords((current) => [nextRecord, ...current])

    setFormData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      civilStatus: 'Single',
      position: positions[0],
      department: departments[0],
      employmentType: employmentTypes[0],
      dateJoined: '',
      status: 'Active',
    })
    setSearch('')
    setPage(1)
    setIsCreateModalOpen(false)
    setCreateStep(1)
  }

  const openEmployeeDetails = (record: EmployeeRecord) => {
    setSelectedEmployee(record)
    setActiveTab('Profile')
  }

  const openCreateModal = () => {
    setCreateStep(1)
    setIsCreateModalOpen(true)
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
    setCreateStep(1)
  }

  const canProceedFromCurrentStep =
    createStep === 1
      ? Boolean(formData.name.trim() && formData.email.trim() && formData.phone.trim())
      : createStep === 2
        ? Boolean(formData.position && formData.department && formData.employmentType && formData.dateJoined)
        : true

  return (
    <main className="dashboard-page dashboard-reference users-reference-page">
      <aside className="dashboard-reference__sidebar">
        <div className="dashboard-reference__brand"><span className="dashboard-reference__brand-icon"><FaGraduationCap /></span><div><strong>NALAKA LMS</strong><span>Registrar & HR</span></div></div>
        <div className="dashboard-reference__profile"><div className="dashboard-reference__avatar">JD</div><div className="dashboard-reference__profile-copy"><strong>John Doe</strong><span>HR Lead</span></div><em>3</em></div>
        <nav className="dashboard-reference__nav" aria-label="Portal navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            const content = <><Icon /><span>{item.label}</span></>
            return item.to === '#' ? <a href="#" key={item.label} className={item.active ? 'is-active' : undefined}>{content}</a> : <Link key={item.label} to={item.to} className={item.active ? 'is-active' : undefined}>{content}</Link>
          })}
        </nav>
        <button type="button" className="dashboard-reference__logout"><span><FaSignOutAlt />Logout</span><span aria-hidden="true">{'>'}</span></button>
      </aside>

      <section className="dashboard-reference__main">
        <header className="dashboard-reference__topbar">
          <div className="dashboard-reference__topbar-user"><div className="dashboard-reference__avatar dashboard-reference__avatar--small">JD</div><strong>John Doe</strong></div>
          <div className="dashboard-reference__topbar-actions">
            <button type="button" className="has-badge"><FaBell /><span>5</span></button>
            <button type="button"><FaEnvelope /></button>
            <button type="button"><FaCog /></button>
            <button type="button"><FaRegCircle /></button>
            <div className="dashboard-reference__avatar dashboard-reference__avatar--small">JD</div>
          </div>
        </header>

        <section className="dashboard-reference__content users-reference">
          <h1>Employees</h1>
          <section className="users-reference__stats" aria-label="Employee summary">
            <article className="users-reference__stat"><FaUsers /><div><strong>{records.length}</strong><span>Total employees</span></div></article>
            <article className="users-reference__stat"><FaUserCheck /><div><strong>{records.filter((r) => r.status === 'Active').length}</strong><span>Active</span></div></article>
            <article className="users-reference__stat"><FaUserClock /><div><strong>{records.filter((r) => r.status === 'Probationary').length}</strong><span>Probationary</span></div></article>
            <article className="users-reference__stat"><FaGraduationCap /><div><strong>{records.filter((r) => r.status === 'On Leave').length}</strong><span>On leave</span></div></article>
          </section>

          <section className="dashboard-reference__panel users-reference__panel">
            <div className="dashboard-reference__panel-header">
              <div><h2>Employee Directory</h2><p className="users-reference__subcopy">Maintain registrar and HR personnel records, positions, employment types, and individual employee files.</p></div>
              <button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={openCreateModal}><FaPlus />Add Employee</button>
            </div>
            <div className="users-reference__toolbar">
              <label className="users-reference__search"><FaSearch /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Search by employee ID, name, or department" /></label>
              <button type="button" className="users-reference__filter"><FaFilter />Filters</button>
            </div>
            <div className="users-reference__table employees-reference__table">
              <div className="users-reference__head users-reference__head--enhanced employees-reference__head">
                <span>Employee</span><span>ID</span><span>Position</span><span>Department</span><span>Employment</span><span>Status</span><span>Details</span>
              </div>
              {currentRows.map((record) => (
                <article key={record.id} className="users-reference__row users-reference__row--enhanced employees-reference__row">
                  <div className="users-reference__name">
                    <div className="dashboard-reference__avatar dashboard-reference__avatar--small">{record.name.slice(0, 2).toUpperCase()}</div>
                    <strong>{record.name}</strong>
                  </div>
                  <span>{record.employeeId}</span>
                  <span>{record.position}</span>
                  <span>{record.department}</span>
                  <span>{record.employmentType}</span>
                  <span className={`users-reference__status employees-reference__status--${record.status.toLowerCase().replace(' ', '-')}`}>{record.status}</span>
                  <button type="button" className="employees-reference__view" onClick={() => openEmployeeDetails(record)}>View Details</button>
                </article>
              ))}
            </div>
            <div className="users-reference__footer">
              <p>Showing {(safePage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} employees</p>
              <div className="dashboard-reference__pager users-reference__pager">
                <button type="button" onClick={() => setPage(Math.max(1, safePage - 1))} disabled={safePage === 1}>Previous</button>
                <div>{Array.from({ length: totalPages }, (_, index) => index + 1).map((nextPage) => <button key={nextPage} type="button" className={nextPage === safePage ? 'is-active' : undefined} onClick={() => setPage(nextPage)}>{nextPage}</button>)}</div>
                <button type="button" onClick={() => setPage(Math.min(totalPages, safePage + 1))} disabled={safePage === totalPages}>Next</button>
              </div>
            </div>
          </section>
        </section>
      </section>

      {isCreateModalOpen ? (
        <div className="users-reference__modal-backdrop users-reference__modal-backdrop--premium" role="presentation" onClick={closeCreateModal}>
          <div className="users-reference__modal employees-reference__create-modal" role="dialog" aria-modal="true" aria-labelledby="add-employee-title" onClick={(event) => event.stopPropagation()}>
            <div className="employees-reference__create-header">
              <div>
                <p className="employees-reference__create-kicker">Personal Data Sheet</p>
                <h2 id="add-employee-title">Add Employee</h2>
                <p className="users-reference__subcopy">Capture personal information, employment assignment, and final record details in guided steps.</p>
              </div>
              <button type="button" className="users-reference__modal-close" onClick={closeCreateModal}>Close</button>
            </div>

            <div className="employees-reference__create-steps" aria-label="Employee creation steps">
              {createSteps.map((step) => (
                <div key={step.id} className={`employees-reference__create-step${step.id === createStep ? ' is-active' : ''}${step.id < createStep ? ' is-complete' : ''}`}>
                  <span>{step.id}</span>
                  <div>
                    <strong>{step.label}</strong>
                    <small>{step.title}</small>
                  </div>
                </div>
              ))}
            </div>

            <form className="users-reference__form employees-reference__create-form" onSubmit={handleAdd}>
              {createStep === 1 ? (
                <div className="employees-reference__sheet">
                  <div className="employees-reference__sheet-head">
                    <h3>Personal Information</h3>
                    <span>Identity and contact details</span>
                  </div>
                  <label>Full name<input value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} placeholder="Marina Santos" /></label>
                  <label>Email address<input type="email" value={formData.email} onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))} placeholder="marina.santos@nalaka.edu" /></label>
                  <label>Phone number<input value={formData.phone} onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))} placeholder="+63 917 555 1022" /></label>
                  <label>Date of birth<input type="date" value={formData.dateOfBirth} onChange={(event) => setFormData((current) => ({ ...current, dateOfBirth: event.target.value }))} /></label>
                  <label>Civil status<select value={formData.civilStatus} onChange={(event) => setFormData((current) => ({ ...current, civilStatus: event.target.value }))}><option>Single</option><option>Married</option><option>Widowed</option><option>Separated</option></select></label>
                  <label className="employees-reference__sheet-span">Home address<input value={formData.address} onChange={(event) => setFormData((current) => ({ ...current, address: event.target.value }))} placeholder="San Fernando, Pampanga, Philippines" /></label>
                </div>
              ) : null}

              {createStep === 2 ? (
                <div className="employees-reference__sheet">
                  <div className="employees-reference__sheet-head">
                    <h3>Employment Details</h3>
                    <span>Assignment, department, and service status</span>
                  </div>
                  <label>Position<select value={formData.position} onChange={(event) => setFormData((current) => ({ ...current, position: event.target.value }))}>{positions.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
                  <label>Department<select value={formData.department} onChange={(event) => setFormData((current) => ({ ...current, department: event.target.value }))}>{departments.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
                  <label>Employment type<select value={formData.employmentType} onChange={(event) => setFormData((current) => ({ ...current, employmentType: event.target.value }))}>{employmentTypes.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
                  <label>Date joined<input type="date" value={formData.dateJoined} onChange={(event) => setFormData((current) => ({ ...current, dateJoined: event.target.value }))} /></label>
                  <label>Status<select value={formData.status} onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value as EmployeeStatus }))}>{statuses.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
                </div>
              ) : null}

              {createStep === 3 ? (
                <div className="employees-reference__review">
                  <div className="employees-reference__sheet-head">
                    <h3>Review Record</h3>
                    <span>Confirm the employee personal data sheet before saving</span>
                  </div>
                  <div className="employees-reference__review-grid">
                    <article><span>Full name</span><strong>{formData.name || '-'}</strong></article>
                    <article><span>Email</span><strong>{formData.email || '-'}</strong></article>
                    <article><span>Phone</span><strong>{formData.phone || '-'}</strong></article>
                    <article><span>Date of birth</span><strong>{formData.dateOfBirth || '-'}</strong></article>
                    <article><span>Civil status</span><strong>{formData.civilStatus}</strong></article>
                    <article><span>Address</span><strong>{formData.address || '-'}</strong></article>
                    <article><span>Position</span><strong>{formData.position}</strong></article>
                    <article><span>Department</span><strong>{formData.department}</strong></article>
                    <article><span>Employment</span><strong>{formData.employmentType}</strong></article>
                    <article><span>Date joined</span><strong>{formData.dateJoined || '-'}</strong></article>
                    <article><span>Status</span><strong>{formData.status}</strong></article>
                  </div>
                </div>
              ) : null}

              <div className="users-reference__modal-actions employees-reference__create-actions">
                <button type="button" className="users-reference__filter" onClick={createStep === 1 ? closeCreateModal : () => setCreateStep((current) => Math.max(1, current - 1) as EmployeeCreateStep)}>
                  {createStep === 1 ? 'Cancel' : 'Back'}
                </button>
                {createStep < 3 ? (
                  <button type="button" className="dashboard-reference__soft-button users-reference__add" onClick={() => setCreateStep((current) => Math.min(3, current + 1) as EmployeeCreateStep)} disabled={!canProceedFromCurrentStep}>
                    Next Step
                  </button>
                ) : (
                  <button type="submit" className="dashboard-reference__soft-button users-reference__add">
                    <FaPlus />Save Employee
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {selectedEmployee && employeeDetails ? (
        <div className="users-reference__modal-backdrop users-reference__modal-backdrop--premium" role="presentation" onClick={() => setSelectedEmployee(null)}>
          <div className="users-reference__modal employees-reference__details-modal" role="dialog" aria-modal="true" aria-labelledby="employee-details-title" onClick={(event) => event.stopPropagation()}>
            <div className="employees-reference__details-header">
              <div className="employees-reference__details-identity">
                <div className="dashboard-reference__avatar">{selectedEmployee.name.slice(0, 2).toUpperCase()}</div>
                <div>
                  <h2 id="employee-details-title">{selectedEmployee.name}</h2>
                  <p>{selectedEmployee.name.toLowerCase().replace(/ /g, '.')}@nalaka.edu</p>
                  <div className="employees-reference__details-badges">
                    <span>{selectedEmployee.position}</span>
                    <span>{selectedEmployee.department}</span>
                    <span className={`employees-reference__badge employees-reference__badge--${selectedEmployee.status.toLowerCase().replace(' ', '-')}`}>{selectedEmployee.status}</span>
                  </div>
                </div>
              </div>
              <div className="employees-reference__details-actions">
                <button type="button" className="employees-reference__edit-button">Edit</button>
                <button type="button" className="users-reference__modal-close" onClick={() => setSelectedEmployee(null)}>Close</button>
              </div>
            </div>

            <div className="employees-reference__tabs" role="tablist" aria-label="Employee detail tabs">
              {detailTabs.map((tab) => (
                <button key={tab} type="button" className={tab === activeTab ? 'is-active' : undefined} onClick={() => setActiveTab(tab)}>
                  {tab}
                </button>
              ))}
            </div>

            <section className="employees-reference__details-body">
              <div className="employees-reference__details-summary">
                <article>
                  <span>Employee ID</span>
                  <strong>{selectedEmployee.employeeId}</strong>
                </article>
                <article>
                  <span>Employment</span>
                  <strong>{selectedEmployee.employmentType}</strong>
                </article>
                <article>
                  <span>Current Status</span>
                  <strong>{selectedEmployee.status}</strong>
                </article>
              </div>

              {activeTab === 'Profile' ? (
                <div className="employees-reference__profile-layout">
                  <div className="employees-reference__profile-sheet">
                    <section className="employees-reference__profile-column">
                      <div className="employees-reference__profile-list">
                        {profileLeftRows.map(([label, value]) => (
                          <div key={label} className="employees-reference__profile-row">
                            <span>{label}</span>
                            <strong>{value}</strong>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="employees-reference__profile-column employees-reference__profile-column--payroll">
                      <div className="employees-reference__profile-list employees-reference__profile-list--compact">
                        {profilePayrollRows.map(([label, value]) => (
                          <div key={label} className="employees-reference__profile-row employees-reference__profile-row--payroll">
                            <span>{label}</span>
                            <strong>{value}</strong>
                          </div>
                        ))}
                      </div>

                      <div className="employees-reference__profile-subsection">
                        <div className="employees-reference__profile-subhead">
                          <h4>Payroll Information</h4>
                        </div>
                        <div className="employees-reference__profile-list employees-reference__profile-list--compact">
                          {profilePayrollInfoRows.map(([label, value]) => (
                            <div key={label} className="employees-reference__profile-row employees-reference__profile-row--payroll">
                              <span>{label}</span>
                              <strong>{value}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="employees-reference__activity-panel employees-reference__activity-panel--full">
                    <div className="employees-reference__activity-header">
                      <h3>Recent Activities</h3>
                      <span>Latest updates</span>
                    </div>
                    <div className="employees-reference__activity-list">
                      {employeeDetails.activity.map(([label, time]) => (
                        <article key={`${label}-${time}`} className="employees-reference__activity-item">
                          <div className="dashboard-reference__avatar dashboard-reference__avatar--small">{selectedEmployee.name.slice(0, 2).toUpperCase()}</div>
                          <div>
                            <strong>{label}</strong>
                            <span>{selectedEmployee.name}</span>
                          </div>
                          <time>{time}</time>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              ) : activeTab === 'Attendance' ? (
                <div className="employees-reference__attendance-layout">
                  <div className="employees-reference__attendance-topbar">
                    <div className="employees-reference__attendance-month">
                      <button type="button" aria-label="Previous month">{'<'}</button>
                      <strong>April 2024</strong>
                      <button type="button" aria-label="Next month">{'>'}</button>
                    </div>
                    <div className="employees-reference__attendance-meta">
                      <span>Overtime Hours: <strong>6.5h</strong></span>
                      <span>Total Work Hours: <strong>160h</strong></span>
                    </div>
                  </div>

                  <div className="employees-reference__attendance-cards">
                    <article className="employees-reference__attendance-card is-blue">
                      <span>Attendance Rate</span>
                      <strong>{employeeDetails.attendance[0]?.[1]}</strong>
                    </article>
                    <article className="employees-reference__attendance-card is-rose">
                      <span>Absent</span>
                      <strong>2</strong>
                    </article>
                    <article className="employees-reference__attendance-card is-amber">
                      <span>Late</span>
                      <strong>{employeeDetails.attendance[2]?.[1]}</strong>
                    </article>
                  </div>

                  <div className="employees-reference__attendance-table-wrap">
                    <div className="employees-reference__attendance-head">
                      <span>Date</span>
                      <span>Status</span>
                      <span>Check-In</span>
                      <span>Check-Out</span>
                      <span>Late</span>
                      <span>Overtime</span>
                    </div>
                    <div className="employees-reference__attendance-body">
                      {employeeDetails.attendanceTable.map((row) => (
                        <article key={row[0]} className="employees-reference__attendance-row">
                          <span>{row[0]}</span>
                          <span className={`employees-reference__attendance-status employees-reference__attendance-status--${row[1].toLowerCase()}`}>{row[1]}</span>
                          <span>{row[2]}</span>
                          <span>{row[3]}</span>
                          <span>{row[4]}</span>
                          <span>{row[5]}</span>
                        </article>
                      ))}
                    </div>
                    <div className="employees-reference__attendance-footer">
                      <span>1-10 of 22</span>
                      <button type="button" className="employees-reference__attendance-link">Show Overtime Request History</button>
                      <div className="employees-reference__attendance-pager">
                        <button type="button">{'<'}</button>
                        <button type="button" className="is-active">1</button>
                        <button type="button">2</button>
                        <button type="button">3</button>
                        <button type="button">{'>'}</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'Teaching Load' ? (
                <div className="employees-reference__teaching-layout">
                  <div className="employees-reference__teaching-topbar">
                    <div>
                      <strong>Current Teaching Load</strong>
                      <span>Assigned subjects and room allocations for this term.</span>
                    </div>
                    <div className="employees-reference__teaching-meta">
                      <span>Total Units: <strong>8</strong></span>
                      <span>Total Hours: <strong>144 hrs</strong></span>
                    </div>
                  </div>

                  <div className="employees-reference__attendance-cards">
                    <article className="employees-reference__attendance-card is-blue">
                      <span>Subjects</span>
                      <strong>{employeeDetails.teachingLoadTable.length}</strong>
                    </article>
                    <article className="employees-reference__attendance-card is-amber">
                      <span>Lead Area</span>
                      <strong>{employeeDetails.teachingLoad[4]?.[1]}</strong>
                    </article>
                    <article className="employees-reference__attendance-card is-rose">
                      <span>Station</span>
                      <strong>{employeeDetails.teachingLoad[5]?.[1]}</strong>
                    </article>
                  </div>

                  <div className="employees-reference__teaching-table-wrap">
                    <div className="employees-reference__teaching-head">
                      <span>Subject</span>
                      <span>Title</span>
                      <span>Units</span>
                      <span>Total Hours</span>
                      <span>Schedule</span>
                      <span>Room</span>
                      <span>Students</span>
                    </div>
                    <div className="employees-reference__attendance-body">
                      {employeeDetails.teachingLoadTable.map((row) => (
                        <article key={row[0]} className="employees-reference__teaching-row">
                          <span>{row[0]}</span>
                          <span>{row[1]}</span>
                          <span>{row[2]}</span>
                          <span>{row[3]}</span>
                          <span>{row[4]}</span>
                          <span>{row[5]}</span>
                          <span>{row[6]}</span>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              ) : activeTab === 'Payroll' ? (
                <div className="employees-reference__payroll-layout">
                  <div className="employees-reference__payroll-topbar">
                    <div>
                      <strong>Payroll Summary</strong>
                      <span>Compensation details for the current monthly release cycle.</span>
                    </div>
                    <div className="employees-reference__teaching-meta">
                      <span>Release Cycle: <strong>{employeeDetails.payroll[7]?.[1]}</strong></span>
                      <span>Bank: <strong>{employeeDetails.payroll[5]?.[1]}</strong></span>
                    </div>
                  </div>

                  <div className="employees-reference__attendance-cards">
                    <article className="employees-reference__attendance-card is-blue">
                      <span>Net Pay</span>
                      <strong>{employeeDetails.payroll[4]?.[1]}</strong>
                    </article>
                    <article className="employees-reference__attendance-card is-amber">
                      <span>Bonuses</span>
                      <strong>{employeeDetails.payroll[3]?.[1]}</strong>
                    </article>
                    <article className="employees-reference__attendance-card is-rose">
                      <span>Deductions</span>
                      <strong>{employeeDetails.payroll[2]?.[1]}</strong>
                    </article>
                  </div>

                  <div className="employees-reference__payroll-grid">
                    <section className="employees-reference__payroll-panel">
                      <div className="employees-reference__payroll-panel-head">
                        <h4>Earnings and Deductions</h4>
                        <span>Current cycle</span>
                      </div>
                      <div className="employees-reference__payroll-list">
                        {employeeDetails.payrollBreakdown.map(([label, value, type]) => (
                          <div key={label} className={`employees-reference__payroll-row employees-reference__payroll-row--${type}`}>
                            <span>{label}</span>
                            <strong>{value}</strong>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="employees-reference__payroll-panel">
                      <div className="employees-reference__payroll-panel-head">
                        <h4>Release Information</h4>
                        <span>Banking details</span>
                      </div>
                      <div className="employees-reference__payroll-list">
                        {employeeDetails.payroll.slice(5).map(([label, value]) => (
                          <div key={label} className="employees-reference__payroll-row">
                            <span>{label}</span>
                            <strong>{value}</strong>
                          </div>
                        ))}
                        <div className="employees-reference__payroll-row">
                          <span>Last Release</span>
                          <strong>March 15, 2026</strong>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              ) : activeTab === 'Files' ? (
                <div className="employees-reference__files-layout">
                  <div className="employees-reference__payroll-topbar">
                    <div>
                      <strong>Employee Files</strong>
                      <span>Document inventory, compliance status, and latest file actions for this employee.</span>
                    </div>
                    <div className="employees-reference__teaching-meta">
                      <span>Complete Files: <strong>5</strong></span>
                      <span>Pending Review: <strong>{selectedEmployee.status === 'Probationary' ? '1' : '0'}</strong></span>
                    </div>
                  </div>

                  <div className="employees-reference__attendance-cards">
                    <article className="employees-reference__attendance-card is-blue">
                      <span>Latest Update</span>
                      <strong>March 2026</strong>
                    </article>
                    <article className="employees-reference__attendance-card is-amber">
                      <span>Needs Action</span>
                      <strong>{selectedEmployee.status === 'Probationary' ? '1 File' : 'None'}</strong>
                    </article>
                    <article className="employees-reference__attendance-card is-rose">
                      <span>Compliance State</span>
                      <strong>{selectedEmployee.status === 'Probationary' ? 'In Review' : 'Cleared'}</strong>
                    </article>
                  </div>

                  <div className="employees-reference__files-table-wrap">
                    <div className="employees-reference__files-head">
                      <span>Document</span>
                      <span>Type</span>
                      <span>Note</span>
                      <span>Size</span>
                      <span>Status</span>
                      <span>Action</span>
                    </div>
                    <div className="employees-reference__files-body">
                      {employeeDetails.fileInventory.map(([title, type, note, size, status]) => (
                        <article key={title} className="employees-reference__files-row">
                          <span>{title}</span>
                          <span>{type}</span>
                          <span>{note}</span>
                          <span>{size}</span>
                          <span className={`employees-reference__file-badge employees-reference__file-badge--${status.toLowerCase()}`}>{status}</span>
                          <button type="button" className="employees-reference__download" aria-label={`Download ${title}`} title={`Download ${title}`}>
                            <FaDownload />
                          </button>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="employees-reference__details-panel">
                  <div className="employees-reference__details-grid">
                    {activeDetailRows.map(([label, value]) => (
                      <article key={label} className="employees-reference__detail-card">
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </article>
                    ))}
                  </div>

                  <div className="employees-reference__activity-panel">
                    <div className="employees-reference__activity-header">
                      <h3>Recent Activities</h3>
                      <span>Latest updates</span>
                    </div>
                    <div className="employees-reference__activity-list">
                      {employeeDetails.activity.map(([label, time]) => (
                        <article key={`${label}-${time}`} className="employees-reference__activity-item">
                          <div className="dashboard-reference__avatar dashboard-reference__avatar--small">{selectedEmployee.name.slice(0, 2).toUpperCase()}</div>
                          <div>
                            <strong>{label}</strong>
                            <span>{selectedEmployee.name}</span>
                          </div>
                          <time>{time}</time>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      ) : null}
    </main>
  )
}

