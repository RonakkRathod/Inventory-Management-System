import AuthShell from './auth-shell'

export const forgotPasswordPageData = {
  path: '/forgot-password',
  heroTitle: 'Recover account access without sending your team through support tickets.',
  heroText:
    'Use a concise recovery experience that gets operators back into stock counts and order reviews quickly.',
  quote:
    '“Password recovery now feels like part of the product instead of a dead-end utility page.”',
  quoteAuthor: 'Riya Nair, UX Researcher',
  panelEyebrow: 'Password recovery',
  title: 'Forgot your password?',
  description: 'Enter the email linked to your account and we will send a secure reset link.',
  showForm: true,
  fields: [
    { name: 'email', label: 'Registered email', type: 'email', placeholder: 'warehouse@coreinventory.com', icon: 'email' },
  ],
  status: {
    title: 'Recovery link expires in 15 minutes',
    text: 'This keeps shared warehouse devices and temporary sessions protected.',
  },
  primaryAction: 'Send reset instructions',
  secondaryAction: { href: '/login', label: 'Back to sign in' },
  footerText: 'Need a different route?',
  footerLink: { href: '/verify-code', label: 'Verify with a one-time code' },
}

export default function ForgotPasswordAuthPage({ pageData = forgotPasswordPageData }) {
  return <AuthShell page={pageData} />
}