'use client'

import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 3200,
        style: {
          borderRadius: '14px',
          border: '1px solid rgba(15, 23, 42, 0.12)',
          background: '#ffffff',
          color: '#0f172a',
          boxShadow: '0 14px 26px rgba(15, 23, 42, 0.18)',
          fontSize: '0.94rem',
          lineHeight: 1.45,
          maxWidth: '480px',
          width: 'calc(100vw - 24px)',
        },
        success: {
          iconTheme: {
            primary: '#22c55e',
            secondary: '#f8fafc',
          },
          style: {
            border: '1px solid rgba(34, 197, 94, 0.35)',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#f8fafc',
          },
          style: {
            border: '1px solid rgba(239, 68, 68, 0.35)',
          },
        },
      }}
    />
  )
}
