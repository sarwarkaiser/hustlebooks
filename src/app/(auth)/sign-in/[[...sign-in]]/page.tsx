import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg shadow-blue-500/30">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">
            Welcome to HustleBooks
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Track your side hustles and file taxes with confidence
          </p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 py-8 px-4 shadow-xl rounded-2xl sm:px-10">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-slate-300 mb-4">
                👋 This is a <span className="text-blue-400 font-semibold">demo version</span> for testing the UI
              </p>
              <p className="text-sm text-slate-500">
                Click the button below to explore the dashboard with sample data
              </p>
            </div>
            
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/30"
            >
              <Link href="/dashboard">
                Enter Demo Dashboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            
            <div className="text-center text-sm text-slate-500">
              <p>Demo includes:</p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>✓ All dashboard pages</li>
                <li>✓ Sample transactions & data</li>
                <li>✓ Animations & interactions</li>
                <li>✓ Responsive design</li>
              </ul>
            </div>
          </div>
        </div>
        
        <p className="text-center text-xs text-slate-500">
          For production, configure Clerk authentication
        </p>
      </div>
    </div>
  )
}
