import { useMemo, useState } from 'react'
import './AdminDashboard.css'

const initialReservations = [
  {
    id: 'JH-2048',
    passenger: 'Alexander Morgan',
    route: 'Colombo (CMB) → Dubai (DWC)',
    aircraft: 'Citation Latitude',
    departure: '2026-10-23T09:30',
    passengers: 4,
    status: 'Confirmed',
    amount: 'USD 18,500',
  },
  {
    id: 'JH-2047',
    passenger: 'Sophia Williams',
    route: 'Colombo (CMB) → Malé (MLE)',
    aircraft: 'Phenom 300E',
    departure: '2026-10-23T14:00',
    passengers: 3,
    status: 'Pending',
    amount: 'USD 8,900',
  },
  {
    id: 'JH-2046',
    passenger: 'Daniel Perera',
    route: 'Colombo (CMB) → Singapore (WSSL)',
    aircraft: 'Gulfstream G280',
    departure: '2026-10-24T08:15',
    passengers: 6,
    status: 'Confirmed',
    amount: 'USD 22,400',
  },
]

const aircraftOptions = [
  { name: 'Citation Latitude', seats: 9, rate: 18500 },
  { name: 'Phenom 300E', seats: 8, rate: 8900 },
  { name: 'Gulfstream G280', seats: 10, rate: 22400 },
  { name: 'Challenger 350', seats: 9, rate: 19800 },
]

const money = (value) => `USD ${Number(value || 0).toLocaleString('en-US')}`

