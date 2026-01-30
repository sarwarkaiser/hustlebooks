'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Upload, Loader2, Receipt } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ScanReceiptPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleScan = async () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a receipt image to scan.',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)

    // Simulate OCR processing
    setTimeout(() => {
      setLoading(false)
      toast({
        title: 'Feature Coming Soon',
        description: 'Receipt scanning with OCR will be available in the next update.',
      })
    }, 2000)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/expenses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Scan Receipt</h1>
          <p className="text-slate-600 mt-1">Upload a receipt to extract expense details</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Receipt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
            {preview ? (
              <div className="space-y-4">
                <img 
                  src={preview} 
                  alt="Receipt preview" 
                  className="max-h-64 mx-auto rounded-lg shadow-md"
                />
                <p className="text-sm text-slate-600">{file?.name}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-12 w-12 mx-auto text-slate-400" />
                <p className="text-slate-600">Drag and drop or click to upload</p>
                <p className="text-sm text-slate-500">Supports JPG, PNG, PDF</p>
              </div>
            )}
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
              id="receipt-upload"
            />
            <Label
              htmlFor="receipt-upload"
              className="inline-block mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
            >
              Choose File
            </Label>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleScan} 
              disabled={loading || !file}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Receipt className="h-4 w-4 mr-2" />
                  Scan Receipt
                </>
              )}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/expenses/new">Manual Entry</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What We Extract</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              Date of transaction
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              Total amount
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              Vendor name
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              GST/HST amount
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              Itemized expenses (where available)
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Receipt scanning uses AI-powered OCR to automatically extract expense details. 
          You can always edit the information after scanning.
        </p>
      </div>
    </div>
  )
}
