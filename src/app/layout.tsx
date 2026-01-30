import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HustleBooks - Canadian Tax-Compliant Income & Expense Tracking',
  description: 'Track income and expenses across multiple side hustles. Automatically categorize transactions, estimate taxes owed, and generate CRA-compliant reports for tax filing.',
  keywords: ['gig worker taxes', 'side hustle tracker', 'CRA compliance', 'income tracking', 'expense tracking', 'Uber taxes', 'freelance taxes'],
  authors: [{ name: 'HustleBooks' }],
  creator: 'HustleBooks',
  publisher: 'HustleBooks',
  robots: 'index, follow',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HustleBooks',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3B82F6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
