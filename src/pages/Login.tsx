import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserAlt, FaLock } from 'react-icons/fa'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email and password are required.')
      return
    }

    if (email === 'admin@example.com' && password === 'password123') {
      navigate('/admin/dashboard')
      return
    }

    setError('Invalid email or password.')
  }

  return (
    <main className="login-page">
      <div className="login-page__glow login-page__glow--left" aria-hidden="true" />
      <div className="login-page__glow login-page__glow--right" aria-hidden="true" />

      <section className="login-layout">
        <div className="login-intro">
          <Link to="/" className="brand-mark" aria-label="NALAKA LMS home">
            <span className="brand-mark__orb" />
            <span className="brand-mark__text">NALAKA LMS</span>
          </Link>

          <p className="eyebrow">Secure learning access</p>
          <h1>Enter the portal and pick up the cohort exactly where you left it.</h1>
          <p className="login-intro__summary">
            Instructor notes, learner progress, release timing, and completion watchlists stay in one calm workspace.
          </p>

          <div className="login-intro__points" aria-label="Login highlights">
            <div>
              <span>Live status</span>
              <strong>Current course activity stays visible the moment you sign in.</strong>
            </div>
            <div>
              <span>Fast recovery</span>
              <strong>See the next intervention, at-risk learners, and pending checkpoints immediately.</strong>
            </div>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-panel__topline">
            <span className="eyebrow">Member access</span>
            <Link to="/" className="login-panel__back">
              Back to site
            </Link>
          </div>

          <h2>Sign in</h2>
          <p className="login-panel__copy">Use the demo account below to open the LMS workspace.</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="email">Email</label>
              <div className="login-input">
                <FaUserAlt className="login-input__icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <div className="login-input">
                <FaLock className="login-input__icon" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="login-meta">
              <p>Demo access only</p>
              <button type="button">Forgot password?</button>
            </div>

            {error ? <div className="login-error">{error}</div> : null}

            <button type="submit" className="login-submit">
              Enter workspace
            </button>

            <p className="login-hint">
              Use <strong>admin@example.com</strong> and <strong>password123</strong>
            </p>
          </form>

          <div className="login-panel__footer">
            <div>
              <span>Security</span>
              <strong>Encrypted session</strong>
            </div>
            <div>
              <span>Role</span>
              <strong>Administrator</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
