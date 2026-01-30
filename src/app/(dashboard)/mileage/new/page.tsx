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

export default function NewMileagePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    kilometers: '',
    route: '',
    purpose: '',
    notes: '',
  })

  const supabase = createSupabaseBrowserClient()

  const calculateDeduction = (km: number): number => {
    // 2024 CRA rates
    if (km <= 5000) {
      return km * 0.70
    } else {
      return 5000 * 0.70 + (km - 5000) * 0.64
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const km = parseFloat(formData.kilometers)
      const deduction = calculateDeduction(km)

      const { error } = await supabase.from('mileage_logs').insert({
        date: formData.date,
        kilometers: km,
        route: formData.route || null,
        purpose: formData.purpose || null,
        notes: formData.notes || null,
        deduction: deduction,
      })

      if (error) {
        throw error
      }

      toast({
        title: 'Success!',
        description: `Trip logged. Estimated deduction: $${deduction.toFixed(2)}`,
      })

      router.push('/mileage')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to log trip.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const km = parseFloat(formData.kilometers) || 0
  const estimatedDeduction = calculateDeduction(km)

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/mileage">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Add Mileage</h1>
          <p className="text-slate-600 mt-1">Log a business trip</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
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
              <Label htmlFor="kilometers">Kilometers *</Label>
              <Input
                id="kilometers"
                type="number"
                step="0.1"
                placeholder="e.g., 25.5"
                value={formData.kilometers}
                onChange={(e) => setFormData({ ...formData, kilometers: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="route">Route</Label>
              <Input
                id="route"
                placeholder="e.g., Home to Office, Client Visit"
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose *</Label>
              <select
                id="purpose"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                required
              >
                <option value="">Select purpose...</option>
                <option value="Client Meeting">Client Meeting</option>
                <option value="Office">Office</option>
                <option value="Delivery">Delivery</option>
                <option value="Business Errand">Business Errand</option>
                <option value="Conference">Conference</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>

            {km > 0 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Estimated Deduction:</strong> ${estimatedDeduction.toFixed(2)}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Based on 2024 CRA rates (first 5,000 km @ $0.70/km, then $0.64/km)
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Logging...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Log Trip
                  </>
                )}
              </Button>
              <Button variant="outline" type="button" asChild>
                <Link href="/mileage">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
