
import { useState } from 'react'
import './Customers.css'

const initialCustomers = [
  {
    id: 'CUS-1001',
    name: 'Global Travel Group',
    email: 'contact@globaltravel.com',
    phone: '+94 77 123 4567',
    company: 'Global Travel Group',
    enquiries: 12,
    status: 'Active',
  },
  {
    id: 'CUS-1002',
    name: 'Aero Business Ltd',
    email: 'info@aerobusiness.com',
    phone: '+94 71 234 5678',
    company: 'Aero Business Ltd',
    enquiries: 8,
    status: 'Active',
  },
  {
    id: 'CUS-1003',
    name: 'Pacific Logistics',
    email: 'operations@pacific.com',
    phone: '+94 76 345 6789',
    company: 'Pacific Logistics',
    enquiries: 5,
    status: 'Pending',
  },
  {
    id: 'CUS-1004',
    name: 'Skyline Aviation',
    email: 'hello@skyline.com',
    phone: '+94 75 456 7890',
    company: 'Skyline Aviation',
    enquiries: 9,
    status: 'Active',
  },
]

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  })

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = [
      customer.id,
      customer.name,
      customer.email,
      customer.company,
    ].some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    )

    const matchesFilter =
      filter === 'All' || customer.status === filter

    return matchesSearch && matchesFilter
  })

  function handleAddCustomer(event) {
    event.preventDefault()

    const newCustomer = {
      ...form,
      id: `CUS-${1001 + customers.length}`,
      enquiries: 0,
      status: 'Active',
    }

    setCustomers((previous) => [...previous, newCustomer])
    setForm({ name: '', email: '', phone: '', company: '' })
    setShowForm(false)
  }

  return (
    <div className="customers-page">
      <div className="customers-heading">
        <div>
          <span className="customers-eyebrow">CUSTOMER MANAGEMENT</span>
          <h1>Customers</h1>
          <p>Manage customer profiles and business relationships.</p>
        </div>

        <button
          className="customers-add-button"
          onClick={() => setShowForm(!showForm)}
          type="button"
        >
          <span>+</span> Add Customer
        </button>
      </div>

      <section className="customers-stats">
        <article className="customer-stat-card">
          <div className="customer-stat-icon orange">♙</div>
          <div>
            <span>Total Customers</span>
            <strong>{customers.length}</strong>
            <small>Registered profiles</small>
          </div>
        </article>

        <article className="customer-stat-card">
          <div className="customer-stat-icon green">✓</div>
          <div>
            <span>Active Customers</span>
            <strong>
              {customers.filter((c) => c.status === 'Active').length}
            </strong>
            <small>Currently active</small>
          </div>
        </article>

        <article className="customer-stat-card">
          <div className="customer-stat-icon blue">▤</div>
          <div>
            <span>Total Enquiries</span>
            <strong>
              {customers.reduce((sum, c) => sum + c.enquiries, 0)}
            </strong>
            <small>Across listed customers</small>
          </div>
        </article>
      </section>

      {showForm && (
        <section className="customer-form-card">
          <div className="customer-form-heading">
            <div>
              <h2>Add New Customer</h2>
              <p>Enter the customer's business contact information.</p>
            </div>
            <button
              className="customer-close-button"
              onClick={() => setShowForm(false)}
              type="button"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleAddCustomer}>
            <div className="customer-form-grid">
              <label>
                Contact Name *
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Enter full name"
                />
              </label>

              <label>
                Company Name *
                <input
                  required
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  placeholder="Enter company name"
                />
              </label>

              <label>
                Email Address *
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="name@company.com"
                />
              </label>

              <label>
                Phone Number *
                <input
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  placeholder="Enter phone number"
                />
              </label>
            </div>

            <div className="customer-form-actions">
              <button
                className="customer-cancel-button"
                type="button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button className="customers-add-button" type="submit">
                Save Customer
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="customers-list-card">
        <div className="customers-list-heading">
          <div>
            <h2>Customer Directory</h2>
            <p>View and search registered customer profiles.</p>
          </div>
          <span className="customers-count">
            {filteredCustomers.length} records
          </span>
        </div>

        <div className="customers-toolbar">
          <div className="customers-search">
            <span>⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, company or email..."
              aria-label="Search customers"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter by customer status"
          >
            <option value="All">All Customers</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="customers-table-wrapper">
          <table className="customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Company</th>
                <th>Phone</th>
                <th>Enquiries</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-identity">
                      <div className="customer-avatar">
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong>{customer.name}</strong>
                        <span>{customer.email}</span>
                        <small>{customer.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>{customer.company}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <span className="customer-enquiry-count">
                      {customer.enquiries}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`customer-status ${
                        customer.status === 'Active'
                          ? 'active'
                          : 'pending'
                      }`}
                    >
                      <span />
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td className="customers-empty" colSpan="5">
                    No customers found. Try another search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="customers-table-footer">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </section>

      <p className="customers-demo-note">
        Demo data only. Customer records are not yet connected to a database.
      </p>
    </div>
  )
}
