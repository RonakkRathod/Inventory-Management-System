import Link from 'next/link'
import {
  ArrowRight,
  Boxes,
  ClipboardList,
  FileBox,
  LogOut,
  PackageCheck,
  RefreshCcw,
  ShieldCheck,
  Truck,
  Warehouse,
} from 'lucide-react'

const overviewCards = [
  {
    title: 'Active SKUs',
    value: '14,280',
    delta: '+4.3% this week',
    icon: Boxes,
    tone: 'teal',
  },
  {
    title: 'Open Delivery Orders',
    value: '86',
    delta: '12 high priority',
    icon: Truck,
    tone: 'orange',
  },
  {
    title: 'Pending Receipts',
    value: '42',
    delta: '8 arriving today',
    icon: FileBox,
    tone: 'slate',
  },
  {
    title: 'Cycle Count Accuracy',
    value: '99.1%',
    delta: 'Across 5 warehouses',
    icon: PackageCheck,
    tone: 'green',
  },
]

const operationFlows = [
  {
    title: 'Receipts',
    color: 'pink',
    steps: ['Receipts List', 'Create Receipt', 'Receipt Details'],
  },
  {
    title: 'Internal Transfers',
    color: 'violet',
    steps: ['Transfer List', 'Create Transfer', 'Transfer Details'],
  },
  {
    title: 'Move History',
    color: 'blue',
    steps: ['Move History'],
  },
  {
    title: 'Inventory Adjustments',
    color: 'mint',
    steps: ['Adjustments List', 'Create Adjustment', 'Adjustment Details'],
  },
  {
    title: 'Delivery Orders',
    color: 'amber',
    steps: ['Delivery List', 'Create Delivery Order', 'Delivery Details'],
  },
]

const recentEvents = [
  'Receipt RC-9821 posted by Rahul (Mumbai WH).',
  'Internal transfer IT-443 moved 120 units to Pune hub.',
  'Stock adjustment ADJ-1501 approved by supervisor.',
  'Delivery order DO-7742 packed and ready to dispatch.',
]

const authRoutes = [
  { href: '/products', label: 'Products list' },
  { href: '/products/create', label: 'Create product' },
  { href: '/products/details', label: 'Product details' },
  { href: '/profile', label: 'Profile overview' },
  { href: '/profile/security', label: 'Profile security' },
  { href: '/profile/preferences', label: 'Profile preferences' },
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Sign up' },
  { href: '/forgot-password', label: 'Forgot password' },
  { href: '/verify-code', label: 'Verify code' },
  { href: '/reset-password', label: 'Reset password' },
  { href: '/reset-success', label: 'Reset success' },
]

export default function DashboardPage() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <header className="dashboard-topbar">
          <div>
            <p className="dashboard-eyebrow">
              <Warehouse size={14} />
              CoreInventory dashboard
            </p>
            <h1>Operations command center</h1>
            <p>
              A single page that merges inventory health, operations flow, and quick links to your
              connected auth pages.
            </p>
          </div>
          <div className="dashboard-actions">
            <button type="button" className="dashboard-btn dashboard-btn--ghost">
              <RefreshCcw size={16} />
              Sync now
            </button>
            <button type="button" className="dashboard-btn dashboard-btn--primary">
              <ClipboardList size={16} />
              Create operation
            </button>
            <Link href="/login" className="dashboard-btn dashboard-btn--danger">
              <LogOut size={16} />
              Logout
            </Link>
          </div>
        </header>

        <section className="dashboard-grid">
          {overviewCards.map((card) => {
            const Icon = card.icon
            return (
              <article key={card.title} className={`overview-card overview-card--${card.tone}`}>
                <div className="overview-card__head">
                  <span>{card.title}</span>
                  <Icon size={18} />
                </div>
                <strong>{card.value}</strong>
                <small>{card.delta}</small>
              </article>
            )
          })}
        </section>

        <section className="dashboard-panels">
          <article className="panel panel--wide">
            <div className="panel__head">
              <h2>Operations flow map</h2>
              <p>Built from your workflow diagram structure for quick navigation context.</p>
            </div>

            <div className="flow-stack">
              {operationFlows.map((flow) => (
                <div key={flow.title} className="flow-row">
                  <span className={`flow-badge flow-badge--${flow.color}`}>{flow.title}</span>
                  <div className="flow-steps">
                    {flow.steps.map((step, index) => (
                      <div key={step} className="flow-step-wrap">
                        <div className="flow-step">{step}</div>
                        {index < flow.steps.length - 1 ? <ArrowRight size={16} /> : null}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel__head">
              <h2>Connected auth pages</h2>
              <p>Jump directly into every existing auth route in this project.</p>
            </div>
            <div className="route-pills">
              {authRoutes.map((route) => (
                <Link key={route.href} href={route.href} className="route-pill">
                  {route.label}
                </Link>
              ))}
            </div>
            <div className="status-card">
              <ShieldCheck size={18} />
              <p>
                Security note: keep auth pages isolated from operations logic, and route users to
                this dashboard after successful sign-in.
              </p>
            </div>
          </article>

          <article className="panel">
            <div className="panel__head">
              <h2>Recent activity</h2>
              <p>Last synced events from receipts, transfers, and dispatch operations.</p>
            </div>
            <ul className="activity-list">
              {recentEvents.map((event) => (
                <li key={event}>{event}</li>
              ))}
            </ul>
          </article>
        </section>
      </section>
    </main>
  )
}
