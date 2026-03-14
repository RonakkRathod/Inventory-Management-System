import AuthShell from './auth-shell'

export const verifyCodePageData = {
  path: '/verify-code',
  heroTitle: 'Confirm identity with a lightweight verification step designed for shared devices.',
  heroText:
    'A code-first checkpoint is useful for warehouse kiosks, temporary handovers, and supervisor approval flows.',
  quote:
    '“The verification screen reads clearly on tablets and shared terminals, which matters on busy floors.”',
  quoteAuthor: 'Neil Fernandes, Warehouse Systems Admin',
  panelEyebrow: 'Two-step access',
  title: 'Enter verification code',
  description: 'We sent a 6-digit code to alex@coreinventory.com. Enter it below to continue.',
  showForm: true,
  showOtp: true,
  status: {
    title: 'Code delivered successfully',
    text: 'If you do not see it, check spam or request a fresh code below.',
  },
  primaryAction: 'Verify and continue',
  secondaryAction: { href: '/reset-password', label: 'Open password reset flow' },
  footerText: 'Code not received?',
  footerLink: { href: '/verify-code', label: 'Resend code', accent: true },
}

export default function VerifyCodeAuthPage({ pageData = verifyCodePageData }) {
  return <AuthShell page={pageData} />
}