function prettyDate(value) {
  if (!value) return 'Not scheduled'
  const date = new Date(value)
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminDashboard() {
  const [reservations, setReservations] = useState(initialReservations)
  const [notice, setNotice] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [form, setForm] = useState({
    passenger: '',
    email: '',
    phone: '',
    origin: 'Colombo (CMB)',
    destination: '',
    departure: '',
    aircraft: 'Citation Latitude',
    passengers: '2',
    tripType: 'One way',
    notes: '',
  })

  const selectedAircraft = aircraftOptions.find((item) => item.name === form.aircraft) || aircraftOptions[0]
  const estimate = selectedAircraft.rate * (form.tripType === 'Round trip' ? 1.8 : 1)

  const filteredReservations = useMemo(() => {
    const query = search.trim().toLowerCase()
    return reservations.filter((item) => {
      const matchesQuery = !query || [
        item.id, item.passenger, item.route, item.aircraft,
      ].some((value) => value.toLowerCase().includes(query))
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [reservations, search, statusFilter])

  const updateForm = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const createReservation = (event) => {
    event.preventDefault()
    if (!form.passenger.trim() || !form.destination.trim() || !form.departure) {
      setNotice('Please add the passenger name, destination and departure time.')
      return
    }
    if (Number(form.passengers) > selectedAircraft.seats) {
      setNotice(`${selectedAircraft.name} supports up to ${selectedAircraft.seats} passengers.`)
      return
    }

    const newReservation = {
      id: `JH-${2050 + reservations.length}`,
      passenger: form.passenger.trim(),
      route: `${form.origin} → ${form.destination.trim()}`,
      aircraft: form.aircraft,
      departure: form.departure,
      passengers: Number(form.passengers),
      status: 'Pending',
      amount: money(estimate),
    }

    setReservations((current) => [newReservation, ...current])
    setNotice(`Draft reservation ${newReservation.id} added to this dashboard. It has not been sent to a booking system.`)
    setForm((current) => ({
      ...current,
      passenger: '',
      email: '',
      phone: '',
      destination: '',
      departure: '',
      passengers: '2',
      notes: '',
    }))
  }

  const setReservationStatus = (id, status) => {
    setReservations((current) => current.map((item) => item.id === id ? { ...item, status } : item))
    setNotice(`${id} marked ${status.toLowerCase()} in this demo dashboard.`)
  }

  return (
    <div className="dashboard-page jet-dashboard">
      {notice && (
        <div className="jet-notice" role="status">
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice('')} aria-label="Dismiss message">×</button>
        </div>
      )}

      <section className="jet-stat-grid" aria-label="Flight operations overview">
        <article className="jet-stat-card">
          <div className="jet-stat-top"><span>Today's departures</span><span className="jet-stat-icon navy">✈</span></div>
          <strong>06</strong><small><b className="positive">2 boarding</b> · 4 upcoming</small>
        </article>
        <article className="jet-stat-card">
          <div className="jet-stat-top"><span>Reservations</span><span className="jet-stat-icon orange">▣</span></div>
          <strong>{reservations.length.toString().padStart(2, '0')}</strong><small>Visible in this workspace</small>
        </article>
        <article className="jet-stat-card">
          <div className="jet-stat-top"><span>Pending confirmation</span><span className="jet-stat-icon amber">◷</span></div>
          <strong>{reservations.filter((item) => item.status === 'Pending').length.toString().padStart(2, '0')}</strong><small>Need an operations decision</small>
        </article>
        <article className="jet-stat-card">
          <div className="jet-stat-top"><span>Passengers booked</span><span className="jet-stat-icon green">♙</span></div>
          <strong>{reservations.reduce((sum, item) => sum + item.passengers, 0).toString().padStart(2, '0')}</strong><small>Across listed reservations</small>
        </article>
      </section>

      <div className="jet-workspace-grid">
        <section className="jet-panel jet-booking-panel" id="quick-reservation">
          <div className="jet-panel-heading">
            <div>
              <h2>Quick reservation</h2>
            </div>
            <span className="jet-panel-symbol">＋</span>
          </div>

          <form className="jet-booking-form" onSubmit={createReservation}>
            <div className="jet-field jet-field-wide">
              <label htmlFor="passenger">Lead passenger / client name <span>*</span></label>
              <input id="passenger" name="passenger" value={form.passenger} onChange={updateForm} placeholder="e.g. Alex Morgan" autoComplete="name" required />
            </div>
            <div className="jet-form-two">
              <div className="jet-field">
                <label htmlFor="email">Work email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={updateForm} placeholder="name@company.com" autoComplete="email" />
              </div>
              <div className="jet-field">
                <label htmlFor="phone">Phone / WhatsApp</label>
                <input id="phone" name="phone" value={form.phone} onChange={updateForm} placeholder="+94 ..." autoComplete="tel" />
              </div>
            </div>
            <div className="jet-form-two">
              <div className="jet-field">
                <label htmlFor="origin">Departure airport <span>*</span></label>
                <input id="origin" name="origin" value={form.origin} onChange={updateForm} required />
              </div>
              <div className="jet-field">
                <label htmlFor="destination">Destination airport <span>*</span></label>
                <input id="destination" name="destination" value={form.destination} onChange={updateForm} placeholder="City or airport code" required />
              </div>
            </div>
            <div className="jet-form-three">
              <div className="jet-field">
                <label htmlFor="departure">Departure date & time <span>*</span></label>
                <input id="departure" name="departure" type="datetime-local" value={form.departure} onChange={updateForm} required />
              </div>
              <div className="jet-field">
                <label htmlFor="aircraft">Aircraft</label>
                <select id="aircraft" name="aircraft" value={form.aircraft} onChange={updateForm}>
                  {aircraftOptions.map((aircraft) => <option key={aircraft.name} value={aircraft.name}>{aircraft.name}</option>)}
                </select>
              </div>
              <div className="jet-field">
                <label htmlFor="passengers">Passengers</label>
                <select id="passengers" name="passengers" value={form.passengers} onChange={updateForm}>
                  {Array.from({ length: selectedAircraft.seats }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count} {count === 1 ? 'passenger' : 'passengers'}</option>)}
                </select>
              </div>
            </div>
            <div className="jet-form-bottom">
              <div className="jet-field">
                <label htmlFor="tripType">Trip type</label>
                <select id="tripType" name="tripType" value={form.tripType} onChange={updateForm}>
                  <option>One way</option>
                  <option>Round trip</option>
                </select>
              </div>
              <div className="jet-estimate">
                <span>Indicative estimate</span>
                <strong>{money(estimate)}</strong>
                <small>Demo estimate · confirm with operations</small>
              </div>
            </div>
            <div className="jet-field">
              <label htmlFor="notes">Special requests <small>(optional)</small></label>
              <textarea id="notes" name="notes" value={form.notes} onChange={updateForm} placeholder="Catering, ground transfer, luggage or other requests" rows="2" />
            </div>
            <div className="jet-form-actions">
              <button className="jet-button-secondary" type="reset" onClick={() => setForm({ passenger: '', email: '', phone: '', origin: 'Colombo (CMB)', destination: '', departure: '', aircraft: 'Citation Latitude', passengers: '2', tripType: 'One way', notes: '' })}>Clear form</button>
              <button className="jet-button-primary" type="submit">＋ Create reservation <span>→</span></button>
            </div>
            <p className="jet-form-footnote">Creates a local draft only. Live availability, pricing and confirmations require backend integration.</p>
          </form>
        </section>

        <aside className="jet-side-stack">
          <section className="jet-panel jet-shortcuts-panel">
            <div className="jet-panel-heading compact">
              <div><span className="jet-section-kicker">FAST ACCESS</span><h2>Quick actions</h2></div>
            </div>
            <a href="#quick-reservation" className="jet-shortcut">
              <span className="jet-shortcut-icon orange">＋</span><span><b>New reservation</b><small>Start a client booking</small></span><i>↗</i>
            </a>
            <a href="#reservation-list" className="jet-shortcut">
              <span className="jet-shortcut-icon blue">▤</span><span><b>Find a reservation</b><small>Search client or booking ID</small></span><i>↗</i>
            </a>
            <button type="button" className="jet-shortcut" onClick={() => { setStatusFilter('Pending'); document.getElementById('reservation-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>
              <span className="jet-shortcut-icon amber">◷</span><span><b>Pending approvals</b><small>Review awaiting decisions</small></span><i>↗</i>
            </button>
            <div className="jet-ops-note"><span>i</span><p><b>Operations tip</b> Keep passenger details, airport codes and departure times verified before confirming a flight.</p></div>
          </section>

          <section className="jet-panel jet-departures-panel">
            <div className="jet-panel-heading compact">
              <div><span className="jet-section-kicker">FLIGHT BOARD</span><h2>Next departures</h2></div>
              <span className="jet-mini-count">03</span>
            </div>
            <div className="jet-departure-item">
              <div className="jet-departure-time"><b>09:30</b><small>23 OCT</small></div>
              <div className="jet-departure-route"><b>CMB <span>→</span> DWC</b><small>Citation Latitude · 4 pax</small></div>
              <span className="jet-status-pill confirmed">Ready</span>
            </div>
            <div className="jet-departure-item">
              <div className="jet-departure-time"><b>14:00</b><small>23 OCT</small></div>
              <div className="jet-departure-route"><b>CMB <span>→</span> MLE</b><small>Phenom 300E · 3 pax</small></div>
              <span className="jet-status-pill pending">Pending</span>
            </div>
            <div className="jet-departure-item">
              <div className="jet-departure-time"><b>08:15</b><small>24 OCT</small></div>
              <div className="jet-departure-route"><b>CMB <span>→</span> SIN</b><small>Gulfstream G280 · 6 pax</small></div>
              <span className="jet-status-pill confirmed">Ready</span>
            </div>
          </section>
        </aside>
      </div>

      <section className="jet-panel jet-reservations-panel" id="reservation-list">
        <div className="jet-reservations-heading">
          <div>
            <h2>Reservations</h2>
          </div>
          <div className="jet-table-controls">
            <label className="jet-search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search passenger, route, ID..." aria-label="Search reservations" /></label>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter reservation status">
              <option>All</option><option>Confirmed</option><option>Pending</option><option>Cancelled</option>
            </select>
          </div>
        </div>
        <div className="jet-table-wrap">
          <table className="jet-reservation-table">
            <thead><tr><th>BOOKING / PASSENGER</th><th>ROUTE</th><th>DEPARTURE</th><th>AIRCRAFT / PAX</th><th>ESTIMATE</th><th>STATUS / ACTION</th></tr></thead>
            <tbody>
              {filteredReservations.map((item) => (
                <tr key={item.id}>
                  <td><div className="jet-booking-id">{item.id}</div><b>{item.passenger}</b></td>
                  <td>{item.route}</td>
                  <td>{prettyDate(item.departure)}</td>
                  <td>{item.aircraft}<small className="jet-cell-sub">{item.passengers} passengers</small></td>
                  <td><b>{item.amount}</b></td>
                  <td><div className="jet-status-actions"><span className={`jet-status-pill ${item.status.toLowerCase()}`}>{item.status}</span><select value={item.status} onChange={(event) => setReservationStatus(item.id, event.target.value)} aria-label={`Change status for ${item.id}`}><option>Pending</option><option>Confirmed</option><option>Cancelled</option></select></div></td>
                </tr>
              ))}
              {filteredReservations.length === 0 && <tr><td colSpan="6" className="jet-empty-state">No reservations match your search.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="jet-table-footer"><span>Showing {filteredReservations.length} of {reservations.length} demo reservations</span><span>All times shown in your local browser timezone</span></div>
      </section>
      <footer className="jet-dashboard-footer"><span>JETZTHUB · PRIVATE AVIATION OPERATIONS</span><span>Secure workspace · Demo data</span></footer>
    </div>
  )
}
