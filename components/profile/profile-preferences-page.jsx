import { Globe2, Palette, SlidersHorizontal } from 'lucide-react'
import ProfileShell from './profile-shell'

const page = {
  path: '/profile/preferences',
  title: 'Workspace preferences',
  description:
    'Adjust notifications, display behavior, and operational defaults while preserving the same design language.',
  sectionTitle: 'Experience preferences',
  sectionText: 'Personalize how dashboard and operations pages behave for your role.',
  fields: [
    { label: 'Default landing page', value: 'Dashboard' },
    { label: 'Digest emails', value: 'Every weekday at 8:30 AM' },
    { label: 'Critical alerts', value: 'Push + Email' },
    { label: 'Chart density', value: 'Comfortable' },
    { label: 'Rows per table', value: '25 rows' },
    { label: 'Language', value: 'English (India)' },
  ],
  tips: [
    'Keep critical alert channels enabled for dispatch incidents.',
    'Use dashboard as landing page for shift-based operations teams.',
    'Adjust table density based on your screen size and role workflow.',
  ],
  cards: [
    { label: 'Theme profile', value: 'Core light', hint: 'Matches system theme tokens', icon: Palette },
    { label: 'Locale', value: 'en-IN', hint: 'IST time + INR formatting', icon: Globe2 },
    { label: 'Automation rules', value: '4 active', hint: 'For receipts and delivery alerts', icon: SlidersHorizontal },
  ],
}

export default function ProfilePreferencesPage() {
  return <ProfileShell page={page} />
}
