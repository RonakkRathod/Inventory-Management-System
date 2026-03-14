import AuthShell from './auth-shell'

const page = {
  path: '/reset-password',
  heroTitle: 'Reset credentials with clear guidance and stronger password hygiene built in.',
  heroText:
    'Keep security standards high while making the reset step easy enough for non-technical teams to finish without friction.',
  quote:
    '“This screen balances trust and clarity. Users know what to do, and security still feels deliberate.”',
  quoteAuthor: 'Devika Rao, Security Analyst',
  panelEyebrow: 'Set new password',
  title: 'Choose a new password',
  description: 'Use a unique password for your CoreInventory workspace and confirm it once.',
  showForm: true,
  fields: [
    { name: 'newPassword', label: 'New password', type: 'password', placeholder: 'At least 12 characters', icon: 'password' },
    { name: 'confirmPassword', label: 'Confirm password', type: 'password', placeholder: 'Re-enter password', icon: 'password' },
  ],
  securityTips: [
    { title: 'Use a passphrase', text: 'Longer memorable phrases are easier to recall and harder to guess.' },
    { title: 'Avoid reused credentials', text: 'Do not reuse passwords from supplier portals or internal tools.' },
    { title: 'Store it safely', text: 'Use your approved company password manager for recovery-safe access.' },
  ],
  primaryAction: 'Update password',
  secondaryAction: { href: '/reset-success', label: 'Preview success state' },
  footerText: 'Want to cancel?',
  footerLink: { href: '/login', label: 'Return to sign in' },
}

export default function ResetPasswordAuthPage() {
  return <AuthShell page={page} />
}