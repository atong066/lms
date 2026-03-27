import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StudentShell from './StudentShell'
import { addStudentForumReply, loadStudentForumThreads } from './studentData'

export default function StudentForumThread() {
  const { threadId } = useParams()
  const [reply, setReply] = useState('')
  const [threads, setThreads] = useState(loadStudentForumThreads)
  const thread = useMemo(() => threads.find((item) => item.id === threadId), [threadId, threads])

  if (!thread) {
    return (
      <StudentShell activePath="/student/forum" title="Forum" subtitle="Thread not found.">
        <section className="student-portal__panel">
          <div className="student-portal__panel-head">
            <h3>Missing thread</h3>
            <Link to="/student/forum">Back to forum</Link>
          </div>
        </section>
      </StudentShell>
    )
  }

  return (
    <StudentShell activePath="/student/forum" title="Forum Thread" subtitle="Read the discussion, then add your reply from the student thread view.">
      <section className="student-forum-thread__hero">
        <div>
          <Link to="/student/forum" className="student-forum-thread__back">Back to forum</Link>
          <h2>{thread.title}</h2>
          <p>{thread.channel} · started by {thread.starter}</p>
        </div>
      </section>

      <section className="student-forum-thread__posts">
        {thread.posts.map((post) => (
          <article key={post.id} className="student-forum-thread__post">
            <aside className="student-forum-thread__author">
              <div className="student-portal__avatar">{post.initials}</div>
              <strong>{post.author}</strong>
              <span>{post.role}</span>
              <small>Posts: {post.posts}</small>
              <small>Thanks: {post.thanks}</small>
            </aside>
            <div className="student-forum-thread__body">
              <div className="student-forum-thread__meta">
                <strong>{post.subject}</strong>
                <span>{post.time}</span>
              </div>
              <p>{post.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="student-portal__panel">
        <div className="student-portal__panel-head">
          <h3>Reply</h3>
        </div>
        <form
          className="student-settings__content"
          onSubmit={(event) => {
            event.preventDefault()
            if (!reply.trim()) return
            setThreads(addStudentForumReply(thread.id, reply))
            setReply('')
          }}
        >
          <label className="student-forum__modal-span"><span>Your reply</span><textarea value={reply} onChange={(event) => setReply(event.target.value)} /></label>
          <div className="student-settings__footer">
            <button type="submit" className="student-assessments__link">Post reply</button>
          </div>
        </form>
      </section>
    </StudentShell>
  )
}
