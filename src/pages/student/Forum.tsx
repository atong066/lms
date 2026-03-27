import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StudentShell from './StudentShell'
import { createStudentThread, loadStudentForumThreads } from './studentData'

export default function StudentForum() {
  const [threads, setThreads] = useState(loadStudentForumThreads)
  const [title, setTitle] = useState('')
  const [channel, setChannel] = useState('Class discussion')
  const [body, setBody] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const stats = useMemo(
    () => ({
      open: threads.length,
      replies: threads.reduce((sum, item) => sum + item.replies, 0),
      views: threads.reduce((sum, item) => sum + item.views, 0),
    }),
    [threads],
  )

  return (
    <StudentShell activePath="/student/forum" title="Forum" subtitle="Join class and campus discussions, open threads, and reply within the student community space.">
      <section className="student-dashboard__stats">
        <article className="student-dashboard__stat"><strong>{stats.open}</strong><span>Open threads</span></article>
        <article className="student-dashboard__stat"><strong>{stats.replies}</strong><span>Total replies</span></article>
        <article className="student-dashboard__stat"><strong>{stats.views}</strong><span>Total views</span></article>
      </section>

      <section className="student-portal__panel">
        <div className="student-portal__panel-head">
          <h3>Thread Board</h3>
          <button type="button" className="student-assessments__link" onClick={() => setIsModalOpen(true)}>Add thread</button>
        </div>
        <div className="student-forum__table">
          <div className="student-forum__head">
            <span>Thread</span>
            <span>Channel</span>
            <span>Replies</span>
            <span>Views</span>
            <span>Last post</span>
          </div>
          {threads.map((thread) => (
            <Link key={thread.id} to={`/student/forum/${thread.id}`} className="student-forum__row">
              <span><strong>{thread.title}</strong><small>{thread.excerpt}</small></span>
              <span>{thread.channel}</span>
              <span>{thread.replies}</span>
              <span>{thread.views}</span>
              <span>{thread.lastPost}</span>
            </Link>
          ))}
        </div>
      </section>

      {isModalOpen ? (
        <div className="users-reference__modal-backdrop" role="presentation">
          <div className="users-reference__modal student-forum__modal" role="dialog" aria-modal="true">
            <div className="student-portal__panel-head">
              <h3>Create thread</h3>
              <button type="button" className="users-reference__modal-close" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
            <form
              className="student-settings__content"
              onSubmit={(event) => {
                event.preventDefault()
                const thread = createStudentThread(title, channel, body)
                setThreads(loadStudentForumThreads())
                setIsModalOpen(false)
                navigate(`/student/forum/${thread.id}`)
              }}
            >
              <label><span>Title</span><input value={title} onChange={(event) => setTitle(event.target.value)} required /></label>
              <label><span>Channel</span><input value={channel} onChange={(event) => setChannel(event.target.value)} required /></label>
              <label className="student-forum__modal-span"><span>Opening message</span><textarea value={body} onChange={(event) => setBody(event.target.value)} required /></label>
              <div className="student-settings__footer">
                <button type="button" className="student-assessments__link is-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="student-assessments__link">Post thread</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </StudentShell>
  )
}
