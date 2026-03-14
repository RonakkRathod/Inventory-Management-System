'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  CircleDashed,
  KeyRound,
  LockKeyhole,
  Mail,
  MoveRight,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react'

const iconMap = {
  email: Mail,
  password: LockKeyhole,
  user: UserRound,
  code: CircleDashed,
}

const pageLinks = [
  ['/dashboard', 'Dashboard'],
  ['/products', 'Products'],
  ['/products/create', 'Create Product'],
  ['/products/details', 'Product Details'],
  ['/profile', 'Profile'],
  ['/profile/security', 'Security'],
  ['/profile/preferences', 'Preferences'],
  ['/login', 'Sign in'],
  ['/signup', 'Create account'],
  ['/forgot-password', 'Recover'],
  ['/verify-code', 'Verify'],
  ['/reset-password', 'Reset'],
  ['/reset-success', 'Success'],
]

function Field({ field }) {
  const Icon = iconMap[field.icon] ?? Mail

  return (
    <div className="field">
      <label htmlFor={field.name}>{field.label}</label>
      <div className="input-shell">
        <Icon size={18} strokeWidth={2} color="#5f6b76" />
        <input
          id={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
        />
      </div>
    </div>
  )
}

function OtpInput({ length = 6 }) {
  const [otp, setOtp] = useState(Array.from({ length }, () => ''))
  const inputRefs = useRef([])

  const focusInput = (index) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus()
      inputRefs.current[index]?.select()
    }
  }

  const handleChange = (index, value) => {
    const cleanValue = value.replace(/\D/g, '')
    if (!cleanValue) {
      const nextOtp = [...otp]
      nextOtp[index] = ''
      setOtp(nextOtp)
      return
    }

    const nextOtp = [...otp]
    nextOtp[index] = cleanValue[0]
    setOtp(nextOtp)
    focusInput(index + 1)
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index]) {
      focusInput(index - 1)
    }
  }

  const handlePaste = (event) => {
    event.preventDefault()
    const pasteValue = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasteValue) return

    const nextOtp = Array.from({ length }, (_, idx) => pasteValue[idx] ?? '')
    setOtp(nextOtp)
    focusInput(Math.min(pasteValue.length, length - 1))
  }

  return (
    <div className="otp-row" aria-label="Verification code input">
      {otp.map((digit, index) => (
        <input
          key={`otp-${index}`}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          className="otp-cell otp-input"
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={digit}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  )
}

export default function AuthShell({ page }) {
  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-hero">
          <div className="brand-row">
            <div className="brand-mark">
              <span className="brand-mark__badge">
                <Building2 size={20} />
              </span>
              <span>CoreInventory</span>
            </div>
            <span className="eyebrow">
              <Sparkles size={14} />
              Modern auth flow
            </span>
          </div>

          <div className="auth-hero__content">
            <div>
              <span className="eyebrow">
                <ShieldCheck size={14} />
                Secure workspace access
              </span>
              <h1>{page.heroTitle}</h1>
              <p>{page.heroText}</p>
            </div>

            <div className="hero-metrics">
              <article className="metric-card">
                <strong>99.98%</strong>
                <span>Session uptime across warehouse and sales teams.</span>
              </article>
              <article className="metric-card">
                <strong>&lt; 2 min</strong>
                <span>Average onboarding time for new inventory operators.</span>
              </article>
              <article className="metric-card">
                <strong>12 regions</strong>
                <span>Role-based access patterns supported from one entry point.</span>
              </article>
            </div>

            <article className="hero-quote">
              <p>{page.quote}</p>
              <small>{page.quoteAuthor}</small>
            </article>
          </div>

          <div className="hero-footer">
            <div className={`page-links${page.path === '/login' ? ' page-links--login' : ''}`}>
              {pageLinks.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className={`page-pill${page.path === href ? ' page-pill--active' : ''}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <section className="auth-panel">
          <div className="auth-card">
            <div className="panel-intro">
              <span className="eyebrow" style={{ color: '#0f766e', background: 'rgba(15, 118, 110, 0.08)', borderColor: 'rgba(15, 118, 110, 0.12)' }}>
                <BadgeCheck size={14} />
                {page.panelEyebrow}
              </span>
              <h2>{page.title}</h2>
              <p>{page.description}</p>
            </div>

            {page.showSocial ? (
              <>
                <div className="social-grid">
                  <button type="button" className="social-button">
                    <span>G</span>
                    Continue with Google
                  </button>
                  <button type="button" className="social-button">
                    <span>M</span>
                    Continue with Microsoft
                  </button>
                </div>
                <div className="divider">or continue with email</div>
              </>
            ) : null}

            {page.status ? (
              <div className="status-banner">
                <KeyRound size={18} color="#0f766e" />
                <div>
                  <strong>{page.status.title}</strong>
                  <p>{page.status.text}</p>
                </div>
              </div>
            ) : null}

            {page.showForm ? (
              <form className="auth-form">
                {page.fields?.length > 2 ? (
                  <div className="field-grid">
                    {page.fields.map((field) => (
                      <Field key={field.name} field={field} />
                    ))}
                  </div>
                ) : (
                  page.fields?.map((field) => <Field key={field.name} field={field} />)
                )}

                {page.showRemember ? (
                  <div className="hint-row">
                    <label className="checkbox-row">
                      <input type="checkbox" defaultChecked />
                      Keep this device trusted for 30 days
                    </label>
                    <Link href="/forgot-password" className="text-link">
                      Forgot password?
                    </Link>
                  </div>
                ) : null}

                {page.showTerms ? (
                  <label className="checkbox-row">
                    <input type="checkbox" defaultChecked />
                    I agree to the Terms of Service and the inventory access policy.
                  </label>
                ) : null}

                {page.showOtp ? (
                  <OtpInput length={6} />
                ) : null}

                {page.securityTips ? (
                  <ul className="security-list">
                    {page.securityTips.map((tip) => (
                      <li key={tip.title}>
                        <CheckCircle2 size={18} color="#1d8348" />
                        <div>
                          <strong>{tip.title}</strong>
                          <span>{tip.text}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <button
                  type="submit"
                  className={`primary-button${page.accentAction ? ' primary-button--accent' : ''}`}
                >
                  {page.primaryAction}
                  <ArrowRight size={18} />
                </button>

                {page.secondaryAction ? (
                  <Link href={page.secondaryAction.href} className="secondary-button">
                    {page.secondaryAction.label}
                    <MoveRight size={18} />
                  </Link>
                ) : null}
              </form>
            ) : null}

            {page.success ? (
              <div className="success-block">
                <CheckCircle2 size={22} color="#1d8348" />
                <div>
                  <strong>{page.success.title}</strong>
                  <p>{page.success.text}</p>
                </div>
              </div>
            ) : null}

            {!page.showForm && (page.primaryAction || page.secondaryAction) ? (
              <div className="auth-actions">
                {page.primaryAction ? (
                  <Link
                    href={page.primaryActionHref ?? '/login'}
                    className={`primary-button${page.accentAction ? ' primary-button--accent' : ''}`}
                  >
                    {page.primaryAction}
                    <ArrowRight size={18} />
                  </Link>
                ) : null}

                {page.secondaryAction ? (
                  <Link href={page.secondaryAction.href} className="secondary-button">
                    {page.secondaryAction.label}
                    <MoveRight size={18} />
                  </Link>
                ) : null}
              </div>
            ) : null}

            <div className={`footer-copy${page.path === '/login' ? ' footer-copy--login' : ''}`}>
              <span>{page.footerText}</span>
              {page.footerLink ? (
                <Link href={page.footerLink.href} className={`inline-link${page.footerLink.accent ? ' text-link--accent' : ''}`}>
                  {page.footerLink.label}
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}