
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const form = event.currentTarget
    const data = new FormData(form)
    const password = data.get('password')
    const confirmPassword = data.get('confirmPassword')

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.')
      return
    }

    setError('Account creation will be enabled after secure authentication is connected.')
  }

  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <a href="/" className="auth-brand">
          <span className="auth-logo">JH</span>
          <span>JetztHub</span>
        </a>

        <div className="brand-message">
          <span className="auth-eyebrow">JOIN JETZTHUB</span>
          <h1>One portal. Better operations.</h1>
          <p>
            Create your account to access the JetztHub business portal
            and coordinate your company services.
          </p>
        </div>

        <span className="brand-footer">JETZTHUB · BUSINESS PORTAL</span>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-wrap">
          <div className="mobile-brand">
            <span className="auth-logo">JH</span>
            <strong>JetztHub</strong>
          </div>

          <span className="auth-eyebrow">GET STARTED</span>
          <h2>Create your account</h2>
          <p className="auth-subtitle">
            Enter your details to get started.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
              minLength={2}
            />

            <label htmlFor="signupEmail" style={{ marginTop: 20 }}>
              Work email
            </label>
            <input
              id="signupEmail"
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              required
            />

            <label htmlFor="signupPassword" style={{ marginTop: 20 }}>
              Password
            </label>
            <div className="password-input">
              <input
                id="signupPassword"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                minLength={8}
                required
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <label htmlFor="confirmPassword" style={{ marginTop: 20 }}>
              Confirm password
            </label>
            <div className="password-input">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Enter your password again"
                autoComplete="new-password"
                minLength={8}
                required
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {error && (
              <p role="status" style={{ color: '#c2410c', fontSize: 13 }}>
                {error}
              </p>
            )}

            <button className="auth-submit" type="submit" style={{ marginTop: 25 }}>
              Create Account <span>→</span>
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <p className="auth-security">
            Secure access for authorised company personnel.
          </p>
        </div>
      </section>
    </main>
  )
}
