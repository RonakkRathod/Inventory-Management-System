import AuthShell from './auth-shell'

const page = {
  path: '/signup',
  heroTitle: 'Launch a new inventory workspace with role-ready access from day one.',
  heroText:
    'Bring procurement, warehouse, and reporting teams into a single login flow with guided onboarding and clean security cues.',
  quote:
    '“The signup view feels premium and structured, which helps when onboarding distributors and internal teams at the same time.”',
  quoteAuthor: 'Mira Patel, Product Manager',
  panelEyebrow: 'Create account',
  title: 'Set up your access profile',
  description: 'Create a company account and invite the rest of your inventory team later.',
  showSocial: true,
  showForm: true,
  fields: [
    { name: 'firstName', label: 'First name', type: 'text', placeholder: 'Aarav', icon: 'user' },
    { name: 'lastName', label: 'Last name', type: 'text', placeholder: 'Shah', icon: 'user' },
    { name: 'email', label: 'Company email', type: 'email', placeholder: 'ops@coreinventory.com', icon: 'email' },
    { name: 'password', label: 'Create password', type: 'password', placeholder: 'Choose a strong password', icon: 'password' },
  ],
  showTerms: true,
  primaryAction: 'Create account',
  footerText: 'Already have access?',
  footerLink: { href: '/login', label: 'Sign in instead' },
}

export default function SignupAuthPage() {
  return <AuthShell page={page} />
}