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

type UserRecord = {
  id: string
  name: string
  role: 'Student' | 'Instructor' | 'Admin'
  email: string
  course: string
  status: 'Active' | 'Pending' | 'On Hold'
}

type UserStatus = 'Active' | 'Pending' | 'On Hold'
type UserRole = 'Student' | 'Instructor' | 'Admin'

const USERS_PER_PAGE = 10

const navItems = [
  { icon: FaHome, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: FaUserGraduate, label: 'Students', to: '/admin/students' },
  { icon: FaBookOpen, label: 'Courses', to: '/admin/courses' },
  { icon: FaUsers, label: 'Admissions', to: '/admin/admissions' },
  { icon: FaUserCheck, label: 'Employees', to: '/admin/employees' },
  { icon: FaUserClock, label: 'Leave', to: '/admin/leave' },
  { icon: FaChartLine, label: 'Payroll', to: '/admin/payroll' },
  { icon: FaFileAlt, label: 'Documents', to: '/admin/documents' },
  { icon: FaFileAlt, label: 'Reports', to: '/admin/reports' },
  { icon: FaCalendarAlt, label: 'Calendar', to: '/admin/calendar' },
  { icon: FaCog, label: 'Settings', to: '/admin/settings' },
]

const firstNames = [
  'Sarah', 'Michael', 'Emily', 'Chris', 'Nadia', 'Marco', 'Celine', 'Daniel', 'Alicia', 'Kevin',
  'Jasmine', 'Theo', 'Patricia', 'Luis', 'Monica', 'Brandon', 'Sofia', 'Ethan', 'Grace', 'Samuel',
]

const lastNames = [
  'Smith', 'Johnson', 'Brown', 'Wilson', 'Cruz', 'Lim', 'Yu', 'Reyes', 'Garcia', 'Tan',
  'Velasco', 'Morris', 'Lee', 'Santos', 'Ong', 'Bautista', 'Flores', 'Ng', 'Hernandez', 'Castillo',
]

const courses = [
  'Data Analytics',
  'Python Basics',
  'History of Media',
  'Systems Thinking',
  'Advanced Javascript',
  'Project Leadership',
  'Digital Marketing',
  'Instructional Design',
]

const roles: UserRole[] = ['Student', 'Instructor', 'Admin']
const statuses: UserStatus[] = ['Active', 'Pending', 'On Hold']

function createInitialUsers(): UserRecord[] {
  return Array.from({ length: 50 }, (_, index) => {
    const firstName = firstNames[index % firstNames.length]
    const lastName = lastNames[(index * 3) % lastNames.length]
    const role = roles[index % roles.length]
    const course = courses[index % courses.length]
    const status = statuses[index % statuses.length]
    const fullName = `${firstName} ${lastName}`
    const emailSlug = `${firstName}.${lastName}`.toLowerCase()

    return {
      id: String(index + 1),
      name: fullName,
      role,
      email: `${emailSlug}${index + 1}@nalaka.edu`,
      course,
      status,
    }
  })
}

const initialUsers = createInitialUsers()

