
import { Link } from 'react-router-dom'
import './AdminDashboard.css'

const stats = [
  {
    label: 'Total Enquiries',
    value: '248',
    change: '+12.8%',
    detail: 'vs. previous month',
    icon: '▤',
    tone: 'orange',
  },
  {
    label: 'New Enquiries',
    value: '36',
    change: '+8.2%',
    detail: 'Awaiting review',
    icon: '✉',
    tone: 'blue',
  },
  {
    label: 'In Progress',
    value: '52',
    change: '18 due soon',
    detail: 'Require follow-up',
    icon: '◷',
    tone: 'purple',
  },
  {
    label: 'Active Customers',
    value: '184',
    change: '+6.4%',
    detail: 'vs. previous month',
    icon: '♙',
    tone: 'green',
  },
]

const enquiries = [
  {
    id: 'JH-1008',
    customer: 'Global Travel Group',
    initials: 'GT',
    email: 'operations@globaltravel.example',
    service: 'Charter Flight',
    date: '19 Oct 2026',
    priority: 'High',
    status: 'New',
  },
  {
    id: 'JH-1007',
    customer: 'Aero Business Ltd',
    initials: 'AB',
    email: 'contact@aerobusiness.example',
    service: 'Ground Handling',
    date: '19 Oct 2026',
    priority: 'Medium',
    status: 'In Progress',
  },
  {
    id: 'JH-1006',
    customer: 'Pacific Logistics',
    initials: 'PL',
    email: 'logistics@pacific.example',
    service: 'Cargo Services',
    date: '18 Oct 2026',
    priority: 'High',
    status: 'Pending',
  },
  {
    id: 'JH-1005',
    customer: 'Skyline Aviation',
    initials: 'SA',
    email: 'admin@skyline.example',
    service: 'Aircraft Management',
    date: '18 Oct 2026',
    priority: 'Low',
    status: 'Completed',
  },
  {
    id: 'JH-1004',
    customer: 'Horizon Corporate',
    initials: 'HC',
    email: 'travel@horizon.example',
    service: 'Corporate Travel',
    date: '17 Oct 2026',
    priority: 'Medium',
    status: 'In Progress',
  },
]

const activities = [
  {
    icon: '+',
    tone: 'orange',
    title: 'New enquiry received',
    description: 'Global Travel Group · Charter Flight',
    time: '10 minutes ago',
  },
  {
    icon: '✓',
    tone: 'green',
    title: 'Service request completed',
    description: 'Skyline Aviation · Aircraft Management',
    time: '42 minutes ago',
  },
  {
    icon: '↻',
    tone: 'blue',
    title: 'Enquiry status updated',
    description: 'Aero Business Ltd · Ground Handling',
    time: '1 hour ago',
  },
  {
    icon: '+',
    tone: 'purple',
    title: 'New customer enquiry',
    description: 'Pacific Logistics · Cargo Services',
    time: '2 hours ago',
  },
]

const serviceBreakdown = [
  { name: 'Charter Flight', count: 78, percent: 78, color: 'orange' },
  { name: 'Ground Handling', count: 62, percent: 62, color: 'blue' },
  { name: 'Cargo Services', count: 54, percent: 54, color: 'purple' },
  { name: 'Corporate Travel', count: 38, percent: 38, color: 'green' },
]

function getToday() {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())
}

