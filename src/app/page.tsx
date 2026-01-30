import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  DollarSign, 
  Receipt, 
  Car, 
  LineChart, 
  FileText, 
  ShieldCheck,
  CheckCircle2,
  Zap,
  TrendingUp,
  PiggyBank,
  Sparkles,
  ArrowRight,
  Star,
  Trophy,
  Clock,
  Shield,
  CreditCard,
  Smartphone,
  Cloud,
  Lock,
  Activity,
  Award,
  Heart,
  Users,
  MessageSquare,
  ThumbsUp,
  PlayCircle,
  LogIn
} from 'lucide-react'

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/30">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                HustleBooks
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">
                Features
              </Link>
              <Link href="#pricing" className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">
                Pricing
              </Link>
              <Link href="/sign-in" className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">
                Sign In
              </Link>
              <Button 
                asChild 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <Link href="/sign-up" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-blue-200">Canadian Tax-Compliant • CRA Ready</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Track Your Side Hustle
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Without the Tax Headache
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            All-in-one tracker for Uber drivers, freelancers, and gig workers. 
            Automatically categorize expenses, estimate taxes, and generate CRA-compliant reports.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold px-10 py-5 rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 text-lg"
            >
              <Link href="/sign-up" className="flex items-center gap-3">
                <Zap className="w-5 h-5" />
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              asChild
              className="border-2 border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-white font-semibold px-10 py-5 rounded-2xl transition-all duration-300 hover:border-slate-400 hover:scale-105 text-lg backdrop-blur-sm"
            >
              <Link href="#how-it-works" className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5" />
                How It Works
              </Link>
            </Button>
          </div>

          <p className="text-sm text-slate-500 mt-4">
            ✨ No credit card required • Free forever tier available
          </p>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-75">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <span className="text-sm text-slate-400">Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-slate-400">CRA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="text-sm text-slate-400">Built by Gig Workers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                50K+
              </div>
              <div className="text-sm text-slate-400 font-medium">Gig Workers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-1">
                $12M+
              </div>
              <div className="text-sm text-slate-400 font-medium">Tracked Income</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-1">
                98%
              </div>
              <div className="text-sm text-slate-400 font-medium">Tax Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                100%
              </div>
              <div className="text-sm text-slate-400 font-medium">CRA Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
                Everything You Need
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                All-in-One Tax Solution
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Built for Canadian gig workers. No more spreadsheets, shoeboxes of receipts, or tax surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Track Income Sources</h3>
                <p className="text-slate-400 leading-relaxed">
                  Manage multiple side hustles (Uber, DoorDash, freelance, Etsy) in one dashboard. See which hustle makes the most money.
                </p>
                <div className="mt-6 flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Receipt className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Smart Expense Tracking</h3>
                <p className="text-slate-400 leading-relaxed">
                  Auto-categorize expenses with CRA-compliant categories. Upload receipts and let OCR extract the data automatically.
                </p>
                <div className="mt-6 flex items-center gap-2 text-green-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-yellow-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Car className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Mileage Tracking</h3>
                <p className="text-slate-400 leading-relaxed">
                  Track business km with CRA rates ($0.70/km for 2025). Simplified or detailed logging. Automatic deduction calculation.
                </p>
                <div className="mt-6 flex items-center gap-2 text-yellow-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                  <LineChart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Tax Estimator</h3>
                <p className="text-slate-400 leading-relaxed">
                  Real-time tax estimates with federal, provincial, CPP, and EI calculations. Know exactly how much to set aside.
                </p>
                <div className="mt-6 flex items-center gap-2 text-purple-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-red-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">CRA-Compliant Reports</h3>
                <p className="text-slate-400 leading-relaxed">
                  Generate T2125 forms, profit & loss statements, and tax summaries. Ready to file or give to your accountant.
                </p>
                <div className="mt-6 flex items-center gap-2 text-red-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Audit Protection</h3>
                <p className="text-slate-400 leading-relaxed">
                  Keep CRA-compliant records with receipts, mileage logs, and detailed transaction history. Sleep easy during tax season.
                </p>
                <div className="mt-6 flex items-center gap-2 text-cyan-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
                Simple Process
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Get started in minutes, save hours at tax time
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Sign Up', desc: 'Create a free account in 30 seconds. No credit card needed.', icon: <Zap className="w-6 h-6" /> },
              { step: 2, title: 'Add Income Sources', desc: 'Set up your side hustles (Uber, freelance, Etsy, etc.).', icon: <DollarSign className="w-6 h-6" /> },
              { step: 3, title: 'Track & Scan', desc: 'Log income, expenses, and mileage. Scan receipts with your phone.', icon: <Receipt className="w-6 h-6" /> },
              { step: 4, title: 'File Confidently', desc: 'Generate CRA-ready reports and file with confidence.', icon: <FileText className="w-6 h-6" /> },
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg font-bold shadow-lg shadow-blue-500/30 z-10">
                  {item.step}
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 pt-8 mt-4 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-4 text-slate-400 group-hover:text-white group-hover:bg-blue-500/20 transition-all">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
                Simple Pricing
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Choose Your Plan
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Start free, upgrade when you are ready
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 hover:border-slate-500 transition-all duration-300 hover:transform hover:scale-105">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-white">Free</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">Forever</span>
                </div>
                <p className="text-slate-400">Perfect for getting started</p>
              </div>
              
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">$0</span>
                <span className="text-slate-400 text-xl">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  '1 income source',
                  '25 transactions/month',
                  'Basic reports',
                  'Email support',
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                asChild 
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-105 border border-slate-600"
              >
                <Link href="/sign-up">Get Started Free</Link>
              </Button>
            </div>

            {/* Pro Tier */}
            <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 backdrop-blur-sm border-2 border-transparent bg-clip-padding rounded-3xl p-8 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 shadow-2xl shadow-blue-500/20">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10"></div>
              
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                  Most Popular
                </span>
              </div>

              <div className="mb-6 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-white">Pro</span>
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-slate-400">For serious gig workers</p>
              </div>
              
              <div className="mb-8">
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">$12</span>
                <span className="text-slate-400 text-xl">/month</span>
                <div className="text-sm text-slate-500 mt-1">or $99/year (save $45)</div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited income sources',
                  'Unlimited transactions',
                  'Receipt scanning (OCR)',
                  'Mileage tracking',
                  'Tax estimator',
                  'T2125 & all reports',
                  'Priority support',
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30"
              >
                <Link href="/sign-up" className="flex items-center justify-center gap-2">
                  Start Pro Trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">
                Loved by Gig Workers
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                What Users Say
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah M.',
                role: 'Uber Driver',
                text: 'Saved me $3,000 in taxes last year. The mileage tracker is a game-changer!',
                avatar: 'SM',
                rating: 5,
              },
              {
                name: 'James K.',
                role: 'Freelance Designer',
                text: 'Finally, a tool that understands Canadian gig workers. T2125 forms are so easy now.',
                avatar: 'JK',
                rating: 5,
              },
              {
                name: 'Lisa T.',
                role: 'Etsy Seller',
                text: 'Receipt scanning with OCR is magic. No more shoebox of receipts!',
                avatar: 'LT',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 border border-slate-700 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
                  Ready to Start
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  Simplify Your Taxes Today
                </span>
              </h2>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Join thousands of Canadian gig workers who track smarter and file with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold px-10 py-5 rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 text-lg"
                >
                  <Link href="/sign-up" className="flex items-center gap-3">
                    <Zap className="w-5 h-5" />
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                  className="border-2 border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-white font-semibold px-10 py-5 rounded-2xl transition-all duration-300 hover:border-slate-400 hover:scale-105 text-lg backdrop-blur-sm"
                >
                  <Link href="/sign-in" className="flex items-center gap-2">
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl text-white">HustleBooks</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Canadian tax-compliant income and expense tracking for gig workers. Built by gig workers, for gig workers.
              </p>
              <div className="flex gap-4 mt-6">
                {[
                  { icon: <MessageSquare className="w-5 h-5" />, href: '#' },
                  { icon: <Users className="w-5 h-5" />, href: '#' },
                  { icon: <ThumbsUp className="w-5 h-5" />, href: '#' },
                ].map((social, idx) => (
                  <Link key={idx} href={social.href} className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-200">
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {[
              {
                title: 'Product',
                links: [
                  { label: 'Features', href: '#features' },
                  { label: 'Pricing', href: '#pricing' },
                  { label: 'How It Works', href: '#how-it-works' },
                  { label: 'Sign Up', href: '/sign-up' },
                ],
              },
              {
                title: 'Resources',
                links: [
                  { label: 'Help Center', href: '/help' },
                  { label: 'Tax Guide', href: '/tax-guide' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'API Docs', href: '/docs' },
                ],
              },
              {
                title: 'Legal',
                links: [
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Service', href: '/terms' },
                  { label: 'Cookie Policy', href: '/cookies' },
                  { label: 'Disclaimer', href: '/disclaimer' },
                ],
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-white mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link 
                        href={link.href} 
                        className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 HustleBooks. All rights reserved. Not tax advice. Consult a professional.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Secure
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-4 h-4" />
                Encrypted
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                CRA Compliant
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
