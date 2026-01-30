'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Plus, ArrowLeft, Loader2 } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

export default function NewIncomeSourcePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    estimated_monthly_income: '',
    category: '',
  })

  const supabase = createSupabaseBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from('income_sources').insert({
        name: formData.name,
        description: formData.description || null,
        estimated_monthly_income: formData.estimated_monthly_income ? parseFloat(formData.estimated_monthly_income) : null,
        category: formData.category || null,
      })

      if (error) {
        throw error
      }

      toast({
        title: 'Success!',
        description: 'Income source created successfully.',
      })

      router.push('/income/sources')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create income source.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/income/sources">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">New Income Source</h1>
          <p className="text-slate-600 mt-1">Create a new income stream to track</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income Source Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Freelance Design, Uber Driving, Etsy Shop"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of this income source..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimated_monthly_income">Estimated Monthly Income ($)</Label>
              <Input
                id="estimated_monthly_income"
                type="number"
                placeholder="e.g., 2500"
                value={formData.estimated_monthly_income}
                onChange={(e) => setFormData({ ...formData, estimated_monthly_income: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Creative Services, Transportation, Retail"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Income Source
                  </>
                )}
              </Button>
              <Button variant="outline" type="button" asChild>
                <Link href="/income/sources">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
