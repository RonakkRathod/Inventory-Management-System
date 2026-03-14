'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  CircleDashed,
  Eye,
  EyeOff,
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
  { href: '/dashboard', label: 'Dashboard', disabled: true },
  { href: '/products', label: 'Products', disabled: true },
  { href: '/products/create', label: 'Create Product', disabled: true },
  { href: '/products/details', label: 'Product Details', disabled: true },
  { href: '/profile', label: 'Profile', disabled: true },
  { href: '/profile/security', label: 'Security', disabled: true },
  { href: '/profile/preferences', label: 'Preferences', disabled: true },
  { href: '/login', label: 'Sign in' },
  { href: '/signup', label: 'Create account' },
  { href: '/forgot-password', label: 'Recover' },
  { href: '/verify-code', label: 'Verify' },
  { href: '/reset-password', label: 'Reset' },
  { href: '/reset-success', label: 'Success' },
]

function Field({ field }) {
  const Icon = iconMap[field.icon] ?? Mail
  const isPasswordField = field.type === 'password'
  const [showPassword, setShowPassword] = useState(false)

  const inputType = isPasswordField && showPassword ? 'text' : field.type
  const ToggleIcon = showPassword ? EyeOff : Eye

  return (
    <div className="field">
      <label htmlFor={field.name}>{field.label}</label>
      <div className="input-shell">
        <Icon size={18} strokeWidth={2} className="field-icon" />
        <input
          id={field.name}
          name={field.name}
          type={inputType}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
        />
        {isPasswordField ? (
          <button
            type="button"
            className="password-toggle"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <ToggleIcon size={18} strokeWidth={2} />
          </button>
        ) : null}
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
  const router = useRouter()
  const isSignupPage = page.path === '/signup'
  const hasRelaxedFooterSpacing = ['/signup', '/login', '/verify-code'].includes(page.path)
  const hasRelaxedFooterCopy = ['/login', '/verify-code'].includes(page.path)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? 'http://127.0.0.1:4000/api'

  const showToast = (message, type = 'success') => {
    if (!message) return
    if (type === 'error') {
      toast.error(message)
      return
    }

    toast.success(message)
  }

  const persistSession = (result) => {
    if (result?.token) {
      localStorage.setItem('coreinventory_token', result.token)
    }

    if (result?.user) {
      localStorage.setItem('coreinventory_user', JSON.stringify(result.user))
    }
  }

  const postRequest = async (path, payload, token) => {
    const response = await fetch(`${backendApiUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(data.message || 'Request failed.')
    }

    return data
  }

  const handleAuthSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      if (page.path === '/signup') {
        const result = await postRequest('/auth/signup', {
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          password: formData.get('password'),
        })

        persistSession(result)
        showToast('Account created successfully.', 'success')
        setTimeout(() => router.push('/dashboard'), 450)
        return
      }

      if (page.path === '/login') {
        const result = await postRequest('/auth/login', {
          email: formData.get('email'),
          password: formData.get('password'),
        })

        persistSession(result)
        showToast('Login successful.', 'success')
        setTimeout(() => router.push('/dashboard'), 450)
        return
      }

      if (page.path === '/forgot-password') {
        const email = String(formData.get('email') || '').trim().toLowerCase()
        const result = await postRequest('/auth/request-otp', { email, purpose: 'password_reset' })
        sessionStorage.setItem('coreinventory_reset_email', email)
        sessionStorage.setItem('coreinventory_otp_purpose', 'password_reset')
        showToast(result.devOtp ? `OTP sent. Dev OTP: ${result.devOtp}` : 'OTP sent successfully.', 'success')
        setTimeout(() => router.push('/verify-code'), 700)
        return
      }

      if (page.path === '/verify-code') {
        const email = sessionStorage.getItem('coreinventory_reset_email') || ''
        const purpose = sessionStorage.getItem('coreinventory_otp_purpose') || 'password_reset'
        if (!email) {
          throw new Error('Recovery email not found. Start from forgot-password page again.')
        }

        const otp = Array.from(form.querySelectorAll('.otp-input'))
          .map((input) => input.value)
          .join('')

        if (otp.length !== 6) {
          throw new Error('Enter the complete 6-digit verification code.')
        }

        const result = await postRequest('/auth/verify-otp', { email, otp, purpose })

        if (purpose === 'login' && result?.token) {
          persistSession(result)
          sessionStorage.removeItem('coreinventory_reset_email')
          sessionStorage.removeItem('coreinventory_otp_purpose')
          showToast('OTP correct. Logged in successfully.', 'success')
          setTimeout(() => router.push('/dashboard'), 500)
          return
        }

        showToast('OTP verified successfully.', 'success')
        setTimeout(() => router.push('/reset-password'), 500)
        return
      }

      if (page.path === '/reset-password') {
        const email = sessionStorage.getItem('coreinventory_reset_email') || ''
        if (!email) {
          throw new Error('Recovery email not found. Start from forgot-password page again.')
        }

        const newPassword = String(formData.get('newPassword') || '')
        const confirmPassword = String(formData.get('confirmPassword') || '')

        if (newPassword !== confirmPassword) {
          throw new Error('New password and confirm password must match.')
        }

        await postRequest('/auth/reset-password', { email, newPassword })
        sessionStorage.removeItem('coreinventory_reset_email')
        sessionStorage.removeItem('coreinventory_otp_purpose')
        showToast('Password updated successfully.', 'success')
        setTimeout(() => router.push('/reset-success'), 500)
        return
      }

      showToast('Form submitted successfully.', 'success')
    } catch (error) {
      showToast(error.message || 'Something went wrong.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOtpLoginRequest = async () => {
    setIsSubmitting(true)

    try {
      const emailInput = document.getElementById('email')
      const email = String(emailInput?.value || '').trim().toLowerCase()

      if (!email) {
        throw new Error('Enter your email on login page before requesting OTP.')
      }

      const result = await postRequest('/auth/request-otp', { email, purpose: 'login' })
      sessionStorage.setItem('coreinventory_reset_email', email)
      sessionStorage.setItem('coreinventory_otp_purpose', 'login')

      const successMessage = result.devOtp
        ? `OTP sent. Dev OTP: ${result.devOtp}`
        : 'OTP sent successfully. Check your email.'

      showToast(successMessage, 'success')
      router.push('/verify-code')
    } catch (error) {
      showToast(error.message || 'Unable to request OTP.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className={`auth-shell${isSignupPage ? ' auth-shell--signup' : ''}`}>
        <aside className={`auth-hero${isSignupPage ? ' auth-hero--signup' : ''}`}>
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

          <div className={`auth-hero__content${isSignupPage ? ' auth-hero__content--signup' : ''}`}>
            <div className={isSignupPage ? 'hero-copy hero-copy--signup' : 'hero-copy'}>
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

          <div className={`hero-footer${hasRelaxedFooterSpacing ? ' hero-footer--spacious' : ''}`}>
            <div className={`page-links${page.path === '/login' ? ' page-links--login' : ''}${hasRelaxedFooterSpacing ? ' page-links--spacious' : ''}`}>
              {pageLinks.map((item) => {
                const className = `page-pill${page.path === item.href ? ' page-pill--active' : ''}${item.disabled ? ' page-pill--disabled' : ''}`

                if (item.disabled) {
                  return (
                    <span key={item.href} className={className} aria-disabled="true" title="Available after sign in">
                      {item.label}
                    </span>
                  )
                }

                return (
                  <Link key={item.href} href={item.href} className={className}>
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>

        <section className="auth-panel">
          <div className="auth-card">
            <div className="panel-intro">
              <span className="eyebrow status-banner__icon" style={{ background: 'var(--primary-soft)', borderColor: 'rgba(37, 99, 235, 0.12)' }}>
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
                <KeyRound size={18} className="status-banner__icon" />
                <div>
                  <strong>{page.status.title}</strong>
                  <p>{page.status.text}</p>
                </div>
              </div>
            ) : null}

            {page.showForm ? (
              <form className="auth-form" onSubmit={handleAuthSubmit}>
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
                        <CheckCircle2 size={18} className="security-icon" />
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
                  disabled={isSubmitting}
                  className={`primary-button${page.accentAction ? ' primary-button--accent' : ''}`}
                >
                  {isSubmitting ? 'Please wait...' : page.primaryAction}
                  <ArrowRight size={18} />
                </button>

                {page.secondaryAction ? (
                  page.path === '/login' && page.secondaryAction.href === '/verify-code' ? (
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={handleOtpLoginRequest}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Please wait...' : page.secondaryAction.label}
                      <MoveRight size={18} />
                    </button>
                  ) : (
                    <Link href={page.secondaryAction.href} className="secondary-button">
                      {page.secondaryAction.label}
                      <MoveRight size={18} />
                    </Link>
                  )
                ) : null}
              </form>
            ) : null}

            {page.success ? (
              <div className="success-block">
                <CheckCircle2 size={22} className="success-icon" />
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

            <div className={`footer-copy${hasRelaxedFooterCopy ? ' footer-copy--relaxed' : ''}`}>
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