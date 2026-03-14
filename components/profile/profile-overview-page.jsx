import { Bell, ShieldCheck, UserRound } from 'lucide-react'
import ProfileShell from './profile-shell'

const page = {
  path: '/profile',
  title: 'Profile overview',
  description:
    'Manage personal details, role identity, and workspace account visibility in a single themed profile area.',
  sectionTitle: 'Personal information',
  sectionText: 'These fields reflect the user identity currently linked to warehouse and operations access.',
  fields: [
    { label: 'Full name', value: 'Aarav Shah' },
    { label: 'Role', value: 'Operations Lead' },
    { label: 'Work email', value: 'aarav@coreinventory.com' },
    { label: 'Primary warehouse', value: 'Mumbai Central Hub' },
    { label: 'Employee ID', value: 'CI-OPS-2411' },
    { label: 'Timezone', value: 'Asia/Kolkata (IST)' },
  ],
  tips: [
    'Keep your work email current to avoid password recovery delays.',
    'Update warehouse assignment when moving across regions.',
    'Review profile details before requesting additional role permissions.',
  ],
  cards: [
    { label: 'Profile completion', value: '92%', hint: '1 optional field remaining', icon: UserRound },
    { label: 'Last sign in', value: '2h ago', hint: 'from Mumbai, IN', icon: ShieldCheck },
    { label: 'Unread alerts', value: '3', hint: 'security and operations notices', icon: Bell },
  ],
}

export default function ProfileOverviewPage() {
  return <ProfileShell page={page} />
}