export default function Users() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [users, setUsers] = useState<UserRecord[]>(initialUsers)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: 'Student' as UserRole,
    email: '',
    course: courses[0],
    status: 'Active' as UserStatus,
  })

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return users
    }

    return users.filter((user) =>
      [user.name, user.email, user.role, user.course, user.status].some((value) =>
        value.toLowerCase().includes(query),
      ),
    )
  }, [search, users])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginatedUsers = filteredUsers.slice((safePage - 1) * USERS_PER_PAGE, safePage * USERS_PER_PAGE)

  const activeUsers = users.filter((user) => user.status === 'Active').length
  const instructorCount = users.filter((user) => user.role === 'Instructor').length
  const pendingUsers = users.filter((user) => user.status === 'Pending').length

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleAddUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextUser: UserRecord = {
      id: String(users.length + 1),
      name: formData.name.trim(),
      role: formData.role,
      email: formData.email.trim(),
      course: formData.course,
      status: formData.status,
    }

    if (!nextUser.name || !nextUser.email) {
      return
    }

    setUsers((current) => [nextUser, ...current])
    setFormData({
      name: '',
      role: 'Student',
      email: '',
      course: courses[0],
      status: 'Active',
    })
    setSearch('')
    setPage(1)
    setIsModalOpen(false)
  }

  const goToPage = (nextPage: number) => {
    setPage(Math.max(1, Math.min(nextPage, totalPages)))
  }

  return (
    <main className={`dashboard-page dashboard-reference users-reference-page${isSidebarOpen ? ' is-sidebar-open' : ''}`}>
      <aside className="dashboard-reference__sidebar">
        <div className="dashboard-reference__brand">
          <span className="dashboard-reference__brand-icon">
            <FaGraduationCap />
          </span>
          <div>
            <strong>NALAKA LMS</strong>
            <span>Registrar</span>
          </div>
        </div>

        <div className="dashboard-reference__profile">
          <div className="dashboard-reference__avatar">JD</div>
          <div className="dashboard-reference__profile-copy">
            <strong>John Doe</strong>
            <span>Registrar</span>
          </div>
          <em>3</em>
        </div>

        <nav className="dashboard-reference__nav" aria-label="Dashboard navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            const content = (
              <>
                <Icon />
                <span>{item.label}</span>
              </>
            )

            return item.to === '#' ? (
              <a href="#" key={item.label}>
                {content}
              </a>
            ) : (
              <Link key={item.label} to={item.to}>
                {content}
              </Link>
            )
          })}
        </nav>

        <button type="button" className="dashboard-reference__logout">
          <span>
            <FaSignOutAlt />
            Logout
          </span>
          <span aria-hidden="true">{'>'}</span>
        </button>
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
          <h1>Users</h1>

          <section className="users-reference__stats" aria-label="User summary">
            <article className="users-reference__stat">
              <FaUsers />
              <div>
                <strong>{users.length}</strong>
                <span>Total users</span>
              </div>
            </article>
            <article className="users-reference__stat">
              <FaUserCheck />
              <div>
                <strong>{activeUsers}</strong>
                <span>Active accounts</span>
              </div>
            </article>
            <article className="users-reference__stat">
              <FaUserGraduate />
              <div>
                <strong>{instructorCount}</strong>
                <span>Instructors</span>
              </div>
            </article>
            <article className="users-reference__stat">
              <FaUserClock />
              <div>
                <strong>{pendingUsers}</strong>
                <span>Pending invites</span>
              </div>
            </article>
          </section>

          <section className="dashboard-reference__panel users-reference__panel">
            <div className="dashboard-reference__panel-header">
              <div>
                <h2>User Directory</h2>
                <p className="users-reference__subcopy">Manage students, instructors, and admins across all programs.</p>
              </div>
              <button
                type="button"
                className="dashboard-reference__soft-button users-reference__add"
                onClick={() => setIsModalOpen(true)}
              >
                <FaPlus />
                Add User
              </button>
            </div>

            <div className="users-reference__toolbar">
              <label className="users-reference__search">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value)
                    setPage(1)
                  }}
                />
              </label>
              <button type="button" className="users-reference__filter">
                <FaFilter />
                Filters
              </button>
            </div>

            <div className="users-reference__table">
              <div className="users-reference__head users-reference__head--enhanced">
                <span>Name</span>
                <span>Role</span>
                <span>Email</span>
                <span>Course</span>
                <span>Status</span>
              </div>

              {paginatedUsers.map((user) => (
                <article key={user.id} className="users-reference__row users-reference__row--enhanced">
                  <div className="users-reference__name">
                    <div className="dashboard-reference__avatar dashboard-reference__avatar--small">
                      {user.name.slice(0, 2).toUpperCase()}
                    </div>
                    <strong>{user.name}</strong>
                  </div>
                  <span>{user.role}</span>
                  <span>{user.email}</span>
                  <span>{user.course}</span>
                  <span className={`users-reference__status users-reference__status--${user.status.toLowerCase().replace(' ', '-')}`}>
                    {user.status}
                  </span>
                </article>
              ))}
            </div>

            <div className="users-reference__footer">
              <p>
                Showing {(safePage - 1) * USERS_PER_PAGE + 1}-{Math.min(safePage * USERS_PER_PAGE, filteredUsers.length)} of{' '}
                {filteredUsers.length} users
              </p>
              <div className="dashboard-reference__pager users-reference__pager">
                <button type="button" onClick={() => goToPage(safePage - 1)} disabled={safePage === 1}>
                  Previous
                </button>
                <div>
                  {Array.from({ length: totalPages }, (_, index) => {
                    const nextPage = index + 1
                    return (
                      <button
                        type="button"
                        key={nextPage}
                        className={nextPage === safePage ? 'is-active' : undefined}
                        onClick={() => goToPage(nextPage)}
                      >
                        {nextPage}
                      </button>
                    )
                  })}
                </div>
                <button type="button" onClick={() => goToPage(safePage + 1)} disabled={safePage === totalPages}>
                  Next
                </button>
              </div>
            </div>
          </section>
        </section>
      </section>

      {isModalOpen ? (
        <div className="users-reference__modal-backdrop" role="presentation" onClick={() => setIsModalOpen(false)}>
          <div
            className="users-reference__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-user-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="dashboard-reference__panel-header">
              <div>
                <h2 id="add-user-title">Add User</h2>
                <p className="users-reference__subcopy">Create a new account and place it into the right course track.</p>
              </div>
              <button type="button" className="users-reference__modal-close" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>

            <form className="users-reference__form" onSubmit={handleAddUser}>
              <label>
                Full name
                <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Ava Collins" />
              </label>
              <label>
                Email
                <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="ava.collins@nalaka.edu" />
              </label>
              <label>
                Role
                <select name="role" value={formData.role} onChange={handleInputChange}>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Course
                <select name="course" value={formData.course} onChange={handleInputChange}>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Status
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <div className="users-reference__modal-actions">
                <button type="button" className="users-reference__filter" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="dashboard-reference__soft-button users-reference__add">
                  <FaPlus />
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  )
}

