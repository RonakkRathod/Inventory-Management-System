import { KeyRound, ShieldCheck, Smartphone } from 'lucide-react'
import ProfileShell from './profile-shell'

const page = {
  path: '/profile/security',
  title: 'Security settings',
  description:
    'Control authentication methods, trusted devices, and session security with the same CoreInventory visual style.',
  sectionTitle: 'Authentication controls',
  sectionText: 'Configure sign-in options used across login, verification, and reset pages.',
  fields: [
    { label: 'Password status', value: 'Updated 6 days ago' },
    { label: 'Multi-factor auth', value: 'Enabled (Email + OTP)' },
    { label: 'Trusted devices', value: '5 active devices' },
    { label: 'Recovery contact', value: 'security@coreinventory.com' },
    { label: 'Session timeout', value: '30 minutes' },
    { label: 'Login alerts', value: 'Enabled for new locations' },
  ],
  tips: [
    'Rotate passwords on shared supervisor terminals every 30 days.',
    'Disable inactive devices after shift handovers.',
    'Always verify unusual login alerts from unknown locations.',
  ],
  cards: [
    { label: '2FA strength', value: 'Strong', hint: 'OTP required on unknown devices', icon: ShieldCheck },
    { label: 'Reset policy', value: 'Compliant', hint: 'Policy CI-SEC-02', icon: KeyRound },
    { label: 'Mobile authenticator', value: 'Connected', hint: 'Last synced today', icon: Smartphone },
  ],
}

export default function ProfileSecurityPage() {
  return <ProfileShell page={page} />
}
