import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { ErrorBoundary } from '@/components/error-boundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HustleBooks - Canadian Tax-Compliant Income & Expense Tracking',
  description: 'Track income and expenses across multiple side hustles. Automatically categorize transactions, estimate taxes owed, and generate CRA-compliant reports for tax filing.',
  keywords: ['gig worker taxes', 'side hustle tracker', 'CRA compliance', 'income tracking', 'expense tracking', 'Uber taxes', 'freelance taxes', 'Canadian taxes', 'self employed'],
  authors: [{ name: 'HustleBooks' }],
  creator: 'HustleBooks',
  publisher: 'HustleBooks',
  robots: 'index, follow',
  manifest: '/manifest.json',
  openGraph: {
    title: 'HustleBooks - Canadian Tax-Compliant Income & Expense Tracking',
    description: 'Track income and expenses across multiple side hustles. Automatically categorize transactions, estimate taxes owed, and generate CRA-compliant reports.',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HustleBooks - Canadian Tax-Compliant Income & Expense Tracking',
    description: 'Track income and expenses across multiple side hustles. Automatically categorize transactions, estimate taxes owed.',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HustleBooks',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0f172a',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  )
}
