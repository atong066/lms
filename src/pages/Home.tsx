import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="lms-home">
      <section className="hero-shell">
        <header className="hero-nav">
          <Link to="/" className="brand-mark" aria-label="NALAKA LMS home">
            <span className="brand-mark__orb" />
            <span className="brand-mark__text">NALAKA LMS</span>
          </Link>
          <nav className="hero-nav__links" aria-label="Primary">
            <a href="#platform">Platform</a>
            <a href="#workflow">Workflow</a>
            <a href="#launch">Launch</a>
          </nav>
        </header>

        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Focused delivery for schools, teams, and training groups</p>
            <h1>NALAKA LMS</h1>
            <h2>Run learning with the calm of a studio and the precision of an operations room.</h2>
            <p className="hero-summary">
              Publish courses, guide cohorts, and monitor completion in one deliberate workspace built to keep
              momentum visible.
            </p>
            <div className="hero-actions">
              <Link to="/admin/login" className="button button--primary">
                Enter Admin Portal
              </Link>
              <Link to="/admin/dashboard" className="button button--ghost">
                Preview Admin
              </Link>
              <Link to="/faculty/dashboard" className="button button--ghost">
                Preview Faculty
              </Link>
              <Link to="/student/dashboard" className="button button--ghost">
                Preview Student
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual__halo" />
            <div className="hero-visual__ring hero-visual__ring--one" />
            <div className="hero-visual__ring hero-visual__ring--two" />
            <div className="hero-visual__plane">
              <div className="hero-visual__screen">
                <span>LIVE COHORT</span>
                <strong>Systems Thinking</strong>
                <p>128 learners active this week</p>
              </div>
              <div className="hero-visual__rail">
                <span>Modules aligned</span>
                <span>Mentor review ready</span>
                <span>Assessment release in 08h</span>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="proof-strip" id="platform" aria-label="Platform highlights">
        <p>One rhythm for every delivery cycle</p>
        <ul>
          <li>Author</li>
          <li>Schedule</li>
          <li>Track</li>
          <li>Intervene</li>
        </ul>
      </section>

      <section className="story-section">
        <div className="section-heading">
          <p className="eyebrow">Learning operations</p>
          <h3>Keep the teaching team aligned without turning the experience into admin overhead.</h3>
        </div>

        <div className="story-grid">
          <article className="story-block">
            <span className="story-index">01</span>
            <h4>Plan with clarity</h4>
            <p>Organize curriculum, milestones, and release windows in a sequence that reads clearly at a glance.</p>
          </article>
          <article className="story-block">
            <span className="story-index">02</span>
            <h4>Read learner momentum</h4>
            <p>Surface progress, inactivity, and submission pressure early enough for instructors to respond well.</p>
          </article>
          <article className="story-block">
            <span className="story-index">03</span>
            <h4>Move cohorts forward</h4>
            <p>Guide launches, live sessions, and assessment windows with fewer handoffs and less guesswork.</p>
          </article>
        </div>
      </section>

      <section className="workflow-section" id="workflow">
        <div className="workflow-panel">
          <div className="workflow-copy">
            <p className="eyebrow">Workflow depth</p>
            <h3>A learning workspace shaped around attention, not clutter.</h3>
            <p>
              NALAKA keeps the active surface clean: course sequence on one side, live status at center, and the next
              intervention always visible.
            </p>
          </div>

          <div className="workflow-timeline" aria-label="Operational workflow">
            <div>
              <span>Week 1</span>
              <strong>Onboarding and orientation</strong>
              <p>Automated release and attendance capture.</p>
            </div>
            <div>
              <span>Week 4</span>
              <strong>Mentor checkpoint</strong>
              <p>Flag inactivity before completion drops.</p>
            </div>
            <div>
              <span>Week 8</span>
              <strong>Assessment window</strong>
              <p>Coordinate grading, feedback, and closeout.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" id="launch">
        <p className="eyebrow">Launch with intention</p>
        <h3>Start with the portal, then grow into the full operations view.</h3>
        <div className="hero-actions">
          <Link to="/admin/login" className="button button--primary">
            Sign in as Admin
          </Link>
          <Link to="/admin/dashboard" className="button button--ghost">
            Preview Admin Dashboard
          </Link>
          <Link to="/faculty/dashboard" className="button button--ghost">
            Preview Faculty Dashboard
          </Link>
          <Link to="/student/dashboard" className="button button--ghost">
            Preview Student Dashboard
          </Link>
        </div>
      </section>
    </main>
  )
}
