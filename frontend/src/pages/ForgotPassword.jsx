
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/Auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage('Please enter your registered email address.');
      return;
    }

    setMessage(
      'Password recovery is not connected yet. Email service setup is required.'
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <Link to="/login" className="auth-brand">
          <span className="auth-logo">JH</span>
          <span>JetztHub</span>
        </Link>

        <div className="brand-message">
          <span className="auth-eyebrow">
            ACCOUNT RECOVERY
          </span>

          <h1>Regain access with confidence.</h1>

          <p>
            We will help you get back into your
            JetztHub business portal securely.
          </p>
        </div>

        <div className="brand-footer">
          JETZTHUB · BUSINESS PORTAL
        </div>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-wrap">
          <span className="auth-eyebrow">
            ACCOUNT ASSISTANCE
          </span>

          <h2>Forgot password?</h2>

          <p className="auth-subtitle">
            Enter your registered email address to
            begin the password recovery process.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="recoveryEmail">
              Work email
            </label>

            <input
              id="recoveryEmail"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage('');
              }}
              autoComplete="email"
              required
            />

            {message && (
              <p role="status" aria-live="polite">
                {message}
              </p>
            )}

            <button className="auth-submit" type="submit">
              Continue <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="auth-switch">
            Remember your password?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default ForgotPassword;
