'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Upload, Loader2, Receipt, Check, Camera } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScanReceiptPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      processFile(selectedFile)
    }
  }

  const processFile = (selectedFile: File) => {
    setFile(selectedFile)
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
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
        title: 'Receipt Scanned',
        description: 'We extracted the details. Review and save the expense.',
      })
    }, 2000)
  }

  const clearPreview = () => {
    setFile(null)
    setPreview(null)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild className="border-slate-600 bg-slate-800/50 text-slate-300">
          <Link href="/expenses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">Scan Receipt</h1>
          <p className="text-slate-400 mt-1">Upload a receipt to extract expense details automatically</p>
        </div>
      </div>

      {/* Upload Area */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-400" />
            Upload Receipt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div 
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-slate-600 hover:border-slate-500 bg-slate-800/30'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <AnimatePresence mode="wait">
              {preview ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-4"
                >
                  <div className="relative max-h-64 mx-auto rounded-xl overflow-hidden shadow-lg">
                    <Image 
                      src={preview} 
                      alt="Receipt preview" 
                      width={400}
                      height={300}
                      className="object-contain mx-auto"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <p className="text-sm text-slate-300">{file?.name}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={clearPreview} className="border-slate-600">
                    Remove
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="w-16 h-16 mx-auto bg-slate-800 rounded-2xl flex items-center justify-center">
                    <Upload className="h-8 w-8 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 font-medium">Drag and drop your receipt</p>
                    <p className="text-sm text-slate-500 mt-1">or click to browse files</p>
                  </div>
                  <p className="text-xs text-slate-500">Supports JPG, PNG, PDF up to 10MB</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
              id="receipt-upload"
            />
            <Label
              htmlFor="receipt-upload"
              className="inline-block mt-4 px-6 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl cursor-pointer transition-colors text-white font-medium"
            >
              {preview ? 'Change File' : 'Choose File'}
            </Label>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleScan} 
              disabled={loading || !file}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white disabled:opacity-50"
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
            <Button variant="outline" asChild className="border-slate-600 bg-slate-800/50 text-slate-300">
              <Link href="/expenses/new">Manual Entry</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* What We Extract */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-white">What We Extract</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[
              'Date of transaction',
              'Total amount',
              'Vendor name',
              'GST/HST amount',
              'Payment method',
              'Itemized expenses',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-400" />
                </div>
                <span className="text-sm text-slate-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Receipt className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">AI-Powered OCR</span> automatically extracts expense details from your receipts. 
              You can always edit the information after scanning to ensure accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
