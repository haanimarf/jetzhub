
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './AdminLayout.css'

const navigation = [
  { label: 'Overview', path: '/admin', icon: '▦', end: true },
  { label: 'Enquiries', path: '/admin/enquiries', icon: '▤' },
  { label: 'Customers', path: '/admin/customers', icon: '♙' },
  { label: 'Services', path: '/admin/services', icon: '✈' },
  { label: 'Tasks & Follow-ups', path: '/admin/tasks', icon: '◷' },
  { label: 'Reports', path: '/admin/reports', icon: '▥' },
  { label: 'Staff & Roles', path: '/admin/staff', icon: '♧' },
]

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="admin-shell">
      {menuOpen && (
        <button
          className="admin-mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${menuOpen ? 'is-open' : ''}`}>
        <a className="admin-brand" href="/admin">
          <span className="admin-brand-mark">JH</span>
          <span className="admin-brand-copy">
            <strong>JetztHub</strong>
            <small>BUSINESS PORTAL</small>
          </span>
        </a>

        <div className="admin-nav-label">WORKSPACE</div>

        <nav className="admin-nav" aria-label="Admin navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <span className="admin-nav-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-help-card">
            <span className="admin-help-icon">?</span>
            <strong>Need assistance?</strong>
            <p>Access support for your workspace.</p>
            <a href="mailto:support@jetzhub.com">Contact support ↗</a>
          </div>

          <button
            className="admin-signout"
            type="button"
            onClick={() => {
              window.location.href = '/login'
            }}
          >
            <span aria-hidden="true">↪</span>
            Sign out
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div className="admin-breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-divider">/</span>
            <strong>Administration</strong>
          </div>

          <div className="admin-topbar-right">
            <span className="admin-environment">ADMIN PORTAL</span>
            <button
              className="admin-notification"
              type="button"
              aria-label="Notifications"
              title="Notifications"
            >
              ♧
              <span />
            </button>
            <div className="admin-user">
              <div className="admin-avatar">A</div>
              <div className="admin-user-copy">
                <strong>Administrator</strong>
                <span>Admin account</span>
              </div>
            </div>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