export default function AdminDashboard() {
  return (
    <div className="dashboard-page">
      {/* Page heading */}
      <section className="dashboard-heading">
        <div className="dashboard-heading-copy">
          <div className="dashboard-eyebrow">
            <span className="dashboard-eyebrow-dot" />
            BUSINESS OVERVIEW
          </div>

          <h1>Good to see you, Administrator</h1>

          <p>
            Here is what is happening across your business today.
          </p>

          <span className="dashboard-date">
            <span aria-hidden="true">▦</span> {getToday()}
          </span>
        </div>

        <div className="dashboard-heading-actions">
          <Link
            to="/admin/reports"
            className="dashboard-secondary-button"
          >
            <span aria-hidden="true">▥</span>
            View reports
          </Link>

          <Link
            to="/admin/enquiries"
            className="dashboard-primary-button"
          >
            <span aria-hidden="true">＋</span>
            View enquiries
          </Link>
        </div>
      </section>

      {/* Key performance indicators */}
      <section className="dashboard-stats" aria-label="Business statistics">
        {stats.map((stat) => (
          <article
            className="dashboard-stat-card"
            key={stat.label}
          >
            <div className="dashboard-stat-top">
              <span className="dashboard-stat-label">
                {stat.label}
              </span>

              <span
                className={`dashboard-stat-icon ${stat.tone}`}
                aria-hidden="true"
              >
                {stat.icon}
              </span>
            </div>

            <div className="dashboard-stat-value">
              {stat.value}
            </div>

            <div className="dashboard-stat-footer">
              <span className={`dashboard-stat-change ${stat.tone}`}>
                {stat.change}
              </span>

              <span className="dashboard-stat-detail">
                {stat.detail}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* Main dashboard columns */}
      <div className="dashboard-main-grid">
        <div className="dashboard-primary-column">
          {/* Enquiry overview */}
          <section className="dashboard-panel dashboard-performance">
            <div className="dashboard-section-heading">
              <div>
                <span className="dashboard-section-eyebrow">
                  PERFORMANCE
                </span>
                <h2>Enquiry overview</h2>
                <p>Understand your current enquiry workload.</p>
              </div>

              <Link
                to="/admin/reports"
                className="dashboard-text-link"
              >
                View reports <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="dashboard-overview-metrics">
              <div>
                <span className="dashboard-overview-number">248</span>
                <span className="dashboard-overview-label">
                  Total enquiries
                </span>
              </div>

              <div className="dashboard-overview-divider" />

              <div>
                <span className="dashboard-overview-number">72.4%</span>
                <span className="dashboard-overview-label">
                  Resolution rate
                </span>
              </div>

              <div className="dashboard-overview-divider" />

              <div>
                <span className="dashboard-overview-number">18</span>
                <span className="dashboard-overview-label">
                  Due for follow-up
                </span>
              </div>
            </div>

            <div className="dashboard-status-overview">
              <div className="dashboard-status-heading">
                <span>Enquiry status distribution</span>
                <span>248 total</span>
              </div>

              <div className="dashboard-status-bar">
                <span className="status-segment new-segment" />
                <span className="status-segment progress-segment" />
                <span className="status-segment pending-segment" />
                <span className="status-segment completed-segment" />
              </div>

              <div className="dashboard-status-legend">
                <span>
                  <i className="legend-dot new-dot" />
                  New <strong>36</strong>
                </span>

                <span>
                  <i className="legend-dot progress-dot" />
                  In progress <strong>52</strong>
                </span>

                <span>
                  <i className="legend-dot pending-dot" />
                  Pending <strong>22</strong>
                </span>

                <span>
                  <i className="legend-dot completed-dot" />
                  Other <strong>138</strong>
                </span>
              </div>
            </div>
          </section>

          {/* Recent enquiries */}
          <section className="dashboard-panel dashboard-recent">
            <div className="dashboard-section-heading">
              <div>
                <span className="dashboard-section-eyebrow">
                  WORKSPACE
                </span>
                <h2>Recent enquiries</h2>
                <p>Keep track of your latest customer requests.</p>
              </div>

              <Link
                to="/admin/enquiries"
                className="dashboard-text-link"
              >
                View all <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="dashboard-table-scroll">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ENQUIRY / CUSTOMER</th>
                    <th>SERVICE</th>
                    <th>DATE RECEIVED</th>
                    <th>PRIORITY</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry.id}>
                      <td>
                        <div className="dashboard-customer">
                          <span className="dashboard-customer-avatar">
                            {enquiry.initials}
                          </span>

                          <div className="dashboard-customer-info">
                            <strong>{enquiry.customer}</strong>
                            <span>{enquiry.id}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="dashboard-service-name">
                          {enquiry.service}
                        </span>
                      </td>

                      <td className="dashboard-date-cell">
                        {enquiry.date}
                      </td>

                      <td>
                        <span
                          className={`dashboard-priority ${enquiry.priority.toLowerCase()}`}
                        >
                          <i />
                          {enquiry.priority}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`dashboard-status ${enquiry.status
                            .toLowerCase()
                            .replace(' ', '-')}`}
                        >
                          {enquiry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="dashboard-table-footer">
              <span>Showing 5 recent sample enquiries</span>

              <Link
                to="/admin/enquiries"
                className="dashboard-footer-link"
              >
                Manage enquiries →
              </Link>
            </div>
          </section>
        </div>

        <aside className="dashboard-secondary-column">
          {/* Quick actions */}
          <section className="dashboard-panel dashboard-quick-actions">
            <div className="dashboard-section-heading compact">
              <div>
                <h2>Quick actions</h2>
                <p>Navigate to your workspace.</p>
              </div>
            </div>

            <Link
              to="/admin/enquiries"
              className="dashboard-action-link"
            >
              <span className="dashboard-action-icon orange">
                ✉
              </span>

              <span className="dashboard-action-copy">
                <strong>Manage enquiries</strong>
                <small>Review and update requests</small>
              </span>

              <span className="dashboard-action-arrow">→</span>
            </Link>

            <Link
              to="/admin/customers"
              className="dashboard-action-link"
            >
              <span className="dashboard-action-icon blue">
                ♙
              </span>

              <span className="dashboard-action-copy">
                <strong>View customers</strong>
                <small>Access customer records</small>
              </span>

              <span className="dashboard-action-arrow">→</span>
            </Link>

            <Link
              to="/admin/services"
              className="dashboard-action-link"
            >
              <span className="dashboard-action-icon purple">
                ✈
              </span>

              <span className="dashboard-action-copy">
                <strong>Manage services</strong>
                <small>Review business services</small>
              </span>

              <span className="dashboard-action-arrow">→</span>
            </Link>

            <Link
              to="/admin/tasks"
              className="dashboard-action-link"
            >
              <span className="dashboard-action-icon green">
                ◷
              </span>

              <span className="dashboard-action-copy">
                <strong>Tasks & follow-ups</strong>
                <small>Track pending actions</small>
              </span>

              <span className="dashboard-action-arrow">→</span>
            </Link>
          </section>

          {/* Service breakdown */}
          <section className="dashboard-panel dashboard-services">
            <div className="dashboard-section-heading compact">
              <div>
                <h2>Popular services</h2>
                <p>Sample enquiry distribution</p>
              </div>

              <span className="dashboard-mini-icon">↗</span>
            </div>

            <div className="dashboard-service-list">
              {serviceBreakdown.map((service) => (
                <div
                  className="dashboard-service-item"
                  key={service.name}
                >
                  <div className="dashboard-service-item-heading">
                    <span>{service.name}</span>
                    <strong>{service.count}</strong>
                  </div>

                  <div className="dashboard-service-track">
                    <span
                      className={`dashboard-service-fill ${service.color}`}
                      style={{ width: `${service.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/admin/services"
              className="dashboard-service-footer"
            >
              Explore all services <span>→</span>
            </Link>
          </section>

          {/* Recent activity */}
          <section className="dashboard-panel dashboard-activity">
            <div className="dashboard-section-heading compact">
              <div>
                <h2>Recent activity</h2>
                <p>Latest workspace updates</p>
              </div>
            </div>

            <div className="dashboard-activity-list">
              {activities.map((activity, index) => (
                <div
                  className="dashboard-activity-item"
                  key={`${activity.title}-${index}`}
                >
                  <span
                    className={`dashboard-activity-icon ${activity.tone}`}
                  >
                    {activity.icon}
                  </span>

                  <div className="dashboard-activity-copy">
                    <strong>{activity.title}</strong>
                    <p>{activity.description}</p>
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="dashboard-activity-note">
              Illustrative activity only. Live events will be connected
              when the backend is implemented.
            </p>
          </section>
        </aside>
      </div>

      <footer className="dashboard-footer">
        <span>
          <span className="dashboard-footer-brand">JH</span>
          JetztHub Business Portal
        </span>

        <span>
          Admin workspace <i /> Sample data preview
        </span>
      </footer>
    </div>
  )
}
