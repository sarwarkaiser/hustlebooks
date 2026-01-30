import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  DollarSign, 
  Receipt, 
  Car, 
  LineChart, 
  FileText,
  TrendingUp,
  PiggyBank,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // In a real app, this would fetch from Supabase
  const stats = {
    totalIncome: 0,
    totalExpenses: 0,
    netIncome: 0,
    estimatedTax: 0,
    transactionsThisMonth: 0,
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back!
        </h1>
        <p className="text-slate-600 mt-2">
          Track your side hustles and prepare for tax season.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              ${stats.totalIncome.toFixed(2)}
            </div>
            <p className="text-xs text-slate-500 mt-1">YTD</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              ${stats.totalExpenses.toFixed(2)}
            </div>
            <p className="text-xs text-slate-500 mt-1">YTD</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              ${stats.netIncome.toFixed(2)}
            </div>
            <p className="text-xs text-slate-500 mt-1">Before tax</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Tax</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              ${stats.estimatedTax.toFixed(2)}
            </div>
            <p className="text-xs text-slate-500 mt-1">Set aside</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">
              Log income from your side hustles. Track multiple sources.
            </p>
            <Button className="w-full" asChild>
              <Link href="/income/new">
                <DollarSign className="mr-2 h-4 w-4" />
                Add Income
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">
              Track deductible expenses with receipts. Auto-categorize with CRA codes.
            </p>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/expenses/new">
                <Receipt className="mr-2 h-4 w-4" />
                Add Expense
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Track Mileage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">
              Log business km. Calculate CRA mileage deduction automatically.
            </p>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/mileage/new">
                <Car className="mr-2 h-4 w-4" />
                Add Mileage
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Tax Estimate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.transactionsThisMonth === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                <p>No transactions yet</p>
                <p className="text-sm">Start by adding income or expenses</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Transaction list would go here */}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tax Estimator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-slate-600">Net Income</span>
                <span className="font-semibold">${stats.netIncome.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-slate-600">Est. Tax Owing</span>
                <span className="font-semibold text-red-600">${stats.estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600">To Set Aside</span>
                <span className="font-semibold text-blue-600">${stats.estimatedTax.toFixed(2)}</span>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link href="/tax-estimator">
                  <LineChart className="mr-2 h-4 w-4" />
                  Calculate Tax
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generate Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/reports/profit-loss">
                <FileText className="mr-2 h-4 w-4" />
                Profit & Loss
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/reports/tax-summary">
                <LineChart className="mr-2 h-4 w-4" />
                Tax Summary
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/reports/t2125">
                <FileText className="mr-2 h-4 w-4" />
                T2125 Form
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
