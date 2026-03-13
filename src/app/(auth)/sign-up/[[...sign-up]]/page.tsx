import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function SignUpPage() {
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
            Get Started with HustleBooks
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Start tracking your side hustles today
          </p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 py-8 px-4 shadow-xl rounded-2xl sm:px-10">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-slate-300 mb-4">
                🚀 <span className="text-blue-400 font-semibold">Demo Mode</span> - Try all features instantly
              </p>
            </div>
            
            <div className="space-y-3">
              {[
                'Track income & expenses',
                'Calculate taxes owed',
                'Generate CRA reports',
                'Log mileage deductions',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  {feature}
                </div>
              ))}
            </div>
            
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/30"
            >
              <Link href="/dashboard">
                Try Demo Dashboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            
            <p className="text-center text-sm">
              <Link href="/sign-in" className="text-blue-400 hover:text-blue-300">
                Already have an account? Sign in
              </Link>
            </p>
          </div>
        </div>
        
        <p className="text-center text-xs text-slate-500">
          Production version requires Clerk authentication setup
        </p>
      </div>
    </div>
  )
}
