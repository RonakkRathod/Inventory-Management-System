import AuthShell from './auth-shell'

export const loginPageData = {
  path: '/login',
  heroTitle: 'Access warehouse, sales, and stock intelligence from one secure gate.',
  heroText:
    'A polished sign-in experience for your inventory teams, built for fast shifts, delegated roles, and secure handoffs across procurement and fulfillment.',
  quote:
    '“Our supervisors needed a login flow that felt enterprise-ready without slowing down shift changes. This layout gives us clarity and speed.”',
  quoteAuthor: 'Aarav Shah, Operations Lead',
  panelEyebrow: 'Welcome back',
  title: 'Sign in to your workspace',
  description: 'Use your work email or SSO provider to continue into CoreInventory.',
  showSocial: false,
  showForm: true,
  fields: [
    { name: 'email', label: 'Work email', type: 'email', placeholder: 'alex@coreinventory.com', icon: 'email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', icon: 'password' },
  ],
  showRemember: true,
  primaryAction: 'Sign in securely',
  secondaryAction: { href: '/verify-code', label: 'Use verification code instead' },
  footerText: 'New to the platform?',
  footerLink: { href: '/signup', label: 'Create an account' },
}

export default function LoginAuthPage({ pageData = loginPageData }) {
  return <AuthShell page={pageData} />
}