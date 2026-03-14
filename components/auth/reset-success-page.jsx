import AuthShell from './auth-shell'

export const resetSuccessPageData = {
  path: '/reset-success',
  heroTitle: 'Bring users back into the product with a confident success state and direct next step.',
  heroText:
    'The final page closes the recovery loop and moves users back to work without ambiguity.',
  quote:
    '“Success screens are usually forgettable. This one feels considered and gives the user a clear handoff.”',
  quoteAuthor: 'Ishaan Mehta, Frontend Lead',
  panelEyebrow: 'All set',
  title: 'Password updated successfully',
  description: 'Your credentials were changed and all inactive sessions have been signed out.',
  showForm: false,
  success: {
    title: 'Security refresh complete',
    text: 'Use your new password the next time you access the dashboard, mobile scanner, or supervisor console.',
  },
  status: {
    title: 'Recommended next step',
    text: 'Review your last login activity after you sign back in if this reset was unexpected.',
  },
  primaryAction: 'Go to dashboard',
  primaryActionHref: '/dashboard',
  secondaryAction: { href: '/login', label: 'Back to login screen' },
  footerText: 'Need another recovery attempt?',
  footerLink: { href: '/forgot-password', label: 'Start over' },
  accentAction: true,
}

export default function ResetSuccessAuthPage({ pageData = resetSuccessPageData }) {
  return <AuthShell page={pageData} />
}