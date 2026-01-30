import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, DollarSign, TrendingUp, Calendar, AlertCircle } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function TaxEstimatorPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const supabase = await createSupabaseServerClient()
  
  // Fetch income and expenses for calculation
  const { data: income, error: incomeError } = await supabase
    .from('income_transactions')
    .select('amount')
    .eq('user_id', userId) as { data: any[] | null, error: any }

  const { data: expenses, error: expensesError } = await supabase
    .from('expense_transactions')
    .select('amount')
    .eq('user_id', userId) as { data: any[] | null, error: any }

  const { data: mileage, error: mileageError } = await supabase
    .from('mileage_logs')
    .select('deduction')
    .eq('user_id', userId) as { data: any[] | null, error: any }

  if (incomeError || expensesError || mileageError) {
    console.error('Error fetching data:', incomeError || expensesError || mileageError)
  }

  // Calculate totals
  const totalIncome = income?.reduce((sum, inc) => sum + (inc.amount || 0), 0) || 0
  const totalExpenses = expenses?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0
  const totalMileageDeduction = mileage?.reduce((sum, mil) => sum + (mil.deduction || 0), 0) || 0

  // Net business income
  const netBusinessIncome = totalIncome - totalExpenses - totalMileageDeduction

  // Simplified tax calculation (2024 rates)
  const federalTax = calculateFederalTax(netBusinessIncome)
  const provincialTax = calculateProvincialTax(netBusinessIncome, 'BC') // Default to BC
  const cpp = calculateCPP(netBusinessIncome)
  const ei = calculateEI(netBusinessIncome)
  const totalTax = federalTax + provincialTax + cpp + ei

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tax Estimator</h1>
          <p className="text-slate-600 mt-1">Estimate your tax obligations</p>
        </div>
        <Button asChild>
          <Link href="/tax-estimator/settings">
            <Calculator className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
      </div>

      {/* Income Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Income Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-500">Total Income</p>
            <p className="text-xl font-bold text-slate-900">
              ${totalIncome.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-500">Total Expenses</p>
            <p className="text-xl font-bold text-slate-900">
              ${totalExpenses.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-500">Mileage Deduction</p>
            <p className="text-xl font-bold text-slate-900">
              ${totalMileageDeduction.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg text-white">
            <p className="text-sm text-green-100">Net Business Income</p>
            <p className="text-xl font-bold">
              ${netBusinessIncome.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tax Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estimated Tax Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span>Federal Tax</span>
              </div>
              <span className="font-semibold">
                ${federalTax.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span>Provincial Tax (BC)</span>
              </div>
              <span className="font-semibold">
                ${provincialTax.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-orange-600" />
                <span>CPP Contributions</span>
              </div>
              <span className="font-semibold">
                ${cpp.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-red-600" />
                <span>EI Premiums</span>
              </div>
              <span className="font-semibold">
                ${ei.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg text-white">
              <span className="font-bold text-lg">Total Estimated Tax</span>
              <span className="font-bold text-xl">
                ${totalTax.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quarterly Installments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quarterly Installments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-lg text-center">
              <p className="text-sm text-slate-500">Q1 (Mar 15)</p>
              <p className="text-lg font-bold text-slate-900">
                ${(totalTax / 4).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-center">
              <p className="text-sm text-slate-500">Q2 (Jun 15)</p>
              <p className="text-lg font-bold text-slate-900">
                ${(totalTax / 4).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-center">
              <p className="text-sm text-slate-500">Q3 (Sep 15)</p>
              <p className="text-lg font-bold text-slate-900">
                ${(totalTax / 4).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-center">
              <p className="text-sm text-slate-500">Q4 (Dec 15)</p>
              <p className="text-lg font-bold text-slate-900">
                ${(totalTax / 4).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            Important Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• This is an estimate based on 2024 tax rates and your current data</li>
            <li>• Actual tax may vary based on your personal situation</li>
            <li>• Consult a tax professional for accurate calculations</li>
            <li>• Quarterly installments are due March 15, June 15, September 15, and December 15</li>
            <li>• You may need to make installments if your net tax owing exceeds $3,000</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper functions for tax calculations
function calculateFederalTax(income: number): number {
  if (income <= 0) return 0
  if (income <= 55867) return income * 0.15
  if (income <= 111733) return 8380.05 + (income - 55867) * 0.205
  if (income <= 173205) return 22503.58 + (income - 111733) * 0.26
  if (income <= 246750) return 38491.30 + (income - 173205) * 0.29
  return 59819.35 + (income - 246750) * 0.33
}

function calculateProvincialTax(income: number, province: string): number {
  if (income <= 0) return 0
  
  // BC rates (2024)
  if (province === 'BC') {
    if (income <= 47937) return income * 0.0506
    if (income <= 95875) return 2425.61 + (income - 47937) * 0.077
    if (income <= 110076) return 6106.94 + (income - 95875) * 0.105
    if (income <= 133664) return 7598.05 + (income - 110076) * 0.1229
    if (income <= 222420) return 10501.03 + (income - 133664) * 0.147
    return 23508.99 + (income - 222420) * 0.168
  }
  
  // Default to BC
  return calculateProvincialTax(income, 'BC')
}

function calculateCPP(income: number): number {
  if (income <= 3500) return 0
  const maxIncome = 68500
  const rate = 0.0595
  const maxContribution = 3867.50
  
  const contribIncome = Math.min(income, maxIncome) - 3500
  const contribution = contribIncome * rate
  
  return Math.min(contribution, maxContribution)
}

function calculateEI(income: number): number {
  if (income <= 0) return 0
  const maxIncome = 63200
  const rate = 0.0166
  const maxContribution = 1049.12
  
  const contribution = Math.min(income, maxIncome) * rate
  
  return Math.min(contribution, maxContribution)
}
