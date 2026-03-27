import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaBars,
  FaBell,
  FaBookOpen,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaComments,
  FaEnvelope,
  FaFileAlt,
  FaGraduationCap,
  FaHome,
  FaPlus,
  FaRegBookmark,
  FaRegClock,
  FaRegCircle,
  FaSignOutAlt,
  FaTasks,
} from 'react-icons/fa'
import { facultyNavMain, facultyNavSupport, type FacultyNavItem } from './gradebookData'
import { createForumThreadId, loadForumThreads, saveForumThreads, type ForumThread } from './forumData'

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

const forumChannels = ['All threads', 'Department', 'My classes', 'Scheduling', 'Pinned']

export default function FacultyForum() {
  const navigate = useNavigate()
  const [threads, setThreads] = useState<ForumThread[]>(() => loadForumThreads())
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    channel: 'Department faculty',
    tone: 'discussion' as ForumThread['tone'],
    message: '',
  })

  const activeThread = threads[0]
  const stats = useMemo(
    () => [
      { label: 'Unread threads', value: String(Math.max(threads.length + 4, 9)).padStart(2, '0'), note: 'Across department and class spaces' },
      { label: 'Pinned notices', value: String(threads.filter((thread) => thread.rating === 'Pinned').length || 4).padStart(2, '0'), note: 'Faculty-wide updates this week' },
      { label: 'Needs reply', value: String(threads.filter((thread) => thread.tone === 'discussion').length || 6).padStart(2, '0'), note: 'Questions waiting for your answer' },
    ],
    [threads],
  )

  const handleCreateThread = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = formData.title.trim()
    const message = formData.message.trim()
    if (!title || !message) {
      return
    }

    const nextThread: ForumThread = {
      id: createForumThreadId(title),
      title,
      starter: 'Michael Reyes',
      channel: formData.channel,
      lastPost: 'Mar 27, 2026 · Just now',
      replies: 1,
      views: 1,
      rating: formData.tone === 'notice' ? 'Notice' : 'Open',
      tone: formData.tone,
      excerpt: message,
      posts: [
        {
          id: `post-${Date.now()}`,
          author: 'Michael Reyes',
          role: 'Systems and Education Faculty',
          initials: 'MR',
          joined: 'Jun 2021',
          posts: 85,
          thanks: 19,
          time: 'Mar 27, 2026 · Just now',
          subject: title,
          body: message,
          badge: 'Thread starter',
          thankedBy: [],
        },
      ],
    }

    const nextThreads = [nextThread, ...threads]
    setThreads(nextThreads)
    saveForumThreads(nextThreads)
    setIsCreateModalOpen(false)
    setFormData({
      title: '',
      channel: 'Department faculty',
      tone: 'discussion',
      message: '',
    })
    navigate(`/faculty/forum/${nextThread.id}`)
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
              <Link key={item.label} to={item.to} className={item.label === 'Forum' ? 'is-active' : undefined}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="faculty-dashboard__sidebar-note">
          <span>Faculty forum</span>
          <strong>Department updates and class discussions</strong>
          <p>Use this space to keep teaching questions, coordination notes, and pinned notices in one place.</p>
        </div>

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
            <h1>Forum</h1>
          </div>

          <div className="faculty-dashboard__topbar-strip" aria-label="Forum context">
            <strong>Faculty discussions</strong>
            <span>Department updates, section questions, and pinned notices</span>
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
          <section className="faculty-dashboard__hero faculty-gradebook__hero faculty-forum__hero">
            <div className="faculty-dashboard__hero-copy">
              <span className="faculty-dashboard__eyebrow">Collaboration Space</span>
              <h2>Keep faculty coordination and class discussions in one stream.</h2>
              <p>Review updates, answer teaching questions, and keep department notes visible without leaving the workspace.</p>
            </div>

            <div className="faculty-dashboard__hero-callout faculty-forum__hero-callout">
              <div>
                <span>Most active thread</span>
                <strong>{activeThread?.title ?? 'Faculty updates'}</strong>
              </div>
              <p>{activeThread?.excerpt ?? 'Latest forum context is available in the board.'}</p>
            </div>
          </section>

          <section className="faculty-dashboard__stats" aria-label="Forum metrics" style={{ marginTop: '0.18rem' }}>
            {stats.map((item) => (
              <article key={item.label} className="faculty-dashboard__stat">
                <span>{item.value}</span>
                <strong>{item.label}</strong>
                <p>{item.note}</p>
              </article>
            ))}
          </section>

          <section className="faculty-forum__layout" style={{ marginTop: '0.18rem' }}>
            <section className="faculty-dashboard__panel faculty-forum__board">
              <div className="faculty-forum__toolbar">
                <div className="faculty-forum__channel-strip">
                  {forumChannels.map((channel, index) => (
                    <button
                      key={channel}
                      type="button"
                      className={index === 0 ? 'is-active' : undefined}
                    >
                      {channel}
                    </button>
                  ))}
                </div>
                <div className="faculty-forum__toolbar-meta">
                  <button type="button" className="faculty-forum__add-thread" onClick={() => setIsCreateModalOpen(true)}>
                    <FaPlus />
                    Add thread
                  </button>
                  <span>
                    <FaRegBookmark />
                    {threads.length} active threads
                  </span>
                  <span>
                    <FaRegClock />
                    Last refresh 2 mins ago
                  </span>
                </div>
              </div>

              <div className="faculty-forum__table">
                <div className="faculty-forum__head">
                  <span>Thread / Starter</span>
                  <span>Rating</span>
                  <span>Last Post</span>
                  <span>Replies</span>
                  <span>Views</span>
                </div>

                {threads.map((thread) => (
                  <Link
                    key={thread.id}
                    to={`/faculty/forum/${thread.id}`}
                    className={`faculty-forum__row faculty-forum__row--${thread.tone}`}
                  >
                    <div className="faculty-forum__thread">
                      <div className="faculty-forum__thread-mark">
                        <FaComments />
                      </div>
                      <div>
                        <strong>{thread.title}</strong>
                        <span>{thread.channel}</span>
                        <em>Started by {thread.starter}</em>
                      </div>
                    </div>
                    <div className="faculty-forum__rating">
                      <span>{thread.rating}</span>
                    </div>
                    <div className="faculty-forum__lastpost">
                      <strong>{thread.lastPost}</strong>
                      <span>{thread.excerpt}</span>
                    </div>
                    <div className="faculty-forum__metric">
                      <strong>{thread.replies}</strong>
                    </div>
                    <div className="faculty-forum__metric">
                      <strong>{thread.views}</strong>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="faculty-forum__footer">
                <button type="button">
                  <FaChevronLeft />
                  Previous
                </button>
                <span>Showing 1-{threads.length} of {threads.length} threads</span>
                <button type="button">
                  Next
                  <FaChevronRight />
                </button>
              </div>
            </section>
          </section>
        </div>

        {isCreateModalOpen ? (
          <div className="users-reference__modal-backdrop" role="presentation">
            <div className="users-reference__modal faculty-forum__modal" role="dialog" aria-modal="true" aria-labelledby="faculty-forum-create-title">
              <div className="faculty-forum__modal-head">
                <div>
                  <span>Create thread</span>
                  <h2 id="faculty-forum-create-title">Start a new forum discussion</h2>
                </div>
                <button type="button" className="users-reference__modal-close" onClick={() => setIsCreateModalOpen(false)}>
                  Close
                </button>
              </div>

              <form className="faculty-forum__modal-form" onSubmit={handleCreateThread}>
                <label>
                  Thread title
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))}
                    placeholder="Enter the topic or concern"
                  />
                </label>

                <div className="faculty-forum__modal-grid">
                  <label>
                    Channel
                    <select
                      value={formData.channel}
                      onChange={(event) => setFormData((current) => ({ ...current, channel: event.target.value }))}
                    >
                      <option>Department faculty</option>
                      <option>My classes</option>
                      <option>Scheduling</option>
                      <option>Faculty support</option>
                      <option>Facilities and scheduling</option>
                    </select>
                  </label>

                  <label>
                    Thread type
                    <select
                      value={formData.tone}
                      onChange={(event) => setFormData((current) => ({ ...current, tone: event.target.value as ForumThread['tone'] }))}
                    >
                      <option value="discussion">Discussion</option>
                      <option value="notice">Notice</option>
                      <option value="update">Update</option>
                    </select>
                  </label>
                </div>

                <label>
                  Opening message
                  <textarea
                    value={formData.message}
                    onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                    placeholder="Write the first post for this thread."
                  />
                </label>

                <div className="users-reference__modal-actions">
                  <button type="button" className="users-reference__filter" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="dashboard-reference__soft-button users-reference__add">
                    <FaPlus />
                    Create thread
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
