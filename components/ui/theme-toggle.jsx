'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect } from 'react'

const THEME_STORAGE_KEY = 'coreinventory_theme'

export default function ThemeToggle() {
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    const resolvedTheme =
      savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

    document.documentElement.setAttribute('data-theme', resolvedTheme)
    localStorage.setItem(THEME_STORAGE_KEY, resolvedTheme)
  }, [])

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle theme-toggle--ready"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <Sun size={18} className="theme-icon theme-icon--sun" />
      <Moon size={18} className="theme-icon theme-icon--moon" />
    </button>
  )
}
