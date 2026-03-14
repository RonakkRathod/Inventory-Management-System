import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import './globals.css'
import ToastProvider from '../components/ui/toast-provider'
import ThemeToggle from '../components/ui/theme-toggle'

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

const headingFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
})

export const metadata = {
  title: 'CoreInventory UI',
  description: 'Responsive authentication, dashboard, and profile pages for the inventory management system.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <ThemeToggle />
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}