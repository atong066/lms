import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
  FaPaperPlane,
  FaQuoteRight,
  FaRegCircle,
  FaSignOutAlt,
  FaTasks,
} from 'react-icons/fa'
import { facultyNavMain, facultyNavSupport, type FacultyNavItem } from './gradebookData'
import { loadForumThreads, saveForumThreads, type ForumPost, type ForumThread } from './forumData'

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

function createReplyPost(message: string, posts: ForumPost[]): ForumPost {
  return {
    id: `reply-${Date.now()}`,
    author: 'Michael Reyes',
    role: 'Systems and Education Faculty',
    initials: 'MR',
    joined: 'Jun 2021',
    posts: 84 + posts.length,
    thanks: 19,
    time: 'Just now',
    subject: 'Faculty reply',
    body: message,
    thankedBy: [],
  }
}

export default function FacultyForumThread() {
  const { threadId } = useParams()
  const [threads, setThreads] = useState<ForumThread[]>(() => loadForumThreads())
  const [replyMessage, setReplyMessage] = useState('')
  const thread = threads.find((item) => item.id === threadId) ?? threads[0]
  const [posts, setPosts] = useState<ForumPost[]>(thread?.posts ?? [])

  useEffect(() => {
    setThreads(loadForumThreads())
  }, [])

  useEffect(() => {
    setPosts(thread?.posts ?? [])
  }, [threadId, thread])

  const handleQuote = (post: ForumPost) => {
    const snippet = `> ${post.author}: ${post.body}\n\n`
    setReplyMessage((current) => `${current}${snippet}`)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = replyMessage.trim()
    if (!trimmed) {
      return
    }

    const nextPosts = [...posts, createReplyPost(trimmed, posts)]
    setPosts(nextPosts)
    const nextThreads = threads.map((item) =>
      item.id === thread.id
        ? {
            ...item,
            posts: nextPosts,
            replies: nextPosts.length,
            lastPost: 'Mar 27, 2026 · Just now',
            excerpt: trimmed,
          }
        : item,
    )
    setThreads(nextThreads)
    saveForumThreads(nextThreads)
    setReplyMessage('')
  }

  if (!thread) {
    return null
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
          <span>Open thread</span>
          <strong>{thread.title}</strong>
          <p>Review the thread timeline, quote earlier comments, and post your reply from the composer below.</p>
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
            <h1>Forum Thread</h1>
          </div>

          <div className="faculty-dashboard__topbar-strip" aria-label="Thread context">
            <strong>{thread.channel}</strong>
            <span>{thread.rating} · {posts.length} posts in timeline</span>
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
          <section className="faculty-dashboard__hero faculty-gradebook__hero faculty-forum__hero faculty-forum-thread__hero">
            <div className="faculty-dashboard__hero-copy">
              <span className="faculty-dashboard__eyebrow">Thread / Starter</span>
              <h2>{thread.title}</h2>
              <p>{thread.excerpt}</p>
            </div>

            <div className="faculty-dashboard__hero-callout faculty-forum__hero-callout">
              <div>
                <span>Started by</span>
                <strong>{thread.starter}</strong>
              </div>
              <p>{thread.lastPost}</p>
            </div>
          </section>

          <section className="faculty-forum-thread__layout">
            <section className="faculty-dashboard__panel faculty-forum-thread__board">
              <div className="faculty-forum-thread__actions">
                <Link to="/faculty/forum" className="faculty-forum-thread__back">
                  <FaChevronLeft />
                  Back to forum
                </Link>
                <div className="faculty-forum-thread__meta">
                  <span>{posts.length} posts</span>
                  <span>{thread.views} views</span>
                </div>
              </div>

              <div className="faculty-forum-thread__posts">
                {posts.map((post, index) => (
                  <article key={post.id} className="faculty-forum-thread__post">
                    <aside className="faculty-forum-thread__author">
                      <div className="faculty-forum-thread__author-avatar">{post.initials}</div>
                      <strong>{post.author}</strong>
                      <span>{post.role}</span>
                      {post.badge ? <em>{post.badge}</em> : null}
                      <div className="faculty-forum-thread__author-stats">
                        <div>
                          <span>Joined</span>
                          <strong>{post.joined}</strong>
                        </div>
                        <div>
                          <span>Posts</span>
                          <strong>{post.posts}</strong>
                        </div>
                        <div>
                          <span>Thanks</span>
                          <strong>{post.thanks}</strong>
                        </div>
                      </div>
                    </aside>

                    <div className="faculty-forum-thread__content">
                      <div className="faculty-forum-thread__post-head">
                        <div>
                          <span>{post.time}</span>
                          <strong>{post.subject}</strong>
                        </div>
                        <small>#{index + 1}</small>
                      </div>

                      <div className="faculty-forum-thread__post-body">
                        {post.body.split('\n').map((paragraph, paragraphIndex) => (
                          <p key={`${post.id}-${paragraphIndex}`}>{paragraph}</p>
                        ))}
                      </div>

                      {post.thankedBy?.length ? (
                        <div className="faculty-forum-thread__thanks">
                          <span>Thanks</span>
                          <p>{post.thankedBy.join(', ')}</p>
                        </div>
                      ) : null}

                      <div className="faculty-forum-thread__post-actions">
                        <button type="button" onClick={() => handleQuote(post)}>
                          <FaQuoteRight />
                          Quote
                        </button>
                        <button type="button" onClick={() => handleQuote(post)}>
                          <FaComments />
                          Reply
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <form className="faculty-forum-thread__composer" onSubmit={handleSubmit}>
                <div className="faculty-forum-thread__composer-head">
                  <div>
                    <span>Quick reply</span>
                    <strong>Post to this thread</strong>
                  </div>
                  <small>Your reply will appear at the end of the thread.</small>
                </div>

                <textarea
                  value={replyMessage}
                  onChange={(event) => setReplyMessage(event.target.value)}
                  placeholder="Write your reply, coordination update, or classroom note here."
                />

                <div className="faculty-forum-thread__composer-actions">
                  <button type="button" onClick={() => setReplyMessage('')}>
                    Clear
                  </button>
                  <button type="submit">
                    <FaPaperPlane />
                    Post reply
                  </button>
                </div>
              </form>
            </section>
          </section>
        </div>
      </section>
    </main>
  )
}
