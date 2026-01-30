import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Receipt, Plus, Filter, Calendar, DollarSign } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function ExpensesPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const supabase = await createSupabaseServerClient()
  
  const { data: expenses, error } = await supabase
    .from('expense_transactions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(10) as { data: any[] | null, error: any }

  const { data: categories, error: categoriesError } = await supabase
    .from('expense_categories')
    .select('*')
    .order('name', { ascending: true }) as { data: any[] | null, error: any }

  if (error || categoriesError) {
    console.error('Error fetching data:', error || categoriesError)
  }

  const totalExpenses = expenses?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Expenses</h1>
          <p className="text-slate-600 mt-1">Track your business expenses for tax deductions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/expenses/scan">
              <Receipt className="mr-2 h-4 w-4" />
              Scan Receipt
            </Link>
          </Button>
          <Button asChild>
            <Link href="/expenses/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Expenses</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${totalExpenses.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                <Receipt className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Transactions</p>
                <p className="text-2xl font-bold text-slate-900">{expenses?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg">
                <Filter className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Categories</p>
                <p className="text-2xl font-bold text-slate-900">{categories?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses && expenses.length > 0 ? (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{expense.description || 'No description'}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(expense.date).toLocaleDateString()}
                      {expense.category && (
                        <>
                          <span>•</span>
                          <span>{expense.category}</span>
                        </>
                      )}
                    </p>
                  </div>
                  <p className="font-semibold text-slate-900">
                    ${expense.amount.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <Receipt className="h-8 w-8 mx-auto mb-2 text-slate-400" />
              <p>No expenses yet</p>
              <p className="text-sm">Start tracking your business expenses</p>
              <Button className="mt-4" asChild>
                <Link href="/expenses/new">Add Expense</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Expense Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {categories && categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {categories.map((category) => (
                <div key={category.id} className="p-2 bg-slate-50 rounded text-sm text-slate-700">
                  {category.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">No categories available</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
