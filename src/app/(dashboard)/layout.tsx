import Link from 'next/link'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Button } from '@/components/ui/button'
import { Bell, Sparkles, User } from 'lucide-react'

// Check if we're in demo mode
const isDemoMode = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.includes('demo') || 
                   !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

// Mock User Button for demo mode
function DemoUserButton() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
        <User className="w-5 h-5 text-white" />
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              HustleBooks
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-400">
              <Bell className="w-5 h-5" />
            </Button>
            <DemoUserButton />
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:flex fixed top-0 right-0 left-[280px] z-30 h-20 items-center justify-between px-8 bg-slate-950/50 backdrop-blur-sm">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-400">Welcome back! Here&apos;s your business overview.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
          <DemoUserButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-[280px] lg:pt-24 p-4 lg:p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
