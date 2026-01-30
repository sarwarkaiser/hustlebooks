'use client'

import { useState, useEffect } from 'react'
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

export default function NewIncomeTransactionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [sources, setSources] = useState<any[]>([])
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    description: '',
    income_source_id: '',
    category: '',
    payment_method: '',
    gst_hst: '',
  })

  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    const fetchSources = async () => {
      const { data, error } = await supabase
        .from('income_sources')
        .select('id, name')
        .order('name', { ascending: true })

      if (error) {
        console.error('Error fetching sources:', error)
      } else {
        setSources(data || [])
      }
    }

    fetchSources()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from('income_transactions').insert({
        date: formData.date,
        amount: parseFloat(formData.amount),
        description: formData.description || null,
        income_source_id: formData.income_source_id || null,
        category: formData.category || null,
        payment_method: formData.payment_method || null,
        gst_hst: formData.gst_hst ? parseFloat(formData.gst_hst) : null,
      })

      if (error) {
        throw error
      }

      toast({
        title: 'Success!',
        description: 'Income transaction added successfully.',
      })

      router.push('/income')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add income transaction.',
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
          <Link href="/income">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Add Income</h1>
          <p className="text-slate-600 mt-1">Record a new income transaction</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="e.g., 1500.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="income_source_id">Income Source</Label>
              <select
                id="income_source_id"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                value={formData.income_source_id}
                onChange={(e) => setFormData({ ...formData, income_source_id: e.target.value })}
              >
                <option value="">Select a source...</option>
                {sources.map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of this income..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Project, Service, Product"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment_method">Payment Method</Label>
                <Input
                  id="payment_method"
                  placeholder="e.g., E-transfer, Cash, PayPal"
                  value={formData.payment_method}
                  onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gst_hst">GST/HST Collected ($)</Label>
              <Input
                id="gst_hst"
                type="number"
                step="0.01"
                placeholder="e.g., 195.00"
                value={formData.gst_hst}
                onChange={(e) => setFormData({ ...formData, gst_hst: e.target.value })}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Income
                  </>
                )}
              </Button>
              <Button variant="outline" type="button" asChild>
                <Link href="/income">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
