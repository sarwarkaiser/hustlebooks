import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Plus, Filter } from 'lucide-react'

export default async function IncomePage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Income</h1>
          <p className="text-slate-600 mt-1">Track income from all your side hustles</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/income/sources">
              <Filter className="mr-2 h-4 w-4" />
              Sources
            </Link>
          </Button>
          <Button asChild>
            <Link href="/income/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Income
            </Link>
          </Button>
        </div>
      </div>

      {/* Income Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Income Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-slate-400" />
            <p>No income sources yet</p>
            <p className="text-sm">Create your first income source to start tracking</p>
            <Button className="mt-4" asChild>
              <Link href="/income/sources/new">Create Income Source</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Income */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-slate-400" />
            <p>No income transactions yet</p>
            <p className="text-sm">Add your first income transaction</p>
            <Button className="mt-4" asChild>
              <Link href="/income/new">Add Income</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
