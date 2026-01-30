import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, DollarSign, Briefcase, Calendar, Trash2, Edit2 } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function IncomeSourcesPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const supabase = await createSupabaseServerClient()
  
  const { data: sources, error } = await supabase
    .from('income_sources')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false }) as { data: any[] | null, error: any }

  if (error) {
    console.error('Error fetching income sources:', error)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Income Sources</h1>
          <p className="text-slate-600 mt-1">Manage your side hustle income streams</p>
        </div>
        <Button asChild>
          <Link href="/income/sources/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Source
          </Link>
        </Button>
      </div>

      {sources && sources.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sources.map((source) => (
            <Card key={source.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Briefcase className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{source.name}</CardTitle>
                      <p className="text-sm text-slate-500">{source.description || 'No description'}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-slate-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Created {new Date(source.created_at).toLocaleDateString()}</span>
                  </div>
                  {source.estimated_monthly_income && (
                    <div className="flex items-center text-slate-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>Est. ${source.estimated_monthly_income.toLocaleString()}/month</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/income/sources/${source.id}/edit`}>
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                  <Button variant="destructive" size="sm" asChild>
                    <Link href={`/income/sources/${source.id}/delete`}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <DollarSign className="h-12 w-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No income sources yet</h3>
            <p className="text-slate-600 mb-4">Create your first income source to start tracking</p>
            <Button asChild>
              <Link href="/income/sources/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Income Source
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link href="/income">
            ← Back to Income
          </Link>
        </Button>
      </div>
    </div>
  )
}
