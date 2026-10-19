
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <a href="/" className="auth-brand">
          <span className="auth-logo">JH</span>
          <span>JetztHub</span>
        </a>

        <div className="brand-message">
          <span className="auth-eyebrow">
            AVIATION &amp; TRAVEL SUPPORT
          </span>
          <h1>
            Every journey begins with confidence.
          </h1>
          <p>
            Coordinated aviation services, responsive support,
            and a clearer way to manage your operations.
          </p>
        </div>

        <span className="brand-footer">
          JETZTHUB · BUSINESS PORTAL
        </span>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-wrap">
          <div className="mobile-brand">
            <span className="auth-logo">JH</span>
            <strong>JetztHub</strong>
          </div>

          <span className="auth-eyebrow">WELCOME BACK</span>
          <h2>Sign in to JetztHub</h2>
          <p className="auth-subtitle">
            Enter your account details to continue.
          </p>

          <form onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="email">Work email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              required
            />

            <div className="password-heading">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <div className="password-input">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                minLength={8}
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <label className="remember-option">
              <input type="checkbox" name="remember" />
              <span>Remember me</span>
            </label>

            <button className="auth-submit" type="submit">
              Sign In <span>→</span>
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/signup">Create account</Link>
          </p>

          <p className="auth-security">
            Secure access for authorised company personnel.
          </p>
        </div>
      </section>
    </main>
  )
}
