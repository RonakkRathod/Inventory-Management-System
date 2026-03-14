"use client"

import Link from 'next/link'
import { useState } from 'react'
import {
  Bell,
  CircleCheck,
  Globe2,
  KeyRound,
  Palette,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  UserRound,
  Warehouse,
} from 'lucide-react'
import toast from 'react-hot-toast'

function getProfileStorageKey(path) {
  return `coreinventory_profile_fields_${String(path || 'profile').replace(/\//g, '_')}`
}

const ROLE_OPTIONS = [
  'Operations Lead',
  'Warehouse Manager',
  'Inventory Analyst',
  'Dispatch Coordinator',
  'Procurement Specialist',
]

const LANGUAGE_OPTIONS = ['English', 'Hindi', 'Gujarati']

const TIMEZONE_OPTIONS = [
  'Asia/Kolkata (IST)',
  'Asia/Dubai (GST)',
  'Europe/London (GMT)',
  'America/New_York (EST)',
  'Asia/Singapore (SGT)',
]

function getPersistedFields(path, fallbackFields) {
  if (typeof window === 'undefined') {
    return fallbackFields
  }

  const raw = localStorage.getItem(getProfileStorageKey(path))
  if (!raw) return fallbackFields

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return fallbackFields
    }

    return fallbackFields.map((field) => {
      const match = parsed.find((item) => item.label === field.label)
      return match ? { ...field, value: match.value } : field
    })
  } catch {
    return fallbackFields
  }
}

const profileCardIconMap = {
  bell: Bell,
  device: Smartphone,
  globe: Globe2,
  key: KeyRound,
  palette: Palette,
  shield: ShieldCheck,
  sliders: SlidersHorizontal,
  user: UserRound,
}

const pageNav = [
  { href: '/profile', label: 'Overview' },
  { href: '/profile/security', label: 'Security' },
  { href: '/profile/preferences', label: 'Preferences' },
]

function ProfileCard({ item }) {
  const Icon = typeof item.icon === 'function' ? item.icon : profileCardIconMap[item.icon] ?? UserRound
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
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editableFields, setEditableFields] = useState(page.fields)

  const handleFieldChange = (label, value) => {
    setEditableFields((prev) => prev.map((field) => (field.label === label ? { ...field, value } : field)))
  }

  const handleProfileSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(getProfileStorageKey(page.path), JSON.stringify(editableFields))
    }

    setIsEditingProfile(false)
    toast.success('Profile details saved successfully.')
  }

  const handleProfileCancel = () => {
    setEditableFields(getPersistedFields(page.path, page.fields))
    setIsEditingProfile(false)
  }

  const displayedFields = editableFields

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
            <div className="profile-panel__head profile-panel__head--actions">
              <div>
                <h2>{page.sectionTitle}</h2>
                <p>{page.sectionText}</p>
              </div>

              <div className="profile-inline-actions">
                {!isEditingProfile ? (
                  <button
                    type="button"
                    className="profile-edit-btn"
                    onClick={() => {
                      setEditableFields(getPersistedFields(page.path, page.fields))
                      setIsEditingProfile(true)
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button type="button" className="profile-edit-btn profile-edit-btn--ghost" onClick={handleProfileCancel}>
                      Cancel
                    </button>
                    <button type="button" className="profile-edit-btn" onClick={handleProfileSave}>
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="profile-details">
              {displayedFields.map((field) => (
                <div key={field.label} className="profile-field">
                  <span>{field.label}</span>
                  {isEditingProfile ? (
                    field.label === 'Language' ? (
                      <select
                        className="profile-edit-input"
                        value={field.value}
                        onChange={(event) => handleFieldChange(field.label, event.target.value)}
                      >
                        {LANGUAGE_OPTIONS.map((language) => (
                          <option key={language} value={language}>
                            {language}
                          </option>
                        ))}
                      </select>
                    ) : field.label === 'Role' ? (
                      <select
                        className="profile-edit-input"
                        value={field.value}
                        onChange={(event) => handleFieldChange(field.label, event.target.value)}
                      >
                        {ROLE_OPTIONS.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    ) : field.label === 'Timezone' ? (
                      <select
                        className="profile-edit-input"
                        value={field.value}
                        onChange={(event) => handleFieldChange(field.label, event.target.value)}
                      >
                        {TIMEZONE_OPTIONS.map((timezone) => (
                          <option key={timezone} value={timezone}>
                            {timezone}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className="profile-edit-input"
                        value={field.value}
                        onChange={(event) => handleFieldChange(field.label, event.target.value)}
                      />
                    )
                  ) : (
                    <strong>{field.value}</strong>
                  )}
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
