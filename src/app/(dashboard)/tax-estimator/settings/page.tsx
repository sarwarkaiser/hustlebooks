'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

export default function TaxSettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    province: 'BC',
    tax_year: '2024',
    installment_threshold: '3000',
    fiscal_year_end: '12-31',
  })

  const supabase = createSupabaseBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from('tax_settings').upsert({
        province: formData.province,
        tax_year: formData.tax_year,
        installment_threshold: parseFloat(formData.installment_threshold),
        fiscal_year_end: formData.fiscal_year_end,
      })

      if (error) {
        throw error
      }

      toast({
        title: 'Success!',
        description: 'Tax settings saved successfully.',
      })

      router.push('/tax-estimator')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save settings.',
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
          <Link href="/tax-estimator">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tax Settings</h1>
          <p className="text-slate-600 mt-1">Configure your tax calculation preferences</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tax Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="province">Province</Label>
              <select
                id="province"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              >
                <option value="AB">Alberta</option>
                <option value="BC">British Columbia</option>
                <option value="MB">Manitoba</option>
                <option value="NB">New Brunswick</option>
                <option value="NL">Newfoundland and Labrador</option>
                <option value="NS">Nova Scotia</option>
                <option value="NT">Northwest Territories</option>
                <option value="NU">Nunavut</option>
                <option value="ON">Ontario</option>
                <option value="PE">Prince Edward Island</option>
                <option value="QC">Quebec</option>
                <option value="SK">Saskatchewan</option>
                <option value="YT">Yukon</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tax_year">Tax Year</Label>
              <select
                id="tax_year"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                value={formData.tax_year}
                onChange={(e) => setFormData({ ...formData, tax_year: e.target.value })}
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="installment_threshold">Installment Threshold ($)</Label>
              <Input
                id="installment_threshold"
                type="number"
                placeholder="3000"
                value={formData.installment_threshold}
                onChange={(e) => setFormData({ ...formData, installment_threshold: e.target.value })}
              />
              <p className="text-xs text-slate-500">
                You must make quarterly installments if your net tax owing exceeds this amount
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fiscal_year_end">Fiscal Year End</Label>
              <Input
                id="fiscal_year_end"
                type="date"
                value={formData.fiscal_year_end}
                onChange={(e) => setFormData({ ...formData, fiscal_year_end: e.target.value })}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
              <Button variant="outline" type="button" asChild>
                <Link href="/tax-estimator">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About These Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-600">
          <p>• <strong>Province:</strong> Affects provincial tax rates in calculations</p>
          <p>• <strong>Tax Year:</strong> Uses CRA rates for the selected year</p>
          <p>• <strong>Installment Threshold:</strong> Minimum tax owing before quarterly payments are required</p>
          <p>• <strong>Fiscal Year End:</strong> Your business fiscal year end date</p>
        </CardContent>
      </Card>
    </div>
  )
}
