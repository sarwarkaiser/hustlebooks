import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Car, Plus, Calendar, MapPin, DollarSign } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function MileagePage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const supabase = await createSupabaseServerClient()
  
  const { data: logs, error } = await supabase
    .from('mileage_logs')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(10) as { data: any[] | null, error: any }

  if (error) {
    console.error('Error fetching mileage logs:', error)
  }

  const totalKm = logs?.reduce((sum, log) => sum + (log.kilometers || 0), 0) || 0
  const totalDeduction = logs?.reduce((sum, log) => sum + (log.deduction || 0), 0) || 0

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mileage Tracking</h1>
          <p className="text-slate-600 mt-1">Track business mileage for tax deductions</p>
        </div>
        <Button asChild>
          <Link href="/mileage/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Trip
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Kilometers</p>
                <p className="text-2xl font-bold text-slate-900">
                  {totalKm.toLocaleString('en-CA', { maximumFractionDigits: 1 })} km
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Deduction</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${totalDeduction.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                <Car className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Trips Logged</p>
                <p className="text-2xl font-bold text-slate-900">{logs?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Trips</CardTitle>
        </CardHeader>
        <CardContent>
          {logs && logs.length > 0 ? (
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{log.purpose || 'Business Trip'}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(log.date).toLocaleDateString()}
                      {log.route && (
                        <>
                          <span>•</span>
                          <span>{log.route}</span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      {log.kilometers.toLocaleString('en-CA', { maximumFractionDigits: 1 })} km
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      ${log.deduction.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <Car className="h-8 w-8 mx-auto mb-2 text-slate-400" />
              <p>No mileage logs yet</p>
              <p className="text-sm">Start tracking your business trips</p>
              <Button className="mt-4" asChild>
                <Link href="/mileage/new">Add Trip</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tax Rate Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">2024 CRA Mileage Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">First 5,000 km</p>
              <p className="text-lg font-bold text-slate-900">$0.70/km</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Over 5,000 km</p>
              <p className="text-lg font-bold text-slate-900">$0.64/km</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">2025 Rate</p>
              <p className="text-lg font-bold text-slate-900">$0.72/km</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">2025 Rate</p>
              <p className="text-lg font-bold text-slate-900">$0.66/km</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
