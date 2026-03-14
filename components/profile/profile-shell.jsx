import Link from 'next/link'
import {
  Bell,
  CircleCheck,
  KeyRound,
  ShieldCheck,
  UserRound,
  Warehouse,
} from 'lucide-react'

const pageNav = [
  { href: '/profile', label: 'Overview' },
  { href: '/profile/security', label: 'Security' },
  { href: '/profile/preferences', label: 'Preferences' },
]

function ProfileCard({ item }) {
  const Icon = item.icon
  return (
    <article className="profile-card">
      <div className="profile-card__head">
        <span>{item.label}</span>
        <Icon size={16} />
      </div>
      <strong>{item.value}</strong>
      <small>{item.hint}</small>
    </article>
  )
}

export default function ProfileShell({ page }) {
  return (
    <main className="profile-page">
      <section className="profile-shell">
        <header className="profile-header">
          <div>
            <p className="profile-eyebrow">
              <Warehouse size={14} />
              CoreInventory profile
            </p>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
          </div>
          <div className="profile-header-actions">
            <Link href="/dashboard" className="profile-dashboard-link">
              Back to dashboard
            </Link>
            <Link href="/login" className="profile-logout-link">
              Logout
            </Link>
          </div>
        </header>

        <nav className="profile-tabs">
          {pageNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`profile-tab${page.path === item.href ? ' profile-tab--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <section className="profile-grid">
          <article className="profile-panel profile-panel--wide">
            <div className="profile-panel__head">
              <h2>{page.sectionTitle}</h2>
              <p>{page.sectionText}</p>
            </div>

            <div className="profile-details">
              {page.fields.map((field) => (
                <div key={field.label} className="profile-field">
                  <span>{field.label}</span>
                  <strong>{field.value}</strong>
                </div>
              ))}
            </div>

            {page.tips?.length ? (
              <ul className="profile-tips">
                {page.tips.map((tip) => (
                  <li key={tip}>
                    <CircleCheck size={16} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>

          <article className="profile-panel">
            <div className="profile-panel__head">
              <h2>Account snapshot</h2>
              <p>Quick profile health and access details.</p>
            </div>

            <div className="profile-cards">
              {page.cards.map((card) => (
                <ProfileCard key={card.label} item={card} />
              ))}
            </div>
          </article>

          <article className="profile-panel">
            <div className="profile-panel__head">
              <h2>Quick actions</h2>
              <p>Common account actions connected to your current flow.</p>
            </div>

            <div className="profile-actions">
              <Link href="/login" className="profile-action">
                <UserRound size={16} />
                Login page
              </Link>
              <Link href="/forgot-password" className="profile-action">
                <KeyRound size={16} />
                Password recovery
              </Link>
              <Link href="/verify-code" className="profile-action">
                <ShieldCheck size={16} />
                Verify identity
              </Link>
              <Link href="/dashboard" className="profile-action">
                <Bell size={16} />
                Operations dashboard
              </Link>
            </div>
          </article>
        </section>
      </section>
    </main>
  )
}
